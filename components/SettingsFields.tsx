import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { theme } from "@/utils/theme";

export function SettingsInput({
  label,
  value,
  onChangeText,
  keyboardType = "numeric",
  error,
  placeholder,
  secureTextEntry = false
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "numeric";
  error?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
}) {
  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={[styles.input, error ? styles.inputError : undefined]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export function SettingsToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (next: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={styles.label}>{label}</Text>
      <Switch value={value} onValueChange={onChange} trackColor={{ true: theme.colors.accentRed }} />
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 12 },
  label: { color: theme.colors.textPrimary, fontSize: 13, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 44,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.bgSoft
  },
  inputError: { borderColor: theme.colors.accentRed },
  error: { color: theme.colors.accentRed, marginTop: 4, fontSize: 11 },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: theme.colors.bgSoft,
    marginBottom: 12
  }
});
