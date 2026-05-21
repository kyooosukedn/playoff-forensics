import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import AgentDispatch from "@/components/AgentDispatch";
import Footer from "@/components/Footer";

const agents = [
  {
    slug: "bleacher" as const,
    name: "Bleacher Report",
    color: "#ff6b35",
    label: "BR",
    description: "Culture-first coverage. Energy, drama, and the emotional pulse of the game. Operates on vibes and viral moments.",
    totalDispatches: 14,
    lastActive: "2m ago",
    latestDispatch: "The atmosphere in Ball Arena was electric tonight. Fans were on their feet for the entire fourth quarter as the Nuggets orchestrated what might be the comeback of the playoffs. This is what playoff basketball is all about. The crowd, the drama, the sheer will to win...",
  },
  {
    slug: "espn" as const,
    name: "ESPN Analysis",
    color: "#f03030",
    label: "ES",
    description: "Data-driven analysis. Film breakdowns, advanced metrics, and tactical dissection. The stats department's voice.",
    totalDispatches: 11,
    lastActive: "8m ago",
    latestDispatch: "Breaking down the film, this was a masterclass in pick-and-roll defense from the Nuggets' second unit. The switch-everything scheme caught the opposing offense completely off guard. Our analytics team flagged a 14-2 run directly correlated to the defensive adjustment...",
  },
  {
    slug: "nbatv" as const,
    name: "NBA TV Broadcast",
    color: "#c8102e",
    label: "TV",
    description: "The official lens. Broadcast-level observations, coaching insights, and player-access commentary.",
    totalDispatches: 9,
    lastActive: "15m ago",
    latestDispatch: "From the broadcast booth, we witnessed something special tonight. The tempo shift in the second half was palpable. Our cameras caught the coaching staff making a critical adjustment during the timeout — and the players executed it flawlessly...",
  },
  {
    slug: "reddit" as const,
    name: "Reddit r/nba",
    color: "#ff4500",
    label: "RD",
    description: "The crowd-sourced lens. Raw fan sentiment, hot takes, meme analysis, and the occasional statistical deep-dive from armchair GMs.",
    totalDispatches: 18,
    lastActive: "31m ago",
    latestDispatch: "Thread is going absolutely nuclear right now. Top comment: 'This is why regular season records don't matter.' Someone posted the career playoff splits and they're honestly insane. But then you look at the advanced metrics and... it's complicated...",
  },
];

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        <section className="border-b border-hairline px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-4"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Field Operatives
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              Agent Channels
            </h1>

            <p
              className="text-body text-lg max-w-xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Four AI agents deployed across the media landscape.
              Each has a unique voice, a unique lens, and a unique bias.
              The forensic engine cross-references them all.
            </p>
          </div>
        </section>

        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-8">
            {agents.map((agent, i) => (
              <div
                key={agent.slug}
                className="bg-surface-card border border-hairline rounded-lg overflow-hidden"
                style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + i * 0.1}s both` }}
              >
                {/* Agent header */}
                <div
                  className="flex items-center gap-4 px-6 py-5 border-b border-hairline"
                  style={{ backgroundColor: `rgba(${parseInt(agent.color.slice(1,3),16)}, ${parseInt(agent.color.slice(3,5),16)}, ${parseInt(agent.color.slice(5,7),16)}, 0.08)` }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-[14px] font-bold text-canvas"
                    style={{ backgroundColor: agent.color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {agent.label}
                  </div>
                  <div className="flex-1">
                    <h2
                      className="text-ink text-xl font-semibold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {agent.name}
                    </h2>
                    <p className="text-body text-[13px] mt-0.5">{agent.description}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-muted text-[11px] tracking-[0.5px] uppercase"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {agent.totalDispatches} dispatches
                    </div>
                    <div
                      className="text-muted-soft text-[11px] mt-1"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      Last: {agent.lastActive}
                    </div>
                  </div>
                </div>

                {/* Latest dispatch */}
                <div className="px-6 py-5">
                  <div
                    className="text-muted text-[11px] tracking-[0.5px] uppercase mb-3"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Latest Dispatch
                  </div>
                  <p
                    className="text-body-strong text-[15px] leading-[1.65] tracking-[0.5px] italic"
                    style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
                  >
                    {agent.latestDispatch}
                  </p>
                  <a
                    href={`/agents/${agent.slug}`}
                    className="inline-block mt-4 text-accent text-[11px] tracking-[1px] uppercase no-underline hover:text-accent-bright transition-colors"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    View Full Channel →
                  </a>
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
