const CACHE_NAME = "bsh-fik1-spc-v9.0.0";

const APP_FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icons/favicon.ico",

    "./icons/icon-72.png",
    "./icons/icon-96.png",
    "./icons/icon-128.png",
    "./icons/icon-144.png",
    "./icons/icon-152.png",
    "./icons/icon-180.png",
    "./icons/icon-192.png",
    "./icons/icon-384.png",
    "./icons/icon-512.png",
    "./icons/maskable-512.png",
    "./icons/monochrome-512.png",
    "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_FILES))
    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            );

        })

    );

    self.clients.claim();

});

self.addEventListener("fetch", event => {

    if(event.request.method !== "GET") return;

    event.respondWith(

        caches.match(event.request)

        .then(cacheResponse=>{

            if(cacheResponse){

                return cacheResponse;

            }

            return fetch(event.request)

            .then(networkResponse=>{

                if(
                    !networkResponse ||
                    networkResponse.status!==200
                ){
                    return networkResponse;
                }

                const responseClone = networkResponse.clone();

                caches.open(CACHE_NAME)
                .then(cache=>{

                    cache.put(event.request,responseClone);

                });

                return networkResponse;

            })

            .catch(()=>{

                return caches.match("./index.html");

            });

        })

    );

});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
            for (const c of list) {
                if ("focus" in c) return c.focus();
            }
            if (clients.openWindow) return clients.openWindow("./");
        })
    );
});
