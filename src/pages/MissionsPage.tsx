import { useMemo, useState } from "react";
import { useSave } from "../state/useSave";
import PageHeader from "../components/ui/PageHeader";
import CategoryPill from "../components/ui/CategoryPill";
import EmptyState from "../components/ui/EmptyState";
import MissionCard from "../components/missions/MissionCard";
import MissionForm from "../components/missions/MissionForm";
import { missionStatusMeta, missionStatuses } from "../lib/labels";
import type { Mission, MissionStatus } from "../types";
import "./MissionsPage.css";

const ALL = "__all__";

export default function MissionsPage() {
  const { state, dispatch } = useSave();
  const [editing, setEditing] = useState<Mission | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<MissionStatus | typeof ALL>(ALL);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    state.missions.forEach((m) => (c[m.status] = (c[m.status] ?? 0) + 1));
    return c;
  }, [state.missions]);

  const visible = state.missions.filter(
    (m) => filter === ALL || m.status === filter,
  );

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (m: Mission) => {
    setEditing(m);
    setOpen(true);
  };
  const save = (m: Mission) => dispatch({ type: "upsertMission", mission: m });
  const setStatus = (m: Mission, status: MissionStatus) =>
    dispatch({ type: "upsertMission", mission: { ...m, status } });
  const toggleStep = (m: Mission, stepId: string) =>
    dispatch({
      type: "upsertMission",
      mission: {
        ...m,
        steps: m.steps?.map((s) =>
          s.id === stepId ? { ...s, completed: !s.completed } : s,
        ),
      },
    });
  const remove = (id: string) => {
    if (confirm("Remover esta missão?")) dispatch({ type: "removeMission", id });
  };

  return (
    <div className="page">
      <PageHeader
        emoji="🎯"
        title="Missões"
        subtitle="Encontros, atividades e planinhos a dois"
        action={
          <button className="btn btn-primary" onClick={openNew}>
            + Nova missão
          </button>
        }
      />

      <div className="row wrap gap-2 missions-filters">
        <CategoryPill
          label={`Todas · ${state.missions.length}`}
          emoji="🌈"
          active={filter === ALL}
          onClick={() => setFilter(ALL)}
        />
        {missionStatuses.map((s) => (
          <CategoryPill
            key={s}
            label={`${missionStatusMeta[s].label} · ${counts[s] ?? 0}`}
            emoji={missionStatusMeta[s].emoji}
            color={missionStatusMeta[s].color}
            active={filter === s}
            onClick={() => setFilter(s)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          emoji="💡"
          title="Nenhuma missão por aqui"
          message="Que tal transformar uma ideia em um plano juntos?"
          action={
            <button className="btn btn-primary" onClick={openNew}>
              + Criar missão
            </button>
          }
        />
      ) : (
        <div className="missions-grid">
          {visible.map((m) => (
            <MissionCard
              key={m.id}
              mission={m}
              onEdit={() => openEdit(m)}
              onToggleStep={(stepId) => toggleStep(m, stepId)}
              onSetStatus={(status) => setStatus(m, status)}
              onDelete={() => remove(m.id)}
            />
          ))}
        </div>
      )}

      <MissionForm
        open={open}
        mission={editing}
        onClose={() => setOpen(false)}
        onSave={save}
      />
    </div>
  );
}
