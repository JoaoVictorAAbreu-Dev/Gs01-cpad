import { Card, StatCard } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function EnergyScreen() {
  const { data, history } = useMission();
  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <SectionTitle title="Energia" subtitle="Produção solar, consumo e bateria" />
      <StatCard label="Bateria" value={`${data.energy.battery}%`} tone={data.energy.battery < 30 ? "red" : "blue"} />
      <Card title="Tendência de Bateria">
        <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.battery)} color={theme.colors.accentRed} />
      </Card>
      <Card title="Métricas Atuais">
        <StatCard label="Produção Solar" value={`${data.energy.solarOutput} kW`} />
        <StatCard label="Consumo" value={`${data.energy.consumption} kW`} tone={data.energy.consumption > data.energy.solarOutput ? "red" : "blue"} />
      </Card>
    </Screen>
  );
}
