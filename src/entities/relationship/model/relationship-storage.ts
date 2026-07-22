import { readJson, writeJson } from "@/shared/api";
import type { AppState } from "./relationship";
import { cloneSeed } from "./relationship-seed";

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

function withDefaults(parsed: Partial<AppState>): AppState {
  const base = cloneSeed();
  const merged = { ...base, ...parsed } as AppState;
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
  return merged;
}

export function loadRelationship(): AppState | null {
  const parsed = readJson<Partial<AppState>>(STORAGE_KEY);
  return parsed && typeof parsed === "object" ? withDefaults(parsed) : null;
}

export function saveRelationship(state: AppState): void {
  writeJson(STORAGE_KEY, state);
}
