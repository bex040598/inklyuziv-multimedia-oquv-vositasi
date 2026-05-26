import Link from "next/link";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import type { QuizResultPayload } from "@/types";

type QuizResultCarefullyProps = {
  result: QuizResultPayload;
  lessonHref: string;
};

export function QuizResultCarefully({ result, lessonHref }: QuizResultCarefullyProps) {
  return (
    <Card className="space-y-4 border-[var(--accent)] bg-[var(--accent-soft)]/45">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Natija
          </p>
          <h3 className="text-3xl font-semibold">{result.score}%</h3>
        </div>
        <StatusBadge tone={result.score >= 70 ? "success" : "warning"}>
          Bu baho emas, keyingi qadam uchun yordam
        </StatusBadge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="font-semibold">Nima yaxshi chiqdi</p>
          <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
            {result.strengths.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Qaysi joyni yana bir marta ko‘rsak bo‘ladi</p>
          <ul className="space-y-2 text-sm leading-6 text-[var(--muted)]">
            {result.improvementAreas.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rounded-[1.5rem] bg-white/80 p-4">
        <p className="font-semibold">Keyingi eng yengil qadam</p>
        <p className="mt-2 text-base leading-7 text-[var(--muted)]">{result.recommendedNextStep}</p>
      </div>
      <div className="rounded-[1.5rem] border border-dashed border-[var(--border)] p-4">
        <p className="font-semibold">Bu mavzuni boshqa formatda ko‘rish</p>
        <p className="mt-2 text-base leading-7 text-[var(--muted)]">{result.easierReview}</p>
        <Link href={lessonHref} className="mt-3 inline-flex text-sm font-semibold text-[var(--accent)]">
          Darsga qaytish
        </Link>
      </div>
    </Card>
  );
}
