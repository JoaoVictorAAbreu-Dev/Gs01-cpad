import AsyncStorage from "@react-native-async-storage/async-storage";
import { MissionSettings } from "@/types/mission";

const SETTINGS_KEY = "spa_settings_v1";

export const defaultSettings: MissionSettings = {
  temperatureLimit: 78,
  batteryLimit: 30,
  signalLimit: 45,
  apodEnabled: true,
  apodKey: "DEMO_KEY"
};

export async function loadSettings(): Promise<MissionSettings> {
  const raw = await AsyncStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try {
    const parsed = JSON.parse(raw) as MissionSettings;
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings: MissionSettings): Promise<void> {
  await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}