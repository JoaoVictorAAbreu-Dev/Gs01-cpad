import { StyleSheet, Text, View } from "react-native";
import { theme } from "@/utils/theme";

export function MiniBarChart({
  items,
  max,
  unit,
  color = theme.colors.accentBlue
}: {
  items: { label: string; value: number }[];
  max: number;
  unit: string;
  color?: string;
}) {
  return (
    <View style={styles.wrap}>
      {items.map((item) => {
        const width = Math.min(100, Math.max(2, (item.value / max) * 100));
        return (
          <View style={styles.row} key={item.label}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.track}>
              <View style={[styles.bar, { width: `${width}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{item.value.toFixed(1)}{unit}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  label: { color: theme.colors.textMuted, width: 76, fontSize: 12 },
  track: { flex: 1, height: 8, borderRadius: 999, backgroundColor: theme.colors.bgSoft, overflow: "hidden" },
  bar: { height: 8, borderRadius: 999 },
  value: { color: theme.colors.textPrimary, width: 58, textAlign: "right", fontSize: 12 }
});