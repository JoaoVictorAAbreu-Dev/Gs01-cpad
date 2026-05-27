import { Card, StatCard } from "@/components/Cards";
import { DashboardSection } from "@/components/DashboardSection";
import { Screen } from "@/components/Screen";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";

export default function SensorsScreen() {
  const { data, history } = useMission();

  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <DashboardSection title="Subsystem: Sensores" subtitle="Telemetry feed térmico e radiométrico">
        <StatCard label="Temperatura do Módulo" value={`${data.sensors.temperature} °C`} helper="Faixa operacional nominal: 20-75 °C" tone={data.sensors.temperature > 80 ? "red" : "blue"} />
        <Card title="Histórico Térmico (Realtime)">
          <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.temperature)} />
        </Card>
        <Card title="Leituras Técnicas">
          <StatCard label="Pressão Interna" value={`${data.sensors.pressure} kPa`} />
          <StatCard label="Radiação" value={`${data.sensors.radiation} Gy/h`} tone={data.sensors.radiation > 3.5 ? "red" : "blue"} />
          <StatCard label="Oxigênio" value={`${data.sensors.oxygen}%`} />
        </Card>
      </DashboardSection>
    </Screen>
  );
}
