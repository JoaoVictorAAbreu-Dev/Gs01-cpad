import { StyleSheet, Text, View } from "react-native";
import { MissionAlert } from "@/types/mission";
import { theme } from "@/utils/theme";

export function AlertItem({ alert }: { alert: MissionAlert }) {
  const tone = alert.severity;
  return (
    <View style={[styles.card, tone === "critical" ? styles.critical : tone === "high" ? styles.high : tone === "medium" ? styles.medium : styles.low]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.badge}>{tone.toUpperCase()}</Text>
      </View>
      <Text style={styles.message}>{alert.message}</Text>
      <Text style={styles.time}>{new Date(alert.createdAt).toLocaleTimeString()}</Text>
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
  title: { color: theme.colors.textPrimary, fontWeight: "700" },
  message: { color: theme.colors.textMuted, fontSize: 12 },
  time: { color: theme.colors.textMuted, fontSize: 11, marginTop: 6 },
  badge: { color: theme.colors.textPrimary, fontSize: 10, fontWeight: "700", backgroundColor: theme.colors.bgSoft, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 }
});
