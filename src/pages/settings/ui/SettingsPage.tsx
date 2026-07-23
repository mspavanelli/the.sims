import { useState } from "react";
import { seed, useRelationship } from "@/entities/relationship";
import { Field, Modal, PageHeader, useToast } from "@/shared/ui";
import "./SettingsPage.css";

export default function SettingsPage() {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();
  const [coupleName, setCoupleName] = useState(state.coupleName);
  const [tagline, setTagline] = useState(state.saveTagline ?? "");
  const [chapterTitle, setChapterTitle] = useState(state.currentChapter.title);
  const [chapterSubtitle, setChapterSubtitle] = useState(
    state.currentChapter.subtitle ?? "",
  );
  const [restoreOpen, setRestoreOpen] = useState(false);

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
    notify({ emoji: "💞", message: "O jeitinho do save foi atualizado." });
  };

  // Única ação sem volta do app — e por isso a única que ainda pergunta antes.
  const restore = () => {
    dispatch({ type: "restoreDefaults" });
    setCoupleName(seed.coupleName);
    setTagline(seed.saveTagline ?? "");
    setChapterTitle(seed.currentChapter.title);
    setChapterSubtitle(seed.currentChapter.subtitle ?? "");
    setRestoreOpen(false);
    notify({
      emoji: "🌱",
      message: "O mundinho voltou pro conteúdo de exemplo.",
    });
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
          onClick={() => setRestoreOpen(true)}
          style={{ marginTop: "var(--s-4)" }}
        >
          ↺ Restaurar dados iniciais
        </button>
      </section>

      <section className="panel settings-card settings-about">
        <h2 className="section-title">♡ Sobre</h2>
        <p className="muted" style={{ marginTop: "var(--s-2)" }}>
          The Sims é um cantinho lúdico para registrar a jornada de vocês. Tudo
          fica salvo apenas neste navegador (localStorage) — nada é enviado para
          lugar nenhum.
        </p>
      </section>

      <Modal
        open={restoreOpen}
        onClose={() => setRestoreOpen(false)}
        title="Restaurar os dados iniciais?"
        emoji="🌱"
        footer={
          <>
            <button
              className="btn btn-ghost"
              onClick={() => setRestoreOpen(false)}
            >
              Deixar como está
            </button>
            <button className="btn btn-danger" onClick={restore}>
              ↺ Restaurar mesmo assim
            </button>
          </>
        }
      >
        <p>
          Isso substitui <strong>personagens, memórias, missões e planos</strong>{" "}
          pelos exemplos que vieram com o save. Diferente de remover uma memória,
          esta é a única ação do app que não tem "desfazer".
        </p>
      </Modal>
    </div>
  );
}
