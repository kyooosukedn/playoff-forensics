export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline px-12 py-12">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-accent rotate-45" />
          <span
            className="text-muted text-[13px] tracking-[2px] uppercase"
            style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
          >
            Playoff Forensics
          </span>
        </div>
        <span
          className="text-muted-soft text-[11px] tracking-[0.5px]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Case Closed · v0.1.0 · 2026
        </span>
      </div>
    </footer>
  );
}
