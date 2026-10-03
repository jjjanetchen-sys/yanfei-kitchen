/* 離線快取：讓廚房網路不好時也能開。更新網站內容後，把 VERSION 數字加 1，手機才會抓到新版。 */
const VERSION = "yanfei-v2";
const CORE = [
  "./", "index.html", "record.html", "manifest.json",
  "css/style.css",
  "js/app.js", "js/audio.js",
  "data/ui.js", "data/ingredients.js", "data/recipes.js", "data/phrases.js", "data/vocab.js", "data/equipment.js", "data/tw-list.js",
  "images/hero.jpg", "images/hero-800.jpg", "images/logo.jpg", "images/icon-192.png", "images/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin) return;
  /* 錄音檔不快取（iPhone 對音檔 Range 請求有問題），一律走網路 */
  if (url.pathname.indexOf("/audio/") >= 0) return;
  /* 圖片：先用快取（馬上顯示），背景再抓新的，下次打開就是新圖 */
  if (url.pathname.indexOf("/images/") >= 0) {
    e.respondWith(caches.open(VERSION).then(function (c) {
      return c.match(req).then(function (hit) {
        const fresh = fetch(req).then(function (res) { if (res && res.ok) c.put(req, res.clone()); return res; });
        if (hit) { fresh.catch(function () {}); return hit; }
        return fresh;
      });
    }));
    return;
  }
  /* 其他檔案：網路優先，失敗時用快取；成功就順便更新快取 */
  e.respondWith(
    fetch(req).then(function (res) {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); });
    })
  );
});
