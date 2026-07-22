import "./CategoryPill.css";

export default function CategoryPill({
  label,
  emoji,
  color = "var(--accent)",
  active = false,
  onClick,
}: {
  label: string;
  emoji?: string;
  color?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  const className = "category-pill" + (active ? " is-active" : "");
  const style = { ["--cp" as string]: color } as React.CSSProperties;

  if (onClick) {
    return (
      <button
        type="button"
        className={className}
        style={style}
        aria-pressed={active}
        onClick={onClick}
      >
        {emoji && <span aria-hidden>{emoji}</span>}
        {label}
      </button>
    );
  }

  return (
    <span className={className} style={style}>
      {emoji && <span aria-hidden>{emoji}</span>}
      {label}
    </span>
  );
}
