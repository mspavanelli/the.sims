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
      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill"
          style={{
            transform: `translateX(${clamped - 100}%)`,
            ["--bar" as string]: accent,
          }}
        />
      </div>
      {showLabel && <span className="progress-value">{clamped}%</span>}
    </div>
  );
}
