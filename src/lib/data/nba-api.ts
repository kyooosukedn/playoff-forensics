const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/basketball/nba";

interface ESPNTeam {
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  logo: string;
  records?: { summary: string }[];
  score?: string;
}

interface ESPNCompetitor {
  team: ESPNTeam;
  score?: string;
  records?: { summary: string }[];
  homeAway: "home" | "away";
  winner?: boolean;
}

export interface GameScore {
  id: string;
  date: string;
  status: string;
  shortDetail: string;
  homeTeam: {
    id: string;
    abbr: string;
    name: string;
    logo: string;
    score: number;
    record: string;
    winner: boolean;
  };
  awayTeam: {
    id: string;
    abbr: string;
    name: string;
    logo: string;
    score: number;
    record: string;
    winner: boolean;
  };
}

let scoresCache: { data: GameScore[]; timestamp: number } | null = null;
const CACHE_TTL = 60_000;

export async function getPlayoffScores(): Promise<GameScore[]> {
  if (scoresCache && Date.now() - scoresCache.timestamp < CACHE_TTL) {
    return scoresCache.data;
  }

  const res = await fetch(`${ESPN_BASE}/scoreboard`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`ESPN API error: ${res.status}`);

  const json = await res.json();
  const events = json.events ?? [];

  const games: GameScore[] = events.map((event: any) => {
    const comp = event.competitions?.[0];
    if (!comp) return null;

    const home = comp.competitors?.find((c: ESPNCompetitor) => c.homeAway === "home");
    const away = comp.competitors?.find((c: ESPNCompetitor) => c.homeAway === "away");

    if (!home || !away) return null;

    return {
      id: event.id,
      date: event.date,
      status: comp.status?.type?.name ?? "unknown",
      shortDetail: comp.status?.type?.shortDetail ?? "",
      homeTeam: {
        id: home.team.id,
        abbr: home.team.abbreviation,
        name: home.team.shortDisplayName ?? home.team.displayName,
        logo: home.team.logo,
        score: parseInt(home.score ?? "0", 10),
        record: home.records?.[0]?.summary ?? "",
        winner: home.winner ?? false,
      },
      awayTeam: {
        id: away.team.id,
        abbr: away.team.abbreviation,
        name: away.team.shortDisplayName ?? away.team.displayName,
        logo: away.team.logo,
        score: parseInt(away.score ?? "0", 10),
        record: away.records?.[0]?.summary ?? "",
        winner: away.winner ?? false,
      },
    };
  }).filter(Boolean);

  scoresCache = { data: games, timestamp: Date.now() };
  return games;
}

export async function getBoxScore(gameId: string) {
  const res = await fetch(`${ESPN_BASE}/summary?event=${gameId}`, {
    next: { revalidate: 120 },
  });
  if (!res.ok) throw new Error(`Box score API error: ${res.status}`);
  return res.json();
}
