import { StyleSheet, Text, View } from "react-native";
import { MissionAlert } from "@/types/mission";
import { theme } from "@/utils/theme";
import { StatusBadge } from "@/components/StatusBadge";

const subsystemLabel: Record<MissionAlert["subsystem"], string> = {
  thermal: "Thermal",
  energy: "Energy",
  comms: "Comms",
  orbital: "Orbital"
};

export function AlertItem({ alert }: { alert: MissionAlert }) {
  return (
    <View style={[styles.card, alert.severity === "critical" ? styles.critical : alert.severity === "high" ? styles.high : alert.severity === "medium" ? styles.medium : styles.low]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{alert.title}</Text>
        <StatusBadge label={alert.severity.toUpperCase()} severity={alert.severity} />
      </View>
      <Text style={styles.meta}>Subsystem: {subsystemLabel[alert.subsystem]} | {new Date(alert.createdAt).toLocaleString()}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      <Text style={styles.reco}>Ação recomendada: {alert.recommendation}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 10, backgroundColor: theme.colors.bgCard },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  critical: { borderColor: "#ff365e" },
  high: { borderColor: theme.colors.accentRed },
  medium: { borderColor: theme.colors.warning },
  low: { borderColor: theme.colors.accentBlue },
  title: { color: theme.colors.textPrimary, fontWeight: "700", flex: 1, marginRight: 8 },
  meta: { color: theme.colors.textMuted, fontSize: 11, marginBottom: 5 },
  message: { color: theme.colors.textMuted, fontSize: 12 },
  reco: { color: theme.colors.textPrimary, fontSize: 12, marginTop: 8 }
});
