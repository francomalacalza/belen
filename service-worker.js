const cacheName = "deck-cache-v1";
const assets = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./img/icon-192.png",
  "./img/icon-512.png",
  "./sound1.mp3",
  "./sound2.mp3",
  "./sound3.mp3",
  "./sound4.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
