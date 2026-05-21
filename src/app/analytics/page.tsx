import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import PlayerStatsTable from "@/components/PlayerStatsTable";
import WinProbGauge from "@/components/WinProbGauge";

export default function AnalyticsPage() {
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
                Analytics Lab
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              The Numbers
            </h1>

            <p
              className="text-body text-lg max-w-2xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Advanced stats from nba_api, processed with pandas, predictions powered by PyTorch.
              Start the Python backend to go live.
            </p>

            {/* Stack badges */}
            <div
              className="flex items-center gap-3 mt-5"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              {[
                { name: "nba_api", desc: "Advanced NBA Stats" },
                { name: "pandas", desc: "Data Processing" },
                { name: "PyTorch", desc: "Win Probability Model" },
                { name: "FastAPI", desc: "Python Backend" },
              ].map((tech) => (
                <span
                  key={tech.name}
                  className="text-[10px] px-3 py-1.5 rounded-full border border-hairline text-muted"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  title={tech.desc}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-8 py-10 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-8">
            {/* Win Probability */}
            <WinProbGauge />

            {/* Player Stats Table */}
            <PlayerStatsTable />

            {/* Quick start guide */}
            <div className="bg-surface-soft border border-hairline rounded-xl p-6">
              <h3
                className="text-ink text-[14px] font-semibold mb-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Start the Python Analytics Backend
              </h3>
              <div
                className="bg-canvas rounded-lg p-4 font-mono text-[12px] text-body leading-[1.8] overflow-x-auto"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <div className="text-muted"># Install dependencies</div>
                <div className="text-ink">cd python-api</div>
                <div className="text-ink">pip install -r requirements.txt</div>
                <br />
                <div className="text-muted"># Start the server</div>
                <div className="text-ink">uvicorn main:app --reload --port 8000</div>
                <br />
                <div className="text-muted"># Test it</div>
                <div className="text-ink">curl http://localhost:8000/health</div>
                <div className="text-ink">curl http://localhost:8000/stats/players</div>
                <div className="text-ink">curl http://localhost:8000/predictions/win-probability/sample</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
