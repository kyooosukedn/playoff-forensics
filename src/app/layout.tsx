import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playoff Forensics — NBA Playoff Intelligence",
  description: "A noir detective investigation dashboard for NBA playoff intelligence. Every game is a crime scene. Each narrative is a suspect.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-canvas text-body">
        {children}
      </body>
    </html>
  );
}
