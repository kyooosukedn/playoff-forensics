const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

interface GeminiResponse {
  candidates?: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

let lastCallTime = 0;
const MIN_INTERVAL = 4500; // ~13 RPM to stay under 15 RPM free tier

async function rateLimitedFetch(url: string, options: RequestInit): Promise<Response> {
  const now = Date.now();
  const timeSinceLastCall = now - lastCallTime;
  if (timeSinceLastCall < MIN_INTERVAL) {
    await new Promise((r) => setTimeout(r, MIN_INTERVAL - timeSinceLastCall));
  }
  lastCallTime = Date.now();
  return fetch(url, options);
}

export async function geminiGenerate(
  systemPrompt: string,
  userPrompt: string,
  apiKey: string
): Promise<string> {
  const url = `${GEMINI_BASE}/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature: 0.85,
      topP: 0.9,
      maxOutputTokens: 500,
    },
  };

  const res = await rateLimitedFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data: GeminiResponse = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}
