import "./PageHeader.css";

export default function PageHeader({
  emoji,
  title,
  subtitle,
  action,
}: {
  emoji: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="page-header-text">
        <span className="page-header-emoji" aria-hidden>
          {emoji}
        </span>
        <div>
          <h1 className="page-header-title">{title}</h1>
          {subtitle && <p className="page-header-subtitle muted">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="page-header-action">{action}</div>}
    </header>
  );
}
