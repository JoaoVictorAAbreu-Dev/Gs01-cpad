import { Card, StatCard } from "@/components/Cards";
import { DashboardSection } from "@/components/DashboardSection";
import { Screen } from "@/components/Screen";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function EnergyScreen() {
  const { data, history } = useMission();
  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <DashboardSection title="Subsystem: Energia" subtitle="Power generation and battery health">
        <StatCard label="Bateria Principal" value={`${data.energy.battery}%`} helper="Reserva operacional" tone={data.energy.battery < 30 ? "red" : "blue"} />
        <Card title="Histórico de Bateria">
          <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.battery)} color={theme.colors.accentRed} />
        </Card>
        <Card title="Painel de Potência">
          <StatCard label="Produção Solar" value={`${data.energy.solarOutput} kWh`} />
          <StatCard label="Consumo Total" value={`${data.energy.consumption} kWh`} tone={data.energy.consumption > data.energy.solarOutput ? "red" : "blue"} />
        </Card>
      </DashboardSection>
    </Screen>
  );
}
