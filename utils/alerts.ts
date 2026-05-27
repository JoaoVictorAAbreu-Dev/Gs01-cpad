import { MissionAlert, MissionData, MissionSettings } from "@/types/mission";

export function buildAlerts(data: MissionData, settings: MissionSettings): MissionAlert[] {
  const items: MissionAlert[] = [];

  if (data.sensors.temperature >= settings.temperatureLimit + 8) {
    items.push({
      id: `temp-critical-${data.updatedAt}`,
      title: "Temperatura crítica",
      message: `Temperatura em ${data.sensors.temperature}°C com risco térmico alto.`,
      severity: "critical",
      subsystem: "thermal",
      recommendation: "Reduzir carga térmica e iniciar dissipação forçada.",
      createdAt: new Date().toISOString()
    });
  } else if (data.sensors.temperature >= settings.temperatureLimit) {
    items.push({
      id: `temp-high-${data.updatedAt}`,
      title: "Temperatura alta",
      message: `Temperatura em ${data.sensors.temperature}°C acima do limite ${settings.temperatureLimit}°C.`,
      severity: "high",
      subsystem: "thermal",
      recommendation: "Rebalancear subsistemas e aumentar monitoramento térmico.",
      createdAt: new Date().toISOString()
    });
  }

  if (data.energy.battery <= settings.batteryLimit - 10) {
    items.push({
      id: `battery-critical-${data.updatedAt}`,
      title: "Energia crítica",
      message: `Bateria em ${data.energy.battery}% exige ação imediata.`,
      severity: "critical",
      subsystem: "energy",
      recommendation: "Ativar modo de economia e priorizar sistemas essenciais.",
      createdAt: new Date().toISOString()
    });
  } else if (data.energy.battery <= settings.batteryLimit) {
    items.push({
      id: `battery-medium-${data.updatedAt}`,
      title: "Energia baixa",
      message: `Bateria em ${data.energy.battery}% abaixo do limite ${settings.batteryLimit}%.`,
      severity: "medium",
      subsystem: "energy",
      recommendation: "Ajustar consumo e redistribuir carga operacional.",
      createdAt: new Date().toISOString()
    });
  }

  if (data.communication.signalStrength <= settings.signalLimit - 15) {
    items.push({
      id: `signal-critical-${data.updatedAt}`,
      title: "Perda de sinal crítica",
      message: `Sinal em ${data.communication.signalStrength}% com risco de blackout.`,
      severity: "critical",
      subsystem: "comms",
      recommendation: "Comutar para canal redundante e recalibrar antena.",
      createdAt: new Date().toISOString()
    });
  } else if (data.communication.signalStrength <= settings.signalLimit) {
    items.push({
      id: `signal-high-${data.updatedAt}`,
      title: "Falha de sinal",
      message: `Sinal em ${data.communication.signalStrength}% abaixo do limite ${settings.signalLimit}%.`,
      severity: "high",
      subsystem: "comms",
      recommendation: "Verificar latência uplink e otimizar potência do transmissor.",
      createdAt: new Date().toISOString()
    });
  }

  if (data.orbital.stability <= settings.orbitalLimit - 10) {
    items.push({
      id: `orbital-critical-${data.updatedAt}`,
      title: "Instabilidade orbital crítica",
      message: `Estabilidade orbital em ${data.orbital.stability}% e drift ${data.orbital.drift}°.`,
      severity: "critical",
      subsystem: "orbital",
      recommendation: "Executar correção orbital imediata com thrusters primários.",
      createdAt: new Date().toISOString()
    });
  } else if (data.orbital.stability <= settings.orbitalLimit) {
    items.push({
      id: `orbital-low-${data.updatedAt}`,
      title: "Instabilidade orbital",
      message: `Estabilidade orbital em ${data.orbital.stability}% abaixo do limite ${settings.orbitalLimit}%.`,
      severity: "low",
      subsystem: "orbital",
      recommendation: "Monitorar drift e preparar manobra corretiva preventiva.",
      createdAt: new Date().toISOString()
    });
  }

  return items;
}
