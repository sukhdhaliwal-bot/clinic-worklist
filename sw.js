// Service worker: keeps the app working offline and blocks every request
// that isn't to the app's own files. Bump CACHE whenever a file changes.
const CACHE = "cwl-v2";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-180.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "fonts/geist-latin-wght-normal.woff2",
  "fonts/geist-mono-latin-wght-normal.woff2",
  "fonts/outfit-latin-500-normal.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Privacy rule: nothing leaves the phone. Anything not from this app is refused.
  if (url.origin !== self.location.origin) {
    e.respondWith(Response.error());
    return;
  }
  if (e.request.method !== "GET") return;
  // Cached copy first (works offline); refresh it in the background when online.
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      const fresh = fetch(e.request)
        .then((res) => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => hit);
      return hit || fresh;
    })
  );
});
