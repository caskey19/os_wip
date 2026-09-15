const mailCategories = ["Announcements", "Deadlines", "Networking", "Newsletters"];

function classifyMail(message) {
  const text = `${message.sender} ${message.subject} ${message.body || message.snippet || ""}`.toLowerCase();
  if (/newsletter|digest|headlines|roundup|unsubscribe/.test(text)) return "Newsletters";
  if (/due|deadline|exam|quiz|assignment|problem set|submit|action required/.test(text)) return "Deadlines";
  if (/network|recruit|career|coffee chat|interview|alumni|opportunity/.test(text)) return "Networking";
  return "Announcements";
}

function mailUrgency(message) {
  if (message.urgency) return message.urgency;
  const text = `${message.subject} ${message.body || message.snippet || ""}`.toLowerCase();
  if (/urgent|action required|today|tomorrow|deadline|due|confirm|response requested/.test(text)) return "urgent";
  if (/this week|meeting|exam|register|invitation|request/.test(text)) return "soon";
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
    message.category ||= classifyMail(message);
    message.urgency ||= mailUrgency(message);
    if (systemData.mailSuggestions.some(item => item.mailMessageId === message.id)) return;
    const extracted = extractMailEvent(message);
    if (!extracted) return;
    const hoursAway = (new Date(`${extracted.date}T${extracted.start}:00`) - new Date()) / 36e5;
    if (hoursAway >= 0 && hoursAway <= Number(systemData.mail.preferences.urgencyWindow || 48)) message.urgency = "urgent";
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
  return `${opening}\n\n${response}\n\nBest,\nBlake`;
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
  saveSystemData();
  if (systemData.mail.connection.connected) {
    window.AcademicOSMail?.createCalendarEvent(event).then(receipt => {
      suggestion.googleEventId = receipt?.id || null;
      suggestion.syncState = "synced";
      saveSystemData();
    }).catch(() => { suggestion.syncState = "local"; saveSystemData(); });
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

async function connectMail() {
  if (!window.AcademicOSMail) return showToast("Mail services are still loading. Try again in a moment.");
  if (!window.AcademicOSMail.isConfigured()) return showToast("Add your Firebase web configuration to enable live Gmail.");
  const button = $("[data-mail-connect]");
  if (button) { button.disabled = true; button.textContent = "Connecting…"; }
  try {
    const user = await window.AcademicOSMail.connect();
    systemData.mail.connection = { mode: "live", connected: true, name: user.name || "Google user", email: user.email || "", lastSync: null };
    const savedPreferences = await window.AcademicOSMail.loadPreferences().catch(() => null);
    if (savedPreferences) systemData.mail.preferences = { ...systemData.mail.preferences, ...savedPreferences };
    saveSystemData();
    if (!window.__academicMailTimer) window.__academicMailTimer = window.setInterval(() => { if (systemData.mail.connection.connected) syncMail(true); }, 300000);
    await syncMail();
  } catch (error) {
    showToast(error.message || "Google connection was not completed.");
    renderMailDashboard();
  }
}

async function syncMail(silent = false) {
  if (!systemData.mail.connection.connected || !window.AcademicOSMail) return connectMail();
  const button = $("[data-mail-sync]");
  if (button) { button.disabled = true; button.textContent = "Syncing…"; }
  try {
    const messages = await window.AcademicOSMail.fetchInbox(30);
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
    systemData.mail.connection.lastSync = new Date().toISOString();
    mailSelectedId = messages[0]?.id || null;
    refreshMailSuggestions();
    renderMailDashboard();
    if (!silent) showToast(`${messages.length} inbox messages synced.`);
  } catch (error) {
    showToast(error.message || "Inbox sync failed. Reconnect Google and try again.");
    renderMailDashboard();
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
  const connectionText = connected ? `${escapeHtml(systemData.mail.connection.email)} · ${systemData.mail.connection.lastSync ? `synced ${mailTime(systemData.mail.connection.lastSync)}` : "ready to sync"}` : "Demo inbox · connect Google for live mail";
  root.innerHTML = systemHeader("AI MAILROOM", "Mail", "A focused inbox that turns messages into actions, replies, and calendar-ready decisions.", [[allMessages.filter(item => item.unread).length, "UNREAD"], [urgent.length, "URGENT"], [pending.length, "CALENDAR PROPOSALS"]]) + `
    ${!prefs.onboarded ? `<section class="mail-onboarding-banner"><div><span class="mail-spark">✦</span><div><p class="kicker">MAKE IT YOURS</p><h2>Train your inbox in five quick questions</h2><p>Choose what matters, how replies sound, and when Calendar should act.</p></div></div><div><button class="button secondary" data-mail-defaults type="button">Use smart defaults</button><button class="button primary" data-mail-onboarding type="button">Personalize inbox</button></div></section>` : ""}
    <section class="mail-status-bar"><div><span class="sync-dot ${connected ? "" : "demo"}"></span><strong>${connected ? "Google connected" : "Preview mode"}</strong><small>${connectionText}</small></div><div><button class="button secondary" data-mail-onboarding type="button">Triage settings</button>${connected ? `<button class="button primary" data-mail-sync type="button">Sync inbox</button>` : `<button class="button primary" data-mail-connect type="button">Connect Google</button>`}</div></section>
    <section class="mail-signal-grid">
      <article class="mail-summary-card"><div class="mail-card-top"><div><p class="kicker">AI DAILY SUMMARY</p><h2>Your inbox, distilled</h2></div><span>Updated now</span></div><p class="mail-summary-copy">${escapeHtml(mailSummary(allMessages))}</p><div class="mail-summary-stats">${mailCategories.map(category => `<span><strong>${allMessages.filter(message => message.category === category).length}</strong>${category}</span>`).join("")}</div></article>
      <article class="urgent-card"><div class="mail-card-top"><div><p class="kicker">URGENT ACTIONS</p><h2>Needs your attention</h2></div><span class="urgent-count">${urgent.length}</span></div><div class="urgent-list">${urgent.slice(0, 3).map(message => `<button data-mail-message="${message.id}" type="button"><span class="urgency-dot"></span><span><strong>${escapeHtml(message.subject)}</strong><small>${escapeHtml(senderName(message.sender))} · ${mailTime(message.receivedAt)}</small></span><b>→</b></button>`).join("") || `<div class="empty-list">No urgent requests detected.</div>`}</div></article>
    </section>
    <section class="mail-workspace">
      <div class="mail-inbox-panel"><div class="mail-inbox-head"><div><p class="kicker">CURATED INBOX</p><h2>${visibleMessages.length} messages</h2></div><label class="mail-search"><span class="search-icon"></span><input data-mail-search type="search" value="${escapeHtml(mailQuery)}" placeholder="Search mail"></label></div><div class="mail-filter-row"><button class="filter-chip ${mailFilter === "all" ? "active" : ""}" data-mail-filter="all" type="button">All</button>${mailCategories.map(category => `<button class="filter-chip ${mailFilter === category ? "active" : ""}" data-mail-filter="${category}" type="button">${category}</button>`).join("")}</div><div class="mail-list">${visibleMessages.map(message => `<button class="mail-row ${message.id === mailSelectedId ? "active" : ""} ${message.unread ? "unread" : ""}" data-mail-message="${message.id}" type="button"><span class="mail-avatar">${systemInitials(senderName(message.sender))}</span><span class="mail-row-copy"><span><strong>${escapeHtml(senderName(message.sender))}</strong><time>${mailTime(message.receivedAt)}</time></span><b>${escapeHtml(message.subject)}</b><small>${escapeHtml(message.snippet || message.body).slice(0, 110)}</small><em class="mail-category category-${message.category.toLowerCase()}">${escapeHtml(message.category)}</em></span></button>`).join("") || `<div class="mail-empty"><span>✉</span><strong>No messages found</strong><p>Try another category or search term.</p></div>`}</div></div>
      <aside class="mail-reader">${selected ? `<div class="mail-reader-head"><div><span class="mail-category category-${selected.category.toLowerCase()}">${escapeHtml(selected.category)}</span><h2>${escapeHtml(selected.subject)}</h2><p>From ${escapeHtml(selected.sender)} · ${mailTime(selected.receivedAt)}</p></div><button class="button secondary" data-mail-read="${selected.id}" type="button">${selected.unread ? "Mark read" : "Mark unread"}</button></div><div class="mail-body">${escapeHtml(selected.body || selected.snippet).replaceAll("\n", "<br>")}</div><div class="reply-assistant"><div class="reply-head"><div><span class="mail-spark">✦</span><div><p class="kicker">QUICK-REPLY ASSISTANT</p><h3>Context-aware draft</h3></div></div><select data-reply-tone aria-label="Reply tone"><option value="concise" ${prefs.replyTone === "concise" ? "selected" : ""}>Concise</option><option value="warm" ${prefs.replyTone === "warm" ? "selected" : ""}>Warm</option><option value="formal" ${prefs.replyTone === "formal" ? "selected" : ""}>Formal</option></select></div><textarea data-reply-draft rows="7">${escapeHtml(localReplyDraft(selected))}</textarea><div class="reply-actions"><button class="button secondary" data-generate-reply="${selected.id}" type="button">✦ Regenerate</button><button class="button primary" data-save-draft="${selected.id}" type="button" ${connected ? "" : "disabled"}>Save to Gmail drafts</button></div>${!connected ? `<small>Connect Google to save this reply directly to Gmail.</small>` : ""}</div>` : `<div class="mail-empty reader-empty"><span>✉</span><strong>Select a message</strong><p>Its contents and reply assistant will appear here.</p></div>`}</aside>
    </section>`;

  root.querySelectorAll("[data-mail-onboarding]").forEach(button => button.addEventListener("click", mailOnboarding));
  root.querySelector("[data-mail-defaults]")?.addEventListener("click", useMailDefaults);
  root.querySelector("[data-mail-connect]")?.addEventListener("click", connectMail);
  root.querySelector("[data-mail-sync]")?.addEventListener("click", syncMail);
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
  root.querySelector("[data-reply-tone]")?.addEventListener("change", event => { root.querySelector("[data-reply-draft]").value = localReplyDraft(selected, event.target.value); });
  root.querySelector("[data-generate-reply]")?.addEventListener("click", async event => {
    const button = event.currentTarget, textarea = root.querySelector("[data-reply-draft]"), tone = root.querySelector("[data-reply-tone]").value;
    button.disabled = true; button.textContent = "Drafting…";
    try {
      const result = await window.AcademicOSMail?.runAI({ task: "draft", message: selected, preferences: { ...prefs, replyTone: tone } });
      textarea.value = result?.draft || localReplyDraft(selected, tone);
      showToast(result?.draft ? "AI reply drafted." : "Reply refreshed with your preferences.");
    } catch (error) { textarea.value = localReplyDraft(selected, tone); showToast(error.message || "Used the on-device reply assistant."); }
    button.disabled = false; button.textContent = "✦ Regenerate";
  });
  root.querySelector("[data-save-draft]")?.addEventListener("click", async event => {
    const button = event.currentTarget; button.disabled = true; button.textContent = "Saving…";
    try { await window.AcademicOSMail.createDraft(selected, root.querySelector("[data-reply-draft]").value); button.textContent = "Saved to Gmail"; showToast("Reply saved to Gmail drafts."); }
    catch (error) { button.disabled = false; button.textContent = "Save to Gmail drafts"; showToast(error.message || "Draft could not be saved."); }
  });
  const navCount = $("#mailNavCount");
  if (navCount) { navCount.textContent = urgent.length; navCount.hidden = !urgent.length; }
}
