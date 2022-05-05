const filesToCache = [
    "html/index.html",
    "css/master.css",
    "css/masterOG.css",
    "js/index.js",
    "data/products.json",
    "data/bleresit.json",
    "js/table.js",
    "js/jquery.js",
    "images/remove.png",
    "images/minusWhite.png",
    // "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@1,200&display=swap",
    // "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,200&display=swap",
    // "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;1,200&display=swap",
    // "https://fonts.googleapis.com/css2?family=DM+Mono&family=Nova+Mono&family=Poppins:ital,wght@0,300;0,500;1,200&family=Space+Mono&display=swap",
    // "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,400;1,500&family=Nova+Mono&family=Poppins:ital,wght@0,300;0,500;1,200&family=Space+Mono&display=swap",
    // "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap",
    // "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
    "fonts/robotoMono.woff2",
    "fonts/poppins.woff2"
];
const staticCacheName = 'pages-cache-v11';

self.addEventListener('install', event => {
  //console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

addEventListener('activate', event => {
    event.waitUntil(
      // Feature-detect
      // if (self.registration.navigationPreload) {
      //   // Enable navigation preloads!
      //   await self.registration.navigationPreload.enable();
      // }
      caches.keys()
      .then(cacheNames => {
        cacheNames.map(cache => {
          if(cache !== staticCacheName){
            return caches.delete(cache);
          }
        })
      })
    )
  });

  addEventListener('fetch', (event) => {
    const { request } = event;
  
    // Always bypass for range requests, due to browser bugs
    if (request.headers.has('range')) return;
    event.respondWith(async function() {
      // Try to get from the cache:
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;
  
      try {
        // See https://developers.google.com/web/updates/2017/02/navigation-preload#using_the_preloaded_response
        const response = await event.preloadResponse;
        if (response) return response;
  
        // Otherwise, get from the network
        return await fetch(request);
      } catch (err) {
        // If this was a navigation, show the offline page:
        if (request.mode === 'navigate') {
          return caches.match('index.html');
        }
  
        // Otherwise throw
        throw err;
      }
    }());
  });


