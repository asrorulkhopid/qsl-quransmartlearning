const CACHE_NAME = "qsl-cache";
self.addEventListener("install", (e) => {
  console.log("Installing service worker!!");
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/", "index.html"]).then(() => self.skipWaiting());
    })
  );
});

self.addEventListener("activate", (e) => {
  console.log("activating service worker");
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  console.log(`fetching ${e.request.url}`);

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log(`Serving from cache ${e.request.url}`);
        return cachedResponse;
      }

      return fetch(e.request)
        .then((response) => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          return response;
        })
        .catch((error) => {
          console.error(`Fetching failed: ${error}`);
          return new Response("Offline and resource not cached", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    })
  );
});
