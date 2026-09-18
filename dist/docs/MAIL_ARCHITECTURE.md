# Mail and Calendar Automation Architecture

## Runtime flow

```text
Firebase Google sign-in
  ├─ Gmail API → normalize message → AI triage → Mail dashboard
  │                                      ├─ daily summary
  │                                      ├─ urgent actions
  │                                      ├─ reply draft → Gmail Drafts
  │                                      └─ event extraction
  └─ Firestore preferences                    ├─ Ask first → Calendar review queue
                                               └─ Automatic → Calendar event
                                                                └─ Google Calendar API
```

The current static application keeps its local-first repository for offline/demo behavior. Provider code is isolated in `mail-services.js`; UI and triage orchestration live in `mail-ui.js`. This boundary lets a production repository move derived mail records to Firestore or a server database without rewriting Calendar rendering.

## AI function contract

The optional `aiEndpoint` must verify the Firebase ID token from the `Authorization: Bearer <token>` header and accept either request:

```json
{
  "task": "triage",
  "messages": [{ "id": "...", "sender": "...", "subject": "...", "snippet": "...", "body": "...", "receivedAt": "..." }],
  "preferences": { "focus": "academic", "urgencyWindow": "48", "newsletters": "digest", "replyTone": "concise", "calendarMode": "semi" }
}
```

```json
{
  "task": "draft",
  "message": { "id": "...", "sender": "...", "subject": "...", "body": "..." },
  "preferences": { "replyTone": "warm" }
}
```

Triage responses may return `dailySummary` and message overrides keyed by `id`, including `category`, `urgency`, `summary`, and an optional `calendar` record. Draft responses return `{ "draft": "..." }`. The endpoint should redact logs, cap input size, and never retain message bodies by default.

## Durable production collections

- `users/{uid}/settings/mail`: onboarding answers and automation mode.
- `users/{uid}/mailInsights/{messageId}`: category, urgency, short summary, model/version, processed timestamp, and provider revision. No raw body by default.
- `users/{uid}/mailEventSuggestions/{suggestionId}`: parsed time fields, confidence, approval status, Gmail message ID, and Google event ID.
- `users/{uid}/mailSync/{mailbox}`: Gmail history cursor, last successful sync, retry state, and failure code.
- `users/{uid}/audit/{entryId}`: actor, action, source, timestamp, and before/after hashes for calendar writes and draft creation.

Production ingestion should use the Gmail History API plus an idempotent queue. The five-minute foreground refresh in the static client is an immediate working fallback, not a replacement for push notifications or a server-side mailbox worker.
