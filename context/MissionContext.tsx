import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as Notifications from "expo-notifications";
import { buildAlerts } from "@/utils/alerts";
import { getSimulatedMissionData } from "@/services/simulation";
import { defaultSettings, loadHistory, loadSettings, saveHistory, saveSettings } from "@/services/storage";
import { getApod } from "@/services/nasa";
import { getMissionInterpretation } from "@/services/ai";
import { ApodData, MissionAlert, MissionData, MissionSettings, TelemetryHistoryPoint } from "@/types/mission";

type MissionContextType = {
  data: MissionData;
  alerts: MissionAlert[];
  history: TelemetryHistoryPoint[];
  settings: MissionSettings;
  apod: ApodData | null;
  loadingApod: boolean;
  interpretation: string | null;
  interpretationError: string | null;
  loadingInterpretation: boolean;
  refreshTelemetry: () => void;
  updateSettings: (next: MissionSettings) => Promise<void>;
  refreshInterpretation: () => Promise<void>;
};

const initialData = getSimulatedMissionData();

const MissionContext = createContext<MissionContextType | undefined>(undefined);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true
  })
});

export function MissionProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<MissionData>(initialData);
  const [settings, setSettings] = useState<MissionSettings>(defaultSettings);
  const [alerts, setAlerts] = useState<MissionAlert[]>(buildAlerts(initialData, defaultSettings));
  const [history, setHistory] = useState<TelemetryHistoryPoint[]>([]);
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loadingApod, setLoadingApod] = useState(false);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [interpretationError, setInterpretationError] = useState<string | null>(null);
  const [loadingInterpretation, setLoadingInterpretation] = useState(false);

  const refreshTelemetry = useCallback(() => {
    setData((prev) => getSimulatedMissionData(prev.orbital.stability));
  }, []);

  const updateSettings = useCallback(async (next: MissionSettings) => {
    setSettings(next);
    await saveSettings(next);
  }, []);

  const refreshInterpretation = useCallback(async () => {
    if (settings.aiProvider === "none") {
      setInterpretation(null);
      setInterpretationError("Defina IA Provider como groq ou gemini em Configurações.");
      return;
    }
    if (!settings.aiApiKey.trim()) {
      setInterpretation(null);
      setInterpretationError("Preencha a IA API Key em Configurações.");
      return;
    }
    setLoadingInterpretation(true);
    setInterpretationError(null);
    const response = await getMissionInterpretation(data, settings);
    if (!response) {
      setInterpretation(null);
      setInterpretationError("Falha ao consultar IA. Verifique provider/chave e conexão.");
      setLoadingInterpretation(false);
      return;
    }
    setInterpretation(response);
    setLoadingInterpretation(false);
  }, [data, settings]);

  useEffect(() => {
    loadSettings().then(setSettings);
    loadHistory().then(setHistory);
    Notifications.requestPermissionsAsync();
  }, []);

  useEffect(() => {
    const nextAlerts = buildAlerts(data, settings);
    setAlerts(nextAlerts);
  }, [data, settings]);

  useEffect(() => {
    const point: TelemetryHistoryPoint = {
      timestamp: data.updatedAt,
      temperature: data.sensors.temperature,
      battery: data.energy.battery,
      signal: data.communication.signalStrength,
      stability: data.orbital.stability
    };

    setHistory((prev) => {
      const merged = [...prev, point].slice(-24);
      saveHistory(merged);
      return merged;
    });
  }, [data]);

  useEffect(() => {
    const criticalAlert = alerts.find((item) => item.severity === "critical");
    if (!criticalAlert || !settings.notificationsEnabled) return;

    Notifications.scheduleNotificationAsync({
      content: {
        title: criticalAlert.title,
        body: criticalAlert.message
      },
      trigger: null
    });
  }, [alerts, settings.notificationsEnabled]);

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
    () => ({
      data,
      alerts,
      history,
      settings,
      apod,
      loadingApod,
      interpretation,
      interpretationError,
      loadingInterpretation,
      refreshTelemetry,
      updateSettings,
      refreshInterpretation
    }),
    [
      data,
      alerts,
      history,
      settings,
      apod,
      loadingApod,
      interpretation,
      interpretationError,
      loadingInterpretation,
      refreshTelemetry,
      updateSettings,
      refreshInterpretation
    ]
  );

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}

export function useMissionContext() {
  const ctx = useContext(MissionContext);
  if (!ctx) throw new Error("useMissionContext must be used within MissionProvider");
  return ctx;
}
