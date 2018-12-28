/* workbox 2018-12-28T22:11:54.328Z */
importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.routing.registerRoute(
    /.*.(?:js|css|png|jpeg|jpg|svg|svgz|woff2)/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'assets-cache',
    })
);
workbox.precaching.precacheAndRoute([
    {
        url: '/offline/',
        revision: '1546035114328',
    }
]);
workbox.skipWaiting();
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            return response || fetch(event.request);
        })
        .catch(function() {
            return caches.match('/offline/');
        })
    );
});
self.addEventListener('install', function(event) {
    workbox.skipWaiting();
    workbox.clientsClaim();
})
