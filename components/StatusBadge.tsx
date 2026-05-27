import { StyleSheet, Text, View } from "react-native";
import { AlertSeverity } from "@/types/mission";
import { theme } from "@/utils/theme";

const toneMap: Record<AlertSeverity, { bg: string; text: string }> = {
  low: { bg: "#123A66", text: "#9FC7FF" },
  medium: { bg: "#4B3410", text: theme.colors.warning },
  high: { bg: "#4A0A18", text: theme.colors.accentRed },
  critical: { bg: "#5A0418", text: theme.colors.accentRedGlow }
};

export function StatusBadge({ label, severity }: { label: string; severity: AlertSeverity }) {
  const tone = toneMap[severity];
  return (
    <View style={[styles.badge, { backgroundColor: tone.bg }]}> 
      <Text style={[styles.text, { color: tone.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1, borderColor: theme.colors.border },
  text: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 }
});
