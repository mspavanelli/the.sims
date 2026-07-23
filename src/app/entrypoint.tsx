import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./styles/tokens.css";
import "./styles/global.css";
import { AppProviders } from "./providers/AppProviders";
import { prefetchAreas } from "./routes/lazy-pages";
import { router } from "./routes/router";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register("/sw.js");
  });
}

// Com a Home já desenhada e o navegador ocioso, as outras cinco áreas descem
// em segundo plano — é o que faz o app abrir inteiro no modo avião depois.
//
// Depois de `serviceWorker.ready`, e não antes: na primeiríssima visita o SW
// ainda está instalando, e um pedaço buscado nesse intervalo passa por fora
// dele — fica no cache do navegador, que é justamente o que não sobrevive a
// dias sem abrir. Esperar o SW assumir é o que garante que ele guarde.
function warmAreas() {
  // O Safari só ganhou `requestIdleCallback` tarde, e ele é o navegador do alvo.
  const idle: typeof window.requestIdleCallback | undefined =
    window.requestIdleCallback;
  if (idle) idle(() => prefetchAreas());
  else window.setTimeout(() => prefetchAreas(), 1200);
}

window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    void navigator.serviceWorker.ready.then(warmAreas).catch(warmAreas);
  } else {
    warmAreas();
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
