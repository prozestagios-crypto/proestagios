self.addEventListener('install', (e) => {
  console.log('[Service Worker] Instalado com sucesso');
});

self.addEventListener('fetch', (e) => {
  // Apenas permite que a app funcione e faça fetch dos dados normalmente
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});