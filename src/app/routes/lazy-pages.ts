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

/**
 * Busca os cinco pedaços em segundo plano, depois que a Home já desenhou. O
 * app é instalado e aberto na rua, muitas vezes sem sinal: um pedaço que nunca
 * foi baixado vira uma área que não abre offline — e tela de erro dentro de um
 * app instalado é falha grave, não degradação aceitável. O service worker
 * guarda tudo que passa, então uma visita com sinal deixa o mundo inteiro
 * disponível sem ele.
 */
export function prefetchAreas(): void {
  void Promise.all([
    import("@/pages/characters"),
    import("@/pages/journey"),
    import("@/pages/missions"),
    import("@/pages/plans"),
    import("@/pages/settings"),
  ]).catch(() => {
    // Sem sinal agora é só isso: fica para a próxima abertura.
  });
}
