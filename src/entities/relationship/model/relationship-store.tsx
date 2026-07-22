import { useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { AppState } from "./relationship";
import { RelationshipContext, type RelationshipAction } from "./relationship-context";
import { cloneSeed } from "./relationship-seed";
import {
  createInitialRelationship,
  loadRelationship,
  saveRelationship,
} from "./relationship-storage";

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((i) => i.id === item.id);
  if (idx === -1) return [...list, item];
  const next = list.slice();
  next[idx] = item;
  return next;
}

function reducer(state: AppState, action: RelationshipAction): AppState {
  switch (action.type) {
    case "restoreDefaults":
      return cloneSeed();
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
      return { ...state, memories: upsert(state.memories, action.memory) };
    case "removeMemory":
      return { ...state, memories: state.memories.filter((m) => m.id !== action.id) };
    case "upsertMission":
      return { ...state, missions: upsert(state.missions, action.mission) };
    case "removeMission":
      return { ...state, missions: state.missions.filter((m) => m.id !== action.id) };
    case "upsertGoal":
      return { ...state, goals: upsert(state.goals, action.goal) };
    case "removeGoal":
      return { ...state, goals: state.goals.filter((g) => g.id !== action.id) };
    case "upsertConversation":
      return {
        ...state,
        conversations: upsert(state.conversations, action.conversation),
      };
    case "removeConversation":
      return {
        ...state,
        conversations: state.conversations.filter((c) => c.id !== action.id),
      };
    case "upsertAspiration":
      return { ...state, aspirations: upsert(state.aspirations, action.aspiration) };
    case "removeAspiration":
      return {
        ...state,
        aspirations: state.aspirations.filter((a) => a.id !== action.id),
      };
    default:
      return state;
  }
}

function init(): AppState {
  return loadRelationship() ?? createInitialRelationship();
}

export function RelationshipProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveRelationship(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <RelationshipContext.Provider value={value}>{children}</RelationshipContext.Provider>;
}
