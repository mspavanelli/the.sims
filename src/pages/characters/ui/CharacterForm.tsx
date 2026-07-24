import { useEffect, useState } from "react";
import type { Character, LoveLanguage } from "@/entities/relationship";
import { Field, Modal, TagInput } from "@/shared/ui";

type Props = {
  open: boolean;
  character: Character | null;
  onClose: () => void;
  onSave: (character: Character) => void;
};

const languageFields: Array<{ key: LoveLanguage; label: string }> = [
  { key: "words", label: "💬 palavras de afirmação" },
  { key: "qualityTime", label: "🫶 tempo de qualidade" },
  { key: "gifts", label: "🎁 receber presentes" },
  { key: "actsOfService", label: "🧺 atos de serviço" },
  { key: "physicalTouch", label: "🤍 toque físico" },
];

export default function CharacterForm({
  open,
  character,
  onClose,
  onSave,
}: Props) {
  const [draft, setDraft] = useState<Character | null>(character);

  useEffect(() => {
    if (open) setDraft(character ? { ...character } : null);
  }, [open, character]);

  const set = <K extends keyof Character>(key: K, value: Character[K]) =>
    setDraft((current) => (current ? { ...current, [key]: value } : current));
  const setScore = (key: LoveLanguage, value: number) =>
    set("loveLanguages", {
      ...draft?.loveLanguages,
      [key]: value as 1 | 2 | 3 | 4 | 5,
    });
  const submit = () => {
    if (!draft?.name.trim()) return;
    onSave({ ...draft, name: draft.name.trim() });
    onClose();
  };

  if (!draft) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Editar ${draft.name}`}
      emoji={draft.emoji || "🧑‍🎨"}
      footer={
        <>
          {!draft.name.trim() && (
            <span className="form-why">Falta o nome do personagem</span>
          )}
          <button className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={submit}
            disabled={!draft.name.trim()}
          >
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
            />
          </Field>
          <Field label="Símbolo">
            <input
              className="input"
              value={draft.emoji ?? ""}
              onChange={(e) => set("emoji", e.target.value || undefined)}
              placeholder="🌻"
              maxLength={4}
            />
          </Field>
        </div>
        <Field label="Foto">
          <input
            className="input"
            value={draft.image ?? ""}
            onChange={(e) => set("image", e.target.value || undefined)}
            placeholder="URL da foto"
          />
        </Field>
        <Field label="Frase de destaque">
          <input
            className="input"
            value={draft.tagline ?? ""}
            onChange={(e) => set("tagline", e.target.value || undefined)}
            placeholder="Uma frase que resume essa pessoa"
          />
        </Field>
        <div className="form-grid cols-2">
          <Field label="Idade">
            <input
              className="input"
              type="number"
              value={draft.age ?? ""}
              onChange={(e) =>
                set("age", e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </Field>
          <Field label="Tipo psicológico">
            <input
              className="input"
              value={draft.mbti ?? ""}
              onChange={(e) =>
                set("mbti", e.target.value.toUpperCase() || undefined)
              }
              placeholder="INTP"
              maxLength={8}
            />
          </Field>
        </div>
        <Field label="Altura">
          <input
            className="input"
            value={draft.height ?? ""}
            onChange={(e) => set("height", e.target.value || undefined)}
            placeholder="ex.: 1,72 m"
          />
        </Field>
        <Field label="Moodlet de hoje">
          <div className="row gap-2">
            <input
              className="input"
              value={draft.today?.emoji ?? ""}
              onChange={(e) =>
                set("today", {
                  emoji: e.target.value,
                  text: draft.today?.text ?? "",
                })
              }
              placeholder="✨"
              maxLength={4}
              aria-label="Emoji do moodlet"
            />
            <input
              className="input grow"
              value={draft.today?.text ?? ""}
              onChange={(e) =>
                set(
                  "today",
                  e.target.value || draft.today?.emoji
                    ? { emoji: draft.today?.emoji ?? "", text: e.target.value }
                    : undefined,
                )
              }
              placeholder="como está hoje?"
            />
          </div>
        </Field>
        <Field label="Traços de sim">
          <TagInput
            values={draft.traits}
            onChange={(v) => set("traits", v)}
            accent="var(--c-plum-500)"
          />
        </Field>
        <Field label="Desejos do save">
          <TagInput
            values={draft.aspirations}
            onChange={(v) => set("aspirations", v)}
            accent="var(--c-amber-400)"
          />
        </Field>
        <Field label="Bandas favoritas">
          <TagInput
            values={draft.soundtrack ?? []}
            onChange={(v) => set("soundtrack", v)}
            accent="var(--c-blue-500)"
            placeholder="Escreva uma banda e aperte Enter"
          />
        </Field>
        <Field label="Livros que está lendo">
          <TagInput
            values={draft.currentReads ?? []}
            onChange={(v) => set("currentReads", v)}
            accent="var(--c-green-600)"
            placeholder="Escreva um livro e aperte Enter"
          />
        </Field>
        <div className="love-language-fields">
          <span className="field-label">Mapa de carinho</span>
          {languageFields.map((language) => {
            const selectedScore = draft.loveLanguages?.[language.key] ?? 3;
            return (
              <div key={language.key} className="love-language-field">
                <span>{language.label}</span>
                <div
                  className="love-score-hearts"
                  role="group"
                  aria-label={language.label}
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <button
                      key={score}
                      type="button"
                      className={
                        score <= selectedScore ? "is-selected" : undefined
                      }
                      onClick={() => setScore(language.key, score)}
                      aria-label={`${score} de 5`}
                      aria-pressed={score === selectedScore}
                      title={`${score} de 5`}
                    >
                      {score <= selectedScore ? "♥" : "♡"}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
