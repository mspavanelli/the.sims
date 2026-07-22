export type Step = {
  id: string;
  title: string;
  completed: boolean;
};

/** Estado atual de humor da pessoa — editável à mão, para dar vida à ficha. */
export type CharacterToday = {
  emoji: string;
  text: string;
};

export type Character = {
  id: string;
  name: string;
  image?: string;
  emoji?: string;
  age?: number;
  tagline?: string;
  /** Descrição humana e longa — substitui o rótulo genérico de MBTI. */
  bio?: string;
  /** MBTI vive aqui só como pequeno detalhe, nunca como descrição principal. */
  mbti?: string;
  /** "Hoje" — humor do momento, manual. */
  today?: CharacterToday;
  traits: string[];
  interests: string[];
  likes: string[];
  quirks: string[];
  affectionStyles: string[];
  energySources: string[];
  /** O que drena a energia dessa pessoa. */
  energyDrains: string[];
  aspirations: string[];
  /** Itens simbólicos que acompanham essa pessoa no cotidiano. */
  inventory?: string[];
  /** Artistas e bandas que fazem parte da trilha sonora da pessoa. */
  soundtrack?: string[];
  /** Frase que resume a lógica interna do personagem. */
  characterQuote?: string;
  /** Habilidades que aparecem nas ações desse personagem. */
  skills?: string[];
  /** Crenças e lentes através das quais a pessoa interpreta o mundo. */
  worldview?: string[];
};

export type MissionCategory =
  | "encontro"
  | "passeio"
  | "experiencia"
  | "cotidiano"
  | "surpresa"
  | "viagem";

export type MissionStatus = "idea" | "planned" | "completed" | "archived";

export type Mission = {
  id: string;
  title: string;
  description?: string;
  category: MissionCategory;
  status: MissionStatus;
  date?: string;
  steps?: Step[];
};

export type Memory = {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  image?: string;
  emoji?: string;
  category?: string;
  tags: string[];
};

export type GoalHorizon = "short" | "medium" | "long";
export type GoalProgressType = "percentage" | "checklist" | "narrative";

export type Goal = {
  id: string;
  title: string;
  horizon: GoalHorizon;
  progressType: GoalProgressType;
  progress?: number;
  steps?: Step[];
  description?: string;
};

export type ConversationSensitivity = "light" | "meaningful" | "delicate";
export type ConversationStatus = "horizon" | "ready" | "discussed" | "paused";

export type Conversation = {
  id: string;
  title: string;
  context?: string;
  topics: string[];
  sensitivity: ConversationSensitivity;
  status: ConversationStatus;
};

export type Aspiration = {
  id: string;
  title: string;
  description?: string;
  emoji?: string;
};

export type Chapter = {
  title: string;
  subtitle?: string;
};

/** Clima simbólico do save — pura ambientação, sem integração de API. */
export type SaveWeather = {
  emoji: string;
  label: string;
};

/** Música do momento — o que está tocando no mundo do casal agora. */
export type NowPlaying = {
  title: string;
  artist?: string;
  album?: string;
};

export type WeeklyAlbum = {
  id: string;
  weekKey: string;
  title: string;
  artist: string;
  year?: number;
};

export type AppState = {
  coupleName: string;
  saveTagline?: string;
  currentChapter: Chapter;
  saveWeather?: SaveWeather;
  nowPlaying?: NowPlaying;
  nowPlayingId?: string;
  weeklyAlbum?: WeeklyAlbum;
  characters: Character[];
  memories: Memory[];
  missions: Mission[];
  goals: Goal[];
  conversations: Conversation[];
  aspirations: Aspiration[];
  featuredConversationId?: string;
};
