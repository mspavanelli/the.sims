import { useRef, useState } from "react";
import {
  parseSave,
  seed,
  serializeSave,
  useRelationship,
} from "@/entities/relationship";
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
  const fileInput = useRef<HTMLInputElement>(null);

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

  /** O mundo vira arquivo: a única cópia que sobrevive a trocar de aparelho. */
  const exportSave = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    const url = URL.createObjectURL(
      new Blob([serializeSave(state)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `nosso-save-${stamp}.json`;
    link.click();
    URL.revokeObjectURL(url);
    notify({ emoji: "📦", message: "Nosso save saiu inteirinho num arquivo." });
  };

  const importSave = async (file: File) => {
    const imported = parseSave(await file.text());
    if (!imported) {
      notify({ emoji: "🤔", message: "Esse arquivo não parece um save nosso." });
      return;
    }
    dispatch({ type: "replaceAll", state: imported });
    setCoupleName(imported.coupleName);
    setTagline(imported.saveTagline ?? "");
    setChapterTitle(imported.currentChapter.title);
    setChapterSubtitle(imported.currentChapter.subtitle ?? "");
    notify({ emoji: "🌎", message: "O mundo voltou do arquivo." });
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
        <h2 className="section-title">📦 Nosso save</h2>
        <p className="muted" style={{ marginTop: "var(--s-2)" }}>
          Tudo mora só neste aparelho. Guardar uma cópia de vez em quando é o
          jeito de o mundo atravessar uma troca de celular — e de voltar inteiro
          se algo acontecer aqui.
        </p>
        <div className="row wrap gap-3" style={{ marginTop: "var(--s-4)" }}>
          <button className="btn btn-soft" onClick={exportSave}>
            📦 Exportar nosso save
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => fileInput.current?.click()}
          >
            📥 Importar um save
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importSave(file);
              e.target.value = "";
            }}
          />
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
