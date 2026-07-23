import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { IdeaJarContext } from "../model/idea-jar-context";
import IdeaJar from "./IdeaJar";
import NavBar from "./NavBar";
import "./AppShell.css";

/** Cada área tem seu próprio título de aba — antes todas diziam a mesma coisa. */
const routeTitles: Record<string, string> = {
  "/inicio": "Nosso agora",
  "/personagens": "Personagens",
  "/jornada": "Jornada",
  "/missoes": "Missões",
  "/planos": "Planos",
  "/config": "Ajustes",
};

export default function AppShell() {
  const location = useLocation();
  const [jarOpen, setJarOpen] = useState(false);

  const openJar = useCallback(() => setJarOpen(true), []);
  const jarValue = useMemo(() => ({ openJar }), [openJar]);

  // Rola para o topo ao trocar de área. Rolagem suave é movimento como
  // qualquer outro: quem pediu menos movimento recebe o salto direto.
  useEffect(() => {
    const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)")
      .matches;
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  }, [location.pathname]);

  useEffect(() => {
    const area = routeTitles[location.pathname];
    document.title = area ? `${area} · The Sims 💚` : "The Sims 💚";
  }, [location.pathname]);

  return (
    <IdeaJarContext.Provider value={jarValue}>
      <div className="shell">
        <NavBar />
        <main className="shell-main">
          <div key={location.pathname} className="shell-route anim-in">
            <Outlet />
          </div>
        </main>
        <IdeaJar open={jarOpen} onClose={() => setJarOpen(false)} />
      </div>
    </IdeaJarContext.Provider>
  );
}
