import { readJson, writeJson } from "@/shared/api";
import type { AppState } from "./relationship";
import { cloneSeed } from "./relationship-seed";
import {
  pickNowPlayingTrack,
  pickWeeklyAlbum,
  trackToNowPlaying,
  weekKey,
  nowPlayingTracks,
} from "./now-playing";

const STORAGE_KEY = "the-sims:v1";

/**
 * Funde o save guardado com os defaults atuais do seed.
 * Sem isto, todo campo novo adicionado ao modelo vem `undefined` para
 * quem já tinha um save — quebrando a interface. Preserva os dados do
 * usuário e só completa o que estiver faltando (merge raso por chave).
 */
/**
 * Avatares que o seed já usou. Um save antigo guardou o caminho da época;
 * quando o arquivo é trocado (otimização, formato novo), o antigo quebraria.
 * Só migramos estes — foto escolhida à mão pelo usuário fica intocada.
 */
const legacySeedAvatars = ["/avatar-matheus.png", "/avatar-luiza.png"];
const newGoalIds = new Set(["goal-4", "goal-5", "goal-6"]);
const newMissionIds = new Set(["mis-6", "mis-7", "mis-8", "mis-9", "mis-10"]);

function withDefaults(parsed: Partial<AppState>): AppState {
  const base = cloneSeed();
  const merged = { ...base, ...parsed } as AppState;
  const currentWeek = weekKey();
  const savedAlbum = parsed.weeklyAlbum;
  const weeklyAlbum = savedAlbum?.weekKey === currentWeek
    ? savedAlbum
    : { ...pickWeeklyAlbum(savedAlbum?.id), weekKey: currentWeek };
  const savedTrack = parsed.nowPlayingId
    ? nowPlayingTracks.find((track) => track.id === parsed.nowPlayingId)
    : undefined;
  const track = savedTrack && savedAlbum?.weekKey === currentWeek
    ? savedTrack
    : pickNowPlayingTrack(merged, weeklyAlbum, parsed.nowPlayingId);
  merged.weeklyAlbum = weeklyAlbum;
  merged.nowPlayingId = track.id;
  merged.nowPlaying = trackToNowPlaying(track);
  // O contador de segredos do pote precisa sobreviver ao recarregamento —
  // era estado de componente e zerava a cada visita.
  merged.discoveredIdeas = parsed.discoveredIdeas ?? [];
  // Personagens ganham campos-lista novos ao longo do tempo; garante que
  // arrays esperados existam mesmo em fichas salvas antes deles.
  merged.characters = (parsed.characters ?? base.characters).map((c) => ({
    ...c,
    // Avatar do seed entra em fichas salvas antes das imagens existirem —
    // sem sobrescrever quem já escolheu uma foto própria.
    image:
      !c.image || legacySeedAvatars.includes(c.image)
        ? base.characters.find((b) => b.id === c.id)?.image
        : c.image,
    traits: c.traits ?? [],
    interests: c.interests ?? [],
    likes: c.likes ?? [],
    quirks: c.quirks ?? [],
    affectionStyles: c.affectionStyles ?? [],
    energySources: c.energySources ?? [],
    energyDrains: c.energyDrains ?? [],
    aspirations: c.aspirations ?? [],
    inventory: c.inventory ?? [],
    soundtrack: c.soundtrack ?? [],
    skills: c.skills ?? [],
    worldview: c.worldview ?? [],
  }));

  // Itens adicionados ao seed entram em saves existentes sem substituir
  // metas ou missões que a pessoa já editou ou criou.
  if (parsed.goals) {
    merged.goals = [
      ...parsed.goals,
      ...base.goals.filter(
        (goal) => newGoalIds.has(goal.id) && !parsed.goals!.some((g) => g.id === goal.id),
      ),
    ];
  }
  if (parsed.missions) {
    merged.missions = [
      ...parsed.missions,
      ...base.missions.filter(
        (mission) =>
          newMissionIds.has(mission.id) &&
          !parsed.missions!.some((m) => m.id === mission.id),
      ),
    ];
  }
  return merged;
}

export function createInitialRelationship(): AppState {
  return withDefaults({});
}

export function loadRelationship(): AppState | null {
  const parsed = readJson<Partial<AppState>>(STORAGE_KEY);
  return parsed && typeof parsed === "object" ? withDefaults(parsed) : null;
}

/** `false` quando o aparelho recusou a escrita — quem chama tem que avisar. */
export function saveRelationship(state: AppState): boolean {
  return writeJson(STORAGE_KEY, state);
}

/**
 * O save como arquivo. É a única porta de saída do mundo: sem backend, o que
 * existe mora no `localStorage` deste aparelho, e o Safari do iOS descarta o
 * `localStorage` depois de sete dias sem visita quando o app não está instalado
 * na tela de início.
 */
export function serializeSave(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Lê um arquivo exportado. Passa pelo mesmo `withDefaults` do carregamento, então
 * um save antigo é completado com os campos novos em vez de abrir quebrado.
 * Devolve `null` quando o arquivo não é um save deste mundo.
 */
export function parseSave(text: string): AppState | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object") return null;
    const candidate = parsed as Partial<AppState>;
    const looksLikeSave =
      typeof candidate.coupleName === "string" ||
      Array.isArray(candidate.characters) ||
      Array.isArray(candidate.memories);
    return looksLikeSave ? withDefaults(candidate) : null;
  } catch {
    return null;
  }
}
