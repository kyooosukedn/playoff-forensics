import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const takeBoard = [
  {
    moment: "Jokic turnaround 3 — 4:12 4th QTR",
    context: "Nuggets down 2, Ball Arena erupts",
    takes: [
      {
        source: "Shams Charania",
        platform: "X",
        take: "Jokic. Turnaround three. Ball Arena is DEAFENING. This is what playoff basketball looks like.",
        sentiment: "hype",
        color: "#e7e9ea",
      },
      {
        source: "ESPN Analytics",
        platform: "Stats",
        take: "That shot had a 14% probability based on shot location and defender proximity. Jokic doesn't care about your probability.",
        sentiment: "analytical",
        color: "#5dade2",
      },
      {
        source: "r/nba",
        platform: "Reddit",
        take: "if jokic was in any other era hed be considered the greatest player alive and its not even close. fight me.",
        sentiment: "hot-take",
        color: "#ff4500",
      },
      {
        source: "LeBron James",
        platform: "IG",
        take: "Man. That shot. Different breed. 👑",
        sentiment: "respect",
        color: "#e1306c",
      },
    ],
  },
  {
    moment: "22-4 Nuggets Run — 3rd/4th QTR",
    context: "From down 8 to up 10 in 6 minutes",
    takes: [
      {
        source: "Bleacher Report",
        platform: "BR",
        take: "THE NUGGETS ARE UNLEASHED. 22-4 RUN. BALL ARENA IS HAVING A RELIGIOUS EXPERIENCE.",
        sentiment: "hype",
        color: "#fff",
      },
      {
        source: "ESPN Analytics",
        platform: "Stats",
        take: "During the 22-4 run: Nuggets ORTG 148.2, DRTG 62.1. Net rating: +86.1. That's not a typo.",
        sentiment: "analytical",
        color: "#5dade2",
      },
      {
        source: "Kendrick Perkins",
        platform: "X",
        take: "I TOLD YALL!!! THE NUGGETS BENCH IS DIFFERENT!!! WHO'S THE DEPTH CHART NOW?!?!?",
        sentiment: "hot-take",
        color: "#e7e9ea",
      },
      {
        source: "Ja Morant",
        platform: "IG",
        take: "that pass at the 8 min mark had me out of my chair no cap 💀💀",
        sentiment: "respect",
        color: "#e1306c",
      },
    ],
  },
  {
    moment: "Defensive Switch at 8:14 — 4th QTR",
    context: "Nuggets go to switch-everything, Thunder offense collapses",
    takes: [
      {
        source: "NBA TV Broadcast",
        platform: "TV",
        take: "We caught the coaching staff making the call during the timeout. Switch-everything. Bold move. It worked perfectly.",
        sentiment: "analytical",
        color: "#c8102e",
      },
      {
        source: "Draymond Green",
        platform: "IG",
        take: "People talk about the threes. I'm watching the defensive rotations. He reads the game 2 plays ahead. That's the real superpower.",
        sentiment: "respect",
        color: "#e1306c",
      },
      {
        source: "r/nba",
        platform: "Reddit",
        take: "u/RedditCoach: 'I called the switch-everything in the pre-game thread.' And he has the receipts. Incredible.",
        sentiment: "hot-take",
        color: "#ff4500",
      },
      {
        source: "Pat Beverley",
        platform: "IG",
        take: "I played against him. You THINK you have him figured out. You don't. Trust me.",
        sentiment: "respect",
        color: "#e1306c",
      },
    ],
  },
];

const sentimentBadge: Record<string, { label: string; color: string }> = {
  hype: { label: "HYPE", color: "#d4a017" },
  analytical: { label: "DATA", color: "#5dade2" },
  "hot-take": { label: "HOT TAKE", color: "#ff6b35" },
  respect: { label: "RESPECT", color: "#27ae60" },
};

export default function EvidenceBoardPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        <section className="border-b border-hairline px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="flex items-center gap-3 mb-4"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Take Board
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              What Everyone Said
            </h1>

            <p
              className="text-body text-lg max-w-xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Same moments, different takes. See how players, media, and fans
              reacted to the biggest plays of the game.
            </p>
          </div>
        </section>

        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-12">
            {takeBoard.map((moment, i) => (
              <div
                key={i}
                style={{ animation: `fadeInUp 0.6s ease-out ${0.1 + i * 0.15}s both` }}
              >
                {/* Moment header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-accent rotate-45" />
                    <span
                      className="text-accent text-[11px] tracking-[1px] uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Key Moment
                    </span>
                  </div>
                  <h2
                    className="text-ink text-[20px] font-semibold mb-1"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {moment.moment}
                  </h2>
                  <p
                    className="text-muted text-[13px]"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {moment.context}
                  </p>
                </div>

                {/* Take cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moment.takes.map((take, j) => {
                    const badge = sentimentBadge[take.sentiment];
                    return (
                      <div
                        key={j}
                        className="bg-surface-card border border-hairline rounded-xl p-5 hover:border-hairline-strong transition-colors"
                        style={{
                          borderLeft: `3px solid ${take.color}`,
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-[12px] font-semibold"
                              style={{ color: take.color, fontFamily: "'Space Grotesk', sans-serif" }}
                            >
                              {take.source}
                            </span>
                            <span className="text-muted-soft text-[10px]">via</span>
                            <span
                              className="text-muted text-[11px]"
                              style={{ fontFamily: "'JetBrains Mono', monospace" }}
                            >
                              {take.platform}
                            </span>
                          </div>
                          <span
                            className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              backgroundColor: `${badge.color}15`,
                              color: badge.color,
                            }}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <p
                          className="text-body-strong text-[14px] leading-[1.6]"
                          style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
                        >
                          {take.take}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
