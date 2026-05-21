import { NextResponse } from "next/server";
import { fetchESPNNews, timeAgo } from "@/lib/data/espn-news";

export async function GET() {
  try {
    const articles = await fetchESPNNews(12);

    const formatted = articles.map((a) => ({
      ...a,
      timeAgo: timeAgo(a.published),
    }));

    return NextResponse.json({
      articles: formatted,
      count: formatted.length,
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
