import { useEffect, useState } from "react";
import type { Mission } from "../../types";
import { newId } from "../../lib/id";
import Modal from "../ui/Modal";
import { ChoicePills, Field } from "../ui/Field";
import StepsEditor from "../ui/StepsEditor";
import {
  missionCategories,
  missionCategoryMeta,
  missionStatusMeta,
  missionStatuses,
} from "../../lib/labels";

type Props = {
  open: boolean;
  mission?: Mission | null;
  onClose: () => void;
  onSave: (mission: Mission) => void;
};

function blank(): Mission {
  return {
    id: newId(),
    title: "",
    category: "encontro",
    status: "idea",
    steps: [],
  };
}

export default function MissionForm({ open, mission, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Mission>(blank);

  useEffect(() => {
    if (open) setDraft(mission ? { ...mission, steps: mission.steps ?? [] } : blank());
  }, [open, mission]);

  const set = <K extends keyof Mission>(key: K, value: Mission[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim()) return;
    const steps = draft.steps && draft.steps.length > 0 ? draft.steps : undefined;
    onSave({ ...draft, title: draft.title.trim(), steps });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mission ? "Editar missão" : "Nova missão"}
      emoji="🎯"
      footer={
        <>
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
            placeholder="O que vamos aprontar juntos?"
          />
        </Field>

        <Field label="Categoria">
          <ChoicePills
            value={draft.category}
            onChange={(v) => set("category", v)}
            options={missionCategories.map((c) => ({
              value: c,
              label: missionCategoryMeta[c].label,
              emoji: missionCategoryMeta[c].emoji,
              color: missionCategoryMeta[c].color,
            }))}
          />
        </Field>

        <Field label="Status">
          <ChoicePills
            value={draft.status}
            onChange={(v) => set("status", v)}
            options={missionStatuses.map((s) => ({
              value: s,
              label: missionStatusMeta[s].label,
              emoji: missionStatusMeta[s].emoji,
              color: missionStatusMeta[s].color,
            }))}
          />
        </Field>

        <Field label="Data (opcional)">
          <input
            className="input"
            type="date"
            value={draft.date ?? ""}
            onChange={(e) => set("date", e.target.value || undefined)}
          />
        </Field>

        <Field label="Descrição (opcional)">
          <textarea
            className="textarea"
            value={draft.description ?? ""}
            onChange={(e) => set("description", e.target.value || undefined)}
            placeholder="Detalhes, ideias, o clima da missão…"
          />
        </Field>

        <Field label="Checklist (opcional)">
          <StepsEditor
            steps={draft.steps ?? []}
            onChange={(steps) => set("steps", steps)}
          />
        </Field>
      </div>
    </Modal>
  );
}
