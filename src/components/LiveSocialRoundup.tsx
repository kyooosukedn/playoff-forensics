"use client";

import { useState, useEffect } from "react";

interface PlayerReaction {
  player: string;
  team: string;
  teamAbbr: string;
  platform: string;
  reaction: string;
  context: string;
}

interface SocialData {
  summary: string;
  reactions: PlayerReaction[];
  trendingTopics: string[];
}

const platformIcons: Record<string, { icon: string; color: string }> = {
  "Instagram Stories": { icon: "📷", color: "#e1306c" },
  "Twitter/X": { icon: "𝕏", color: "#e7e9ea" },
  TikTok: { icon: "🎵", color: "#ff0050" },
  Instagram: { icon: "📷", color: "#e1306c" },
};

const gradients = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
];

export default function LiveSocialRoundup() {
  const [data, setData] = useState<SocialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/data/social");
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        if (json.reactions?.length > 0) {
          setData(json);
        }
      } catch {} finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-surface-card border border-hairline rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-hairline-strong rounded-full" />
              <div className="h-3 bg-hairline rounded w-24" />
            </div>
            <div className="h-3 bg-hairline rounded w-full mb-1" />
            <div className="h-3 bg-hairline rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || data.reactions.length === 0) {
    return (
      <div className="bg-surface-card border border-hairline rounded-xl p-5 text-center">
        <p className="text-muted text-[13px]">
          Live social reactions require GEMINI_API_KEY to be configured.
        </p>
        <p
          className="text-muted-soft text-[11px] mt-1"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Add to .env.local to enable Gemini-powered social search
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary */}
      {data.summary && (
        <div className="bg-surface-soft border border-hairline rounded-xl p-4 mb-2">
          <p className="text-body-strong text-[13px] leading-[1.6]">{data.summary}</p>
          {data.trendingTopics?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {data.trendingTopics.map((topic, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-hairline text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  #{topic}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reaction cards */}
      {data.reactions.map((reaction, i) => {
        const platform = platformIcons[reaction.platform] || { icon: "📱", color: "#666" };
        return (
          <div
            key={i}
            className="relative overflow-hidden rounded-xl border border-hairline group"
            style={{ animation: `dispatchSlideIn 0.5s ease-out ${i * 0.08}s both` }}
          >
            {/* Background gradient */}
            <div
              className="absolute inset-0"
              style={{ background: gradients[i % gradients.length], opacity: 0.08 }}
            />

            <div className="relative p-4">
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                {/* Story ring */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                    padding: "2px",
                  }}
                >
                  <div className="w-full h-full rounded-full bg-surface-card flex items-center justify-center">
                    <span className="text-[13px] font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {reaction.player.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div
                    className="text-ink text-[13px] font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {reaction.player}
                  </div>
                  <div
                    className="text-muted text-[10px] tracking-[0.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {reaction.teamAbbr} · via {reaction.platform} {platform.icon}
                  </div>
                </div>
              </div>

              {/* Reaction text */}
              <p className="text-body-strong text-[13px] leading-[1.6] mb-2">
                {reaction.reaction}
              </p>

              {/* Context */}
              <div
                className="text-muted-soft text-[10px] tracking-[0.5px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Re: {reaction.context}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
