import { NextResponse } from "next/server";
import { fetchSocialRoundup } from "@/lib/data/gemini-social";

export async function GET() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured", reactions: [], trendingTopics: [] },
      { status: 200 }
    );
  }

  try {
    const roundup = await fetchSocialRoundup(apiKey);
    return NextResponse.json(roundup);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, reactions: [], trendingTopics: [] },
      { status: 500 }
    );
  }
}
