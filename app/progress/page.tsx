import Link from "next/link";
import { Role } from "@prisma/client";

import { ProgressMap } from "@/components/learning/progress-map";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProgressPage() {
  const user = await requireUser();

  if (user.role !== Role.STUDENT) {
    return (
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Rivojlanish xaritasi</h1>
        <p className="text-base leading-7 text-[var(--muted)]">
          Bu sahifa asosan o‘quvchi uchun mo‘ljallangan. Ota-ona va o‘qituvchi uchun shu ma’lumotlar hisobot sahifasida jamlangan.
        </p>
        <Link href="/reports" className="inline-flex">
          <Button>Hisobotga o‘tish</Button>
        </Link>
      </Card>
    );
  }

  const data = await getStudentDashboardData(user.id);

  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Rivojlanish xaritasi
        </p>
        <h1 className="text-4xl font-semibold">Qaysi yo‘llar osonlashib bormoqda?</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Bu yerda tugallangan darslar, to‘xtab qolgan joylar va o‘qituvchi izohlari bir joyda turadi.
        </p>
      </Card>
      <ProgressMap
        items={data.student.progressEntries.map((entry) => ({
          id: entry.id,
          title: entry.lesson.title,
          description: entry.lesson.course.title,
          href: `/lessons/${entry.lessonId}`,
          completed: entry.completed,
          note: entry.teacherComment ?? entry.learnerFeedback ?? "Qisqa izoh keyinroq paydo bo‘ladi."
        }))}
      />
    </div>
  );
}
