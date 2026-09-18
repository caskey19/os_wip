/**
 * Aether core — uid-scoped identity, empty vs demo workspaces, school themes.
 * Loaded before app.js; exposes window.AetherCore.
 */
(function (global) {
  const SCHOOLS = [
    { id: "cornell", name: "Cornell University", accent: "#B31B1B", chrome: "#C0C6CE" },
    { id: "stanford", name: "Stanford University", accent: "#8C1515", chrome: "#D4AF37" },
    { id: "michigan", name: "University of Michigan", accent: "#FFCB05", chrome: "#00274C" },
    { id: "duke", name: "Duke University", accent: "#003087", chrome: "#C0C0C0" },
    { id: "usc", name: "University of Southern California", accent: "#990000", chrome: "#FFCC00" },
    { id: "alabama", name: "University of Alabama", accent: "#9E1B32", chrome: "#FFFFFF" },
    { id: "ohio-state", name: "Ohio State University", accent: "#BA0C2F", chrome: "#A7B1B7" },
    { id: "custom", name: "Custom school", accent: "#C8A96B", chrome: "#E8ECF0" }
  ];

  const SPORTS = [
    "Football", "Basketball", "Soccer", "Track & Field", "Swimming", "Lacrosse",
    "Hockey", "Baseball", "Softball", "Tennis", "Volleyball", "Wrestling", "Rowing", "Other"
  ];

  const DEFAULT_WIDGETS = [
    { id: "schedule", mode: "list", enabled: true },
    { id: "tasks", mode: "list", enabled: true },
    { id: "mail", mode: "kpi", enabled: true },
    { id: "health", mode: "chart", enabled: true },
    { id: "capital", mode: "kpi", enabled: true },
    { id: "network", mode: "bullets", enabled: true },
    { id: "goals", mode: "chart", enabled: true }
  ];

  const DEFAULT_PROFILE = {
    onboarded: false,
    schoolId: "",
    schoolName: "",
    sport: "",
    baseTheme: "charcoal",
    accent: "#C8A96B",
    chrome: "#E8ECF0",
    mailPriorities: ["professors", "coaches", "recruiters", "teammates", "financial"],
    healthSuggestions: ["protect-sleep", "reduce-intensity", "recovery-block"],
    capitalModules: ["spend", "savings", "stocks", "networth", "budgeting"],
    homeWidgets: DEFAULT_WIDGETS,
    tabs: { academic: true, tasks: true, networking: true, calendar: true, health: true, capital: true },
    capitalPinHash: "",
    capitalPinEnabled: false,
    pushOptIn: false,
    autoApproveTypes: {}
  };

  function todayISO() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  function emptyMail() {
    return {
      connection: {
        mode: "live",
        connected: false,
        name: "",
        email: "",
        lastSync: null,
        calendarLastSync: null,
        calendarError: "",
        calendarCount: 0,
        googleEventCount: 0
      },
      preferences: {
        onboarded: false,
        focus: "academic",
        urgencyWindow: "48",
        newsletters: "digest",
        replyTone: "concise",
        calendarMode: "semi"
      },
      messages: []
    };
  }

  function emptyWorkspace(displayName = "You") {
    return {
      contacts: [{
        id: "c1",
        name: displayName,
        role: "You",
        org: "",
        influence: 5,
        email: "",
        notes: "Center of your network.",
        tags: ["Core"],
        x: 50,
        y: 50,
        logs: [],
        school: "",
        sport: "",
        lastContacted: ""
      }],
      links: [],
      opportunities: [],
      events: [],
      health: [],
      transactions: [],
      subscriptions: [],
      goals: [],
      tasks: [],
      athleteGoals: [],
      reviewQueue: [],
      notifications: [],
      portfolios: [],
      budgets: [],
      providers: {},
      capitalWatchlist: [],
      mailSuggestions: [],
      mail: emptyMail(),
      profile: structuredClone(DEFAULT_PROFILE)
    };
  }

  function demoWorkspace() {
    const today = todayISO();
    const seed = emptyWorkspace("Demo Athlete");
    seed.profile = {
      ...structuredClone(DEFAULT_PROFILE),
      onboarded: true,
      schoolId: "cornell",
      schoolName: "Cornell University",
      sport: "Football",
      accent: "#B31B1B",
      chrome: "#C0C6CE"
    };
    seed.contacts = [
      { id: "c1", name: "Demo Athlete", role: "You", org: "Cornell", influence: 5, email: "demo@aether.app", notes: "Demo account — not a real athlete.", tags: ["Core"], x: 50, y: 50, logs: [], school: "Cornell", sport: "Football", lastContacted: today },
      { id: "c2", name: "Maya Chen", role: "Associate", org: "Goldman Sachs", influence: 4, email: "maya@example.com", notes: "Alumni coffee chat.", tags: ["Finance", "Alumni"], x: 28, y: 28, logs: [{ date: "Sep 10", type: "Coffee chat", note: "Summer analyst path." }], school: "Cornell", sport: "", lastContacted: "2026-09-10" },
      { id: "c3", name: "Theo Grant", role: "VP, Finance", org: "Goldman Sachs", influence: 5, email: "theo@example.com", notes: "Warm intro via Maya.", tags: ["Decision maker"], x: 16, y: 16, logs: [], school: "", sport: "", lastContacted: "" },
      { id: "c4", name: "Jordan Ellis", role: "Coach", org: "Cornell Athletics", influence: 4, email: "jordan@example.com", notes: "Performance & alumni intros.", tags: ["Athletics", "Recruiting"], x: 72, y: 28, logs: [], school: "Cornell", sport: "Football", lastContacted: today },
      { id: "c5", name: "Sofia Patel", role: "Founder", org: "Northstar Labs", influence: 3, email: "sofia@example.com", notes: "Entrepreneurship club.", tags: ["Founder"], x: 84, y: 16, logs: [], school: "Cornell", sport: "", lastContacted: "2026-09-01" },
      { id: "c6", name: "Eli Brooks", role: "Recruiter", org: "Handshake", influence: 3, email: "eli@example.com", notes: "Campus recruiting.", tags: ["Recruiting"], x: 28, y: 74, logs: [], school: "", sport: "", lastContacted: "2026-09-08" }
    ];
    seed.links = [["c1", "c2"], ["c2", "c3"], ["c1", "c4"], ["c4", "c5"], ["c1", "c6"]];
    seed.opportunities = [
      { id: "o1", title: "Investment Summer Analyst", company: "Harbor Group", industry: "Real Estate", position: "Investment Analyst", type: "Internship", location: "New York, NY", workMode: "In person", deadline: "", status: "Interested", source: "Company careers", link: "", description: "Acquisitions and market research.", qualifications: ["Financial modeling", "Excel"], notes: "Find Cornell alumni." },
      { id: "o2", title: "Capital Markets Intern", company: "Welltower", industry: "Real Estate", position: "Capital Markets", type: "Internship", location: "New York, NY", workMode: "Hybrid", deadline: "", status: "Networking", source: "Referral", link: "", description: "Financing and capital structure.", qualifications: ["Corporate finance"], notes: "Prep markets overview." }
    ];
    seed.events = [
      { id: "e1", title: "HADM 2220 Finance", date: today, start: "09:05", end: "09:55", source: "Academic", priority: "high", zone: "Deep work", notes: "TVM" },
      { id: "e2", title: "Lift · Lower body", date: today, start: "11:15", end: "12:15", source: "Health", priority: "medium", zone: "Training", notes: "" },
      { id: "e3", title: "Coffee · Maya", date: today, start: "14:00", end: "14:30", source: "Networking", priority: "high", zone: "Relationships", notes: "" },
      { id: "e4", title: "Team practice", date: today, start: "16:15", end: "18:15", source: "Athletics", priority: "high", zone: "Training", notes: "Schoellkopf" }
    ];
    seed.health = [
      { id: "h1", date: today, recovery: 62, exertion: 7.4, load: 846, sleep: 7.1, hr: 54, workout: "Lower body lift", provider: "Strava" },
      { id: "h2", date: "2026-09-17", recovery: 78, exertion: 8.1, load: 812, sleep: 8, hr: 51, workout: "Practice · 92 min", provider: "Strava" },
      { id: "h3", date: "2026-09-16", recovery: 84, exertion: 6.2, load: 760, sleep: 8.4, hr: 49, workout: "Tempo run", provider: "Fitbit" }
    ];
    seed.transactions = [
      { id: "t1", date: "2026-09-17", name: "Campus dining", category: "Food", amount: -42.18, type: "expense" },
      { id: "t2", date: "2026-09-16", name: "Part-time job", category: "Income", amount: 380, type: "income" },
      { id: "t3", date: "2026-09-15", name: "Textbooks", category: "Academic", amount: -96.4, type: "expense" }
    ];
    seed.subscriptions = [
      { id: "s1", name: "Spotify Student", amount: 5.99, due: 18, category: "Media" },
      { id: "s2", name: "iCloud+", amount: 2.99, due: 23, category: "Storage" }
    ];
    seed.goals = [
      { id: "g1", name: "Emergency fund", current: 2850, target: 5000 },
      { id: "g2", name: "Summer travel", current: 920, target: 1800 }
    ];
    seed.budgets = [
      { id: "b1", category: "Food", limit: 400, spent: 210 },
      { id: "b2", category: "Academic", limit: 150, spent: 96 },
      { id: "b3", category: "Travel", limit: 200, spent: 40 }
    ];
    seed.portfolios = [
      { id: "p1", symbol: "VTI", name: "Vanguard Total Market", shares: 12.4, costBasis: 280, provider: "Manual" },
      { id: "p2", symbol: "AAPL", name: "Apple", shares: 3, costBasis: 190, provider: "Manual" }
    ];
    seed.capitalWatchlist = ["VTI", "AAPL", "MSFT"];
    seed.tasks = [
      { id: "tk1", title: "Submit finance problem set", status: "open", priority: "high", due: today, area: "Academic", notes: "Canvas upload", goalId: "ag1" },
      { id: "tk2", title: "Film technique film review", status: "open", priority: "medium", due: today, area: "Athletics", notes: "", goalId: "ag2" },
      { id: "tk3", title: "Thank-you note to Maya", status: "open", priority: "medium", due: "2026-09-20", area: "Career", notes: "", goalId: "" }
    ];
    seed.athleteGoals = [
      { id: "ag1", title: "3.5+ semester GPA", type: "academic", target: "3.5 GPA", progress: 62, notes: "" },
      { id: "ag2", title: "In-season strength block", type: "sport", target: "Complete 8 weeks", progress: 40, notes: "Technique focus on low recovery days" },
      { id: "ag3", title: "Land finance internship", type: "career", target: "Offer by March", progress: 28, notes: "" }
    ];
    seed.notifications = [
      { id: "n1", title: "Demo workspace", body: "You are viewing labeled demo data. Sign in with Google for your private OS.", read: false, at: new Date().toISOString(), type: "system" },
      { id: "n2", title: "Recovery watch", body: "Recovery is 62. Review coach suggestions before practice.", read: false, at: new Date().toISOString(), type: "health" }
    ];
    seed.reviewQueue = [
      { id: "rq1", name: "Alex Rivera", email: "alex@firm.com", org: "Harbor Group", source: "Email", reason: "Appeared on internship thread", status: "pending" }
    ];
    seed.mail = {
      connection: { mode: "demo", connected: false, name: "", email: "", lastSync: null, calendarLastSync: null, calendarError: "", calendarCount: 0, googleEventCount: 0 },
      preferences: { onboarded: true, focus: "academic", urgencyWindow: "48", newsletters: "digest", replyTone: "concise", calendarMode: "semi" },
      messages: [
        { id: "m1", threadId: "tm1", sender: "Professor Elena Ramirez <er482@cornell.edu>", subject: "Problem set deadline moved", receivedAt: `${today}T08:42:00`, body: "The valuation problem set is now due Thursday at 11:59 PM.", snippet: "Deadline moved…", unread: true, source: "Demo", category: "Deadlines", urgency: "urgent", calendar: { title: "Problem set due", date: "2026-09-25", start: "22:59", end: "23:59", priority: "high", zone: "Deep work" } },
        { id: "m2", threadId: "tm2", sender: "Maya Chen <maya@example.com>", subject: "Coffee chat this week?", receivedAt: `${today}T10:06:00`, body: "Are you free Friday at 2 PM?", snippet: "Friday at 2?", unread: true, source: "Demo", category: "Networking", urgency: "urgent", calendar: { title: "Coffee · Maya", date: "2026-09-25", start: "14:00", end: "14:30", priority: "high", zone: "Relationships" } },
        { id: "m3", threadId: "tm3", sender: "Coach Jordan Ellis <jordan@example.com>", subject: "Practice location update", receivedAt: `${today}T09:27:00`, body: "Indoor facility at 4:15 PM.", snippet: "Indoor facility…", unread: false, source: "Demo", category: "Announcements", urgency: "soon" }
      ]
    };
    seed.mailSuggestions = seed.mail.messages.filter(m => m.calendar).map((m, i) => ({
      id: `ms${i + 1}`,
      messageId: m.id,
      status: "pending",
      confidence: 88 - i * 6,
      sender: m.sender,
      priority: m.calendar.priority,
      ...m.calendar
    }));
    seed.providers = { strava: { status: "demo" }, fitbit: { status: "disconnected" }, plaid: { status: "demo" }, finnhub: { status: "demo" } };
    return seed;
  }

  function emptyCourses() {
    return [{
      id: "starter",
      code: "ADD COURSE",
      name: "Your first class",
      short: "+",
      color: "#C8A96B",
      term: "Current term",
      subtitle: "Add courses from Academic to build your semester.",
      sources: [],
      notes: []
    }];
  }

  function demoCourses() {
    return null;
  }

  function activeUid() {
    return global.AetherActiveUid || localStorage.getItem("aetherActiveUid") || "guest";
  }

  function key(suffix) {
    return `aether:${activeUid()}:${suffix}`;
  }

  function clearUidLocal(uid) {
    const prefix = `aether:${uid}:`;
    Object.keys(localStorage).filter(k => k.startsWith(prefix)).forEach(k => localStorage.removeItem(k));
  }

  function setActiveUid(uid) {
    const previous = localStorage.getItem("aetherActiveUid");
    if (previous && previous !== uid) {
      // Keep other accounts' local caches; just switch pointer — never merge.
    }
    global.AetherActiveUid = uid;
    localStorage.setItem("aetherActiveUid", uid);
  }

  async function hashPin(pin) {
    const data = new TextEncoder().encode(`aether-capital:${pin}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, "0")).join("");
  }

  function applyDocumentTheme(profile = {}) {
    const root = document.documentElement;
    const base = profile.baseTheme === "mono" ? "mono" : "charcoal";
    root.dataset.theme = base;
    root.style.setProperty("--school-accent", profile.accent || "#C8A96B");
    root.style.setProperty("--chrome", profile.chrome || "#E8ECF0");
    const accent = profile.accent || "#C8A96B";
    const rgb = accent.replace("#", "").match(/.{2}/g)?.map(p => parseInt(p, 16)).join(", ") || "200, 169, 107";
    root.style.setProperty("--accent-rgb", rgb);
    root.style.setProperty("--green", accent);
    root.style.setProperty("--green-dark", accent);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", base === "mono" ? "#0a0a0a" : "#0c0d10");
  }

  function functionsBase() {
    const cfg = global.ACADEMIC_OS_CONFIG || {};
    return cfg.functionsBase || "";
  }

  async function callFunction(path, options = {}) {
    const base = functionsBase();
    if (!base) return { ok: false, configured: false, error: "Functions not configured" };
    const user = global.AcademicOSMail?.getSession?.()?.user;
    const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
    if (user && global.AcademicOSMail) {
      try {
        const token = await global.AcademicOSMail.getIdToken?.();
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch { /* guest */ }
    }
    const response = await fetch(`${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`, {
      ...options,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, configured: true, status: response.status, data };
  }

  const QUOTE_FALLBACK = {
    AAPL: { c: 214.38, d: 2.64, dp: 1.24, name: "Apple" },
    MSFT: { c: 486.72, d: 3.28, dp: 0.68, name: "Microsoft" },
    NVDA: { c: 174.66, d: 3.58, dp: 2.1, name: "NVIDIA" },
    VTI: { c: 311.42, d: 1.08, dp: 0.35, name: "Vanguard Total Stock Market ETF" }
  };

  async function fetchQuotes(symbols = []) {
    const unique = [...new Set(symbols.map(s => String(s).toUpperCase()).filter(Boolean))];
    if (!unique.length) return {};
    const remote = await callFunction(`quotes?symbols=${unique.join(",")}`, { method: "GET" });
    if (remote.ok && remote.data?.quotes) return remote.data.quotes;
    const out = {};
    unique.forEach(symbol => {
      out[symbol] = QUOTE_FALLBACK[symbol] || {
        c: 100 + (symbol.charCodeAt(0) % 50),
        d: 0.5,
        dp: 0.4,
        name: symbol,
        demo: true
      };
    });
    return out;
  }

  global.AetherCore = {
    SCHOOLS,
    SPORTS,
    DEFAULT_PROFILE,
    DEFAULT_WIDGETS,
    emptyWorkspace,
    demoWorkspace,
    emptyCourses,
    demoCourses,
    emptyMail,
    todayISO,
    activeUid,
    key,
    clearUidLocal,
    setActiveUid,
    hashPin,
    applyDocumentTheme,
    functionsBase,
    callFunction,
    fetchQuotes,
    QUOTE_FALLBACK
  };
})(window);
