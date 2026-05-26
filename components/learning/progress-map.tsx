import Link from "next/link";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

type ProgressMapProps = {
  items: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    completed: boolean;
    note?: string | null;
  }>;
};

export function ProgressMap({ items }: ProgressMapProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id} className="relative pl-6">
          {index !== items.length - 1 ? (
            <span className="absolute left-2 top-12 h-[calc(100%-1rem)] w-px bg-[var(--border)]" />
          ) : null}
          <span className="absolute left-0 top-7 h-4 w-4 rounded-full bg-[var(--accent)]" />
          <Card className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-base leading-7 text-[var(--muted)]">{item.description}</p>
              </div>
              <StatusBadge tone={item.completed ? "success" : "info"}>
                {item.completed ? "Tugallangan" : "Davom etmoqda"}
              </StatusBadge>
            </div>
            {item.note ? <p className="text-sm leading-6 text-[var(--muted)]">{item.note}</p> : null}
            <Link href={item.href} className="text-sm font-semibold text-[var(--accent)]">
              Ochish
            </Link>
          </Card>
        </div>
      ))}
    </div>
  );
}
