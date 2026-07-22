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
const newMissionIds = new Set(["mis-6"]);

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

export function saveRelationship(state: AppState): void {
  writeJson(STORAGE_KEY, state);
}
