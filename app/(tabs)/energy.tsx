import { Card, StatCard } from "@/components/Cards";
import { MiniBarChart } from "@/components/MiniBarChart";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function EnergyScreen() {
  const { data } = useMission();

  return (
    <Screen>
      <SectionTitle title="Energia" subtitle="Bateria, geração solar e consumo" />
      <StatCard label="Bateria" value={`${data.energy.battery}%`} tone={data.energy.battery < 30 ? "red" : "blue"} />
      <Card title="Distribuição">
        <MiniBarChart
          color={theme.colors.accentRed}
          max={10}
          unit="kW"
          items={[
            { label: "Solar", value: data.energy.solarOutput },
            { label: "Consumo", value: data.energy.consumption }
          ]}
        />
      </Card>
    </Screen>
  );
}