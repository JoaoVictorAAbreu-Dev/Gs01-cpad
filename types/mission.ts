export type TelemetryPoint = {
  label: string;
  value: number;
  unit: string;
  target?: number;
};

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

export type MissionData = {
  missionName: string;
  crew: string;
  orbit: string;
  sensors: SensorSnapshot;
  energy: EnergySnapshot;
  communication: CommunicationSnapshot;
  updatedAt: string;
};

export type AlertSeverity = "high" | "medium";

export type MissionAlert = {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  createdAt: string;
};

export type MissionSettings = {
  temperatureLimit: number;
  batteryLimit: number;
  signalLimit: number;
  apodEnabled: boolean;
  apodKey: string;
};

export type ApodData = {
  title: string;
  date: string;
  url: string;
  explanation: string;
  media_type: "image" | "video";
};