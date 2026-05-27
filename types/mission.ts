export type SensorSnapshot = {
  temperature: number;
  pressure: number;
  oxygen: number;
  radiation: number;
};

export type EnergySnapshot = {
  battery: number;
  solarOutput: number;
  consumption: number;
};

export type CommunicationSnapshot = {
  signalStrength: number;
  latency: number;
  packetLoss: number;
};

export type OrbitalSnapshot = {
  stability: number;
  drift: number;
};

export type MissionData = {
  missionName: string;
  crew: string;
  orbit: string;
  sensors: SensorSnapshot;
  energy: EnergySnapshot;
  communication: CommunicationSnapshot;
  orbital: OrbitalSnapshot;
  updatedAt: string;
};

export type AlertSeverity = "low" | "medium" | "high" | "critical";

export type MissionAlert = {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  subsystem: "thermal" | "energy" | "comms" | "orbital";
  recommendation: string;
  createdAt: string;
};

export type MissionSettings = {
  temperatureLimit: number;
  batteryLimit: number;
  signalLimit: number;
  orbitalLimit: number;
  apodEnabled: boolean;
  apodKey: string;
  notificationsEnabled: boolean;
  aiProvider: "none" | "groq" | "gemini";
  aiApiKey: string;
};

export type ApodData = {
  title: string;
  date: string;
  url: string;
  explanation: string;
  media_type: "image" | "video";
};

export type TelemetryHistoryPoint = {
  timestamp: string;
  temperature: number;
  battery: number;
  signal: number;
  stability: number;
};
