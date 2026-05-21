"use client";

import { useState, useEffect } from "react";

interface WinProbData {
  homeWinProbability: number;
  awayWinProbability: number;
  scoreDiff: number;
  timeRemaining: number;
  quarter: number;
  leverageIndex: number;
}

interface WinProbGaugeProps {
  pythonApiUrl?: string;
}

export default function WinProbGauge({ pythonApiUrl }: WinProbGaugeProps) {
  const [prob, setProb] = useState<WinProbData | null>(null);
  const [loading, setLoading] = useState(true);
  const [customInput, setCustomInput] = useState({
    homeScore: 98,
    awayScore: 96,
    quarter: 4,
    secondsLeft: 324,
    homeRating: 5.2,
    awayRating: 3.8,
  });

  const apiUrl = pythonApiUrl || "http://localhost:8000";

  useEffect(() => {
    async function fetchSample() {
      try {
        const res = await fetch(`${apiUrl}/predictions/win-probability/sample`);
        if (res.ok) {
          const data = await res.json();
          setProb(data);
        }
      } catch {} finally {
        setLoading(false);
      }
    }
    fetchSample();
  }, [apiUrl]);

  async function runPrediction() {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/predictions/win-probability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeScore: customInput.homeScore,
          awayScore: customInput.awayScore,
          quarter: customInput.quarter,
          secondsLeftInQtr: customInput.secondsLeft,
          homeNetRating: customInput.homeRating,
          awayNetRating: customInput.awayRating,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setProb(data);
      }
    } catch {} finally {
      setLoading(false);
    }
  }

  const homePct = prob ? Math.round(prob.homeWinProbability * 100) : 50;
  const awayPct = prob ? Math.round(prob.awayWinProbability * 100) : 50;

  return (
    <div className="bg-surface-card border border-hairline rounded-xl p-6">
      <h3
        className="text-ink text-[14px] font-semibold mb-5"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Win Probability Engine
        <span
          className="text-muted-soft text-[10px] ml-2 uppercase tracking-[1px]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          PyTorch Neural Net
        </span>
      </h3>

      {/* Probability bar */}
      {prob && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span
              className="text-ink text-[24px] font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {homePct}%
            </span>
            <span
              className="text-muted text-[11px] self-center"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {prob.quarter > 0 ? `Q${prob.quarter}` : "Final"} · {Math.floor(prob.timeRemaining / 60)}:{String(prob.timeRemaining % 60).padStart(2, "0")}
            </span>
            <span
              className="text-ink text-[24px] font-bold"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {awayPct}%
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden flex bg-surface-soft">
            <div
              className="h-full transition-all duration-700 rounded-l-full"
              style={{
                width: `${homePct}%`,
                background: homePct > 50
                  ? "linear-gradient(90deg, #27ae60, #2ecc71)"
                  : "linear-gradient(90deg, #c0392b, #e74c3c)",
              }}
            />
            <div
              className="h-full transition-all duration-700 rounded-r-full"
              style={{
                width: `${awayPct}%`,
                background: awayPct > 50
                  ? "linear-gradient(90deg, #2ecc71, #27ae60)"
                  : "linear-gradient(90deg, #e74c3c, #c0392b)",
              }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-body text-[12px]">Home</span>
            <span
              className="text-muted text-[10px]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Leverage: {prob.leverageIndex}
            </span>
            <span className="text-body text-[12px]">Away</span>
          </div>
        </div>
      )}

      {/* Input controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Home Score", key: "homeScore", value: customInput.homeScore },
          { label: "Away Score", key: "awayScore", value: customInput.awayScore },
          { label: "Quarter", key: "quarter", value: customInput.quarter, min: 1, max: 4 },
          { label: "Secs Left in QTR", key: "secondsLeft", value: customInput.secondsLeft, min: 0, max: 720 },
          { label: "Home Net Rtg", key: "homeRating", value: customInput.homeRating, step: 0.1 },
          { label: "Away Net Rtg", key: "awayRating", value: customInput.awayRating, step: 0.1 },
        ].map((field) => (
          <div key={field.key}>
            <label
              className="text-muted text-[10px] uppercase tracking-[0.5px] block mb-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {field.label}
            </label>
            <input
              type="number"
              value={field.value}
              min={(field as any).min}
              max={(field as any).max}
              step={(field as any).step || 1}
              onChange={(e) =>
                setCustomInput({ ...customInput, [field.key]: parseFloat(e.target.value) || 0 })
              }
              className="w-full bg-surface-soft border border-hairline rounded-lg px-3 py-2 text-ink text-[13px]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={runPrediction}
        disabled={loading}
        className="mt-4 w-full py-2.5 rounded-lg text-[11px] tracking-[1px] uppercase font-semibold border-none cursor-pointer transition-colors"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          backgroundColor: loading ? "#333" : "#d4a017",
          color: loading ? "#666" : "#050505",
        }}
      >
        {loading ? "Computing..." : "Run Prediction"}
      </button>
    </div>
  );
}
