export interface XPost {
  id: string;
  handle: string;
  displayName: string;
  verified: boolean;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  isQuote?: boolean;
  quotedPost?: { handle: string; text: string };
}

export interface IGStory {
  id: string;
  player: string;
  team: string;
  teamAbbr: string;
  emoji: string;
  reaction: string;
  timestamp: string;
  gradient: string;
}

export interface RedditPost {
  id: string;
  title: string;
  subreddit: string;
  upvotes: number;
  commentCount: number;
  author: string;
  timestamp: string;
  flair: string;
  topComment: { author: string; text: string; upvotes: number };
}

export interface BleacherDrop {
  id: string;
  headline: string;
  body: string;
  emoji: string;
  timestamp: string;
  likes: number;
  shares: number;
}

export const xPosts: XPost[] = [
  {
    id: "x1",
    handle: "ShamsCharania",
    displayName: "Shams Charania",
    verified: true,
    avatar: "S",
    text: "Breaking: Nikola Jokic posts 34-14-9 in Game 4. The Nuggets take a 3-1 series lead. This is now officially his postseason — and it's not close.",
    timestamp: "2m",
    likes: 28400,
    retweets: 6200,
    replies: 1840,
    views: 4200000,
  },
  {
    id: "x2",
    handle: "ChrisBHaynes",
    displayName: "Chris Haynes",
    verified: true,
    avatar: "C",
    text: "Multiple scouts in attendance tonight told me Jokic is playing at a level they've only seen from three centers in NBA history. The passing. The touch. The pace. Unreal.",
    timestamp: "8m",
    likes: 14300,
    retweets: 3100,
    replies: 920,
    views: 1800000,
  },
  {
    id: "x3",
    handle: "KendrickPerkins",
    displayName: "Kendrick Perkins",
    verified: true,
    avatar: "K",
    text: "I said it BEFORE the series and I'll say it again. Jokic is the BEST player in the world. Not named. Not debated. Not close. The man is playing CHESS while everyone else is playing checkers!!!",
    timestamp: "15m",
    likes: 8900,
    retweets: 2400,
    replies: 3100,
    views: 2100000,
  },
  {
    id: "x4",
    handle: "World_Wide_Wob",
    displayName: "Wob",
    verified: false,
    avatar: "W",
    text: "the nuggets went on a 22-4 run and the building sounded like a playoff game in 2013. sometimes the vibes ARE the analysis. that crowd carried that run.",
    timestamp: "22m",
    likes: 5600,
    retweets: 890,
    replies: 430,
    views: 890000,
    isQuote: true,
    quotedPost: {
      handle: "BleacherReport",
      text: "22-4 RUN FOR DENVER. Ball Arena is ELECTRIC.",
    },
  },
  {
    id: "x5",
    handle: "samquinnen",
    displayName: "Sam Quinn",
    verified: true,
    avatar: "S",
    text: "The wildest part of Jokic's Game 4: he only took 14 shots. 14 shots for 34 points. That's 2.43 points per shot attempt. The efficiency is genuinely hard to contextualize because there's barely a historical comp.",
    timestamp: "35m",
    likes: 11200,
    retweets: 2800,
    replies: 670,
    views: 1500000,
  },
];

export const igStories: IGStory[] = [
  {
    id: "ig1",
    player: "LeBron James",
    team: "Los Angeles Lakers",
    teamAbbr: "LAL",
    emoji: "👑",
    reaction: "Jokic different breed man. Respect. 🤝",
    timestamp: "18m ago",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "ig2",
    player: "Kevin Durant",
    team: "Phoenix Suns",
    teamAbbr: "PHX",
    emoji: "🐍",
    reaction: "The touch around the rim is what gets me. Every time. Like he's got eyes in the back of his head.",
    timestamp: "25m ago",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "ig3",
    player: "Ja Morant",
    team: "Memphis Grizzlies",
    teamAbbr: "MEM",
    emoji: "🚀",
    reaction: "That pass at the 8 min mark had me out of my chair no cap 💀💀",
    timestamp: "32m ago",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "ig4",
    player: "Pat Beverley",
    team: "Milwaukee Bucks",
    teamAbbr: "MIL",
    emoji: "🗣️",
    reaction: "I played against him. You THINK you have him figured out. You don't. Trust me.",
    timestamp: "41m ago",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "ig5",
    player: "Draymond Green",
    team: "Golden State Warriors",
    teamAbbr: "GSW",
    emoji: "💪",
    reaction: "People wanna talk about the threes. I'm watching the defensive rotations. He reads the game 2 plays ahead. That's the real superpower.",
    timestamp: "55m ago",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  },
];

export const redditPosts: RedditPost[] = [
  {
    id: "r1",
    title: "[Post Game Thread] Denver Nuggets defeat Oklahoma City Thunder 112-105, take a 3-1 series lead",
    subreddit: "r/nba",
    upvotes: 8400,
    commentCount: 3200,
    author: "AutoModerator",
    timestamp: "1h ago",
    flair: "Post Game",
    topComment: {
      author: "u/NuggetsNation49",
      text: "Jokic is genuinely breaking basketball. 34/14/9 on 14 shots. FOURTEEN SHOTS. The man doesn't need volume, he just needs the ball and a dream.",
      upvotes: 6200,
    },
  },
  {
    id: "r2",
    title: "Jokic's Playoff Run is Statistically the Most Efficient in NBA History (min 10 games)",
    subreddit: "r/nba",
    upvotes: 12100,
    commentCount: 1800,
    author: "u/StatNerd42",
    timestamp: "2h ago",
    flair: "Analytics",
    topComment: {
      author: "u/BoxScoreWatcher",
      text: "I ran the numbers myself and OP isn't exaggerating. His TS% this postseason is .689. For context, the league average is .562. He's operating in a completely different dimension.",
      upvotes: 4500,
    },
  },
  {
    id: "r3",
    title: "HOT TAKE: The Nuggets bench is the real story of this series, not Jokic",
    subreddit: "r/nba",
    upvotes: 3400,
    commentCount: 2400,
    author: "u/HOT_TAKE_MACHINE",
    timestamp: "3h ago",
    flair: "Hot Take",
    topComment: {
      author: "u/RedditCoach",
      text: "This isn't even a hot take anymore. The second unit went +18 in 12 minutes tonight. That's the game right there.",
      upvotes: 2800,
    },
  },
];

export const bleacherDrops: BleacherDrop[] = [
  {
    id: "b1",
    headline: "JOKIC. IS. HIM.",
    body: "34 points. 14 rebounds. 9 assists. On 14 shots. The Serbian sensation just put the Nuggets one win away from the WCF. Ball Arena hasn't been this loud since the bubble.",
    emoji: "🔥",
    timestamp: "12m ago",
    likes: 45000,
    shares: 12000,
  },
  {
    id: "b2",
    headline: "THE ATMOSPHERE IN DENVER RIGHT NOW",
    body: "Fans standing for the entire 4th quarter. The chant started with 6 minutes left. \"M-V-P. M-V-P.\" Jokic just stood at half court and watched. No smile. Just business.",
    emoji: "🏟️",
    timestamp: "28m ago",
    likes: 32000,
    shares: 8500,
  },
  {
    id: "b3",
    headline: "SOMEONE CHECK ON THE THUNDER",
    body: "OKC had the best record in the West. They had SGA. They had home court. They had all the narratives. And now they're down 3-1 to a guy who looks like he'd rather be at a horse race. Basketball is hilarious.",
    emoji: "💀",
    timestamp: "45m ago",
    likes: 67000,
    shares: 22000,
  },
];

export function formatCount(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}
