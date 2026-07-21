import { createContext, type Dispatch } from "react";
import type {
  AppState,
  Aspiration,
  Chapter,
  Character,
  Conversation,
  Goal,
  Memory,
  Mission,
  NowPlaying,
  SaveWeather,
} from "./relationship";

export type RelationshipAction =
  | { type: "restoreDefaults" }
  | { type: "setChapter"; chapter: Chapter }
  | { type: "setCoupleName"; coupleName: string; saveTagline?: string }
  | { type: "setWeather"; weather?: SaveWeather }
  | { type: "setNowPlaying"; nowPlaying?: NowPlaying }
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

export type RelationshipContextValue = {
  state: AppState;
  dispatch: Dispatch<RelationshipAction>;
};

export const RelationshipContext = createContext<RelationshipContextValue | null>(null);
