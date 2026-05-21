import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { formatCount } from "@/lib/data/mock-social";

const storylines = [
  {
    id: "ST-001",
    status: "trending",
    headline: "Jokic Dynasty Talk After Game 4 Masterclass",
    subtitle: "Is this the greatest playoff run by a center in NBA history?",
    timestamp: "2h ago",
    sources: [
      { platform: "X", handle: "@ShamsCharania", snippet: "Jokic posts 34-14-9 on 14 shots. The Nuggets take a 3-1 series lead." },
      { platform: "Reddit", handle: "r/nba", snippet: "Post-game thread has 8.4K upvotes. Top comment: 'The man doesn't need volume.'" },
      { platform: "BR", handle: "Bleacher Report", snippet: "JOKIC. IS. HIM. 45K likes, 12K shares." },
    ],
    engagement: { posts: 14200, likes: 89000, shares: 34000 },
    tags: ["MVP", "Nuggets", "WCF"],
  },
  {
    id: "ST-002",
    status: "trending",
    headline: "OKC's Season on the Brink",
    subtitle: "Best record in the West, down 3-1. What happened?",
    timestamp: "3h ago",
    sources: [
      { platform: "X", handle: "@KendrickPerkins", snippet: "I said it BEFORE the series! Jokic is the BEST player in the world!" },
      { platform: "Reddit", handle: "r/nba", snippet: "HOT TAKE thread: 'The Nuggets bench is the real story, not Jokic'" },
      { platform: "IG", handle: "@kingjames", snippet: "Jokic different breed man. Respect." },
    ],
    engagement: { posts: 9800, likes: 67000, shares: 22000 },
    tags: ["Thunder", "Upset", "Comeback"],
  },
  {
    id: "ST-003",
    status: "hot",
    headline: "The Coaching Adjustment Nobody Noticed",
    subtitle: "Nuggets switched to switch-everything at the 8:14 mark. Game changed.",
    timestamp: "4h ago",
    sources: [
      { platform: "X", handle: "@samquinnen", snippet: "The wildest part: 14 shots for 34 points. 2.43 points per attempt." },
      { platform: "Reddit", handle: "r/nba", snippet: "Top 3 comments all about the coaching adjustment. u/RedditCoach has receipts." },
      { platform: "BR", handle: "Bleacher Report", snippet: "Someone check on the Thunder. 67K likes." },
    ],
    engagement: { posts: 5400, likes: 32000, shares: 15000 },
    tags: ["Film Room", "Scheme", "Defense"],
  },
  {
    id: "ST-004",
    status: "hot",
    headline: "SGA's Quiet Night Raises Questions",
    subtitle: "MVP finalist goes 8-of-22 in elimination-level game. The discourse begins.",
    timestamp: "5h ago",
    sources: [
      { platform: "X", handle: "@ChrisBHaynes", snippet: "Multiple scouts say Jokic is at a level they've seen from three centers in history." },
      { platform: "Reddit", handle: "r/nba", snippet: "'Jokic is washed' take got demolished. Counter-post has triple the upvotes." },
      { platform: "IG", handle: "@money23green", snippet: "People talk about threes. I'm watching the defensive rotations." },
    ],
    engagement: { posts: 7200, likes: 41000, shares: 18000 },
    tags: ["SGA", "Pressure", "Discourse"],
  },
  {
    id: "ST-005",
    status: "fading",
    headline: "Ball Arena Crowd Goes Viral",
    subtitle: "Fans standing for entire 4th quarter. The M-V-P chants started with 6 minutes left.",
    timestamp: "8h ago",
    sources: [
      { platform: "BR", handle: "Bleacher Report", snippet: "THE ATMOSPHERE IN DENVER RIGHT NOW. 32K likes, 8.5K shares." },
      { platform: "X", handle: "@World_Wide_Wob", snippet: "The vibes ARE the analysis. That crowd carried that 22-4 run." },
      { platform: "Reddit", handle: "r/nba", snippet: "Someone posted a clip. 4.2K upvotes in 12 minutes." },
    ],
    engagement: { posts: 3600, likes: 28000, shares: 9500 },
    tags: ["Atmosphere", "Denver", "Viral"],
  },
  {
    id: "ST-006",
    status: "fading",
    headline: "Ja Morant's IG Story Reaction",
    subtitle: "That pass at the 8 min mark had me out of my chair no cap",
    timestamp: "10h ago",
    sources: [
      { platform: "IG", handle: "@jamorant", snippet: "That pass at the 8 min mark had me out of my chair no cap" },
      { platform: "IG", handle: "@easymoneysniper", snippet: "The touch around the rim is what gets me. Every time." },
      { platform: "IG", handle: "@patbeverley21", snippet: "You THINK you have him figured out. You don't. Trust me." },
    ],
    engagement: { posts: 2100, likes: 19000, shares: 7800 },
    tags: ["Player Reactions", "IG Stories", "Vibes"],
  },
];

const statusConfig = {
  trending: { color: "#d4a017", label: "TRENDING" },
  hot: { color: "#ff6b35", label: "HOT" },
  fading: { color: "#666", label: "FADING" },
};

const platformIcons: Record<string, string> = {
  X: "𝕏",
  Reddit: "R",
  BR: "B",
  IG: "📷",
};

export default function CaseFilesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <TopNav />
      <Sidebar />

      <main className="md:ml-[280px] pt-14">
        <section className="border-b border-hairline px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="flex items-center gap-3 mb-4"
              style={{ animation: "fadeInUp 0.4s ease-out both" }}
            >
              <span
                className="text-accent text-[11px] tracking-[0.5px] uppercase"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Narrative Archive
              </span>
            </div>

            <h1
              className="text-ink text-[40px] font-normal leading-[1.15] tracking-[1.5px] uppercase mb-4"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              Storylines
            </h1>

            <p
              className="text-body text-lg max-w-xl"
              style={{ animation: "fadeInUp 0.6s ease-out 0.15s both" }}
            >
              Every game creates a story. Here&apos;s what the internet ran with.
              From viral moments to hot takes to player reactions.
            </p>
          </div>
        </section>

        <section className="px-8 py-12 md:px-12">
          <div className="max-w-[1280px] mx-auto space-y-6">
            {storylines.map((story, i) => {
              const status = statusConfig[story.status as keyof typeof statusConfig];
              return (
                <div
                  key={story.id}
                  className="bg-surface-card border border-hairline rounded-xl overflow-hidden hover:border-hairline-strong transition-colors"
                  style={{ animation: `dispatchSlideIn 0.5s ease-out ${0.1 + i * 0.08}s both` }}
                >
                  <div className="p-6">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              backgroundColor: `${status.color}20`,
                              color: status.color,
                            }}
                          >
                            {status.label}
                          </span>
                          <span
                            className="text-muted-soft text-[10px] tracking-[0.5px]"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            {story.id} · {story.timestamp}
                          </span>
                        </div>
                        <h2
                          className="text-ink text-[18px] font-semibold mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {story.headline}
                        </h2>
                        <p className="text-body text-[14px]">{story.subtitle}</p>
                      </div>
                    </div>

                    {/* Source snippets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {story.sources.map((src, j) => (
                        <div key={j} className="bg-surface-soft rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[11px] font-bold"
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                color: src.platform === "X" ? "#e7e9ea" :
                                  src.platform === "Reddit" ? "#ff4500" :
                                  src.platform === "BR" ? "#fff" : "#e1306c",
                              }}
                            >
                              {platformIcons[src.platform]} {src.handle}
                            </span>
                          </div>
                          <p className="text-muted text-[12px] leading-[1.5]">{src.snippet}</p>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {story.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded border border-hairline text-muted"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div
                        className="flex items-center gap-4 text-muted text-[11px]"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span>📝 {formatCount(story.engagement.posts)} posts</span>
                        <span>❤️ {formatCount(story.engagement.likes)}</span>
                        <span>↗ {formatCount(story.engagement.shares)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
