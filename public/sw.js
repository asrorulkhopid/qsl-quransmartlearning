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
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching app shell");
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
  console.log("[Service Worker] Activate");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("[Service Worker] Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  console.log(`[SW] Fetching: ${event.request.url}`);

  event.respondWith(
    caches
      .match(event.request, { ignoreSearch: true })
      .then((cachedResponse) => {
        // Jika response ditemukan di cache, langsung kembalikan dari cache
        if (cachedResponse) {
          console.log(`[SW] Serving from cache: ${event.request.url}`);
          return cachedResponse;
        }

        // Jika response tidak ada di cache, lakukan fetch
        return fetch(event.request)
          .then((networkResponse) => {
            // Cek jika response valid
            if (
              !networkResponse ||
              networkResponse.status !== 200 ||
              networkResponse.type !== "basic"
            ) {
              return networkResponse; // Jika tidak valid, langsung kembalikan response dari jaringan
            }

            // Clone response agar bisa disimpan di cache dan dikirim ke pengguna
            const responseToCache = networkResponse.clone();

            // Simpan response yang valid ke cache
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });

            return networkResponse; // Kembalikan response ke pengguna
          })
          .catch((error) => {
            console.error("[SW] Network request failed", error);
            return new Response("Offline and resource not cached", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });
      })
  );
});
