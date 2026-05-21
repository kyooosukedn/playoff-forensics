export interface RedditPostData {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  upvotes: number;
  commentCount: number;
  timestamp: string;
  flair: string | null;
  flairColor: string | null;
  flairBg: string | null;
  permalink: string;
  thumbnail: string | null;
  score: number;
  url: string;
}

export interface RedditComment {
  author: string;
  body: string;
  upvotes: number;
  created: number;
}

const USER_AGENT = "PlayoffForensics/1.0 (NBA Playoff Dashboard)";

export async function fetchRedditHot(subreddit = "nba", limit = 10): Promise<RedditPostData[]> {
  const url = `https://www.reddit.com/r/${subreddit}/hot.json?limit=${limit}&raw_json=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`Reddit fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const posts = json.data.children
    .filter((c: any) => c.kind === "t3" && !c.data.stickied)
    .map((c: any) => {
      const d = c.data;
      const flair = d.link_flair_text;
      const flairColor = d.link_flair_text_color === "light" ? "#fff" : "#000";
      const flairBg = d.link_flair_background_color || null;

      return {
        id: d.id,
        title: d.title,
        author: d.author,
        subreddit: d.subreddit,
        upvotes: d.score,
        commentCount: d.num_comments,
        timestamp: new Date(d.created_utc * 1000).toISOString(),
        flair,
        flairColor,
        flairBg,
        permalink: `https://reddit.com${d.permalink}`,
        thumbnail: d.thumbnail?.startsWith("http") ? d.thumbnail : null,
        score: d.score,
        url: d.url,
      };
    });

  return posts;
}

export async function fetchRedditComments(permalink: string): Promise<RedditComment[]> {
  const url = `https://www.reddit.com${permalink}.json?limit=5&sort=top&raw_json=1`;

  const res = await fetch(url, {
    headers: { "User-Agent": USER_AGENT },
    next: { revalidate: 120 },
  });

  if (!res.ok) return [];

  const json = await res.json();
  if (!json[1]?.data?.children) return [];

  return json[1].data.children
    .filter((c: any) => c.kind === "t1")
    .slice(0, 3)
    .map((c: any) => ({
      author: c.data.author,
      body: c.data.body?.slice(0, 500) ?? "",
      upvotes: c.data.score,
      created: c.data.created_utc,
    }));
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
