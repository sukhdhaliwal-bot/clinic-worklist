// Service worker: keeps the app working offline and blocks every request
// that isn't to the app's own files. Bump CACHE whenever a file changes,
// and the version number in Settings (index.html) to match.
const CACHE = "cwl-v8";
// The speech engine and Whisper models (about 100 MB) live in their own cache so an
// app update doesn't download them again. Bump this only if those files change.
const WHISPER_CACHE = "cwl-whisper-1";
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
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE && k !== WHISPER_CACHE).map((k) => caches.delete(k))))
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
  // Speech engine and models: download once, then always use the stored copy.
  if (/\/whisper\/(lib|models)\//.test(url.pathname)) {
    e.respondWith(
      caches.open(WHISPER_CACHE).then(async (cache) => {
        const hit = await cache.match(e.request, { ignoreSearch: true });
        if (hit) return hit;
        const res = await fetch(e.request);
        if (res.ok) cache.put(e.request, res.clone());
        return res;
      })
    );
    return;
  }
  // Cached copy first (works offline); refresh it in the background when online.
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const hit = await cache.match(e.request, { ignoreSearch: true });
      // no-cache: skip the browser's own 10-minute cache so a new version is picked up
      // on the next open.
      const fresh = fetch(e.request, { cache: "no-cache" })
        .then((res) => { if (res.ok) cache.put(e.request, res.clone()); return res; })
        .catch(() => hit);
      return hit || fresh;
    })
  );
});
