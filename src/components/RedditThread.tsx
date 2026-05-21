"use client";

import { RedditPost, formatCount } from "@/lib/data/mock-social";

interface RedditThreadProps {
  post: RedditPost;
  index?: number;
}

export default function RedditThread({ post, index = 0 }: RedditThreadProps) {
  return (
    <div
      className="bg-surface-card border border-hairline rounded-xl overflow-hidden group hover:border-hairline-strong transition-colors"
      style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.1 + index * 0.1}s both` }}
    >
      <div className="flex">
        {/* Upvote column */}
        <div
          className="flex flex-col items-center gap-1 py-4 px-3 border-r border-hairline"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#ff4500" stroke="none">
            <path d="M12 4l-8 8h5v8h6v-8h5z" />
          </svg>
          <span className="text-ink text-[13px] font-bold">{formatCount(post.upvotes)}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#666" stroke="none">
            <path d="M12 20l8-8h-5V4H9v8H4z" />
          </svg>
        </div>

        {/* Post content */}
        <div className="flex-1 p-4">
          {/* Flair + meta */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                backgroundColor:
                  post.flair === "Post Game" ? "rgba(39,174,96,0.15)" :
                  post.flair === "Analytics" ? "rgba(93,173,226,0.15)" :
                  "rgba(255,69,0,0.15)",
                color:
                  post.flair === "Post Game" ? "#27ae60" :
                  post.flair === "Analytics" ? "#5dade2" :
                  "#ff4500",
              }}
            >
              {post.flair}
            </span>
            <span
              className="text-muted text-[11px]"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {post.subreddit} · {post.author} · {post.timestamp}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-ink text-[14px] font-medium leading-[1.5] mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {post.title}
          </h3>

          {/* Top comment */}
          <div className="bg-surface-soft rounded-lg p-3 border-l-2 border-hairline-strong">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-accent text-[11px] font-medium"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {post.topComment.author}
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
          </div>
        </div>
      </div>
    </div>
  );
}
