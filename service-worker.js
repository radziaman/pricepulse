// ==========================================
// SERVICE WORKER - PWA Offline Support
// ==========================================

const CACHE_NAME = 'pricepulse-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/app.js',
    '/firebase-config.js',
    '/firebase-service.js',
    'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js',
    'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js',
    'https://unpkg.com/lucide@latest'
];

// Install - cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch(() => {
            // If both cache and network fail, show offline page
            if (event.request.destination === 'document') {
                return caches.match('/index.html');
            }
        })
    );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
