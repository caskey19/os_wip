const defaultCourses = [
  {
    id: "finance",
    code: "HADM 2220",
    name: "Finance",
    short: "FI",
    color: "#365f4f",
    term: "Fall 2026 · Active",
    subtitle: "Build connected understanding from class material.",
    sources: [
      {
        id: "fin-l3",
        type: "lecture",
        title: "Lecture 3: Multiple Cash Flows & Loans",
        author: "HADM 2220 course material",
        year: "2026",
        added: "Today",
        summary: "Time value of money methods for uneven cash flows, annuities, perpetuities, and amortizing loans.",
        citation: "Cornell University. (2026). Lecture 3: Multiple cash flows and loans [Course slides]. HADM 2220.",
        tags: ["TVM", "Loans"],
        status: "Course source"
      },
      {
        id: "fin-hw4",
        type: "assignment",
        title: "Homework 4: TVM Multiple Cash Flows",
        author: "HADM 2220",
        year: "2026",
        added: "Yesterday",
        summary: "Practice problems covering present value, future value, growing cash flows, and loan schedules.",
        citation: "Cornell University. (2026). Homework 4: TVM multiple cash flows [Assignment]. HADM 2220.",
        tags: ["Homework", "TVM"],
        status: "Course source"
      },
      {
        id: "fin-text",
        type: "paper",
        title: "Fundamentals of Corporate Finance",
        author: "Ross, Westerfield, and Jordan",
        year: "2024",
        added: "Sep 8",
        summary: "Core reference for valuation, financial statements, risk, return, and capital budgeting.",
        citation: "Ross, S. A., Westerfield, R. W., & Jordan, B. D. (2024). Fundamentals of corporate finance. McGraw Hill.",
        tags: ["Textbook", "Valuation"],
        status: "Citation draft"
      },
      {
        id: "fin-rule",
        type: "assignment",
        title: "HW 2 Clarification: Short Term Liabilities",
        author: "HADM 2220 course update",
        year: "2026",
        added: "Sep 3",
        summary: "When short term liabilities vary proportionally with sales, treat them as accounts payable unless categories are broken out.",
        citation: "Cornell University. (2026). Homework 2 clarification: Short term liabilities [Course announcement]. HADM 2220.",
        tags: ["EFN", "Accounts payable"],
        status: "Course source"
      }
    ],
    notes: [
      {
        id: "fn1",
        title: "Uneven cash flow workflow",
        body: "Draw the timeline first, discount each cash flow to the same date, then add them. The rate and timing must use the same period.",
        sourceId: "fin-l3",
        tags: ["Exam", "Method"],
        date: "Today · 10:18 AM"
      },
      {
        id: "fn2",
        title: "Liability rule changes EFN",
        body: "Spontaneous accounts payable rises with sales and reduces the external financing needed. Do not classify every current liability this way automatically.",
        sourceId: "fin-rule",
        tags: ["HW 2", "EFN"],
        date: "Sep 3 · 1:42 PM"
      },
      {
        id: "fn3",
        title: "Loan payment check",
        body: "The payment is an annuity. Use the periodic rate and number of payments, then verify that the ending balance reaches zero.",
        sourceId: "fin-hw4",
        tags: ["Loans", "Formula"],
        date: "Sep 11 · 9:32 AM"
      }
    ]
  },
  {
    id: "history",
    code: "AMERICAN HISTORY",
    name: "Revolutionary America",
    short: "AH",
    color: "#7a553c",
    term: "Fall 2026 · Active",
    subtitle: "Compare primary sources, political arguments, and competing motives.",
    sources: [
      {
        id: "his-dunlap",
        type: "web",
        title: "The Dunlap Broadside",
        author: "National Archives",
        year: "1776",
        added: "Sep 11",
        summary: "The first printed copies of the Declaration distributed to announce independence and mobilize support.",
        citation: "National Archives. (n.d.). The Dunlap Broadside.",
        tags: ["Primary source", "Declaration"],
        status: "Needs URL check"
      },
      {
        id: "his-parliament",
        type: "web",
        title: "Parliament and the American Revolution: The British Perspective",
        author: "Journal of the American Revolution",
        year: "2024",
        added: "Sep 11",
        summary: "Explains the imperial crisis through parliamentary sovereignty, debt, taxation, and British political assumptions.",
        citation: "Journal of the American Revolution. (2024). Parliament and the American Revolution: The British perspective.",
        tags: ["British view", "Parliament"],
        status: "Needs author check"
      },
      {
        id: "his-docs",
        type: "paper",
        title: "Declaration of Independence Documents",
        author: "Course packet",
        year: "2026",
        added: "Sep 11",
        summary: "A packet of declarations, debates, and contextual documents for the independence discussion.",
        citation: "American History. (2026). Declaration of Independence documents [Course packet].",
        tags: ["Discussion", "Primary sources"],
        status: "Course source"
      },
      {
        id: "his-paine",
        type: "paper",
        title: "Common Sense",
        author: "Thomas Paine",
        year: "1776",
        added: "Sep 10",
        summary: "A direct public argument that hereditary monarchy was absurd and separation was practical and necessary.",
        citation: "Paine, T. (1776). Common sense. W. and T. Bradford.",
        tags: ["Pamphlet", "Independence"],
        status: "Citation draft"
      }
    ],
    notes: [
      {
        id: "hn1",
        title: "Independence solved more than taxes",
        body: "Support for independence combined constitutional arguments with security fears, trade limits, and the chance to build independent military power.",
        sourceId: "his-docs",
        tags: ["Discussion", "Thesis"],
        date: "Sep 11 · 9:58 AM"
      },
      {
        id: "hn2",
        title: "British debt strengthens both sides",
        body: "Britain saw colonial taxation as a reasonable response to war debt, while colonists saw it as proof that imperial demands would keep growing.",
        sourceId: "his-parliament",
        tags: ["Debt", "Perspective"],
        date: "Sep 11 · 10:04 AM"
      },
      {
        id: "hn3",
        title: "Why the broadside matters",
        body: "The printed broadside turned a congressional decision into a public political event. Format and distribution shaped the document's impact.",
        sourceId: "his-dunlap",
        tags: ["Material culture"],
        date: "Sep 11 · 10:11 AM"
      }
    ]
  },
  {
    id: "statistics",
    code: "HADM 2011",
    name: "Hospitality Statistics",
    short: "ST",
    color: "#4e6e80",
    term: "Fall 2026 · Active",
    subtitle: "Turn datasets into defensible observations and clear interpretations.",
    sources: [
      {
        id: "stat-m3",
        type: "lecture",
        title: "Module 3 Notes: PDF and CDF",
        author: "HADM 2011 course material",
        year: "2026",
        added: "Sep 10",
        summary: "Definitions and interpretation patterns for probability density and cumulative distribution functions.",
        citation: "Cornell University. (2026). Module 3 notes: PDF and CDF [Course notes]. HADM 2011.",
        tags: ["CDF", "Probability"],
        status: "Course source"
      },
      {
        id: "stat-video",
        type: "lecture",
        title: "PDF/CDF Interpretation Walkthrough",
        author: "HADM 2011 course video",
        year: "2026",
        added: "Sep 10",
        summary: "A worked model for explaining category size and observations from probability plots.",
        citation: "Cornell University. (2026). PDF/CDF interpretation walkthrough [Video]. HADM 2011.",
        tags: ["Interpretation", "Video"],
        status: "Course source"
      },
      {
        id: "stat-darden",
        type: "assignment",
        title: "Darden Returns by Day of Week",
        author: "Stock Prices dataset",
        year: "2026",
        added: "Sep 8",
        summary: "Descriptive statistics and boxplots comparing Darden Restaurants returns across weekdays.",
        citation: "HADM 2011. (2026). Darden returns by day of week [Class dataset].",
        tags: ["Boxplot", "Returns"],
        status: "Dataset record"
      }
    ],
    notes: [
      {
        id: "sn1",
        title: "CDF interpretation sentence",
        body: "At a value x, the CDF gives the probability that the random variable is less than or equal to x.",
        sourceId: "stat-m3",
        tags: ["Definition", "Exam"],
        date: "Sep 10 · 10:25 AM"
      },
      {
        id: "sn2",
        title: "Weekday return conclusion",
        body: "The boxplots overlap heavily, so the sample does not show a stable day of week pattern even if one mean is slightly higher.",
        sourceId: "stat-darden",
        tags: ["Interpretation", "Darden"],
        date: "Sep 8 · 11:05 AM"
      }
    ]
  },
  {
    id: "writing",
    code: "HADM 1650",
    name: "Business Writing",
    short: "BW",
    color: "#70628b",
    term: "Archive · Spring 2026",
    subtitle: "Keep communication frameworks, drafts, and feedback connected.",
    sources: [
      {
        id: "write-book",
        type: "paper",
        title: "Guide to Managerial Communication",
        author: "Munter and Hamilton",
        year: "2017",
        added: "Mar 12",
        summary: "Frameworks for audience, credibility, message strategy, channel choice, and oral communication.",
        citation: "Munter, M., & Hamilton, L. (2017). Guide to managerial communication. Pearson.",
        tags: ["Credibility", "Audience"],
        status: "Citation draft"
      },
      {
        id: "write-rm",
        type: "assignment",
        title: "Revenue Management Presentation",
        author: "Blake Cascadden",
        year: "2026",
        added: "Mar 7",
        summary: "A concise explanation of why hospitality prices change based on demand, timing, and available inventory.",
        citation: "Cascadden, B. (2026). Revenue management [Class presentation]. HADM 1650.",
        tags: ["Presentation", "Revenue management"],
        status: "Student work"
      }
    ],
    notes: [
      {
        id: "wn1",
        title: "The Four Ps opening",
        body: "Start with purpose, point, prompt, and preview so the audience knows why the message matters and what comes next.",
        sourceId: "write-book",
        tags: ["Opening", "Framework"],
        date: "Mar 14 · 8:31 PM"
      },
      {
        id: "wn2",
        title: "Presentation feedback",
        body: "Use fewer words, call back to the opening example, and end with a direct reason the concept matters to the audience.",
        sourceId: "write-rm",
        tags: ["Feedback", "Speaking"],
        date: "Mar 8 · 2:12 PM"
      }
    ]
  }
];

let courses = JSON.parse(localStorage.getItem("academicOsCourses") || "null") || defaultCourses;

const integrations = [
  {
    name: "Google Mail & Calendar",
    short: "G",
    color: "#315e4b",
    description: "Authenticate with Firebase, triage the live Gmail inbox, create reply drafts, and sync approved events to Google Calendar.",
    map: "Gmail messages → actions, summaries, drafts, and calendar proposals"
  },
  {
    name: "GitHub",
    short: "GH",
    color: "#29312d",
    description: "Sync product architecture, schemas, issues, and technical decisions from the Academic OS repository.",
    map: "Repositories → projects and design records"
  },
  {
    name: "Zotero",
    short: "Z",
    color: "#a73d36",
    description: "Bring in papers, PDFs, annotations, collections, and citation metadata without duplicate records.",
    map: "Items → sources, annotations → notes"
  },
  {
    name: "Semantic Scholar",
    short: "S²",
    color: "#4f64a5",
    description: "Discover related research and enrich source records with citation counts, abstracts, and recommendations.",
    map: "Papers → discovery candidates"
  },
  {
    name: "OpenAlex",
    short: "OA",
    color: "#7660a7",
    description: "Add broad scholarly metadata, author identities, concepts, institutions, and citation graph relationships.",
    map: "Works and authors → knowledge graph"
  }
];

const savedNotes = JSON.parse(localStorage.getItem("academicOsNotes") || "[]");
savedNotes.forEach(note => {
  const course = courses.find(item => item.id === note.courseId);
  if (course && !course.notes.some(item => item.id === note.id)) course.notes.unshift(note);
});

const state = {
  courseId: localStorage.getItem("academicOsCourse") || "finance",
  view: "home",
  sourceFilter: "all",
  noteView: "recent",
  selectedSourceId: null,
  searchIndex: 0,
  searchItems: []
};

const defaultTabPreferences = { academic: true, networking: true, calendar: true, health: true, capital: true };
const tabLabels = { academic: "Academic", networking: "Networking", calendar: "Calendar", health: "Health & performance", capital: "Capital" };
const themePresets = {
  forest: { name: "Aether Forest", accent: "#315e4b", paper: "#f5f4ef", sidebar: "#16221d" },
  cornell: { name: "Cornell Studio", accent: "#7a263a", paper: "#f7f4f1", sidebar: "#281b1f" },
  midnight: { name: "Midnight Blue", accent: "#365c78", paper: "#f2f4f6", sidebar: "#15232d" }
};
let tabPreferences;
let themePreferences;
try { tabPreferences = { ...defaultTabPreferences, ...JSON.parse(localStorage.getItem("aetherVisibleTabs") || "{}") }; } catch { tabPreferences = { ...defaultTabPreferences }; }
try { themePreferences = { ...themePresets.forest, ...JSON.parse(localStorage.getItem("aetherTheme") || "{}") }; } catch { themePreferences = { ...themePresets.forest }; }

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const currentCourse = () => courses.find(course => course.id === state.courseId) || courses[0];

function persistAcademicData() {
  localStorage.setItem("academicOsCourses", JSON.stringify(courses));
  localStorage.setItem("academicOsCourse", state.courseId);
  $("#noteCourseInput").innerHTML = courses.map(course => `<option value="${course.id}">${escapeHtml(course.code)} · ${escapeHtml(course.name)}</option>`).join("");
}

function openAcademicForm(title, kicker, fields, onSave, onDelete = null) {
  let dialog = $("#academicRecordModal");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "academicRecordModal";
    dialog.className = "modal capture-modal record-modal";
    document.body.append(dialog);
  }
  dialog.innerHTML = `<form method="dialog" id="academicRecordForm"><div class="modal-title-row"><div><p class="kicker">${escapeHtml(kicker)}</p><h2>${escapeHtml(title)}</h2></div><button class="icon-button" type="button" data-close-record aria-label="Close">×</button></div><div class="record-form-body">${fields}</div><div class="modal-actions">${onDelete ? '<button class="button danger" type="button" data-delete-record>Delete</button>' : ''}<span class="form-spacer"></span><button class="button secondary" type="button" data-close-record>Cancel</button><button class="button primary" type="submit">Save changes</button></div></form>`;
  dialog.querySelectorAll("[data-close-record]").forEach(button => button.addEventListener("click", () => dialog.close()));
  dialog.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    const result = onSave(new FormData(event.currentTarget));
    if (result !== false) dialog.close();
  });
  if (onDelete) dialog.querySelector("[data-delete-record]").addEventListener("click", () => {
    if (confirm("Delete this record? This cannot be undone.")) {
      onDelete();
      dialog.close();
    }
  });
  dialog.showModal();
  requestAnimationFrame(() => dialog.querySelector("input, textarea, select")?.focus());
}

function courseForm(courseId = null) {
  const course = courses.find(item => item.id === courseId) || { name: "", code: "", term: "Fall 2026 · Active", subtitle: "", color: "#365f4f", short: "" };
  openAcademicForm(courseId ? "Edit course" : "Add course", "COURSE RECORD", `<label>Course name<input name="name" required value="${escapeHtml(course.name)}"></label><div class="form-row"><label>Course code<input name="code" required value="${escapeHtml(course.code)}"></label><label>Short label<input name="short" maxlength="3" value="${escapeHtml(course.short)}"></label></div><label>Term and status<input name="term" value="${escapeHtml(course.term)}"></label><label>Description<textarea name="subtitle" rows="3">${escapeHtml(course.subtitle)}</textarea></label><label>Course color<input name="color" type="color" value="${course.color}"></label>`, data => {
    const record = { name: data.get("name").trim(), code: data.get("code").trim(), short: (data.get("short").trim() || data.get("name").slice(0, 2)).toUpperCase(), term: data.get("term").trim(), subtitle: data.get("subtitle").trim(), color: data.get("color") };
    if (courseId) Object.assign(course, record);
    else {
      record.id = `course-${Date.now()}`;
      record.sources = [];
      record.notes = [];
      courses.push(record);
      state.courseId = record.id;
    }
    persistAcademicData();
    selectCourse(courseId || record.id);
    showToast(courseId ? "Course updated." : "Course added.");
  }, courseId ? () => {
    if (courses.length === 1) return showToast("Keep at least one course in the workspace.");
    courses = courses.filter(item => item.id !== courseId);
    state.courseId = courses[0].id;
    persistAcademicData();
    renderWorkspace();
    showToast("Course deleted.");
  } : null);
}

function sourceForm(sourceId = null) {
  const course = currentCourse();
  const source = course.sources.find(item => item.id === sourceId) || { type: "lecture", title: "", author: "", year: new Date().getFullYear(), status: "Course source", tags: [], summary: "", citation: "" };
  openAcademicForm(sourceId ? "Edit source" : "Add source", "SOURCE RECORD", `<label>Title<input name="title" required value="${escapeHtml(source.title)}"></label><div class="form-row"><label>Type<select name="type">${["lecture", "paper", "assignment", "web"].map(type => `<option ${source.type === type ? "selected" : ""}>${type}</option>`).join("")}</select></label><label>Year<input name="year" value="${escapeHtml(source.year)}"></label></div><label>Author or publisher<input name="author" value="${escapeHtml(source.author)}"></label><label>Status<input name="status" value="${escapeHtml(source.status)}"></label><label>Tags, comma separated<input name="tags" value="${escapeHtml(source.tags.join(", "))}"></label><label>Summary<textarea name="summary" rows="3">${escapeHtml(source.summary)}</textarea></label><label>Citation<textarea name="citation" rows="3">${escapeHtml(source.citation)}</textarea></label>`, data => {
    const record = { type: data.get("type"), title: data.get("title").trim(), author: data.get("author").trim(), year: data.get("year").trim(), status: data.get("status").trim(), tags: data.get("tags").split(",").map(tag => tag.trim()).filter(Boolean), summary: data.get("summary").trim(), citation: data.get("citation").trim(), added: source.added || "Just now" };
    if (sourceId) Object.assign(source, record);
    else { record.id = `source-${Date.now()}`; course.sources.unshift(record); state.selectedSourceId = record.id; }
    persistAcademicData();
    renderWorkspace();
    if (sourceId || record.id) selectSource(sourceId || record.id);
    showToast(sourceId ? "Source updated." : "Source added.");
  }, sourceId ? () => {
    course.sources = course.sources.filter(item => item.id !== sourceId);
    course.notes.forEach(note => { if (note.sourceId === sourceId) note.sourceId = null; });
    persistAcademicData();
    clearContext();
    renderHero();
    renderNotes();
    showToast("Source deleted; linked notes were preserved.");
  } : null);
}

function noteForm(noteId) {
  const course = currentCourse();
  const note = course.notes.find(item => item.id === noteId);
  if (!note) return;
  openAcademicForm("Edit note", "CONNECTED NOTE", `<label>Title<input name="title" required value="${escapeHtml(note.title)}"></label><label>Note<textarea name="body" rows="6" required>${escapeHtml(note.body)}</textarea></label><label>Linked source<select name="source"><option value="">No linked source</option>${course.sources.map(source => `<option value="${source.id}" ${source.id === note.sourceId ? "selected" : ""}>${escapeHtml(source.title)}</option>`).join("")}</select></label><label>Tags, comma separated<input name="tags" value="${escapeHtml(note.tags.join(", "))}"></label>`, data => {
    Object.assign(note, { title: data.get("title").trim(), body: data.get("body").trim(), sourceId: data.get("source") || null, tags: data.get("tags").split(",").map(tag => tag.trim()).filter(Boolean) });
    persistAcademicData();
    renderWorkspace();
    showToast("Note updated.");
  }, () => {
    course.notes = course.notes.filter(item => item.id !== noteId);
    persistAcademicData();
    renderWorkspace();
    showToast("Note deleted.");
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function sourceIcon(type) {
  return { lecture: "L", paper: "P", assignment: "A", web: "W" }[type] || "S";
}

function typeLabel(type) {
  return { lecture: "Lecture", paper: "Paper", assignment: "Assignment", web: "Web source" }[type] || "Source";
}

const systemToday = (() => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
})();
const systemSeed = {
  contacts: [
    { id: "c1", name: "Blake Cascadden", role: "You", org: "Cornell", influence: 5, email: "", notes: "Center of your relationship graph.", tags: ["Core"], x: 50, y: 50, logs: [] },
    { id: "c2", name: "Maya Chen", role: "Associate", org: "Goldman Sachs", influence: 4, email: "maya@example.com", notes: "Cornell alum interested in student leadership.", tags: ["Finance", "Alumni"], x: 27, y: 28, logs: [{ date: "Sep 10", type: "Coffee chat", note: "Discussed summer analyst recruiting." }] },
    { id: "c3", name: "Theo Grant", role: "VP, Finance", org: "Goldman Sachs", influence: 5, email: "theo@example.com", notes: "Warm introduction through Maya.", tags: ["Decision maker"], x: 15, y: 15, logs: [] },
    { id: "c4", name: "Jordan Ellis", role: "Coach", org: "Cornell Athletics", influence: 4, email: "jordan@example.com", notes: "Performance and alumni introductions.", tags: ["Athletics"], x: 72, y: 28, logs: [] },
    { id: "c5", name: "Sofia Patel", role: "Founder", org: "Northstar Labs", influence: 3, email: "sofia@example.com", notes: "Met through entrepreneurship club.", tags: ["Founder"], x: 84, y: 15, logs: [] },
    { id: "c6", name: "Eli Brooks", role: "Recruiter", org: "Handshake", influence: 3, email: "eli@example.com", notes: "Campus recruiting contact.", tags: ["Recruiting"], x: 28, y: 74, logs: [] }
  ],
  links: [["c1", "c2"], ["c2", "c3"], ["c1", "c4"], ["c4", "c5"], ["c1", "c6"]],
  opportunities: [
    { id: "o1", title: "Real Estate Investment Summer Analyst", company: "Harbor Group", industry: "Real Estate", position: "Investment Analyst", type: "Internship", location: "New York, NY", workMode: "In person", deadline: "", status: "Interested", source: "Company careers", link: "", description: "Evaluate acquisitions, markets, and property level performance while supporting the investment team.", qualifications: ["Financial modeling", "Market research", "Excel"], notes: "Research the investment strategy and identify Cornell alumni at the firm." },
    { id: "o2", title: "Commercial Real Estate Summer Analyst", company: "Wells Fargo", industry: "Real Estate", position: "Summer Analyst", type: "Internship", location: "New York, NY", workMode: "Hybrid", deadline: "", status: "Researching", source: "Career portal", link: "", description: "Support underwriting, credit analysis, and deal execution for commercial real estate clients.", qualifications: ["Accounting", "Credit analysis", "Communication"], notes: "Connect the role to hotel finance coursework and real estate investment interests." },
    { id: "o3", title: "Investment Summer Intern", company: "SLR Capital Partners", industry: "Private Credit", position: "Investment Intern", type: "Internship", location: "New York, NY", workMode: "In person", deadline: "", status: "Saved", source: "Networking", link: "", description: "Assist with company research, investment analysis, diligence, and portfolio monitoring.", qualifications: ["Valuation", "Research", "PowerPoint"], notes: "Prepare a concise explanation of interest in private credit." },
    { id: "o4", title: "Capital Markets Summer Analyst", company: "Welltower", industry: "Real Estate", position: "Capital Markets", type: "Internship", location: "New York, NY", workMode: "Hybrid", deadline: "", status: "Interested", source: "Company careers", link: "", description: "Help analyze financing activity, capital structure decisions, and market conditions for a real estate platform.", qualifications: ["Corporate finance", "Excel", "Capital markets"], notes: "Highlight the combination of real estate, finance, and hospitality experience." },
    { id: "o5", title: "Sales and Trading Summer Analyst", company: "Piper Sandler", industry: "Capital Markets", position: "Sales and Trading", type: "Internship", location: "New York, NY", workMode: "In person", deadline: "", status: "Networking", source: "Relationship network", link: "", description: "Work with trading and sales teams while following markets, clients, and daily risk activity.", qualifications: ["Markets", "Data analysis", "Client communication"], notes: "Use the prior desk visit and relationship with Joe as context for future outreach." }
  ],
  events: [
    { id: "e1", title: "HADM 2220 Finance", date: "2026-09-14", start: "09:05", end: "09:55", source: "Academic", priority: "high", zone: "Deep work", notes: "Time value of money" },
    { id: "e2", title: "Lift · Lower body", date: "2026-09-14", start: "11:15", end: "12:15", source: "Health", priority: "medium", zone: "Training", notes: "Performance plan" },
    { id: "e3", title: "Coffee chat · Maya", date: "2026-09-14", start: "14:00", end: "14:30", source: "Networking", priority: "high", zone: "Relationships", notes: "Prepare recruiting questions" },
    { id: "e4", title: "Team practice", date: "2026-09-14", start: "16:15", end: "18:15", source: "Athletics", priority: "high", zone: "Training", notes: "Schoellkopf Field" },
    { id: "e5", title: "Statistics problem set", date: "2026-09-15", start: "10:00", end: "11:30", source: "Academic", priority: "medium", zone: "Deep work", notes: "Chapter 4" }
  ],
  health: [
    { id: "h1", date: "2026-09-14", recovery: 62, exertion: 7.4, load: 846, sleep: 7.1, hr: 54, workout: "Lower body lift", provider: "Garmin" },
    { id: "h2", date: "2026-09-13", recovery: 78, exertion: 8.1, load: 812, sleep: 8, hr: 51, workout: "Practice · 92 min", provider: "Strava" },
    { id: "h3", date: "2026-09-12", recovery: 84, exertion: 6.2, load: 760, sleep: 8.4, hr: 49, workout: "Tempo run · 5.2 mi", provider: "Garmin" }
  ],
  transactions: [
    { id: "t1", date: "2026-09-13", name: "GreenStar Co-op", category: "Food", amount: -68.42, type: "expense" },
    { id: "t2", date: "2026-09-12", name: "Campus job", category: "Income", amount: 420, type: "income" },
    { id: "t3", date: "2026-09-11", name: "Cornell Store", category: "Academic", amount: -84.9, type: "expense" }
  ],
  subscriptions: [{ id: "s1", name: "Spotify Student", amount: 5.99, due: 18, category: "Media" }, { id: "s2", name: "iCloud+", amount: 2.99, due: 23, category: "Storage" }],
  goals: [{ id: "g1", name: "Emergency fund", current: 2850, target: 5000 }, { id: "g2", name: "Summer travel", current: 920, target: 1800 }],
  mail: {
    connection: { mode: "demo", connected: false, name: "", email: "", lastSync: null },
    preferences: { onboarded: false, focus: "academic", urgencyWindow: "48", newsletters: "digest", replyTone: "concise", calendarMode: "semi" },
    messages: [
      { id: "m1", threadId: "tm1", sender: "Professor Elena Ramirez <er482@cornell.edu>", subject: "HADM 2220 problem set deadline moved", receivedAt: `${systemToday}T08:42:00`, body: "Hi class, the valuation problem set is now due Thursday, September 17 at 11:59 PM. Please upload one PDF to Canvas. Reply if the adjusted deadline creates a conflict.", snippet: "The valuation problem set is now due Thursday...", unread: true, source: "Demo", category: "Deadlines", urgency: "urgent", calendar: { title: "HADM 2220 problem set due", date: "2026-09-17", start: "22:59", end: "23:59", priority: "high", zone: "Deep work" } },
      { id: "m2", threadId: "tm2", sender: "Cornell Career Services <career@cornell.edu>", subject: "Finance networking night — registration confirmed", receivedAt: `${systemToday}T07:18:00`, body: "Your registration is confirmed for Finance Networking Night on Friday, September 18 from 5:00 PM to 7:00 PM in Statler Ballroom. Business casual attire is recommended.", snippet: "Registration confirmed for Finance Networking Night...", unread: true, source: "Demo", category: "Networking", urgency: "soon", calendar: { title: "Finance Networking Night", date: "2026-09-18", start: "17:00", end: "19:00", priority: "high", zone: "Relationships" } },
      { id: "m3", threadId: "tm3", sender: "Maya Chen <maya@example.com>", subject: "Coffee chat this Friday?", receivedAt: `${systemToday}T10:06:00`, body: "Hi Blake — I enjoyed our last conversation. Are you available Friday, September 18 at 2:00 PM for a 30-minute follow-up? I can send a Meet link once confirmed.", snippet: "Are you available Friday at 2:00 PM?", unread: true, source: "Demo", category: "Networking", urgency: "urgent", calendar: { title: "Coffee chat · Maya Chen", date: "2026-09-18", start: "14:00", end: "14:30", priority: "high", zone: "Relationships" } },
      { id: "m4", threadId: "tm4", sender: "Office of the University Registrar <registrar@cornell.edu>", subject: "Action required: course enrollment deadline", receivedAt: `${systemToday}T06:54:00`, body: "Reminder: the deadline to adjust your course enrollment is Wednesday, September 16 at 4:30 PM. Review your enrollment in Student Center before the deadline.", snippet: "The deadline to adjust your course enrollment...", unread: false, source: "Demo", category: "Announcements", urgency: "urgent", calendar: { title: "Course enrollment deadline", date: "2026-09-16", start: "15:30", end: "16:30", priority: "high", zone: "Deep work" } },
      { id: "m5", threadId: "tm5", sender: "Coach Jordan Ellis <jordan@example.com>", subject: "Tomorrow's practice location", receivedAt: `${systemToday}T09:27:00`, body: "Team — tomorrow's practice will start at 4:15 PM at the indoor facility instead of Schoellkopf. Please arrive ten minutes early.", snippet: "Tomorrow's practice will start at the indoor facility...", unread: false, source: "Demo", category: "Announcements", urgency: "soon" },
      { id: "m6", threadId: "tm6", sender: "The Cornell Daily Sun <digest@cornellsun.com>", subject: "Morning headlines: campus and Ithaca", receivedAt: `${systemToday}T05:40:00`, body: "Today's digest covers campus sustainability, fall sports, local transit updates, and arts events around Ithaca.", snippet: "Today's campus and Ithaca headlines...", unread: true, source: "Demo", category: "Newsletters", urgency: "low" }
    ]
  },
  mailSuggestions: []
};
let systemData;
try { systemData = JSON.parse(localStorage.getItem("brain-os-v3")) || structuredClone(systemSeed); } catch { systemData = structuredClone(systemSeed); }
["contacts", "links", "opportunities", "events", "health", "transactions", "subscriptions", "goals", "mailSuggestions"].forEach(key => { if (!Array.isArray(systemData[key])) systemData[key] = structuredClone(systemSeed[key]); });
if (!systemData.mail || typeof systemData.mail !== "object") systemData.mail = structuredClone(systemSeed.mail);
systemData.mail.connection = { ...systemSeed.mail.connection, ...(systemData.mail.connection || {}) };
systemData.mail.connection.connected = false;
systemData.mail.preferences = { ...systemSeed.mail.preferences, ...(systemData.mail.preferences || {}) };
if (!Array.isArray(systemData.mail.messages)) systemData.mail.messages = structuredClone(systemSeed.mail.messages);
let selectedSystemContact = systemData.contacts.find(contact => contact.id !== "c1")?.id || "c1";
let selectedOpportunity = systemData.opportunities[0]?.id || null;
let opportunityQuery = "";
let opportunityIndustry = "all";
let opportunityPosition = "all";
let opportunityType = "all";
let networkFilterMode = ["all", "company", "person"].includes(localStorage.getItem("aetherNetworkMode")) ? localStorage.getItem("aetherNetworkMode") : "all";
let networkFilterCompany = localStorage.getItem("aetherNetworkCompany") || "";
let networkFilterPerson = localStorage.getItem("aetherNetworkPerson") || selectedSystemContact;
let systemCalendarView = "week";
let systemCalendarDate = systemToday;
let homeDayPeriod = "all";
let mailSelectedId = systemData.mail.messages[0]?.id || null;
let mailFilter = "all";
let mailQuery = "";
const saveSystemData = () => localStorage.setItem("brain-os-v3", JSON.stringify(systemData));
const saveNetworkFilter = () => {
  localStorage.setItem("aetherNetworkMode", networkFilterMode);
  localStorage.setItem("aetherNetworkCompany", networkFilterCompany);
  localStorage.setItem("aetherNetworkPerson", networkFilterPerson);
};
const systemId = prefix => `${prefix}${Date.now()}${Math.floor(Math.random() * 99)}`;
const niceSystemDate = value => new Date(`${value}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const systemMoney = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
const systemInitials = value => String(value).split(/\s+/).map(part => part[0]).slice(0, 2).join("").toUpperCase();
const systemHeader = (eyebrow, title, subtitle, stats) => `<section class="page-heading system-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${subtitle}</p></div><div class="system-stats">${stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div></section>`;

function renderNetworkingDashboard() {
  const root = $("#networkingDashboard");
  const byId = Object.fromEntries(systemData.contacts.map(contact => [contact.id, contact]));
  if (!byId[selectedSystemContact]) selectedSystemContact = systemData.contacts[0]?.id;
  const companies = [...new Set(systemData.contacts.map(contact => contact.org).filter(Boolean))].sort((a, b) => {
    const count = name => systemData.contacts.filter(contact => contact.org === name).length;
    return count(b) - count(a) || a.localeCompare(b);
  });
  if (!companies.includes(networkFilterCompany)) networkFilterCompany = companies[0] || "";
  if (!byId[networkFilterPerson]) networkFilterPerson = systemData.contacts[0]?.id;

  let visibleContacts = systemData.contacts;
  let positions = Object.fromEntries(visibleContacts.map(contact => [contact.id, { x: contact.x, y: contact.y }]));
  let edges = systemData.links.filter(([a, b]) => byId[a] && byId[b]).map(([a, b]) => `<line x1="${positions[a].x}%" y1="${positions[a].y}%" x2="${positions[b].x}%" y2="${positions[b].y}%"></line>`).join("");
  let companyNode = "";
  let viewLabel = "Full relationship network";

  if (networkFilterMode === "company") {
    visibleContacts = systemData.contacts.filter(contact => contact.org === networkFilterCompany);
    positions = {};
    visibleContacts.forEach((contact, index) => {
      const row = Math.floor(index / 4);
      const item = index % 4;
      const rowCount = Math.min(4, visibleContacts.length - row * 4);
      positions[contact.id] = { x: ((item + 1) / (rowCount + 1)) * 100, y: 49 + row * 27 };
    });
    edges = visibleContacts.map(contact => `<line class="company-branch" x1="50%" y1="20%" x2="${positions[contact.id].x}%" y2="${positions[contact.id].y}%"></line>`).join("");
    companyNode = `<div class="network-company-node" style="left:50%;top:20%"><span>${systemInitials(networkFilterCompany)}</span><strong>${escapeHtml(networkFilterCompany)}</strong><small>${visibleContacts.length} ${visibleContacts.length === 1 ? "person" : "people"}</small></div>`;
    viewLabel = `${networkFilterCompany} family tree`;
    if (!visibleContacts.some(contact => contact.id === selectedSystemContact)) selectedSystemContact = visibleContacts[0]?.id;
  }

  if (networkFilterMode === "person") {
    const focus = byId[networkFilterPerson];
    const branchIds = systemData.links.filter(link => link.includes(networkFilterPerson)).map(link => link[0] === networkFilterPerson ? link[1] : link[0]).filter(id => byId[id]);
    visibleContacts = [focus, ...branchIds.map(id => byId[id])].filter(Boolean);
    positions = {};
    if (focus) positions[focus.id] = { x: 50, y: 48 };
    branchIds.forEach((id, index) => {
      const angle = (Math.PI * 2 * index / Math.max(1, branchIds.length)) - Math.PI / 2;
      positions[id] = { x: 50 + Math.cos(angle) * 35, y: 48 + Math.sin(angle) * 34 };
    });
    edges = focus ? branchIds.map(id => `<line class="person-branch" x1="50%" y1="48%" x2="${positions[id].x}%" y2="${positions[id].y}%"></line>`).join("") : "";
    viewLabel = `${focus?.name || "Person"} and direct branches`;
    if (!visibleContacts.some(contact => contact.id === selectedSystemContact)) selectedSystemContact = networkFilterPerson;
  }

  const selected = byId[selectedSystemContact];
  const nodes = visibleContacts.map(contact => `<button class="network-node ${contact.id === selectedSystemContact ? "active" : ""} ${networkFilterMode === "person" && contact.id === networkFilterPerson ? "filter-root" : ""}" style="left:${positions[contact.id].x}%;top:${positions[contact.id].y}%" data-contact-node="${contact.id}" type="button"><span>${systemInitials(contact.name)}</span><strong>${escapeHtml(contact.name)}</strong><small>${escapeHtml(contact.org)}</small></button>`).join("");
  const direct = selected ? systemData.links.filter(link => link.includes(selected.id)).map(link => byId[link[0] === selected.id ? link[1] : link[0]]).filter(Boolean) : [];
  const filterControl = networkFilterMode === "company" ? `<label class="network-filter-select"><span>Company</span><select data-network-company>${companies.map(company => `<option value="${escapeHtml(company)}" ${company === networkFilterCompany ? "selected" : ""}>${escapeHtml(company)} · ${systemData.contacts.filter(contact => contact.org === company).length}</option>`).join("")}</select></label>` : networkFilterMode === "person" ? `<label class="network-filter-select"><span>Person</span><select data-network-person>${systemData.contacts.map(contact => `<option value="${contact.id}" ${contact.id === networkFilterPerson ? "selected" : ""}>${escapeHtml(contact.name)} · ${escapeHtml(contact.org)}</option>`).join("")}</select></label>` : `<div class="network-view-summary"><span></span>${escapeHtml(viewLabel)}</div>`;
  const opportunityIndustries = [...new Set(systemData.opportunities.map(item => item.industry).filter(Boolean))].sort();
  const opportunityPositions = [...new Set(systemData.opportunities.map(item => item.position).filter(Boolean))].sort();
  const query = opportunityQuery.trim().toLowerCase();
  const visibleOpportunities = systemData.opportunities.filter(item => {
    const matchesQuery = !query || [item.title, item.company, item.industry, item.position, item.location, item.description, item.notes].some(value => String(value || "").toLowerCase().includes(query));
    return matchesQuery && (opportunityIndustry === "all" || item.industry === opportunityIndustry) && (opportunityPosition === "all" || item.position === opportunityPosition) && (opportunityType === "all" || item.type === opportunityType);
  });
  if (!visibleOpportunities.some(item => item.id === selectedOpportunity)) selectedOpportunity = visibleOpportunities[0]?.id || null;
  const activeOpportunity = systemData.opportunities.find(item => item.id === selectedOpportunity);
  const opportunityCards = visibleOpportunities.map(item => `<button class="opportunity-card ${item.id === selectedOpportunity ? "active" : ""}" data-opportunity="${item.id}" type="button"><span class="opportunity-mark">${systemInitials(item.company)}</span><span class="opportunity-card-copy"><span class="opportunity-card-top"><strong>${escapeHtml(item.title)}</strong><i>${escapeHtml(item.status)}</i></span><span>${escapeHtml(item.company)} · ${escapeHtml(item.location)}</span><small>${escapeHtml(item.industry)} · ${escapeHtml(item.type)} · ${escapeHtml(item.workMode)}</small></span></button>`).join("");
  root.innerHTML = systemHeader("RELATIONSHIP INTELLIGENCE", "Networking", "See your full relationship map, company families, or every connection branching from one person.", [[systemData.contacts.length - 1, "CONTACTS"], [companies.length, "COMPANIES"], [systemData.opportunities.length, "OPPORTUNITIES"]]) + `<section class="system-split network-workspace"><div class="collection-panel"><div class="panel-heading network-panel-heading"><div><p class="kicker">DNA FAMILY TREE</p><h2>Relationship graph</h2></div><button class="text-button" data-add-contact type="button">+ Add contact</button></div><div class="network-filter-bar"><div class="segmented network-mode-tabs" aria-label="Filter relationship graph">${[["all", "Full network"], ["company", "By company"], ["person", "By person"]].map(([mode, label]) => `<button class="segment ${networkFilterMode === mode ? "active" : ""}" data-network-mode="${mode}" type="button">${label}</button>`).join("")}</div>${filterControl}</div><div class="network-map"><div class="network-map-caption"><span>${escapeHtml(viewLabel)}</span><small>${visibleContacts.length} visible nodes</small></div><svg aria-hidden="true">${edges}</svg>${companyNode}${nodes}${!visibleContacts.length ? `<div class="network-empty">No people are assigned to this company yet.</div>` : ""}</div></div><aside class="collection-panel contact-detail">${selected ? `<div class="contact-title"><span class="course-swatch">${systemInitials(selected.name)}</span><div><h2>${escapeHtml(selected.name)}</h2><p>${escapeHtml(selected.role)} · ${escapeHtml(selected.org)}</p></div></div><div class="tag-row">${(selected.tags || []).map(tag => `<span class="status-pill">${escapeHtml(tag)}</span>`).join("")}</div><div class="system-section"><p class="kicker">KEY NOTES</p><p>${escapeHtml(selected.notes || "No notes yet.")}</p></div><div class="system-section"><p class="kicker">INTERACTION LOG</p>${selected.logs?.length ? selected.logs.map(log => `<div class="compact-row"><strong>${escapeHtml(log.type)}</strong><span>${escapeHtml(log.date)} · ${escapeHtml(log.note)}</span></div>`).join("") : "<p>No interactions recorded.</p>"}</div><div class="system-section"><p class="kicker">DIRECT BRANCHES</p><p>${direct.map(contact => escapeHtml(contact.name)).join(" · ") || "No direct branches"}</p><p>Influence depth ${selected.influence}/5</p></div><div class="context-record-actions"><button class="button secondary" data-edit-contact="${selected.id}" type="button">Edit</button><button class="button secondary" data-log-contact="${selected.id}" type="button">Log interaction</button>${selected.id !== "c1" ? `<button class="button danger" data-delete-contact="${selected.id}" type="button">Delete</button>` : ""}</div>` : "<div class='empty-list'>Add a contact to begin your graph.</div>"}</aside></section><section class="opportunities-section"><div class="opportunities-heading"><div><p class="kicker">OPPORTUNITIES</p><h2>Job and internship search</h2><p>Search your pipeline by industry, position, or opportunity type.</p></div><button class="button secondary" data-add-opportunity type="button">+ Add opportunity</button></div><div class="opportunity-filters"><label class="opportunity-search"><span class="search-icon" aria-hidden="true"></span><input data-opportunity-search type="search" value="${escapeHtml(opportunityQuery)}" placeholder="Search company, role, location, or keyword"></label><label><span>Industry</span><select data-opportunity-industry><option value="all">All industries</option>${opportunityIndustries.map(value => `<option value="${escapeHtml(value)}" ${value === opportunityIndustry ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}</select></label><label><span>Position</span><select data-opportunity-position><option value="all">All positions</option>${opportunityPositions.map(value => `<option value="${escapeHtml(value)}" ${value === opportunityPosition ? "selected" : ""}>${escapeHtml(value)}</option>`).join("")}</select></label><label><span>Type</span><select data-opportunity-type><option value="all">All types</option>${["Internship", "Full time", "Part time", "Externship"].map(value => `<option value="${value}" ${value === opportunityType ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="system-split opportunity-workspace"><div class="collection-panel opportunity-results"><div class="opportunity-results-heading"><span><strong>${visibleOpportunities.length}</strong> matching opportunities</span>${visibleOpportunities.length !== systemData.opportunities.length ? `<button class="text-button" data-clear-opportunity-filters type="button">Clear filters</button>` : ""}</div><div class="opportunity-list">${opportunityCards || `<div class="opportunity-empty"><strong>No matches found</strong><span>Try changing a filter or add a new opportunity.</span></div>`}</div></div><aside class="collection-panel opportunity-detail">${activeOpportunity ? `<div class="opportunity-detail-heading"><span class="opportunity-mark large">${systemInitials(activeOpportunity.company)}</span><div><span class="status-pill">${escapeHtml(activeOpportunity.status)}</span><h2>${escapeHtml(activeOpportunity.title)}</h2><p>${escapeHtml(activeOpportunity.company)}</p></div></div><div class="opportunity-facts"><div><span>INDUSTRY</span><strong>${escapeHtml(activeOpportunity.industry)}</strong></div><div><span>POSITION</span><strong>${escapeHtml(activeOpportunity.position)}</strong></div><div><span>LOCATION</span><strong>${escapeHtml(activeOpportunity.location)}</strong></div><div><span>TYPE</span><strong>${escapeHtml(activeOpportunity.type)} · ${escapeHtml(activeOpportunity.workMode)}</strong></div></div><div class="system-section"><p class="kicker">ROLE OVERVIEW</p><p>${escapeHtml(activeOpportunity.description || "No description yet.")}</p></div><div class="system-section"><p class="kicker">QUALIFICATIONS</p><div class="tag-row">${(activeOpportunity.qualifications || []).map(item => `<span class="status-pill">${escapeHtml(item)}</span>`).join("") || "<p>No qualifications added.</p>"}</div></div><div class="system-section"><p class="kicker">NEXT MOVE</p><p>${escapeHtml(activeOpportunity.notes || "Add a next step for this opportunity.")}</p><p class="opportunity-source">Source · ${escapeHtml(activeOpportunity.source || "Not set")}${activeOpportunity.deadline ? ` · Deadline ${niceSystemDate(activeOpportunity.deadline)}` : ""}</p></div><div class="context-record-actions">${activeOpportunity.link ? `<a class="button" href="${escapeHtml(activeOpportunity.link)}" target="_blank" rel="noreferrer">View role</a>` : ""}<button class="button secondary" data-edit-opportunity="${activeOpportunity.id}" type="button">Edit</button><button class="button danger" data-delete-opportunity="${activeOpportunity.id}" type="button">Delete</button></div>` : `<div class="empty-list">Select an opportunity to see its details.</div>`}</aside></div></section>`;
  root.querySelectorAll("[data-contact-node]").forEach(button => button.addEventListener("click", () => { selectedSystemContact = button.dataset.contactNode; renderNetworkingDashboard(); }));
  root.querySelectorAll("[data-network-mode]").forEach(button => button.addEventListener("click", () => { networkFilterMode = button.dataset.networkMode; if (networkFilterMode === "person") selectedSystemContact = networkFilterPerson; if (networkFilterMode === "company") selectedSystemContact = systemData.contacts.find(contact => contact.org === networkFilterCompany)?.id; saveNetworkFilter(); renderNetworkingDashboard(); }));
  root.querySelector("[data-network-company]")?.addEventListener("change", event => { networkFilterCompany = event.currentTarget.value; selectedSystemContact = systemData.contacts.find(contact => contact.org === networkFilterCompany)?.id; saveNetworkFilter(); renderNetworkingDashboard(); });
  root.querySelector("[data-network-person]")?.addEventListener("change", event => { networkFilterPerson = event.currentTarget.value; selectedSystemContact = networkFilterPerson; saveNetworkFilter(); renderNetworkingDashboard(); });
  root.querySelector("[data-add-contact]")?.addEventListener("click", () => contactRecordForm());
  root.querySelector("[data-edit-contact]")?.addEventListener("click", event => contactRecordForm(event.currentTarget.dataset.editContact));
  root.querySelector("[data-log-contact]")?.addEventListener("click", event => interactionRecordForm(event.currentTarget.dataset.logContact));
  root.querySelector("[data-delete-contact]")?.addEventListener("click", event => { const id = event.currentTarget.dataset.deleteContact; if (confirm("Delete this contact and their connections?")) { systemData.contacts = systemData.contacts.filter(contact => contact.id !== id); systemData.links = systemData.links.filter(link => !link.includes(id)); if (networkFilterPerson === id) networkFilterPerson = "c1"; selectedSystemContact = "c1"; saveSystemData(); saveNetworkFilter(); renderNetworkingDashboard(); showToast("Contact deleted."); } });
  root.querySelectorAll("[data-opportunity]").forEach(button => button.addEventListener("click", () => { selectedOpportunity = button.dataset.opportunity; renderNetworkingDashboard(); }));
  root.querySelector("[data-opportunity-search]")?.addEventListener("input", event => { opportunityQuery = event.currentTarget.value; renderNetworkingDashboard(); root.querySelector("[data-opportunity-search]")?.focus(); });
  root.querySelector("[data-opportunity-industry]")?.addEventListener("change", event => { opportunityIndustry = event.currentTarget.value; renderNetworkingDashboard(); });
  root.querySelector("[data-opportunity-position]")?.addEventListener("change", event => { opportunityPosition = event.currentTarget.value; renderNetworkingDashboard(); });
  root.querySelector("[data-opportunity-type]")?.addEventListener("change", event => { opportunityType = event.currentTarget.value; renderNetworkingDashboard(); });
  root.querySelector("[data-clear-opportunity-filters]")?.addEventListener("click", () => { opportunityQuery = ""; opportunityIndustry = "all"; opportunityPosition = "all"; opportunityType = "all"; renderNetworkingDashboard(); });
  root.querySelector("[data-add-opportunity]")?.addEventListener("click", () => opportunityRecordForm());
  root.querySelector("[data-edit-opportunity]")?.addEventListener("click", event => opportunityRecordForm(event.currentTarget.dataset.editOpportunity));
  root.querySelector("[data-delete-opportunity]")?.addEventListener("click", event => { const id = event.currentTarget.dataset.deleteOpportunity; if (confirm("Delete this opportunity?")) { systemData.opportunities = systemData.opportunities.filter(item => item.id !== id); selectedOpportunity = systemData.opportunities[0]?.id || null; saveSystemData(); renderNetworkingDashboard(); showToast("Opportunity deleted."); } });
}

function opportunityRecordForm(id = null) {
  const item = systemData.opportunities.find(record => record.id === id) || { title: "", company: "", industry: "", position: "", type: "Internship", location: "", workMode: "In person", deadline: "", status: "Saved", source: "", link: "", description: "", qualifications: [], notes: "" };
  openAcademicForm(id ? "Edit opportunity" : "Add opportunity", "OPPORTUNITY RECORD", `<label>Role title<input name="title" required value="${escapeHtml(item.title)}"></label><div class="form-row"><label>Company<input name="company" required value="${escapeHtml(item.company)}"></label><label>Industry<input name="industry" required value="${escapeHtml(item.industry)}"></label></div><div class="form-row"><label>Position category<input name="position" required value="${escapeHtml(item.position)}"></label><label>Opportunity type<select name="type">${["Internship", "Full time", "Part time", "Externship"].map(value => `<option ${item.type === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="form-row"><label>Location<input name="location" value="${escapeHtml(item.location)}"></label><label>Work mode<select name="workMode">${["In person", "Hybrid", "Remote"].map(value => `<option ${item.workMode === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="form-row"><label>Status<select name="status">${["Saved", "Researching", "Interested", "Networking", "Applying", "Applied", "Interviewing", "Offer", "Closed"].map(value => `<option ${item.status === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Deadline<input name="deadline" type="date" value="${escapeHtml(item.deadline || "")}"></label></div><div class="form-row"><label>Source<input name="source" value="${escapeHtml(item.source)}" placeholder="Company careers, Handshake, referral"></label><label>Role link<input name="link" type="url" value="${escapeHtml(item.link)}" placeholder="https://"></label></div><label>Role overview<textarea name="description" rows="4">${escapeHtml(item.description)}</textarea></label><label>Qualifications, comma separated<input name="qualifications" value="${escapeHtml((item.qualifications || []).join(", "))}"></label><label>Next move and notes<textarea name="notes" rows="4">${escapeHtml(item.notes)}</textarea></label>`, data => {
    const record = { title: data.get("title").trim(), company: data.get("company").trim(), industry: data.get("industry").trim(), position: data.get("position").trim(), type: data.get("type"), location: data.get("location").trim(), workMode: data.get("workMode"), deadline: data.get("deadline"), status: data.get("status"), source: data.get("source").trim(), link: data.get("link").trim(), description: data.get("description").trim(), qualifications: data.get("qualifications").split(",").map(value => value.trim()).filter(Boolean), notes: data.get("notes").trim() };
    if (id) Object.assign(item, record); else { record.id = systemId("o"); systemData.opportunities.unshift(record); selectedOpportunity = record.id; }
    saveSystemData(); renderNetworkingDashboard(); showToast(id ? "Opportunity updated." : "Opportunity added.");
  });
}

function contactRecordForm(id = null) {
  const contact = systemData.contacts.find(item => item.id === id) || { name: "", role: "", org: "", email: "", influence: 3, tags: [], notes: "" };
  openAcademicForm(id ? "Edit contact" : "Add contact", "CONTACT RECORD", `<label>Name<input name="name" required value="${escapeHtml(contact.name)}"></label><div class="form-row"><label>Organization<input name="org" required value="${escapeHtml(contact.org)}"></label><label>Role<input name="role" value="${escapeHtml(contact.role)}"></label></div><div class="form-row"><label>Email<input type="email" name="email" value="${escapeHtml(contact.email)}"></label><label>Influence depth<select name="influence">${[1, 2, 3, 4, 5].map(value => `<option ${contact.influence === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><label>Tags, comma separated<input name="tags" value="${escapeHtml((contact.tags || []).join(", "))}"></label><label>Key notes<textarea name="notes" rows="4">${escapeHtml(contact.notes)}</textarea></label>`, data => {
    const record = { name: data.get("name").trim(), org: data.get("org").trim(), role: data.get("role").trim(), email: data.get("email").trim(), influence: Number(data.get("influence")), tags: data.get("tags").split(",").map(tag => tag.trim()).filter(Boolean), notes: data.get("notes").trim() };
    if (id) Object.assign(contact, record); else { Object.assign(record, { id: systemId("c"), x: 20 + Math.random() * 60, y: 18 + Math.random() * 64, logs: [] }); systemData.contacts.push(record); systemData.links.push(["c1", record.id]); selectedSystemContact = record.id; }
    if (networkFilterMode === "company") networkFilterCompany = record.org;
    saveSystemData(); saveNetworkFilter(); renderNetworkingDashboard(); showToast(id ? "Contact updated." : "Contact added.");
  });
}

function interactionRecordForm(id) {
  const contact = systemData.contacts.find(item => item.id === id);
  if (!contact) return;
  openAcademicForm(`Log interaction · ${contact.name}`, "RELATIONSHIP HISTORY", `<div class="form-row"><label>Type<select name="type"><option>Email</option><option>Call</option><option>Coffee chat</option><option>Meeting</option><option>Message</option></select></label><label>Date<input name="date" type="date" value="${systemToday}"></label></div><label>Notes<textarea name="note" rows="4" required></textarea></label><label class="checkbox-label"><input type="checkbox" name="followup"> Add a follow-up to Calendar in seven days</label>`, data => {
    contact.logs ||= [];
    contact.logs.unshift({ date: niceSystemDate(data.get("date")), type: data.get("type"), note: data.get("note").trim() });
    if (data.get("followup")) { const date = new Date(`${data.get("date")}T12:00:00`); date.setDate(date.getDate() + 7); systemData.events.push({ id: systemId("e"), title: `Follow up · ${contact.name}`, date: date.toISOString().slice(0, 10), start: "10:00", end: "10:30", source: "Networking", priority: "medium", zone: "Relationships", notes: data.get("note").trim() }); }
    saveSystemData(); renderNetworkingDashboard(); showToast("Interaction logged.");
  });
}

function systemCalendarRange() {
  const base = new Date(`${systemCalendarDate}T12:00:00`);
  if (systemCalendarView === "week") base.setDate(base.getDate() - ((base.getDay() + 6) % 7));
  const count = systemCalendarView === "day" ? 1 : systemCalendarView === "3day" ? 3 : 7;
  return Array.from({ length: count }, (_, index) => { const date = new Date(base); date.setDate(base.getDate() + index); return date.toISOString().slice(0, 10); });
}

function renderCalendarDashboard() {
  const root = $("#calendarDashboard"), range = systemCalendarRange(), visible = systemData.events.filter(event => systemCalendarView === "month" ? event.date.slice(0, 7) === systemCalendarDate.slice(0, 7) : range.includes(event.date));
  let surface;
  if (systemCalendarView === "month") {
    const first = new Date(`${systemCalendarDate.slice(0, 7)}-01T12:00:00`), start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7));
    const days = Array.from({ length: 35 }, (_, index) => { const date = new Date(start); date.setDate(start.getDate() + index); return date.toISOString().slice(0, 10); });
    surface = `<div class="month-labels">${["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(day => `<span>${day}</span>`).join("")}</div><div class="integrated-month">${days.map(day => `<button class="month-cell ${day === systemToday ? "today" : ""} ${day.slice(0, 7) !== systemCalendarDate.slice(0, 7) ? "muted" : ""}" data-calendar-day="${day}" type="button"><b>${Number(day.slice(-2))}</b>${systemData.events.filter(event => event.date === day).slice(0, 3).map(event => `<span data-calendar-event="${event.id}">${escapeHtml(event.start)} ${escapeHtml(event.title)}</span>`).join("")}</button>`).join("")}</div>`;
  } else {
    surface = `<div class="integrated-calendar" style="--calendar-columns:${range.length}">${range.map(day => `<section><header class="${day === systemToday ? "today" : ""}"><span>${new Date(`${day}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" })}</span><strong>${Number(day.slice(-2))}</strong></header><div class="calendar-column" data-calendar-day="${day}">${systemData.events.filter(event => event.date === day).sort((a, b) => a.start.localeCompare(b.start)).map(event => `<button class="integrated-event source-${event.source.toLowerCase()}" data-calendar-event="${event.id}" type="button"><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.start)}–${escapeHtml(event.end)}</small><span>${escapeHtml(event.source)}</span></button>`).join("")}</div></section>`).join("")}</div>`;
  }
  const dayEvents = systemData.events.filter(event => event.date === systemCalendarDate).sort((a, b) => a.start.localeCompare(b.start));
  const pendingMail = systemData.mailSuggestions.filter(item => item.status === "pending");
  const mailAutomation = `<section class="calendar-mail-automation"><div class="calendar-automation-heading"><div><span class="mail-spark">✦</span><div><p class="kicker">MAIL → CALENDAR</p><h2>${pendingMail.length ? `${pendingMail.length} event${pendingMail.length === 1 ? "" : "s"} ready for review` : "Inbox events are up to date"}</h2><p>${systemData.mail.preferences.calendarMode === "auto" ? "New event details are added automatically and remain editable." : "Review parsed details before anything is written to your calendar."}</p></div></div><div class="automation-mode" role="group" aria-label="Mail calendar automation"><button class="${systemData.mail.preferences.calendarMode === "semi" ? "active" : ""}" data-mail-calendar-mode="semi" type="button">Ask first</button><button class="${systemData.mail.preferences.calendarMode === "auto" ? "active" : ""}" data-mail-calendar-mode="auto" type="button">Automatic</button></div></div>${pendingMail.length ? `<div class="calendar-proposal-list">${pendingMail.map(item => `<article><div class="proposal-date"><strong>${Number(item.date.slice(-2))}</strong><span>${new Date(`${item.date}T12:00:00`).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</span></div><div class="proposal-copy"><span><em>${item.confidence}% confident</em><i>${escapeHtml(item.priority)} priority</i></span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.start)}–${escapeHtml(item.end)} · from ${escapeHtml(senderName(item.sender))}</p></div><div class="proposal-actions"><button class="button secondary" data-edit-mail-proposal="${item.id}" type="button">Edit</button><button class="text-button proposal-dismiss" data-dismiss-mail-proposal="${item.id}" type="button">Dismiss</button><button class="button primary" data-approve-mail-proposal="${item.id}" type="button">Add to Calendar</button></div></article>`).join("")}</div>` : ""}</section>`;
  root.innerHTML = systemHeader("COMMAND YOUR TIME", "Calendar", "One editable schedule assembled from Google Calendar, academics, athletics, mail, health, and relationships.", [[visible.length, "IN VIEW"], [systemData.events.filter(event => event.priority === "high").length, "HIGH PRIORITY"], [6, "SYNC SOURCES"]]) + mailAutomation + `<section class="collection-panel calendar-shell"><div class="calendar-toolbar"><div><p class="kicker">${systemCalendarView === "month" ? new Date(`${systemCalendarDate}T12:00:00`).toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase() : `${niceSystemDate(range[0])}${range.length > 1 ? ` — ${niceSystemDate(range.at(-1))}` : ""}`}</p><h2>Your schedule</h2></div><div class="calendar-controls"><button class="button secondary" data-calendar-step="-1" type="button">‹</button><button class="button secondary" data-calendar-today type="button">Today</button><button class="button secondary" data-calendar-step="1" type="button">›</button><div class="segmented">${[["day", "1-Day"], ["3day", "3-Day"], ["week", "Week"], ["month", "Month"]].map(([value, label]) => `<button class="segment ${systemCalendarView === value ? "active" : ""}" data-calendar-view="${value}" type="button">${label}</button>`).join("")}</div></div></div><div class="calendar-content">${surface}<aside class="daily-brief"><p class="kicker">DAILY BRIEF · ${niceSystemDate(systemCalendarDate)}</p><h2>${dayEvents.length ? "Your commitments at a glance" : "A clear day to shape"}</h2><p>${dayEvents.length} commitments · ${dayEvents.filter(event => event.priority === "high").length} high priority</p>${dayEvents.slice(0, 4).map(event => `<button data-calendar-event="${event.id}" type="button"><strong>${escapeHtml(event.title)}</strong><span>${escapeHtml(event.start)} · ${escapeHtml(event.zone)}</span></button>`).join("") || "<div class='empty-list'>No events scheduled.</div>"}</aside></div></section>`;
  root.querySelectorAll("[data-calendar-view]").forEach(button => button.addEventListener("click", () => { systemCalendarView = button.dataset.calendarView; renderCalendarDashboard(); }));
  root.querySelectorAll("[data-calendar-step]").forEach(button => button.addEventListener("click", () => { const date = new Date(`${systemCalendarDate}T12:00:00`), direction = Number(button.dataset.calendarStep); if (systemCalendarView === "month") date.setMonth(date.getMonth() + direction); else date.setDate(date.getDate() + direction * (systemCalendarView === "week" ? 7 : systemCalendarView === "3day" ? 3 : 1)); systemCalendarDate = date.toISOString().slice(0, 10); renderCalendarDashboard(); }));
  root.querySelector("[data-calendar-today]").addEventListener("click", () => { systemCalendarDate = systemToday; renderCalendarDashboard(); });
  root.querySelectorAll("[data-calendar-event]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); eventRecordForm(button.dataset.calendarEvent); }));
  root.querySelectorAll("[data-calendar-day]").forEach(button => button.addEventListener("click", () => eventRecordForm(null, button.dataset.calendarDay)));
  root.querySelectorAll("[data-approve-mail-proposal]").forEach(button => button.addEventListener("click", () => approveMailSuggestion(button.dataset.approveMailProposal)));
  root.querySelectorAll("[data-dismiss-mail-proposal]").forEach(button => button.addEventListener("click", () => dismissMailSuggestion(button.dataset.dismissMailProposal)));
  root.querySelectorAll("[data-edit-mail-proposal]").forEach(button => button.addEventListener("click", () => editMailSuggestion(button.dataset.editMailProposal)));
  root.querySelectorAll("[data-mail-calendar-mode]").forEach(button => button.addEventListener("click", () => {
    systemData.mail.preferences.calendarMode = button.dataset.mailCalendarMode;
    refreshMailSuggestions();
    if (button.dataset.mailCalendarMode === "auto") systemData.mailSuggestions.filter(item => item.status === "pending").forEach(item => approveMailSuggestion(item.id, false));
    window.AcademicOSMail?.savePreferences(systemData.mail.preferences).catch(() => {});
    saveSystemData();
    renderCalendarDashboard();
    showToast(button.dataset.mailCalendarMode === "auto" ? "Mail events will be added automatically." : "Mail events will wait for your approval.");
  }));
}

function eventRecordForm(id = null, date = systemCalendarDate) {
  const event = systemData.events.find(item => item.id === id) || { title: "", date, start: "09:00", end: "10:00", source: "Manual", priority: "medium", zone: "Flexible", notes: "" };
  openAcademicForm(id ? "Edit event" : "Add event", "CALENDAR RECORD", `<label>Title<input name="title" required value="${escapeHtml(event.title)}"></label><div class="form-row"><label>Date<input name="date" type="date" required value="${event.date}"></label><label>Source<select name="source">${["Manual", "Google", "Academic", "Athletics", "Mail", "Health", "Networking"].map(value => `<option ${event.source === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="form-row"><label>Starts<input name="start" type="time" required value="${event.start}"></label><label>Ends<input name="end" type="time" required value="${event.end}"></label></div><div class="form-row"><label>Priority<select name="priority">${["high", "medium", "low"].map(value => `<option ${event.priority === value ? "selected" : ""}>${value}</option>`).join("")}</select></label><label>Time-block zone<select name="zone">${["Deep work", "Training", "Relationships", "Recovery", "Flexible"].map(value => `<option ${event.zone === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><label>Notes<textarea name="notes" rows="4">${escapeHtml(event.notes)}</textarea></label>`, data => {
    if (data.get("end") <= data.get("start")) { showToast("End time must be after start time."); return false; }
    const record = { id: id || systemId("e"), title: data.get("title").trim(), date: data.get("date"), start: data.get("start"), end: data.get("end"), source: data.get("source"), priority: data.get("priority"), zone: data.get("zone"), notes: data.get("notes").trim() };
    if (id) Object.assign(event, record); else systemData.events.push(record);
    saveSystemData(); renderCalendarDashboard(); if (state.view === "home") renderHome(); showToast(id ? "Event updated." : "Event added.");
  }, id ? () => { systemData.events = systemData.events.filter(item => item.id !== id); saveSystemData(); renderCalendarDashboard(); showToast("Event deleted."); } : null);
}

function renderHealthDashboard() {
  const root = $("#healthDashboard"), latest = systemData.health[0] || { recovery: 0, exertion: 0, load: 0, sleep: 0, hr: 0, workout: "No workout", provider: "Manual" }, low = latest.recovery < 65;
  root.innerHTML = systemHeader("HEALTH & PERFORMANCE", "Health & performance", "Recovery, exertion, training load, sleep, and heart-rate context in one view.", [[latest.recovery, "RECOVERY"], [latest.exertion, "EXERTION"], [latest.load, "TRAINING LOAD"]]) + `<section class="metric-grid"><article class="metric-card recovery-card"><div><p class="kicker">RECOVERY</p><span class="status-pill">${escapeHtml(latest.provider)}</span></div><div class="recovery-ring" style="--recovery:${latest.recovery}"><strong>${latest.recovery}</strong><small>/100</small></div><p class="${low ? "warning-copy" : "positive-copy"}">${low ? "Below baseline" : "Ready for planned load"}</p></article>${[["DAILY EXERTION", latest.exertion, "/10"], ["TRAINING LOAD", latest.load, "7-day"], ["SLEEP", latest.sleep, "hours"], ["RESTING HR", latest.hr, "bpm"]].map(([label, value, unit]) => `<article class="metric-card"><p class="kicker">${label}</p><h2>${value}<small>${unit}</small></h2><div class="metric-meter"><i style="width:${Math.min(100, Number(value) / (label === "TRAINING LOAD" ? 10 : label === "RESTING HR" ? 1 : .1))}%"></i></div></article>`).join("")}<article class="recovery-alert ${low ? "low" : ""}"><div><p class="kicker">AUTOMATED COACH</p><h2>${low ? "Protect recovery today" : "Schedule is aligned"}</h2><p>${low ? "Keep required commitments, reduce optional intensity, and add a reset window." : "No calendar changes are suggested."}</p></div>${low ? '<button class="button primary" data-apply-recovery type="button">Apply calendar adjustment</button>' : ""}</article></section><section class="collection-panel health-log"><div class="panel-heading"><div><p class="kicker">RECENT LOAD</p><h2>Performance log</h2></div><button class="text-button" data-add-health type="button">+ Log metrics</button></div>${systemData.health.map(item => `<button class="system-data-row" data-health-record="${item.id}" type="button"><span class="health-score ${item.recovery < 65 ? "low" : ""}">${item.recovery}</span><span><strong>${escapeHtml(item.workout)}</strong><small>${niceSystemDate(item.date)} · ${escapeHtml(item.provider)}</small></span><span><strong>${item.exertion}</strong><small>exertion</small></span><b>›</b></button>`).join("")}</section>`;
  root.querySelector("[data-add-health]").addEventListener("click", () => healthRecordForm());
  root.querySelectorAll("[data-health-record]").forEach(button => button.addEventListener("click", () => healthRecordForm(button.dataset.healthRecord)));
  root.querySelector("[data-apply-recovery]")?.addEventListener("click", () => { const lift = systemData.events.find(event => event.date === systemToday && event.title.includes("Lift")); if (lift) { lift.title = "Light lift · technique focus"; lift.priority = "low"; } if (!systemData.events.some(event => event.date === systemToday && event.title.includes("Recovery reset"))) systemData.events.push({ id: systemId("e"), title: "Recovery reset", date: systemToday, start: "13:00", end: "13:30", source: "Health", priority: "high", zone: "Recovery", notes: "Added from recovery alert" }); saveSystemData(); showToast("Calendar adjusted for recovery."); renderHealthDashboard(); });
}

function healthRecordForm(id = null) {
  const record = systemData.health.find(item => item.id === id) || { date: systemToday, recovery: 70, exertion: 5, load: 700, sleep: 8, hr: 52, workout: "", provider: "Manual" };
  openAcademicForm(id ? "Edit health log" : "Log health metrics", "PERFORMANCE RECORD", `<div class="form-row"><label>Date<input name="date" type="date" value="${record.date}" required></label><label>Provider<select name="provider">${["Manual", "Garmin", "Strava", "Fitbit", "Apple Health"].map(value => `<option ${record.provider === value ? "selected" : ""}>${value}</option>`).join("")}</select></label></div><div class="form-row"><label>Recovery score<input name="recovery" type="number" min="0" max="100" value="${record.recovery}" required></label><label>Exertion<input name="exertion" type="number" min="0" max="10" step=".1" value="${record.exertion}" required></label></div><div class="form-row"><label>Training load<input name="load" type="number" min="0" value="${record.load}" required></label><label>Sleep hours<input name="sleep" type="number" min="0" max="16" step=".1" value="${record.sleep}" required></label></div><div class="form-row"><label>Resting HR<input name="hr" type="number" min="25" max="220" value="${record.hr}" required></label><label>Workout<input name="workout" value="${escapeHtml(record.workout)}"></label></div>`, data => { const next = { id: id || systemId("h"), date: data.get("date"), provider: data.get("provider"), recovery: Number(data.get("recovery")), exertion: Number(data.get("exertion")), load: Number(data.get("load")), sleep: Number(data.get("sleep")), hr: Number(data.get("hr")), workout: data.get("workout").trim() || "Training" }; if (id) Object.assign(record, next); else systemData.health.unshift(next); systemData.health.sort((a, b) => b.date.localeCompare(a.date)); saveSystemData(); renderHealthDashboard(); showToast(id ? "Health log updated." : "Health metrics logged."); }, id ? () => { systemData.health = systemData.health.filter(item => item.id !== id); saveSystemData(); renderHealthDashboard(); showToast("Health log deleted."); } : null);
}

function renderCapitalDashboard() {
  const root = $("#capitalDashboard"), income = systemData.transactions.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0), spent = -systemData.transactions.filter(item => item.amount < 0).reduce((sum, item) => sum + item.amount, 0), net = income - spent, recurring = systemData.subscriptions.reduce((sum, item) => sum + item.amount, 0);
  root.innerHTML = systemHeader("PERSONAL CAPITAL", "Capital", "Track cash flow, recurring costs, expenses, and savings goals.", [[systemMoney(net), "NET FLOW"], [systemMoney(spent), "SPENT"], [systemMoney(recurring), "RECURRING"]]) + `<section class="capital-overview"><article class="collection-panel cash-flow-card"><div class="panel-heading"><div><p class="kicker">MONTHLY CASH FLOW</p><h2>Money in, money out</h2></div><span class="status-pill">On track</span></div><div class="cash-totals"><div><span>INCOME</span><strong>${systemMoney(income)}</strong></div><div><span>EXPENSES</span><strong>−${systemMoney(spent)}</strong></div><div><span>NET</span><strong>${systemMoney(net)}</strong></div></div><div class="cash-bars">${[34, 46, 38, 58, 52, 70, 65, 78, 74, 88, 83, 96].map(value => `<i style="height:${value}%"></i>`).join("")}</div></article><article class="collection-panel goal-summary"><p class="kicker">SAVINGS GOALS</p><h2>What your money is building</h2>${systemData.goals.map(goal => `<button data-goal-record="${goal.id}" type="button"><span><strong>${escapeHtml(goal.name)}</strong><small>${systemMoney(goal.current)} of ${systemMoney(goal.target)}</small></span><b>${Math.round(goal.current / goal.target * 100)}%</b><i><em style="width:${Math.min(100, goal.current / goal.target * 100)}%"></em></i></button>`).join("")}<button class="text-button" data-add-goal type="button">+ Add savings goal</button></article></section><section class="system-split capital-lists"><div class="collection-panel"><div class="panel-heading"><div><p class="kicker">LEDGER</p><h2>Recent transactions</h2></div><button class="text-button" data-add-transaction type="button">+ Add transaction</button></div>${systemData.transactions.map(item => `<button class="system-data-row" data-transaction-record="${item.id}" type="button"><span class="transaction-icon">${item.amount > 0 ? "↗" : "↘"}</span><span><strong>${escapeHtml(item.name)}</strong><small>${niceSystemDate(item.date)} · ${escapeHtml(item.category)}</small></span><strong class="${item.amount > 0 ? "positive-copy" : ""}">${item.amount > 0 ? "+" : ""}${systemMoney(item.amount)}</strong><b>›</b></button>`).join("")}</div><aside class="collection-panel"><div class="panel-heading"><div><p class="kicker">RECURRING</p><h2>Subscriptions</h2></div><button class="text-button" data-add-subscription type="button">+ Add</button></div>${systemData.subscriptions.map(item => `<button class="subscription-record" data-subscription-record="${item.id}" type="button"><span><strong>${escapeHtml(item.name)}</strong><small>Renews on day ${item.due} · ${escapeHtml(item.category)}</small></span><b>${systemMoney(item.amount)}</b></button>`).join("")}</aside></section>`;
  root.querySelector("[data-add-transaction]").addEventListener("click", () => transactionRecordForm()); root.querySelectorAll("[data-transaction-record]").forEach(button => button.addEventListener("click", () => transactionRecordForm(button.dataset.transactionRecord)));
  root.querySelector("[data-add-subscription]").addEventListener("click", () => subscriptionRecordForm()); root.querySelectorAll("[data-subscription-record]").forEach(button => button.addEventListener("click", () => subscriptionRecordForm(button.dataset.subscriptionRecord)));
  root.querySelector("[data-add-goal]").addEventListener("click", () => goalRecordForm()); root.querySelectorAll("[data-goal-record]").forEach(button => button.addEventListener("click", () => goalRecordForm(button.dataset.goalRecord)));
}

function transactionRecordForm(id = null) { const record = systemData.transactions.find(item => item.id === id) || { date: systemToday, name: "", category: "", amount: "", type: "expense" }; openAcademicForm(id ? "Edit transaction" : "Add transaction", "CAPITAL RECORD", `<label>Description<input name="name" required value="${escapeHtml(record.name)}"></label><div class="form-row"><label>Date<input name="date" type="date" value="${record.date}" required></label><label>Type<select name="type"><option ${record.type === "expense" ? "selected" : ""}>expense</option><option ${record.type === "income" ? "selected" : ""}>income</option></select></label></div><div class="form-row"><label>Category<input name="category" required value="${escapeHtml(record.category)}"></label><label>Amount<input name="amount" type="number" min="0" step=".01" required value="${Math.abs(record.amount)}"></label></div>`, data => { const next = { id: id || systemId("t"), name: data.get("name").trim(), date: data.get("date"), type: data.get("type"), category: data.get("category").trim(), amount: Math.abs(Number(data.get("amount"))) * (data.get("type") === "expense" ? -1 : 1) }; if (id) Object.assign(record, next); else systemData.transactions.unshift(next); saveSystemData(); renderCapitalDashboard(); showToast(id ? "Transaction updated." : "Transaction added."); }, id ? () => { systemData.transactions = systemData.transactions.filter(item => item.id !== id); saveSystemData(); renderCapitalDashboard(); showToast("Transaction deleted."); } : null); }
function subscriptionRecordForm(id = null) { const record = systemData.subscriptions.find(item => item.id === id) || { name: "", amount: "", due: 1, category: "" }; openAcademicForm(id ? "Edit subscription" : "Add subscription", "RECURRING COST", `<label>Name<input name="name" required value="${escapeHtml(record.name)}"></label><div class="form-row"><label>Monthly amount<input name="amount" type="number" min="0" step=".01" value="${record.amount}" required></label><label>Billing day<input name="due" type="number" min="1" max="31" value="${record.due}" required></label></div><label>Category<input name="category" value="${escapeHtml(record.category)}"></label>`, data => { const next = { id: id || systemId("s"), name: data.get("name").trim(), amount: Number(data.get("amount")), due: Number(data.get("due")), category: data.get("category").trim() }; if (id) Object.assign(record, next); else systemData.subscriptions.push(next); saveSystemData(); renderCapitalDashboard(); showToast("Subscription saved."); }, id ? () => { systemData.subscriptions = systemData.subscriptions.filter(item => item.id !== id); saveSystemData(); renderCapitalDashboard(); showToast("Subscription deleted."); } : null); }
function goalRecordForm(id = null) { const record = systemData.goals.find(item => item.id === id) || { name: "", current: 0, target: "" }; openAcademicForm(id ? "Edit savings goal" : "Add savings goal", "CAPITAL GOAL", `<label>Goal<input name="name" required value="${escapeHtml(record.name)}"></label><div class="form-row"><label>Saved<input name="current" type="number" min="0" value="${record.current}" required></label><label>Target<input name="target" type="number" min="1" value="${record.target}" required></label></div>`, data => { const next = { id: id || systemId("g"), name: data.get("name").trim(), current: Number(data.get("current")), target: Number(data.get("target")) }; if (id) Object.assign(record, next); else systemData.goals.push(next); saveSystemData(); renderCapitalDashboard(); showToast("Savings goal saved."); }, id ? () => { systemData.goals = systemData.goals.filter(item => item.id !== id); saveSystemData(); renderCapitalDashboard(); showToast("Savings goal deleted."); } : null); }

function renderSystemView(view) {
  if (view === "networking") renderNetworkingDashboard();
  if (view === "calendar") renderCalendarDashboard();
  if (view === "mail") renderMailDashboard();
  if (view === "health") renderHealthDashboard();
  if (view === "capital") renderCapitalDashboard();
}

function openSystemPrimary(view) {
  if (view === "networking") contactRecordForm();
  if (view === "calendar") eventRecordForm();
  if (view === "mail") syncMail();
  if (view === "health") healthRecordForm();
  if (view === "capital") transactionRecordForm();
}

function linkedNotes(course, sourceId) {
  return course.notes.filter(note => note.sourceId === sourceId);
}

function renderCourseNav() {
  $("#courseList").innerHTML = courses.map(course => `
    <button class="course-item ${course.id === state.courseId && state.view === "workspace" ? "active" : ""}" data-course-id="${course.id}" type="button">
      <span class="course-swatch" style="background:${course.color}">${course.short}</span>
      <span class="course-copy">
        <strong>${escapeHtml(course.name)}</strong>
        <small>${escapeHtml(course.code)}</small>
      </span>
      <span class="course-progress"></span>
    </button>
  `).join("");

  $$(".course-item").forEach(button => {
    button.addEventListener("click", () => selectCourse(button.dataset.courseId));
  });
}

function courseLinkRate(course) {
  if (!course.sources.length) return 0;
  const linked = course.sources.filter(source => course.notes.some(note => note.sourceId === source.id)).length;
  return Math.round((linked / course.sources.length) * 100);
}

function renderAcademicDashboard() {
  const totalSources = courses.reduce((sum, course) => sum + course.sources.length, 0);
  const totalNotes = courses.reduce((sum, course) => sum + course.notes.length, 0);
  const activeCourses = courses.filter(course => course.term.toLowerCase().includes("active")).length;
  $("#academicOverview").innerHTML = [
    [courses.length, "Total classes", `${activeCourses} active this term`],
    [totalSources, "Course sources", "Across every class"],
    [totalNotes, "Connected notes", "Ready to review"]
  ].map(([value, label, detail]) => `<article class="academic-stat"><strong>${value}</strong><span>${label}</span><small>${detail}</small></article>`).join("");

  $("#academicCourseGrid").innerHTML = courses.length ? courses.map(course => {
    const linkRate = courseLinkRate(course);
    const verifyCount = course.sources.filter(source => source.status.toLowerCase().includes("needs")).length;
    return `<button class="academic-course-card" data-academic-course="${course.id}" type="button">
      <span class="academic-card-top"><span class="course-swatch academic-course-swatch" style="background:${course.color}">${course.short}</span><span class="academic-term">${escapeHtml(course.term)}</span></span>
      <span class="academic-card-copy"><small>${escapeHtml(course.code)}</small><strong>${escapeHtml(course.name)}</strong><span>${escapeHtml(course.subtitle)}</span></span>
      <span class="academic-progress-row"><span><i style="width:${linkRate}%"></i></span><b>${linkRate}% linked</b></span>
      <span class="academic-card-footer"><span>${course.sources.length} sources</span><span>${course.notes.length} notes</span><span>${verifyCount} to verify</span><b>Open class →</b></span>
    </button>`;
  }).join("") : `<div class="empty-list">No classes yet. Add your first course to begin.</div>`;
  $$('[data-academic-course]').forEach(button => button.addEventListener("click", () => selectCourse(button.dataset.academicCourse)));
}

function mixHex(color, target, amount) {
  const read = value => value.replace("#", "").match(/.{2}/g).map(part => parseInt(part, 16));
  const [r, g, b] = read(color);
  const [tr, tg, tb] = read(target);
  return `#${[r, g, b].map((value, index) => Math.round(value + ([tr, tg, tb][index] - value) * amount).toString(16).padStart(2, "0")).join("")}`;
}

function applyTheme() {
  const root = document.documentElement;
  const accentRgb = themePreferences.accent.replace("#", "").match(/.{2}/g).map(part => parseInt(part, 16)).join(", ");
  const sidebarRgb = themePreferences.sidebar.replace("#", "").match(/.{2}/g).map(part => parseInt(part, 16)).join(", ");
  root.style.setProperty("--green", themePreferences.accent);
  root.style.setProperty("--green-dark", mixHex(themePreferences.accent, "#000000", 0.28));
  root.style.setProperty("--green-soft", mixHex(themePreferences.accent, "#ffffff", 0.86));
  root.style.setProperty("--accent-rgb", accentRgb);
  root.style.setProperty("--paper", themePreferences.paper);
  root.style.setProperty("--surface-2", mixHex(themePreferences.paper, "#000000", 0.035));
  root.style.setProperty("--sidebar-bg", themePreferences.sidebar);
  root.style.setProperty("--sidebar-rgb", sidebarRgb);
  root.style.setProperty("--theme-deep-1", mixHex(themePreferences.sidebar, themePreferences.accent, 0.2));
  root.style.setProperty("--theme-deep-2", mixHex(themePreferences.sidebar, "#000000", 0.12));
  document.querySelector('meta[name="theme-color"]').setAttribute("content", themePreferences.sidebar);
}

function applyTabPreferences() {
  $$('[data-configurable-tab]').forEach(button => {
    button.hidden = tabPreferences[button.dataset.configurableTab] === false;
  });
}

function renderSettings() {
  $("#tabSettingList").innerHTML = Object.entries(tabLabels).map(([id, label]) => `<label class="tab-setting-row"><span><strong>${label}</strong><small>${id === "academic" ? "Classes and course workspaces" : `Show ${label.toLowerCase()} in navigation`}</small></span><input type="checkbox" data-tab-toggle="${id}" ${tabPreferences[id] !== false ? "checked" : ""}><i aria-hidden="true"></i></label>`).join("");
  $("#themePresets").innerHTML = Object.entries(themePresets).map(([id, theme]) => `<button class="theme-preset ${themePreferences.name === theme.name ? "active" : ""}" data-theme-preset="${id}" type="button"><span><i style="background:${theme.sidebar}"></i><i style="background:${theme.accent}"></i><i style="background:${theme.paper}"></i></span><strong>${theme.name}</strong></button>`).join("");
  $("#themeAccent").value = themePreferences.accent;
  $("#themePaper").value = themePreferences.paper;
  $("#themeSidebar").value = themePreferences.sidebar;
  renderConnections();

  $$('[data-tab-toggle]').forEach(input => input.addEventListener("change", () => {
    tabPreferences[input.dataset.tabToggle] = input.checked;
    localStorage.setItem("aetherVisibleTabs", JSON.stringify(tabPreferences));
    applyTabPreferences();
    showToast(`${tabLabels[input.dataset.tabToggle]} ${input.checked ? "shown" : "hidden"}.`);
  }));
  $$('[data-theme-preset]').forEach(button => button.addEventListener("click", () => {
    themePreferences = { ...themePresets[button.dataset.themePreset] };
    localStorage.setItem("aetherTheme", JSON.stringify(themePreferences));
    applyTheme();
    renderSettings();
    showToast("Theme updated.");
  }));
}

function updateCustomTheme() {
  themePreferences = { name: "Custom", accent: $("#themeAccent").value, paper: $("#themePaper").value, sidebar: $("#themeSidebar").value };
  localStorage.setItem("aetherTheme", JSON.stringify(themePreferences));
  applyTheme();
  $$('[data-theme-preset]').forEach(button => button.classList.remove("active"));
}

function renderHero() {
  const course = currentCourse();
  $("#courseIcon").textContent = course.short;
  $("#courseIcon").style.background = course.color;
  $("#courseTitle").textContent = course.name;
  $("#courseTerm").textContent = course.term;
  $("#courseSubtitle").textContent = `${course.code} · ${course.subtitle}`;
  $("#breadcrumbCourse").textContent = course.code;
  $("#heroStats").innerHTML = [
    [course.sources.length, "Sources"],
    [course.notes.length, "Notes"],
    [course.sources.filter(source => source.status.toLowerCase().includes("needs")).length, "To verify"]
  ].map(([value, label]) => `<div class="stat-card"><strong>${value}</strong><span>${label}</span></div>`).join("");
}

function renderSources() {
  const course = currentCourse();
  const sources = course.sources.filter(source => state.sourceFilter === "all" || source.type === state.sourceFilter);
  $("#sourceList").innerHTML = sources.length ? sources.map(source => `
    <button class="source-card ${source.id === state.selectedSourceId ? "selected" : ""}" data-source-id="${source.id}" type="button">
      <span class="source-type-icon ${source.type}">${sourceIcon(source.type)}</span>
      <span class="source-copy">
        <strong>${escapeHtml(source.title)}</strong>
        <small>${escapeHtml(source.author)} · ${escapeHtml(source.added)}</small>
      </span>
      <span class="source-link-count">${linkedNotes(course, source.id).length}</span>
    </button>
  `).join("") : `<div class="empty-list">No sources match this filter.</div>`;

  $$(".source-card").forEach(button => {
    button.addEventListener("click", () => selectSource(button.dataset.sourceId));
  });
}

function renderNotes() {
  const course = currentCourse();
  let notes = [...course.notes];
  if (state.noteView === "linked") notes = notes.filter(note => note.sourceId);
  $("#noteList").innerHTML = notes.length ? notes.map(note => {
    const source = course.sources.find(item => item.id === note.sourceId);
    return `
      <button class="note-card" data-note-id="${note.id}" type="button">
        <span class="note-copy">
          <strong>${escapeHtml(note.title)}</strong>
          <p>${escapeHtml(note.body)}</p>
        </span>
        <span class="note-meta">
          <span class="note-tags">${note.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</span>
          <span class="${source ? "linked-indicator" : ""}">${source ? "↗ " + escapeHtml(source.title) : escapeHtml(note.date)}</span>
        </span>
      </button>
    `;
  }).join("") : `<div class="empty-list">No connected notes yet.</div>`;

  $$(".note-card").forEach(button => {
    button.addEventListener("click", () => {
      const note = course.notes.find(item => item.id === button.dataset.noteId);
      if (note) noteForm(note.id);
    });
  });
}

function selectSource(sourceId) {
  const course = currentCourse();
  const source = course.sources.find(item => item.id === sourceId);
  if (!source) return;
  state.selectedSourceId = source.id;
  renderSources();

  const notes = linkedNotes(course, source.id);
  $("#contextEmpty").hidden = true;
  $("#contextContent").hidden = false;
  $("#contextContent").innerHTML = `
    <span class="context-source-badge">${typeLabel(source.type)} · ${escapeHtml(source.status)}</span>
    <h3>${escapeHtml(source.title)}</h3>
    <p class="context-byline">${escapeHtml(source.author)} · ${escapeHtml(source.year)}</p>
    <div class="context-section">
      <h4>Why it matters</h4>
      <p>${escapeHtml(source.summary)}</p>
    </div>
    <div class="context-section">
      <h4>Citation record</h4>
      <div class="citation-box">
        <p>${escapeHtml(source.citation)}</p>
        <button class="copy-button" id="copyCitation" type="button">Copy citation</button>
      </div>
    </div>
    <div class="context-section">
      <h4>Connected notes · ${notes.length}</h4>
      ${notes.length ? notes.map(note => `<div class="linked-note-mini">${escapeHtml(note.title)}</div>`).join("") : `<p>No notes linked yet.</p>`}
    </div>
    <div class="context-record-actions">
      <button class="button secondary" id="editSource" type="button">Edit source</button>
      <button class="button danger" id="deleteSource" type="button">Delete</button>
    </div>
  `;

  $("#copyCitation").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(source.citation);
      showToast("Citation copied.");
    } catch {
      showToast("Select and copy the citation manually.");
    }
  });
  $("#editSource").addEventListener("click", () => sourceForm(source.id));
  $("#deleteSource").addEventListener("click", () => sourceForm(source.id));
}

function clearContext() {
  state.selectedSourceId = null;
  $("#contextEmpty").hidden = false;
  $("#contextContent").hidden = true;
  renderSources();
}

function selectCourse(courseId, sourceId = null) {
  if (!courses.some(course => course.id === courseId)) return;
  state.courseId = courseId;
  state.sourceFilter = "all";
  state.selectedSourceId = null;
  localStorage.setItem("academicOsCourse", courseId);
  switchView("workspace");
  $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.sourceFilter === "all"));
  renderWorkspace();
  closeSidebar();
  if (sourceId) selectSource(sourceId);
}

function renderWorkspace() {
  renderCourseNav();
  renderHero();
  renderSources();
  renderNotes();
  clearContext();
  updateCaptureSources();
}

function renderHome() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const dateLabel = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const todayEvents = systemData.events.filter(event => event.date === systemToday).sort((a, b) => a.start.localeCompare(b.start));
  const nextEvent = todayEvents.find(event => event.end >= now.toTimeString().slice(0, 5)) || todayEvents[0];
  const latestHealth = systemData.health[0] || { recovery: 0, sleep: 0, workout: "No performance log" };
  const toMinutes = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
  const formatTime = value => {
    const [hours, minutes] = value.split(":").map(Number);
    return `${hours % 12 || 12}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""} ${hours >= 12 ? "PM" : "AM"}`;
  };
  const scheduledMinutes = todayEvents.reduce((total, event) => total + Math.max(0, toMinutes(event.end) - toMinutes(event.start)), 0);
  const filteredDayEvents = todayEvents.filter(event => {
    const startHour = Number(event.start.slice(0, 2));
    if (homeDayPeriod === "morning") return startHour < 12;
    if (homeDayPeriod === "afternoon") return startHour >= 12 && startHour < 17;
    if (homeDayPeriod === "evening") return startHour >= 17;
    return true;
  });

  $("#homeDate").textContent = dateLabel;
  $("#homeTitle").textContent = `${greeting}, Blake.`;
  $("#homeFocusStatus").innerHTML = `<i></i>${todayEvents.length ? `${todayEvents.length} scheduled` : "Focused"}`;
  $("#homePriorityList").innerHTML = todayEvents.length ? todayEvents.slice(0, 3).map((event, index) => `
    <button class="priority-item" data-home-event="${event.id}" type="button">
      <span class="priority-time">${event.start}</span>
      <span class="priority-copy"><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.source)} · ${escapeHtml(event.zone)} · ${escapeHtml(event.priority)} priority</small></span>
      <span class="priority-arrow">→</span>
    </button>
  `).join("") : `
    <button class="priority-item" data-home-course="finance" type="button"><span class="priority-time">01</span><span class="priority-copy"><strong>Review multiple cash flows</strong><small>Finance · linked to Lecture 3</small></span><span class="priority-arrow">→</span></button>
    <button class="priority-item" data-home-course="history" type="button"><span class="priority-time">02</span><span class="priority-copy"><strong>Strengthen discussion argument</strong><small>Revolutionary America · connected notes</small></span><span class="priority-arrow">→</span></button>`;
  $("#homeHourlyTimeline").innerHTML = Array.from({ length: 13 }, (_, index) => index + 8).map(slotHour => {
    const slotEvents = todayEvents.filter(event => Number(event.start.slice(0, 2)) === slotHour);
    const hourLabel = `${slotHour % 12 || 12} ${slotHour >= 12 ? "PM" : "AM"}`;
    return `<div class="hour-row ${slotHour === hour ? "current" : ""}"><time>${hourLabel}</time><div>${slotEvents.map(event => `<button data-home-event="${event.id}" type="button"><strong>${escapeHtml(event.title)}</strong><small>${formatTime(event.start)}–${formatTime(event.end)} · ${escapeHtml(event.source)}</small></button>`).join("") || `<span class="hour-open">Open</span>`}</div></div>`;
  }).join("");
  $("#homeDayStatus").textContent = latestHealth.recovery < 65 ? "Recovery watch" : "Schedule aligned";
  $("#homeDayCount").textContent = String(todayEvents.length).padStart(2, "0");
  $("#homeDayTitle").textContent = todayEvents.length ? `${todayEvents.length} commitments · ${Math.round(scheduledMinutes / 6) / 10} hours scheduled` : "Your day is open to shape.";
  $("#homeDaySummary").textContent = nextEvent ? `Next: ${nextEvent.title} at ${formatTime(nextEvent.start)}. Recovery score: ${latestHealth.recovery}/100.` : `No calendar blocks yet. Recovery score: ${latestHealth.recovery}/100.`;
  $$('[data-home-period]').forEach(button => button.classList.toggle("active", button.dataset.homePeriod === homeDayPeriod));
  $("#homeDayList").innerHTML = filteredDayEvents.map(event => `<button class="day-plan-event" data-home-event="${event.id}" type="button"><time>${formatTime(event.start)}</time><span><strong>${escapeHtml(event.title)}</strong><small>${escapeHtml(event.source)} · ${escapeHtml(event.zone)}</small></span><b>Open →</b></button>`).join("") || `<div class="day-plan-empty-state"><strong>No ${homeDayPeriod === "all" ? "" : `${homeDayPeriod} `}blocks yet.</strong><span>Use “Add block” to reserve time on your calendar.</span></div>`;
  renderHomeMailWidgets();

  $$('[data-home-event]').forEach(button => button.addEventListener("click", () => {
    switchView("calendar");
    eventRecordForm(button.dataset.homeEvent);
  }));
  $$('[data-home-course]').forEach(button => button.addEventListener("click", () => selectCourse(button.dataset.homeCourse)));
}

function switchView(view) {
  state.view = view;
  $$(".view").forEach(panel => panel.classList.remove("active-view"));
  const target = $(`#${view}View`);
  if (!target) return;
  target.classList.add("active-view");
  $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === view || (view === "workspace" && button.dataset.view === "academic")));
  const breadcrumbs = {
    home: ["Second Brain", "Home"],
    academic: ["Academic", "Classes"],
    workspace: ["Academic", currentCourse().code],
    networking: ["Second Brain", "Networking"],
    calendar: ["Second Brain", "Calendar"],
    mail: ["Second Brain", "Mail"],
    health: ["Second Brain", "Health & performance"],
    capital: ["Second Brain", "Capital"],
    settings: ["Second Brain", "Settings"]
  };
  const [root, detail] = breadcrumbs[view];
  $("#breadcrumbRoot").textContent = root;
  $("#breadcrumbCourse").textContent = detail;
  const primaryLabels = { home: "Quick capture", networking: "Add contact", calendar: "Add event", health: "Log metrics", capital: "Add transaction" };
  $("#openCapture").innerHTML = `<span aria-hidden="true">+</span> ${primaryLabels[view] || "New note"}`;
  $(".topbar-actions").classList.toggle("home-hidden", view === "home" || view === "mail");
  renderCourseNav();
  if (view === "home") renderHome();
  if (view === "academic") renderAcademicDashboard();
  if (view === "settings") renderSettings();
  renderSystemView(view);
  history.replaceState(null, "", ["academic", "networking", "calendar", "mail", "health", "capital", "settings"].includes(view) ? `#${view}` : location.pathname);
  closeSidebar();
}

function renderConnections() {
  const googleConnected = systemData.mail.connection.connected;
  $("#connectionGrid").innerHTML = integrations.map(item => {
    const isGoogle = item.name === "Google Mail & Calendar";
    const action = isGoogle
      ? googleConnected
        ? `<span class="status-pill">Connected</span>`
        : `<button class="button secondary" data-google-connect type="button">Connect Google</button>`
      : `<span class="status-pill">Not connected</span>`;
    return `
    <article class="connection-card">
      <div class="connection-logo" style="background:${item.color}">${item.short}</div>
      <div>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <span class="connection-map">${escapeHtml(item.map)}</span>
      </div>
      ${action}
    </article>
  `; }).join("");
  $("[data-google-connect]")?.addEventListener("click", connectMail);
}

function updateCaptureSources() {
  const courseId = $("#noteCourseInput").value || state.courseId;
  const course = courses.find(item => item.id === courseId) || currentCourse();
  $("#noteSourceInput").innerHTML = `<option value="">No linked source</option>` + course.sources.map(source => `<option value="${source.id}">${escapeHtml(source.title)}</option>`).join("");
}

function setupCapture() {
  $("#noteCourseInput").innerHTML = courses.map(course => `<option value="${course.id}">${escapeHtml(course.code)} · ${escapeHtml(course.name)}</option>`).join("");
  $("#noteCourseInput").addEventListener("change", updateCaptureSources);
  $("#openCapture").addEventListener("click", () => {
    if (["networking", "calendar", "mail", "health", "capital"].includes(state.view)) {
      openSystemPrimary(state.view);
      return;
    }
    $("#noteCourseInput").value = state.courseId;
    updateCaptureSources();
    $("#captureModal").showModal();
    requestAnimationFrame(() => $("#noteTitleInput").focus());
  });
  $("#cancelCapture").addEventListener("click", () => $("#captureModal").close());
  $("#captureForm").addEventListener("submit", event => {
    event.preventDefault();
    const courseId = $("#noteCourseInput").value;
    const course = courses.find(item => item.id === courseId);
    if (!course) return;
    const note = {
      id: `user-${Date.now()}`,
      courseId,
      title: $("#noteTitleInput").value.trim(),
      body: $("#noteBodyInput").value.trim(),
      sourceId: $("#noteSourceInput").value || null,
      tags: ["My note"],
      date: "Just now"
    };
    if (!note.title || !note.body) return;
    course.notes.unshift(note);
    const stored = JSON.parse(localStorage.getItem("academicOsNotes") || "[]");
    stored.unshift(note);
    localStorage.setItem("academicOsNotes", JSON.stringify(stored));
    persistAcademicData();
    $("#captureForm").reset();
    $("#captureModal").close();
    selectCourse(courseId, note.sourceId);
    showToast("Note saved and connected.");
  });
}

function searchableItems(query = "") {
  const normalized = query.trim().toLowerCase();
  const items = [];
  courses.forEach(course => {
    items.push({ type: "Course", icon: course.short, title: course.name, subtitle: course.code, courseId: course.id });
    course.sources.forEach(source => items.push({ type: typeLabel(source.type), icon: sourceIcon(source.type), title: source.title, subtitle: `${course.code} · ${source.author}`, courseId: course.id, sourceId: source.id }));
    course.notes.forEach(note => items.push({ type: "Note", icon: "N", title: note.title, subtitle: `${course.code} · ${note.body}`, courseId: course.id, sourceId: note.sourceId }));
  });
  systemData.contacts.filter(contact => contact.id !== "c1").forEach(contact => items.push({ type: "Contact", icon: systemInitials(contact.name), title: contact.name, subtitle: `${contact.role} · ${contact.org}`, systemView: "networking", recordId: contact.id }));
  systemData.events.forEach(event => items.push({ type: "Event", icon: "▦", title: event.title, subtitle: `${niceSystemDate(event.date)} · ${event.start}`, systemView: "calendar", recordId: event.id }));
  systemData.mail.messages.forEach(message => items.push({ type: "Mail", icon: "✉", title: message.subject, subtitle: `${senderName(message.sender)} · ${message.category || classifyMail(message)}`, systemView: "mail", recordId: message.id }));
  systemData.health.forEach(record => items.push({ type: "Health", icon: "H", title: record.workout, subtitle: `Recovery ${record.recovery} · ${niceSystemDate(record.date)}`, systemView: "health", recordId: record.id }));
  systemData.transactions.forEach(record => items.push({ type: "Capital", icon: "$", title: record.name, subtitle: `${systemMoney(record.amount)} · ${record.category}`, systemView: "capital", recordId: record.id }));
  if (!normalized) return items.slice(0, 8);
  return items.filter(item => `${item.title} ${item.subtitle} ${item.type}`.toLowerCase().includes(normalized)).slice(0, 14);
}

function renderSearch(query = "") {
  state.searchItems = searchableItems(query);
  state.searchIndex = Math.min(state.searchIndex, Math.max(0, state.searchItems.length - 1));
  $("#searchResults").innerHTML = state.searchItems.length ? `
    <div class="search-group-label">${query ? "Results" : "Quick access"}</div>
    ${state.searchItems.map((item, index) => `
      <button class="search-result ${index === state.searchIndex ? "active" : ""}" data-search-index="${index}" type="button">
        <span class="search-result-icon">${item.icon}</span>
        <span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.subtitle)}</small></span>
        <span class="search-result-type">${escapeHtml(item.type)}</span>
      </button>
    `).join("")}
  ` : `<div class="empty-list">No matching records.</div>`;

  $$(".search-result").forEach(button => button.addEventListener("click", () => openSearchItem(Number(button.dataset.searchIndex))));
}

function openSearchItem(index) {
  const item = state.searchItems[index];
  if (!item) return;
  $("#searchModal").close();
  if (item.systemView) {
    if (item.systemView === "networking") selectedSystemContact = item.recordId;
    if (item.systemView === "mail") mailSelectedId = item.recordId;
    switchView(item.systemView);
    if (item.systemView === "calendar") eventRecordForm(item.recordId);
    if (item.systemView === "health") healthRecordForm(item.recordId);
    if (item.systemView === "capital") transactionRecordForm(item.recordId);
    return;
  }
  selectCourse(item.courseId, item.sourceId || null);
}

function openSearch() {
  state.searchIndex = 0;
  $("#globalSearchInput").value = "";
  renderSearch();
  $("#searchModal").showModal();
  requestAnimationFrame(() => $("#globalSearchInput").focus());
}

function setupSearch() {
  $("#openSearch").addEventListener("click", openSearch);
  $("#globalSearchInput").addEventListener("input", event => {
    state.searchIndex = 0;
    renderSearch(event.target.value);
  });
  $("#globalSearchInput").addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      state.searchIndex = Math.min(state.searchIndex + 1, state.searchItems.length - 1);
      renderSearch(event.currentTarget.value);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      state.searchIndex = Math.max(state.searchIndex - 1, 0);
      renderSearch(event.currentTarget.value);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      openSearchItem(state.searchIndex);
    }
  });
  document.addEventListener("keydown", event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (!$("#searchModal").open) openSearch();
    }
  });
}

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function openSidebar() {
  $(".sidebar").classList.add("open");
  $("#sidebarScrim").classList.add("open");
}

function closeSidebar() {
  $(".sidebar").classList.remove("open");
  $("#sidebarScrim").classList.remove("open");
}

function setupEvents() {
  $$("button.nav-item[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));
  $$(".filter-chip").forEach(button => button.addEventListener("click", () => {
    state.sourceFilter = button.dataset.sourceFilter;
    $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    renderSources();
  }));
  $$(".segment").forEach(button => button.addEventListener("click", () => {
    state.noteView = button.dataset.noteView;
    $$(".segment").forEach(segment => segment.classList.toggle("active", segment === button));
    renderNotes();
  }));
  $("#closeContext").addEventListener("click", clearContext);
  $("#openConnections").addEventListener("click", () => switchView("settings"));
  $("#addCourse").addEventListener("click", () => courseForm());
  $("#academicAddCourse").addEventListener("click", () => courseForm());
  $("#editCourse").addEventListener("click", () => courseForm(state.courseId));
  $("#backToAcademic").addEventListener("click", () => switchView("academic"));
  $("#addSource").addEventListener("click", () => sourceForm());
  $("#homeAddBlock").addEventListener("click", () => eventRecordForm(null, systemToday));
  $$('[data-home-period]').forEach(button => button.addEventListener("click", () => {
    homeDayPeriod = button.dataset.homePeriod;
    renderHome();
  }));
  ["themeAccent", "themePaper", "themeSidebar"].forEach(id => $("#" + id).addEventListener("input", updateCustomTheme));
  $("#resetTheme").addEventListener("click", () => {
    themePreferences = { ...themePresets.forest };
    localStorage.setItem("aetherTheme", JSON.stringify(themePreferences));
    applyTheme();
    renderSettings();
    showToast("Original theme restored.");
  });
  $$('[data-home-target]').forEach(button => button.addEventListener("click", () => {
    switchView(button.dataset.homeTarget);
  }));
  $$('[data-home-course]').forEach(button => button.addEventListener("click", () => selectCourse(button.dataset.homeCourse)));
  $("#profileButton").addEventListener("click", () => showToast("This private prototype stores changes in your browser."));
  $("#openSidebar").addEventListener("click", openSidebar);
  $("#closeSidebar").addEventListener("click", closeSidebar);
  $("#sidebarScrim").addEventListener("click", closeSidebar);
}

function init() {
  applyTheme();
  applyTabPreferences();
  setupCapture();
  setupSearch();
  setupEvents();
  renderWorkspace();
  renderAcademicDashboard();
  renderConnections();
  renderHome();
  const requestedView = location.hash.slice(1);
  refreshMailSuggestions();
  switchView(["academic", "networking", "calendar", "mail", "health", "capital", "settings"].includes(requestedView) ? requestedView : "home");
}

init();
