# BRAIN OS

A private, browser-saved operating system combining Cornell academics with relationship intelligence, calendar coordination, student-athlete performance, and personal capital.

## Run locally

```bash
npm run dev
```

Open `http://127.0.0.1:4173` for Academic OS or `http://127.0.0.1:4173/brain/` for the four new modules. Build the publishable static bundle with `npm run build`.

## Working systems

- Home: professional command center with live daily priorities and summaries across every OS module.
- Academic OS: courses, connected sources and notes, citations, research library, and academic provider contracts.
- Networking: DNA relationship graph, contact inspector, interaction history, optional Calendar follow-ups, and full contact CRUD.
- Calendar: 1-day, 3-day, week, and month views; direct event editing; provenance, priorities, time-block zones, and module sync indicators.
- Mail: Firebase Google sign-in, live Gmail sync, preference-driven AI triage, urgent actions, daily summaries, reply drafts, and Mail-to-Calendar review or automatic scheduling.
- Health & Performance: recovery, exertion, load, sleep, heart-rate widgets, editable logs, providers, and health-to-calendar adjustments.
- Capital: cash flow, spending categories, editable ledger, recurring costs, savings goals, and CSV export.
- Shared: local persistence, global search, provider adapter states, responsive layouts, and WebMCP add-event/add-contact tools.

See [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md), [DATA_SCHEMA.md](docs/DATA_SCHEMA.md), and [INTEGRATIONS.md](docs/INTEGRATIONS.md) for the implementation blueprint.

## Enable live Mail

1. Create a Firebase web app with Google Authentication and Firestore enabled.
2. Enable the Gmail API and Google Calendar API on the linked Google Cloud project, then add the app origin to the OAuth client.
3. Add the Firebase public web values in `firebase-config.js`. Set `aiEndpoint` to an authenticated Firebase Function (or equivalent HTTPS proxy) that implements the contract in [MAIL_ARCHITECTURE.md](docs/MAIL_ARCHITECTURE.md).
4. Deploy `firestore.rules` before enabling preference sync.

Without provider configuration, Mail runs as a complete interactive demo and uses its deterministic academic triage/reply fallback.
