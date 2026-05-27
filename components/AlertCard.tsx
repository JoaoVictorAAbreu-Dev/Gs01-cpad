import { AlertItem } from "@/components/AlertItem";
import { MissionAlert } from "@/types/mission";

export function AlertCard({ alert }: { alert: MissionAlert }) {
  return <AlertItem alert={alert} />;
}
