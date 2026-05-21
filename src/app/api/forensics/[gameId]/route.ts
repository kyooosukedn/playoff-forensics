import { NextRequest, NextResponse } from "next/server";
import { generateAutopsy } from "@/lib/forensics/autopsy";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;

  try {
    const body = await request.json();
    const { gameTitle, homeTeam, awayTeam, homeScore, awayScore } = body;

    if (!gameTitle || !homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: "gameTitle, homeTeam, awayTeam required" },
        { status: 400 }
      );
    }

    const autopsy = generateAutopsy(
      gameId,
      gameTitle,
      homeTeam,
      awayTeam,
      parseInt(homeScore ?? "0", 10),
      parseInt(awayScore ?? "0", 10)
    );

    return NextResponse.json(autopsy);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
