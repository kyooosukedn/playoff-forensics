export default function EvidenceBoard() {
  const nodes = [
    { id: 1, label: "Narrative: Jokic MVP dominance", x: 20, y: 15, type: "narrative" as const },
    { id: 2, label: "Stat: +/- of -3 in 4th quarter", x: 65, y: 10, type: "data" as const },
    { id: 3, label: "Claim: Best clutch performer", x: 15, y: 50, type: "narrative" as const },
    { id: 4, label: "Fact: 4/14 FG in clutch (28.6%)", x: 60, y: 45, type: "data" as const },
    { id: 5, label: "Verdict: NARRATIVE EXCEEDS DATA", x: 40, y: 75, type: "verdict" as const },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 3, to: 4 },
    { from: 2, to: 5 },
    { from: 4, to: 5 },
  ];

  const getColor = (type: string) => {
    switch (type) {
      case "narrative": return "#f03030";
      case "data": return "#d4a017";
      case "verdict": return "#27ae60";
      default: return "#666666";
    }
  };

  return (
    <div
      className="relative w-full rounded-lg overflow-hidden"
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage: "radial-gradient(circle at 1px 1px, #1a1a1a 1px, transparent 0)",
        backgroundSize: "24px 24px",
        minHeight: "400px",
      }}
    >
      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: "400px" }}>
        {connections.map((conn, i) => {
          const from = nodes.find((n) => n.id === conn.from)!;
          const to = nodes.find((n) => n.id === conn.to)!;
          return (
            <line
              key={i}
              x1={`${from.x}%`}
              y1={`${from.y}%`}
              x2={`${to.x}%`}
              y2={`${to.y}%`}
              stroke="#d4a017"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.4}
            />
          );
        })}
      </svg>

      {/* Evidence nodes */}
      {nodes.map((node, i) => (
        <div
          key={node.id}
          className="absolute px-4 py-3 rounded border max-w-[240px]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "#111111",
            borderColor: getColor(node.type),
            borderLeftWidth: "3px",
            animation: `fadeInUp 0.5s ease-out ${0.5 + i * 0.15}s both`,
          }}
        >
          <div
            className="text-[9px] tracking-[1px] uppercase mb-1"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: getColor(node.type) }}
          >
            {node.type === "narrative" ? "Narrative" : node.type === "data" ? "Data Point" : "Verdict"}
          </div>
          <div className="text-body-strong text-[12px] leading-snug">
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
}
