/* Aether service worker — offline shell + push display */
const CACHE = "aether-shell-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./aether-theme.css",
  "./aether-core.js",
  "./aether-modules.js",
  "./app.js",
  "./mail-ui.js",
  "./mail-services.js",
  "./firebase-config.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match("./index.html")))
  );
});

self.addEventListener("push", event => {
  let payload = { title: "Aether", body: "You have a new update." };
  try { payload = { ...payload, ...event.data.json() }; } catch { /* text */ }
  event.waitUntil(self.registration.showNotification(payload.title, {
    body: payload.body,
    data: payload.data || {},
    badge: undefined
  }));
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(clients.openWindow("./"));
});
