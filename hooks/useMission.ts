import { useMissionContext } from "@/context/MissionContext";

export function useMission() {
  return useMissionContext();
}