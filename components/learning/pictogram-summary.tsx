import { Card } from "@/components/ui/card";
import type { PictogramItem } from "@/types";

type PictogramSummaryProps = {
  items: PictogramItem[];
};

export function PictogramSummary({ items }: PictogramSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.label} className="space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg font-semibold">
            {item.label}
          </div>
          <p className="text-base leading-7 text-[var(--muted)]">{item.description}</p>
        </Card>
      ))}
    </div>
  );
}
