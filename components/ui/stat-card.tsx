import { Card } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string | number;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <Card className="space-y-3">
      <p className="text-sm text-muted">{label}</p>
      <p className="text-3xl font-semibold">{value}</p>
      <p className="text-sm leading-7 text-muted">{description}</p>
    </Card>
  );
}
