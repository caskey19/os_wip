# BRAIN OS — Data Schemas

The working prototype stores the following aggregate as JSON under `brain-os-v3`. Production tables should use UUIDs, `created_at`, `updated_at`, `revision`, `source`, `external_id`, `manual_fields[]`, and `deleted_at` on every syncable record.

## TypeScript domain model

```ts
type Source = "Manual" | "Academic" | "Athletics" | "Health" | "Networking" | "MCP" | string;

interface Contact {
  id: string;
  name: string;
  role: string;
  org: string;
  influence: 1 | 2 | 3 | 4 | 5;
  email?: string;
  notes?: string;
  tags: string[];
  x: number;
  y: number;
  logs: Interaction[];
}

interface ContactEdge {
  id: string;
  fromContactId: string;
  toContactId: string;
  kind: "direct" | "mutual" | "reports_to" | "introduced_by";
  strength?: number;
  source: Source;
}

interface Interaction {
  id?: string;
  contactId?: string;
  date: string;
  type: "Email" | "Call" | "Coffee chat" | "Meeting" | "Message" | string;
  note: string;
  externalMessageIds?: string[];
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;            // YYYY-MM-DD in the workspace timezone
  start: string;           // HH:mm
  end: string;
  source: Source;
  priority: "high" | "medium" | "low";
  zone: "Deep work" | "Training" | "Relationships" | "Recovery" | "Flexible";
  notes?: string;
  externalId?: string;
  manualFields?: string[];
  syncTombstone?: boolean;
  taskId?: string;         // optional Tasks projection link
}

interface StudentTask {
  id: string;
  title: string;
  course: string;          // course code or life area
  category: "Assignment" | "Reading" | "Exam" | "Quiz" | "Project" | "Career" | "Personal";
  due: string;             // YYYY-MM-DD in the workspace timezone
  time: string;            // HH:mm
  priority: "high" | "medium" | "low";
  status: "todo" | "in-progress" | "done";
  notes?: string;
}

interface HealthSnapshot {
  id: string;
  date: string;
  recovery: number;        // 0–100 normalized score
  exertion: number;        // 0–10 normalized score
  load: number;            // arbitrary units, provider-normalized
  sleep: number;           // hours
  hr: number;              // resting bpm
  workout: string;
  provider: "Manual" | "Garmin" | "Strava" | "Fitbit" | "Apple Health";
}

interface Transaction {
  id: string;
  date: string;
  name: string;
  category: string;
  amount: number;          // income positive, expense negative
  type: "income" | "expense";
}

interface Subscription {
  id: string;
  name: string;
  amount: number;
  due: number;             // day of month
  category: string;
}

interface SavingsGoal {
  id: string;
  name: string;
  current: number;
  target: number;
}

interface MailPreferences {
  userId: string;
  focus: "academic" | "career" | "athletics" | "balanced";
  urgencyWindow: "24" | "48" | "168";
  newsletters: "digest" | "inbox" | "hide";
  replyTone: "concise" | "warm" | "formal";
  calendarMode: "semi" | "auto";
  onboarded: boolean;
}

interface MailEventSuggestion {
  id: string;
  mailMessageId: string;
  subject: string;
  sender: string;
  title: string;
  date: string;
  start: string;
  end: string;
  priority: "high" | "medium" | "low";
  zone: CalendarEvent["zone"];
  confidence: number;
  status: "pending" | "approved" | "dismissed";
  googleEventId?: string;
}
```

## Cross-module event envelope

```json
{
  "eventId": "uuid",
  "eventType": "health.recovery.low",
  "occurredAt": "2026-09-14T11:00:00Z",
  "producer": "health-service",
  "subjectId": "health-snapshot-id",
  "idempotencyKey": "garmin:daily-summary:2026-09-14:r4",
  "schemaVersion": 1,
  "payload": {},
  "trace": { "correlationId": "uuid", "actor": "provider|user|agent" }
}
```

## Recommended database boundaries

- `people`: contacts, organizations, contact_edges, interactions, reminders.
- `time`: calendar_events, student_tasks, task_event_links, provider_event_links, event_tombstones, schedule_suggestions, mail_event_suggestions.
- `mail`: mail_preferences, mailbox_cursors, message_insights, reply_drafts. Raw message bodies should remain in Gmail unless a user explicitly retains them.
- `performance`: health_snapshots, workouts, provider_samples, readiness_scores.
- `platform`: integrations, sync_runs, webhook_receipts, audit_log, outbox_events.

The outbox pattern commits a domain mutation and its outbound event atomically. Consumers store processed idempotency keys so retries remain safe.
