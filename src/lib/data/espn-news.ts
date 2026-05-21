export interface ESPNArticle {
  id: number;
  headline: string;
  description: string;
  byline: string | null;
  type: string;
  imageUrl: string | null;
  published: string;
  url: string;
  source: string;
}

export async function fetchESPNNews(limit = 10): Promise<ESPNArticle[]> {
  const res = await fetch(
    `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news?limit=${limit}`,
    { next: { revalidate: 120 } }
  );

  if (!res.ok) throw new Error(`ESPN News fetch failed: ${res.status}`);

  const data = await res.json();

  return (data.articles || []).map((a: any) => ({
    id: a.id,
    headline: a.headline,
    description: a.description,
    byline: a.byline || null,
    type: a.type,
    imageUrl: a.images?.[0]?.url || null,
    published: a.published,
    url: a.links?.web?.href || `https://www.espn.com/nba/story/_/id/${a.id}`,
    source: a.byline?.includes("ESPN") ? "ESPN" :
      a.type === "Media" ? "ESPN Video" : "ESPN",
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
