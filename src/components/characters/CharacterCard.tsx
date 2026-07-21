import type { Character } from "../../types";
import Avatar from "../ui/Avatar";
import TraitBadge from "../ui/TraitBadge";
import "./CharacterCard.css";

const sections: Array<{
  key: keyof Character;
  label: string;
  emoji: string;
  accent: string;
}> = [
  { key: "traits", label: "Traços", emoji: "🎭", accent: "var(--c-plum-500)" },
  { key: "interests", label: "Interesses", emoji: "🎨", accent: "var(--c-blue-500)" },
  { key: "likes", label: "Gostos", emoji: "💚", accent: "var(--c-green-500)" },
  { key: "quirks", label: "Peculiaridades", emoji: "🌀", accent: "var(--c-amber-400)" },
  { key: "affectionStyles", label: "Formas de afeto", emoji: "🤍", accent: "var(--c-coral-500)" },
  { key: "energySources", label: "Fontes de energia", emoji: "⚡", accent: "var(--c-blue-600)" },
  { key: "aspirations", label: "Aspirações pessoais", emoji: "✨", accent: "var(--c-plum-400)" },
];

export default function CharacterCard({
  character,
  onEdit,
}: {
  character: Character;
  onEdit: () => void;
}) {
  return (
    <article className="character-card panel">
      <div className="character-card-top">
        <Avatar
          name={character.name}
          emoji={character.emoji}
          image={character.image}
          size={92}
        />
        <div className="grow">
          <div className="row between gap-2">
            <h2 className="character-card-name">{character.name}</h2>
            <button className="btn-icon" onClick={onEdit} aria-label="Editar personagem">
              ✎
            </button>
          </div>
          {character.age != null && (
            <span className="chip character-card-age">🎂 {character.age} anos</span>
          )}
          {character.tagline && (
            <p className="character-card-tagline muted">{character.tagline}</p>
          )}
        </div>
      </div>

      <div className="character-card-sections">
        {sections.map((s) => {
          const values = character[s.key] as string[];
          if (!values || values.length === 0) return null;
          return (
            <div key={s.key} className="character-section">
              <span className="character-section-label">
                <span aria-hidden>{s.emoji}</span> {s.label}
              </span>
              <div className="row wrap gap-2">
                {values.map((v) => (
                  <TraitBadge key={v} label={v} accent={s.accent} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
