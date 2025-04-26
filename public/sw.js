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
  console.log(`[Service Worker] Fetching: ${event.request.url}`);

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Hanya simpan kalau responnya valid
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch((error) => {
          console.error("[Service Worker] Fetch failed:", error);
          // Kalau internet mati, biarkan cache yg diambil
        });

      // Kalau ada cache, langsung balikin cache sambil fetch baru
      return cachedResponse || fetchPromise;
    })
  );
});
