interface CaseFileCardProps {
  caseId: string;
  status: "under-investigation" | "classified" | "closed";
  headline: string;
  subtitle: string;
  tags: string[];
  timestamp: string;
  index?: number;
}

export default function CaseFileCard({ caseId, status, headline, subtitle, tags, timestamp, index = 0 }: CaseFileCardProps) {
  return (
    <article
      className="bg-surface-card border border-hairline rounded-lg p-6 hover:border-hairline-strong transition-colors cursor-pointer group"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span
            className="text-accent text-[11px] tracking-[0.5px] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {caseId}
          </span>
          {status === "under-investigation" && (
            <span
              className="text-accent-bright text-[9px] tracking-[1px] uppercase px-2 py-0.5 bg-accent-glow rounded"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Under Investigation
            </span>
          )}
          {status === "closed" && (
            <span
              className="text-verified text-[9px] tracking-[1px] uppercase px-2 py-0.5 bg-[rgba(39,174,96,0.12)] rounded"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Case Closed
            </span>
          )}
        </div>
        <span
          className="text-muted text-[11px]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {timestamp}
        </span>
      </div>

      <h2
        className="text-ink text-2xl font-semibold leading-tight tracking-tight mb-2 group-hover:text-accent-bright transition-colors"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {headline}
      </h2>

      <p className="text-body text-[15px] leading-relaxed mb-5">
        {subtitle}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-accent-bright text-[11px] tracking-[0.5px] uppercase px-2 py-1 bg-accent-glow rounded"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
