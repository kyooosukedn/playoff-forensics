"use client";

import { useState } from "react";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Feed", href: "/" },
  { label: "Storylines", href: "/case-files" },
  { label: "Agents", href: "/agents" },
  { label: "Take Board", href: "/evidence-board" },
  { label: "Analytics", href: "/analytics" },
];

export default function TopNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas border-b border-hairline">
      <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="/" className="flex items-center gap-3 no-underline">
            <div className="w-2 h-2 bg-accent rotate-45" />
            <span
              className="text-accent text-sm tracking-[2px] uppercase"
              style={{ fontFamily: "'Special Elite', 'Courier New', monospace" }}
            >
              Playoff Forensics
            </span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); setActiveIndex(i); }}
                className={`
                  relative px-4 py-2 text-[11px] font-semibold uppercase tracking-[1.5px] no-underline transition-colors
                  ${i === activeIndex ? "text-accent" : "text-muted hover:text-ink"}
                `}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {link.label}
                {i === activeIndex && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent" />
                )}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span
            className="text-muted text-[11px] tracking-[0.5px] uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Live Investigation
          </span>
        </div>
      </div>
    </nav>
    <MobileNav />
    </>
  );
}
