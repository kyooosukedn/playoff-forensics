"use client";

import { useState, useEffect } from "react";

interface ESPNArticle {
  id: number;
  headline: string;
  description: string;
  byline: string | null;
  type: string;
  imageUrl: string | null;
  published: string;
  url: string;
  source: string;
  timeAgo: string;
}

export default function LiveESPNFeed() {
  const [articles, setArticles] = useState<ESPNArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/data/espn-news");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        setArticles(data.articles || []);
      } catch {} finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface-card border border-hairline rounded-xl p-5 animate-pulse">
            <div className="flex gap-4">
              <div className="w-24 h-16 bg-hairline-strong rounded-lg flex-shrink-0" />
              <div className="flex-1">
                <div className="h-4 bg-hairline rounded w-3/4 mb-2" />
                <div className="h-3 bg-hairline rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {articles.map((article, i) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-surface-card border border-hairline rounded-xl overflow-hidden hover:border-hairline-strong transition-colors no-underline group"
          style={{ animation: `dispatchSlideIn 0.5s ease-out ${i * 0.06}s both` }}
        >
          <div className="flex gap-4 p-4">
            {/* Image thumbnail */}
            {article.imageUrl && (
              <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Type badge + byline */}
              <div className="flex items-center gap-2 mb-1.5">
                {article.type === "Media" && (
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded font-bold uppercase"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      backgroundColor: "rgba(240,48,48,0.15)",
                      color: "#f03030",
                    }}
                  >
                    Video
                  </span>
                )}
                {article.byline && (
                  <span
                    className="text-muted text-[11px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {article.byline}
                  </span>
                )}
                <span className="text-muted-soft text-[10px]">·</span>
                <span
                  className="text-muted-soft text-[10px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {article.timeAgo}
                </span>
              </div>

              {/* Headline */}
              <h3
                className="text-ink text-[14px] font-medium leading-[1.4] mb-1 group-hover:text-accent transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {article.headline}
              </h3>

              {/* Description */}
              <p className="text-muted text-[12px] leading-[1.5] line-clamp-2">
                {article.description}
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
