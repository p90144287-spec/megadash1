const CACHE_NAME = "megadash-v3";

const ASSETS = [
  "./",
  "./index.html",
  "./style.css",      // Add this
  "./script.js",     // Add this
  "./apps-data.js",   // Add this (critical for your app)
  "./game1.html",
  "./app1.png",
  "./manifest.json",
  "./icon.png",
];



// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
