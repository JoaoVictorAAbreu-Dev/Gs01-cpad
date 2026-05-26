import { Text } from "react-native";
import { AlertItem } from "@/components/AlertItem";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function AlertsScreen() {
  const { alerts } = useMission();

  return (
    <Screen>
      <SectionTitle title="Alertas" subtitle="Detecção automática de anomalias" />
      {alerts.length === 0 ? <Text style={{ color: theme.colors.success }}>Nenhum alerta ativo.</Text> : null}
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </Screen>
  );
}