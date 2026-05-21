"use client";

import { useState } from "react";
import AgentAvatar from "./AgentAvatar";

interface AgentDispatchProps {
  agent: "bleacher" | "espn" | "nbatv" | "reddit";
  agentName: string;
  timestamp: string;
  dispatch: string;
  index?: number;
}

const agentPersonality: Record<string, string> = {
  bleacher: "I feel the game before I see it.",
  espn: "The film doesn't lie. Neither do I.",
  nbatv: "From the booth. No filter needed.",
  reddit: "Hot takes. Cold stats. No mercy.",
};

const agentColors: Record<string, string> = {
  bleacher: "#ff6b35",
  espn: "#f03030",
  nbatv: "#c8102e",
  reddit: "#ff4500",
};

export default function AgentDispatch({
  agent,
  agentName,
  timestamp,
  dispatch,
  index = 0,
}: AgentDispatchProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = dispatch.length > 200;
  const displayText = !expanded && isLong ? dispatch.slice(0, 200) + "..." : dispatch;
  const color = agentColors[agent];

  return (
    <div
      className="relative group"
      style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.15 + index * 0.1}s both` }}
    >
      {/* Gradient glow border on hover */}
      <div
        className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color}40, transparent 50%)`,
        }}
      />

      <div className="relative bg-surface-card border border-hairline rounded-xl p-6 transition-colors duration-300">
        {/* Agent header */}
        <div className="flex items-start gap-4 mb-4">
          <AgentAvatar agent={agent} size="sm" interactive />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="text-ink text-[15px] font-semibold"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {agentName}
              </span>
              <span className="text-muted-soft text-[10px]">·</span>
              <span
                className="text-muted text-[11px] tracking-[0.5px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {timestamp}
              </span>
            </div>
            <div
              className="text-muted-soft text-[11px] mt-0.5 italic"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {agentPersonality[agent]}
            </div>
          </div>
        </div>

        {/* Dispatch text */}
        <p
          className="text-body-strong text-[14px] leading-[1.7] tracking-[0.3px]"
          style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
        >
          {displayText}
        </p>

        {/* Expand/collapse */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-[11px] tracking-[1px] uppercase border-none bg-transparent cursor-pointer transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color,
            }}
          >
            {expanded ? "← collapse" : "read full dispatch →"}
          </button>
        )}

        {/* Live indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: color,
              animation: "pulseAmber 1.5s ease-in-out infinite",
            }}
          />
          <span
            className="text-muted-soft text-[9px] uppercase tracking-[1px]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            live
          </span>
        </div>
      </div>
    </div>
  );
}
