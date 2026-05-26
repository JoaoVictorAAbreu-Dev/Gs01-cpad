import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Card, StatCard } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function HomeScreen() {
  const { data, alerts, apod, loadingApod, refreshTelemetry } = useMission();

  return (
    <Screen>
      <View style={styles.logoWrap}>
        <Image source={require("@/assets/logo.png")} style={styles.logo} resizeMode="contain" />
      </View>
      <SectionTitle title="Mission Control" subtitle={`${data.missionName} | ${data.orbit}`} />
      <Pressable style={styles.button} onPress={refreshTelemetry}>
        <Text style={styles.buttonText}>Atualizar Telemetria</Text>
      </Pressable>

      <StatCard label="Alertas Ativos" value={String(alerts.length)} helper="Regras automáticas" tone={alerts.length > 0 ? "red" : "blue"} />
      <StatCard label="Atualizado" value={new Date(data.updatedAt).toLocaleTimeString()} helper="Simulação em tempo real" />

      <Card title="NASA APOD">
        {loadingApod ? <Text style={styles.muted}>Carregando...</Text> : null}
        {!loadingApod && !apod ? <Text style={styles.muted}>APOD indisponível.</Text> : null}
        {apod ? (
          <>
            <Text style={styles.title}>{apod.title}</Text>
            <Text style={styles.muted}>{apod.date}</Text>
            <Text style={styles.description} numberOfLines={4}>{apod.explanation}</Text>
          </>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logoWrap: { alignItems: "center", marginBottom: 12 },
  logo: { width: 220, height: 90 },
  button: {
    backgroundColor: theme.colors.accentRed,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 12
  },
  buttonText: { color: theme.colors.textPrimary, fontWeight: "700" },
  muted: { color: theme.colors.textMuted, fontSize: 12 },
  title: { color: theme.colors.textPrimary, fontWeight: "700", marginBottom: 2 },
  description: { color: theme.colors.textMuted, fontSize: 12, marginTop: 6 }
});