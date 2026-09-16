const FIREBASE_VERSION = "10.14.1";
const FIREBASE_BASE = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}`;
const config = window.ACADEMIC_OS_CONFIG || {};
let firebaseModules;
let session = { user: null, accessToken: null };
const SESSION_KEY = "academic-os-google-session";

const isConfigured = () => Boolean(
  config.firebase?.apiKey &&
  config.firebase?.authDomain &&
  config.firebase?.projectId &&
  config.firebase?.appId
);

async function modules() {
  if (!isConfigured()) throw new Error("Firebase is not configured yet.");
  if (!firebaseModules) {
    const [appModule, authModule, firestoreModule] = await Promise.all([
      import(`${FIREBASE_BASE}/firebase-app.js`),
      import(`${FIREBASE_BASE}/firebase-auth.js`),
      import(`${FIREBASE_BASE}/firebase-firestore.js`)
    ]);
    const app = appModule.getApps().length ? appModule.getApp() : appModule.initializeApp(config.firebase);
    firebaseModules = {
      ...authModule,
      ...firestoreModule,
      auth: authModule.getAuth(app),
      db: firestoreModule.getFirestore(app)
    };
  }
  return firebaseModules;
}

async function connect() {
  const sdk = await modules();
  const provider = new sdk.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "consent", access_type: "offline" });
  provider.addScope("https://www.googleapis.com/auth/gmail.modify");
  provider.addScope("https://www.googleapis.com/auth/calendar.events");
  const result = await sdk.signInWithPopup(sdk.auth, provider);
  const credential = sdk.GoogleAuthProvider.credentialFromResult(result);
  session = { user: result.user, accessToken: credential?.accessToken || null };
  if (!session.accessToken) throw new Error("Google did not return an inbox access token. Please reconnect.");
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accessToken: session.accessToken, expiresAt: Date.now() + 55 * 60 * 1000 }));
  return { uid: result.user.uid, name: result.user.displayName, email: result.user.email, photoURL: result.user.photoURL };
}

async function restoreSession() {
  if (!isConfigured()) return null;
  const sdk = await modules();
  const user = await new Promise(resolve => {
    const unsubscribe = sdk.onAuthStateChanged(sdk.auth, currentUser => {
      unsubscribe();
      resolve(currentUser);
    });
  });
  let stored = null;
  try { stored = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch { stored = null; }
  if (!user || !stored?.accessToken || stored.expiresAt <= Date.now()) {
    sessionStorage.removeItem(SESSION_KEY);
    session = { user: user || null, accessToken: null };
    return user ? { uid: user.uid, name: user.displayName, email: user.email, connected: false } : null;
  }
  session = { user, accessToken: stored.accessToken };
  return { uid: user.uid, name: user.displayName, email: user.email, photoURL: user.photoURL, connected: true };
}

async function disconnect() {
  if (!firebaseModules) return;
  await firebaseModules.signOut(firebaseModules.auth);
  sessionStorage.removeItem(SESSION_KEY);
  session = { user: null, accessToken: null };
}

function authHeaders(extra = {}) {
  if (!session.accessToken) throw new Error("Connect Google before syncing.");
  return { Authorization: `Bearer ${session.accessToken}`, ...extra };
}

function headerValue(headers, name) {
  return headers?.find(header => header.name?.toLowerCase() === name.toLowerCase())?.value || "";
}

function decodeBody(value = "") {
  if (!value) return "";
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  try {
    const bytes = Uint8Array.from(atob(normalized), character => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch { return ""; }
}

function messageBody(payload = {}) {
  const stack = [payload];
  let html = "";
  while (stack.length) {
    const part = stack.shift();
    if (part?.mimeType === "text/plain" && part.body?.data) return decodeBody(part.body.data);
    if (part?.mimeType === "text/html" && part.body?.data) html = decodeBody(part.body.data);
    stack.push(...(part?.parts || []));
  }
  return html ? new DOMParser().parseFromString(html, "text/html").body.textContent || "" : "";
}

async function googleJson(url, options = {}) {
  const response = await fetch(url, { ...options, headers: authHeaders(options.headers) });
  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(detail.error?.message || `Google request failed (${response.status}).`);
  }
  return response.status === 204 ? null : response.json();
}

async function fetchInbox(maxResults = 30) {
  const list = await googleJson(`https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=INBOX&maxResults=${maxResults}&q=newer_than:14d`);
  const records = await Promise.all((list.messages || []).map(({ id }) => googleJson(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}?format=full`
  )));
  return records.map(record => {
    const headers = record.payload?.headers || [];
    const receivedAt = new Date(Number(record.internalDate || Date.now()));
    return {
      id: record.id,
      threadId: record.threadId,
      sender: headerValue(headers, "From"),
      subject: headerValue(headers, "Subject") || "(No subject)",
      receivedAt: receivedAt.toISOString(),
      body: messageBody(record.payload).replace(/\s+/g, " ").trim().slice(0, 12000),
      snippet: record.snippet || "",
      unread: (record.labelIds || []).includes("UNREAD"),
      labels: record.labelIds || [],
      source: "Gmail"
    };
  }).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

function base64Url(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function createDraft(message, body) {
  const recipient = message.replyTo || message.sender.match(/<([^>]+)>/)?.[1] || message.sender;
  const raw = [
    `To: ${recipient}`,
    `Subject: Re: ${message.subject.replace(/^Re:\s*/i, "")}`,
    "Content-Type: text/plain; charset=UTF-8",
    "MIME-Version: 1.0",
    "",
    body
  ].join("\r\n");
  return googleJson("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: { threadId: message.threadId, raw: base64Url(raw) } })
  });
}

async function setRead(messageId, isRead) {
  return googleJson(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/modify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isRead ? { removeLabelIds: ["UNREAD"] } : { addLabelIds: ["UNREAD"] })
  });
}

async function trashMessage(messageId) {
  return googleJson(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}/trash`, { method: "POST" });
}

async function fetchCalendarEvents(timeMin, timeMax) {
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    showDeleted: "false",
    maxResults: "2500"
  });
  const response = await googleJson(`https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`);
  return (response.items || []).filter(event => event.status !== "cancelled").map(event => {
    const allDay = Boolean(event.start?.date);
    const startValue = event.start?.dateTime || event.start?.date || new Date().toISOString();
    const endValue = event.end?.dateTime || event.end?.date || startValue;
    const start = allDay ? "09:00" : startValue.slice(11, 16);
    const end = allDay ? "10:00" : endValue.slice(11, 16);
    return {
      id: `google-${event.id}`,
      externalId: `google-calendar:${event.id}`,
      googleEventId: event.id,
      title: event.summary || "Untitled Google Calendar event",
      date: startValue.slice(0, 10),
      start,
      end: end > start ? end : addOneHour(start),
      source: "Google",
      priority: "medium",
      zone: "Flexible",
      notes: [allDay ? "All-day event" : "", event.location || "", event.description || ""].filter(Boolean).join(" · ").slice(0, 1000),
      allDay,
      htmlLink: event.htmlLink || "",
      updated: event.updated || ""
    };
  });
}

function addOneHour(time) {
  const [hour, minute] = time.split(":").map(Number);
  return `${String((hour + 1) % 24).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

async function createCalendarEvent(event) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "America/New_York";
  return googleJson("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: event.title,
      description: event.notes,
      start: { dateTime: `${event.date}T${event.start}:00`, timeZone: timezone },
      end: { dateTime: `${event.date}T${event.end}:00`, timeZone: timezone },
      extendedProperties: { private: { academicOsSource: "mail", mailMessageId: event.mailMessageId || "" } }
    })
  });
}

async function savePreferences(preferences) {
  if (!session.user) return;
  const sdk = await modules();
  await sdk.setDoc(sdk.doc(sdk.db, "users", session.user.uid, "settings", "mail"), {
    ...preferences,
    updatedAt: sdk.serverTimestamp()
  }, { merge: true });
}

async function loadPreferences() {
  if (!session.user) return null;
  const sdk = await modules();
  const snapshot = await sdk.getDoc(sdk.doc(sdk.db, "users", session.user.uid, "settings", "mail"));
  if (!snapshot.exists()) return null;
  const { updatedAt, ...preferences } = snapshot.data();
  return preferences;
}

async function runAI(payload) {
  if (!config.aiEndpoint || !session.user) return null;
  const token = await session.user.getIdToken();
  const response = await fetch(config.aiEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error("The AI service could not process this request.");
  return response.json();
}

window.AcademicOSMail = {
  isConfigured,
  connect,
  restoreSession,
  disconnect,
  fetchInbox,
  fetchCalendarEvents,
  createDraft,
  setRead,
  trashMessage,
  createCalendarEvent,
  savePreferences,
  loadPreferences,
  runAI,
  getSession: () => ({ user: session.user ? { uid: session.user.uid, name: session.user.displayName, email: session.user.email, photoURL: session.user.photoURL } : null, connected: Boolean(session.accessToken) })
};

document.dispatchEvent(new CustomEvent("academic-os-mail-ready"));
