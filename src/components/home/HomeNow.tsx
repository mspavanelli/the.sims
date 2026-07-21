import { useState } from "react";
import { useSave } from "../../state/useSave";
import {
  contextualMoment,
  countdownPhrase,
  daypart,
  weatherOptions,
} from "../../lib/labels";
import "./HomeNow.css";

/**
 * "Nosso agora" — o painel vivo da Home. Responde "o que está acontecendo
 * agora?" com saudação contextual, clima simbólico, música do momento e um
 * apanhado de novidades composto a partir do próprio save.
 */
export default function HomeNow() {
  const { state, dispatch } = useSave();
  const now = new Date();
  const { greeting, emoji: dayEmoji } = daypart(now);
  const weather = state.saveWeather ?? weatherOptions[0];

  const cycleWeather = () => {
    const idx = weatherOptions.findIndex(
      (w) => w.label === weather.label,
    );
    const next = weatherOptions[(idx + 1) % weatherOptions.length];
    dispatch({ type: "setWeather", weather: next });
  };

  // ---- Música do momento (edição inline) ----
  const [editingMusic, setEditingMusic] = useState(false);
  const [title, setTitle] = useState(state.nowPlaying?.title ?? "");
  const [artist, setArtist] = useState(state.nowPlaying?.artist ?? "");

  const openMusic = () => {
    setTitle(state.nowPlaying?.title ?? "");
    setArtist(state.nowPlaying?.artist ?? "");
    setEditingMusic(true);
  };
  const saveMusic = () => {
    const t = title.trim();
    dispatch({
      type: "setNowPlaying",
      nowPlaying: t ? { title: t, artist: artist.trim() || undefined } : undefined,
    });
    setEditingMusic(false);
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

  const news: { key: string; emoji: string; text: string }[] = [];
  state.characters.forEach((c) => {
    if (c.today?.text) {
      news.push({
        key: "today-" + c.id,
        emoji: c.today.emoji || "✨",
        text: `${c.name} está ${c.today.text}`,
      });
    }
  });
  if (nextMission?.date) {
    news.push({
      key: "mission",
      emoji: "🗓️",
      text: `${countdownPhrase(nextMission.date, now)} para ${nextMission.title}`,
    });
  }
  if (latestMemory) {
    news.push({
      key: "memory",
      emoji: latestMemory.emoji ?? "📸",
      text: `Última memória: ${latestMemory.title}`,
    });
  }

  return (
    <section className="home-now panel">
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

        {editingMusic ? (
          <div className="home-now-music editing">
            <input
              className="input"
              value={title}
              autoFocus
              placeholder="Música…"
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveMusic()}
            />
            <input
              className="input"
              value={artist}
              placeholder="Artista (opcional)"
              onChange={(e) => setArtist(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveMusic()}
            />
            <button className="btn btn-primary btn-sm" onClick={saveMusic}>
              ok
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="home-now-music"
            onClick={openMusic}
            title="Editar a música do momento"
          >
            <span className="home-now-music-note" aria-hidden>
              ♪
            </span>
            {state.nowPlaying ? (
              <span className="home-now-music-text">
                <strong>{state.nowPlaying.title}</strong>
                {state.nowPlaying.artist && (
                  <span className="muted">{state.nowPlaying.artist}</span>
                )}
              </span>
            ) : (
              <span className="muted">Tocando agora…</span>
            )}
          </button>
        )}
      </div>

      <p className="home-now-greeting">
        <span aria-hidden>{dayEmoji}</span> {greeting}, {state.coupleName}
      </p>

      {news.length > 0 && (
        <ul className="home-now-news">
          {news.map((n) => (
            <li key={n.key} className="anim-in">
              <span className="home-now-news-emoji" aria-hidden>
                {n.emoji}
              </span>
              <span>{n.text}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
