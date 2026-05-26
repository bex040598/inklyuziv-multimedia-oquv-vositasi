import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-medium text-[var(--muted)]">{label}</p>
      <p className="text-4xl font-semibold tracking-tight">{value}</p>
      <p className="text-base leading-7 text-[var(--muted)]">{description}</p>
    </Card>
  );
}
