import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import LiveScoreboard from "@/components/LiveScoreboard";
import CaseFileCard from "@/components/CaseFileCard";
import EvidenceCard from "@/components/EvidenceCard";
import AgentDispatch from "@/components/AgentDispatch";
import StatBlock from "@/components/StatBlock";
import EvidenceBoard from "@/components/EvidenceBoard";
import Footer from "@/components/Footer";

const caseFiles = [
  {
    caseId: "CF-2026-ECF-G4",
    status: "under-investigation" as const,
    headline: "The Collapse That Wasn't in the Script",
    subtitle: "Down 17 with 6:42 remaining, the Nuggets mounted a 24-6 run that defied every predictive model. Four agents reported different versions of the same 4th quarter. The forensic engine found three discrepancies between narrative and data.",
    tags: ["4TH QUARTER", "NARRATIVE GAP", "DATA VERIFIED"],
    timestamp: "MAY 21 · 22:34 EST",
  },
  {
    caseId: "CF-2026-ECF-G3",
    status: "under-investigation" as const,
    headline: "The Defensive Adjustment Nobody Noticed",
    subtitle: "A subtle switching scheme change at the 8:14 mark of Q3 went unreported by all four media channels. But the data shows a 14-2 run immediately following the adjustment. Evidence suggests the playcall was the turning point.",
    tags: ["HIDDEN TURNING POINT", "SIGNAL DETECTED"],
    timestamp: "MAY 19 · 20:15 EST",
  },
  {
    caseId: "CF-2026-ECF-G2",
    status: "closed" as const,
    headline: "MVP Performance or Volume Illusion?",
    subtitle: "Every major outlet declared it an MVP-caliber game. The forensic engine disagrees. Plus-minus was neutral. Usage rate inflated by garbage-time possessions. Shot quality below season average. Case closed: volume, not value.",
    tags: ["DISCREPANCY #3", "VERDICT RENDERED"],
    timestamp: "MAY 17 · 23:48 EST",
  },
];

const evidenceItems = [
  {
    number: 7,
    content: "ESPN's postgame report claimed 'dominant two-way performance'. Defensive rating during player's minutes: 118.3 (team worst). Offensive rating: 109.1 (below team average). The data directly contradicts the 'two-way' characterization.",
    severity: "discrepancy" as const,
  },
  {
    number: 8,
    content: "Bleacher Report's highlight reel showed only 4th-quarter makes. Full game shot chart reveals 4/14 from the field overall (28.6 FG%). Selective evidence presentation detected.",
    severity: "discrepancy" as const,
  },
  {
    number: 9,
    content: "NBA TV correctly identified the defensive switching adjustment at Q3 8:14 as the turning point. This is corroborated by play-by-play data showing a 14-2 run immediately following the change.",
    severity: "verified" as const,
  },
  {
    number: 10,
    content: "Reddit thread 'Jokic is washed' trended to r/nba front page with 4.2k upvotes. Meanwhile, his game score of 28.4 ranks in the 92nd percentile for playoff games this season. Narrative-data gap exceeds 2 standard deviations.",
    severity: "discrepancy" as const,
  },
];

const agentDispatches = [
  {
    agent: "bleacher" as const,
    agentName: "Bleacher Report",
    timestamp: "22:47 EST",
    dispatch: "The atmosphere in Ball Arena was electric tonight. Fans were on their feet for the entire fourth quarter as the Nuggets orchestrated what might be the comeback of the playoffs. The energy was contagious — you could feel it through the screen. This is what playoff basketball is all about. The crowd, the drama, the sheer will to win...",
  },
  {
    agent: "espn" as const,
    agentName: "ESPN Analysis",
    timestamp: "22:52 EST",
    dispatch: "Breaking down the film, this was a masterclass in pick-and-roll defense from the Nuggets' second unit. The switch-everything scheme caught the opposing offense completely off guard. Our analytics team flagged a 14-2 run directly correlated to the defensive adjustment at the 8:14 mark of the third quarter...",
  },
  {
    agent: "nbatv" as const,
    agentName: "NBA TV Broadcast",
    timestamp: "23:01 EST",
    dispatch: "From the broadcast booth, we witnessed something special tonight. The tempo shift in the second half was palpable. Our broadcast cameras caught the coaching staff making a critical adjustment during the timeout — and the players executed it flawlessly. The defensive intensity ratcheted up three notches...",
  },
  {
    agent: "reddit" as const,
    agentName: "Reddit r/nba",
    timestamp: "23:15 EST",
    dispatch: "Thread is going absolutely nuclear right now. Top comment: 'This is why regular season records don't matter.' Someone posted the Jokic career playoff splits and they're honestly insane. But then you look at the advanced metrics and... it's complicated. The sub is split 60/40 on whether this was a fluke or a turning point...",
  },
];

const stats = [
  { label: "Active Investigations", value: 2, highlighted: true },
  { label: "Narrative Gaps Found", value: 7, delta: "+3", deltaType: "negative" as const },
  { label: "Evidence Verified", value: 23, delta: "+8", deltaType: "positive" as const },
  { label: "Agent Dispatches", value: 48, delta: "+12", deltaType: "neutral" as const },
  { label: "Discrepancies", value: 5, highlighted: true, delta: "+2", deltaType: "negative" as const },
  { label: "Cases Closed", value: 3, deltaType: "positive" as const },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        {/* Hero: Active Investigation */}
        <section className="border-b border-hairline px-8 py-16 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-6"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Active Investigation — Conference Finals
              </span>
            </div>

            <h1
              className="text-ink text-5xl md:text-[56px] font-normal leading-[1.1] tracking-[2px] uppercase mb-6"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              Game 4<br />
              <span className="text-accent">Western Conference</span>
            </h1>

            <p
              className="text-body text-lg leading-relaxed max-w-2xl mb-8"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              A 17-point comeback, four conflicting narratives, and one forensic engine
              cutting through the noise. The truth is in the data.
            </p>

            {/* Stat blocks row */}
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
            >
              {stats.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Live Scores */}
        <section className="px-8 py-12 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Live Scores
              </h2>
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                ESPN Data Feed · 60s refresh
              </span>
            </div>
            <LiveScoreboard />
          </div>
        </section>

        {/* Case Files */}
        <section className="px-8 py-16 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Open Case Files
              </h2>
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                3 cases on file
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {caseFiles.map((cf, i) => (
                <CaseFileCard key={cf.caseId} {...cf} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Evidence Board */}
        <section className="px-8 py-16 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Evidence Board — Game 4 Forensics
              </h2>
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Red String Analysis
              </span>
            </div>

            <EvidenceBoard />
          </div>
        </section>

        {/* Forensic Evidence */}
        <section className="px-8 py-16 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Forensic Evidence — Latest Findings
              </h2>
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Evidence #7-#10
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {evidenceItems.map((item, i) => (
                <EvidenceCard key={item.number} evidenceNumber={item.number} content={item.content} severity={item.severity} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Agent Dispatches */}
        <section className="px-8 py-16 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Agent Dispatches — Live Reports
              </h2>
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                4 agents deployed
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {agentDispatches.map((dispatch, i) => (
                <AgentDispatch key={dispatch.agent} {...dispatch} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
