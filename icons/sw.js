const staticCacheName = 'CacheSpace1';

const assetUrls = [
  'https://gobb1a.github.io/basket.github.io//icons', 
  'https://gobb1a.github.io/basket.github.io//style.css', 
  'https://gobb1a.github.io/basket.github.io//background', 
  'https://gobb1a.github.io/basket.github.io//index.html', 
];

self.addEventListener('install', async event => {
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => cache.addAll(assetUrls))
  );
});

self.addEventListener('activate', event => {
  console.log('[SW]: activate');
});

self.addEventListener('fetch', event => {
  console.log('Fetch', event.request.url);
  event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
  const cached = await cache.match(request);
  return cached ?? await fetch(request);
}
