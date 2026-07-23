import { Link } from "react-router-dom";
import {
  contextualMoment,
  conversationStatusMeta,
  countdownPhrase,
  daypart,
  formatDate,
  useRelationship,
  weatherOptions,
} from "@/entities/relationship";
import "./HomeNow.css";

type News = { key: string; emoji: string; text: string; to?: string };

/** Dia do ano — gira o slot rotativo das novidades sem depender de estado. */
function dayIndex(now: Date): number {
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86_400_000);
}

/**
 * "Nosso agora" — o centro da Home. Responde "o que está acontecendo agora?"
 * com saudação contextual, clima simbólico, música do momento e as novidades
 * compostas a partir do próprio save: o que cada um está fazendo, a contagem
 * para o próximo encontro, a carta em destaque e a última memória.
 *
 * A lista guarda três lugares fixos e um rotativo, que troca a cada dia — abrir
 * depois de uma semana não pode ser igual a abrir agora.
 */
export default function HomeNow() {
  const { state, dispatch } = useRelationship();
  const now = new Date();
  const { greeting, emoji: dayEmoji } = daypart(now);
  const weather = state.saveWeather ?? weatherOptions[0];

  const cycleWeather = () => {
    const idx = weatherOptions.findIndex((w) => w.label === weather.label);
    const next = weatherOptions[(idx + 1) % weatherOptions.length];
    dispatch({ type: "setWeather", weather: next });
  };

  // ---- Novidades compostas ----
  const today = now.toISOString().slice(0, 10);
  const nextMission =
    state.missions
      .filter((m) => m.status === "planned" && m.date && m.date >= today)
      .sort((x, y) => (x.date! < y.date! ? -1 : 1))[0] ?? null;
  const latestMemory = [...state.memories].sort((x, y) =>
    x.date < y.date ? 1 : -1,
  )[0];
  const featured =
    state.conversations.find((c) => c.id === state.featuredConversationId) ??
    state.conversations.find((c) => c.status === "ready");

  // Fixos: o que é sensível ao tempo e o que cada um está vivendo hoje.
  const pinned: News[] = [];
  if (nextMission?.date) {
    pinned.push({
      key: "mission",
      emoji: "🗓️",
      text: `${countdownPhrase(nextMission.date, now)} para ${nextMission.title}`,
      to: "/missoes",
    });
  }
  state.characters.forEach((c) => {
    if (c.today?.text) {
      pinned.push({
        key: "today-" + c.id,
        emoji: c.today.emoji || "✨",
        text: `${c.name} está ${c.today.text}`,
        to: "/personagens",
      });
    }
  });

  // Rotativos: entram um por dia, para o mundo continuar se mexendo sozinho.
  const rotating: News[] = [];
  if (featured) {
    rotating.push({
      key: "letter",
      emoji: conversationStatusMeta[featured.status].emoji,
      text: `Carta guardada: ${featured.title}`,
      to: "/planos",
    });
  }
  if (latestMemory) {
    rotating.push({
      key: "memory",
      emoji: latestMemory.emoji ?? "📸",
      text: `${latestMemory.title} · ${formatDate(latestMemory.date)}`,
      to: "/jornada",
    });
  }

  const news = [...pinned.slice(0, 3)];
  if (rotating.length > 0) {
    news.push(rotating[dayIndex(now) % rotating.length]);
  }

  return (
    <section className="home-now panel" aria-labelledby="home-now-greeting">
      <div className="home-now-top">
        <button
          type="button"
          className="home-now-weather"
          onClick={cycleWeather}
          title="Trocar o clima do momento"
          aria-label={`Clima: ${weather.label}. Clique para trocar.`}
        >
          <span className="home-now-weather-emoji" aria-hidden>
            {weather.emoji}
          </span>
          <span className="home-now-weather-text">
            <span className="home-now-moment">{contextualMoment(now)}</span>
            <span className="muted">{weather.label}</span>
          </span>
        </button>

        <div className="home-now-music" aria-label="Trilha sonora do momento">
          <span className="home-now-music-note" aria-hidden>♪</span>
          {state.nowPlaying ? (
            <span
              className="home-now-music-text"
              key={state.nowPlayingId ?? state.nowPlaying.title}
            >
              <span className="home-now-music-label">Tocando agora</span>
              <strong>{state.nowPlaying.title}</strong>
              {state.nowPlaying.artist && (
                <span className="muted">{state.nowPlaying.artist}</span>
              )}
            </span>
          ) : (
            <span className="muted">
              A trilha deste momento ainda está se formando…
            </span>
          )}
        </div>
      </div>

      <p className="home-now-greeting" id="home-now-greeting">
        <span aria-hidden>{dayEmoji}</span> {greeting}, {state.coupleName}
      </p>

      {news.length > 0 && (
        <ul className="home-now-news">
          {news.map((n) => (
            <li key={n.key} className="anim-in">
              {n.to ? (
                <Link to={n.to} className="home-now-news-item">
                  <span className="home-now-news-emoji" aria-hidden>
                    {n.emoji}
                  </span>
                  <span>{n.text}</span>
                  <span className="home-now-news-go" aria-hidden>
                    →
                  </span>
                </Link>
              ) : (
                <div className="home-now-news-item">
                  <span className="home-now-news-emoji" aria-hidden>
                    {n.emoji}
                  </span>
                  <span>{n.text}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {state.weeklyAlbum && (
        <p className="home-now-album">
          <span aria-hidden>💿</span>
          <span>
            <strong>Disco da semana</strong> · {state.weeklyAlbum.title}{" "}
            <span className="muted">— {state.weeklyAlbum.artist}</span>
          </span>
        </p>
      )}
    </section>
  );
}
