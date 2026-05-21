import { NextRequest, NextResponse } from "next/server";
import { dispatchAllAgents } from "@/lib/agents/dispatcher";

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const gameContext: string = body.gameContext;

    if (!gameContext || gameContext.length < 20) {
      return NextResponse.json(
        { error: "gameContext is required (min 20 chars)" },
        { status: 400 }
      );
    }

    const dispatches = await dispatchAllAgents(gameContext, apiKey);
    return NextResponse.json({ dispatches });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
