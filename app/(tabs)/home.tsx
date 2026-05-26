import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Card, StatCard } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function HomeScreen() {
  const { data, alerts, apod, loadingApod, refreshTelemetry, interpretation, interpretationError, loadingInterpretation, refreshInterpretation } = useMission();
  const router = useRouter();

  return (
    <Screen>
      <SectionTitle title="Mission Control" subtitle={`${data.missionName} | ${data.orbit}`} />

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={refreshTelemetry}>
          <Text style={styles.buttonText}>Atualizar Telemetria</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={() => router.push("/mission-history")}>
          <Text style={styles.buttonText}>Histórico</Text>
        </Pressable>
      </View>

      <StatCard label="Alertas Ativos" value={String(alerts.length)} helper="Monitoramento automático" tone={alerts.length > 0 ? "red" : "blue"} />
      <StatCard label="Energia" value={`${data.energy.battery}%`} helper="Bateria atual" tone={data.energy.battery < 30 ? "red" : "blue"} />
      <StatCard label="Temperatura" value={`${data.sensors.temperature}°C`} helper="Módulo térmico" tone={data.sensors.temperature > 78 ? "red" : "blue"} />
      <StatCard label="Sinal" value={`${data.communication.signalStrength}%`} helper="Canal uplink" tone={data.communication.signalStrength < 45 ? "red" : "blue"} />
      <StatCard label="Estabilidade Orbital" value={`${data.orbital.stability}%`} helper={`Drift ${data.orbital.drift}°`} tone={data.orbital.stability < 74 ? "red" : "blue"} />

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

      <Card title="Interpretação Inteligente da Missão">
        <Pressable style={[styles.button, styles.aiButton, loadingInterpretation ? styles.buttonDisabled : undefined]} onPress={refreshInterpretation} disabled={loadingInterpretation}>
          <Text style={styles.buttonText}>{loadingInterpretation ? "Analisando..." : "Gerar Interpretação"}</Text>
        </Pressable>
        <Text style={[styles.description, interpretationError ? styles.errorText : undefined]}>
          {interpretationError ?? interpretation ?? "Configure um provedor IA na tela de Configurações para gerar análise operacional."}
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginBottom: 12 },
  button: {
    backgroundColor: theme.colors.accentRed,
    borderRadius: 12,
    paddingVertical: 11,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  secondary: { backgroundColor: theme.colors.accentBlue },
  aiButton: { marginBottom: 10 },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: theme.colors.textPrimary, fontWeight: "700", fontSize: 13 },
  muted: { color: theme.colors.textMuted, fontSize: 12 },
  title: { color: theme.colors.textPrimary, fontWeight: "700", marginBottom: 2 },
  description: { color: theme.colors.textMuted, fontSize: 12, marginTop: 6 },
  errorText: { color: theme.colors.warning }
});
