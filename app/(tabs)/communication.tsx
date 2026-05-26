import { Card, StatCard } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function CommunicationScreen() {
  const { data, history } = useMission();
  const labels = history.slice(-6).map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <SectionTitle title="Comunicação" subtitle="Latência, sinal e perda de pacotes" />
      <StatCard label="Sinal" value={`${data.communication.signalStrength}%`} tone={data.communication.signalStrength < 45 ? "red" : "blue"} />
      <Card title="Tendência de Sinal">
        <TelemetryLineChart labels={labels} values={history.slice(-6).map((item) => item.signal)} color={theme.colors.warning} />
      </Card>
      <Card title="Canal Atual">
        <StatCard label="Latência" value={`${data.communication.latency} ms`} tone={data.communication.latency > 600 ? "red" : "blue"} />
        <StatCard label="Perda de Pacotes" value={`${data.communication.packetLoss}%`} tone={data.communication.packetLoss > 3.8 ? "red" : "blue"} />
      </Card>
    </Screen>
  );
}
