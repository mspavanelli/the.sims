import type { Character } from "@/entities/relationship";
import { Avatar, TraitBadge } from "@/shared/ui";
import "./CharacterCard.css";

const sections: Array<{
  key: keyof Character;
  label: string;
  emoji: string;
  accent: string;
}> = [
  { key: "traits", label: "Traços", emoji: "🎭", accent: "var(--c-plum-500)" },
  {
    key: "interests",
    label: "Interesses",
    emoji: "🎨",
    accent: "var(--c-blue-500)",
  },
  { key: "likes", label: "Gosta de", emoji: "💚", accent: "var(--c-green-500)" },
  {
    key: "quirks",
    label: "Curiosidades",
    emoji: "🔍",
    accent: "var(--c-amber-400)",
  },
  {
    key: "affectionStyles",
    label: "Formas de afeto",
    emoji: "🤍",
    accent: "var(--c-coral-500)",
  },
  {
    key: "energySources",
    label: "O que dá energia",
    emoji: "⚡",
    accent: "var(--c-green-600)",
  },
  {
    key: "energyDrains",
    label: "O que drena energia",
    emoji: "🪫",
    accent: "var(--c-coral-500)",
  },
  {
    key: "aspirations",
    label: "Aspirações pessoais",
    emoji: "✨",
    accent: "var(--c-plum-400)",
  },
  {
    key: "inventory",
    label: "Inventário",
    emoji: "🎒",
    accent: "var(--c-amber-400)",
  },
  {
    key: "soundtrack",
    label: "Trilha sonora",
    emoji: "🎵",
    accent: "var(--c-blue-500)",
  },
  {
    key: "skills",
    label: "Habilidades",
    emoji: "🏅",
    accent: "var(--c-green-600)",
  },
  {
    key: "worldview",
    label: "Visão de mundo",
    emoji: "🌍",
    accent: "var(--c-plum-500)",
  },
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
          zoom={1.2}
        />
        <div className="grow">
          <div className="row between gap-2">
            <h2 className="character-card-name">{character.name}</h2>
            <button
              className="btn-icon"
              onClick={onEdit}
              aria-label={`Editar a ficha de ${character.name}`}
            >
              ✎
            </button>
          </div>
          <div className="row wrap gap-2 character-card-meta">
            {character.age != null && (
              <span className="chip">🎂 {character.age} anos</span>
            )}
            {character.mbti && (
              <span className="chip character-card-mbti">
                🧩 {character.mbti}
              </span>
            )}
          </div>
          {character.tagline && (
            <p className="character-card-tagline muted">{character.tagline}</p>
          )}
        </div>
      </div>

      {character.today?.text && (
        <div className="character-today">
          <span className="character-today-label eyebrow">Hoje</span>
          <p className="character-today-text">
            <span className="character-today-emoji" aria-hidden>
              {character.today.emoji || "✨"}
            </span>
            {character.today.text}
          </p>
        </div>
      )}

      {character.bio && <p className="character-card-bio">{character.bio}</p>}

      {character.characterQuote && (
        <blockquote className="character-card-quote">
          <span aria-hidden>“</span>{character.characterQuote}
        </blockquote>
      )}

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
