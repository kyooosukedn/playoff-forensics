export interface Discrepancy {
  id: string;
  type: "selective_evidence" | "narrative_exaggeration" | "missing_context" | "timing_bias";
  severity: "high" | "medium" | "low";
  source: string;
  narrative: string;
  reality: string;
  confidence: number;
}

export interface ForensicVerdict {
  gameId: string;
  overallDistortion: "CRITICAL" | "HIGH" | "MODERATE" | "LOW";
  discrepancies: Discrepancy[];
  verifiedClaims: { source: string; claim: string; data: string }[];
  agentAgreement: number;
  timestamp: string;
}

interface NarrativeClaim {
  source: string;
  claim: string;
  keywords: string[];
}

interface DataPoint {
  label: string;
  value: number;
  context: string;
}

const exaggerationPatterns: Record<string, { threshold: number; description: string }> = {
  dominant: { threshold: 0.65, description: "Claimed dominance, but performance was average" },
  elite: { threshold: 0.70, description: "Called elite, but metrics say otherwise" },
  unstoppable: { threshold: 0.75, description: "Called unstoppable, but efficiency was moderate" },
  clamped: { threshold: 0.35, description: "Said player was shut down, but scoring was reasonable" },
  disappeared: { threshold: 0.40, description: "Claimed player vanished, but usage was present" },
  washed: { threshold: 0.50, description: "Called washed, but performance was above replacement level" },
};

function detectExaggeration(narratives: NarrativeClaim[], data: DataPoint[]): Discrepancy[] {
  const discrepancies: Discrepancy[] = [];
  let evidenceNum = 0;

  for (const narrative of narratives) {
    for (const keyword of narrative.keywords) {
      const pattern = exaggerationPatterns[keyword.toLowerCase()];
      if (!pattern) continue;

      const relevantData = data.find((d) =>
        narrative.claim.toLowerCase().includes(d.label.toLowerCase()) ||
        d.context.toLowerCase().includes(narrative.source.toLowerCase())
      );

      if (relevantData && relevantData.value < pattern.threshold) {
        evidenceNum++;
        discrepancies.push({
          id: `DISC-${evidenceNum}`,
          type: "narrative_exaggeration",
          severity: pattern.threshold - relevantData.value > 0.2 ? "high" : "medium",
          source: narrative.source,
          narrative: narrative.claim,
          reality: `${pattern.description} (metric: ${relevantData.value.toFixed(2)}, threshold: ${pattern.threshold})`,
          confidence: Math.round((pattern.threshold - relevantData.value) * 100) / 100,
        });
      }
    }
  }

  return discrepancies;
}

function calculateDistortion(discrepancies: Discrepancy[]): ForensicVerdict["overallDistortion"] {
  const highCount = discrepancies.filter((d) => d.severity === "high").length;
  const totalConfidence = discrepancies.reduce((sum, d) => sum + d.confidence, 0);

  if (highCount >= 3 || totalConfidence > 1.5) return "CRITICAL";
  if (highCount >= 2 || totalConfidence > 0.8) return "HIGH";
  if (discrepancies.length >= 3 || totalConfidence > 0.4) return "MODERATE";
  return "LOW";
}

export function runForensicAnalysis(
  gameId: string,
  narratives: NarrativeClaim[],
  data: DataPoint[],
  verifiedClaims: ForensicVerdict["verifiedClaims"]
): ForensicVerdict {
  const discrepancies = detectExaggeration(narratives, data);
  const agentAgreement = narratives.length > 0
    ? Math.round((1 - discrepancies.length / narratives.length) * 100)
    : 100;

  return {
    gameId,
    overallDistortion: calculateDistortion(discrepancies),
    discrepancies,
    verifiedClaims,
    agentAgreement: Math.max(0, Math.min(100, agentAgreement)),
    timestamp: new Date().toISOString(),
  };
}
