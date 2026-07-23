import { useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import { useToast } from "@/shared/ui";
import type { AppState } from "./relationship";
import { RelationshipContext, type RelationshipAction } from "./relationship-context";
import { cloneSeed } from "./relationship-seed";
import {
  createInitialRelationship,
  loadRelationship,
  saveRelationship,
} from "./relationship-storage";

/**
 * `at` só é usado pelo "desfazer": restaurar um item removido tem que devolvê-lo
 * ao lugar de onde saiu, senão ele reaparece no fim da lista e o desfazer vira
 * uma segunda mudança em vez de uma volta atrás.
 */
function upsert<T extends { id: string }>(list: T[], item: T, at?: number): T[] {
  const idx = list.findIndex((i) => i.id === item.id);
  if (idx !== -1) {
    const next = list.slice();
    next[idx] = item;
    return next;
  }
  if (at === undefined || at < 0 || at > list.length) return [...list, item];
  const next = list.slice();
  next.splice(at, 0, item);
  return next;
}

function reducer(state: AppState, action: RelationshipAction): AppState {
  switch (action.type) {
    case "restoreDefaults":
      return cloneSeed();
    case "replaceAll":
      return action.state;
    case "setChapter":
      return { ...state, currentChapter: action.chapter };
    case "setCoupleName":
      return {
        ...state,
        coupleName: action.coupleName,
        saveTagline: action.saveTagline ?? state.saveTagline,
      };
    case "setWeather":
      return { ...state, saveWeather: action.weather };
    case "setNowPlaying":
      return { ...state, nowPlaying: action.nowPlaying };
    case "setFeaturedConversation":
      return { ...state, featuredConversationId: action.id };
    case "upsertCharacter":
      return { ...state, characters: upsert(state.characters, action.character) };
    case "upsertMemory":
      return { ...state, memories: upsert(state.memories, action.memory, action.at) };
    case "removeMemory":
      return { ...state, memories: state.memories.filter((m) => m.id !== action.id) };
    case "upsertMission":
      return { ...state, missions: upsert(state.missions, action.mission, action.at) };
    case "removeMission":
      return { ...state, missions: state.missions.filter((m) => m.id !== action.id) };
    case "upsertGoal":
      return { ...state, goals: upsert(state.goals, action.goal, action.at) };
    case "removeGoal":
      return { ...state, goals: state.goals.filter((g) => g.id !== action.id) };
    case "upsertConversation":
      return {
        ...state,
        conversations: upsert(state.conversations, action.conversation, action.at),
      };
    case "removeConversation":
      return {
        ...state,
        conversations: state.conversations.filter((c) => c.id !== action.id),
      };
    case "upsertAspiration":
      return { ...state, aspirations: upsert(state.aspirations, action.aspiration, action.at) };
    case "removeAspiration":
      return {
        ...state,
        aspirations: state.aspirations.filter((a) => a.id !== action.id),
      };
    case "discoverIdea": {
      const discovered = state.discoveredIdeas ?? [];
      if (discovered.includes(action.id)) return state;
      return { ...state, discoveredIdeas: [...discovered, action.id] };
    }
    default:
      return state;
  }
}

function init(): AppState {
  return loadRelationship() ?? createInitialRelationship();
}

export function RelationshipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const { notify } = useToast();
  const warned = useRef(false);

  useEffect(() => {
    if (saveRelationship(state)) {
      warned.current = false;
      return;
    }
    // Uma vez por sessão: repetir o aviso a cada tecla digitada seria pior do
    // que o silêncio. A voz continua sendo a do app, não a de um erro de rede.
    if (warned.current) return;
    warned.current = true;
    notify({
      emoji: "🫧",
      message: "esse aparelho não deixou guardar — exporta o save em Ajustes?",
    });
  }, [state, notify]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <RelationshipContext.Provider value={value}>{children}</RelationshipContext.Provider>;
}
