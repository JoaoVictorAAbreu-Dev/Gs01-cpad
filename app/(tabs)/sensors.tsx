import { Card, StatCard } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";

export default function SensorsScreen() {
  const { data, history } = useMission();

  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <SectionTitle title="Sensores" subtitle="Monitoramento térmico, pressão e radiação" />
      <StatCard label="Temperatura" value={`${data.sensors.temperature}°C`} tone={data.sensors.temperature > 80 ? "red" : "blue"} />
      <Card title="Gráfico de Temperatura">
        <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.temperature)} />
      </Card>
      <Card title="Leituras Atuais">
        <StatCard label="Pressão" value={`${data.sensors.pressure} kPa`} />
        <StatCard label="Radiação" value={`${data.sensors.radiation} mSv`} tone={data.sensors.radiation > 3.5 ? "red" : "blue"} />
      </Card>
    </Screen>
  );
}
