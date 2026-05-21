import { NextResponse } from "next/server";
import { fetchLatestTweets } from "@/lib/data/tweet-oembed";

export async function GET() {
  try {
    const tweets = await fetchLatestTweets();

    return NextResponse.json({
      tweets,
      count: tweets.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
