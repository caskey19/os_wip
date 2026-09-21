const mailCategories = ["Announcements", "Deadlines", "Networking", "Newsletters"];

function classifyMail(message) {
  const text = `${message.sender} ${message.subject} ${message.body || message.snippet || ""}`.toLowerCase();
  if (/newsletter|digest|headlines|roundup|unsubscribe/.test(text)) return "Newsletters";
  if (/due|deadline|exam|quiz|assignment|problem set|submit|action required/.test(text)) return "Deadlines";
  if (/network|recruit|career|coffee chat|interview|alumni|opportunity/.test(text)) return "Networking";
  return "Announcements";
}

function mailUrgency(message) {
  const sender = String(message.sender || "").toLowerCase();
  const text = `${message.subject} ${message.body || message.snippet || ""}`.toLowerCase();
  const category = message.category || classifyMail(message);
  if (category === "Newsletters" || /newsletter|digest|headlines|roundup|unsubscribe/.test(`${sender} ${text}`)) {
    return "low";
  }
  const coachOrRecruiter = /coach|recruit|athletic|scouting|compliance/.test(`${sender} ${text}`);
  const deadlineOrAction = /deadline|due\b|action required|submit|exam|quiz|problem set|enrollment|response requested|confirm attendance/.test(text);
  const highSignalSender = /professor|prof\.|instructor|registrar|career services|recruit/.test(sender);
  if (deadlineOrAction || coachOrRecruiter || (highSignalSender && /urgent|today|tomorrow|this week|meeting|interview/.test(text))) {
    return "urgent";
  }
  if (/meeting|interview|coffee chat|register|invitation|practice|this week/.test(text)) {
    return "soon";
  }
  return "low";
}

function parseMailTime(value, meridiem) {
  let hour = Number(value.split(":")[0]);
  const minute = Number(value.split(":")[1] || 0);
  if (meridiem?.toLowerCase() === "pm" && hour < 12) hour += 12;
  if (meridiem?.toLowerCase() === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function addMailMinutes(time, amount) {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + amount;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function extractMailEvent(message) {
  if (message.calendar) return { ...message.calendar };
  const text = `${message.subject}. ${message.body || message.snippet || ""}`;
  if (!/due|deadline|exam|quiz|meeting|chat|session|appointment|interview|event|practice|register/i.test(text)) return null;
  const months = { january: 0, february: 1, march: 2, april: 3, may: 4, june: 5, july: 6, august: 7, september: 8, october: 9, november: 10, december: 11 };
  let date;
  const namedDate = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:,\s*(\d{4}))?/i);
  if (namedDate) {
    date = new Date(Number(namedDate[3] || new Date().getFullYear()), months[namedDate[1].toLowerCase()], Number(namedDate[2]), 12);
  } else if (/\btomorrow\b/i.test(text)) {
    date = new Date();
    date.setDate(date.getDate() + 1);
  } else return null;
  const timeMatch = text.match(/\b(\d{1,2}(?::\d{2})?)\s*(AM|PM)\b/i);
  const start = timeMatch ? parseMailTime(timeMatch[1], timeMatch[2]) : /due|deadline|submit/i.test(text) ? "17:00" : "09:00";
  return {
    title: message.subject.replace(/^(re|fwd):\s*/i, "").replace(/\s+[—-].*$/, "").slice(0, 80),
    date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
    start,
    end: addMailMinutes(start, /30.?minute/i.test(text) ? 30 : 60),
    priority: mailUrgency(message) === "urgent" ? "high" : "medium",
    zone: /network|career|chat|interview/i.test(text) ? "Relationships" : "Deep work"
  };
}

function refreshMailSuggestions() {
  systemData.mail.messages.forEach(message => {
    message.category = classifyMail(message);
    message.urgency = mailUrgency(message);
    if (systemData.mailSuggestions.some(item => item.mailMessageId === message.id)) return;
    const extracted = extractMailEvent(message);
    if (!extracted) return;
    const hoursAway = (new Date(`${extracted.date}T${extracted.start}:00`) - new Date()) / 36e5;
    const isNewsletter = message.category === "Newsletters";
    if (!isNewsletter && hoursAway >= 0 && hoursAway <= Number(systemData.mail.preferences.urgencyWindow || 48)) {
      message.urgency = "urgent";
    }
    const suggestion = { id: systemId("ms"), mailMessageId: message.id, sender: message.sender, subject: message.subject, status: "pending", confidence: message.calendar ? 98 : 82, ...extracted };
    systemData.mailSuggestions.unshift(suggestion);
    if (systemData.mail.preferences.calendarMode === "auto") approveMailSuggestion(suggestion.id, false);
  });
  if (systemData.mail.preferences.calendarMode === "auto") {
    systemData.mailSuggestions.filter(item => item.status === "pending").forEach(item => approveMailSuggestion(item.id, false));
  }
  saveSystemData();
  const navCount = document.querySelector("#mailNavCount");
  const urgentCount = systemData.mail.messages.filter(message => message.urgency === "urgent").length;
  if (navCount) { navCount.textContent = urgentCount; navCount.hidden = !urgentCount; }
}

function mailSummary(messages) {
  if (systemData.mail.dailySummary) return systemData.mail.dailySummary;
  const unread = messages.filter(message => message.unread).length;
  const urgent = messages.filter(message => message.urgency === "urgent");
  const deadlines = messages.filter(message => message.category === "Deadlines");
  const networking = messages.filter(message => message.category === "Networking");
  const lead = urgent[0]?.subject || deadlines[0]?.subject || "No critical actions detected";
  return `${messages.length} messages reviewed with ${unread} unread. ${urgent.length} need timely attention; the strongest signal is “${lead}.” ${deadlines.length} deadline-related and ${networking.length} networking messages were grouped for faster review.`;
}

function mailPriorityScore(message) {
  let score = message.urgency === "urgent" ? 60 : message.urgency === "soon" ? 25 : 0;
  if (message.unread) score += 8;
  const focusCategory = { academic: ["Deadlines", "Announcements"], career: ["Networking"], athletics: ["Announcements"], balanced: [] }[systemData.mail.preferences.focus] || [];
  if (focusCategory.includes(message.category)) score += 20;
  if (systemData.mail.preferences.focus === "athletics" && /coach|team|practice|athletic/i.test(`${message.sender} ${message.subject}`)) score += 25;
  return score;
}

function mailTime(value) {
  const date = new Date(value);
  return date.toDateString() === new Date().toDateString()
    ? date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : date.toLocaleDateString([], { month: "short", day: "numeric" });
}

function senderName(value) {
  return String(value).split("<")[0].trim().replace(/^([^,]+),\s*(.+)$/, "$2 $1") || "Sender";
}

function localReplyDraft(message, tone = systemData.mail.preferences.replyTone) {
  const name = senderName(message.sender).replace(/^(Professor|Dr\.?|Coach)\s+/i, "").split(/\s+/)[0];
  const opening = tone === "formal" ? `Dear ${name},` : `Hi ${name},`;
  const text = `${message.subject} ${message.body}`.toLowerCase();
  let response = "Thank you for the update. I’ve reviewed the details and will take care of the next step.";
  if (/available|coffee chat|meeting|interview/.test(text)) response = "Thank you for reaching out. That time works well for me, and I’d be glad to connect. Please send the meeting link when convenient.";
  else if (/due|deadline|assignment|problem set/.test(text)) response = "Thank you for the clarification. I’ve noted the updated deadline and will submit the work on time.";
  else if (/practice|location/.test(text)) response = "Thanks for the update. I’ve noted the location change and will arrive early.";
  if (tone === "warm") response += " I appreciate you letting me know.";
  return `${opening}\n\n${response}\n\nBest,\n${window.AetherCurrentUserName || "Blake"}`;
}

function approveMailSuggestion(id, shouldRender = true) {
  const suggestion = systemData.mailSuggestions.find(item => item.id === id);
  if (!suggestion || suggestion.status === "approved") return;
  suggestion.status = "approved";
  const event = {
    id: systemId("e"), title: suggestion.title, date: suggestion.date, start: suggestion.start, end: suggestion.end,
    source: "Mail", priority: suggestion.priority, zone: suggestion.zone,
    notes: `Suggested from “${suggestion.subject}” · ${suggestion.sender}`,
    externalId: `mail:${suggestion.mailMessageId}`, mailMessageId: suggestion.mailMessageId
  };
  if (!systemData.events.some(item => item.externalId === event.externalId)) systemData.events.push(event);
  // Detect task-like deadlines into tasks module (still requires this approval path)
  if (/due|deadline|problem set|assignment|homework/i.test(`${suggestion.title} ${suggestion.subject || ""}`)) {
    systemData.tasks = systemData.tasks || [];
    if (!systemData.tasks.some(t => t.title === suggestion.title && t.due === suggestion.date)) {
      systemData.tasks.unshift({
        id: `tk${Date.now()}`,
        title: suggestion.title,
        status: "open",
        priority: suggestion.priority || "high",
        due: suggestion.date,
        area: "Academic",
        notes: `From mail · ${suggestion.sender || ""}`,
        goalId: ""
      });
    }
  }
  // Email contact candidate → review queue
  const emailMatch = String(suggestion.sender || "").match(/<([^>]+)>/) || [];
  const senderLabel = String(suggestion.sender || "").replace(/<[^>]+>/, "").trim();
  if (emailMatch[1] && !systemData.contacts.some(c => c.email === emailMatch[1])) {
    systemData.reviewQueue = systemData.reviewQueue || [];
    if (!systemData.reviewQueue.some(r => r.email === emailMatch[1] && r.status === "pending")) {
      systemData.reviewQueue.unshift({
        id: `rq${Date.now()}`,
        name: senderLabel || emailMatch[1],
        email: emailMatch[1],
        org: "",
        source: "Email",
        reason: `Appeared on “${suggestion.subject || suggestion.title}”`,
        status: "pending"
      });
    }
  }
  saveSystemData();
  if (systemData.mail.connection.connected) {
    window.AcademicOSMail?.createCalendarEvent(event).then(receipt => {
      suggestion.googleEventId = receipt?.id || null;
      suggestion.syncState = "synced";
      saveSystemData();
    }).catch(() => { suggestion.syncState = "local"; saveSystemData(); });
  }
  const autoKey = suggestion.zone || suggestion.priority || "calendar";
  if (!systemData.profile) systemData.profile = {};
  systemData.profile.autoApproveTypes = systemData.profile.autoApproveTypes || {};
  if (!systemData.profile.autoApproveTypes[autoKey] && shouldRender) {
    if (confirm("Automatically approve similar mail → calendar suggestions in the future?")) {
      systemData.profile.autoApproveTypes[autoKey] = true;
      saveSystemData();
    }
  }
  if (shouldRender) {
    renderCalendarDashboard();
    if (state.view === "mail") renderMailDashboard();
    showToast("Mail event added to Calendar.");
  }
}

function dismissMailSuggestion(id) {
  const suggestion = systemData.mailSuggestions.find(item => item.id === id);
  if (!suggestion) return;
  suggestion.status = "dismissed";
  saveSystemData();
  renderCalendarDashboard();
  if (state.view === "mail") renderMailDashboard();
  showToast("Calendar proposal dismissed.");
}

function editMailSuggestion(id) {
  const suggestion = systemData.mailSuggestions.find(item => item.id === id);
  if (!suggestion) return;
  openAcademicForm("Review mail event", "AI CALENDAR PROPOSAL", `<label>Event title<input name="title" required value="${escapeHtml(suggestion.title)}"></label><div class="form-row"><label>Date<input name="date" type="date" required value="${suggestion.date}"></label><label>Priority<select name="priority">${["high", "medium", "low"].map(value => `<option ${suggestion.priority === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="form-row"><label>Starts<input name="start" type="time" required value="${suggestion.start}"></label><label>Ends<input name="end" type="time" required value="${suggestion.end}"></label></div>`, data => {
    if (data.get("end") <= data.get("start")) { showToast("End time must be after start time."); return false; }
    Object.assign(suggestion, { title: data.get("title").trim(), date: data.get("date"), start: data.get("start"), end: data.get("end"), priority: data.get("priority") });
    saveSystemData();
    renderCalendarDashboard();
    if (state.view === "mail") renderMailDashboard();
    showToast("Proposal updated.");
  });
}

function mailOnboarding() {
  const prefs = systemData.mail.preferences;
  openAcademicForm("Personalize your AI inbox", "FIVE QUICK QUESTIONS", `<p class="record-form-intro">These choices shape triage, summaries, replies, and calendar automation. You can change them anytime.</p><label>1. What should rise to the top?<select name="focus"><option value="academic" ${prefs.focus === "academic" ? "selected" : ""}>Professors, classes, and deadlines</option><option value="career" ${prefs.focus === "career" ? "selected" : ""}>Career and networking</option><option value="athletics" ${prefs.focus === "athletics" ? "selected" : ""}>Athletics and team</option><option value="balanced" ${prefs.focus === "balanced" ? "selected" : ""}>Balanced across everything</option></select></label><label>2. What counts as urgent?<select name="urgencyWindow"><option value="24" ${prefs.urgencyWindow === "24" ? "selected" : ""}>Due within 24 hours</option><option value="48" ${prefs.urgencyWindow === "48" ? "selected" : ""}>Due within 48 hours</option><option value="168" ${prefs.urgencyWindow === "168" ? "selected" : ""}>Due within one week</option></select></label><label>3. How should newsletters appear?<select name="newsletters"><option value="digest" ${prefs.newsletters === "digest" ? "selected" : ""}>Bundle into the daily digest</option><option value="inbox" ${prefs.newsletters === "inbox" ? "selected" : ""}>Keep in the main inbox</option><option value="hide" ${prefs.newsletters === "hide" ? "selected" : ""}>Hide unless I search</option></select></label><label>4. Preferred reply style?<select name="replyTone"><option value="concise" ${prefs.replyTone === "concise" ? "selected" : ""}>Concise and direct</option><option value="warm" ${prefs.replyTone === "warm" ? "selected" : ""}>Warm and conversational</option><option value="formal" ${prefs.replyTone === "formal" ? "selected" : ""}>Formal and polished</option></select></label><label>5. How should email events reach Calendar?<select name="calendarMode"><option value="semi" ${prefs.calendarMode === "semi" ? "selected" : ""}>Ask before adding (recommended)</option><option value="auto" ${prefs.calendarMode === "auto" ? "selected" : ""}>Add automatically</option></select></label>`, data => {
    Object.assign(prefs, { onboarded: true, focus: data.get("focus"), urgencyWindow: data.get("urgencyWindow"), newsletters: data.get("newsletters"), replyTone: data.get("replyTone"), calendarMode: data.get("calendarMode") });
    refreshMailSuggestions();
    window.AcademicOSMail?.savePreferences(prefs).catch(() => {});
    renderMailDashboard();
    if (state.view === "calendar") renderCalendarDashboard();
    showToast("Mail preferences saved.");
  });
}

function useMailDefaults() {
  systemData.mail.preferences = { ...systemSeed.mail.preferences, onboarded: true };
  refreshMailSuggestions();
  saveSystemData();
  renderMailDashboard();
  showToast("Academic triage defaults applied.");
}

async function activateGoogleWorkspace(user) {
    systemData.mail.connection = { ...systemData.mail.connection, mode: "live", connected: true, name: user.name || "Google user", email: user.email || "", lastSync: null, calendarLastSync: null, calendarError: "" };
    const savedPreferences = await window.AcademicOSMail.loadPreferences().catch(() => null);
    if (savedPreferences) systemData.mail.preferences = { ...systemData.mail.preferences, ...savedPreferences };
    saveSystemData();
    startGoogleWorkspaceTimer();
    await syncGoogleWorkspace(false);
    renderConnections();
}

async function connectMail() {
  if (!window.AcademicOSMail) return showToast("Mail services are still loading. Try again in a moment.");
  if (!window.AcademicOSMail.isConfigured()) return showToast("Add your Firebase web configuration to enable live Gmail.");
  const button = $("[data-google-connect]");
  if (button) { button.disabled = true; button.textContent = "Connecting…"; }
  try {
    const user = await window.AcademicOSMail.connect();
    await activateGoogleWorkspace(user);
  } catch (error) {
    showToast(error.message || "Google connection was not completed.");
    renderConnections();
  }
}

function startGoogleWorkspaceTimer() {
  if (window.__academicMailTimer) return;
  window.__academicMailTimer = window.setInterval(() => {
    if (systemData.mail.connection.connected) syncGoogleWorkspace(true);
  }, 300000);
}

function mergeGoogleCalendarEvents(events) {
  const incomingEvents = Array.isArray(events) ? events : events.events || [];
  incomingEvents.forEach(incoming => {
    const existing = systemData.events.find(event => event.externalId === incoming.externalId);
    if (!existing) {
      systemData.events.push(incoming);
      return;
    }
    const manualFields = new Set(existing.manualFields || []);
    Object.entries(incoming).forEach(([key, value]) => {
      if (!manualFields.has(key)) existing[key] = value;
    });
  });
}

function friendlyCalendarError(error) {
  const message = String(error?.message || "Google Calendar could not be synced.");
  if (/insufficient.*scope|authentication scopes|permission/i.test(message)) return "Reconnect Google to approve Calendar access.";
  if (/has not been used|accessnotconfigured|disabled/i.test(`${message} ${error?.reason || ""}`)) return "Google Calendar API must be enabled for this Firebase project.";
  if (error?.status === 401) return "Your Google session expired. Reconnect to continue syncing.";
  return message;
}

async function initializeGoogleWorkspace() {
  if (!window.AcademicOSMail?.isConfigured()) return;
  try {
    const restored = await window.AcademicOSMail.restoreSession();
    if (!restored?.connected) {
      systemData.mail.connection.connected = false;
      saveSystemData();
      renderConnections();
      if (state.view === "calendar") renderCalendarDashboard();
      return;
    }
    systemData.mail.connection = { ...systemData.mail.connection, mode: "live", connected: true, name: restored.name || "Google user", email: restored.email || "" };
    const savedPreferences = await window.AcademicOSMail.loadPreferences().catch(() => null);
    if (savedPreferences) systemData.mail.preferences = { ...systemData.mail.preferences, ...savedPreferences };
    saveSystemData();
    startGoogleWorkspaceTimer();
    const lastSyncAge = systemData.mail.connection.lastSync ? Date.now() - new Date(systemData.mail.connection.lastSync).getTime() : Infinity;
    if (lastSyncAge > 5 * 60 * 1000) await syncGoogleWorkspace(true);
    else {
      if (state.view === "mail") renderMailDashboard();
      if (state.view === "calendar") renderCalendarDashboard();
      if (state.view === "home") renderHome();
    }
    renderConnections();
  } catch {
    systemData.mail.connection.connected = false;
    saveSystemData();
    if (state.view === "calendar") renderCalendarDashboard();
  }
}

async function syncGoogleWorkspace(silent = true) {
  if (!systemData.mail.connection.connected || !window.AcademicOSMail) return;
  try {
    const start = new Date();
    start.setDate(start.getDate() - 30);
    const end = new Date();
    end.setDate(end.getDate() + 180);
    const [mailResult, calendarResult] = await Promise.allSettled([
      window.AcademicOSMail.fetchInbox(30),
      window.AcademicOSMail.fetchCalendarEvents(start.toISOString(), end.toISOString())
    ]);
    if (mailResult.status === "fulfilled") {
      const messages = mailResult.value;
      const aiResult = await window.AcademicOSMail.runAI({
        task: "triage",
        messages: messages.map(({ id, sender, subject, snippet, body, receivedAt }) => ({ id, sender, subject, snippet, body: body.slice(0, 4000), receivedAt })),
        preferences: systemData.mail.preferences
      }).catch(() => null);
      if (Array.isArray(aiResult?.messages)) {
        const insights = Object.fromEntries(aiResult.messages.map(item => [item.id, item]));
        messages.forEach(message => Object.assign(message, insights[message.id] || {}));
      }
      systemData.mail.messages = messages;
      systemData.mail.dailySummary = aiResult?.dailySummary || "";
      if (!messages.some(message => message.id === mailSelectedId)) mailSelectedId = messages[0]?.id || null;
      refreshMailSuggestions();
    }
    if (calendarResult.status === "fulfilled") {
      mergeGoogleCalendarEvents(calendarResult.value);
      systemData.mail.connection.calendarLastSync = new Date().toISOString();
      systemData.mail.connection.calendarError = "";
      systemData.mail.connection.calendarCount = calendarResult.value.calendars?.length || 1;
      systemData.mail.connection.googleEventCount = calendarResult.value.events?.length || 0;
    } else {
      systemData.mail.connection.calendarError = friendlyCalendarError(calendarResult.reason);
    }
    if (mailResult.status === "rejected" && calendarResult.status === "rejected") throw mailResult.reason;
    systemData.mail.connection.lastSync = new Date().toISOString();
    saveSystemData();
    if (state.view === "mail") renderMailDashboard();
    if (state.view === "calendar") renderCalendarDashboard();
    if (state.view === "home") renderHome();
    if (!silent) {
      if (calendarResult.status === "rejected") showToast(`Inbox synced, but Calendar needs attention: ${systemData.mail.connection.calendarError}`);
      else if (mailResult.status === "rejected") showToast("Google Calendar synced, but the inbox could not be refreshed.");
      else showToast("Mail and Google Calendar are up to date.");
    }
  } catch (error) {
    systemData.mail.connection.calendarError ||= friendlyCalendarError(error);
    saveSystemData();
    if (state.view === "calendar") renderCalendarDashboard();
    if (!silent) showToast(error.message || "Google sync needs to be reconnected in Settings.");
  }
}

const syncMail = syncGoogleWorkspace;

let aetherLoginInFlight = false;
let aetherActiveUid = null;
let aetherGuestMode = localStorage.getItem("aetherGuestMode") === "true";

function setLoginState(message, isError = false) {
  const status = $("#loginStatus");
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function showAetherLogin(message = "") {
  window.AetherWorkspace?.disableCloudSync();
  aetherActiveUid = null;
  $("#appShell").hidden = true;
  $("#loginGate").hidden = false;
  const button = $("#aetherGoogleLogin");
  button.disabled = !window.AcademicOSMail?.isConfigured();
  button.querySelector("span").textContent = "Continue with Google";
  setLoginState(message || (button.disabled ? "Firebase needs to be configured before sign-in." : ""), button.disabled);
  history.replaceState(null, "", "#login");
}

function enterAetherGuest() {
  aetherGuestMode = true;
  aetherActiveUid = "guest";
  localStorage.setItem("aetherGuestMode", "true");
  window.AetherWorkspace?.resetSessionState?.();
  window.AetherWorkspaceLoad?.("guest");
  window.AetherWorkspace?.disableCloudSync();
  window.AetherWorkspace?.setSyncLabel?.("Demo · local only", "local");
  window.AetherCurrentUserName = "Demo";
  $("#profileName").textContent = "Demo workspace";
  $("#profileEmail").textContent = "Labeled sample data";
  $("#profileAvatar").textContent = "D";
  $("#profileButton").title = "Exit demo mode";
  $("#loginGate").hidden = true;
  $("#appShell").hidden = false;
  window.AetherModules?.showDemoBanner?.(true);
  window.AetherCore?.applyDocumentTheme?.(systemData.profile || {});
  try { if (typeof applyTheme === "function") applyTheme(); } catch (error) { console.warn("Theme apply failed", error); }
  if (typeof applyTabPreferences === "function") applyTabPreferences();
  if (location.hash === "#login" || location.hash === "#/login") history.replaceState(null, "", location.pathname);
  switchView("home");
  updateHomeClock?.();
  renderHome();
  showToast("Demo mode ready — data is labeled and separate from Google accounts.");
}

function updateAetherProfile(user) {
  const name = user.name || user.displayName || user.email?.split("@")[0] || "Aether user";
  const email = user.email || "Sign out";
  window.AetherCurrentUserName = name.split(/\s+/)[0];
  $("#profileName").textContent = name;
  $("#profileEmail").textContent = email;
  $("#profileAvatar").textContent = name.split(/\s+/).map(part => part[0]).slice(0, 2).join("").toUpperCase() || "A";
  $("#profileButton").title = "Sign out of Aether";
  const self = systemData.contacts.find(contact => contact.id === "c1");
  if (self) { self.name = name; self.email = user.email || self.email; }
  renderHome();
  saveSystemData();
}

async function enterAether(user, liveGoogleUser = null) {
  const uid = user?.uid;
  if (!uid || (aetherActiveUid === uid && !liveGoogleUser)) return;
  aetherGuestMode = false;
  localStorage.removeItem("aetherGuestMode");
  window.AetherWorkspace?.resetSessionState?.();
  if (aetherActiveUid && aetherActiveUid !== uid) {
    // Switching accounts — never merge prior local state into the new uid.
  }
  aetherActiveUid = uid;
  window.AetherWorkspaceLoad?.(uid);
  window.AetherModules?.showDemoBanner?.(false);
  $("#aetherGoogleLogin").disabled = true;
  setLoginState("Restoring your Aether workspace…");
  let cloudWorkspace = null;
  try { cloudWorkspace = await window.AcademicOSMail.loadWorkspace(); } catch { cloudWorkspace = null; }
  if (cloudWorkspace) window.AetherWorkspace?.hydrate(cloudWorkspace);
  else {
    // Fresh account: empty personal workspace already loaded for this uid.
    window.AetherModules?.ensureShape?.(systemData);
    if (systemData.mail?.messages?.length && systemData.mail.connection.mode === "demo") {
      systemData.mail.messages = [];
      systemData.mailSuggestions = [];
    }
    saveSystemData();
  }
  window.AetherWorkspace?.enableCloudSync();
  updateAetherProfile(liveGoogleUser || user);
  $("#loginGate").hidden = true;
  $("#appShell").hidden = false;
  if (location.hash === "#login") switchView("home");
  if (!cloudWorkspace) {
    await window.AetherWorkspace?.saveNow();
    if (!systemData.profile?.onboarded) setTimeout(() => window.AetherModules?.openOnboarding?.(), 350);
  }
  if (liveGoogleUser) await activateGoogleWorkspace(liveGoogleUser);
  else await initializeGoogleWorkspace();
}

async function initializeAetherAuth() {
  const service = window.AcademicOSMail;
  const loginButton = $("#aetherGoogleLogin");
  const guestButton = $("#aetherGuestLogin");
  guestButton.addEventListener("click", () => enterAetherGuest());
  if (!service?.isConfigured()) {
    if (aetherGuestMode) enterAetherGuest();
    else showAetherLogin("Firebase needs to be configured before sign-in.");
    return;
  }
  loginButton.disabled = false;
  loginButton.addEventListener("click", async () => {
    aetherLoginInFlight = true;
    loginButton.disabled = true;
    loginButton.querySelector("span").textContent = "Connecting…";
    setLoginState("Google will ask once for Gmail and Calendar access.");
    try {
      const googleUser = await service.connect();
      await enterAether(googleUser, googleUser);
    } catch (error) {
      loginButton.disabled = false;
      loginButton.querySelector("span").textContent = "Continue with Google";
      setLoginState(error.message || "Google sign-in was not completed.", true);
    } finally {
      aetherLoginInFlight = false;
    }
  });
  $("#profileButton").addEventListener("click", async () => {
    if (aetherGuestMode) {
      aetherGuestMode = false;
      aetherActiveUid = null;
      localStorage.removeItem("aetherGuestMode");
      showAetherLogin();
      return;
    }
    if (!confirm("Sign out of Aether on this device?")) return;
    await window.AetherWorkspace?.saveNow();
    await service.disconnect();
  });
  await service.observeAuth(user => {
    if (aetherLoginInFlight) return;
    if (aetherGuestMode) enterAetherGuest();
    else if (!user) showAetherLogin();
    else enterAether(user);
  });
}

function renderHomeMailWidgets() {
  const root = $("#homeMailIntelligence");
  if (!root) return;
  // Home command center owns the dashboard; keep mail widgets off the home canvas.
  root.hidden = true;
  root.innerHTML = "";
}

async function generateReplyDraft(root, selected, prefs, button = null) {
  const textarea = root.querySelector("[data-reply-draft]");
  const tone = root.querySelector("[data-reply-tone]")?.value || prefs.replyTone;
  if (!textarea) return;
  if (button) { button.disabled = true; button.textContent = "Drafting…"; }
  textarea.placeholder = "Drafting a context-aware reply…";
  try {
    const result = await window.AcademicOSMail?.runAI({ task: "draft", message: selected, preferences: { ...prefs, replyTone: tone } });
    textarea.value = result?.draft || localReplyDraft(selected, tone);
  } catch { textarea.value = localReplyDraft(selected, tone); }
  textarea.placeholder = "Edit your reply";
  if (button) { button.disabled = false; button.textContent = "✦ Regenerate"; }
}

async function moveMailToTrash(message) {
  if (!confirm(`Move “${message.subject}” to Trash?`)) return;
  const button = $("[data-trash-mail]");
  if (button) { button.disabled = true; button.textContent = "Moving…"; }
  try {
    if (systemData.mail.connection.connected && message.source === "Gmail") await window.AcademicOSMail.trashMessage(message.id);
    systemData.mail.messages = systemData.mail.messages.filter(item => item.id !== message.id);
    systemData.mailSuggestions.filter(item => item.mailMessageId === message.id && item.status === "pending").forEach(item => { item.status = "dismissed"; });
    mailSelectedId = systemData.mail.messages[0]?.id || null;
    saveSystemData();
    renderMailDashboard();
    renderHomeMailWidgets();
    showToast("Message moved to Trash.");
  } catch (error) {
    if (button) { button.disabled = false; button.textContent = "Trash"; }
    showToast(error.message || "The message could not be moved to Trash.");
  }
}

function renderMailDashboard() {
  const root = $("#mailDashboard");
  if (!root) return;
  refreshMailSuggestions();
  const prefs = systemData.mail.preferences;
  const allMessages = systemData.mail.messages;
  const visibleMessages = allMessages.filter(message => {
    const category = message.category || classifyMail(message);
    const matchesFilter = mailFilter === "all" || category === mailFilter;
    const haystack = `${message.sender} ${message.subject} ${message.body || message.snippet}`.toLowerCase();
    const matchesQuery = haystack.includes(mailQuery.toLowerCase());
    const visibleNewsletter = prefs.newsletters !== "hide" || category !== "Newsletters" || mailFilter === "Newsletters" || mailQuery;
    return matchesFilter && matchesQuery && visibleNewsletter;
  }).sort((a, b) => mailPriorityScore(b) - mailPriorityScore(a) || b.receivedAt.localeCompare(a.receivedAt));
  if (!visibleMessages.some(message => message.id === mailSelectedId)) mailSelectedId = visibleMessages[0]?.id || null;
  const selected = allMessages.find(message => message.id === mailSelectedId);
  const urgent = allMessages.filter(message => message.urgency === "urgent");
  const pending = systemData.mailSuggestions.filter(item => item.status === "pending");
  const connected = systemData.mail.connection.connected;
  root.innerHTML = systemHeader("AI MAILROOM", "Mail", "A focused inbox that turns messages into actions, replies, and calendar-ready decisions.", [[allMessages.filter(item => item.unread).length, "UNREAD"], [urgent.length, "URGENT"], [pending.length, "CALENDAR PROPOSALS"]]) + `
    <section class="mail-workspace">
      <div class="mail-inbox-panel"><div class="mail-inbox-head"><div><p class="kicker">CURATED INBOX</p><h2>${visibleMessages.length} messages</h2></div><label class="mail-search"><span class="search-icon"></span><input data-mail-search type="search" value="${escapeHtml(mailQuery)}" placeholder="Search mail"></label></div><div class="mail-filter-row"><button class="filter-chip ${mailFilter === "all" ? "active" : ""}" data-mail-filter="all" type="button">All</button>${mailCategories.map(category => `<button class="filter-chip ${mailFilter === category ? "active" : ""}" data-mail-filter="${category}" type="button">${category}</button>`).join("")}</div><div class="mail-list">${visibleMessages.map(message => `<button class="mail-row ${message.id === mailSelectedId ? "active" : ""} ${message.unread ? "unread" : ""}" data-mail-message="${message.id}" type="button"><span class="mail-avatar">${systemInitials(senderName(message.sender))}</span><span class="mail-row-copy"><span><strong>${escapeHtml(senderName(message.sender))}</strong><time>${mailTime(message.receivedAt)}</time></span><b>${escapeHtml(message.subject)}</b><small>${escapeHtml(message.snippet || message.body).slice(0, 110)}</small><em class="mail-category category-${message.category.toLowerCase()}">${escapeHtml(message.category)}</em></span></button>`).join("") || `<div class="mail-empty"><span>✉</span><strong>No messages found</strong><p>Try another category or search term.</p></div>`}</div></div>
      <aside class="mail-reader">${selected ? `<div class="mail-reader-head"><div><span class="mail-category category-${selected.category.toLowerCase()}">${escapeHtml(selected.category)}</span><h2>${escapeHtml(selected.subject)}</h2><p>From ${escapeHtml(selected.sender)} · ${mailTime(selected.receivedAt)}</p></div><div class="mail-reader-actions"><button class="button secondary" data-mail-read="${selected.id}" type="button">${selected.unread ? "Mark read" : "Mark unread"}</button><button class="button danger" data-trash-mail="${selected.id}" type="button">Trash</button></div></div><div class="mail-body">${escapeHtml(selected.body || selected.snippet).replaceAll("\n", "<br>")}</div><details class="reply-assistant" data-reply-assistant><summary><span class="mail-spark">✦</span><span><small>AI QUICK-REPLY</small><strong>Draft a context-aware response</strong></span><i>⌄</i></summary><div class="reply-content"><div class="reply-toolbar"><label>Reply tone<select data-reply-tone aria-label="Reply tone"><option value="concise" ${prefs.replyTone === "concise" ? "selected" : ""}>Concise</option><option value="warm" ${prefs.replyTone === "warm" ? "selected" : ""}>Warm</option><option value="formal" ${prefs.replyTone === "formal" ? "selected" : ""}>Formal</option></select></label></div><textarea data-reply-draft rows="7" placeholder="Open the assistant to generate a draft"></textarea><div class="reply-actions"><button class="button secondary" data-generate-reply="${selected.id}" type="button">✦ Regenerate</button><button class="button primary" data-save-draft="${selected.id}" type="button" ${connected ? "" : "disabled"}>Save to Gmail drafts</button></div>${!connected ? `<small>Reconnect Google from Settings to save drafts.</small>` : ""}</div></details>` : `<div class="mail-empty reader-empty"><span>✉</span><strong>Select a message</strong><p>Its contents and reply assistant will appear here.</p></div>`}</aside>
    </section>`;

  root.querySelectorAll("[data-mail-filter]").forEach(button => button.addEventListener("click", () => { mailFilter = button.dataset.mailFilter; renderMailDashboard(); }));
  root.querySelector("[data-mail-search]")?.addEventListener("input", event => {
    mailQuery = event.target.value;
    renderMailDashboard();
    requestAnimationFrame(() => { const input = root.querySelector("[data-mail-search]"); input?.focus(); input?.setSelectionRange(mailQuery.length, mailQuery.length); });
  });
  root.querySelectorAll("[data-mail-message]").forEach(button => button.addEventListener("click", () => {
    mailSelectedId = button.dataset.mailMessage;
    const message = allMessages.find(item => item.id === mailSelectedId);
    if (message?.unread) {
      message.unread = false;
      if (connected) window.AcademicOSMail?.setRead(message.id, true).catch(() => {});
    }
    saveSystemData();
    renderMailDashboard();
  }));
  root.querySelector("[data-mail-read]")?.addEventListener("click", () => {
    selected.unread = !selected.unread;
    if (connected) window.AcademicOSMail?.setRead(selected.id, !selected.unread).catch(() => {});
    saveSystemData(); renderMailDashboard();
  });
  root.querySelector("[data-trash-mail]")?.addEventListener("click", () => moveMailToTrash(selected));
  const assistant = root.querySelector("[data-reply-assistant]");
  assistant?.addEventListener("toggle", () => {
    if (assistant.open && !assistant.dataset.generated) {
      assistant.dataset.generated = "true";
      generateReplyDraft(root, selected, prefs, root.querySelector("[data-generate-reply]"));
    }
  });
  root.querySelector("[data-reply-tone]")?.addEventListener("change", () => generateReplyDraft(root, selected, prefs));
  root.querySelector("[data-generate-reply]")?.addEventListener("click", event => generateReplyDraft(root, selected, prefs, event.currentTarget));
  root.querySelector("[data-save-draft]")?.addEventListener("click", async event => {
    const button = event.currentTarget; button.disabled = true; button.textContent = "Saving…";
    try { await window.AcademicOSMail.createDraft(selected, root.querySelector("[data-reply-draft]").value); button.textContent = "Saved to Gmail"; showToast("Reply saved to Gmail drafts."); }
    catch (error) { button.disabled = false; button.textContent = "Save to Gmail drafts"; showToast(error.message || "Draft could not be saved."); }
  });
  const navCount = $("#mailNavCount");
  if (navCount) { navCount.textContent = urgent.length; navCount.hidden = !urgent.length; }
}

document.addEventListener("academic-os-mail-ready", initializeAetherAuth, { once: true });
