import { Image, StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/utils/theme";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  home: "planet",
  sensors: "speedometer",
  energy: "flash",
  communication: "radio",
  alerts: "warning",
  settings: "settings"
};

function HeaderBrand() {
  return (
    <View style={styles.brandWrap}>
      <Image source={require("@/assets/logo.png")} style={styles.brandLogo} resizeMode="contain" />
      <Text style={styles.brandText}>Space Predictive Analytics</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: theme.colors.bgCard },
        headerTintColor: theme.colors.textPrimary,
        headerShadowVisible: false,
        headerTitle: () => <HeaderBrand />,
        headerTitleAlign: "left",
        tabBarStyle: {
          backgroundColor: theme.colors.bgCard,
          borderTopColor: theme.colors.border,
          height: 66,
          paddingTop: 6,
          paddingBottom: 8
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarActiveTintColor: theme.colors.accentRed,
        tabBarInactiveTintColor: theme.colors.textMuted,
        sceneStyle: { backgroundColor: theme.colors.bgPrimary },
        tabBarIcon: ({ color, size }) => <Ionicons name={iconMap[route.name] || "ellipse"} size={size} color={color} />
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="sensors" options={{ title: "Sensores" }} />
      <Tabs.Screen name="energy" options={{ title: "Energia" }} />
      <Tabs.Screen name="communication" options={{ title: "Comms" }} />
      <Tabs.Screen name="alerts" options={{ title: "Alertas" }} />
      <Tabs.Screen name="settings" options={{ title: "Config" }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  brandWrap: { flexDirection: "row", alignItems: "center", width: "100%" },
  brandLogo: { width: 34, height: 34, marginRight: 8 },
  brandText: { color: theme.colors.textPrimary, fontSize: 14, fontWeight: "700" }
});
