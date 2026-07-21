import { useEffect, useState, type MouseEvent } from "react";
import Modal from "../ui/Modal";
import CategoryPill from "../ui/CategoryPill";
import { useSave } from "../../state/useSave";
import { dateIdeas, type DateIdea } from "../../data/dateIdeas";
import { missionCategoryMeta } from "../../lib/labels";
import { burstConfetti } from "../../lib/confetti";
import { newId } from "../../lib/id";
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
 * O pote de ideias — segredinho escondido atrás do ♡.
 * Sorteia uma das 20 ideias de encontro (sem repetir até dar a volta) e
 * deixa guardar a que agradar como missão. Não mexe no save enquanto ninguém pede.
 */
export default function IdeaJar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, dispatch } = useSave();
  const [deck, setDeck] = useState<DateIdea[]>(() => shuffle(dateIdeas));
  const [pos, setPos] = useState(0);
  const [discovered, setDiscovered] = useState<Record<string, true>>({});
  const [showAll, setShowAll] = useState(false);

  const current = deck[pos];
  const meta = missionCategoryMeta[current.category];
  const alreadySaved = state.missions.some((m) => m.title === current.title);

  useEffect(() => {
    if (!open) return;
    setDiscovered((d) => (d[current.id] ? d : { ...d, [current.id]: true }));
  }, [open, current.id]);

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
  };

  const count = Object.keys(discovered).length;

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
          {dateIdeas.map((idea, i) => (
            <li key={idea.id}>
              <button
                type="button"
                className={
                  "idea-jar-list-item" +
                  (idea.id === current.id ? " is-current" : "")
                }
                onClick={() => pick(idea)}
              >
                <span className="idea-jar-list-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="idea-jar-list-emoji" aria-hidden>
                  {idea.emoji}
                </span>
                <span className="idea-jar-list-text">
                  <strong>{idea.title}</strong>
                  <span className="muted">{idea.description}</span>
                </span>
              </button>
            </li>
          ))}
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
        <span className="muted">{count} de {dateIdeas.length} descobertas</span>
        {!showAll && (
          <button
            type="button"
            className="idea-jar-link"
            onClick={() => setShowAll(true)}
          >
            Ver as 20 →
          </button>
        )}
      </div>
    </Modal>
  );
}
