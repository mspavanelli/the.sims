import { Link } from "react-router-dom";
import {
  goalHorizonMeta,
  useRelationship,
  type Goal,
} from "@/entities/relationship";
import { Avatar, ChapterBanner, ProgressBar } from "@/shared/ui";
import { useIdeaJar } from "@/widgets/app-shell";
import HomeNow from "./HomeNow";
import "./HomePage.css";

function goalPercent(goal: Goal): number | null {
  if (goal.progressType === "percentage") return goal.progress ?? 0;
  if (goal.progressType === "checklist" && goal.steps?.length) {
    const done = goal.steps.filter((s) => s.completed).length;
    return Math.round((done / goal.steps.length) * 100);
  }
  return null;
}

/**
 * A Home tem quatro blocos e nenhum deles é uma grade de cards.
 *
 * O banner diz de quem é o save; "Nosso agora" responde o que está acontecendo
 * (e absorveu carta, memória e próximo encontro como novidades compostas); a
 * dupla guarda o ♡ com o segredo; as metas são a única lista com barra.
 *
 * Os quatro atalhos que existiam aqui foram removidos: repetiam item por item a
 * barra de navegação que já fica fixa embaixo do polegar.
 */
export default function HomePage() {
  const { state } = useRelationship();
  const { openJar } = useIdeaJar();
  const [a, b] = state.characters;

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

      {/* A dupla — o ♡ do meio guarda o pote de ideias */}
      <section className="home-duo" aria-label="Nossos personagens">
        <div className="home-duo-avatars">
          {a && (
            <Avatar
              name={a.name}
              emoji={a.emoji}
              image={a.image}
              size={82}
              zoom={1.5}
            />
          )}
          <button
            type="button"
            className="home-duo-heart idea-jar-trigger"
            onClick={openJar}
            aria-label="Abrir o pote de ideias"
          >
            <span aria-hidden>♡</span>
          </button>
          {b && (
            <Avatar
              name={b.name}
              emoji={b.emoji}
              image={b.image}
              size={82}
              zoom={1.4}
            />
          )}
        </div>
        <div className="home-duo-names">
          {state.characters.map((c) => (
            <Link key={c.id} to="/personagens" className="home-duo-name">
              <strong>{c.name}</strong>
              {c.tagline && <span className="muted">{c.tagline}</span>}
            </Link>
          ))}
        </div>
      </section>

      {/* Metas atuais — a única lista com barra, e por isso a única com forma de lista */}
      {activeGoals.length > 0 && (
        <section className="panel home-goals">
          <h2 className="section-title">🎈 No que estamos trabalhando</h2>
          <ul className="home-goals-list">
            {activeGoals.map((g) => {
              const pct = goalPercent(g);
              const meta = goalHorizonMeta[g.horizon];
              return (
                <li key={g.id}>
                  <span className="home-goal-title">
                    <span aria-hidden>{meta.emoji}</span> {g.title}
                  </span>
                  {pct !== null ? (
                    <ProgressBar
                      value={pct}
                      accent={meta.color}
                      label={g.title}
                    />
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
        </section>
      )}
    </div>
  );
}
