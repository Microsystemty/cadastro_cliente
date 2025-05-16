self.addEventListener('install', e => {
  e.waitUntil(caches.open('controle-clientes-cache').then(cache => {
    return cache.addAll([
      './',
      './index.html',
      './dashboard.html',
      './app.js',
      './dashboard.js',
      './style.css',
      './manifest.json'
    ]);
  }));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});