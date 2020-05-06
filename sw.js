var CACHE_NAME = '20200426215953';

self.addEventListener('install',event => {
  event.waitUntil(caches.open(CACHE_NAME)
  .then(cache => cache.addAll([
    '/',
    '/index.html'
  ]))
);
});

self.addEventListener('fetch',event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) return response;

      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(response => {
          if (!response || response.status != 200 || response.type !== 'basic')
            return response;

          var responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache =>
            cache.put(event.request, responseToCache)
          );
          return response;
        }).catch(() => caches.match('/'))
    }));
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(CACHE_NAME) {
      return Promise.all(
        cacheNames.filter(function(CACHE_NAME) {
        }).map(function(CACHE_NAME) {
          return caches.delete(CACHE_NAME);
        })
      );
    })
  );
});
