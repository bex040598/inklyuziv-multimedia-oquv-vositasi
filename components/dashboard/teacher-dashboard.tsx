import Link from "next/link";

import { CourseForm } from "@/components/forms/course-form";
import { LessonForm } from "@/components/forms/lesson-form";
import { ProgressNoteForm } from "@/components/forms/progress-note-form";
import { QuizForm } from "@/components/forms/quiz-form";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getTeacherDashboardData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type TeacherDashboardData = Awaited<ReturnType<typeof getTeacherDashboardData>>;

export function TeacherDashboard({ data }: { data: TeacherDashboardData }) {
  const courseOptions = data.courses.map((course) => ({
    id: course.id,
    title: course.title
  }));

  const lessonOptions = data.lessonOptions.map((lesson) => ({
    id: lesson.id,
    title: lesson.title
  }));

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Kurslar"
          value={data.stats.courseCount}
          description="Siz yaratgan kurslar soni."
        />
        <StatCard
          label="Darslar"
          value={data.stats.lessonCount}
          description="Kurslaringiz tarkibidagi jami darslar."
        />
        <StatCard
          label="Quizlar"
          value={data.stats.quizCount}
          description="Test biriktirilgan darslar soni."
        />
        <StatCard
          label="O‘rtacha natija"
          value={`${data.stats.averageStudentScore}%`}
          description="O‘quvchilar quiz natijalarining o‘rtacha foizi."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <CourseForm />
        <LessonForm courses={courseOptions} />
        <QuizForm lessons={lessonOptions} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Darslar portfeli
              </p>
              <h3 className="text-2xl font-semibold">Sizning kurslaringiz</h3>
            </div>
            <Link href="/reports" className="text-sm font-semibold text-accent">
              Hisobotlarni ko‘rish
            </Link>
          </div>

          {data.courses.length ? (
            <div className="space-y-4">
              {data.courses.map((course) => (
                <div key={course.id} className="rounded-2xl border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-lg font-semibold">{course.title}</p>
                      <p className="text-sm text-muted">{course.description}</p>
                    </div>
                    <StatusBadge>{course.lessons.length} ta dars</StatusBadge>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {course.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3"
                      >
                        <div>
                          <p className="font-semibold">{lesson.title}</p>
                          <p className="text-xs text-muted">
                            Quiz: {lesson.quiz ? `${lesson.quiz.questions.length} ta savol` : "Yo‘q"}
                          </p>
                        </div>
                        <Link
                          href={`/lessons/${lesson.id}`}
                          className="text-sm font-semibold text-accent"
                        >
                          Darsni ochish
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Kurslar topilmadi"
              description="Avval kurs yarating, so‘ng darslar va testlarni qo‘shishingiz mumkin."
            />
          )}
        </Card>

        <Card className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              O‘quvchi progressi
            </p>
            <h3 className="text-2xl font-semibold">So‘nggi faollik va izohlar</h3>
          </div>

          {data.progressRecords.length ? (
            <div className="space-y-4">
              {data.progressRecords.slice(0, 8).map((progress) => (
                <div key={progress.id} className="rounded-[28px] border border-border p-5">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{progress.user.name}</p>
                      <p className="text-sm text-muted">
                        {progress.lesson.title} • {progress.lesson.course.title}
                      </p>
                    </div>
                    <div className="text-right text-xs text-muted">
                      <p>{progress.completed ? "Tugallangan" : "Davom etmoqda"}</p>
                      <p>{formatDate(progress.lastOpenedAt)}</p>
                    </div>
                  </div>
                  <ProgressNoteForm
                    progressId={progress.id}
                    teacherComment={progress.teacherComment}
                    strengths={progress.strengths}
                    improvementAreas={progress.improvementAreas}
                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Progress ma’lumotlari hali yo‘q"
              description="O‘quvchilar darslardan foydalangach bu yerda faoliyatlari ko‘rinadi."
            />
          )}
        </Card>
      </section>
    </div>
  );
}
