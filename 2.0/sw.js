const CACHE_NAME = 'gestao-estagio-v1';
const urlsToCache = [
  './',
  './app2.html',
  './app.js',
  './config.js',
  './utils.js',
  './logoapp.png',
  './manifest.json'
];

// Instalação e armazenamento em cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] A guardar ficheiros na cache');
        return cache.addAll(urlsToCache);
      })
  );
  // Força a ativação imediata do novo Service Worker
  self.skipWaiting();
});

// Ativação e limpeza de caches antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Interceção de pedidos (Fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna da cache se existir, caso contrário vai à rede
        return response || fetch(event.request);
      })
  );
});
