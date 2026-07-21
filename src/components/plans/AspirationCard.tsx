import type { Aspiration } from "../../types";
import "./AspirationCard.css";

export default function AspirationCard({
  aspiration,
  onEdit,
  onDelete,
}: {
  aspiration: Aspiration;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="aspiration-card card-hover">
      <div className="aspiration-emoji" aria-hidden>
        {aspiration.emoji ?? "✨"}
      </div>
      <div className="grow">
        <h3 className="aspiration-title">{aspiration.title}</h3>
        {aspiration.description && (
          <p className="muted aspiration-desc">{aspiration.description}</p>
        )}
      </div>
      <div className="aspiration-actions">
        <button className="btn-icon" onClick={onEdit} aria-label="Editar aspiração">
          ✎
        </button>
        <button className="btn-icon" onClick={onDelete} aria-label="Remover aspiração">
          🗑
        </button>
      </div>
    </article>
  );
}
