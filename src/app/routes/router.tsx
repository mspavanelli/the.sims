import { Suspense, type ReactNode } from "react";
import { Navigate, createHashRouter } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { AppShell } from "@/widgets/app-shell";
import { RouteRecovery } from "./RouteRecovery";
import {
  CharactersPage,
  JourneyPage,
  MissionsPage,
  PlansPage,
  SettingsPage,
} from "./lazy-pages";

/** Espera curta e silenciosa: em rede local o pedaço chega antes de aparecer. */
function lazyRoute(element: ReactNode) {
  return (
    <RouteRecovery>
      <Suspense
        fallback={
          <div className="page route-loading" role="status">
            <span className="muted">carregando esse cantinho…</span>
          </div>
        }
      >
        {element}
      </Suspense>
    </RouteRecovery>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/inicio" replace /> },
      { path: "inicio", element: <HomePage /> },
      { path: "personagens", element: lazyRoute(<CharactersPage />) },
      { path: "jornada", element: lazyRoute(<JourneyPage />) },
      { path: "missoes", element: lazyRoute(<MissionsPage />) },
      { path: "planos", element: lazyRoute(<PlansPage />) },
      { path: "config", element: lazyRoute(<SettingsPage />) },
      { path: "*", element: <Navigate to="/inicio" replace /> },
    ],
  },
]);
