import { StyleSheet, Text, View } from "react-native";
import { MissionAlert } from "@/types/mission";
import { theme } from "@/utils/theme";

export function AlertItem({ alert }: { alert: MissionAlert }) {
  return (
    <View style={[styles.card, alert.severity === "high" ? styles.high : styles.medium]}>
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.message}>{alert.message}</Text>
      <Text style={styles.time}>{new Date(alert.createdAt).toLocaleTimeString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 12, marginBottom: 10, backgroundColor: theme.colors.bgCard },
  high: { borderColor: theme.colors.accentRed },
  medium: { borderColor: theme.colors.warning },
  title: { color: theme.colors.textPrimary, fontWeight: "700", marginBottom: 4 },
  message: { color: theme.colors.textMuted, fontSize: 12 },
  time: { color: theme.colors.textMuted, fontSize: 11, marginTop: 6 }
});