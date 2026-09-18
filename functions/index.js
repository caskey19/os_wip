/**
 * Firebase Cloud Functions scaffolding for Aether.
 * Deploy with: cd functions && npm i && firebase deploy --only functions
 *
 * Secrets (set via firebase functions:config:set or Secret Manager):
 * - finnhub.key
 * - strava.client_id / strava.client_secret
 * - fitbit.client_id / fitbit.client_secret
 * - plaid.client_id / plaid.secret / plaid.env
 * - vapid.public / vapid.private
 */
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

initializeApp();

const finnhubKey = defineSecret("FINNHUB_API_KEY");
const corsOrigins = [
  "https://caskey19.github.io",
  "http://127.0.0.1:4173",
  "http://localhost:4173"
];

function applyCors(req, res) {
  const origin = req.headers.origin || "";
  if (corsOrigins.some(allowed => origin.startsWith(allowed))) {
    res.set("Access-Control-Allow-Origin", origin);
  }
  res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return true;
  }
  return false;
}

async function requireUser(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) throw Object.assign(new Error("Unauthorized"), { status: 401 });
  return getAuth().verifyIdToken(token);
}

export const quotes = onRequest({ secrets: [finnhubKey], cors: false }, async (req, res) => {
  if (applyCors(req, res)) return;
  try {
    const symbols = String(req.query.symbols || "")
      .split(",")
      .map(s => s.trim().toUpperCase())
      .filter(Boolean)
      .slice(0, 25);
    const key = finnhubKey.value();
    const quotesOut = {};
    await Promise.all(symbols.map(async symbol => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}`, {
        headers: { "X-Finnhub-Token": key }
      });
      const data = await response.json();
      quotesOut[symbol] = data;
    }));
    res.json({ quotes: quotesOut });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || "Quote fetch failed" });
  }
});

export const oauthStart = onRequest({ cors: false }, async (req, res) => {
  if (applyCors(req, res)) return;
  const provider = String(req.path.split("/").pop() || req.query.provider || "");
  res.status(501).json({
    error: "Configure provider credentials, then complete the OAuth redirect handlers.",
    provider,
    docs: "See docs/PROVIDER_SETUP.md"
  });
});

export const plaidLinkToken = onRequest({ cors: false }, async (req, res) => {
  if (applyCors(req, res)) return;
  try {
    await requireUser(req);
    res.status(501).json({
      error: "Add Plaid client id/secret to Functions, then return a link_token here.",
      docs: "See docs/PROVIDER_SETUP.md"
    });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export const pushRegister = onRequest({ cors: false }, async (req, res) => {
  if (applyCors(req, res)) return;
  try {
    const user = await requireUser(req);
    const subscription = req.body?.subscription;
    if (!subscription) {
      res.status(400).json({ error: "Missing subscription" });
      return;
    }
    await getFirestore().doc(`users/${user.uid}/settings/push`).set({ subscription, updatedAt: new Date().toISOString() }, { merge: true });
    res.json({ ok: true });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});
