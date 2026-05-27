import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export function DashboardSection({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  title: { color: theme.colors.textPrimary, fontSize: 16, fontWeight: "700" },
  subtitle: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 },
  content: { marginTop: 10 }
});
