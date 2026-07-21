import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import "./AppShell.css";

export default function AppShell() {
  const location = useLocation();

  // Rola para o topo ao trocar de área.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="shell">
      <NavBar />
      <main className="shell-main">
        <div key={location.pathname} className="shell-route anim-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
