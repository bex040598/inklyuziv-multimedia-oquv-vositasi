import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EmptyState({ title, description, ctaHref, ctaLabel }: EmptyStateProps) {
  return (
    <Card className="border-dashed text-center">
      <div className="mx-auto max-w-xl space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Hozircha bo‘sh
        </p>
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm leading-7 text-muted">{description}</p>
        {ctaHref && ctaLabel ? (
          <Link href={ctaHref} className="inline-flex">
            <Button variant="secondary">{ctaLabel}</Button>
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
