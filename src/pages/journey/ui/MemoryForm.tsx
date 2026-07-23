import { useEffect, useState } from "react";
import type { Memory } from "@/entities/relationship";
import { newId } from "@/shared/lib";
import { Field, Modal, TagInput } from "@/shared/ui";

type Props = {
  open: boolean;
  memory?: Memory | null;
  onClose: () => void;
  onSave: (memory: Memory) => void;
};

function blank(): Memory {
  return {
    id: newId(),
    title: "",
    date: new Date().toISOString().slice(0, 10),
    emoji: "📸",
    tags: [],
  };
}

export default function MemoryForm({ open, memory, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Memory>(blank);

  useEffect(() => {
    if (open) setDraft(memory ? { ...memory } : blank());
  }, [open, memory]);

  const set = <K extends keyof Memory>(key: K, value: Memory[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim() || !draft.date) return;
    onSave({ ...draft, title: draft.title.trim() });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={memory ? "Editar memória" : "Nova memória"}
      emoji="🧭"
      footer={
        <>
          {(!draft.title.trim() || !draft.date) && (
            <span className="form-why">Falta o título ou a data</span>
          )}
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={!draft.title.trim() || !draft.date}
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
            placeholder="O que aconteceu?"
          />
        </Field>

        <div className="form-grid cols-2">
          <Field label="Data">
            <input
              className="input"
              type="date"
              value={draft.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </Field>
          <Field label="Emoji" hint="Mostrado quando não há foto">
            <input
              className="input"
              value={draft.emoji ?? ""}
              onChange={(e) => set("emoji", e.target.value)}
              placeholder="🎶"
              maxLength={4}
            />
          </Field>
        </div>

        <div className="form-grid cols-2">
          <Field label="Local (opcional)">
            <input
              className="input"
              value={draft.location ?? ""}
              onChange={(e) => set("location", e.target.value || undefined)}
              placeholder="Onde foi?"
            />
          </Field>
          <Field label="Categoria (opcional)">
            <input
              className="input"
              value={draft.category ?? ""}
              onChange={(e) => set("category", e.target.value || undefined)}
              placeholder="Viagem, Música…"
            />
          </Field>
        </div>

        <Field label="Foto (URL, opcional)">
          <input
            className="input"
            value={draft.image ?? ""}
            onChange={(e) => set("image", e.target.value || undefined)}
            placeholder="https://…"
          />
        </Field>

        <Field label="Descrição (opcional)">
          <textarea
            className="textarea"
            value={draft.description ?? ""}
            onChange={(e) => set("description", e.target.value || undefined)}
            placeholder="Conta um pouquinho desse momento…"
          />
        </Field>

        <Field label="Tags">
          <TagInput
            values={draft.tags}
            onChange={(v) => set("tags", v)}
            accent="var(--c-blue-500)"
            placeholder="Adicione uma tag e aperte Enter"
          />
        </Field>
      </div>
    </Modal>
  );
}
