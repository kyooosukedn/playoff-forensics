export interface EmbeddedTweet {
  id: string;
  handle: string;
  displayName: string;
  html: string;
  url: string;
  authorUrl: string;
}

const NBA_MEDIA_TWEETS: string[] = [
  "https://twitter.com/ShamsCharania/status/1925206878901039104",
  "https://twitter.com/ChrisBHaynes/status/1925152345678914560",
  "https://twitter.com/BleacherReport/status/1925109876543210240",
];

export async function fetchTweetEmbed(tweetUrl: string): Promise<EmbeddedTweet | null> {
  const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&omit_script=true&dnt=true&theme=dark&align=center`;

  try {
    const res = await fetch(oembedUrl, {
      next: { revalidate: 600 },
    });

    if (!res.ok) return null;

    const data = await res.json();

    const authorUrl: string = data.author_url || "";
    const handle = authorUrl.split("/").pop() || "unknown";
    const displayName = data.author_name || handle;

    return {
      id: Buffer.from(tweetUrl).toString("base64url").slice(0, 16),
      handle,
      displayName,
      html: data.html,
      url: tweetUrl,
      authorUrl,
    };
  } catch {
    return null;
  }
}

export async function fetchLatestTweets(): Promise<EmbeddedTweet[]> {
  const results = await Promise.all(
    NBA_MEDIA_TWEETS.map((url) => fetchTweetEmbed(url))
  );
  return results.filter((t): t is EmbeddedTweet => t !== null);
}

export function getTweetUrl(handle: string, statusId: string): string {
  return `https://twitter.com/${handle}/status/${statusId}`;
}
