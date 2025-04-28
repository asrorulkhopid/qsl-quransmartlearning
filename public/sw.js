const CACHE_NAME = "qsl-cache-v1";
const FILES_TO_CACHE = [
  "/",
  "index.html",
  "/asset/1.svg",
  "/asset/2.svg",
  "/asset/3.svg",
  "/asset/4.svg",
  "/asset/bg.jpg",
  "/asset/label-l.svg",
  "/asset/label-r.svg",
  "logo.svg",
];

self.addEventListener("install", (event) => {
  // console.log("[Service Worker] Install");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // console.log("[Service Worker] Caching app shell");
        return cache.addAll(FILES_TO_CACHE);
      })
      .catch((error) => {
        console.error(
          "[Service Worker] Failed to cache during install:",
          error
        );
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  // console.log("[Service Worker] Activate");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              // console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cek kalau response valid
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Clone dan simpan response ke cache
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      })
      .catch(() => {
        // Kalau fetch gagal (offline), coba ambil dari cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Kalau cache juga gak ada, balikin fallback response
          return new Response("Offline and resource not cached", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});
