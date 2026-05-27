import { StatCard } from "@/components/Cards";

export function MetricCard({ label, value, helper, tone = "blue" }: { label: string; value: string; helper?: string; tone?: "blue" | "red" }) {
  return <StatCard label={label} value={value} helper={helper} tone={tone} />;
}
