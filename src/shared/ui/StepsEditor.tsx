import { useState } from "react";
import { newId } from "@/shared/lib";
import "./StepsEditor.css";

type ChecklistStep = {
  id: string;
  title: string;
  completed: boolean;
};

export default function StepsEditor({
  steps,
  onChange,
}: {
  steps: ChecklistStep[];
  onChange: (next: ChecklistStep[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    onChange([...steps, { id: newId(), title: v, completed: false }]);
    setDraft("");
  };
  const toggle = (id: string) =>
    onChange(
      steps.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
    );
  const remove = (id: string) => onChange(steps.filter((s) => s.id !== id));

  return (
    <div className="steps-editor">
      {steps.length > 0 && (
        <ul className="steps-editor-list">
          {steps.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={s.completed}
                className={"steps-editor-check" + (s.completed ? " is-on" : "")}
                onClick={() => toggle(s.id)}
                aria-label={s.title}
              >
                ✓
              </button>
              <span className={s.completed ? "steps-editor-done" : ""}>
                {s.title}
              </span>
              <button
                type="button"
                className="steps-editor-remove"
                onClick={() => remove(s.id)}
                aria-label={`Remover ${s.title}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="steps-editor-row">
        <input
          className="input"
          value={draft}
          placeholder="Novo passinho…"
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
