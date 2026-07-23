import { useEffect, useState } from "react";
import {
  conversationSensitivities,
  conversationSensitivityMeta,
  conversationStatusMeta,
  conversationStatuses,
  type Conversation,
} from "@/entities/relationship";
import { newId } from "@/shared/lib";
import { ChoicePills, Field, Modal, TagInput } from "@/shared/ui";

type Props = {
  open: boolean;
  conversation?: Conversation | null;
  onClose: () => void;
  onSave: (conversation: Conversation) => void;
};

function blank(): Conversation {
  return {
    id: newId(),
    title: "",
    topics: [],
    sensitivity: "light",
    status: "horizon",
  };
}

export default function ConversationForm({
  open,
  conversation,
  onClose,
  onSave,
}: Props) {
  const [draft, setDraft] = useState<Conversation>(blank);

  useEffect(() => {
    if (open) setDraft(conversation ? { ...conversation } : blank());
  }, [open, conversation]);

  const set = <K extends keyof Conversation>(key: K, value: Conversation[K]) =>
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
      title={conversation ? "Editar carta" : "Nova carta"}
      emoji="💌"
      footer={
        <>
          {(!draft.title.trim()) && (
            <span className="form-why">Falta o título da carta</span>
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
            placeholder="Sobre o que vocês querem conversar?"
          />
        </Field>

        <Field label="Contexto (opcional)">
          <textarea
            className="textarea"
            value={draft.context ?? ""}
            onChange={(e) => set("context", e.target.value || undefined)}
            placeholder="Por que essa carta está esperando para ser aberta?"
          />
        </Field>

        <Field label="Perguntas ou tópicos">
          <TagInput
            values={draft.topics}
            onChange={(v) => set("topics", v)}
            accent="var(--c-blue-500)"
            placeholder="Adicione um tópico e aperte Enter"
          />
        </Field>

        <Field label="Sensibilidade">
          <ChoicePills
            value={draft.sensitivity}
            onChange={(v) => set("sensitivity", v)}
            options={conversationSensitivities.map((s) => ({
              value: s,
              label: conversationSensitivityMeta[s].label,
              emoji: conversationSensitivityMeta[s].emoji,
              color: conversationSensitivityMeta[s].color,
            }))}
          />
        </Field>

        <Field label="Status">
          <ChoicePills
            value={draft.status}
            onChange={(v) => set("status", v)}
            options={conversationStatuses.map((s) => ({
              value: s,
              label: conversationStatusMeta[s].label,
              emoji: conversationStatusMeta[s].emoji,
              color: conversationStatusMeta[s].color,
            }))}
          />
        </Field>
      </div>
    </Modal>
  );
}
