"use client";

const agents = [
  { name: "Bleacher Report", color: "#ff6b35", slug: "bleacher", lastDispatch: "2m ago", hasNew: true },
  { name: "ESPN", color: "#f03030", slug: "espn", lastDispatch: "8m ago", hasNew: true },
  { name: "NBA TV", color: "#c8102e", slug: "nbatv", lastDispatch: "15m ago", hasNew: false },
  { name: "Reddit", color: "#ff4500", slug: "reddit", lastDispatch: "31m ago", hasNew: false },
];

const cases = [
  { id: "CF-2026-ECF-G4", status: "active" as const, title: "Game 4 — Conf. Finals" },
  { id: "CF-2026-ECF-G3", status: "active" as const, title: "Game 3 — Conf. Finals" },
  { id: "CF-2026-ECF-G2", status: "closed" as const, title: "Game 2 — Conf. Finals" },
  { id: "CF-2026-ECF-G1", status: "closed" as const, title: "Game 1 — Conf. Finals" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-[280px] min-w-[280px] bg-surface-soft border-r border-hairline pt-20 px-5 pb-8 overflow-y-auto h-screen fixed left-0 top-0">
      {/* Agent Channels */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-muted-soft text-[11px] tracking-[0.5px] uppercase font-normal"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Agent Channels
          </h3>
          <span className="w-6 h-[1px] bg-hairline-strong" />
        </div>
        <div className="space-y-1">
          {agents.map((agent) => (
            <a
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              className="flex items-center gap-3 px-3 py-2.5 rounded hover:bg-surface-card transition-colors no-underline group"
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: agent.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-body-strong text-[13px] truncate group-hover:text-ink transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {agent.name}
                </div>
                <div className="text-muted text-[11px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {agent.lastDispatch}
                </div>
              </div>
              {agent.hasNew && <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />}
            </a>
          ))}
        </div>
      </div>

      {/* Case Files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-muted-soft text-[11px] tracking-[0.5px] uppercase font-normal"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Case Files
          </h3>
          <span className="w-6 h-[1px] bg-hairline-strong" />
        </div>
        <div className="space-y-1">
          {cases.map((c) => (
            <a
              key={c.id}
              href={`/case-files/${c.id}`}
              className="flex items-center justify-between px-3 py-2.5 rounded hover:bg-surface-card transition-colors no-underline group"
            >
              <div>
                <div
                  className="text-accent-dim text-[11px] tracking-[0.5px] uppercase"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {c.id}
                </div>
                <div className="text-muted text-[12px] mt-0.5">{c.title}</div>
              </div>
              <span
                className={`text-[9px] tracking-[1px] uppercase px-2 py-0.5 rounded ${
                  c.status === "active"
                    ? "bg-accent-glow text-accent"
                    : "bg-[rgba(39,174,96,0.12)] text-verified"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {c.status}
              </span>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
