import { useMemo, useState } from "react";
import {
  missionStatusMeta,
  missionStatuses,
  useRelationship,
  type Mission,
  type MissionStatus,
} from "@/entities/relationship";
import { useNow } from "@/shared/lib";
import { CategoryPill, EmptyState, PageHeader, useToast } from "@/shared/ui";
import MissionCard from "./MissionCard";
import MissionForm from "./MissionForm";
import "./MissionsPage.css";

const ALL = "__all__";

export default function MissionsPage() {
  const { state, dispatch } = useRelationship();
  const { notify } = useToast();
  const now = useNow();
  const [editing, setEditing] = useState<Mission | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<MissionStatus | typeof ALL>(ALL);
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
  const upcomingMissions = state.missions.filter(
    (mission) => !mission.date || mission.date >= today,
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    upcomingMissions.forEach((m) => (c[m.status] = (c[m.status] ?? 0) + 1));
    return c;
  }, [upcomingMissions]);

  const visible = upcomingMissions
    .filter((m) => filter === ALL || m.status === filter)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.localeCompare(b.date);
    });

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (m: Mission) => {
    setEditing(m);
    setOpen(true);
  };
  const save = (m: Mission) => {
    const isNew = !state.missions.some((x) => x.id === m.id);
    dispatch({ type: "upsertMission", mission: m });
    notify({
      emoji: "🎯",
      message: isNew
        ? `"${m.title}" entrou nas missões.`
        : `"${m.title}" foi atualizada.`,
    });
  };
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
  const remove = (mission: Mission) => {
    const at = state.missions.findIndex((m) => m.id === mission.id);
    dispatch({ type: "removeMission", id: mission.id });
    notify({
      emoji: "🎯",
      message: `"${mission.title}" saiu das missões.`,
      action: {
        label: "Desfazer",
        onClick: () => dispatch({ type: "upsertMission", mission, at }),
      },
    });
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
          label={`Todas · ${upcomingMissions.length}`}
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
              onDelete={() => remove(m)}
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
