/**
 * Aether modules — onboarding, tasks/goals, notifications,
 * interactive network helpers, health connect UI, home widgets, motion.
 * Loaded after app.js; patches and extends runtime.
 */
(function (global) {
  const Core = () => global.AetherCore;
  let networkPan = { x: 0, y: 0, scale: 1 };
  let graphDragging = null;

  function ensureShape(data) {
    if (!data || typeof data !== "object") return Core().emptyWorkspace();
    const base = Core().emptyWorkspace();
    Object.keys(base).forEach(key => {
      if (data[key] === undefined) data[key] = structuredClone(base[key]);
    });
    if (!data.profile) data.profile = structuredClone(Core().DEFAULT_PROFILE);
    if (!Array.isArray(data.tasks)) data.tasks = [];
    if (!Array.isArray(data.athleteGoals)) data.athleteGoals = [];
    if (!Array.isArray(data.reviewQueue)) data.reviewQueue = [];
    if (!Array.isArray(data.notifications)) data.notifications = [];
    if (!data.providers) data.providers = {};
    // Drop legacy capital fields from profile
    if (data.profile) {
      delete data.profile.capitalModules;
      delete data.profile.capitalPinHash;
      delete data.profile.capitalPinEnabled;
      if (data.profile.tabs) delete data.profile.tabs.capital;
      if (Array.isArray(data.profile.homeWidgets)) {
        data.profile.homeWidgets = data.profile.homeWidgets.filter(w => w.id !== "capital");
      }
    }
    return data;
  }

  function pushNotification(title, body, type = "system") {
    if (!global.systemData) return;
    global.systemData.notifications = global.systemData.notifications || [];
    global.systemData.notifications.unshift({
      id: `n${Date.now()}`,
      title,
      body,
      type,
      read: false,
      at: new Date().toISOString()
    });
    global.systemData.notifications = global.systemData.notifications.slice(0, 40);
    renderNotificationBell();
    if (typeof global.saveSystemData === "function") global.saveSystemData();
  }

  function renderNotificationBell() {
    const badge = document.querySelector("#notificationBadge");
    const list = document.querySelector("#notificationList");
    if (!badge || !global.systemData) return;
    const unread = (global.systemData.notifications || []).filter(n => !n.read).length;
    badge.hidden = unread === 0;
    badge.textContent = String(unread);
    if (list) {
      const items = global.systemData.notifications || [];
      list.innerHTML = items.length
        ? items.slice(0, 12).map(n => `<button class="notification-item ${n.read ? "" : "unread"}" data-notification-id="${n.id}" type="button"><strong>${escape(n.title)}</strong><span>${escape(n.body)}</span><small>${new Date(n.at).toLocaleString()}</small></button>`).join("")
        : `<p class="empty-soft">No notifications yet.</p>`;
      list.querySelectorAll("[data-notification-id]").forEach(btn => btn.addEventListener("click", () => {
        const note = global.systemData.notifications.find(n => n.id === btn.dataset.notificationId);
        if (note) note.read = true;
        if (typeof global.saveSystemData === "function") global.saveSystemData();
        renderNotificationBell();
      }));
    }
  }

  function escape(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function showDemoBanner(isGuest) {
    const banner = document.querySelector("#demoBanner");
    if (!banner) return;
    banner.hidden = !isGuest;
  }

  function openOnboarding(force = false) {
    const profile = global.systemData?.profile;
    if (!force && profile?.onboarded) return;
    const dialog = document.querySelector("#onboardingModal");
    if (!dialog) return;
    let step = 0;
    const draft = structuredClone(profile || Core().DEFAULT_PROFILE);
    const render = () => {
      const schools = Core().SCHOOLS;
      const sports = Core().SPORTS;
      const steps = [
        {
          title: "Welcome to Aether",
          body: `<p class="onboard-copy">Your student-athlete operating system. Curate the OS around your school, sport, and daily priorities — or start with defaults.</p>
            <div class="onboard-actions-inline">
              <button class="button primary" data-onboard-defaults type="button">Use defaults</button>
              <button class="button secondary" data-onboard-next type="button">Curate my OS</button>
            </div>`
        },
        {
          title: "School & sport",
          body: `<label>School<select name="schoolId">${schools.map(s => `<option value="${s.id}" ${draft.schoolId === s.id ? "selected" : ""}>${escape(s.name)}</option>`).join("")}</select></label>
            <label>Sport<select name="sport">${sports.map(s => `<option ${draft.sport === s ? "selected" : ""}>${escape(s)}</option>`).join("")}</select></label>
            <p class="onboard-copy">Accent stays amber across all schools — school and sport are profile metadata only.</p>`
        },
        {
          title: "Look & tabs",
          body: `<div class="segmented onboard-theme" role="group">
              <button type="button" class="segment ${draft.baseTheme !== "light" ? "active" : ""}" data-base-theme="charcoal">Charcoal amber</button>
              <button type="button" class="segment ${draft.baseTheme === "light" ? "active" : ""}" data-base-theme="light">Light charcoal</button>
            </div>
            <div class="onboard-tabs">${Object.entries({ academic: "Academic", tasks: "Tasks & Goals", networking: "Network", calendar: "Calendar", health: "Health" }).map(([id, label]) => `
              <label class="tab-setting-row"><span><strong>${label}</strong></span><input type="checkbox" data-tab="${id}" ${draft.tabs?.[id] !== false ? "checked" : ""}><i></i></label>`).join("")}</div>`
        },
        {
          title: "Mail priorities",
          body: `<p class="onboard-copy">Choose who matters most in your inbox. Editable later in Settings.</p>
            <div class="chip-select">${["professors", "coaches", "recruiters", "teammates", "financial", "family"].map(item => `
              <label class="choice-chip"><input type="checkbox" data-mail-priority="${item}" ${(draft.mailPriorities || []).includes(item) ? "checked" : ""}> ${item}</label>`).join("")}</div>`
        },
        {
          title: "Home command center",
          body: `<p class="onboard-copy">Pick widgets and how each one renders.</p>
            <div class="widget-builder">${(draft.homeWidgets || Core().DEFAULT_WIDGETS).map(w => `
              <label class="widget-row"><input type="checkbox" data-widget="${w.id}" ${w.enabled ? "checked" : ""}>
                <strong>${w.id}</strong>
                <select data-widget-mode="${w.id}">${["kpi", "list", "bullets", "chart"].map(m => `<option ${w.mode === m ? "selected" : ""}>${m}</option>`).join("")}</select>
              </label>`).join("")}</div>`
        },
      ];
      const current = steps[step];
      dialog.innerHTML = `<form class="onboard-panel" id="onboardForm">
        <div class="onboard-progress">${steps.map((_, i) => `<i class="${i <= step ? "on" : ""}"></i>`).join("")}</div>
        <p class="kicker">AETHER SETUP · ${step + 1}/${steps.length}</p>
        <h2>${current.title}</h2>
        <div class="onboard-body">${current.body}</div>
        <div class="modal-actions">
          ${step > 0 ? `<button class="button secondary" type="button" data-onboard-back>Back</button>` : `<span class="form-spacer"></span>`}
          <span class="form-spacer"></span>
          ${step < steps.length - 1
            ? `<button class="button primary" type="button" data-onboard-next>Continue</button>`
            : `<button class="button primary" type="submit">Enter Aether</button>`}
        </div>
      </form>`;

      dialog.querySelector("[data-onboard-defaults]")?.addEventListener("click", async () => {
        await finishOnboarding({ ...Core().DEFAULT_PROFILE, onboarded: true, schoolId: "custom", schoolName: "", sport: "" });
      });
      dialog.querySelectorAll("[data-base-theme]").forEach(btn => btn.addEventListener("click", () => {
        draft.baseTheme = btn.dataset.baseTheme;
        render();
      }));
      dialog.querySelector("[data-onboard-back]")?.addEventListener("click", () => { step -= 1; render(); });
      dialog.querySelector("[data-onboard-next]")?.addEventListener("click", () => {
        readStep();
        step += 1;
        render();
      });
      dialog.querySelector("#onboardForm")?.addEventListener("submit", async event => {
        event.preventDefault();
        readStep();
        await finishOnboarding(draft);
      });

      function readStep() {
        const form = dialog.querySelector("#onboardForm");
        const schoolId = form.querySelector('[name="schoolId"]')?.value;
        if (schoolId) {
          const school = Core().SCHOOLS.find(s => s.id === schoolId);
          draft.schoolId = schoolId;
          draft.schoolName = school?.name || "";
        }
        const sport = form.querySelector('[name="sport"]')?.value;
        if (sport) draft.sport = sport;
        draft.accent = Core().FIXED_ACCENT;
        if (form.querySelector("[data-tab]")) {
          draft.tabs = draft.tabs || {};
          form.querySelectorAll("[data-tab]").forEach(input => { draft.tabs[input.dataset.tab] = input.checked; });
        }
        if (form.querySelector("[data-mail-priority]")) {
          draft.mailPriorities = [...form.querySelectorAll("[data-mail-priority]:checked")].map(i => i.dataset.mailPriority);
        }
        if (form.querySelector("[data-widget]")) {
          draft.homeWidgets = [...form.querySelectorAll("[data-widget]")].map(input => ({
            id: input.dataset.widget,
            enabled: input.checked,
            mode: form.querySelector(`[data-widget-mode="${input.dataset.widget}"]`)?.value || "list"
          }));
        }
      }
    };

    async function finishOnboarding(next) {
      next.accent = Core().FIXED_ACCENT;
      delete next.capitalPinHash;
      delete next.capitalPinEnabled;
      delete next.capitalModules;
      next.onboarded = true;
      global.systemData.profile = next;
      if (global.tabPreferences && next.tabs) Object.assign(global.tabPreferences, next.tabs);
      Core().applyDocumentTheme(next);
      if (typeof global.applyTabPreferences === "function") global.applyTabPreferences();
      if (typeof global.saveSystemData === "function") global.saveSystemData();
      localStorage.setItem(Core().key("profile"), JSON.stringify(next));
      dialog.close();
      pushNotification("OS curated", "Your Aether layout is saved to this account.", "system");
      if (typeof global.renderHome === "function") global.renderHome();
      if (typeof global.renderSettings === "function" && global.state?.view === "settings") global.renderSettings();
      showToastSafe("Welcome to Aether.");
    }

    render();
    if (!dialog.open) dialog.showModal();
  }

  function showToastSafe(message) {
    if (typeof global.showToast === "function") global.showToast(message);
  }


  function renderTasksDashboard() {
    const root = document.querySelector("#tasksDashboard");
    if (!root || !global.systemData) return;
    ensureShape(global.systemData);
    const tasks = global.systemData.tasks || [];
    const goals = global.systemData.athleteGoals || [];
    const open = tasks.filter(t => t.status !== "done");
    root.innerHTML = `
      <section class="page-heading system-heading">
        <div><p class="eyebrow">EXECUTION</p><h1>Tasks &amp; Goals</h1><p>Obligations and long-range targets that mail, health, and calendar can reinforce.</p></div>
        <div class="system-stats"><div><strong>${open.length}</strong><span>OPEN</span></div><div><strong>${goals.length}</strong><span>GOALS</span></div><div><strong>${tasks.filter(t => t.priority === "high" && t.status !== "done").length}</strong><span>HIGH</span></div></div>
      </section>
      <section class="system-split tasks-workspace">
        <div class="collection-panel">
          <div class="panel-heading"><div><p class="kicker">TASKS</p><h2>What must get done</h2></div><button class="text-button" data-add-task type="button">+ Add task</button></div>
          ${tasks.length ? tasks.map(task => `
            <article class="task-row ${task.status === "done" ? "done" : ""}">
              <button class="task-check" data-toggle-task="${task.id}" type="button" aria-label="Toggle">${task.status === "done" ? "✓" : ""}</button>
              <div class="task-copy"><strong>${escape(task.title)}</strong><small>${escape(task.area || "General")} · ${task.due ? escape(task.due) : "No due date"} · ${escape(task.priority || "medium")}</small></div>
              <button class="text-button" data-edit-task="${task.id}" type="button">Edit</button>
            </article>`).join("") : `<div class="empty-list">No tasks yet. Add one or approve a mail detection.</div>`}
        </div>
        <aside class="collection-panel">
          <div class="panel-heading"><div><p class="kicker">GOALS</p><h2>Season &amp; semester</h2></div><button class="text-button" data-add-athlete-goal type="button">+ Add goal</button></div>
          ${goals.length ? goals.map(goal => `
            <button class="goal-card" data-edit-athlete-goal="${goal.id}" type="button">
              <span class="goal-type">${escape(goal.type)}</span>
              <strong>${escape(goal.title)}</strong>
              <small>${escape(goal.target || "")}</small>
              <i class="goal-meter"><em style="width:${Math.min(100, Number(goal.progress) || 0)}%"></em></i>
              <b>${Math.round(Number(goal.progress) || 0)}%</b>
            </button>`).join("") : `<div class="empty-list">Set sport, academic, or career goals so Aether can coach against them.</div>`}
        </aside>
      </section>`;

    root.querySelector("[data-add-task]")?.addEventListener("click", () => taskForm());
    root.querySelector("[data-add-athlete-goal]")?.addEventListener("click", () => athleteGoalForm());
    root.querySelectorAll("[data-edit-task]").forEach(btn => btn.addEventListener("click", () => taskForm(btn.dataset.editTask)));
    root.querySelectorAll("[data-edit-athlete-goal]").forEach(btn => btn.addEventListener("click", () => athleteGoalForm(btn.dataset.editAthleteGoal)));
    root.querySelectorAll("[data-toggle-task]").forEach(btn => btn.addEventListener("click", () => {
      const task = global.systemData.tasks.find(t => t.id === btn.dataset.toggleTask);
      if (!task) return;
      task.status = task.status === "done" ? "open" : "done";
      global.saveSystemData?.();
      renderTasksDashboard();
    }));
  }

  function taskForm(id = null) {
    const task = global.systemData.tasks.find(t => t.id === id) || { title: "", status: "open", priority: "medium", due: Core().todayISO(), area: "Academic", notes: "", goalId: "" };
    global.openAcademicForm?.(id ? "Edit task" : "Add task", "TASK", `
      <label>Title<input name="title" required value="${escape(task.title)}"></label>
      <div class="form-row"><label>Area<input name="area" value="${escape(task.area)}"></label>
      <label>Priority<select name="priority">${["high", "medium", "low"].map(v => `<option ${task.priority === v ? "selected" : ""}>${v}</option>`).join("")}</select></label></div>
      <div class="form-row"><label>Due<input name="due" type="date" value="${escape(task.due || "")}"></label>
      <label>Status<select name="status"><option ${task.status === "open" ? "selected" : ""}>open</option><option ${task.status === "done" ? "selected" : ""}>done</option></select></label></div>
      <label>Notes<textarea name="notes" rows="3">${escape(task.notes || "")}</textarea></label>`, data => {
      const next = {
        id: id || `tk${Date.now()}`,
        title: data.get("title").trim(),
        area: data.get("area").trim(),
        priority: data.get("priority"),
        due: data.get("due"),
        status: data.get("status"),
        notes: data.get("notes").trim(),
        goalId: task.goalId || ""
      };
      if (id) Object.assign(task, next); else global.systemData.tasks.unshift(next);
      global.saveSystemData?.();
      renderTasksDashboard();
      showToastSafe(id ? "Task updated." : "Task added.");
    }, id ? () => {
      global.systemData.tasks = global.systemData.tasks.filter(t => t.id !== id);
      global.saveSystemData?.();
      renderTasksDashboard();
      showToastSafe("Task deleted.");
    } : null);
  }

  function athleteGoalForm(id = null) {
    const goal = global.systemData.athleteGoals.find(g => g.id === id) || { title: "", type: "sport", target: "", progress: 0, notes: "" };
    global.openAcademicForm?.(id ? "Edit goal" : "Add goal", "ATHLETE GOAL", `
      <label>Title<input name="title" required value="${escape(goal.title)}"></label>
      <div class="form-row"><label>Type<select name="type">${["sport", "academic", "career"].map(v => `<option ${goal.type === v ? "selected" : ""}>${v}</option>`).join("")}</select></label>
      <label>Progress %<input name="progress" type="number" min="0" max="100" value="${goal.progress || 0}"></label></div>
      <label>Target<input name="target" value="${escape(goal.target || "")}"></label>
      <label>Notes<textarea name="notes" rows="3">${escape(goal.notes || "")}</textarea></label>`, data => {
      const next = {
        id: id || `ag${Date.now()}`,
        title: data.get("title").trim(),
        type: data.get("type"),
        target: data.get("target").trim(),
        progress: Number(data.get("progress")),
        notes: data.get("notes").trim()
      };
      if (id) Object.assign(goal, next); else global.systemData.athleteGoals.unshift(next);
      global.saveSystemData?.();
      renderTasksDashboard();
      showToastSafe("Goal saved.");
    }, id ? () => {
      global.systemData.athleteGoals = global.systemData.athleteGoals.filter(g => g.id !== id);
      global.saveSystemData?.();
      renderTasksDashboard();
      showToastSafe("Goal deleted.");
    } : null);
  }

  function renderHomeCommandCenter() {
    if (!global.systemData) return;
    ensureShape(global.systemData);
    const today = Core().todayISO();
    const events = (global.systemData.events || []).filter(e => e.date === today).sort((a, b) => a.start.localeCompare(b.start));
    const openTasks = (global.systemData.tasks || []).filter(t => t.status !== "done");
    const urgentMail = (global.systemData.mail?.messages || []).filter(m => m.urgency === "urgent");
    const health = global.systemData.health?.[0];
    const contacts = (global.systemData.contacts || []).filter(c => c.id !== "c1");
    const weekStart = new Date(`${today}T12:00:00`);
    weekStart.setDate(weekStart.getDate() - ((weekStart.getDay() + 6) % 7));
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      return d.toISOString().slice(0, 10);
    });

    const kpi = document.querySelector("#homeKpiStrip");
    if (kpi) {
      const cells = [
        [events.length, "Today"],
        [openTasks.length, "Open tasks"],
        [urgentMail.length, "Urgent mail"],
        [health?.recovery ?? "—", "Recovery"]
      ];
      kpi.innerHTML = cells.map(([value, label]) => `<article class="home-kpi"><span>${escape(label)}</span><strong>${escape(String(value))}</strong></article>`).join("");
    }

    const priority = document.querySelector("#homePriorityList");
    if (priority) {
      const stack = [];
      openTasks.filter(t => t.priority === "high" || t.due === today).slice(0, 4).forEach(t => {
        stack.push({ time: t.due === today ? "Due" : (t.due || "Task"), title: t.title, meta: t.area || "Task", view: "tasks", id: t.id });
      });
      urgentMail.slice(0, 3).forEach(m => {
        stack.push({ time: "Mail", title: m.subject, meta: (m.sender || "").split("<")[0].trim(), view: "mail", id: m.id });
      });
      events.filter(e => e.priority === "high").slice(0, 3).forEach(e => {
        stack.push({ time: e.start, title: e.title, meta: e.source, view: "calendar", id: e.id });
      });
      if (health && health.recovery < 65) {
        stack.unshift({ time: "Health", title: `Recovery ${health.recovery} — protect intensity`, meta: health.workout || "Coach", view: "health", id: health.id });
      }
      const unique = [];
      const seen = new Set();
      stack.forEach(item => {
        const key = `${item.view}:${item.title}`;
        if (seen.has(key)) return;
        seen.add(key);
        unique.push(item);
      });
      priority.innerHTML = unique.length
        ? unique.slice(0, 8).map(item => `<button class="priority-item" data-priority-view="${item.view}" data-priority-id="${escape(item.id || "")}" type="button"><span class="priority-time">${escape(item.time)}</span><span><strong>${escape(item.title)}</strong><small>${escape(item.meta)}</small></span><span class="priority-chevron">›</span></button>`).join("")
        : `<p class="empty-soft">Nothing urgent. Add tasks, sync mail, or schedule the week.</p>`;
      priority.querySelectorAll("[data-priority-view]").forEach(btn => btn.addEventListener("click", () => {
        const view = btn.dataset.priorityView;
        const id = btn.dataset.priorityId;
        global.switchView?.(view);
        if (view === "calendar" && id) global.eventRecordForm?.(id);
        if (view === "mail") global.mailSelectedId = id;
      }));
    }

    const week = document.querySelector("#homeWeekGrid");
    if (week) {
      week.innerHTML = weekDays.map(day => {
        const date = new Date(`${day}T12:00:00`);
        const dayEvents = (global.systemData.events || []).filter(e => e.date === day).sort((a, b) => a.start.localeCompare(b.start));
        const isToday = day === today;
        return `<div class="home-day-col ${isToday ? "is-today" : ""}" data-home-day="${day}">
          <header><span>${date.toLocaleDateString("en-US", { weekday: "short" })}</span><strong>${date.getDate()}</strong></header>
          <div class="home-day-events">${dayEvents.slice(0, 5).map(e => `<button class="home-week-event source-${escape(String(e.source || "manual").toLowerCase())}" data-home-event="${e.id}" type="button"><b>${escape(e.start)}</b><span>${escape(e.title)}</span></button>`).join("") || `<p class="empty-soft quiet">—</p>`}</div>
        </div>`;
      }).join("");
      week.querySelectorAll("[data-home-event]").forEach(btn => btn.addEventListener("click", event => {
        event.stopPropagation();
        global.switchView?.("calendar");
        global.eventRecordForm?.(btn.dataset.homeEvent);
      }));
      week.querySelectorAll("[data-home-day]").forEach(col => col.addEventListener("click", () => {
        global.systemCalendarDate = col.dataset.homeDay;
        global.switchView?.("calendar");
      }));
    }

    const support = document.querySelector("#homeSupportGrid");
    if (support) {
      const agenda = events.slice(0, 5).map(e => `<div class="widget-line"><strong>${escape(e.start)} · ${escape(e.title)}</strong><small>${escape(e.zone || e.source)}</small></div>`).join("") || `<p class="empty-soft">No events today.</p>`;
      const deadlines = openTasks.filter(t => t.due).sort((a, b) => String(a.due).localeCompare(String(b.due))).slice(0, 5)
        .map(t => `<div class="widget-line"><strong>${escape(t.title)}</strong><small>${escape(t.due)} · ${escape(t.priority || "")}</small></div>`).join("") || `<p class="empty-soft">No dated tasks.</p>`;
      const mailBlock = urgentMail.slice(0, 4).map(m => `<div class="widget-line"><strong>${escape(m.subject)}</strong><small>${escape((m.sender || "").split("<")[0].trim())}</small></div>`).join("") || `<p class="empty-soft">No urgent mail.</p>`;
      const healthBlock = health
        ? `<strong class="widget-kpi">${health.recovery}</strong><span>recovery · ${escape(health.workout || "")}</span>`
        : `<p class="empty-soft">Connect Strava or Fitbit.</p>`;
      const networkBlock = contacts.filter(c => c.lastContacted).slice(0, 4)
        .map(c => `<div class="widget-line"><strong>${escape(c.name)}</strong><small>${escape(c.org || c.role || "")}</small></div>`).join("") || `<p class="empty-soft">Log interactions to see follow-ups.</p>`;
      support.innerHTML = `
        <article class="command-widget"><header><p class="kicker">TODAY AGENDA</p></header><div class="command-widget-body">${agenda}</div></article>
        <article class="command-widget"><header><p class="kicker">DEADLINES</p></header><div class="command-widget-body">${deadlines}</div></article>
        <article class="command-widget"><header><p class="kicker">MAIL</p></header><div class="command-widget-body">${mailBlock}</div></article>
        <article class="command-widget"><header><p class="kicker">HEALTH</p></header><div class="command-widget-body">${healthBlock}</div></article>
        <article class="command-widget"><header><p class="kicker">NETWORK</p></header><div class="command-widget-body">${networkBlock}</div></article>`;
    }
  }

  function enhanceNetworkInteractivity(root) {
    const map = root?.querySelector(".network-map");
    if (!map) return;
    map.classList.add("network-map-interactive");
    let dragging = null;
    let start = null;
    map.addEventListener("wheel", event => {
      event.preventDefault();
      networkPan.scale = Math.min(2.2, Math.max(0.55, networkPan.scale + (event.deltaY > 0 ? -0.08 : 0.08)));
      map.style.setProperty("--graph-scale", networkPan.scale);
    }, { passive: false });
    map.querySelectorAll(".network-node").forEach(node => {
      node.addEventListener("pointerdown", event => {
        dragging = node;
        start = { x: event.clientX, y: event.clientY, left: parseFloat(node.style.left), top: parseFloat(node.style.top) };
        node.setPointerCapture(event.pointerId);
      });
      node.addEventListener("pointermove", event => {
        if (!dragging || dragging !== node || !start) return;
        const bounds = map.getBoundingClientRect();
        const dx = ((event.clientX - start.x) / bounds.width) * 100;
        const dy = ((event.clientY - start.y) / bounds.height) * 100;
        const left = Math.min(92, Math.max(8, start.left + dx));
        const top = Math.min(90, Math.max(10, start.top + dy));
        node.style.left = `${left}%`;
        node.style.top = `${top}%`;
        const id = node.dataset.contactNode;
        const contact = global.systemData.contacts.find(c => c.id === id);
        if (contact) { contact.x = left; contact.y = top; }
      });
      node.addEventListener("pointerup", () => {
        if (dragging) global.saveSystemData?.();
        dragging = null;
        start = null;
      });
    });
  }

  function renderReviewQueue(root) {
    const queue = (global.systemData.reviewQueue || []).filter(item => item.status === "pending");
    if (!queue.length) return "";
    return `<section class="review-queue collection-panel"><div class="panel-heading"><div><p class="kicker">REVIEW QUEUE</p><h2>Suggested contacts</h2></div></div>
      ${queue.map(item => `<article class="review-row"><div><strong>${escape(item.name)}</strong><small>${escape(item.email)} · ${escape(item.org)} · ${escape(item.source)}</small><p>${escape(item.reason || "")}</p></div>
      <div class="proposal-actions"><button class="button secondary" data-dismiss-review="${item.id}" type="button">Dismiss</button><button class="button primary" data-accept-review="${item.id}" type="button">Add</button></div></article>`).join("")}
    </section>`;
  }

  function bindReviewQueue(root) {
    root.querySelectorAll("[data-accept-review]").forEach(btn => btn.addEventListener("click", () => {
      const item = global.systemData.reviewQueue.find(r => r.id === btn.dataset.acceptReview);
      if (!item) return;
      item.status = "accepted";
      const id = `c${Date.now()}`;
      global.systemData.contacts.push({
        id, name: item.name, email: item.email, org: item.org || "", role: "", influence: 2,
        notes: item.reason || "", tags: ["From email"], x: 40 + Math.random() * 30, y: 30 + Math.random() * 40,
        logs: [], school: "", sport: "", lastContacted: Core().todayISO()
      });
      global.systemData.links.push(["c1", id]);
      global.saveSystemData?.();
      global.renderNetworkingDashboard?.();
      showToastSafe("Contact added from review queue.");
    }));
    root.querySelectorAll("[data-dismiss-review]").forEach(btn => btn.addEventListener("click", () => {
      const item = global.systemData.reviewQueue.find(r => r.id === btn.dataset.dismissReview);
      if (item) item.status = "dismissed";
      global.saveSystemData?.();
      global.renderNetworkingDashboard?.();
    }));
  }


  function connectProvider(provider) {
    const profile = global.systemData.providers || (global.systemData.providers = {});
    if (provider === "apple") {
      showToastSafe("Apple Health needs an iOS bridge — coming next. Use Strava or Fitbit for now.");
      return;
    }
    if (provider === "linkedin") {
      showToastSafe("LinkedIn partner API pending. Import a CSV or approve email suggestions.");
      return;
    }
    const base = Core().functionsBase();
    if (!base) {
      profile[provider] = { status: "connected", mode: "demo", connectedAt: new Date().toISOString() };
      if (provider === "strava" || provider === "fitbit") {
        if (!global.systemData.health.length) {
          global.systemData.health.unshift({
            id: `h${Date.now()}`,
            date: Core().todayISO(),
            recovery: 74,
            exertion: 6.2,
            load: 710,
            sleep: 7.8,
            hr: 52,
            workout: `${provider} sync sample`,
            provider: provider === "strava" ? "Strava" : "Fitbit"
          });
        }
      }
      global.saveSystemData?.();
      showToastSafe(`${provider} connected (demo mode). Add Functions credentials for live sync.`);
      global.renderSystemView?.(global.state?.view);
      return;
    }
    window.open(`${base}/oauth/${provider}/start`, "_blank", "noopener,width=520,height=720");
  }

  function importCsvContacts(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const lines = String(reader.result || "").split(/\r?\n/).filter(Boolean);
      const rows = lines.slice(1);
      rows.forEach(line => {
        const [name, email, org, role] = line.split(",").map(part => part?.trim().replace(/^"|"$/g, ""));
        if (!name) return;
        const id = `c${Date.now()}${Math.floor(Math.random() * 99)}`;
        global.systemData.contacts.push({
          id, name, email: email || "", org: org || "", role: role || "", influence: 2,
          notes: "CSV import", tags: ["Import"], x: 20 + Math.random() * 60, y: 20 + Math.random() * 60,
          logs: [], school: "", sport: "", lastContacted: ""
        });
        global.systemData.links.push(["c1", id]);
      });
      global.saveSystemData?.();
      global.renderNetworkingDashboard?.();
      showToastSafe(`Imported ${rows.length} contacts.`);
    };
    reader.readAsText(file);
  }

  function importAthleticSchedule(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      let added = 0;
      if (file.name.endsWith(".ics") || text.includes("BEGIN:VEVENT")) {
        const blocks = text.split("BEGIN:VEVENT").slice(1);
        blocks.forEach(block => {
          const summary = /SUMMARY:(.*)/.exec(block)?.[1]?.trim() || "Athletic event";
          const dt = /DTSTART[^:]*:(\d{8})T?(\d{0,6})/.exec(block);
          if (!dt) return;
          const date = `${dt[1].slice(0, 4)}-${dt[1].slice(4, 6)}-${dt[1].slice(6, 8)}`;
          const start = dt[2] ? `${dt[2].slice(0, 2)}:${dt[2].slice(2, 4) || "00"}` : "16:00";
          global.systemData.events.push({
            id: `e${Date.now()}${added}`,
            title: summary,
            date,
            start,
            end: "17:00",
            source: "Athletics",
            priority: "high",
            zone: "Training",
            notes: "Imported from ICS"
          });
          added += 1;
        });
      } else {
        text.split(/\r?\n/).slice(1).forEach(line => {
          const [title, date, start, end] = line.split(",").map(p => p?.trim());
          if (!title || !date) return;
          global.systemData.events.push({
            id: `e${Date.now()}${added}`,
            title,
            date,
            start: start || "16:00",
            end: end || "17:30",
            source: "Athletics",
            priority: "high",
            zone: "Training",
            notes: "Imported from CSV"
          });
          added += 1;
        });
      }
      global.saveSystemData?.();
      global.renderCalendarDashboard?.();
      showToastSafe(`Imported ${added} athletic events for review.`);
    };
    reader.readAsText(file);
  }

  function registerMotion() {
    document.documentElement.classList.add("aether-motion");
    document.addEventListener("click", event => {
      const nav = event.target.closest("[data-view]");
      if (nav) document.querySelector(".main-area")?.classList.add("view-fade");
    });
  }

  function setupShellChrome() {
    document.querySelector("#notificationButton")?.addEventListener("click", () => {
      document.querySelector("#notificationPanel")?.classList.toggle("open");
      renderNotificationBell();
    });
    document.querySelector("#rerunOnboarding")?.addEventListener("click", () => openOnboarding(true));
    document.querySelector("#csvContactInput")?.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (file) importCsvContacts(file);
    });
    document.querySelector("#athleticImportInput")?.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (file) importAthleticSchedule(file);
    });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    }
  }

  global.AetherModules = {
    ensureShape,
    pushNotification,
    renderNotificationBell,
    showDemoBanner,
    openOnboarding,
    renderTasksDashboard,
    renderHomeCommandCenter,
    enhanceNetworkInteractivity,
    renderReviewQueue,
    bindReviewQueue,
    connectProvider,
    importCsvContacts,
    importAthleticSchedule,
    registerMotion,
    setupShellChrome,
    taskForm,
    athleteGoalForm
  };

  function bootModules() {
    setupShellChrome();
    registerMotion();
    if (global.systemData) {
      ensureShape(global.systemData);
      showDemoBanner(global.AetherCore?.activeUid() === "guest");
      renderHomeCommandCenter();
      renderNotificationBell();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootModules);
  } else {
    bootModules();
  }
})(window);
