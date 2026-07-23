import { lazy } from "react";

/**
 * A Home fica no bundle principal — é a tela que sempre abre primeiro. As
 * outras cinco áreas viram pedaços separados, buscados só quando visitadas.
 */
export const CharactersPage = lazy(() =>
  import("@/pages/characters").then((m) => ({ default: m.CharactersPage })),
);
export const JourneyPage = lazy(() =>
  import("@/pages/journey").then((m) => ({ default: m.JourneyPage })),
);
export const MissionsPage = lazy(() =>
  import("@/pages/missions").then((m) => ({ default: m.MissionsPage })),
);
export const PlansPage = lazy(() =>
  import("@/pages/plans").then((m) => ({ default: m.PlansPage })),
);
export const SettingsPage = lazy(() =>
  import("@/pages/settings").then((m) => ({ default: m.SettingsPage })),
);
