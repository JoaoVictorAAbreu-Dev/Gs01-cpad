import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/Cards";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { SettingsInput, SettingsToggle } from "@/components/SettingsFields";
import { useMission } from "@/hooks/useMission";
import { MissionSettings } from "@/types/mission";
import { theme } from "@/utils/theme";

function toNumber(value: string): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeProvider(value: string): MissionSettings["aiProvider"] {
  const normalized = value.trim().toLowerCase();
  if (normalized === "groq" || normalized === "gemini" || normalized === "none") {
    return normalized;
  }
  return "none";
}

export default function SettingsScreen() {
  const { settings, updateSettings } = useMission();
  const [temperatureLimit, setTemperatureLimit] = useState(String(settings.temperatureLimit));
  const [batteryLimit, setBatteryLimit] = useState(String(settings.batteryLimit));
  const [signalLimit, setSignalLimit] = useState(String(settings.signalLimit));
  const [orbitalLimit, setOrbitalLimit] = useState(String(settings.orbitalLimit));
  const [apodKey, setApodKey] = useState(settings.apodKey);
  const [apodEnabled, setApodEnabled] = useState(settings.apodEnabled);
  const [notificationsEnabled, setNotificationsEnabled] = useState(settings.notificationsEnabled);
  const [aiProvider, setAiProvider] = useState<MissionSettings["aiProvider"]>(settings.aiProvider);
  const [aiApiKey, setAiApiKey] = useState(settings.aiApiKey);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    setTemperatureLimit(String(settings.temperatureLimit));
    setBatteryLimit(String(settings.batteryLimit));
    setSignalLimit(String(settings.signalLimit));
    setOrbitalLimit(String(settings.orbitalLimit));
    setApodKey(settings.apodKey);
    setApodEnabled(settings.apodEnabled);
    setNotificationsEnabled(settings.notificationsEnabled);
    setAiProvider(settings.aiProvider);
    setAiApiKey(settings.aiApiKey);
  }, [settings]);

  async function handleSave() {
    const t = toNumber(temperatureLimit);
    const b = toNumber(batteryLimit);
    const s = toNumber(signalLimit);
    const o = toNumber(orbitalLimit);

    if (t === null || b === null || s === null || o === null) {
      setError("Preencha limites válidos.");
      setSuccess("");
      return;
    }
    if (t < 10 || t > 120 || b < 1 || b > 99 || s < 1 || s > 99 || o < 40 || o > 99) {
      setError("Valores fora do intervalo permitido.");
      setSuccess("");
      return;
    }

    const provider = normalizeProvider(aiProvider);

    const payload: MissionSettings = {
      temperatureLimit: t,
      batteryLimit: b,
      signalLimit: s,
      orbitalLimit: o,
      apodEnabled,
      apodKey: apodKey.trim() || "DEMO_KEY",
      notificationsEnabled,
      aiProvider: provider,
      aiApiKey: aiApiKey.trim()
    };

    await updateSettings(payload);
    setAiProvider(provider);
    setError("");
    setSuccess("Configurações salvas.");
  }

  return (
    <Screen>
      <SectionTitle title="Configurações" subtitle="Limites, notificações e IA" />
      <Card title="Regras de Alerta">
        <SettingsInput label="Limite de Temperatura (°C)" value={temperatureLimit} onChangeText={setTemperatureLimit} placeholder="Ex: 78" />
        <SettingsInput label="Limite de Bateria (%)" value={batteryLimit} onChangeText={setBatteryLimit} placeholder="Ex: 30" />
        <SettingsInput label="Limite de Sinal (%)" value={signalLimit} onChangeText={setSignalLimit} placeholder="Ex: 45" />
        <SettingsInput label="Limite Orbital (%)" value={orbitalLimit} onChangeText={setOrbitalLimit} placeholder="Ex: 74" />
      </Card>

      <Card title="Preferências">
        <SettingsToggle label="Ativar Notificações" value={notificationsEnabled} onChange={setNotificationsEnabled} />
        <SettingsToggle label="Ativar APOD" value={apodEnabled} onChange={setApodEnabled} />
        <SettingsInput label="NASA API Key" value={apodKey} onChangeText={setApodKey} keyboardType="default" placeholder="DEMO_KEY" />

        <Text style={styles.providerLabel}>IA Provider</Text>
        <View style={styles.providerRow}>
          <Pressable style={[styles.providerButton, aiProvider === "none" ? styles.providerActive : undefined]} onPress={() => setAiProvider("none")}>
            <Text style={styles.providerText}>None</Text>
          </Pressable>
          <Pressable style={[styles.providerButton, aiProvider === "groq" ? styles.providerActive : undefined]} onPress={() => setAiProvider("groq")}>
            <Text style={styles.providerText}>Groq</Text>
          </Pressable>
          <Pressable style={[styles.providerButton, aiProvider === "gemini" ? styles.providerActive : undefined]} onPress={() => setAiProvider("gemini")}>
            <Text style={styles.providerText}>Gemini</Text>
          </Pressable>
        </View>

        <SettingsInput label="IA API Key" value={aiApiKey} onChangeText={setAiApiKey} keyboardType="default" placeholder="chave da IA" secureTextEntry />
      </Card>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.accentRed,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8
  },
  buttonText: { color: theme.colors.textPrimary, fontWeight: "700" },
  error: { color: theme.colors.accentRed, marginBottom: 6 },
  success: { color: theme.colors.success, marginBottom: 6 },
  providerLabel: { color: theme.colors.textPrimary, fontSize: 13, marginBottom: 6 },
  providerRow: { flexDirection: "row", gap: 8, marginBottom: 12 },
  providerButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: theme.colors.bgSoft
  },
  providerActive: { borderColor: theme.colors.accentRed, backgroundColor: "#3A1020" },
  providerText: { color: theme.colors.textPrimary, fontSize: 12, fontWeight: "700" }
});
