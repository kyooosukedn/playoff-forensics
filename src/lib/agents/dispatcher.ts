import { geminiGenerate } from "@/lib/llm/gemini";
import { agentPrompts, buildAgentUserPrompt } from "@/lib/agents/prompts";

export interface AgentDispatchResult {
  agent: string;
  agentName: string;
  dispatch: string;
  timestamp: string;
}

const agentNames: Record<string, string> = {
  bleacher: "Bleacher Report",
  espn: "ESPN Analysis",
  nbatv: "NBA TV Broadcast",
  reddit: "Reddit r/nba",
};

export async function dispatchAllAgents(
  gameContext: string,
  apiKey: string
): Promise<AgentDispatchResult[]> {
  const results: AgentDispatchResult[] = [];

  for (const [slug, systemPrompt] of Object.entries(agentPrompts)) {
    const userPrompt = buildAgentUserPrompt(slug, gameContext);

    try {
      const dispatch = await geminiGenerate(systemPrompt, userPrompt, apiKey);
      results.push({
        agent: slug,
        agentName: agentNames[slug],
        dispatch,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      });
    } catch (err: any) {
      results.push({
        agent: slug,
        agentName: agentNames[slug],
        dispatch: `[DISPATCH FAILED: ${err.message}]`,
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      });
    }
  }

  return results;
}
