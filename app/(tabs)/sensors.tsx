import { Card, StatCard } from "@/components/Cards";
import { MiniBarChart } from "@/components/MiniBarChart";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";

export default function SensorsScreen() {
  const { data } = useMission();

  return (
    <Screen>
      <SectionTitle title="Sensores" subtitle="Monitoramento térmico e ambiental" />
      <StatCard label="Temperatura" value={`${data.sensors.temperature}°C`} tone={data.sensors.temperature > 80 ? "red" : "blue"} />
      <Card title="Leituras">
        <MiniBarChart
          max={120}
          unit=""
          items={[
            { label: "Pressão", value: data.sensors.pressure },
            { label: "Oxigênio", value: data.sensors.oxygen },
            { label: "Radiação", value: data.sensors.radiation * 20 }
          ]}
        />
      </Card>
    </Screen>
  );
}