import { Card } from "@/components/ui/card";

type StudentInsightCardProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function StudentInsightCard({ title, description, eyebrow }: StudentInsightCardProps) {
  return (
    <Card className="space-y-3">
      {eyebrow ? <p className="text-sm font-semibold text-[var(--muted)]">{eyebrow}</p> : null}
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-base leading-7 text-[var(--muted)]">{description}</p>
    </Card>
  );
}
