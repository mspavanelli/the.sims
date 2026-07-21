import "./TraitBadge.css";

export default function TraitBadge({
  label,
  emoji,
  accent = "var(--accent)",
}: {
  label: string;
  emoji?: string;
  accent?: string;
}) {
  return (
    <span className="trait-badge" style={{ ["--tb" as string]: accent }}>
      {emoji && (
        <span className="trait-badge-emoji" aria-hidden>
          {emoji}
        </span>
      )}
      {label}
    </span>
  );
}
