"use client";

import { useState } from "react";
import AgentAvatar from "./AgentAvatar";

interface AgentCardProps {
  agent: {
    slug: string;
    name: string;
    personality: string;
    tagline: string;
    description: string;
    totalDispatches: number;
    lastActive: string;
    latestDispatch: string;
    glitchQuote: string;
  };
  index: number;
}

const slugToKey: Record<string, "bleacher" | "espn" | "nbatv" | "reddit"> = {
  bleacher: "bleacher",
  espn: "espn",
  nbatv: "nbatv",
  reddit: "reddit",
};

const agentColors: Record<string, string> = {
  bleacher: "#ff6b35",
  espn: "#f03030",
  nbatv: "#c8102e",
  reddit: "#ff4500",
};

export default function AgentCard({ agent, index }: AgentCardProps) {
  const [isPoked, setIsPoked] = useState(false);
  const key = slugToKey[agent.slug];
  const color = agentColors[agent.slug];

  const handlePoke = () => {
    setIsPoked(true);
    setTimeout(() => setIsPoked(false), 1200);
  };

  return (
    <div
      className="relative group"
      style={{ animation: `dispatchSlideIn 0.6s ease-out ${0.15 + index * 0.12}s both` }}
    >
      {/* Outer glow */}
      <div
        className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(160deg, ${color}30, transparent 40%, transparent 60%, ${color}20)`,
        }}
      />

      <div className="relative bg-surface-card border border-hairline rounded-2xl overflow-hidden">
        {/* Top accent line */}
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            opacity: isPoked ? 1 : 0.3,
            transition: "opacity 0.3s",
          }}
        />

        <div className="p-6">
          {/* Avatar + header */}
          <div className="flex items-start gap-5 mb-5">
            <div className="flex-shrink-0 mt-1">
              <AgentAvatar agent={key} size="lg" interactive />
            </div>
            <div className="flex-1 min-w-0">
              <h2
                className="text-ink text-xl font-semibold mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {agent.name}
              </h2>
              <div
                className="text-[12px] italic mb-2"
                style={{ fontFamily: "'JetBrains Mono', monospace", color }}
              >
                &ldquo;{agent.tagline}&rdquo;
              </div>
              <div
                className="text-muted-soft text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {agent.personality}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center gap-4 mb-5 pb-5 border-b border-hairline"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: color,
                  animation: isPoked ? "agentGlitch 0.3s ease-in-out" : "pulseAmber 2s ease-in-out infinite",
                }}
              />
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {agent.lastActive}
              </span>
            </div>
            <span className="text-muted-soft text-[10px]">·</span>
            <span
              className="text-muted text-[11px] tracking-[0.5px] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {agent.totalDispatches} dispatches
            </span>
          </div>

          {/* Latest dispatch */}
          <div className="mb-4">
            <div
              className="text-muted-soft text-[10px] tracking-[1px] uppercase mb-2"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Latest Dispatch
            </div>
            <p
              className="text-body-strong text-[13px] leading-[1.65] tracking-[0.3px]"
              style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
            >
              {agent.latestDispatch}
            </p>
          </div>

          {/* Actions row */}
          <div className="flex items-center justify-between">
            <a
              href={`/agents/${agent.slug}`}
              className="inline-flex items-center gap-2 text-[11px] tracking-[1px] uppercase no-underline transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color,
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View Channel →
            </a>

            <button
              onClick={handlePoke}
              className="text-[10px] tracking-[1px] uppercase border border-hairline rounded-md px-3 py-1.5 bg-transparent cursor-pointer transition-all duration-200"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: isPoked ? color : "#666",
                borderColor: isPoked ? `${color}60` : undefined,
              }}
            >
              {isPoked ? agent.glitchQuote : "poke me"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
