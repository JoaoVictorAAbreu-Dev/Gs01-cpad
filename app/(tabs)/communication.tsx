import { Card, StatCard } from "@/components/Cards";
import { MiniBarChart } from "@/components/MiniBarChart";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function CommunicationScreen() {
  const { data } = useMission();

  return (
    <Screen>
      <SectionTitle title="Comunicação" subtitle="Sinal, latência e perda de pacote" />
      <StatCard label="Sinal" value={`${data.communication.signalStrength}%`} tone={data.communication.signalStrength < 45 ? "red" : "blue"} />
      <Card title="Canal de Comunicação">
        <MiniBarChart
          color={theme.colors.warning}
          max={100}
          unit=""
          items={[
            { label: "Sinal", value: data.communication.signalStrength },
            { label: "Latência", value: Math.min(100, data.communication.latency / 8) },
            { label: "Perda", value: data.communication.packetLoss * 20 }
          ]}
        />
      </Card>
    </Screen>
  );
}