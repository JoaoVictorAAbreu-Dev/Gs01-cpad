import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  title: { color: theme.colors.textPrimary, fontSize: 24, fontWeight: "800" },
  subtitle: { color: theme.colors.textMuted, marginTop: 4, fontSize: 13 }
});