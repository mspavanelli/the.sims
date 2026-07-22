import type { AppState, NowPlaying, SaveWeather } from "./relationship";

export type Mood = "leve" | "nostálgico" | "romântico" | "noturno" | "ensolarado";
export type Season = "verão" | "outono" | "inverno" | "primavera";
export type Weather = "chuva" | "nublado" | "frio" | "sol" | "calor";

export type NowPlayingTrack = {
  id: string;
  title: string;
  artist: string;
  album?: string;
  year?: number;
  mood?: Mood[];
  season?: Season[];
  weather?: Weather[];
  chapter?: string[];
  weight?: number;
};

export type NowPlayingAlbum = {
  id: string;
  title: string;
  artist: string;
  year?: number;
};

export const nowPlayingTracks: NowPlayingTrack[] = [
  { id: "beatles-here-there", title: "Here, There and Everywhere", artist: "The Beatles", album: "Revolver", mood: ["romântico", "leve"], season: ["primavera", "verão"] },
  { id: "beatles-strawberry-fields", title: "Strawberry Fields Forever", artist: "The Beatles", album: "Magical Mystery Tour", mood: ["nostálgico"], season: ["outono"], weather: ["nublado"] },
  { id: "queen-best-friend", title: "You're My Best Friend", artist: "Queen", album: "A Night at the Opera", mood: ["leve", "romântico"], weather: ["sol"] },
  { id: "freddie-love-tomorrow", title: "Love Me Like There's No Tomorrow", artist: "Freddie Mercury", album: "Mr. Bad Guy", mood: ["romântico", "nostálgico"], season: ["outono"] },
  { id: "freddie-living", title: "Living On My Own", artist: "Freddie Mercury", album: "Mr. Bad Guy", mood: ["leve", "noturno"] },
  { id: "smiths-panic", title: "Panic", artist: "The Smiths", album: "The World Won't Listen", mood: ["nostálgico"], weather: ["chuva", "nublado"], season: ["outono"] },
  { id: "smiths-want", title: "I Want The One I Can't Have", artist: "The Smiths", album: "Meat Is Murder", mood: ["nostálgico", "romântico"], weather: ["chuva"] },
  { id: "smiths-william", title: "William, It Was Really Nothing", artist: "The Smiths", album: "Louder Than Bombs", mood: ["leve", "nostálgico"], weather: ["nublado"] },
  { id: "morrissey-playboys", title: "The Last of the Famous International Playboys", artist: "Morrissey", album: "Bona Drag", mood: ["nostálgico"], season: ["outono"] },
  { id: "oasis-champagne", title: "Champagne Supernova", artist: "Oasis", album: "(What's the Story) Morning Glory?", mood: ["nostálgico"], weather: ["chuva", "nublado"] },
  { id: "oasis-cast", title: "Cast No Shadow", artist: "Oasis", album: "(What's the Story) Morning Glory?", mood: ["nostálgico"], weather: ["chuva"] },
  { id: "stone-roses-made", title: "Made of Stone", artist: "The Stone Roses", album: "The Stone Roses", mood: ["leve"], season: ["primavera"] },
  { id: "bowie-modern-love", title: "Modern Love", artist: "David Bowie", album: "Let's Dance", mood: ["leve", "ensolarado"], season: ["outono"] },
  { id: "tears-head-over-heels", title: "Head Over Heels", artist: "Tears For Fears", album: "Songs from the Big Chair", mood: ["romântico", "noturno"], weather: ["chuva", "nublado"] },
  { id: "culture-club-karma", title: "Karma Chameleon", artist: "Culture Club", album: "Colour by Numbers", mood: ["leve", "ensolarado"] },
  { id: "george-careless", title: "Careless Whisper", artist: "George Michael", album: "Make It Big", mood: ["romântico", "noturno"], season: ["inverno"] },
  { id: "bonnie-total-eclipse", title: "Total Eclipse of the Heart", artist: "Bonnie Tyler", album: "Faster Than the Speed of Night", mood: ["noturno", "romântico"] },
  { id: "kim-bette-davis", title: "Bette Davis Eyes", artist: "Kim Carnes", album: "Mistaken Identity", mood: ["noturno"] },
  { id: "gotye-somebody", title: "Somebody That I Used To Know", artist: "Gotye", album: "Making Mirrors", mood: ["nostálgico"], weather: ["chuva"] },
  { id: "coldplay-viva", title: "Viva La Vida", artist: "Coldplay", album: "Viva la Vida or Death and All His Friends", mood: ["ensolarado", "leve"], weather: ["sol"] },
  { id: "capital-safe", title: "Safe and Sound", artist: "Capital Cities", album: "In a Tiding Wave of Mystery", mood: ["leve", "ensolarado"] },
  { id: "alphaville-forever", title: "Forever Young", artist: "Alphaville", album: "Forever Young", mood: ["nostálgico", "romântico"], season: ["inverno"] },
  { id: "aha-take-on-me", title: "Take On Me", artist: "a-ha", album: "Hunting High and Low", mood: ["leve", "ensolarado"] },
  { id: "abba-slipping", title: "Slipping Through My Fingers", artist: "ABBA", album: "The Visitors", mood: ["nostálgico"], season: ["outono"] },
  { id: "elton-tiny-dancer", title: "Tiny Dancer", artist: "Elton John", album: "Madman Across the Water", mood: ["leve", "romântico"] },
  { id: "elton-breaking", title: "Don't Go Breaking My Heart", artist: "Elton John", album: "A Single Man", mood: ["leve", "ensolarado"] },
  { id: "michael-beat-it", title: "Beat It", artist: "Michael Jackson", album: "Thriller", mood: ["ensolarado"] },
  { id: "michael-billie", title: "Billie Jean", artist: "Michael Jackson", album: "Thriller", mood: ["noturno"] },
  { id: "daft-one-more", title: "One More Time", artist: "Daft Punk", album: "Discovery", mood: ["ensolarado", "leve"] },
  { id: "stevie-part-time", title: "Part-Time Lover", artist: "Stevie Wonder", album: "In Square Circle", mood: ["leve", "romântico"] },
  { id: "kenny-footloose", title: "Footloose", artist: "Kenny Loggins", album: "Footloose", mood: ["ensolarado", "leve"] },
  { id: "aretha-prayer", title: "I Say a Little Prayer", artist: "Aretha Franklin", album: "Aretha Now", mood: ["romântico", "leve"] },
  { id: "tlc-no-scrubs", title: "No Scrubs", artist: "TLC", album: "FanMail", mood: ["leve"] },
  { id: "cheryl-real", title: "Got To Be Real", artist: "Cheryl Lynn", album: "Cheryl Lynn", mood: ["ensolarado", "leve"] },
  { id: "jacksons-boogie", title: "Blame It On The Boogie", artist: "The Jacksons", album: "Destiny", mood: ["ensolarado", "leve"] },
  { id: "kinks-rocket", title: "Supersonic Rocket Ship", artist: "The Kinks", album: "Everybody's in Show-Biz", mood: ["leve"] },
  { id: "tribalistas-namorar", title: "Já Sei Namorar", artist: "Tribalistas", album: "Tribalistas", mood: ["leve", "romântico"], season: ["verão"] },
  { id: "legiao-quase", title: "Quase Sem Querer", artist: "Legião Urbana", album: "Dois", mood: ["nostálgico"], weather: ["chuva"] },
  { id: "titas-adeus", title: "Pra Dizer Adeus", artist: "Titãs", album: "Televisão", mood: ["nostálgico", "romântico"] },
];

export const nowPlayingAlbums: NowPlayingAlbum[] = [
  { id: "revolver", title: "Revolver", artist: "The Beatles", year: 1966 },
  { id: "queen-is-dead", title: "The Queen Is Dead", artist: "The Smiths", year: 1986 },
  { id: "morning-glory", title: "(What's the Story) Morning Glory?", artist: "Oasis", year: 1995 },
  { id: "bad-guy", title: "Mr. Bad Guy", artist: "Freddie Mercury", year: 1985 },
  { id: "big-chair", title: "Songs from the Big Chair", artist: "Tears For Fears", year: 1985 },
  { id: "discovery", title: "Discovery", artist: "Daft Punk", year: 2001 },
  { id: "viva-la-vida", title: "Viva la Vida or Death and All His Friends", artist: "Coldplay", year: 2008 },
  { id: "tribalistas", title: "Tribalistas", artist: "Tribalistas", year: 2002 },
];

export function weekKey(date = new Date()): string {
  const firstDay = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((date.getTime() - firstDay.getTime()) / 86400000) + 1;
  return `${date.getUTCFullYear()}-${Math.ceil(dayOfYear / 7)}`;
}

function seasonFor(date: Date): Season {
  const month = date.getMonth() + 1;
  if (month <= 2 || month === 12) return "verão";
  if (month <= 5) return "outono";
  if (month <= 8) return "inverno";
  return "primavera";
}

function weatherFor(weather?: SaveWeather): Weather | undefined {
  const label = weather?.label.toLowerCase() ?? "";
  if (label.includes("chuva")) return "chuva";
  if (label.includes("nubl")) return "nublado";
  if (label.includes("frio")) return "frio";
  if (label.includes("sol") || label.includes("céu")) return "sol";
  if (label.includes("calor")) return "calor";
  return undefined;
}

function chapterFor(title?: string): string | undefined {
  return title?.toLowerCase().match(/capítulo\s+\d+/)?.[0];
}

export function pickWeeklyAlbum(previousId?: string): NowPlayingAlbum {
  const candidates = nowPlayingAlbums.filter((album) => album.id !== previousId);
  return candidates[Math.floor(Math.random() * candidates.length)] ?? nowPlayingAlbums[0];
}

export function pickNowPlayingTrack(
  state: Pick<AppState, "saveWeather" | "currentChapter">,
  weeklyAlbum?: NowPlayingAlbum,
  previousId?: string,
  date = new Date(),
): NowPlayingTrack {
  const season = seasonFor(date);
  const weather = weatherFor(state.saveWeather);
  const chapter = chapterFor(state.currentChapter.title);
  const candidates = nowPlayingTracks.filter((track) => track.id !== previousId);
  const weighted = candidates.map((track) => {
    let weight = track.weight ?? 1;
    if (track.season?.includes(season)) weight += 2;
    if (weather && track.weather?.includes(weather)) weight += 3;
    if (chapter && track.chapter?.includes(chapter)) weight += 2;
    if (weeklyAlbum && track.album === weeklyAlbum.title) weight += 2;
    if (weeklyAlbum && track.artist === weeklyAlbum.artist) weight += 0.5;
    return { track, weight };
  });
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = Math.random() * total;
  return weighted.find((item) => (cursor -= item.weight) <= 0)?.track ?? candidates[0] ?? nowPlayingTracks[0];
}

export function trackToNowPlaying(track: NowPlayingTrack): NowPlaying {
  return { title: track.title, artist: track.artist, album: track.album };
}
