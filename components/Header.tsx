import { MissionHeader } from "@/components/MissionHeader";

export function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return <MissionHeader title={title} subtitle={subtitle} />;
}
