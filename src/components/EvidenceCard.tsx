interface EvidenceCardProps {
  evidenceNumber: number;
  content: string;
  severity?: "discrepancy" | "verified" | "neutral";
  index?: number;
}

export default function EvidenceCard({ evidenceNumber, content, severity = "neutral", index = 0 }: EvidenceCardProps) {
  return (
    <div
      className="bg-surface-elevated border-l-[3px] border-l-accent rounded p-4"
      style={{
        animation: `fadeInUp 0.5s ease-out ${0.3 + index * 0.08}s both`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-accent text-[11px] tracking-[0.5px] uppercase"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Evidence #{evidenceNumber}
        </span>
        {severity === "discrepancy" && (
          <span
            className="text-alert-bright text-[9px] tracking-[1px] uppercase px-2 py-0.5 bg-[rgba(192,57,43,0.12)] rounded"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Discrepancy
          </span>
        )}
        {severity === "verified" && (
          <span
            className="text-verified text-[9px] tracking-[1px] uppercase px-2 py-0.5 bg-[rgba(39,174,96,0.12)] rounded"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Verified
          </span>
        )}
      </div>
      <p className="text-body-strong text-[13px] leading-relaxed">
        {content}
      </p>
    </div>
  );
}
