import Link from "next/link";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getParentDashboardData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type ParentDashboardData = Awaited<ReturnType<typeof getParentDashboardData>>;

export function ParentDashboard({ data }: { data: ParentDashboardData }) {
  if (!data.child || !data.stats) {
    return (
      <EmptyState
        title="Farzand bilan bog‘lanish topilmadi"
        description="Ro‘yxatdan o‘tishda farzand emailini kiriting yoki admin orqali bog‘lashni amalga oshiring."
      />
    );
  }

  const totalLessons = data.child.progressEntries.length || 1;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Farzand"
          value={data.child.name}
          description="Kuzatuv olib borilayotgan o‘quvchi."
        />
        <StatCard
          label="Tugallangan darslar"
          value={data.stats.completedLessons}
          description="Farzandingiz yakunlagan darslar soni."
        />
        <StatCard
          label="O‘rtacha natija"
          value={`${data.stats.averageScore}%`}
          description="Quiz natijalari bo‘yicha umumiy o‘rtacha."
        />
        <StatCard
          label="Oxirgi faollik"
          value={formatDate(data.stats.recentActivity)}
          description="So‘nggi kirish yoki test vaqti."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Qisqa hisobot
              </p>
              <h3 className="text-2xl font-semibold">Farzand rivojlanishi</h3>
            </div>
            <Link href="/reports" className="text-sm font-semibold text-accent">
              To‘liq hisobot
            </Link>
          </div>

          <ProgressBar
            value={Math.round((data.stats.completedLessons / totalLessons) * 100)}
            label="Darslarni tugallash ko‘rsatkichi"
          />

          <p className="rounded-2xl border border-border bg-white/80 p-4 text-sm leading-7 text-muted">
            {data.stats.reportSummary}
          </p>

          <div className="space-y-3">
            {data.child.progressEntries.slice(0, 5).map((progress) => (
              <div key={progress.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{progress.lesson.title}</p>
                    <p className="text-xs text-muted">{progress.lesson.course.title}</p>
                  </div>
                  <StatusBadge tone={progress.completed ? "success" : "warning"}>
                    {progress.completed ? "Tugallangan" : "Davom etmoqda"}
                  </StatusBadge>
                </div>
                <p className="mt-2 text-xs text-muted">Oxirgi faollik: {formatDate(progress.lastOpenedAt)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            So‘nggi testlar
          </p>
          <h3 className="text-2xl font-semibold">Natijalar va qo‘llab-quvvatlash</h3>
          <div className="space-y-3">
            {data.child.quizAttempts.slice(0, 6).map((attempt) => (
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
