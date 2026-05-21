interface StatBlockProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
  highlighted?: boolean;
}

export default function StatBlock({ label, value, delta, deltaType = "neutral", highlighted = false }: StatBlockProps) {
  return (
    <div className="border border-hairline rounded p-4">
      <div
        className="text-muted text-[11px] tracking-[0.5px] uppercase mb-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </div>
      <div className="flex items-end gap-3">
        <span
          className={`text-[28px] font-normal leading-none ${highlighted ? "text-accent" : "text-ink"}`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {value}
        </span>
        {delta && (
          <span
            className={`text-[12px] pb-0.5 ${
              deltaType === "positive" ? "text-verified" :
              deltaType === "negative" ? "text-alert-bright" :
              "text-muted"
            }`}
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
