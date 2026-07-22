import { useState, type ReactNode } from "react";
import "./Field.css";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

type TagInputProps = {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  accent?: string;
};

/** Entrada de chips para campos que são arrays de texto (traços, tags, tópicos...). */
export function TagInput({
  values,
  onChange,
  placeholder = "Escreva e aperte Enter",
  accent = "var(--accent)",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (!values.includes(v)) onChange([...values, v]);
    setDraft("");
  };

  const remove = (v: string) => onChange(values.filter((x) => x !== v));

  return (
    <div className="tag-input" style={{ ["--tag-accent" as string]: accent }}>
      <div className="tag-input-chips">
        {values.map((v) => (
          <span key={v} className="tag-input-chip">
            {v}
            <button
              type="button"
              onClick={() => remove(v)}
              aria-label={`Remover ${v}`}
            >
              ✕
            </button>
          </span>
        ))}
      </div>
      <div className="tag-input-row">
        <input
          className="input"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button type="button" className="btn btn-soft btn-sm" onClick={add}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

type ChoiceOption<T extends string> = { value: T; label: string; emoji?: string; color?: string };

export function ChoicePills<T extends string>({
  options,
  value,
  onChange,
}: {
  options: ChoiceOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  // radiogroup em vez de um punhado de botões: o leitor de tela anuncia
  // "1 de 4, marcado" em vez de só ler os rótulos soltos.
  return (
    <div className="choice-row" role="radiogroup">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={opt.value === value}
          className={"choice" + (opt.value === value ? " is-on" : "")}
          style={{ ["--choice-accent" as string]: opt.color ?? "var(--accent)" }}
          onClick={() => onChange(opt.value)}
        >
          {opt.emoji && <span aria-hidden>{opt.emoji}</span>}
          {opt.label}
        </button>
      ))}
    </div>
  );
}
