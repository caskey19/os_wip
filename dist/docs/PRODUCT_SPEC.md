# BRAIN OS — Connected Student System Product Specification

## Product principles

1. **Human authority is permanent.** Automated records are never locked. Every contact, event, metric log, transaction, subscription, and goal can be added, edited, or deleted manually.
2. **Provenance is visible.** Records carry a source such as Manual, Academic, Athletics, Health, Networking, Garmin, or MCP. Edits preserve their original source while recording manual ownership in the production schema.
3. **One system, seven lenses.** Overview, Academic, Mail, Tasks, Networking, and Health publish domain events into a shared event bus; the Calendar is the temporal projection of that data.
4. **Automation proposes before it disrupts.** Low-risk inserts can occur automatically. Schedule-changing health recommendations require an explicit Apply action.
5. **Local-first prototype, server-ready architecture.** The working prototype uses browser storage, matching the Academic OS. Repository interfaces isolate persistence so it can move to D1/Postgres without rewriting views.

## Shared layout framework

- **Single-shell navigation:** Workspace, Research Library, Connections, Networking, Calendar, Health & Performance are peer views inside the same Academic OS page. There is no separate dashboards application; legacy `/brain/` links redirect into the unified Networking view.
- **Sidebar (265 px):** Academic OS identity, global command search, connected system routes, course list, local-save status, and private profile.
- **Top bar (66 px):** breadcrumb, Integration Center, contextual Add action.
- **Page header:** colored module mark, operational eyebrow, editorial title, single-sentence context, three live KPIs.
- **Primary workspace:** two-column desktop composition with the action surface on the left and decision/context surface on the right. At tablet widths the context surface stacks below; on mobile the sidebar becomes a horizontal module strip.
- **Reusable primitives:** `PageHeader`, `MetricCard`, `StatusLabel`, `RecordModal`, `DataRow`, `SourceBadge`, `ConfirmDelete`, `Toast`, and `EmptyState`. In the static implementation these are template functions and shared CSS classes; a React migration maps them one-to-one to components.

## Overview and Tasks expansion

The Overview is the cross-system command center. It derives upcoming calendar commitments, assignments due, readiness, net cash activity, and relationship gaps directly from module records; no duplicate summary records are stored.

Tasks & Assignments adds a general-purpose workflow for every kind of student obligation: assignments, readings, exams, quizzes, projects, career work, and personal tasks. Each task supports priority, status, course/area, due date/time, notes, inline completion, manual edit/delete, and an optional linked 60-minute Calendar block. The global search and WebMCP surface include tasks.

Workspace portability is built into the Integration & Data Center. A versioned JSON export includes every local module, and import validates the aggregate before restoring it.

## 1. Networking Dashboard

### User jobs

- Understand who is connected to whom and where warm paths exist.
- Inspect a person's organization, role, influence depth, notes, interactions, and mutual nodes.
- Log outreach and optionally turn it into a Calendar follow-up.
- Add, edit, and delete contacts even when they originated in a sync.

### Layout

1. Header KPIs: contact count, graph edges, follow-ups due.
2. Main left panel: SVG node graph over a subtle grid; organization and circle filters sit in the panel header.
3. Right detail inspector: identity, tags, notes, interaction history, mutual nodes, influence depth, Edit, Log interaction, Delete.
4. Contact editor: identity, organization, role, email, influence 1–5, tags, notes.

### Functional flow

1. Normalize provider profiles into `Contact` records.
2. Identity-resolve by provider ID, then normalized email; ambiguous matches enter a review queue.
3. Upsert the contact while preserving `manualFields`, fields the user has intentionally overridden.
4. Normalize mutual relationships and reporting lines into `ContactEdge` records.
5. Render graph positions from stored coordinates for the prototype; production uses a force layout whose settled positions are cached.
6. Clicking a node opens the inspector. Editing mutates the canonical record; deleting removes associated edges after confirmation.
7. Logging an interaction appends `Interaction`. If Follow up is checked, publish `networking.follow_up.requested`; the Calendar consumer creates an editable event.

### Component architecture

```text
NetworkingPage
├─ ModuleHeader
├─ RelationshipGraph
│  ├─ GraphToolbar
│  ├─ ContactNode[]
│  └─ RelationshipEdge[]
└─ ContactInspector
   ├─ ContactIdentity
   ├─ TagList
   ├─ NotesEditor
   ├─ InteractionTimeline
   └─ RecordActions
```

## 2. Calendar Dashboard

### User jobs

- Switch between 1-day, 3-day, week, and month views without changing context.
- Create an event by clicking an empty day/slot; open any event to edit or delete it.
- See why an event exists, how important it is, and what kind of time it occupies.
- Get a short daily brief and understand active automation sources.

### Layout

1. View toolbar with visible date range and four-state view switcher.
2. Day-based grid uses absolute event blocks between 7 AM and 5 PM; the month grid compresses records into short event chips.
3. Right column contains a dynamic daily brief and sync-health list.
4. The editor owns title, date, start/end, priority, source, zone, and notes.

### Functional flow

1. `CalendarProjection` subscribes to `academic.schedule.changed`, `athletics.schedule.changed`, `health.workout.logged`, and `networking.follow_up.requested`.
2. Each incoming event uses an idempotency key (`provider + externalId + revision`) to avoid duplicates.
3. Provider updates patch only provider-owned fields. A manually edited field is added to `manualFields` and is not overwritten by later syncs.
4. Deleting an automated event creates a tombstone so the next provider sync does not immediately recreate it.
5. The daily summary derives event count, scheduled minutes, high priorities, protected blocks, and recovery recommendations.
6. Conflicts are highlighted when intervals overlap; production logic offers the smallest feasible shift while respecting locked events.

### Component architecture

```text
CalendarPage
├─ ModuleHeader
├─ CalendarToolbar → ViewSwitcher
├─ CalendarSurface
│  ├─ DayColumn[] / MonthGrid
│  └─ EditableEventBlock[]
└─ CalendarContext
   ├─ DailyBrief
   └─ AutomationStatus[]
```

## 2A. Mail Dashboard

### User jobs

- See important academic and relationship messages before low-signal inbox traffic.
- Understand urgent actions and the day’s incoming mail without reading every thread.
- Generate an editable, context-aware reply and save it to Gmail drafts.
- Convert event-bearing messages into editable Calendar records with either explicit approval or automatic scheduling.

### Functional flow

1. Firebase Google authentication requests Gmail and Calendar scopes at connection time.
2. Gmail records normalize into minimal message view models, then AI triage applies user preferences or the default academic taxonomy.
3. Event extraction publishes idempotent `mail.calendar_event.detected` proposals keyed by Gmail message ID.
4. Semi-automatic mode leaves proposals in Calendar’s review queue; automatic mode writes them immediately while preserving manual editing.
5. Reply generation uses the authenticated AI function when configured and an on-device preference-aware fallback otherwise.

## 3. Health & Performance Dashboard

### User jobs

- Read today's recovery at a glance, then understand exertion, load, sleep, and heart-rate context.
- Record or correct wearable metrics and workouts.
- See connected-provider status.
- Apply a schedule adjustment on a low-recovery day.

### Layout

1. Large recovery ring anchors the metric matrix.
2. Four compact cards visualize exertion, seven-day training load, sleep, and heart rate.
3. Automated Coach alert spans the matrix and contains the Calendar action.
4. Performance history and provider status appear below.

### Functional flow

1. Provider adapters normalize daily summaries into `HealthSnapshot` and activities into `Workout`.
2. The readiness service weighs sleep duration/quality, resting-HR deviation, recent load, and provider recovery when available.
3. Default warning threshold is recovery below 65. Production thresholds become per-athlete rolling baselines.
4. A warning creates a non-destructive `ScheduleSuggestion` containing proposed event patches.
5. Apply Calendar Adjustment changes the lift to technique focus and creates a recovery reset. Both remain fully editable and deletable.
6. A manually logged workout can create an event immediately through `health.workout.logged`.

### Component architecture

```text
HealthPage
├─ ModuleHeader
├─ ReadinessGrid
│  ├─ RecoveryRing
│  ├─ ExertionMeter
│  ├─ TrainingLoadBars
│  ├─ SleepTrack
│  └─ HeartRateSparkline
├─ RecoveryAlert
├─ PerformanceLog
└─ ProviderStatus
```

## 4. Capital Dashboard (removed)

Capital has been removed from Aether.


### User jobs

- Understand monthly inflow, outflow, and net cash flow.
- Maintain transactions and categorize spending.
- Track recurring subscriptions and savings targets.
- Export the working ledger.

### Layout

1. Cash-flow card combines three totals with a cumulative bar visualization.
2. Spending-mix donut and category ledger show budget composition.
3. Recent transactions occupy the wide lower column.
4. Recurring costs and savings goals stack in the context column.

### Functional flow

1. Imported or manually entered records normalize into signed `Transaction.amount` values.
2. Cash flow derives `income = sum(amount > 0)`, `expenses = abs(sum(amount < 0))`, and `net = income - expenses`.
3. Recurring costs are modeled independently from settled transactions so upcoming obligations can be forecast.
4. Goal progress derives `current / target`, capped at 100% visually while retaining overfunded values.
5. Every row opens the same record editor and supports deletion. CSV export serializes the canonical ledger.

### Component architecture

```text
├─ ModuleHeader
├─ CashFlowCard
├─ SpendingMix
├─ TransactionLedger
├─ SubscriptionTracker
└─ SavingsGoals
```

## Delivery sequence for production hardening

1. Replace `LocalStorageRepository` with authenticated server repositories while retaining the same model interfaces.
2. Add a migration that imports the prototype's `brain-os-v3` JSON payload.
3. Move provider credentials and refresh tokens to encrypted server-side secrets.
4. Implement inbound provider jobs, idempotency, retries, and dead-letter review.
5. Add `manualFields`, revision numbers, tombstones, and audit history to synced tables.
6. Add role-based access and field-level privacy for health and financial records.
7. Add contract tests for adapters and focused interaction tests for create/edit/delete, calendar projection, and recovery adjustments.
