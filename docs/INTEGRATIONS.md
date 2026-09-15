# BRAIN OS — API and MCP Integration Blueprint

## Adapter contract

Every external system implements the same boundary:

```ts
interface ProviderAdapter<TCursor, TRaw> {
  provider: string;
  authorize(input: AuthorizationInput): Promise<ConnectionState>;
  pull(cursor?: TCursor): AsyncIterable<TRaw>;
  normalize(raw: TRaw): DomainMutation[];
  push?(mutation: DomainMutation): Promise<ExternalReceipt>;
  revoke(): Promise<void>;
  health(): Promise<ProviderHealth>;
}
```

The adapter never writes UI state directly. It emits validated domain mutations through `SyncCoordinator`, which performs identity resolution, idempotency checks, field ownership, audit logging, and event publication.

## Networking providers

### LinkedIn

- Use an approved LinkedIn product/API or a user-authorized MCP connector; do not scrape.
- Requested scopes: basic profile identity and permitted connection/profile changes. Availability depends on LinkedIn product approval.
- Normalize profiles to `Contact`, employment to `OrganizationMembership`, and permitted connections to `ContactEdge`.
- Webhook/poll trigger: `linkedin.profile.changed` → resolve identity → patch provider-owned fields → emit `contact.updated`.
- If mutual-connection data is unavailable, represent it as `unknown`, never an empty confirmed set.

### Handshake

- Use institutional/partner API access when available; otherwise accept user exports through a manual importer.
- Normalize recruiters/employers to contacts and organizations, fairs/sessions to Calendar events, and messages to interactions.
- Trigger: `handshake.message.received` → append interaction → update last-contacted → optionally create follow-up suggestion.

### Email contacts

- MCP tools: search/read threads and contacts, with write actions separately permissioned.
- Build contact candidates from participants; attach message IDs and snippets to `Interaction`, not entire message bodies by default.
- Trigger: mailbox history cursor advances → fetch changed threads → normalize participants → append deduplicated interaction metadata.
- Manual notes always win over inferred summaries unless the user accepts a proposed replacement.

## Calendar ingestion

```text
Academic schedule ─┐
Athletic schedule ─┼─> SyncCoordinator -> CalendarProjection -> editable CalendarEvent
Health workouts ───┤                         └-> provenance + manualFields
Networking follow-up┘
```

- Create: provider event with unseen idempotency key inserts a record.
- Update: matching external ID patches non-manual fields and increments revision.
- Delete: provider cancellation removes or marks the record cancelled unless the user detached it.
- Manual override: edited fields enter `manualFields`; subsequent sync leaves them untouched.
- Manual delete: create a provider tombstone keyed by external ID and revision.
- Conflict trigger: overlapping locked events emit `calendar.conflict.detected` for the daily brief.

## Health providers

- **Garmin:** daily summaries, sleep, stress/body battery where licensed, activities and HR. Map native activity load into normalized arbitrary units and keep the raw provider value.
- **Strava:** OAuth activities, streams, relative effort, distance, duration. Do not infer medical conclusions.
- **Fitbit:** intraday HR when the app has access, sleep summaries, activity and resting HR.
- **Apple Health:** HealthKit requires an iOS companion/bridge; the phone sends user-selected daily aggregates to the BRAIN ingestion endpoint. A browser cannot query HealthKit directly.
- Deduplicate the same workout observed by multiple providers using time overlap, activity type, and duration; retain all source links.

### Recovery automation

```ts
if (snapshot.recovery < athlete.thresholds.lowRecovery) {
  publish("health.recovery.low", { snapshotId, date });
  suggestions.create({
    operations: [
      { op: "patch", eventMatch: "planned-strength", intensity: "technique" },
      { op: "create", zone: "Recovery", durationMinutes: 30 }
    ],
    requiresUserApproval: true
  });
}
```

## Capital provider boundary

- The working UI supports manual records and CSV export. Production can accept CSV import or a bank-data aggregator through the same adapter contract.
- Store access tokens server-side, never in browser storage.
- Treat investment data as tracking information, not trade authorization. No provider adapter may initiate transactions.
- Normalize pending and posted transactions separately; merge them through provider IDs rather than fuzzy amount matching alone.

## MCP tool surface

The prototype registers three page-scoped WebMCP tools when supported:

- `brain_add_event(title, date, start, end, source?)`
- `brain_add_contact(name, org, role?, notes?)`
- `brain_add_task(title, course, due, time?, priority?, notes?)`

Production MCP server tools should include `search_records`, `create_record`, `update_record`, `delete_record`, `list_calendar_range`, `propose_schedule_adjustment`, and `sync_provider`. Destructive operations require explicit confirmation and audit entries. Health and capital tools return the minimum fields necessary for the request.

## Security and operations

1. OAuth PKCE for browser-initiated connections; tokens encrypted at rest server-side.
2. Least-privilege scopes and separate read/write grants.
3. Webhook signatures verified before enqueueing.
4. PII, health, and financial logs redacted; raw payload retention minimized.
5. Rate-limit budgets, exponential backoff with jitter, and dead-letter review.
6. Provider connection health shows last success, next retry, and actionable errors.
7. Every mutation records actor, source, before/after hash, timestamp, and correlation ID.
