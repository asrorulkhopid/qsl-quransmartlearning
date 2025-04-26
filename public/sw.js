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
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Cek apakah response valid dan status 200
            if (networkResponse && networkResponse.status === 200) {
              // Clone response sebelum dipakai untuk cache
              const responseToCache = networkResponse.clone();

              // Simpan response ke cache
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            // Kembalikan response dari jaringan (untuk pengguna)
            return networkResponse;
          })
          .catch((error) => {
            console.error("[SW] Network request failed", error);
            return new Response("Offline and not cached", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });

        // Jika ada cache, langsung kembalikan cache dulu, sambil fetch baru
        return cachedResponse || fetchPromise;
      })
  );
});
