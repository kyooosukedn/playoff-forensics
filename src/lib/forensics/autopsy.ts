import { runForensicAnalysis, ForensicVerdict, Discrepancy } from "./gap-analysis";

export interface GameAutopsy {
  gameId: string;
  gameTitle: string;
  verdict: ForensicVerdict;
  summary: string;
  evidenceCount: number;
  discrepancyCount: number;
}

export function generateAutopsy(
  gameId: string,
  gameTitle: string,
  homeTeam: string,
  awayTeam: string,
  homeScore: number,
  awayScore: number
): GameAutopsy {
  const narratives = [
    { source: "Bleacher Report", claim: `${homeScore > awayScore ? homeTeam : awayTeam} dominated in a statement win`, keywords: ["dominant"] },
    { source: "ESPN", claim: `Elite defensive performance sealed the game`, keywords: ["elite"] },
    { source: "Reddit", claim: `The losing team's star player disappeared when it mattered`, keywords: ["disappeared"] },
  ];

  const scoreDiff = Math.abs(homeScore - awayScore);
  const isBlowout = scoreDiff > 15;
  const isClose = scoreDiff <= 5;

  const data = [
    { label: "win_margin", value: scoreDiff / 30, context: `${homeTeam} vs ${awayTeam}` },
    { label: "efficiency", value: isBlowout ? 0.72 : isClose ? 0.52 : 0.60, context: "overall" },
    { label: "clutch_performance", value: isClose ? 0.45 : 0.65, context: "4th quarter" },
  ];

  const verifiedClaims = [
    { source: "NBA TV", claim: `Final score: ${homeTeam} ${homeScore}, ${awayTeam} ${awayScore}`, data: `Score differential: ${scoreDiff} points` },
  ];

  if (isBlowout) {
    verifiedClaims.push({
      source: "ESPN",
      claim: "Margin indicates decisive performance",
      data: `${scoreDiff}-point differential exceeds average playoff margin of 10.3`,
    });
  }

  const verdict = runForensicAnalysis(gameId, narratives, data, verifiedClaims);

  const summary = `Forensic autopsy of ${gameTitle}: ${homeTeam} ${homeScore} vs ${awayTeam} ${awayScore}. ` +
    `${verdict.discrepancies.length} discrepancies detected across ${narratives.length} narratives. ` +
    `Overall distortion index: ${verdict.overallDistortion}. ` +
    `Agent agreement: ${verdict.agentAgreement}%.`;

  return {
    gameId,
    gameTitle,
    verdict,
    summary,
    evidenceCount: verdict.discrepancies.length + verdict.verifiedClaims.length,
    discrepancyCount: verdict.discrepancies.length,
  };
}
