# Aether provider setup

Athletes never enter API keys. Product-owned credentials live in **Firebase Cloud Functions**. GitHub Pages only calls those HTTPS endpoints after Google sign-in.

## Already in the web app

| Provider | Status in UI |
| --- | --- |
| Firebase Auth + Firestore | Live via [`firebase-config.js`](../firebase-config.js) |
| Gmail + Google Calendar | Live OAuth scopes on Google sign-in |
| Strava / Fitbit / Plaid / Finnhub / Push | Connect UI + demo mode until Functions secrets are set |

## 1. Finnhub (live quotes)

1. Create a free key at [finnhub.io](https://finnhub.io/).
2. `firebase functions:secrets:set FINNHUB_API_KEY`
3. Deploy `functions/quotes`.
4. Set `functionsBase` in [`firebase-config.js`](../firebase-config.js) to your Functions URL, e.g. `https://us-central1-studentathleteos.cloudfunctions.net`.

## 2. Strava

1. Create an API application at [strava.com/settings/api](https://www.strava.com/settings/api).
2. Authorization callback: `https://us-central1-<project>.cloudfunctions.net/oauthStart/strava/callback` (complete handler in a follow-up deploy).
3. Store `STRAVA_CLIENT_ID` / `STRAVA_CLIENT_SECRET` as Functions secrets.
4. Athletes click **Connect** → popup OAuth → refresh token saved under `users/{uid}/providers/strava`.

## 3. Fitbit

Same pattern as Strava with Fitbit’s OAuth 2.0 app registration. Callback through Functions. No per-athlete keys.

## 4. Plaid

1. Create a Plaid team and sandbox credentials.
2. Implement `plaidLinkToken` to return a `link_token`.
3. Exchange `public_token` server-side; store access tokens only in Firestore under the uid, never in the browser.

## 5. Browser push (VAPID)

1. Generate VAPID keys.
2. Expose public key to the client via a Functions endpoint; keep the private key server-side.
3. [`sw.js`](../sw.js) is already registered for notification display.

## 6. LinkedIn

Official partner API only — no scraping. Until approved: CSV import + email review queue.

## 7. Apple Health

Browser cannot read HealthKit. Ship an iOS companion later that posts daily aggregates to Functions.

## Deploy Functions

```bash
cd functions
npm install
firebase deploy --only functions
```

Then set `window.ACADEMIC_OS_CONFIG.functionsBase` in `firebase-config.js` and rebuild (`npm run build`).

## Firestore paths (owner-only)

Existing rules already lock `users/{userId}/**` to the signed-in uid. Expanded documents used by Aether:

- `users/{uid}/workspace/state`
- `users/{uid}/settings/mail`
- `users/{uid}/settings/push`
- `users/{uid}/providers/{providerId}`
- `users/{uid}/onboarding/profile` (also mirrored inside workspace payload)
