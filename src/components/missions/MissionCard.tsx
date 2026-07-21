import type { Mission, MissionStatus } from "../../types";
import CategoryPill from "../ui/CategoryPill";
import {
  formatDate,
  missionCategoryMeta,
  missionStatusMeta,
} from "../../lib/labels";
import { burstConfetti } from "../../lib/confetti";
import "./MissionCard.css";

export default function MissionCard({
  mission,
  onEdit,
  onToggleStep,
  onSetStatus,
  onDelete,
}: {
  mission: Mission;
  onEdit: () => void;
  onToggleStep: (stepId: string) => void;
  onSetStatus: (status: MissionStatus) => void;
  onDelete: () => void;
}) {
  const cat = missionCategoryMeta[mission.category];
  const stat = missionStatusMeta[mission.status];
  const isCompleted = mission.status === "completed";
  const isArchived = mission.status === "archived";
  const steps = mission.steps ?? [];
  const done = steps.filter((s) => s.completed).length;

  return (
    <article
      className={
        "mission-card panel card-hover" +
        (isCompleted ? " is-completed" : "") +
        (isArchived ? " is-archived" : "")
      }
      style={{ ["--cat" as string]: cat.color }}
    >
      <div className="mission-card-head">
        <div className="row wrap gap-2">
          <CategoryPill label={cat.label} emoji={cat.emoji} color={cat.color} />
          <span className="mission-status" style={{ ["--st" as string]: stat.color }}>
            {stat.emoji} {stat.label}
          </span>
        </div>
        <button className="btn-icon" onClick={onEdit} aria-label="Editar missão">
          ✎
        </button>
      </div>

      <h3 className="mission-card-title">{mission.title}</h3>
      {mission.date && (
        <span className="mission-card-date">📅 {formatDate(mission.date)}</span>
      )}
      {mission.description && (
        <p className="mission-card-desc muted">{mission.description}</p>
      )}

      {steps.length > 0 && (
        <div className="mission-steps">
          <span className="mission-steps-count">
            🎈 {done}/{steps.length} passinhos
          </span>
          <ul>
            {steps.map((s) => (
              <li key={s.id}>
                <label className="mission-step">
                  <input
                    type="checkbox"
                    checked={s.completed}
                    onChange={() => onToggleStep(s.id)}
                  />
                  <span className="mission-step-box" aria-hidden>
                    ✓
                  </span>
                  <span className={s.completed ? "mission-step-done" : ""}>
                    {s.title}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mission-card-actions">
        {!isCompleted && (
          <button
            className="btn btn-soft btn-sm"
            onClick={(e) => {
              burstConfetti(e.currentTarget);
              onSetStatus("completed");
            }}
          >
            🌟 Concluir
          </button>
        )}
        {isCompleted && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onSetStatus("planned")}
          >
            ↩︎ Reabrir
          </button>
        )}
        {!isArchived ? (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onSetStatus("archived")}
          >
            🗂️ Guardar
          </button>
        ) : (
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onSetStatus("idea")}
          >
            ↩︎ Retomar
          </button>
        )}
        <button
          className="btn btn-danger btn-sm mission-delete"
          onClick={onDelete}
          aria-label="Remover missão"
        >
          🗑
        </button>
      </div>
    </article>
  );
}
