import { useMemo, useState } from "react";
import { useRelationship, type Memory } from "@/entities/relationship";
import { CategoryPill, EmptyState, PageHeader } from "@/shared/ui";
import MemoryCard from "./MemoryCard";
import MemoryForm from "./MemoryForm";
import TimelineItem from "./TimelineItem";

const ALL = "__all__";

export default function JourneyPage() {
  const { state, dispatch } = useRelationship();
  const [editing, setEditing] = useState<Memory | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set<string>();
    state.memories.forEach((m) => m.category && set.add(m.category));
    return Array.from(set);
  }, [state.memories]);

  const sorted = useMemo(
    () =>
      [...state.memories]
        .filter((m) => filter === ALL || m.category === filter)
        .sort((a, b) => (a.date < b.date ? 1 : -1)),
    [state.memories, filter],
  );

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (m: Memory) => {
    setEditing(m);
    setOpen(true);
  };
  const remove = (id: string) => {
    if (confirm("Remover esta memória da jornada?")) {
      dispatch({ type: "removeMemory", id });
    }
  };
  const save = (m: Memory) => dispatch({ type: "upsertMemory", memory: m });

  return (
    <div className="page">
      <PageHeader
        emoji="🧭"
        title="Jornada"
        subtitle="A linha do tempo das memórias que construímos"
        action={
          <button className="btn btn-primary" onClick={openNew}>
            + Nova memória
          </button>
        }
      />

      {categories.length > 0 && (
        <div className="row wrap gap-2" style={{ marginBottom: "var(--s-5)" }}>
          <CategoryPill
            label="Todas"
            emoji="🌈"
            active={filter === ALL}
            onClick={() => setFilter(ALL)}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c}
              label={c}
              active={filter === c}
              color="var(--c-blue-500)"
              onClick={() => setFilter(c)}
            />
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        <EmptyState
          emoji="🌱"
          title="A jornada começa aqui"
          message="Registre o primeiro momento importante de vocês."
          action={
            <button className="btn btn-primary" onClick={openNew}>
              + Criar memória
            </button>
          }
        />
      ) : (
        <div className="timeline">
          {sorted.map((m, i) => (
            <TimelineItem
              key={m.id}
              emoji={m.emoji ?? "📸"}
              last={i === sorted.length - 1}
            >
              <MemoryCard
                memory={m}
                onEdit={() => openEdit(m)}
                onDelete={() => remove(m.id)}
              />
            </TimelineItem>
          ))}
        </div>
      )}

      <MemoryForm
        open={open}
        memory={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
    </div>
  );
}
