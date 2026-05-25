import Link from "next/link";

import { PrintButton } from "@/components/reports/print-button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { getReportData } from "@/lib/data";
import { average, formatDate } from "@/lib/utils";

type ReportData = Awaited<ReturnType<typeof getReportData>>;

export function ReportView({ data }: { data: ReportData }) {
  if (!data.activeStudent) {
    return (
      <EmptyState
        title="Hisobot uchun o‘quvchi topilmadi"
        description="Avval o‘quvchi qo‘shing yoki demo seed ma’lumotlarini yuklang."
      />
    );
  }

  const completedLessons = data.activeStudent.progressEntries.filter((progress) => progress.completed).length;
  const totalEntries = data.activeStudent.progressEntries.length || 1;
  const averageScore = average(data.activeStudent.quizAttempts.map((attempt) => attempt.score));

  return (
    <div className="space-y-8">
      <section className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Hisobot sahifasi
          </p>
          <h2 className="text-4xl font-semibold">{data.activeStudent.name} uchun progress hisoboti</h2>
          <p className="text-sm leading-7 text-muted">
            Testlar, darslar, o‘qituvchi izohlari va umumiy o‘sish ko‘rsatkichlari.
          </p>
        </div>
        <PrintButton />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            O‘quvchi ko‘rsatkichlari
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted">Tugallangan darslar</p>
              <p className="mt-2 text-3xl font-semibold">{completedLessons}</p>
            </div>
            <div className="rounded-2xl border border-border p-4">
              <p className="text-sm text-muted">O‘rtacha ball</p>
              <p className="mt-2 text-3xl font-semibold">{averageScore}%</p>
            </div>
          </div>
          <ProgressBar value={Math.round((completedLessons / totalEntries) * 100)} label="Yakunlash darajasi" />
          <div className="space-y-3">
            {data.activeStudent.progressEntries.map((progress) => (
              <div key={progress.id} className="rounded-2xl border border-border bg-white/75 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{progress.lesson.title}</p>
                    <p className="text-xs text-muted">{progress.lesson.course.title}</p>
                  </div>
                  <StatusBadge tone={progress.completed ? "success" : "warning"}>
                    {progress.completed ? "Tugallangan" : "Davom etmoqda"}
                  </StatusBadge>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted">
                  <p>Kuchli tomonlar: {progress.strengths || "Hali yozilmagan"}</p>
                  <p>Yaxshilanish yo‘nalishi: {progress.improvementAreas || "Hali yozilmagan"}</p>
                  <p>O‘qituvchi izohi: {progress.teacherComment || "Hali yozilmagan"}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Darslar statistikasi
              </p>
              <h3 className="text-2xl font-semibold">Barcha darslar bo‘yicha ko‘rsatkichlar</h3>
            </div>
            <Link href="/dashboard" className="text-sm font-semibold text-accent">
              Dashboardga qaytish
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="px-2 py-3 font-medium">Dars</th>
                  <th className="px-2 py-3 font-medium">Kurs</th>
                  <th className="px-2 py-3 font-medium">Tugallash</th>
                  <th className="px-2 py-3 font-medium">O‘rtacha test</th>
                </tr>
              </thead>
              <tbody>
                {data.lessonStats.map((lesson) => (
                  <tr key={lesson.id} className="border-b border-border/70">
                    <td className="px-2 py-4">{lesson.title}</td>
                    <td className="px-2 py-4 text-muted">{lesson.courseTitle}</td>
                    <td className="px-2 py-4">{lesson.completionCount} ta</td>
                    <td className="px-2 py-4">{lesson.averageScore}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold">Test natijalari jadvali</p>
            {data.activeStudent.quizAttempts.map((attempt) => (
              <div key={attempt.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{attempt.quiz.lesson.title}</p>
                    <p className="text-xs text-muted">{formatDate(attempt.createdAt)}</p>
                  </div>
                  <StatusBadge tone={attempt.score >= 70 ? "success" : "warning"}>
                    {attempt.score}%
                  </StatusBadge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
