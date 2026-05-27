import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Card } from "@/components/Cards";
import { MetricCard } from "@/components/MetricCard";
import { Screen } from "@/components/Screen";
import { Header } from "@/components/Header";
import { StatusBadge } from "@/components/StatusBadge";
import { useMission } from "@/hooks/useMission";
import { theme } from "@/utils/theme";

export default function HomeScreen() {
  const { data, alerts, apod, loadingApod, refreshTelemetry, interpretation, interpretationError, loadingInterpretation, refreshInterpretation } = useMission();
  const router = useRouter();
  const globalSeverity = alerts.some((a) => a.severity === "critical") ? "critical" : alerts.some((a) => a.severity === "high") ? "high" : alerts.some((a) => a.severity === "medium") ? "medium" : "low";

  return (
    <Screen>
      <Header title="Mission Control Dashboard" subtitle={`${data.missionName} | ${data.orbit} | ${new Date(data.updatedAt).toLocaleTimeString()}`} />
      <View style={styles.badgeRow}>
        <StatusBadge label="MISSION STATUS" severity={globalSeverity} />
        <StatusBadge label={alerts.length ? `${alerts.length} ALERTAS` : "NOMINAL"} severity={globalSeverity} />
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={refreshTelemetry}>
          <Text style={styles.buttonText}>Atualizar Telemetria</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.secondary]} onPress={() => router.push("/mission-history")}>
          <Text style={styles.buttonText}>Histórico</Text>
        </Pressable>
      </View>

      <MetricCard label="Energia" value={`${data.energy.battery}%`} helper={`Produção ${data.energy.solarOutput} kWh | Consumo ${data.energy.consumption} kWh`} tone={data.energy.battery < 30 ? "red" : "blue"} />
      <MetricCard label="Temperatura" value={`${data.sensors.temperature} °C`} helper={`Radiação ${data.sensors.radiation} Gy/h | Pressão ${data.sensors.pressure} kPa`} tone={data.sensors.temperature > 78 ? "red" : "blue"} />
      <MetricCard label="Comunicação" value={`${data.communication.signalStrength} dBm`} helper={`Latência ${data.communication.latency} ms | Perda ${data.communication.packetLoss}%`} tone={data.communication.signalStrength < 45 ? "red" : "blue"} />
      <MetricCard label="Estabilidade Orbital" value={`${data.orbital.stability}%`} helper={`Drift ${data.orbital.drift}°`} tone={data.orbital.stability < 74 ? "red" : "blue"} />

      <Card title="NASA APOD">
        {loadingApod ? <Text style={styles.muted}>Carregando imagem astronômica...</Text> : null}
        {!loadingApod && !apod ? <Text style={styles.muted}>APOD indisponível. Configure a chave NASA API em Configurações.</Text> : null}
        {apod ? (
          <>
            {apod.media_type === "image" ? <Image source={{ uri: apod.url }} style={styles.apodImage} resizeMode="cover" /> : null}
            <Text style={styles.title}>{apod.title}</Text>
            <Text style={styles.muted}>{apod.date}</Text>
            <Text style={styles.description} numberOfLines={4}>{apod.explanation}</Text>
          </>
        ) : null}
      </Card>

      <Card title="Mission AI Analysis">
        <Pressable style={[styles.button, styles.aiButton, loadingInterpretation ? styles.buttonDisabled : undefined]} onPress={refreshInterpretation} disabled={loadingInterpretation}>
          <Text style={styles.buttonText}>{loadingInterpretation ? "Analisando..." : "Gerar Análise"}</Text>
        </Pressable>
        <Text style={[styles.description, interpretationError ? styles.errorText : undefined]}>
          {interpretationError ?? interpretation ?? "Configure um provedor IA e API Key para gerar recomendação operacional inteligente."}
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  badgeRow: { flexDirection: "row", gap: 8, marginBottom: 10 },
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
  title: { color: theme.colors.textPrimary, fontWeight: "700", marginBottom: 2, marginTop: 8 },
  description: { color: theme.colors.textMuted, fontSize: 12, marginTop: 6 },
  errorText: { color: theme.colors.warning },
  apodImage: { width: "100%", height: 160, borderRadius: 10, borderWidth: 1, borderColor: theme.colors.border }
});
