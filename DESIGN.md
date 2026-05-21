---
version: 1.0
name: playoff-forensics
description: A noir detective investigation dashboard for NBA playoff intelligence. Dark-as-midnight canvas, amber evidence-marker accents, typewriter monospace for case files, and forensic-grade data visualization. Each game is a crime scene. Each narrative is a suspect. The truth is buried in the data.
colors:
  # Canvas & Surfaces
  canvas: "#050505"
  surface-soft: "#0a0a0a"
  surface-card: "#111111"
  surface-elevated: "#1a1a1a"
  surface-hover: "#222222"

  # Evidence Marker Accent (amber/gold)
  accent: "#d4a017"
  accent-bright: "#f0b429"
  accent-dim: "#8b6914"
  accent-glow: "rgba(212, 160, 23, 0.15)"

  # Forensic Red (alerts, discrepancies)
  alert: "#c0392b"
  alert-bright: "#e74c3c"
  alert-dim: "#7b241c"

  # Case Closed Green (verified, confirmed)
  verified: "#27ae60"
  verified-dim: "#1e8449"

  # Text
  ink: "#f5f5f5"
  body: "#b0b0b0"
  body-strong: "#d4d4d4"
  muted: "#666666"
  muted-soft: "#444444"

  # Structural
  hairline: "#1a1a1a"
  hairline-strong: "#2a2a2a"
  border: "#333333"

  # Agent Channel Colors
  agent-bleacher: "#ff6b35"
  agent-espn: "#f03030"
  agent-nbatv: "#c8102e"
  agent-reddit: "#ff4500"

  # Semantic
  link: "#c3d9f3"
  warning: "#d4a017"
  success: "#27ae60"
  info: "#5dade2"

typography:
  # Display: Typewriter noir headlines
  display-xl:
    fontFamily: "'Special Elite', 'Courier New', monospace"
    fontSize: 56px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: 2px
    textTransform: uppercase
  display-lg:
    fontFamily: "'Special Elite', 'Courier New', monospace"
    fontSize: 40px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: 1.5px
    textTransform: uppercase
  display-md:
    fontFamily: "'Special Elite', 'Courier New', monospace"
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 1px
    textTransform: uppercase

  # Headings: Clean sans-serif
  heading:
    fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.5px
  subheading:
    fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0px

  # Body: Readable sans
  body-lg:
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  body:
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0.1px
  body-sm:
    fontFamily: "'Inter', 'Segoe UI', sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.1px

  # Monospace: Case file data, timestamps, evidence numbers
  mono-lg:
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', 'Cascadia Code', monospace"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0px
  mono:
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', 'Cascadia Code', monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  mono-sm:
    fontFamily: "'JetBrains Mono', 'IBM Plex Mono', 'Cascadia Code', monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.5px
    textTransform: uppercase

  # Agent Dispatch: The voice of each agent
  agent-dispatch:
    fontFamily: "'Special Elite', 'Courier New', monospace"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0.5px
    fontStyle: italic

  # UI Labels
  label:
    fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 1.5px
    textTransform: uppercase
  caption:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.5px

rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  # Navigation
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    height: 56px
    borderBottom: "1px solid {colors.hairline}"

  # Buttons
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
    hover:
      backgroundColor: "{colors.accent-bright}"

  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline-strong}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    hover:
      borderColor: "{colors.accent}"
      textColor: "{colors.accent}"

  button-evidence:
    backgroundColor: "{colors.accent-glow}"
    textColor: "{colors.accent-bright}"
    border: "1px solid {colors.accent-dim}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"

  # Cards
  case-file-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"

  evidence-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.ink}"
    borderLeft: "3px solid {colors.accent}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"

  agent-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"

  # Evidence Board (red string connections)
  evidence-board:
    backgroundColor: "{colors.surface-soft}"
    backgroundImage: "radial-gradient(circle at 1px 1px, {colors.hairline} 1px, transparent 0)"
    backgroundSize: "24px 24px"

  # Stats/Data
  stat-block:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    border: "1px solid {colors.hairline}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"

  # Tags
  tag-evidence:
    backgroundColor: "{colors.accent-glow}"
    textColor: "{colors.accent-bright}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"

  tag-agent:
    backgroundColor: "rgba(255, 69, 0, 0.12)"
    textColor: "#ff8c5a"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"

  tag-verified:
    backgroundColor: "rgba(39, 174, 96, 0.12)"
    textColor: "{colors.verified}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"

  tag-discrepancy:
    backgroundColor: "rgba(192, 57, 43, 0.12)"
    textColor: "{colors.alert-bright}"
    typography: "{typography.mono-sm}"
    rounded: "{rounded.sm}"
    padding: "4px 8px"

  # Footer
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
    padding: "{spacing.xxl}"
    borderTop: "1px solid {colors.hairline}"

depth:
  # No drop shadows. Depth comes from surface color layering only.
  # Canvas → Surface Soft → Surface Card → Surface Elevated
  # This creates a "darkness gradient" where elevated elements are literally lighter.
  flat: "no shadow, no border"
  hairline: "1px solid {colors.hairline}"
  card: "{colors.surface-card} background, no shadow"
  elevated: "{colors.surface-elevated} background, {colors.hairline-strong} border"
  glow: "0 0 20px {colors.accent-glow}"  # Only for evidence markers and active states
---

## 1. Visual Theme & Atmosphere

Playoff Forensics is a **noir detective dashboard** where every NBA playoff game is treated as a crime scene under investigation. The interface evokes a dimly lit investigation room: midnight-black surfaces, amber evidence-marker accents, and typewriter-style case file typography.

The core metaphor: **the media are suspects, the stats are evidence, and the forensic engine is the detective.**

The design draws from three design systems:
- **Bugatti**: Pure black canvas, zero decorative chrome, typography-led hierarchy, surface color layering instead of shadows
- **Lamborghini**: True black dominance, gold accent as the single chromatic color, uppercase monospace authority
- **RunwayML**: Cinematic full-bleed imagery, zero-shadow philosophy, interface invisibility
- **Sentry**: Data-dense dashboard layout, inset shadow tactility, frosted glass effects adapted for dark surfaces

### Key Characteristics

- **Midnight canvas** (`#050505`) — darker than typical dark mode, approaching OLED black
- **Amber evidence markers** (`#d4a017`) — the single accent color, used like crime scene evidence flags
- **Three-typeface system**: Special Elite (typewriter noir display), Space Grotesk (clean headings), JetBrains Mono (data/case files)
- **No shadows** — depth through surface color layering (`#050505` → `#0a0a0a` → `#111111` → `#1a1a1a`)
- **Evidence board aesthetic** — subtle dot-grid backgrounds, amber border accents, "red string" connection lines
- **Film grain texture** — optional CSS noise overlay for noir atmosphere
- **Uppercase monospace labels** — case file numbers, evidence tags, agent identifiers

## 2. Color Philosophy

### The Rules

1. **Canvas is always the darkest element.** Surfaces get progressively lighter to create elevation.
2. **Amber is sacred.** Used ONLY for: evidence highlights, primary CTAs, active states, verified data points. Never for decoration.
3. **Red means discrepancy.** Alert red appears when the forensic engine catches a narrative-data mismatch.
4. **Green means verified.** Confirmed data points, corroborated evidence.
5. **No decorative gradients.** Gradients only from photographic content (player images, game footage).
6. **Agent colors are muted.** Each agent channel has a color, but kept desaturated to not compete with amber.

## 3. Typography

### The Three Faces

1. **Special Elite** (typewriter noir) — Display headlines, agent dispatches, case file headers. The "detective's voice." Google Fonts substitute for a real typewriter face.
2. **Space Grotesk** — Section headings, navigation, UI labels. Clean geometric sans-serif that contrasts with the typewriter face.
3. **JetBrains Mono** — Data, timestamps, evidence numbers, case IDs, stats. Precision monospace for forensic data.

### Principles

- Display headlines are **UPPERCASE** with wide letter-spacing (1-2px). This creates the "CASE FILE STAMPED" feel.
- Body text stays sentence-case at standard tracking. Readable, professional.
- Agent dispatches use Special Elite in italic — like reading a detective's handwritten notes.
- Monospace is for data, dates, IDs. Never for prose.
- Weight 400 dominates. Bold (600) only for Space Grotesk headings and labels.

## 4. Key Components

### Case File Card
The primary content unit. Dark card surface (`#111111`) with subtle hairline border. Contains: case ID (monospace uppercase amber), headline (Space Grotesk), body (Inter), and evidence tags.

### Evidence Card
Left-bordered card with amber accent stripe. Used for individual evidence points, stats findings, and forensic analysis results. The border says "this is marked evidence."

### Agent Dispatch Panel
Each AI agent's report appears in a panel with the agent's channel color as a subtle background tint. The text uses Special Elite italic to feel like a field report. Agent avatar/icon in the top-left corner.

### Evidence Board
A dot-grid background section (like a detective's cork board) where evidence nodes are connected with amber lines. Used for the narrative-vs-data gap analysis visualization.

### Stat Block
Minimal data display: label (mono uppercase), value (large mono or Space Grotesk), delta/change indicator. No charts by default — the raw numbers ARE the visual.

## 5. Layout

- **Max content width**: 1280px
- **Grid**: 12-column, 24px gutters
- **Section spacing**: 96px between major sections
- **Card spacing**: 24px
- **Sidebar**: 280px fixed for agent channels or case file navigation

### Page Structure

```
┌──────────────────────────────────────────────┐
│  TOP NAV: Logo  ·  War Room  Case Files  Agents  │
├──────────────────────────────────────────────┤
│                                              │
│  HERO: Active Investigation                  │
│  "CONFERENCE FINALS — GAME 4"               │
│  [Case Status: UNDER INVESTIGATION]          │
│                                              │
├──────────┬───────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT                     │
│ Agent    │                                    │
│ Channels │  Case File Cards / Evidence        │
│ --------│  / Forensic Analysis               │
│ Case     │                                    │
│ Files    │                                    │
│          │                                    │
├──────────┴───────────────────────────────────┤
│  FOOTER: Playoff Forensics · Case Closed     │
└──────────────────────────────────────────────┘
```

## 6. Do's and Don'ts

### Do
- Use Special Elite for display headlines and agent dispatches
- Use amber (`#d4a017`) exclusively for evidence highlights and primary CTAs
- Layer surfaces (`#050505` → `#1a1a1a`) for depth instead of shadows
- Use JetBrains Mono for all data, timestamps, and case IDs
- Keep the interface invisible — data and content are the visual
- Use uppercase with letter-spacing for labels and tags
- Apply dot-grid background for investigation boards
- Use inset borders (left-side amber stripe) for evidence cards
- Maintain generous spacing (96px between sections)

### Don't
- Don't use drop shadows anywhere — surface layering only
- Don't use amber for decorative purposes — evidence only
- Don't use rounded corners on cards (max 8px) — sharp edges feel forensic
- Don't use bold (700+) weight — max 600 for labels
- Don't add gradients to buttons or surfaces
- Don't use warm grays — the palette is cool-neutral throughout
- Don't animate elements gratuitously — subtle transitions only
- Don't use more than one accent color per component
- Don't mix Special Elite with body text — keep the three faces separate

## 7. Responsive Behavior

| Breakpoint | Width | Changes |
|---|---|---|
| Mobile | <768px | Single column, stacked cards, hidden sidebar, compact nav |
| Tablet | 768-1024px | 2-column grid, collapsible sidebar |
| Desktop | 1024-1440px | Full layout, sidebar visible, 3-column evidence grids |
| Wide | >1440px | Centered content, expanded margins |

## 8. Agent Prompt Guide

### Quick Reference

- Background: "Canvas (#050505)"
- Surface: "Card (#111111)" / "Elevated (#1a1a1a)"
- Accent: "Evidence Amber (#d4a017)"
- Text: "Ink (#f5f5f5)" / "Body (#b0b0b0)" / "Muted (#666666)"
- Alert: "Discrepancy Red (#c0392b)"
- Verified: "Case Closed Green (#27ae60)"
- Border: "Hairline (#1a1a1a)"

### Example Prompts

- "Create a case file card: #111111 background, 8px border-radius, 1px #1a1a1a border, 24px padding. Case ID at top in JetBrains Mono 11px uppercase with #d4a017 color and 0.5px letter-spacing. Headline in Space Grotesk 24px weight 600, #f5f5f5 text. Body in Inter 15px weight 400, #b0b0b0 text."

- "Build an evidence card: #1a1a1a background, 4px border-radius, 3px solid #d4a017 left border, 16px padding. Content in Inter 13px, evidence tag in JetBrains Mono 11px uppercase with amber-glow background."

- "Design the evidence board: #0a0a0a background with dot-grid pattern (radial-gradient at 1px 1px, #1a1a1a 1px, transparent 0, 24px 24px size). Evidence nodes connected by amber SVG lines."

- "Create an agent dispatch panel: #111111 background with rgba(255,107,53,0.06) tint for Bleacher Report agent. Agent icon top-left. Dispatch text in Special Elite 15px italic, 0.5px letter-spacing, #d4d4d4 text."
