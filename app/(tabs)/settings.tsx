import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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

export default function SettingsScreen() {
  const { settings, updateSettings } = useMission();
  const [temperatureLimit, setTemperatureLimit] = useState(String(settings.temperatureLimit));
  const [batteryLimit, setBatteryLimit] = useState(String(settings.batteryLimit));
  const [signalLimit, setSignalLimit] = useState(String(settings.signalLimit));
  const [apodKey, setApodKey] = useState(settings.apodKey);
  const [apodEnabled, setApodEnabled] = useState(settings.apodEnabled);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function handleSave() {
    const t = toNumber(temperatureLimit);
    const b = toNumber(batteryLimit);
    const s = toNumber(signalLimit);

    if (t === null || b === null || s === null) {
      setError("Preencha limites válidos.");
      setSuccess("");
      return;
    }
    if (t < 10 || t > 120 || b < 1 || b > 99 || s < 1 || s > 99) {
      setError("Valores fora do intervalo permitido.");
      setSuccess("");
      return;
    }

    const payload: MissionSettings = {
      temperatureLimit: t,
      batteryLimit: b,
      signalLimit: s,
      apodEnabled,
      apodKey: apodKey.trim() || "DEMO_KEY"
    };

    await updateSettings(payload);
    setError("");
    setSuccess("Configurações salvas.");
  }

  return (
    <Screen>
      <SectionTitle title="Configurações" subtitle="Limites de alerta e preferências" />
      <Card title="Regras de Alerta">
        <SettingsInput label="Limite de Temperatura (°C)" value={temperatureLimit} onChangeText={setTemperatureLimit} />
        <SettingsInput label="Limite de Bateria (%)" value={batteryLimit} onChangeText={setBatteryLimit} />
        <SettingsInput label="Limite de Sinal (%)" value={signalLimit} onChangeText={setSignalLimit} />
      </Card>

      <Card title="NASA APOD">
        <SettingsToggle label="Ativar APOD" value={apodEnabled} onChange={setApodEnabled} />
        <SettingsInput label="NASA API Key" value={apodKey} onChangeText={setApodKey} keyboardType="default" />
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
  success: { color: theme.colors.success, marginBottom: 6 }
});