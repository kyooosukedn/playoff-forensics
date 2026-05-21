"use client";

import { useState, useEffect } from "react";
import { formatCount } from "@/lib/data/mock-social";

interface LivePost {
  id: string;
  title: string;
  author: string;
  upvotes: number;
  commentCount: number;
  timeAgo: string;
  flair: string | null;
  flairColor: string | null;
  flairBg: string | null;
  permalink: string;
  topComment: { author: string; text: string; upvotes: number } | null;
}

export default function LiveRedditFeed() {
  const [posts, setPosts] = useState<LivePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/data/reddit");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
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
            <div className="h-4 bg-hairline-strong rounded w-3/4 mb-3" />
            <div className="h-3 bg-hairline rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-surface-card border border-hairline rounded-xl p-5 text-center">
        <p className="text-muted text-[13px]">Could not load Reddit posts. Using cached data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <div
          key={post.id}
          className="bg-surface-card border border-hairline rounded-xl overflow-hidden hover:border-hairline-strong transition-colors"
          style={{ animation: `dispatchSlideIn 0.5s ease-out ${i * 0.08}s both` }}
        >
          <div className="flex">
            {/* Upvote column */}
            <div
              className="flex flex-col items-center gap-1 py-4 px-3 border-r border-hairline"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff4500">
                <path d="M12 4l-8 8h5v8h6v-8h5z" />
              </svg>
              <span className="text-ink text-[13px] font-bold">{formatCount(post.upvotes)}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#666">
                <path d="M12 20l8-8h-5V4H9v8H4z" />
              </svg>
            </div>

            {/* Post content */}
            <div className="flex-1 p-4">
              {/* Flair + meta */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {post.flair && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      backgroundColor: post.flairBg || "rgba(255,69,0,0.15)",
                      color: post.flairColor || "#ff4500",
                    }}
                  >
                    {post.flair}
                  </span>
                )}
                <span
                  className="text-muted text-[11px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  r/nba · u/{post.author} · {post.timeAgo}
                </span>
              </div>

              {/* Title */}
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink text-[14px] font-medium leading-[1.5] mb-3 block no-underline hover:text-accent transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {post.title}
              </a>

              {/* Top comment */}
              {post.topComment && (
                <div className="bg-surface-soft rounded-lg p-3 border-l-2 border-hairline-strong">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-accent text-[11px] font-medium"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      u/{post.topComment.author}
                    </span>
                    <span className="text-muted-soft text-[10px]">·</span>
                    <span
                      className="text-muted text-[10px]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {formatCount(post.topComment.upvotes)} pts
                    </span>
                  </div>
                  <p className="text-body text-[13px] leading-[1.55]">{post.topComment.text}</p>
                </div>
              )}

              {/* Comment count */}
              <div className="mt-3 flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span
                  className="text-muted text-[11px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {formatCount(post.commentCount)} comments
                </span>
                <span className="text-muted-soft text-[10px] ml-1">· live</span>
                <span
                  className="w-1 h-1 rounded-full ml-1"
                  style={{ backgroundColor: "#27ae60", animation: "pulseAmber 2s infinite" }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
