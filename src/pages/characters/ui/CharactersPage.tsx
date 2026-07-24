import { useState } from "react";
import { useRelationship, type Character } from "@/entities/relationship";
import { PageHeader, useToast } from "@/shared/ui";
import CharacterCard from "./CharacterCard";
import CharacterForm from "./CharacterForm";
import "./CharactersPage.css";

export default function CharactersPage() {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();
  const [editing, setEditing] = useState<Character | null>(null);
  const [open, setOpen] = useState(false);

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
        subtitle="as duas pessoas que fazem esse mundo existir"
      />

      <div className="characters-duo" aria-label="Perfis do casal">
        {state.characters.slice(0, 2).map((c) => (
          <CharacterCard key={c.id} character={c} onEdit={() => openEdit(c)} />
        ))}
      </div>

      <CharacterForm
        open={open}
        character={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
    </div>
  );
}
