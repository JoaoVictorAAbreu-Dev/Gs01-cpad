import { StyleSheet, Text } from "react-native";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { TelemetryLineChart } from "@/components/TelemetryLineChart";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function MissionHistoryScreen() {
  const { history } = useMission();
  const recent = history.slice(-8);
  const labels = recent.map((item) => new Date(item.timestamp).toLocaleTimeString().slice(0, 5));

  return (
    <Screen>
      <SectionTitle title="Histórico da Missão" subtitle="Últimos ciclos de telemetria" />
      {recent.length < 2 ? <Text style={styles.empty}>Aguardando dados de histórico...</Text> : null}
      {recent.length >= 2 ? <TelemetryLineChart labels={labels} values={recent.map((item) => item.stability)} color={theme.colors.accentBlue} /> : null}
      {recent.map((item) => (
        <Text key={item.timestamp} style={styles.row}>
          {new Date(item.timestamp).toLocaleTimeString()} | Temp {item.temperature}°C | Bat {item.battery}% | Sinal {item.signal}% | Orb {item.stability}%
        </Text>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { color: theme.colors.textMuted, marginBottom: 12 },
  row: { color: theme.colors.textPrimary, fontSize: 12, marginTop: 8, borderBottomWidth: 1, borderBottomColor: theme.colors.border, paddingBottom: 8 }
});
