import { useEffect, useState } from "react";
import type { Character } from "../../types";
import { newId } from "../../lib/id";
import Modal from "../ui/Modal";
import { Field, TagInput } from "../ui/Field";

type Props = {
  open: boolean;
  character?: Character | null;
  onClose: () => void;
  onSave: (character: Character) => void;
};

function blank(): Character {
  return {
    id: newId(),
    name: "",
    emoji: "",
    traits: [],
    interests: [],
    likes: [],
    quirks: [],
    affectionStyles: [],
    energySources: [],
    energyDrains: [],
    aspirations: [],
  };
}

export default function CharacterForm({ open, character, onClose, onSave }: Props) {
  const [draft, setDraft] = useState<Character>(blank);

  useEffect(() => {
    if (open) setDraft(character ? { ...character } : blank());
  }, [open, character]);

  const set = <K extends keyof Character>(key: K, value: Character[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = () => {
    if (!draft.name.trim()) return;
    onSave({ ...draft, name: draft.name.trim() });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={character ? "Editar personagem" : "Novo personagem"}
      emoji="🧑‍🎨"
      footer={
        <>
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={submit} disabled={!draft.name.trim()}>
            Salvar
          </button>
        </>
      }
    >
      <div className="form-grid">
        <div className="form-grid cols-2">
          <Field label="Nome">
            <input
              className="input"
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Como essa pessoa se chama?"
            />
          </Field>
          <Field label="Emoji / símbolo" hint="Usado no avatar se não houver foto">
            <input
              className="input"
              value={draft.emoji ?? ""}
              onChange={(e) => set("emoji", e.target.value)}
              placeholder="🌻"
              maxLength={4}
            />
          </Field>
        </div>

        <div className="form-grid cols-2">
          <Field label="Idade (opcional)">
            <input
              className="input"
              type="number"
              value={draft.age ?? ""}
              onChange={(e) =>
                set("age", e.target.value ? Number(e.target.value) : undefined)
              }
              placeholder="—"
            />
          </Field>
          <Field label="Foto (URL, opcional)">
            <input
              className="input"
              value={draft.image ?? ""}
              onChange={(e) => set("image", e.target.value || undefined)}
              placeholder="https://…"
            />
          </Field>
        </div>

        <Field label="Frase de destaque (opcional)">
          <input
            className="input"
            value={draft.tagline ?? ""}
            onChange={(e) => set("tagline", e.target.value || undefined)}
            placeholder="Uma frase que resume essa pessoa"
          />
        </Field>

        <Field label="Quem é essa pessoa" hint="Uma descrição humana, sem depender de rótulos">
          <textarea
            className="textarea"
            value={draft.bio ?? ""}
            onChange={(e) => set("bio", e.target.value || undefined)}
            placeholder="Constrói mapas mentais de tudo, gosta de conectar ideias improváveis…"
          />
        </Field>

        <div className="form-grid cols-2">
          <Field label="Hoje — humor do momento" hint="Estado editável, pura ambientação">
            <div className="row gap-2">
              <input
                className="input"
                style={{ width: 64, textAlign: "center" }}
                value={draft.today?.emoji ?? ""}
                onChange={(e) =>
                  set("today", {
                    emoji: e.target.value,
                    text: draft.today?.text ?? "",
                  })
                }
                placeholder="☕"
                maxLength={4}
                aria-label="Emoji do humor de hoje"
              />
              <input
                className="input grow"
                value={draft.today?.text ?? ""}
                onChange={(e) => {
                  const text = e.target.value;
                  set(
                    "today",
                    text || draft.today?.emoji
                      ? { emoji: draft.today?.emoji ?? "", text }
                      : undefined,
                  );
                }}
                placeholder="com vontade de sushi"
              />
            </div>
          </Field>
          <Field label="MBTI (opcional)" hint="Só um detalhe pequeno">
            <input
              className="input"
              value={draft.mbti ?? ""}
              onChange={(e) => set("mbti", e.target.value.toUpperCase() || undefined)}
              placeholder="INTP"
              maxLength={4}
            />
          </Field>
        </div>

        <Field label="Traços de personalidade">
          <TagInput
            values={draft.traits}
            onChange={(v) => set("traits", v)}
            accent="var(--c-plum-500)"
          />
        </Field>
        <Field label="Interesses">
          <TagInput
            values={draft.interests}
            onChange={(v) => set("interests", v)}
            accent="var(--c-blue-500)"
          />
        </Field>
        <Field label="Gostos">
          <TagInput
            values={draft.likes}
            onChange={(v) => set("likes", v)}
            accent="var(--c-green-500)"
          />
        </Field>
        <Field label="Curiosidades" hint="Pequenos detalhes que fazem essa pessoa">
          <TagInput
            values={draft.quirks}
            onChange={(v) => set("quirks", v)}
            accent="var(--c-amber-400)"
          />
        </Field>
        <Field label="Formas preferidas de afeto">
          <TagInput
            values={draft.affectionStyles}
            onChange={(v) => set("affectionStyles", v)}
            accent="var(--c-coral-500)"
          />
        </Field>
        <Field label="O que dá energia">
          <TagInput
            values={draft.energySources}
            onChange={(v) => set("energySources", v)}
            accent="var(--c-green-600)"
          />
        </Field>
        <Field label="O que drena a energia">
          <TagInput
            values={draft.energyDrains}
            onChange={(v) => set("energyDrains", v)}
            accent="var(--c-coral-500)"
          />
        </Field>
        <Field label="Aspirações pessoais">
          <TagInput
            values={draft.aspirations}
            onChange={(v) => set("aspirations", v)}
            accent="var(--c-plum-400)"
          />
        </Field>
      </div>
    </Modal>
  );
}
