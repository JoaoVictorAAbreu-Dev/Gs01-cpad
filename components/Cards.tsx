import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "@/utils/theme";

export function StatCard({ label, value, helper, tone = "blue" }: { label: string; value: string; helper?: string; tone?: "blue" | "red" }) {
  return (
    <Animated.View entering={FadeInDown.duration(360)} style={[styles.card, tone === "red" ? styles.redBorder : styles.blueBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {helper ? <Text style={styles.helper}>{helper}</Text> : null}
    </Animated.View>
  );
}

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Animated.View entering={FadeInDown.duration(320)} style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3
  },
  blueBorder: { borderLeftWidth: 4, borderLeftColor: theme.colors.accentBlue },
  redBorder: { borderLeftWidth: 4, borderLeftColor: theme.colors.accentRed },
  label: { color: theme.colors.textMuted, fontSize: 12 },
  value: { color: theme.colors.textPrimary, fontSize: 24, fontWeight: "800", marginTop: 2 },
  helper: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  cardTitle: { color: theme.colors.textPrimary, fontWeight: "700", fontSize: 15, marginBottom: 12 }
});
