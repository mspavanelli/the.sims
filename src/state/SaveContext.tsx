import {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AppState,
  Aspiration,
  Chapter,
  Character,
  Conversation,
  Goal,
  Memory,
  Mission,
} from "../types";
import { cloneSeed } from "../data/seed";
import { loadState, saveState } from "../lib/storage";

type Action =
  | { type: "restoreDefaults" }
  | { type: "setChapter"; chapter: Chapter }
  | { type: "setCoupleName"; coupleName: string; saveTagline?: string }
  | { type: "setFeaturedConversation"; id?: string }
  | { type: "upsertCharacter"; character: Character }
  | { type: "upsertMemory"; memory: Memory }
  | { type: "removeMemory"; id: string }
  | { type: "upsertMission"; mission: Mission }
  | { type: "removeMission"; id: string }
  | { type: "upsertGoal"; goal: Goal }
  | { type: "removeGoal"; id: string }
  | { type: "upsertConversation"; conversation: Conversation }
  | { type: "removeConversation"; id: string }
  | { type: "upsertAspiration"; aspiration: Aspiration }
  | { type: "removeAspiration"; id: string };

function upsert<T extends { id: string }>(list: T[], item: T): T[] {
  const idx = list.findIndex((i) => i.id === item.id);
  if (idx === -1) return [...list, item];
  const next = list.slice();
  next[idx] = item;
  return next;
}

function reducer(state: AppState, action: Action): AppState {
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

export type SaveContextValue = {
  state: AppState;
  dispatch: React.Dispatch<Action>;
};

export const SaveContext = createContext<SaveContextValue | null>(null);

function init(): AppState {
  return loadState() ?? cloneSeed();
}

export function SaveProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <SaveContext.Provider value={value}>{children}</SaveContext.Provider>;
}
