import { Card } from "@/components/ui/card";

export function ParentAdviceCard({ text }: { text: string }) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        Uyda yordam
      </p>
      <p className="text-base leading-7">{text}</p>
    </Card>
  );
}
