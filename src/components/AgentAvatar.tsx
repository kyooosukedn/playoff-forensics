"use client";

import { useState, useRef } from "react";

type AgentShape = "cube" | "sphere" | "hexagon" | "diamond";

interface AgentAvatarProps {
  agent: "bleacher" | "espn" | "nbatv" | "reddit";
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  interactive?: boolean;
  className?: string;
}

const agentConfig: Record<string, {
  color: string;
  glowColor: string;
  shape: AgentShape;
  symbol: string;
  personality: string;
  tagline: string;
}> = {
  bleacher: {
    color: "#ff6b35",
    glowColor: "rgba(255,107,53,0.35)",
    shape: "cube",
    symbol: "B",
    personality: "loud, chaotic, always screaming",
    tagline: "I feel the game before I see it.",
  },
  espn: {
    color: "#f03030",
    glowColor: "rgba(240,48,48,0.35)",
    shape: "sphere",
    symbol: "E",
    personality: "calculated, numbers-obsessed, never wrong (until proven wrong)",
    tagline: "The film doesn't lie. Neither do I.",
  },
  nbatv: {
    color: "#c8102e",
    glowColor: "rgba(200,16,46,0.35)",
    shape: "hexagon",
    symbol: "T",
    personality: "broadcast-polished, coaching DNA, sees everything",
    tagline: "From the booth. No filter needed.",
  },
  reddit: {
    color: "#ff4500",
    glowColor: "rgba(255,69,0,0.35)",
    shape: "diamond",
    symbol: "R",
    personality: "raw, meme-fluent, dangerously confident",
    tagline: "Hot takes. Cold stats. No mercy.",
  },
};

const sizeMap = {
  sm: { container: "w-10 h-10", text: "text-sm", ring: 44 },
  md: { container: "w-14 h-14", text: "text-lg", ring: 60 },
  lg: { container: "w-20 h-20", text: "text-2xl", ring: 84 },
  xl: { container: "w-28 h-28", text: "text-4xl", ring: 116 },
};

export default function AgentAvatar({
  agent,
  size = "md",
  animated = true,
  interactive = true,
  className = "",
}: AgentAvatarProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const [isPoked, setIsPoked] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = agentConfig[agent];
  const s = sizeMap[size];

  const handlePoke = () => {
    if (!interactive) return;
    setIsGlitching(true);
    setIsPoked(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsGlitching(false);
      setIsPoked(false);
    }, 600);
  };

  const shapeStyle: React.CSSProperties = {
    backgroundColor: config.color,
    ...(config.shape === "cube" && { borderRadius: "6px", transform: "rotate(8deg)" }),
    ...(config.shape === "sphere" && { borderRadius: "50%" }),
    ...(config.shape === "hexagon" && { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }),
    ...(config.shape === "diamond" && { clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }),
  };

  const floatDuration = agent === "bleacher" ? "3s" : agent === "espn" ? "4s" : agent === "nbatv" ? "3.5s" : "2.5s";

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Pulse ring */}
      {animated && (
        <div
          className="absolute rounded-full"
          style={{
            width: s.ring,
            height: s.ring,
            border: `1px solid ${config.color}`,
            opacity: 0.3,
            animation: "ringPulse 2.5s ease-out infinite",
          }}
        />
      )}

      {/* Glow backdrop */}
      {animated && (
        <div
          className="absolute rounded-full"
          style={{
            width: s.ring * 0.8,
            height: s.ring * 0.8,
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
            animation: "agentBreathe 4s ease-in-out infinite",
          }}
        />
      )}

      {/* Main shape */}
      <div
        className={`${s.container} flex items-center justify-center select-none relative overflow-hidden`}
        style={{
          ...shapeStyle,
          fontFamily: "'JetBrains Mono', monospace",
          color: "#050505",
          fontWeight: 800,
          animation: animated
            ? `agentFloat ${floatDuration} ease-in-out infinite${isGlitching ? ", agentGlitch 0.3s ease-in-out" : ""}`
            : isGlitching
            ? "agentGlitch 0.3s ease-in-out"
            : "none",
          cursor: interactive ? "pointer" : "default",
          "--glow-color": config.glowColor,
        } as React.CSSProperties}
        onClick={handlePoke}
        onMouseEnter={handlePoke}
      >
        <span className={s.text} style={{ position: "relative", zIndex: 2 }}>
          {config.symbol}
        </span>

        {/* Scan line overlay */}
        {animated && (
          <div
            className="absolute left-0 right-0 h-[2px] opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
              animation: "agentScanLine 3s linear infinite",
            }}
          />
        )}
      </div>

      {/* Poke reaction tooltip */}
      {isPoked && interactive && (
        <div
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.5px] uppercase"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: config.color,
            animation: "fadeInUp 0.2s ease-out both",
          }}
        >
          {agent === "bleacher" && "yo what was that for?!"}
          {agent === "espn" && "data integrity compromised."}
          {agent === "nbatv" && "we'll review that on replay."}
          {agent === "reddit" && "bro. BRO."}
        </div>
      )}
    </div>
  );
}
