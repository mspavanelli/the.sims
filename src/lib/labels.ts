import type {
  ConversationSensitivity,
  ConversationStatus,
  GoalHorizon,
  MissionCategory,
  MissionStatus,
} from "../types";

type Meta = { label: string; emoji: string; color: string };

export const missionCategoryMeta: Record<MissionCategory, Meta> = {
  encontro: { label: "Encontro", emoji: "💞", color: "var(--c-coral-500)" },
  passeio: { label: "Passeio", emoji: "🚲", color: "var(--c-blue-500)" },
  experiencia: { label: "Experiência", emoji: "✨", color: "var(--c-plum-500)" },
  cotidiano: { label: "Cotidiano", emoji: "🏡", color: "var(--c-green-500)" },
  surpresa: { label: "Surpresa", emoji: "🎁", color: "var(--c-amber-400)" },
  viagem: { label: "Viagem", emoji: "🧳", color: "var(--c-blue-600)" },
};

export const missionCategories = Object.keys(
  missionCategoryMeta,
) as MissionCategory[];

export const missionStatusMeta: Record<MissionStatus, Meta> = {
  idea: { label: "Ideia", emoji: "💡", color: "var(--c-amber-400)" },
  planned: { label: "Planejada", emoji: "📌", color: "var(--c-blue-500)" },
  completed: { label: "Concluída", emoji: "🌟", color: "var(--c-green-500)" },
  archived: { label: "Guardada", emoji: "🗂️", color: "var(--ink-300)" },
};

export const missionStatuses = Object.keys(missionStatusMeta) as MissionStatus[];

export const goalHorizonMeta: Record<GoalHorizon, Meta> = {
  short: { label: "Curto prazo", emoji: "🌱", color: "var(--c-green-500)" },
  medium: { label: "Médio prazo", emoji: "🌿", color: "var(--c-blue-500)" },
  long: { label: "Longo prazo", emoji: "🌳", color: "var(--c-plum-500)" },
};

export const goalHorizons = Object.keys(goalHorizonMeta) as GoalHorizon[];

export const conversationStatusMeta: Record<ConversationStatus, Meta> = {
  horizon: { label: "No horizonte", emoji: "🌅", color: "var(--c-blue-500)" },
  ready: { label: "Pronta", emoji: "💬", color: "var(--c-green-500)" },
  discussed: { label: "Conversada", emoji: "🤍", color: "var(--c-plum-500)" },
  paused: { label: "Pausada", emoji: "⏸️", color: "var(--ink-300)" },
};

export const conversationStatuses = Object.keys(
  conversationStatusMeta,
) as ConversationStatus[];

export const conversationSensitivityMeta: Record<
  ConversationSensitivity,
  Meta
> = {
  light: { label: "Leve", emoji: "🫧", color: "var(--c-green-500)" },
  meaningful: { label: "Significativa", emoji: "💗", color: "var(--c-coral-500)" },
  delicate: { label: "Delicada", emoji: "🌸", color: "var(--c-plum-500)" },
};

export const conversationSensitivities = Object.keys(
  conversationSensitivityMeta,
) as ConversationSensitivity[];

export function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
