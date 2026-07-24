import type { Character, LoveLanguage } from "@/entities/relationship";
import { Avatar } from "@/shared/ui";
import "./CharacterCard.css";

const loveLanguages: Array<{ key: LoveLanguage; emoji: string; label: string }> = [
  { key: "words", emoji: "💬", label: "palavras" },
  { key: "qualityTime", emoji: "🫶", label: "tempo junto" },
  { key: "gifts", emoji: "🎁", label: "presentes" },
  { key: "actsOfService", emoji: "🧺", label: "cuidado" },
  { key: "physicalTouch", emoji: "🤍", label: "toque" },
];

function scoreFor(character: Character, key: LoveLanguage) {
  const saved = character.loveLanguages?.[key];
  if (saved) return saved;

  const styles = character.affectionStyles.join(" ").toLocaleLowerCase("pt-BR");
  const matches: Record<LoveLanguage, RegExp> = {
    words: /conversa|bilhet|sincer/, qualityTime: /tempo|caminha|junto|música/,
    gifts: /presente|lembran/, actsOfService: /cuidado|criar/, physicalTouch: /toque|abraço|cócega/,
  };
  return matches[key].test(styles) ? 4 : 2;
}

export default function CharacterCard({
  character,
  onEdit,
}: {
  character: Character;
  onEdit: () => void;
}) {
  const facts = [
    character.age != null && { emoji: "🎂", label: "idade", value: `${character.age} anos` },
    character.mbti && { emoji: "🧩", label: "tipo", value: character.mbti },
    character.height && { emoji: "📏", label: "altura", value: character.height },
  ].filter(Boolean) as Array<{ emoji: string; label: string; value: string }>;

  return (
    <article className="character-card panel">
      <header className="character-card-top">
        <Avatar name={character.name} emoji={character.emoji} image={character.image} size={88} zoom={1.2} />
        <div className="character-card-heading">
          <div className="row between gap-2">
            <h2 className="character-card-name">{character.name}</h2>
            <button className="btn-icon" onClick={onEdit} aria-label={`Editar o perfil de ${character.name}`}>
              ✎
            </button>
          </div>
          {character.tagline && <p className="character-card-tagline">{character.tagline}</p>}
        </div>
      </header>

      <dl className="character-facts">
        {facts.map((fact) => (
          <div key={fact.label} className="character-fact">
            <dt><span aria-hidden>{fact.emoji}</span> {fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>

      {character.today?.text && (
        <section className="character-moodlet" aria-label={`Hoje, ${character.name} está ${character.today.text}`}>
          <span aria-hidden>{character.today.emoji || "✨"}</span>
          <p><strong>hoje:</strong> {character.today.text}</p>
        </section>
      )}

      <div className="character-details">
        {character.traits.length > 0 && (
          <section className="profile-section" aria-labelledby={`${character.id}-traits`}>
            <h3 id={`${character.id}-traits`}>🎭 traços de sim</h3>
            <ul className="profile-tags">
              {character.traits.map((trait) => <li key={trait}>{trait}</li>)}
            </ul>
          </section>
        )}
        {character.aspirations.length > 0 && (
          <section className="profile-section profile-aspirations" aria-labelledby={`${character.id}-aspirations`}>
            <h3 id={`${character.id}-aspirations`}>✨ desejos do save</h3>
            <ul className="profile-tags">
              {character.aspirations.map((aspiration) => <li key={aspiration}>{aspiration}</li>)}
            </ul>
          </section>
        )}
      </div>

      <section className="character-collection" aria-label={`Pequenas coisas de ${character.name}`}>
        <div className="collection-item">
          <h3>🎵 toca sempre</h3>
          {character.soundtrack?.length ? <p>{character.soundtrack.join(" · ")}</p> : <p className="muted">nenhuma banda marcada</p>}
        </div>
        <div className="collection-item">
          <h3>📚 lendo agora</h3>
          {character.currentReads?.length ? <p>{character.currentReads.join(" · ")}</p> : <p className="muted">nenhuma leitura marcada</p>}
        </div>
      </section>

      <section className="love-map" aria-labelledby={`${character.id}-love-map`}>
        <div className="love-map-heading">
          <div>
            <h3 id={`${character.id}-love-map`}>mapa de carinho</h3>
            <p>linguagens do amor, no jeitinho do save</p>
          </div>
          <span className="love-map-heart" aria-hidden>♡</span>
        </div>
        <ul className="love-languages">
          {loveLanguages.map((language) => {
            const score = scoreFor(character, language.key);
            return (
              <li key={language.key} className="love-language">
                <span className="love-language-label"><span aria-hidden>{language.emoji}</span> {language.label}</span>
                <span className="love-pips" role="img" aria-label={`${language.label}: ${score} de 5`}>
                  {Array.from({ length: 5 }, (_, index) => <i key={index} className={index < score ? "is-on" : undefined} />)}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
