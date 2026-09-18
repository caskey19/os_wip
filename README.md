# Aether

A private student-athlete operating system for academics, mail, calendar, network, tasks & goals, health, and capital — with per-account isolation and a labeled demo mode for guests.

Live site: [https://caskey19.github.io/os_wip/](https://caskey19.github.io/os_wip/)

## Run locally

```bash
npm run dev
```

Open `http://127.0.0.1:4173`. Build the GitHub Pages bundle with `npm run build`.

## What’s in this OS

- **Home** — curated command center (widget catalog + chart/list/bullets/KPI modes)
- **Academic** — courses, sources, notes
- **Tasks & Goals** — obligations and season/semester targets
- **Network** — interactive ego graph, filters, email review queue, CSV import
- **Calendar** — Google Calendar sync, mail proposals (approve-first), athletic ICS/CSV import
- **Mail** — Firebase Google sign-in, Gmail triage, drafts, calendar/task/network detections
- **Health** — Strava/Fitbit connect UX, suggest → apply coaching against goals
- **Capital** — net worth, cashflow, budgets, portfolio P/L, PIN lock, Plaid/Finnhub wiring

## Account isolation

- Guest / demo uses `aether:guest:*` local keys and a watermarked seed.
- Google accounts use `aether:{uid}:*` plus Firestore `users/{uid}/**`.
- Signed-in users never receive sample stocks, contacts, or health theater.

## Enable live Mail & providers

1. Firebase web app with Google Auth + Firestore ([`firebase-config.js`](firebase-config.js)).
2. Gmail API + Google Calendar API OAuth origins (including GitHub Pages).
3. Deploy [`firestore.rules`](firestore.rules).
4. Optional: Cloud Functions for Finnhub, Strava, Fitbit, Plaid, push — see [`docs/PROVIDER_SETUP.md`](docs/PROVIDER_SETUP.md).

Without Functions credentials, Connect buttons run a safe demo-mode handshake so investor demos still work.
