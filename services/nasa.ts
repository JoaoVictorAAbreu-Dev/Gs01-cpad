import { ApodData } from "@/types/mission";

export async function getApod(apiKey: string): Promise<ApodData | null> {
  if (!apiKey.trim()) return null;
  try {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${encodeURIComponent(apiKey)}`);
    if (!response.ok) return null;
    const data = (await response.json()) as ApodData;
    return data;
  } catch {
    return null;
  }
}
