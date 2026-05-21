"use client";

import { useState } from "react";

const navLinks = [
  { label: "War Room", href: "/" },
  { label: "Case Files", href: "/case-files" },
  { label: "Agents", href: "/agents" },
  { label: "Evidence Board", href: "/evidence-board" },
];

const agents = [
  { name: "Bleacher Report", color: "#ff6b35", slug: "bleacher" },
  { name: "ESPN", color: "#f03030", slug: "espn" },
  { name: "NBA TV", color: "#c8102e", slug: "nbatv" },
  { name: "Reddit", color: "#ff4500", slug: "reddit" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-canvas border border-hairline rounded"
        aria-label="Open navigation"
      >
        <span className="w-5 h-[1.5px] bg-ink" />
        <span className="w-5 h-[1.5px] bg-ink" />
        <span className="w-5 h-[1.5px] bg-ink" />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-[70]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className="fixed top-0 right-0 h-full w-[280px] bg-canvas border-l border-hairline z-[80] p-6 overflow-y-auto"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors"
          aria-label="Close navigation"
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "18px" }}>✕</span>
        </button>

        {/* Logo */}
        <div className="mb-8 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rotate-45" />
            <span
              className="text-accent text-sm tracking-[2px] uppercase"
              style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
            >
              Playoff Forensics
            </span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="mb-8">
          <div
            className="text-muted-soft text-[10px] tracking-[1px] uppercase mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Navigation
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-ink text-[15px] font-medium border-b border-hairline no-underline hover:text-accent transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Agent Channels */}
        <div>
          <div
            className="text-muted-soft text-[10px] tracking-[1px] uppercase mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Agent Channels
          </div>
          {agents.map((agent) => (
            <a
              key={agent.slug}
              href={`/agents/${agent.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2.5 no-underline"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: agent.color }} />
              <span className="text-body-strong text-[13px] hover:text-ink transition-colors">
                {agent.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
