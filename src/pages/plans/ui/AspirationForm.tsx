import { useEffect, useState } from "react";
import type { Aspiration } from "@/entities/relationship";
import { newId } from "@/shared/lib";
import { Field, Modal } from "@/shared/ui";

type Props = {
  open: boolean;
  aspiration?: Aspiration | null;
  onClose: () => void;
  onSave: (aspiration: Aspiration) => void;
};

function blank(): Aspiration {
  return { id: newId(), title: "", emoji: "✨" };
}

export default function AspirationForm({ open, aspiration, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Aspiration>(blank);

  useEffect(() => {
    if (open) setDraft(aspiration ? { ...aspiration } : blank());
  }, [open, aspiration]);

  const set = <K extends keyof Aspiration>(key: K, value: Aspiration[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.title.trim()) return;
    onSave({ ...draft, title: draft.title.trim() });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={aspiration ? "Editar aspiração" : "Nova aspiração"}
      emoji="🌟"
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
        <div className="form-grid cols-2">
          <Field label="Emoji">
            <input
              className="input"
              value={draft.emoji ?? ""}
              onChange={(e) => set("emoji", e.target.value)}
              placeholder="🧭"
              maxLength={4}
            />
          </Field>
          <Field label="Título">
            <input
              className="input"
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Um desejo aberto para o futuro"
            />
          </Field>
        </div>
        <Field label="Descrição (opcional)">
          <textarea
            className="textarea"
            value={draft.description ?? ""}
            onChange={(e) => set("description", e.target.value || undefined)}
            placeholder="Sem prazo, sem porcentagem — só vontade."
          />
        </Field>
      </div>
    </Modal>
  );
}
