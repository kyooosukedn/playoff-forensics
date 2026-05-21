"use client";

import { IGStory } from "@/lib/data/mock-social";

interface IGStoryCardProps {
  story: IGStory;
  index?: number;
}

export default function IGStoryCard({ story, index = 0 }: IGStoryCardProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-hairline group cursor-pointer"
      style={{
        animation: `dispatchSlideIn 0.5s ease-out ${0.1 + index * 0.1}s both`,
        minHeight: "220px",
      }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{ background: story.gradient, opacity: 0.15 }}
      />

      {/* Content */}
      <div className="relative p-5 flex flex-col h-full">
        {/* Player header */}
        <div className="flex items-center gap-3 mb-4">
          {/* Story ring */}
          <div className="relative">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)`,
                padding: "2px",
              }}
            >
              <div className="w-full h-full rounded-full bg-surface-card flex items-center justify-center">
                <span className="text-lg">{story.emoji}</span>
              </div>
            </div>
          </div>

          <div>
            <div
              className="text-ink text-[13px] font-semibold"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {story.player}
            </div>
            <div
              className="text-muted text-[11px] tracking-[0.5px] uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {story.teamAbbr} · {story.timestamp}
            </div>
          </div>

          {/* IG icon */}
          <div className="ml-auto">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#666" stroke="none" />
            </svg>
          </div>
        </div>

        {/* Reaction text */}
        <p
          className="text-body-strong text-[14px] leading-[1.6] flex-1"
          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          {story.reaction}
        </p>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between mt-4 pt-3 border-t border-white/5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <span className="text-muted-soft text-[10px] uppercase tracking-[1px]">
            Player Reaction
          </span>
          <span className="text-muted text-[11px]">{story.team}</span>
        </div>
      </div>
    </div>
  );
}
