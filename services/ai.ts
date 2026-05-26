import { MissionData, MissionSettings } from "@/types/mission";

export async function getMissionInterpretation(data: MissionData, settings: MissionSettings): Promise<string | null> {
  if (settings.aiProvider === "none" || !settings.aiApiKey.trim()) return null;

  const prompt = `Analyze this orbital mission telemetry and return a short operational recommendation in Portuguese.\nTemperature: ${data.sensors.temperature}C\nBattery: ${data.energy.battery}%\nSignal: ${data.communication.signalStrength}%\nStability: ${data.orbital.stability}%\nLatency: ${data.communication.latency}ms`;

  try {
    if (settings.aiProvider === "groq") {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${settings.aiApiKey.trim()}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.2,
          max_tokens: 140
        })
      });
      if (!response.ok) return null;
      const dataResponse = await response.json() as { choices?: { message?: { content?: string } }[] };
      return dataResponse.choices?.[0]?.message?.content?.trim() ?? null;
    }

    if (settings.aiProvider === "gemini") {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(settings.aiApiKey.trim())}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      if (!response.ok) return null;
      const dataResponse = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      return dataResponse.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? null;
    }

    return null;
  } catch {
    return null;
  }
}
