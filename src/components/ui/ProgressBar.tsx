import "./ProgressBar.css";

export default function ProgressBar({
  value,
  accent = "var(--accent)",
  showLabel = true,
}: {
  value: number;
  accent?: string;
  showLabel?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="progress">
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${clamped}%`, ["--bar" as string]: accent }}
        />
      </div>
      {showLabel && <span className="progress-value">{clamped}%</span>}
    </div>
  );
}
