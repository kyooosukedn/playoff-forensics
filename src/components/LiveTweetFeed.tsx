"use client";

import { useState, useEffect } from "react";

interface EmbeddedTweet {
  id: string;
  handle: string;
  displayName: string;
  html: string;
  url: string;
}

export default function LiveTweetFeed() {
  const [tweets, setTweets] = useState<EmbeddedTweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/data/tweets");
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();
        if (data.tweets?.length > 0) {
          setTweets(data.tweets);
          setFailed(false);
        } else {
          setFailed(true);
        }
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-surface-card border border-hairline rounded-xl p-5 animate-pulse">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-hairline-strong rounded-full" />
              <div className="h-3 bg-hairline rounded w-32" />
            </div>
            <div className="h-3 bg-hairline rounded w-full mb-2" />
            <div className="h-3 bg-hairline rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (failed || tweets.length === 0) {
    return (
      <div className="bg-surface-card border border-hairline rounded-xl p-5 text-center">
        <p className="text-muted text-[13px]">
          Live tweets unavailable. Embedding requires specific tweet URLs.
        </p>
        <p className="text-muted-soft text-[11px] mt-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Add tweet URLs to src/lib/data/tweet-oembed.ts
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tweets.map((tweet, i) => (
        <div
          key={tweet.id}
          className="bg-surface-card border border-hairline rounded-xl overflow-hidden"
          style={{ animation: `dispatchSlideIn 0.5s ease-out ${i * 0.08}s both` }}
        >
          <div
            className="tweet-embed [&_iframe]:!max-w-full [&_iframe]:dark-bg-fix"
            dangerouslySetInnerHTML={{ __html: tweet.html }}
          />
        </div>
      ))}
    </div>
  );
}
