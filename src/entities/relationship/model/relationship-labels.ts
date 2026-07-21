import type {
  ConversationSensitivity,
  ConversationStatus,
  GoalHorizon,
  MissionCategory,
  MissionStatus,
} from "./relationship";

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

/** Saudação e período do dia — para a Home responder "o que está acontecendo agora". */
export function daypart(date = new Date()): {
  greeting: string;
  period: string;
  emoji: string;
} {
  const h = date.getHours();
  if (h < 6) return { greeting: "Boa madrugada", period: "Madrugada", emoji: "🌙" };
  if (h < 12) return { greeting: "Bom dia", period: "Manhã", emoji: "☀️" };
  if (h < 18) return { greeting: "Boa tarde", period: "Tarde", emoji: "🌤️" };
  return { greeting: "Boa noite", period: "Noite", emoji: "🌆" };
}

const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

/** "Domingo à tarde" — cabeçalho contextual do save. */
export function contextualMoment(date = new Date()): string {
  const day = weekdays[date.getDay()];
  const { period } = daypart(date);
  const connector =
    period === "Manhã" ? "de manhã" : period === "Madrugada" ? "de madrugada" : "à " + period.toLowerCase();
  return `${day} ${connector}`;
}

/** Dias inteiros entre hoje e uma data ISO (positivo = futuro). */
export function daysUntil(iso: string, from = new Date()): number {
  const target = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return Math.round((target.getTime() - base.getTime()) / 86_400_000);
}

/** Frase carinhosa de contagem regressiva. */
export function countdownPhrase(iso: string, from = new Date()): string {
  const d = daysUntil(iso, from);
  if (d < 0) return "já aconteceu";
  if (d === 0) return "é hoje!";
  if (d === 1) return "é amanhã";
  return `faltam ${d} dias`;
}

/** Opções de clima simbólico para o save (pura ambientação). */
export const weatherOptions: { emoji: string; label: string }[] = [
  { emoji: "🌤️", label: "Céu de tarde preguiçosa" },
  { emoji: "☀️", label: "Sol de domingo" },
  { emoji: "🌧️", label: "Chuva gostosa na janela" },
  { emoji: "⛅", label: "Nuvens mansas" },
  { emoji: "🌙", label: "Noite estrelada" },
  { emoji: "❄️", label: "Friozinho de cobertor" },
  { emoji: "🌫️", label: "Neblina de manhã cedo" },
  { emoji: "🌈", label: "Depois da chuva" },
];

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
