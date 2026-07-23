import { useState } from "react";
import { useRelationship, type Character } from "@/entities/relationship";
import { EmptyState, PageHeader, useToast } from "@/shared/ui";
import CharacterCard from "./CharacterCard";
import CharacterForm from "./CharacterForm";
import "./CharactersPage.css";

export default function CharactersPage() {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();
  const [editing, setEditing] = useState<Character | null>(null);
  const [open, setOpen] = useState(false);

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (c: Character) => {
    setEditing(c);
    setOpen(true);
  };
  const save = (c: Character) => {
    dispatch({ type: "upsertCharacter", character: c });
    notify({ emoji: c.emoji || "🧑‍🎨", message: `A ficha de ${c.name} foi salva.` });
  };

  return (
    <div className="page">
      <PageHeader
        emoji="🧑‍🤝‍🧑"
        title="Personagens"
        subtitle="Quem são as duas pessoas desse mundo"
        action={
          <button className="btn btn-primary" onClick={openNew}>
            + Adicionar
          </button>
        }
      />

      {state.characters.length === 0 ? (
        <EmptyState
          emoji="🧑‍🎨"
          title="Nenhum personagem ainda"
          message="Crie os perfis do casal para dar vida ao save."
          action={
            <button className="btn btn-primary" onClick={openNew}>
              + Criar personagem
            </button>
          }
        />
      ) : (
        <div className="characters-grid">
          {state.characters.map((c) => (
            <CharacterCard key={c.id} character={c} onEdit={() => openEdit(c)} />
          ))}
        </div>
      )}

      <CharacterForm
        open={open}
        character={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
    </div>
  );
}
