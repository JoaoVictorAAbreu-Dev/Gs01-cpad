import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { theme } from "@/utils/theme";

const width = Dimensions.get("window").width - 56;

export function TelemetryLineChart({
  labels,
  values,
  color = theme.colors.accentBlue
}: {
  labels: string[];
  values: number[];
  color?: string;
}) {
  return (
    <View style={styles.wrap}>
      <LineChart
        data={{ labels, datasets: [{ data: values }] }}
        width={width}
        height={190}
        withInnerLines
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLabels
        fromZero={false}
        chartConfig={{
          backgroundGradientFrom: theme.colors.bgCard,
          backgroundGradientTo: theme.colors.bgCard,
          decimalPlaces: 1,
          color: () => color,
          labelColor: () => theme.colors.textMuted,
          propsForDots: { r: "3", strokeWidth: "1", stroke: color }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderRadius: 12, overflow: "hidden" },
  chart: { marginLeft: -18, borderRadius: 12 }
});
