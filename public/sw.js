const CACHE_NAME = "the-sims-v5";

/**
 * Baloo 2 e Nunito vêm do Google Fonts, então são cross-origin. Sem cachear,
 * o app instalado abria offline em system-ui e perdia a identidade tipográfica
 * inteira — justamente no cenário que o service worker existe para cobrir.
 */
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/casa-icone.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
  // Os dois rostos do save vêm por caminho absoluto no seed, não pelo bundle —
  // sem isto a Home abriria offline com dois buracos onde eles deveriam estar.
  "/avatar-matheus.jpg",
  "/avatar-luiza.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

/**
 * A folha do Google Fonts é pedida no parse do <head>, ou seja, sempre antes de
 * este service worker existir — numa primeira visita ela e os .woff2 passam por
 * fora do cache. Se a pessoa instalar e sair do sinal no mesmo dia, o app
 * abriria em `system-ui` e perderia a identidade tipográfica inteira. Então o
 * SW busca a folha por conta própria ao ativar e guarda cada fonte citada nela.
 */
const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,600&display=swap";

async function cacheFonts() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const response = await fetch(FONT_CSS);
    if (!response.ok) return;
    const css = await response.clone().text();
    await cache.put(FONT_CSS, response);
    const files = [...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].map((m) => m[1]);
    await Promise.all(
      files.map((url) =>
        cache.match(url).then((hit) => (hit ? undefined : cache.add(url).catch(() => {}))),
      ),
    );
  } catch {
    // Sem sinal agora: o handler de fetch guarda na próxima passagem.
  }
}

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(cacheFonts),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);

  // Fontes: serve do cache na hora e revalida em segundo plano. As respostas do
  // gstatic são opacas (no-cors), o que é suficiente para o navegador desenhar.
  if (FONT_HOSTS.includes(requestUrl.hostname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(event.request).then((cached) => {
          const network = fetch(event.request)
            .then((response) => {
              if (response.ok || response.type === "opaque") {
                void cache.put(event.request, response.clone());
              }
              return response;
            })
            .catch(() => cached);
          return cached || network;
        }),
      ),
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put("/", copy));
          return response;
        })
        .catch(() => caches.match("/")),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(
      (cached) =>
        cached ||
        fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        }),
    ),
  );
});
