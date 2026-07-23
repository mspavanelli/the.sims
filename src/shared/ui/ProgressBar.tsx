import "./ProgressBar.css";

export default function ProgressBar({
  value,
  accent = "var(--accent)",
  showLabel = true,
  label,
}: {
  value: number;
  accent?: string;
  showLabel?: boolean;
  /** De que é esse progresso. Sem isto o leitor de tela anuncia "62%" e mais nada. */
  label?: string;
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
        aria-valuetext={`${clamped}%`}
        aria-label={label ? `Progresso de ${label}` : "Progresso"}
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
