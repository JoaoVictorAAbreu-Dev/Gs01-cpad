import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export function StatCard({ label, value, helper, tone = "blue" }: { label: string; value: string; helper?: string; tone?: "blue" | "red" }) {
  return (
    <View style={[styles.card, tone === "red" ? styles.redBorder : styles.blueBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </View>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 12
  },
  blueBorder: { borderLeftWidth: 4, borderLeftColor: theme.colors.accentBlue },
  redBorder: { borderLeftWidth: 4, borderLeftColor: theme.colors.accentRed },
  label: { color: theme.colors.textMuted, fontSize: 12 },
  value: { color: theme.colors.textPrimary, fontSize: 24, fontWeight: "800", marginTop: 2 },
  helper: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  cardTitle: { color: theme.colors.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 10 }
});