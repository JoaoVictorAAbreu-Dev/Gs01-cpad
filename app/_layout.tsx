import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MissionProvider } from "@/context/MissionContext";
import { theme } from "@/utils/theme";

export default function RootLayout() {
  return (
    <MissionProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="mission-history"
          options={{
            title: "Histórico da Missão",
            headerStyle: { backgroundColor: theme.colors.bgCard },
            headerTintColor: theme.colors.textPrimary
          }}
        />
      </Stack>
    </MissionProvider>
  );
}
