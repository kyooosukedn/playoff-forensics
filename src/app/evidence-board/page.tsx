import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import EvidenceBoard from "@/components/EvidenceBoard";
import EvidenceCard from "@/components/EvidenceCard";
import StatBlock from "@/components/StatBlock";
import Footer from "@/components/Footer";

const allEvidence = [
  { number: 1, content: "Bleacher Report's postgame headline: 'JOKIC DOMINATES IN COMEBACK WIN'. Usage rate: 31.2%. True shooting: 54.1%. Season average TS: 62.3%. Headline characterization exceeds statistical reality by significant margin.", severity: "discrepancy" as const },
  { number: 2, content: "ESPN's halftime analysis cited 'poor shot selection' as the primary issue. Shot quality metric (quantified shot quality) for the half: 52.3%. League average: 50.1%. Shot selection was actually above average.", severity: "discrepancy" as const },
  { number: 3, content: "NBA TV correctly identified the defensive switching adjustment at Q3 8:14. Play-by-play data confirms: 14-2 run over the next 4:32 of game time. Defensive rating during stretch: 87.1.", severity: "verified" as const },
  { number: 4, content: "Reddit consensus thread: 'Referees cost us the game'. Free throw disparity: 28-24. Referee crew's historical home/away FT disparity: +3.1 for home team. Tonight's: +4. Within normal variance (z-score: 0.72).", severity: "verified" as const },
  { number: 5, content: "Bleacher Report's highlight package showed 6 made shots, 0 misses. Actual shooting: 4/14 (28.6%). Selective evidence presentation ratio: 6:0 shown vs 4:10 actual. Distortion factor: HIGH.", severity: "discrepancy" as const },
  { number: 6, content: "ESPN's 'clutch performance' narrative. Clutch stats: 2/6 FG, 1/2 FT, -3 plus-minus in 4th quarter. Definition of 'clutch': final 5 minutes, score within 5. Performance was below replacement level.", severity: "discrepancy" as const },
  { number: 7, content: "NBA TV broadcast noted 'physical dominance in the paint'. Paint points: 42. Opponent paint points: 48. Rebounding differential: -2. The data shows the OPPOSING team dominated the paint.", severity: "discrepancy" as const },
  { number: 8, content: "Reddit's 'Jokic is washed' thread: 4.2k upvotes, trending #1 on r/nba. Jokic game score: 28.4 (92nd percentile for playoff games this season). Narrative perception vs data reality gap: 2.1 standard deviations.", severity: "discrepancy" as const },
];

const boardStats = [
  { label: "Total Evidence", value: 47, delta: "+12", deltaType: "neutral" as const },
  { label: "Discrepancies", value: 23, highlighted: true, delta: "+7", deltaType: "negative" as const },
  { label: "Verified Claims", value: 18, delta: "+4", deltaType: "positive" as const },
  { label: "Pending Review", value: 6, delta: "+1", deltaType: "neutral" as const },
  { label: "Agent Agreement", value: "62%", delta: "-8%", deltaType: "negative" as const },
  { label: "Distortion Index", value: "HIGH", highlighted: true },
];

export default function EvidenceBoardPage() {
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
                Forensic Analysis
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              Evidence Board
            </h1>

            <p
              className="text-body text-lg max-w-2xl mb-8"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Every narrative, cross-referenced against the data. Every claim, verified or debunked.
              The red strings connect the dots. The amber markers flag the truth.
            </p>

            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              {boardStats.map((stat) => (
                <StatBlock key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </section>

        {/* Red String Visualization */}
        <section className="px-8 py-12 md:px-12 border-b border-hairline">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              <h2
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Narrative-Data Connection Map — Game 4
              </h2>
            </div>
            <EvidenceBoard />
          </div>
        </section>

        {/* All Evidence */}
        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2
                className="text-ink text-2xl font-semibold tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                All Evidence — Conference Finals
              </h2>
              <span
                className="text-muted text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {allEvidence.length} pieces of evidence
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {allEvidence.map((item, i) => (
                <EvidenceCard key={item.number} evidenceNumber={item.number} content={item.content} severity={item.severity} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
