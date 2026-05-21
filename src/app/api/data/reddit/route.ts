import { NextResponse } from "next/server";
import { fetchRedditHot, fetchRedditComments, timeAgo } from "@/lib/data/reddit-api";

export async function GET() {
  try {
    const posts = await fetchRedditHot("nba", 8);

    const enriched = await Promise.all(
      posts.slice(0, 5).map(async (post) => {
        let topComment = null;
        try {
          const comments = await fetchRedditComments(post.permalink.replace("https://reddit.com", ""));
          if (comments.length > 0) {
            topComment = {
              author: comments[0].author,
              text: comments[0].body,
              upvotes: comments[0].upvotes,
            };
          }
        } catch {}

        return {
          ...post,
          timeAgo: timeAgo(post.timestamp),
          topComment,
        };
      })
    );

    return NextResponse.json({
      posts: enriched,
      remaining: posts.slice(5),
      fetchedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
