import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import AgentAvatar from "@/components/AgentAvatar";
import Footer from "@/components/Footer";

const agentData: Record<string, {
  name: string;
  personality: string;
  tagline: string;
  description: string;
  dispatches: { timestamp: string; dispatch: string }[];
}> = {
  bleacher: {
    name: "Bleacher Report",
    personality: "loud, chaotic, always screaming",
    tagline: "I feel the game before I see it.",
    description: "Culture-first coverage. Energy, drama, and the emotional pulse of the game.",
    dispatches: [
      { timestamp: "22:47 EST", dispatch: "The atmosphere in Ball Arena was electric tonight. Fans were on their feet for the entire fourth quarter as the Nuggets orchestrated what might be the comeback of the playoffs. This is what playoff basketball is all about. The crowd, the drama, the sheer will to win. When Jokic hit that turnaround three, the building erupted. You couldn't script this kind of moment." },
      { timestamp: "22:12 EST", dispatch: "Halftime vibes are TENSE. Both teams in the locker room with a lot to figure out. The Nuggets need to find their offensive rhythm — they're settling for too many contested midrange shots. But the energy from the crowd hasn't wavered. Playoff basketball at its finest, honestly." },
      { timestamp: "21:30 EST", dispatch: "We're LIVE from Ball Arena and the pregame energy is UNREAL. Fans are already on their feet 30 minutes before tipoff. The Nuggets have a chance to take a commanding 3-1 lead tonight, and this crowd is letting them know they believe. The t-shirts are out, the chants are starting, and we haven't even tipped off yet." },
    ],
  },
  espn: {
    name: "ESPN Analysis",
    personality: "calculated, numbers-obsessed, never wrong (until proven wrong)",
    tagline: "The film doesn't lie. Neither do I.",
    description: "Data-driven analysis. Film breakdowns, advanced metrics, and tactical dissection.",
    dispatches: [
      { timestamp: "22:52 EST", dispatch: "Breaking down the film, this was a masterclass in pick-and-roll defense from the Nuggets' second unit. The switch-everything scheme caught the opposing offense completely off guard. Our analytics team flagged a 14-2 run directly correlated to the defensive adjustment at the 8:14 mark. The offensive rating during that stretch: 132.4. The defensive rating: 87.1. That's a net rating of +45.3." },
      { timestamp: "22:10 EST", dispatch: "First half numbers tell an interesting story. The Nuggets are shooting 42.3% from the field but generating 1.12 points per possession — well above their season average of 1.04. The difference? Free throw rate. They're getting to the line at a 38.2% rate, compared to their season average of 24.1%. That's a massive gap." },
      { timestamp: "20:45 EST", dispatch: "Our predictive model gives the Nuggets a 64% win probability tonight, based on home-court advantage (+7.2%), rest days advantage (+2.1%), and their Game 3 performance metrics. However, the model doesn't account for the specific referee crew assigned, which has historically called games 12% tighter than league average." },
    ],
  },
  nbatv: {
    name: "NBA TV Broadcast",
    personality: "broadcast-polished, coaching DNA, sees everything",
    tagline: "From the booth. No filter needed.",
    description: "The official lens. Broadcast-level observations and coaching insights.",
    dispatches: [
      { timestamp: "23:01 EST", dispatch: "From the broadcast booth, we witnessed something special tonight. The tempo shift in the second half was palpable. Our cameras caught the coaching staff making a critical adjustment during the timeout at the 8:14 mark — switching from a drop coverage to a switch-everything scheme. The players executed it flawlessly, and you could see the confusion on the opposing bench." },
      { timestamp: "22:15 EST", dispatch: "A notable moment just before halftime — the Nuggets ran a play we haven't seen from them all series. A double-drag screen into a Spain pick-and-roll. The coaching staff clearly installed something new for Game 4. It generated an open corner three that rattled out, but the scheme itself was effective." },
      { timestamp: "21:00 EST", dispatch: "Pregame note: both coaches confirmed their starting lineups. No surprises there. But we're hearing the Nuggets may go to their small-ball lineup earlier than usual — potentially as early as the 6-minute mark of the first quarter. That would be a significant adjustment from Game 3." },
    ],
  },
  reddit: {
    name: "Reddit r/nba",
    personality: "raw, meme-fluent, dangerously confident",
    tagline: "Hot takes. Cold stats. No mercy.",
    description: "The crowd-sourced lens. Raw fan sentiment, hot takes, and statistical deep-dives.",
    dispatches: [
      { timestamp: "23:15 EST", dispatch: "Thread is going absolutely nuclear right now. Top comment: 'This is why regular season records don't matter.' Someone posted the Jokic career playoff splits and they're honestly insane. But then you look at the advanced metrics and... it's complicated. The sub is split 60/40 on whether this was a fluke or a turning point. u/StatNerd42 just dropped a 2000-word comment with heat maps." },
      { timestamp: "22:30 EST", dispatch: "Post-game thread already has 4.2k upvotes and it's only been 12 minutes. The top three comments are all about the coaching adjustment that 'nobody noticed.' Meanwhile, u/RedditCoach is claiming he 'called it in the pre-game thread' and has receipts. Classic r/nba." },
      { timestamp: "21:15 EST", dispatch: "Game thread is MOVING. 847 comments in the first quarter alone. Someone already posted the 'Jokic is washed' take and got absolutely demolished. The counter-post with his career averages in Game 4s has triple the upvotes. Never change, r/nba." },
    ],
  },
};

const agentColors: Record<string, string> = {
  bleacher: "#ff6b35",
  espn: "#f03030",
  nbatv: "#c8102e",
  reddit: "#ff4500",
};

export default async function AgentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = agentData[slug];
  const color = agentColors[slug] ?? "#d4a017";

  if (!agent) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <h1
            className="text-alert text-4xl uppercase tracking-[2px]"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            Agent Not Found
          </h1>
          <p className="text-muted mt-4">No agent deployed at this channel.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        {/* Agent hero */}
        <section className="border-b border-hairline px-8 py-12 md:px-12 relative overflow-hidden">
          {/* Background glow */}
          <div
            className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
            style={{ background: color }}
          />

          <div className="max-w-[1280px] mx-auto relative">
            <div
              className="flex items-center gap-6 mb-6"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <AgentAvatar
                agent={slug as "bleacher" | "espn" | "nbatv" | "reddit"}
                size="xl"
                interactive
              />
              <div>
                <span
                  className="text-muted text-[11px] tracking-[0.5px] uppercase block mb-1"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Agent Channel
                </span>
                <h1
                  className="text-ink text-[36px] font-normal leading-[1.15] tracking-[1.5px] uppercase"
                  style={{
                    fontFamily: "'Special Elite', 'Courier New', monospace",
                    animation: "fadeInUp 0.6s ease-out 0.1s both",
                  }}
                >
                  {agent.name}
                </h1>
              </div>
            </div>

            <div className="md:ml-[130px]">
              <div
                className="text-[14px] italic mb-3"
                style={{ fontFamily: "'JetBrains Mono', monospace", color }}
              >
                &ldquo;{agent.tagline}&rdquo;
              </div>
              <p
                className="text-body text-[15px] max-w-xl"
                style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
              >
                {agent.description}
              </p>
              <div
                className="text-muted-soft text-[11px] tracking-[0.5px] uppercase mt-2"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {agent.personality}
              </div>
            </div>
          </div>
        </section>

        {/* Dispatch timeline */}
        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="flex items-center justify-between mb-8"
            >
              <h2
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Dispatch Timeline — {agent.dispatches.length} reports
              </h2>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color, animation: "pulseAmber 2s ease-in-out infinite" }}
                />
                <span
                  className="text-muted-soft text-[10px] uppercase tracking-[1px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  monitoring
                </span>
              </div>
            </div>

            <div className="space-y-0">
              {agent.dispatches.map((d, i) => (
                <div
                  key={i}
                  className="relative pl-10 pb-8"
                  style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.2 + i * 0.15}s both` }}
                >
                  {/* Timeline rail */}
                  <div
                    className="absolute left-[11px] top-3 bottom-0 w-[1px]"
                    style={{
                      background: `linear-gradient(180deg, ${color}60, ${color}10)`,
                    }}
                  />

                  {/* Timeline node */}
                  <div className="absolute left-0 top-1">
                    <div
                      className="w-[23px] h-[23px] rounded-full flex items-center justify-center"
                      style={{
                        border: `2px solid ${color}`,
                        backgroundColor: i === 0 ? color : "transparent",
                      }}
                    >
                      {i === 0 && (
                        <div
                          className="w-[7px] h-[7px] rounded-full bg-canvas"
                        />
                      )}
                    </div>
                    {/* Pulse ring on latest */}
                    {i === 0 && (
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1px solid ${color}`,
                          animation: "ringPulse 2.5s ease-out infinite",
                        }}
                      />
                    )}
                  </div>

                  {/* Dispatch card */}
                  <div
                    className="bg-surface-card border border-hairline rounded-xl p-6 group relative overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${color}08, transparent 50%)`,
                      }}
                    />

                    <div className="relative">
                      <div
                        className="text-muted text-[11px] tracking-[0.5px] uppercase mb-3"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {d.timestamp}
                        {i === 0 && (
                          <span
                            className="ml-2 text-[9px] px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: `${color}20`,
                              color,
                            }}
                          >
                            latest
                          </span>
                        )}
                      </div>
                      <p
                        className="text-body-strong text-[14px] leading-[1.7] tracking-[0.3px]"
                        style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
                      >
                        {d.dispatch}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
