"use client";

import { useEffect, useState } from "react";

interface GameScore {
  id: string;
  date: string;
  status: string;
  shortDetail: string;
  homeTeam: {
    abbr: string;
    name: string;
    logo: string;
    score: number;
    record: string;
    winner: boolean;
  };
  awayTeam: {
    abbr: string;
    name: string;
    logo: string;
    score: number;
    record: string;
    winner: boolean;
  };
}

export default function LiveScoreboard() {
  const [games, setGames] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScores() {
      try {
        const res = await fetch("/api/data/scores");
        if (!res.ok) throw new Error("Failed to fetch scores");
        const data = await res.json();
        setGames(data.games ?? []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchScores();
    const interval = setInterval(fetchScores, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-surface-card border border-hairline rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-surface-elevated rounded w-3/4 mb-3" />
            <div className="h-3 bg-surface-elevated rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface-card border border-hairline rounded-lg p-4">
        <span
          className="text-alert text-[11px] tracking-[0.5px] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          API Error: {error}
        </span>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="bg-surface-card border border-hairline rounded-lg p-6 text-center">
        <span
          className="text-muted text-[11px] tracking-[0.5px] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          No games today — monitoring...
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {games.map((game, i) => {
        const isLive = game.status === "in" || game.shortDetail?.includes("Q");
        const isFinal = game.status === "status_final";
        const isScheduled = game.status === "scheduled";

        return (
          <div
            key={game.id}
            className="bg-surface-card border border-hairline rounded-lg p-4 hover:border-hairline-strong transition-colors"
            style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both` }}
          >
            {/* Status */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-[10px] tracking-[1px] uppercase px-2 py-0.5 rounded ${
                  isLive
                    ? "bg-accent-glow text-accent"
                    : isFinal
                    ? "bg-[rgba(39,174,96,0.12)] text-verified"
                    : "bg-surface-elevated text-muted"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {isLive && <span className="inline-block w-1 h-1 bg-accent rounded-full mr-1 animate-pulse" />}
                {isLive ? game.shortDetail : isFinal ? "Final" : "Scheduled"}
              </span>
              <span
                className="text-muted-soft text-[10px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
            </div>

            {/* Matchup */}
            <div className="space-y-2">
              {/* Away */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {game.awayTeam.logo && (
                    <img src={game.awayTeam.logo} alt="" className="w-5 h-5 object-contain" />
                  )}
                  <span className="text-ink text-[13px] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {game.awayTeam.abbr}
                  </span>
                </div>
                <span
                  className={`text-[16px] ${game.awayTeam.winner ? "text-accent" : "text-ink"}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {game.awayTeam.score}
                </span>
              </div>

              {/* Home */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {game.homeTeam.logo && (
                    <img src={game.homeTeam.logo} alt="" className="w-5 h-5 object-contain" />
                  )}
                  <span className="text-ink text-[13px] font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {game.homeTeam.abbr}
                  </span>
                </div>
                <span
                  className={`text-[16px] ${game.homeTeam.winner ? "text-accent" : "text-ink"}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {game.homeTeam.score}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
