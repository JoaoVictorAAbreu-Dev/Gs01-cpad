import { Card, StatCard } from "@/components/Cards";
import { DashboardSection } from "@/components/DashboardSection";
import { Screen } from "@/components/Screen";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function CommunicationScreen() {
  const { data, history } = useMission();
  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <DashboardSection title="Subsystem: Comunicação" subtitle="Uplink, latência e integridade de pacotes">
        <StatCard label="Signal Strength" value={`${data.communication.signalStrength} dBm`} tone={data.communication.signalStrength < 45 ? "red" : "blue"} />
        <Card title="Histórico de Sinal">
          <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.signal)} color={theme.colors.warning} />
        </Card>
        <Card title="Métricas de Canal">
          <StatCard label="Latência" value={`${data.communication.latency} ms`} tone={data.communication.latency > 600 ? "red" : "blue"} />
          <StatCard label="Packet Loss" value={`${data.communication.packetLoss}%`} tone={data.communication.packetLoss > 3.8 ? "red" : "blue"} />
        </Card>
      </DashboardSection>
    </Screen>
  );
}
