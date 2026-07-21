import {
  conversationSensitivityMeta,
  conversationStatusMeta,
  type Conversation,
} from "@/entities/relationship";
import "./ConversationCard.css";

export default function ConversationCard({
  conversation,
  featured,
  onEdit,
  onDelete,
  onToggleFeatured,
}: {
  conversation: Conversation;
  featured: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
}) {
  const stat = conversationStatusMeta[conversation.status];
  const sens = conversationSensitivityMeta[conversation.sensitivity];

  return (
    <article
      className={"conversation-card panel" + (featured ? " is-featured" : "")}
      style={{ ["--st" as string]: stat.color }}
    >
      <div className="conversation-head">
        <div className="row wrap gap-2">
          <span className="conversation-status">
            {stat.emoji} {stat.label}
          </span>
          <span
            className="conversation-sens"
            style={{ ["--se" as string]: sens.color }}
          >
            {sens.emoji} {sens.label}
          </span>
        </div>
        <button
          className={"conversation-star" + (featured ? " is-on" : "")}
          onClick={onToggleFeatured}
          aria-label={featured ? "Remover destaque" : "Destacar no Início"}
          title={featured ? "Em destaque no Início" : "Destacar no Início"}
        >
          {featured ? "★" : "☆"}
        </button>
      </div>

      <h3 className="conversation-title">{conversation.title}</h3>
      {conversation.context && (
        <p className="muted conversation-context">{conversation.context}</p>
      )}

      {conversation.topics.length > 0 && (
        <ul className="conversation-topics">
          {conversation.topics.map((t) => (
            <li key={t}>💬 {t}</li>
          ))}
        </ul>
      )}

      <div className="conversation-actions">
        <button className="btn btn-ghost btn-sm" onClick={onEdit}>
          ✎ Editar
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          🗑
        </button>
      </div>
    </article>
  );
}
