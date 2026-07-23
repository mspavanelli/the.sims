import { useEffect, useState } from "react";
import {
  goalHorizonMeta,
  goalHorizons,
  type Goal,
  type GoalProgressType,
} from "@/entities/relationship";
import { newId } from "@/shared/lib";
import { ChoicePills, Field, Modal, StepsEditor } from "@/shared/ui";

type Props = {
  open: boolean;
  goal?: Goal | null;
  onClose: () => void;
  onSave: (goal: Goal) => void;
};

const progressOptions: { value: GoalProgressType; label: string; emoji: string }[] = [
  { value: "percentage", label: "Barra de progresso", emoji: "📊" },
  { value: "checklist", label: "Checklist", emoji: "✅" },
  { value: "narrative", label: "Narrativa", emoji: "✍️" },
];

function blank(): Goal {
  return {
    id: newId(),
    title: "",
    horizon: "short",
    progressType: "percentage",
    progress: 0,
    steps: [],
    description: "",
  };
}

export default function GoalForm({ open, goal, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Goal>(blank);

  useEffect(() => {
    if (open) setDraft(goal ? { ...goal, steps: goal.steps ?? [] } : blank());
  }, [open, goal]);

  const set = <K extends keyof Goal>(key: K, value: Goal[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim()) return;
    const cleaned: Goal = {
      ...draft,
      title: draft.title.trim(),
      progress: draft.progressType === "percentage" ? draft.progress ?? 0 : undefined,
      steps:
        draft.progressType === "checklist" ? draft.steps ?? [] : undefined,
      description: draft.description?.trim() || undefined,
    };
    onSave(cleaned);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={goal ? "Editar meta" : "Nova meta"}
      emoji="🎈"
      footer={
        <>
          {(!draft.title.trim()) && (
            <span className="form-why">Falta o título da meta</span>
          )}
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={!draft.title.trim()}
          >
            Salvar
          </button>
        </>
      }
    >
      <div className="form-grid">
        <Field label="Título">
          <input
            className="input"
            value={draft.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="O que vocês querem alcançar?"
          />
        </Field>

        <Field label="Horizonte">
          <ChoicePills
            value={draft.horizon}
            onChange={(v) => set("horizon", v)}
            options={goalHorizons.map((h) => ({
              value: h,
              label: goalHorizonMeta[h].label,
              emoji: goalHorizonMeta[h].emoji,
              color: goalHorizonMeta[h].color,
            }))}
          />
        </Field>

        <Field label="Como acompanhar">
          <ChoicePills
            value={draft.progressType}
            onChange={(v) => set("progressType", v)}
            options={progressOptions}
          />
        </Field>

        {draft.progressType === "percentage" && (
          <Field label={`Progresso · ${draft.progress ?? 0}%`}>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={draft.progress ?? 0}
              onChange={(e) => set("progress", Number(e.target.value))}
              className="goal-range"
            />
          </Field>
        )}

        {draft.progressType === "checklist" && (
          <Field label="Checklist">
            <StepsEditor
              steps={draft.steps ?? []}
              onChange={(steps) => set("steps", steps)}
            />
          </Field>
        )}

        <Field
          label={
            draft.progressType === "narrative" ? "Texto narrativo" : "Descrição (opcional)"
          }
        >
          <textarea
            className="textarea"
            value={draft.description ?? ""}
            onChange={(e) => set("description", e.target.value)}
            placeholder={
              draft.progressType === "narrative"
                ? "Descreva a meta em palavras, sem porcentagem…"
                : "Contexto, motivação…"
            }
          />
        </Field>
      </div>
    </Modal>
  );
}
