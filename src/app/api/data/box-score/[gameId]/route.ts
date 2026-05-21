import { NextResponse } from "next/server";
import { getBoxScore } from "@/lib/data/nba-api";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;
  try {
    const data = await getBoxScore(gameId);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
