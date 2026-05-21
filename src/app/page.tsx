import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import LiveScoreboard from "@/components/LiveScoreboard";
import SocialPost from "@/components/SocialPost";
import IGStoryCard from "@/components/IGStoryCard";
import RedditThread from "@/components/RedditThread";
import { xPosts, igStories, redditPosts, bleacherDrops, formatCount } from "@/lib/data/mock-social";

export default function WarRoom() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        {/* Hero */}
        <section className="border-b border-hairline px-8 py-10 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="flex items-center gap-3 mb-3"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Live Feed — Western Conference Semifinals
              </span>
            </div>

            <h1
              className="text-ink text-[36px] md:text-[48px] font-normal leading-[1.1] tracking-[1px] uppercase mb-3"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              What Everyone&apos;s Saying
            </h1>

            <p
              className="text-body text-[16px] max-w-2xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Real narratives from real sources. Players, media, fans — everyone has a take.
              Here&apos;s what the internet is saying right now.
            </p>
          </div>
        </section>

        {/* Live scores */}
        <section className="px-8 py-8 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <LiveScoreboard />
          </div>
        </section>

        <div className="max-w-[1280px] mx-auto px-8 py-10 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main feed — 2 columns */}
            <div className="lg:col-span-2 space-y-10">
              {/* X/Twitter posts */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#e7e9ea">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <h2
                    className="text-ink text-[13px] tracking-[1.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Trending on X
                  </h2>
                  <div className="flex-1 h-[1px] bg-hairline" />
                </div>

                <div className="space-y-3">
                  {xPosts.slice(0, 4).map((post, i) => (
                    <SocialPost key={post.id} post={post} index={i} />
                  ))}
                </div>
              </section>

              {/* Reddit threads */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff4500">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="#ff4500" strokeWidth="1.5" />
                    <circle cx="8" cy="13" r="1.5" fill="#ff4500" />
                    <circle cx="16" cy="13" r="1.5" fill="#ff4500" />
                    <path d="M8 17c1.5 2 6.5 2 8 0" fill="none" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="17.5" cy="5.5" r="2" fill="#ff4500" />
                    <line x1="12" y1="3" x2="17" y2="5" stroke="#ff4500" strokeWidth="1.5" />
                  </svg>
                  <h2
                    className="text-ink text-[13px] tracking-[1.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    r/nba Hot Takes
                  </h2>
                  <div className="flex-1 h-[1px] bg-hairline" />
                </div>

                <div className="space-y-4">
                  {redditPosts.map((post, i) => (
                    <RedditThread key={post.id} post={post} index={i} />
                  ))}
                </div>
              </section>
            </div>

            {/* Right sidebar — 1 column */}
            <div className="space-y-10">
              {/* Player IG reactions */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e1306c" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="#e1306c" stroke="none" />
                  </svg>
                  <h2
                    className="text-ink text-[13px] tracking-[1.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Players Reacting
                  </h2>
                </div>

                <div className="space-y-4">
                  {igStories.map((story, i) => (
                    <IGStoryCard key={story.id} story={story} index={i} />
                  ))}
                </div>
              </section>

              {/* Bleacher Report drops */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                    <span style={{ fontSize: "9px", fontWeight: 900, color: "#000" }}>B</span>
                  </div>
                  <h2
                    className="text-ink text-[13px] tracking-[1.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Bleacher Drops
                  </h2>
                </div>

                <div className="space-y-3">
                  {bleacherDrops.map((drop, i) => (
                    <div
                      key={drop.id}
                      className="bg-surface-card border border-hairline rounded-xl p-5 hover:border-hairline-strong transition-colors"
                      style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.1 + i * 0.1}s both` }}
                    >
                      <div className="text-2xl mb-2">{drop.emoji}</div>
                      <h3
                        className="text-ink text-[15px] font-bold uppercase tracking-[0.5px] mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {drop.headline}
                      </h3>
                      <p className="text-body text-[13px] leading-[1.6] mb-3">{drop.body}</p>
                      <div
                        className="flex items-center gap-4 text-muted text-[11px]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span>❤️ {formatCount(drop.likes)}</span>
                        <span>↗ {formatCount(drop.shares)}</span>
                        <span className="text-muted-soft ml-auto">{drop.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
