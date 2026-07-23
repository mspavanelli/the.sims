import { useEffect, useState, type MouseEvent } from "react";
import { missionCategoryMeta, useRelationship } from "@/entities/relationship";
import { burstConfetti, newId } from "@/shared/lib";
import { CategoryPill, Modal, useToast } from "@/shared/ui";
import { dateIdeas, type DateIdea } from "../model/date-ideas";
import "./IdeaJar.css";

function shuffle(list: DateIdea[]): DateIdea[] {
  const next = list.slice();
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * O pote de ideias — segredinho escondido atrás do ♡, e um só no app inteiro.
 * Sorteia uma das 20 ideias de encontro (sem repetir até dar a volta) e deixa
 * guardar a que agradar como missão.
 *
 * O que já saiu fica registrado no save. A lista mostra só o que foi
 * descoberto: o resto continua fechado, porque descobrir é a graça.
 */
export default function IdeaJar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();
  const [deck, setDeck] = useState<DateIdea[]>(() => shuffle(dateIdeas));
  const [pos, setPos] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const current = deck[pos];
  const meta = missionCategoryMeta[current.category];
  const alreadySaved = state.missions.some((m) => m.title === current.title);
  const discovered = state.discoveredIdeas ?? [];
  const count = discovered.length;

  useEffect(() => {
    if (open) dispatch({ type: "discoverIdea", id: current.id });
  }, [open, current.id, dispatch]);

  const drawAgain = () => {
    if (pos + 1 < deck.length) {
      setPos(pos + 1);
      return;
    }
    // Deu a volta nas 20: embaralha de novo, evitando repetir a que está na mão.
    const next = shuffle(dateIdeas);
    if (next[0].id === current.id) [next[0], next[1]] = [next[1], next[0]];
    setDeck(next);
    setPos(0);
  };

  const pick = (idea: DateIdea) => {
    const idx = deck.findIndex((d) => d.id === idea.id);
    setPos(idx === -1 ? 0 : idx);
    setShowAll(false);
  };

  const keepAsMission = (e: MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: "upsertMission",
      mission: {
        id: newId(),
        title: current.title,
        description: current.description,
        category: current.category,
        status: "idea",
      },
    });
    burstConfetti(e.currentTarget);
    notify({ emoji: "🫙", message: `"${current.title}" foi pras missões.` });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pote de ideias"
      emoji="🫙"
      footer={
        showAll ? (
          <button className="btn btn-ghost" onClick={() => setShowAll(false)}>
            ← Voltar ao sorteio
          </button>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={drawAgain}>
              🎲 Sortear outra
            </button>
            <button
              className="btn btn-primary"
              onClick={keepAsMission}
              disabled={alreadySaved}
            >
              {alreadySaved ? "✓ Já está nas missões" : "💾 Virar missão"}
            </button>
          </>
        )
      }
    >
      <p className="idea-jar-intro muted">
        Vinte ideias de encontro guardadas aqui dentro. Chacoalhe o pote e veja o
        que sai.
      </p>

      {showAll ? (
        <ul className="idea-jar-list">
          {dateIdeas.map((idea, i) => {
            const found = discovered.includes(idea.id);
            const num = String(i + 1).padStart(2, "0");
            return (
              <li key={idea.id}>
                {found ? (
                  <button
                    type="button"
                    className={
                      "idea-jar-list-item" +
                      (idea.id === current.id ? " is-current" : "")
                    }
                    onClick={() => pick(idea)}
                  >
                    <span className="idea-jar-list-num">{num}</span>
                    <span className="idea-jar-list-emoji" aria-hidden>
                      {idea.emoji}
                    </span>
                    <span className="idea-jar-list-text">
                      <strong>{idea.title}</strong>
                      <span className="muted">{idea.description}</span>
                    </span>
                  </button>
                ) : (
                  <div className="idea-jar-list-item is-secret">
                    <span className="idea-jar-list-num">{num}</span>
                    <span className="idea-jar-list-emoji" aria-hidden>
                      🎁
                    </span>
                    <span className="idea-jar-list-text">
                      <strong>Ainda no fundo do pote</strong>
                      <span className="muted">
                        Chacoalhe mais um pouco pra essa aparecer.
                      </span>
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="idea-jar-card" key={current.id}>
          <span className="idea-jar-emoji" aria-hidden>
            {current.emoji}
          </span>
          <h3 className="idea-jar-title">{current.title}</h3>
          <p className="idea-jar-desc">{current.description}</p>
          <CategoryPill
            label={meta.label}
            emoji={meta.emoji}
            color={meta.color}
          />
        </div>
      )}

      <div className="idea-jar-foot">
        <span className="muted">
          {count} de {dateIdeas.length} descobertas
        </span>
        {!showAll && (
          <button
            type="button"
            className="idea-jar-link"
            onClick={() => setShowAll(true)}
          >
            Ver o que já saiu →
          </button>
        )}
      </div>
    </Modal>
  );
}
