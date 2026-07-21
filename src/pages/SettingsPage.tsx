import { useState } from "react";
import { useSave } from "../state/useSave";
import { seed } from "../data/seed";
import PageHeader from "../components/ui/PageHeader";
import { Field } from "../components/ui/Field";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { state, dispatch } = useSave();
  const [coupleName, setCoupleName] = useState(state.coupleName);
  const [tagline, setTagline] = useState(state.saveTagline ?? "");
  const [chapterTitle, setChapterTitle] = useState(state.currentChapter.title);
  const [chapterSubtitle, setChapterSubtitle] = useState(
    state.currentChapter.subtitle ?? "",
  );
  const [saved, setSaved] = useState(false);

  const saveIdentity = () => {
    dispatch({
      type: "setCoupleName",
      coupleName: coupleName.trim() || state.coupleName,
      saveTagline: tagline.trim() || undefined,
    });
    dispatch({
      type: "setChapter",
      chapter: {
        title: chapterTitle.trim() || state.currentChapter.title,
        subtitle: chapterSubtitle.trim() || undefined,
      },
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const restore = () => {
    if (
      confirm(
        "Restaurar os dados iniciais? Isso substitui personagens, memórias, missões e planos atuais pelos exemplos.",
      )
    ) {
      dispatch({ type: "restoreDefaults" });
      setCoupleName(seed.coupleName);
      setTagline(seed.saveTagline ?? "");
      setChapterTitle(seed.currentChapter.title);
      setChapterSubtitle(seed.currentChapter.subtitle ?? "");
    }
  };

  return (
    <div className="page settings">
      <PageHeader
        emoji="⚙️"
        title="Ajustes"
        subtitle="O jeitinho do save e as configurações do mundo"
      />

      <section className="panel settings-card">
        <h2 className="section-title">💞 Identidade do save</h2>
        <div className="form-grid" style={{ marginTop: "var(--s-4)" }}>
          <div className="form-grid cols-2">
            <Field label="Nome do casal / save">
              <input
                className="input"
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
              />
            </Field>
            <Field label="Frase do save (opcional)">
              <input
                className="input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </Field>
          </div>
          <Field label="Capítulo atual">
            <input
              className="input"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
            />
          </Field>
          <Field label="Subtítulo do capítulo (opcional)">
            <input
              className="input"
              value={chapterSubtitle}
              onChange={(e) => setChapterSubtitle(e.target.value)}
            />
          </Field>
          <div className="row gap-3" style={{ marginTop: "var(--s-2)" }}>
            <button className="btn btn-primary" onClick={saveIdentity}>
              Salvar alterações
            </button>
            {saved && <span className="settings-saved">✅ Salvo!</span>}
          </div>
        </div>
      </section>

      <section className="panel settings-card">
        <h2 className="section-title">🌱 Dados iniciais</h2>
        <p className="muted" style={{ marginTop: "var(--s-2)" }}>
          Restaure o conteúdo de exemplo para começar de novo com o mundinho
          preenchido. Essa ação substitui tudo que está salvo agora.
        </p>
        <button
          className="btn btn-danger"
          onClick={restore}
          style={{ marginTop: "var(--s-4)" }}
        >
          ↺ Restaurar dados iniciais
        </button>
      </section>

      <section className="panel settings-card settings-about">
        <h2 className="section-title">♡ Sobre</h2>
        <p className="muted" style={{ marginTop: "var(--s-2)" }}>
          The Sims é um cantinho lúdico para registrar a jornada de vocês.
          Tudo fica salvo apenas neste navegador (localStorage) — nada é enviado
          para lugar nenhum.
        </p>
      </section>
    </div>
  );
}
