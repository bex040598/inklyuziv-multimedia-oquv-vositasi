import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-3xl space-y-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Topilmadi</p>
      <h1 className="text-4xl font-semibold">Bu sahifani topa olmadik</h1>
      <p className="text-lg leading-8 text-[var(--muted)]">
        Havola eskirgan bo‘lishi mumkin. Bosh sahifaga qaytsangiz, kerakli darsni yana topib olamiz.
      </p>
      <Link href="/" className="inline-flex">
        <Button>Bosh sahifaga qaytish</Button>
      </Link>
    </Card>
  );
}
