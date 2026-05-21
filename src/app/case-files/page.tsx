import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import CaseFileCard from "@/components/CaseFileCard";
import Footer from "@/components/Footer";

const allCases = [
  {
    caseId: "CF-2026-ECF-G4",
    status: "under-investigation" as const,
    headline: "The Collapse That Wasn't in the Script",
    subtitle: "Down 17 with 6:42 remaining, the Nuggets mounted a 24-6 run that defied every predictive model. Four agents reported different versions of the same 4th quarter.",
    tags: ["4TH QUARTER", "NARRATIVE GAP", "DATA VERIFIED"],
    timestamp: "MAY 21 · 22:34 EST",
  },
  {
    caseId: "CF-2026-ECF-G3",
    status: "under-investigation" as const,
    headline: "The Defensive Adjustment Nobody Noticed",
    subtitle: "A subtle switching scheme change at the 8:14 mark of Q3 went unreported by all four media channels. The data shows a 14-2 run immediately following.",
    tags: ["HIDDEN TURNING POINT", "SIGNAL DETECTED"],
    timestamp: "MAY 19 · 20:15 EST",
  },
  {
    caseId: "CF-2026-ECF-G2",
    status: "closed" as const,
    headline: "MVP Performance or Volume Illusion?",
    subtitle: "Every major outlet declared it an MVP-caliber game. The forensic engine disagrees. Plus-minus was neutral. Usage rate inflated by garbage-time possessions.",
    tags: ["DISCREPANCY #3", "VERDICT RENDERED"],
    timestamp: "MAY 17 · 23:48 EST",
  },
  {
    caseId: "CF-2026-ECF-G1",
    status: "closed" as const,
    headline: "The Schedule Rest Narrative",
    subtitle: "Media cited fatigue from a 7-game series as the turning point. Rest days between series: 3. Season average for conference finals: 2.4. Data shows no fatigue correlation.",
    tags: ["REST NARRATIVE", "DEBUNKED"],
    timestamp: "MAY 15 · 21:30 EST",
  },
  {
    caseId: "CF-2026-SEMIFINAL-G7",
    status: "closed" as const,
    headline: "Game 7 Ghosts: Clutch or Choke?",
    subtitle: "The narrative says star player disappeared in Game 7. The data says 32 points on 58% TS. The gap between perception and reality is 3.2 standard deviations.",
    tags: ["GAME 7", "PERCEPTION GAP", "VERDICT RENDERED"],
    timestamp: "MAY 12 · 23:15 EST",
  },
  {
    caseId: "CF-2026-SEMIFINAL-G6",
    status: "closed" as const,
    headline: "The Referee Assignment Anomaly",
    subtitle: "A specific referee crew was assigned for the third time this series. Home team win rate with this crew: 78%. League average: 61%. Statistical significance confirmed.",
    tags: ["OFFICIATING", "ANOMALY DETECTED", "FLAGGED"],
    timestamp: "MAY 10 · 22:00 EST",
  },
];

export default function CaseFilesPage() {
  const activeCases = allCases.filter((c) => c.status !== "closed");
  const closedCases = allCases.filter((c) => c.status === "closed");

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
                Case Archives
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              Case Files
            </h1>

            <p
              className="text-body text-lg max-w-xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Every game under investigation. Every narrative dissected.
              The forensic engine leaves no stone unturned.
            </p>
          </div>
        </section>

        {/* Active Cases */}
        <section className="px-8 py-12 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              <h2
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Active Investigations — {activeCases.length} open
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {activeCases.map((cf, i) => (
                <CaseFileCard key={cf.caseId} {...cf} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Closed Cases */}
        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-verified rounded-full" />
              <h2
                className="text-verified text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Cases Closed — {closedCases.length} resolved
              </h2>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              {closedCases.map((cf, i) => (
                <CaseFileCard key={cf.caseId} {...cf} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
