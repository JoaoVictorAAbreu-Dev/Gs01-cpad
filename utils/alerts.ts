import { MissionAlert, MissionData, MissionSettings } from "@/types/mission";

export function buildAlerts(data: MissionData, settings: MissionSettings): MissionAlert[] {
  const items: MissionAlert[] = [];

  if (data.sensors.temperature >= settings.temperatureLimit) {
    items.push({
      id: `temp-${data.updatedAt}`,
      title: "Temperatura alta",
      message: `Temperatura em ${data.sensors.temperature}°C ultrapassou limite de ${settings.temperatureLimit}°C.`,
      severity: "high",
      createdAt: new Date().toISOString()
    });
  }

  if (data.energy.battery <= settings.batteryLimit) {
    items.push({
      id: `battery-${data.updatedAt}`,
      title: "Energia baixa",
      message: `Bateria em ${data.energy.battery}% abaixo do limite de ${settings.batteryLimit}%.`,
      severity: "high",
      createdAt: new Date().toISOString()
    });
  }

  if (data.communication.signalStrength <= settings.signalLimit) {
    items.push({
      id: `signal-${data.updatedAt}`,
      title: "Falha de sinal",
      message: `Sinal em ${data.communication.signalStrength}% abaixo do limite de ${settings.signalLimit}%.`,
      severity: "medium",
      createdAt: new Date().toISOString()
    });
  }

  return items;
}