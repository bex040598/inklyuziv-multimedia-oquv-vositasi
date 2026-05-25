import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">404</p>
      <h2 className="mt-3 text-4xl font-semibold">Sahifa topilmadi</h2>
      <p className="mt-4 text-sm leading-7 text-muted">
        Siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko‘chirilgan bo‘lishi mumkin.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button>Bosh sahifaga qaytish</Button>
        </Link>
      </div>
    </Card>
  );
}
