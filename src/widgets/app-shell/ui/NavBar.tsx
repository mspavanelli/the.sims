import { useState } from "react";
import { NavLink } from "react-router-dom";
import IdeaJar from "./IdeaJar";
import "./NavBar.css";

const items = [
  { to: "/inicio", label: "Início", emoji: "🏡" },
  { to: "/personagens", label: "Personagens", emoji: "🧑‍🤝‍🧑" },
  { to: "/jornada", label: "Jornada", emoji: "🧭" },
  { to: "/missoes", label: "Missões", emoji: "🎯" },
  { to: "/planos", label: "Planos", emoji: "🌈" },
];

export default function NavBar() {
  const [jarOpen, setJarOpen] = useState(false);

  return (
    <nav className="nav" aria-label="Navegação principal">
      <div className="nav-brand">
        {/* O ♡ da marca é o outro caminho para o pote de ideias */}
        <button
          type="button"
          className="nav-brand-mark idea-jar-trigger"
          onClick={() => setJarOpen(true)}
          aria-label="Abrir o pote de ideias"
        >
          <span aria-hidden>♡</span>
        </button>
        <span className="nav-brand-text">The Sims</span>
      </div>

      <ul className="nav-list">
        {items.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " is-active" : "")
              }
            >
              <span className="nav-emoji" aria-hidden>
                {item.emoji}
              </span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <NavLink
        to="/config"
        className={({ isActive }) =>
          "nav-config" + (isActive ? " is-active" : "")
        }
        aria-label="Configurações"
        title="Configurações"
      >
        <span aria-hidden>⚙️</span>
        <span className="nav-config-label">Ajustes</span>
      </NavLink>

      <IdeaJar open={jarOpen} onClose={() => setJarOpen(false)} />
    </nav>
  );
}
