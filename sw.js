const CACHE_NAME = "megadash-v3";

const ASSETS = [
  "./",
  
  "./index.html",
  
  "./style.css",
  
  "./script.js",
  
  "./apps-data.js",
  
  "./manifest.json",
  
  "./icon.png",
  
  "./calcballon.png",
  
  "./calcballon.html",
  
  "./colorpathpuzzel.png",
  
  "./Color-Path-Puzzle.html",
  
  "./colormatch.png",
  
  "./colorpathpuzzel.html",
  
  "./colormatch.html",
  
  "./hiddenpairnum.png",
  
  "./Hidden-Pair-Numbers.html",
  
  "./fastcolortap.png",
  
  "./fast-color-tap.html",
  
  "./patternrepeat.html",
  
  "./patternrepeat.png",
  
  "./Odd-Even.html",
  
  "./oddoreven.png",
  
  "./numbertab.png",
  
  "./numbertab.html",
  
  "./whackcorrectnum.png",
  
  "./whack-correct-number.html",
  
  "./todoapp.html",
  
  "./todoapp.png",
  
  "./positionmemory.png",
  
  "./memory-position.html",
  
  
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
