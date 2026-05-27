import { AlertCard } from "@/components/AlertCard";
import { DashboardSection } from "@/components/DashboardSection";
import { Screen } from "@/components/Screen";
import { useMission } from "@/hooks/useMission";

export default function AlertsScreen() {
  const { alerts } = useMission();

  return (
    <Screen>
      <DashboardSection title="Alertas Operacionais" subtitle="Severidade, subsistema e ação recomendada">
        {alerts.length === 0 ? <AlertCard alert={{ id: "nominal", title: "Sistema nominal", message: "Nenhum evento crítico detectado.", severity: "low", subsystem: "orbital", recommendation: "Manter rotina de monitoramento.", createdAt: new Date().toISOString() }} /> : null}
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </DashboardSection>
    </Screen>
  );
}

