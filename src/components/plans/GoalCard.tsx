import type { Goal } from "../../types";
import ProgressBar from "../ui/ProgressBar";
import { goalHorizonMeta } from "../../lib/labels";
import "./GoalCard.css";

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
  onSetProgress,
  onToggleStep,
}: {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onSetProgress: (value: number) => void;
  onToggleStep: (stepId: string) => void;
}) {
  const meta = goalHorizonMeta[goal.horizon];
  const steps = goal.steps ?? [];

  return (
    <article className="goal-card panel" style={{ ["--h" as string]: meta.color }}>
      <div className="goal-card-head">
        <span className="goal-horizon">
          {meta.emoji} {meta.label}
        </span>
        <div className="row gap-1">
          <button className="btn-icon" onClick={onEdit} aria-label="Editar meta">
            ✎
          </button>
          <button className="btn-icon" onClick={onDelete} aria-label="Remover meta">
            🗑
          </button>
        </div>
      </div>

      <h3 className="goal-card-title">{goal.title}</h3>
      {goal.description && goal.progressType !== "narrative" && (
        <p className="muted goal-card-desc">{goal.description}</p>
      )}

      {goal.progressType === "percentage" && (
        <div className="goal-progress">
          <ProgressBar value={goal.progress ?? 0} accent={meta.color} />
          <div className="goal-progress-controls">
            <button
              className="btn-icon"
              onClick={() => onSetProgress(Math.max(0, (goal.progress ?? 0) - 10))}
              aria-label="Diminuir progresso"
            >
              −
            </button>
            <button
              className="btn-icon"
              onClick={() => onSetProgress(Math.min(100, (goal.progress ?? 0) + 10))}
              aria-label="Aumentar progresso"
            >
              +
            </button>
          </div>
        </div>
      )}

      {goal.progressType === "checklist" && (
        <ul className="goal-checklist">
          {steps.map((s) => (
            <li key={s.id}>
              <label className="goal-step">
                <input
                  type="checkbox"
                  checked={s.completed}
                  onChange={() => onToggleStep(s.id)}
                />
                <span className="goal-step-box" aria-hidden>
                  ✓
                </span>
                <span className={s.completed ? "goal-step-done" : ""}>{s.title}</span>
              </label>
            </li>
          ))}
        </ul>
      )}

      {goal.progressType === "narrative" && (
        <p className="goal-narrative">{goal.description}</p>
      )}
    </article>
  );
}
