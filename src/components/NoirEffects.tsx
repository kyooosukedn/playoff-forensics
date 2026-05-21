"use client";

import { useState, useEffect, ReactNode } from "react";

export function ScanlineOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
      }}
    />
  );
}

export function TypewriterText({ text, speed = 30, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return (
    <span>
      {displayed}
      {!done && (
        <span
          style={{
            color: "#d4a017",
            animation: "blink 1s step-end infinite",
            fontWeight: 400,
          }}
        >
          |
        </span>
      )}
    </span>
  );
}

export function EvidenceStamp({ text, color = "#d4a017" }: { text: string; color?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: "'Special Elite', 'Courier New', monospace",
        fontSize: "11px",
        fontWeight: 400,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: color,
        border: `2px solid ${color}`,
        padding: "4px 12px",
        transform: "rotate(-12deg)",
        opacity: 0.7,
        animation: "stampIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
      }}
    >
      {text}
    </span>
  );
}

export function AmberGlow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        animation: "pulseAmber 3s ease-in-out infinite",
      }}
    >
      {children}
    </div>
  );
}
