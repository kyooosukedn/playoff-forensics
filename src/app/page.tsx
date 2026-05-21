import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import LiveScoreboard from "@/components/LiveScoreboard";
import LiveRedditFeed from "@/components/LiveRedditFeed";
import LiveESPNFeed from "@/components/LiveESPNFeed";
import LiveSocialRoundup from "@/components/LiveSocialRoundup";
import { formatCount } from "@/lib/data/mock-social";

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
              {/* ESPN News — live articles */}
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="text-[11px] font-black text-ink"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    ESPN
                  </span>
                  <h2
                    className="text-ink text-[13px] tracking-[1.5px] uppercase"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    NBA News & Analysis
                  </h2>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#27ae60", animation: "pulseAmber 2s infinite" }} />
                  <div className="flex-1 h-[1px] bg-hairline" />
                </div>

                <LiveESPNFeed />
              </section>

              {/* Reddit threads — live from r/nba */}
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
                    r/nba Live Feed
                  </h2>
                  <span
                    className="text-muted-soft text-[10px] uppercase tracking-[1px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    live
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#27ae60", animation: "pulseAmber 2s infinite" }} />
                  <div className="flex-1 h-[1px] bg-hairline" />
                </div>

                <LiveRedditFeed />
              </section>
            </div>

            {/* Right sidebar — live social roundup */}
            <div className="space-y-10">
              {/* Player reactions — Gemini-powered */}
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
                    Player Reactions
                  </h2>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "#27ae60", animation: "pulseAmber 2s infinite" }} />
                </div>

                <LiveSocialRoundup />
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
