import { geminiGenerate } from "@/lib/llm/gemini";

export interface PlayerReaction {
  player: string;
  team: string;
  teamAbbr: string;
  platform: string;
  reaction: string;
  context: string;
}

export interface SocialRoundup {
  summary: string;
  reactions: PlayerReaction[];
  trendingTopics: string[];
  fetchedAt: string;
}

const SYSTEM_PROMPT = `You are an NBA social media analyst. Your job is to provide realistic summaries of what NBA players and personalities are currently posting on social media based on what's happening in the playoffs right now.

IMPORTANT RULES:
- Only reference real players and real events
- Base reactions on the actual current playoff situation
- Format as JSON matching the TypeScript interface
- Keep reactions short and authentic (1-2 sentences max)
- Include a mix of platforms: Instagram, Twitter/X, TikTok
- Be specific about which game/moment they're reacting to
- Use realistic player voice and slang where appropriate`;

export async function fetchSocialRoundup(apiKey: string): Promise<SocialRoundup> {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const userPrompt = `Today is ${today}. Based on the current NBA playoff situation, generate a JSON object with this exact structure:
{
  "summary": "1-2 sentence overview of the social media narrative right now",
  "reactions": [
    {
      "player": "Player Name",
      "team": "Full Team Name",
      "teamAbbr": "3-letter abbreviation",
      "platform": "Instagram Stories" or "Twitter/X" or "TikTok",
      "reaction": "What they posted (realistic, in their voice)",
      "context": "Which game/moment this relates to"
    }
  ],
  "trendingTopics": ["topic1", "topic2", "topic3"]
}

Include 6-8 player reactions. Mix active players, retired legends, and analysts. Make it feel real and current. Return ONLY valid JSON.`;

  const response = await geminiGenerate(SYSTEM_PROMPT, userPrompt, apiKey);

  try {
    const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      ...parsed,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      summary: "Social media roundup temporarily unavailable.",
      reactions: [],
      trendingTopics: [],
      fetchedAt: new Date().toISOString(),
    };
  }
}
