import { NextResponse } from "next/server";
import { getPlayoffScores } from "@/lib/data/nba-api";

export async function GET() {
  try {
    const games = await getPlayoffScores();
    return NextResponse.json({ games });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
