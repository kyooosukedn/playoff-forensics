"use client";

import { useState, useEffect } from "react";

interface Player {
  playerId: number;
  player: string;
  team: string;
  gp: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fgPct: number;
  fg3Pct: number;
  ftPct: number;
  tov: number;
  min: number;
  eff: number;
}

export default function PlayerStatsTable({ pythonApiUrl }: { pythonApiUrl?: string }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<string>("pts");

  const apiUrl = pythonApiUrl || "http://localhost:8000";

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${apiUrl}/stats/players`);
        if (res.ok) {
          const data = await res.json();
          setPlayers(data.players || []);
        }
      } catch {} finally {
        setLoading(false);
      }
    }
    load();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="bg-surface-card border border-hairline rounded-xl p-6 animate-pulse">
        <div className="h-5 bg-hairline rounded w-48 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 bg-hairline rounded mb-2" />
        ))}
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="bg-surface-card border border-hairline rounded-xl p-6 text-center">
        <p className="text-muted text-[13px]">Start the Python API to load live stats.</p>
        <p
          className="text-muted-soft text-[11px] mt-2"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          cd python-api && pip install -r requirements.txt && uvicorn main:app --reload
        </p>
      </div>
    );
  }

  const sorted = [...players].sort((a, b) =>
    (b as any)[sortKey] - (a as any)[sortKey]
  );

  const statColumns = [
    { key: "pts", label: "PTS", width: "50px" },
    { key: "reb", label: "REB", width: "50px" },
    { key: "ast", label: "AST", width: "50px" },
    { key: "stl", label: "STL", width: "45px" },
    { key: "blk", label: "BLK", width: "45px" },
    { key: "fgPct", label: "FG%", width: "55px" },
    { key: "fg3Pct", label: "3P%", width: "55px" },
    { key: "tov", label: "TOV", width: "45px" },
    { key: "eff", label: "EFF", width: "50px" },
  ];

  return (
    <div className="bg-surface-card border border-hairline rounded-xl overflow-hidden">
      <div className="p-5 border-b border-hairline">
        <h3
          className="text-ink text-[14px] font-semibold"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Playoff Performers
          <span
            className="text-muted-soft text-[10px] ml-2 uppercase tracking-[1px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            nba_api + pandas
          </span>
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-hairline">
              <th
                className="text-left px-5 py-3 text-[10px] uppercase tracking-[1px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
              >
                Player
              </th>
              <th
                className="text-left px-3 py-3 text-[10px] uppercase tracking-[1px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
              >
                Team
              </th>
              <th
                className="text-center px-3 py-3 text-[10px] uppercase tracking-[1px]"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "#666" }}
              >
                GP
              </th>
              {statColumns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => setSortKey(col.key)}
                  className="text-center px-3 py-3 text-[10px] uppercase tracking-[1px] cursor-pointer hover:text-accent transition-colors"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    color: sortKey === col.key ? "#d4a017" : "#666",
                    minWidth: col.width,
                  }}
                >
                  {col.label} {sortKey === col.key && "▼"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.slice(0, 15).map((p, i) => (
              <tr
                key={p.playerId}
                className="border-b border-hairline hover:bg-surface-hover transition-colors"
                style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.03}s both` }}
              >
                <td className="px-5 py-3">
                  <span
                    className="text-ink text-[13px] font-medium"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {p.player}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <span
                    className="text-muted text-[12px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {p.team}
                  </span>
                </td>
                <td
                  className="text-center px-3 py-3 text-muted text-[12px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {p.gp}
                </td>
                {statColumns.map((col) => {
                  const val = (p as any)[col.key];
                  const isLeading = col.key === sortKey;
                  return (
                    <td
                      key={col.key}
                      className="text-center px-3 py-3 text-[13px]"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        color: isLeading ? "#d4a017" : "#d4d4d4",
                        fontWeight: isLeading ? 600 : 400,
                      }}
                    >
                      {typeof val === "number" ? (val < 1 ? val.toFixed(3) : val.toFixed(1)) : val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
