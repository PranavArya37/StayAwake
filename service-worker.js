// service-worker.js

// Define a unique name for the cache storage. Increment version to force update.
const CACHE_NAME = "stay-awake-cache-v1";

// List of URLs to cache during the service worker installation.
const urlsToCache = [
  "/", // Cache the root URL (often serves index.html)
  "/index.html", // Explicitly cache index.html
  "/index.css", // Cache the main stylesheet
  "/index.js", // Cache the compiled JavaScript
  "/nosleep/nosleep.js", // Cache the NoSleep library
  "/favicon/favicon_green.ico", // Cache favicons
  "/favicon/favicon_blue.ico",
  "/manifest.json", // Cache the Web App Manifest
  "/icons/ghost_192x192.png", // Cache PWA icons (Update paths if different)
  "/icons/ghost_512x512.png",
  // Cache essential CDN assets for basic offline functionality
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
  // Add other crucial CDN assets if needed (e.g., Google Fonts CSS, though font files might be trickier)
  "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;800&display=swap", // Cache the font CSS definition
];

// Install event: triggered when the service worker is first registered or updated.
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  // Prevent the SW from completing installation until the cache is populated.
  event.waitUntil(
    caches
      .open(CACHE_NAME) // Open the specified cache.
      .then((cache) => {
        console.log("Service Worker: Caching app shell");
        // Add all specified URLs to the cache.
        // If any request fails, the entire cache operation fails.
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Force the waiting SW to become active immediately.
      .catch((err) =>
        console.error("Service Worker: Cache open/addAll failed", err)
      )
  );
});

// Activate event: triggered after the SW installation and when it takes control.
// Used to clean up old caches.
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");
  // Define a whitelist of cache names to keep (only the current one).
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        // Get all cache storage keys (names).
        return Promise.all(
          cacheNames.map((cacheName) => {
            // If a cache name is not in the whitelist, delete it.
            if (!cacheWhitelist.includes(cacheName)) {
              console.log("Service Worker: Deleting old cache", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Allow the active SW to take control of the page immediately.
  );
});

// Fetch event: triggered for every network request made by the page.
// Implements a Cache-First strategy.
self.addEventListener("fetch", (event) => {
  // Optional: Log the requested URL (can be noisy).
  // console.log('Service Worker: Fetching', event.request.url);

  // Respond to the fetch request either from cache or network.
  event.respondWith(
    caches
      .match(event.request) // Check if the request exists in the cache.
      .then((response) => {
        // Cache hit: If a matching response is found in the cache, return it.
        if (response) {
          // console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }

        // Cache miss: If not found in cache, fetch from the network.
        // console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then((networkResponse) => {
          // Optional: Dynamically cache network responses here.
          // Be cautious: Only cache responses you know are safe/static,
          // or implement a more complex caching strategy (e.g., stale-while-revalidate).
          // Example (commented out):
          // if(!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          //   // Don't cache errors, redirects, or cross-origin opaque responses without care.
          //   return networkResponse;
          // }
          // // Clone the response because it can only be consumed once.
          // const responseToCache = networkResponse.clone();
          // caches.open(CACHE_NAME).then(cache => {
          //   // Put the fetched response into the cache for next time.
          //   cache.put(event.request, responseToCache);
          // });

          // Return the network response to the page.
          return networkResponse;
        });
      })
      .catch((err) => {
        // Handle potential errors during cache match or network fetch.
        console.error("Service Worker: Fetch failed", err);
        // Optional: Provide a fallback offline page/resource here.
        // Example: return caches.match('/offline.html');
      })
  );
});
