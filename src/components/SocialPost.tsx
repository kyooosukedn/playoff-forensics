"use client";

import { useState } from "react";
import { XPost, formatCount } from "@/lib/data/mock-social";

interface SocialPostProps {
  post: XPost;
  index?: number;
}

export default function SocialPost({ post, index = 0 }: SocialPostProps) {
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  return (
    <div
      className="bg-surface-card border border-hairline rounded-xl p-5 group hover:border-hairline-strong transition-colors"
      style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.1 + index * 0.08}s both` }}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            backgroundColor: post.handle === "ShamsCharania" ? "#1da1f2" :
              post.handle === "KendrickPerkins" ? "#ff6b35" :
              post.handle === "BleacherReport" ? "#000" : "#333",
            color: "#fff",
          }}
        >
          {post.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className="text-ink text-[14px] font-semibold truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {post.displayName}
            </span>
            {post.verified && (
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="#d4a017">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            )}
            <span
              className="text-muted text-[13px] truncate"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              @{post.handle}
            </span>
            <span className="text-muted-soft text-[12px]">·</span>
            <span className="text-muted-soft text-[12px]">{post.timestamp}</span>
          </div>

          {/* Post text */}
          <p
            className="text-body-strong text-[14px] leading-[1.6] mt-2"
            style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
          >
            {post.text}
          </p>

          {/* Quote tweet */}
          {post.isQuote && post.quotedPost && (
            <div className="mt-3 border border-hairline rounded-lg p-3">
              <span
                className="text-muted text-[12px]"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                @{post.quotedPost.handle}
              </span>
              <p className="text-body text-[13px] mt-1">{post.quotedPost.text}</p>
            </div>
          )}

          {/* Engagement bar */}
          <div
            className="flex items-center gap-6 mt-3 text-muted"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}
          >
            <button
              className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors"
              style={{ color: liked ? "#d4a017" : "#666" }}
              onClick={() => setLiked(!liked)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={liked ? "#d4a017" : "none"} stroke={liked ? "#d4a017" : "currentColor"} strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {formatCount(post.likes + (liked ? 1 : 0))}
            </button>

            <button
              className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer transition-colors"
              style={{ color: retweeted ? "#27ae60" : "#666" }}
              onClick={() => setRetweeted(!retweeted)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              {formatCount(post.retweets + (retweeted ? 1 : 0))}
            </button>

            <span className="flex items-center gap-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              {formatCount(post.replies)}
            </span>

            <span className="flex items-center gap-1.5 ml-auto">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
              {formatCount(post.views)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
