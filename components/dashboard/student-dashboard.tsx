import Link from "next/link";

import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getStudentDashboardData } from "@/lib/data";
import { levelLabels } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

type StudentDashboardData = Awaited<ReturnType<typeof getStudentDashboardData>>;

export function StudentDashboard({ data }: { data: StudentDashboardData }) {
  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Motivatsiya
        </p>
        <h2 className="text-3xl font-semibold">{data.stats.motivation}</h2>
        <p className="text-sm leading-7 text-muted">
          Darslarni izchil davom ettirsangiz, progress hisoboti va test natijalari yanada yaxshilanadi.
        </p>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tugallangan darslar"
          value={data.stats.completedLessons}
          description={`${data.stats.totalLessons} darsdan nechta yakunlanganini ko‘rsatadi.`}
        />
        <StatCard
          label="O‘rtacha test natijasi"
          value={`${data.stats.averageScore}%`}
          description="So‘nggi urinishlar bo‘yicha umumiy o‘rtacha natija."
        />
        <StatCard
          label="Faollik darajasi"
          value={`${data.stats.completionRate}%`}
          description="Kurslar bo‘yicha yakunlash ko‘rsatkichi."
        />
        <StatCard
          label="Oxirgi faollik"
          value={formatDate(data.stats.lastActivity)}
          description="Oxirgi marta qachon dars yoki test bilan ishlangan."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Kurslar
              </p>
              <h3 className="text-2xl font-semibold">Multimedia darslar</h3>
            </div>
            <Link href="/reports" className="text-sm font-semibold text-accent">
              Hisobotni ko‘rish
            </Link>
          </div>

          {data.courses.length ? (
            <div className="space-y-5">
              {data.courses.map((course) => {
                const completed = course.lessons.filter(
                  (lesson) => data.progressByLessonId[lesson.id]?.completed
                ).length;

                return (
                  <div key={course.id} className="rounded-[28px] border border-border p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xl font-semibold">{course.title}</p>
                        <p className="text-sm text-muted">{course.description}</p>
                      </div>
                      <StatusBadge>{levelLabels[course.level]}</StatusBadge>
                    </div>
                    <ProgressBar
                      value={Math.round((completed / Math.max(course.lessons.length, 1)) * 100)}
                      label="Kursdagi progress"
                    />
                    <div className="mt-4 grid gap-3">
                      {course.lessons.map((lesson) => {
                        const progress = data.progressByLessonId[lesson.id];

                        return (
                          <div
                            key={lesson.id}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/75 px-4 py-3"
                          >
                            <div>
                              <p className="font-semibold">{lesson.title}</p>
                              <p className="text-xs text-muted">
                                Quiz: {lesson.quiz ? `${lesson.quiz.questions.length} savol` : "Mavjud emas"}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <StatusBadge tone={progress?.completed ? "success" : "warning"}>
                                {progress?.completed ? "Tugallangan" : "Davom etmoqda"}
                              </StatusBadge>
                              <Link
                                href={`/lessons/${lesson.id}`}
                                className="text-sm font-semibold text-accent"
                              >
                                Ochish
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              title="Kurslar topilmadi"
              description="Admin yoki o‘qituvchi darslarni qo‘shgach bu yerda ko‘rinadi."
            />
          )}
        </Card>

        <Card className="space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              So‘nggi natijalar
            </p>
            <h3 className="text-2xl font-semibold">Quiz va tavsiyalar</h3>
          </div>

          {data.attempts.length ? (
            <div className="space-y-4">
              {data.attempts.slice(0, 5).map((attempt) => (
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
          ) : (
            <EmptyState
              title="Quiz natijalari hali yo‘q"
              description="Dars ichidagi testlarni yechgandan so‘ng bu yerda natijalar paydo bo‘ladi."
            />
          )}
        </Card>
      </section>
    </div>
  );
}
