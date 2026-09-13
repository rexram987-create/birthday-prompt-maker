const CACHE="birthday-prompts-v4";
const CORE_ASSETS=["/","/index.html","/styles.css","/app.js","/icon.svg","/icon-192.png","/icon-512.png"];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(cache=>cache.addAll(CORE_ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

async function networkFirst(request,fallbackPath){
  const cache=await caches.open(CACHE);
  try{
    const response=await fetch(request,{cache:"no-store"});
    if(response && response.ok) await cache.put(request,response.clone());
    return response;
  }catch{
    return (await cache.match(request)) || (fallbackPath ? await cache.match(fallbackPath) : Response.error());
  }
}

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET") return;

  const url=new URL(event.request.url);
  const path=url.pathname;

  if(
    path==="/" ||
    path==="/index.html" ||
    path==="/app.js" ||
    path==="/styles.css" ||
    path==="/manifest.webmanifest"
  ){
    event.respondWith(networkFirst(event.request,path==="/" ? "/index.html" : undefined));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(response=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      });
    })
  );
});