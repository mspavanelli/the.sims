import { Link } from "react-router-dom";
import { useSave } from "../state/useSave";
import Avatar from "../components/ui/Avatar";
import ChapterBanner from "../components/ui/ChapterBanner";
import HomeNow from "../components/home/HomeNow";
import ProgressBar from "../components/ui/ProgressBar";
import CategoryPill from "../components/ui/CategoryPill";
import {
  conversationStatusMeta,
  formatDate,
  goalHorizonMeta,
  missionCategoryMeta,
} from "../lib/labels";
import type { Goal } from "../types";
import "./HomePage.css";

function goalPercent(goal: Goal): number | null {
  if (goal.progressType === "percentage") return goal.progress ?? 0;
  if (goal.progressType === "checklist" && goal.steps?.length) {
    const done = goal.steps.filter((s) => s.completed).length;
    return Math.round((done / goal.steps.length) * 100);
  }
  return null;
}

const shortcuts = [
  { to: "/personagens", emoji: "🧑‍🤝‍🧑", label: "Personagens", tint: "var(--c-coral-500)" },
  { to: "/jornada", emoji: "🧭", label: "Jornada", tint: "var(--c-blue-500)" },
  { to: "/missoes", emoji: "🎯", label: "Missões", tint: "var(--c-green-500)" },
  { to: "/planos", emoji: "🌈", label: "Planos", tint: "var(--c-plum-500)" },
];

export default function HomePage() {
  const { state } = useSave();
  const [a, b] = state.characters;

  const today = new Date().toISOString().slice(0, 10);
  const nextMission =
    state.missions
      .filter((m) => m.status === "planned" && m.date && m.date >= today)
      .sort((x, y) => (x.date! < y.date! ? -1 : 1))[0] ??
    state.missions.find((m) => m.status === "planned");

  const featured =
    state.conversations.find((c) => c.id === state.featuredConversationId) ??
    state.conversations.find((c) => c.status === "ready") ??
    state.conversations[0];

  const latestMemory = [...state.memories].sort((x, y) =>
    x.date < y.date ? 1 : -1,
  )[0];

  const activeGoals = state.goals.slice(0, 3);

  return (
    <div className="page home">
      <ChapterBanner
        coupleName={state.coupleName}
        tagline={state.saveTagline}
        chapterTitle={state.currentChapter.title}
        chapterSubtitle={state.currentChapter.subtitle}
      />

      <HomeNow />

      <div className="home-grid">
        {/* Dupla em destaque */}
        <Link to="/personagens" className="home-card home-duo card-hover">
          <span className="home-card-eyebrow eyebrow">Nossos personagens</span>
          <div className="home-duo-avatars">
            {a && <Avatar name={a.name} emoji={a.emoji} image={a.image} size={82} />}
            <span className="home-duo-heart" aria-hidden>♡</span>
            {b && <Avatar name={b.name} emoji={b.emoji} image={b.image} size={82} />}
          </div>
          <div className="home-duo-names">
            {state.characters.map((c) => (
              <div key={c.id} className="home-duo-name">
                <strong>{c.name}</strong>
                {c.tagline && <span className="muted">{c.tagline}</span>}
              </div>
            ))}
          </div>
        </Link>

        {/* Próxima missão */}
        <Link to="/missoes" className="home-card card-hover">
          <span className="home-card-eyebrow eyebrow">Próximo encontro</span>
          {nextMission ? (
            <div className="home-next">
              <div className="home-next-emoji" aria-hidden>
                {missionCategoryMeta[nextMission.category].emoji}
              </div>
              <div className="grow">
                <h3>{nextMission.title}</h3>
                <div className="row gap-2 wrap" style={{ marginTop: 6 }}>
                  <CategoryPill
                    label={missionCategoryMeta[nextMission.category].label}
                    emoji={missionCategoryMeta[nextMission.category].emoji}
                    color={missionCategoryMeta[nextMission.category].color}
                  />
                  {nextMission.date && (
                    <span className="chip">📅 {formatDate(nextMission.date)}</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="muted">Que tal planejar o próximo momento a dois?</p>
          )}
        </Link>

        {/* Conversa em destaque */}
        <Link to="/planos" className="home-card card-hover">
          <span className="home-card-eyebrow eyebrow">Carta em destaque</span>
          {featured ? (
            <div className="home-conv">
              <h3>💌 {featured.title}</h3>
              {featured.context && (
                <p className="muted home-clamp">{featured.context}</p>
              )}
              <CategoryPill
                label={conversationStatusMeta[featured.status].label}
                emoji={conversationStatusMeta[featured.status].emoji}
                color={conversationStatusMeta[featured.status].color}
              />
            </div>
          ) : (
            <p className="muted">Nenhuma carta guardada ainda.</p>
          )}
        </Link>

        {/* Memória mais recente */}
        <Link to="/jornada" className="home-card card-hover">
          <span className="home-card-eyebrow eyebrow">Memória mais recente</span>
          {latestMemory ? (
            <div className="home-mem">
              <div className="home-mem-emoji" aria-hidden>
                {latestMemory.emoji ?? "📸"}
              </div>
              <div className="grow">
                <h3>{latestMemory.title}</h3>
                <span className="muted">
                  {formatDate(latestMemory.date)}
                  {latestMemory.location ? ` · ${latestMemory.location}` : ""}
                </span>
              </div>
            </div>
          ) : (
            <p className="muted">A primeira memória está te esperando.</p>
          )}
        </Link>

        {/* Metas atuais */}
        <div className="home-card home-goals">
          <span className="home-card-eyebrow eyebrow">Metas atuais</span>
          <ul className="home-goals-list">
            {activeGoals.map((g) => {
              const pct = goalPercent(g);
              const meta = goalHorizonMeta[g.horizon];
              return (
                <li key={g.id}>
                  <div className="row between gap-3">
                    <span className="home-goal-title">
                      <span aria-hidden>{meta.emoji}</span> {g.title}
                    </span>
                  </div>
                  {pct !== null ? (
                    <ProgressBar value={pct} accent={meta.color} />
                  ) : (
                    <span className="chip">✍️ Meta narrativa</span>
                  )}
                </li>
              );
            })}
          </ul>
          <Link to="/planos" className="home-goals-link">
            Ver todos os planos →
          </Link>
        </div>
      </div>

      {/* Atalhos */}
      <div className="home-shortcuts">
        {shortcuts.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="home-shortcut card-hover"
            style={{ ["--tint" as string]: s.tint }}
          >
            <span className="home-shortcut-emoji" aria-hidden>
              {s.emoji}
            </span>
            <span className="home-shortcut-label">{s.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
