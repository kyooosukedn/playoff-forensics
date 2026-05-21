interface AgentDispatchProps {
  agent: "bleacher" | "espn" | "nbatv" | "reddit";
  agentName: string;
  timestamp: string;
  dispatch: string;
  index?: number;
}

const agentColors: Record<string, string> = {
  bleacher: "#ff6b35",
  espn: "#f03030",
  nbatv: "#c8102e",
  reddit: "#ff4500",
};

const agentLabels: Record<string, string> = {
  bleacher: "BR",
  espn: "ES",
  nbatv: "TV",
  reddit: "RD",
};

export default function AgentDispatch({ agent, agentName, timestamp, dispatch, index = 0 }: AgentDispatchProps) {
  const color = agentColors[agent];
  const label = agentLabels[agent];

  return (
    <div
      className="rounded-lg border border-hairline p-6"
      style={{
        backgroundColor: `rgba(${parseInt(color.slice(1,3),16)}, ${parseInt(color.slice(3,5),16)}, ${parseInt(color.slice(5,7),16)}, 0.06)`,
        animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.12}s both`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded flex items-center justify-center text-[11px] font-bold text-canvas"
          style={{ backgroundColor: color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {label}
        </div>
        <div className="flex-1">
          <div
            className="text-ink text-[18px] font-medium"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {agentName}
          </div>
        </div>
        <span
          className="text-muted text-[11px] tracking-[0.5px]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {timestamp}
        </span>
      </div>

      <p
        className="text-body-strong text-[15px] leading-[1.65] tracking-[0.5px] italic mb-4"
        style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
      >
        {dispatch}
      </p>

      <a
        href="#"
        className="text-accent text-[11px] tracking-[1px] uppercase no-underline hover:text-accent-bright transition-colors"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        Full Report →
      </a>
    </div>
  );
}
