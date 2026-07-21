import "./EmptyState.css";

export default function EmptyState({
  emoji = "🌷",
  title,
  message,
  action,
}: {
  emoji?: string;
  title: string;
  message?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-emoji float" aria-hidden>
        {emoji}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      {message && <p className="empty-state-msg muted">{message}</p>}
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
}
