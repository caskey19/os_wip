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
- Health & Performance: recovery, exertion, load, sleep, heart-rate widgets, editable logs, providers, and health-to-calendar adjustments.
- Capital: cash flow, spending categories, editable ledger, recurring costs, savings goals, and CSV export.
- Shared: local persistence, global search, provider adapter states, responsive layouts, and WebMCP add-event/add-contact tools.

See [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md), [DATA_SCHEMA.md](docs/DATA_SCHEMA.md), and [INTEGRATIONS.md](docs/INTEGRATIONS.md) for the implementation blueprint.
