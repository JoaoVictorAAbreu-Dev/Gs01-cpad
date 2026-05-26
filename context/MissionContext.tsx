import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { buildAlerts } from "@/utils/alerts";
import { getSimulatedMissionData } from "@/services/simulation";
import { defaultSettings, loadSettings, saveSettings } from "@/services/storage";
import { getApod } from "@/services/nasa";
import { ApodData, MissionAlert, MissionData, MissionSettings } from "@/types/mission";

type MissionContextType = {
  data: MissionData;
  alerts: MissionAlert[];
  settings: MissionSettings;
  apod: ApodData | null;
  loadingApod: boolean;
  refreshTelemetry: () => void;
  updateSettings: (next: MissionSettings) => Promise<void>;
};

const initialData = getSimulatedMissionData();

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MissionData>(initialData);
  const [settings, setSettings] = useState<MissionSettings>(defaultSettings);
  const [alerts, setAlerts] = useState<MissionAlert[]>(buildAlerts(initialData, defaultSettings));
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loadingApod, setLoadingApod] = useState(false);

  const refreshTelemetry = useCallback(() => {
    const nextData = getSimulatedMissionData();
    setData(nextData);
  }, []);

  const updateSettings = useCallback(async (next: MissionSettings) => {
    setSettings(next);
    await saveSettings(next);
  }, []);

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  useEffect(() => {
    setAlerts(buildAlerts(data, settings));
  }, [data, settings]);

  useEffect(() => {
    const interval = setInterval(refreshTelemetry, 9000);
    return () => clearInterval(interval);
  }, [refreshTelemetry]);

  useEffect(() => {
    if (!settings.apodEnabled || !settings.apodKey) {
      setApod(null);
      return;
    }
    setLoadingApod(true);
    getApod(settings.apodKey)
      .then(setApod)
      .finally(() => setLoadingApod(false));
  }, [settings.apodEnabled, settings.apodKey]);

  const value = useMemo(
    () => ({ data, alerts, settings, apod, loadingApod, refreshTelemetry, updateSettings }),
    [data, alerts, settings, apod, loadingApod, refreshTelemetry, updateSettings]
  );

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMissionContext() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMissionContext must be used within MissionProvider");
  return ctx;
}