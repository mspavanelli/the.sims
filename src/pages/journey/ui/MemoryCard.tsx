import { formatDate, type Memory } from "@/entities/relationship";
import "./MemoryCard.css";

export default function MemoryCard({
  memory,
  onEdit,
  onDelete,
}: {
  memory: Memory;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="memory-card panel card-hover">
      {memory.image ? (
        <div className="memory-card-photo">
          <img src={memory.image} alt="" />
        </div>
      ) : (
        <div className="memory-card-emoji" aria-hidden>
          {memory.emoji ?? "📸"}
        </div>
      )}

      <div className="memory-card-body">
        <div className="row between gap-2">
          <span className="memory-card-date">📅 {formatDate(memory.date)}</span>
          <div className="memory-card-actions">
            <button className="btn-icon" onClick={onEdit} aria-label={`Editar a memória ${memory.title}`}>
              ✎
            </button>
            <button className="btn-icon" onClick={onDelete} aria-label={`Remover a memória ${memory.title}`}>
              🗑
            </button>
          </div>
        </div>

        <h3 className="memory-card-title">{memory.title}</h3>

        {memory.location && (
          <span className="memory-card-loc muted">📍 {memory.location}</span>
        )}
        {memory.description && (
          <p className="memory-card-desc muted">{memory.description}</p>
        )}

        {(memory.category || memory.tags.length > 0) && (
          <div className="memory-card-tags">
            {memory.category && (
              <span className="chip memory-card-cat">{memory.category}</span>
            )}
            {memory.tags.map((t) => (
              <span key={t} className="memory-card-tag">
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
