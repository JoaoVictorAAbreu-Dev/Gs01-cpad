import { StyleSheet, Text, View } from "react-native";
import { AlertItem } from "@/components/AlertItem";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function AlertsScreen() {
  const { alerts } = useMission();

  return (
    <Screen>
      <SectionTitle title="Alertas" subtitle="Histórico por severidade: baixo, médio, alto e crítico" />
      {alerts.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Tudo estável</Text>
          <Text style={styles.emptyText}>Nenhum alerta crítico no momento.</Text>
        </View>
      ) : null}
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  emptyBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.bgCard,
    padding: 14,
    marginBottom: 10
  },
  emptyTitle: { color: theme.colors.success, fontWeight: "700", marginBottom: 2 },
  emptyText: { color: theme.colors.textMuted, fontSize: 12 }
});
