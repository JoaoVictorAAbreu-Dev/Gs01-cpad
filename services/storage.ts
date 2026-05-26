import AsyncStorage from "@react-native-async-storage/async-storage";
import { MissionSettings, TelemetryHistoryPoint } from "@/types/mission";

const SETTINGS_KEY = "spa_settings_v2";
const HISTORY_KEY = "spa_history_v1";

export const defaultSettings: MissionSettings = {
  temperatureLimit: 78,
  batteryLimit: 30,
  signalLimit: 45,
  orbitalLimit: 74,
  apodEnabled: true,
  apodKey: "DEMO_KEY",
  notificationsEnabled: true,
  aiProvider: "none",
  aiApiKey: ""
};

export async function loadSettings(): Promise<MissionSettings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try {
    const parsed = JSON.parse(raw) as Partial<MissionSettings>;
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: MissionSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export async function loadHistory(): Promise<TelemetryHistoryPoint[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as TelemetryHistoryPoint[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function saveHistory(history: TelemetryHistoryPoint[]): Promise<void> {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}
