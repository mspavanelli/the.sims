import type { AppState } from "../types";
import { cloneSeed } from "../data/seed";

const STORAGE_KEY = "the-sims:v1";

/**
 * Funde o save guardado com os defaults atuais do seed.
 * Sem isto, todo campo novo adicionado ao modelo vem `undefined` para
 * quem já tinha um save — quebrando a interface. Preserva os dados do
 * usuário e só completa o que estiver faltando (merge raso por chave).
 */
function withDefaults(parsed: Partial<AppState>): AppState {
  const base = cloneSeed();
  const merged = { ...base, ...parsed } as AppState;
  // Personagens ganham campos-lista novos ao longo do tempo; garante que
  // arrays esperados existam mesmo em fichas salvas antes deles.
  merged.characters = (parsed.characters ?? base.characters).map((c) => ({
    ...c,
    traits: c.traits ?? [],
    interests: c.interests ?? [],
    likes: c.likes ?? [],
    quirks: c.quirks ?? [],
    affectionStyles: c.affectionStyles ?? [],
    energySources: c.energySources ?? [],
    energyDrains: c.energyDrains ?? [],
    aspirations: c.aspirations ?? [],
  }));
  return merged;
}

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return withDefaults(parsed as Partial<AppState>);
  } catch {
    return null;
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* localStorage indisponível — protótipo segue em memória */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
