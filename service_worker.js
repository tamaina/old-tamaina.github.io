/* workbox 2018-12-28T20:38:28.679Z */
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
        revision: '1546029508679',
    }
]);
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
