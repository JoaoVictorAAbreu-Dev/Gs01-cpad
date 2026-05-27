import { Image, StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export function MissionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.colors.bgCard,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 12
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 54, height: 54 },
  title: { color: theme.colors.textPrimary, fontSize: 17, fontWeight: "800" },
  subtitle: { color: theme.colors.textMuted, fontSize: 12, marginTop: 2 }
});
