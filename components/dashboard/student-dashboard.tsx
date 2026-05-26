import Link from "next/link";

import { StudentInsightCard } from "@/components/dashboard/student-insight-card";
import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { safeModeLabel } from "@/lib/utils";
import type { StudentDashboardData } from "@/types";

export function StudentDashboard({ data }: { data: StudentDashboardData }) {
  const completedLessons = data.student.progressEntries.filter((entry) => entry.completed).length;

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <StudentInsightCard
          eyebrow="Bugun nimadan boshlaymiz?"
          title={data.checkInMessage}
          description="Darsni o‘qish shart emas. Xohlasangiz tinglab boshlang yoki qisqa xulosadan o‘ting."
        />
        <StudentInsightCard
          eyebrow="Bugungi kichik maqsad"
          title={data.continueLesson?.title ?? "Yangi darsni tanlash"}
          description={
            data.continueLesson
              ? "Qolgan joy saqlangan. Shu darsni o‘sha joyidan davom ettirishingiz mumkin."
              : "Bugun bitta kichik qadam ham yetarli."
          }
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Davom ettirish"
          value={data.continueLesson ? "Tayyor" : "Tanlash kerak"}
          description="Oxirgi ochilgan yoki tugallanmagan dars asosida tayyorlandi."
        />
        <StatCard
          label="Tugallangan darslar"
          value={completedLessons}
          description="Har bir tugallangan dars rivojlanish xaritasida saqlanadi."
        />
        <StatCard
          label="Menga ko‘proq yordam bergani"
          value={data.formatInsight.bestMode}
          description="Qaysi format sizga yengilroq tushganini kuzatib boramiz."
        />
        <StatCard
          label="Oxirgi natijalar"
          value={data.recentAttempts[0]?.score ? `${data.recentAttempts[0].score}%` : "Hali yo‘q"}
          description="Bu natija baho emas, keyingi qadam uchun yordam."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Menga mos darslar
              </p>
              <h2 className="text-3xl font-semibold">Tavsiya qilingan kurslar</h2>
            </div>
            <Link href="/courses" className="text-sm font-semibold text-[var(--accent)]">
              Hammasini ko‘rish
            </Link>
          </div>
          {data.recommendedCourses.length ? (
            data.recommendedCourses.map((course) => (
              <div key={course.id} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">{course.title}</h3>
                    <p className="text-base leading-7 text-[var(--muted)]">{course.description}</p>
                  </div>
                  <StatusBadge tone="info">{course.lessonCount} ta dars</StatusBadge>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.recommendedModes.map((mode) => (
                    <StatusBadge key={mode}>{safeModeLabel(mode)}</StatusBadge>
                  ))}
                </div>
                <Link href={`/courses/${course.id}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--accent)]">
                  Kursni ochish
                </Link>
              </div>
            ))
          ) : (
            <HumanEmptyState
              title="Hozircha tavsiya tayyor emas"
              description="Bir-ikki darsdan keyin qaysi format sizga ko‘proq yordam bergani aniqroq ko‘rinadi."
            />
          )}
        </div>

        <div className="space-y-4">
          <StudentInsightCard
            eyebrow="Yordam kerakmi?"
            title="Murakkab joyda to‘xtab qolish normal holat"
            description="“Qisqaroq tushuntir”, “Misol bilan tushuntir” yoki “Menga o‘qib ber” tugmalaridan foydalanishingiz mumkin."
          />
          <StudentInsightCard
            eyebrow="Dam olish vaqti"
            title="Tanaffus eslatmasi"
            description="20 daqiqadan keyin bir daqiqa ko‘zingizni dam oldiring yoki qo‘llaringizni bo‘shating."
          />
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Rivojlanish
            </p>
            <h2 className="mt-2 text-2xl font-semibold">Qaysi mavzular osonlashgan</h2>
            <div className="mt-4 space-y-3">
              {data.formatInsight.easiestTopics.length ? (
                data.formatInsight.easiestTopics.map((topic) => (
                  <div key={topic} className="rounded-[1.5rem] bg-white/80 px-4 py-4">
                    {topic}
                  </div>
                ))
              ) : (
                <p className="text-base leading-7 text-[var(--muted)]">
                  Birinchi tugallangan darslardan keyin bu yerda qulayroq tushgan mavzular ko‘rinadi.
                </p>
              )}
            </div>
            <div className="mt-4">
              <ProgressBar
                value={Math.round((completedLessons / Math.max(data.student.progressEntries.length, 1)) * 100)}
                label="Joriy rivojlanish xaritasi"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
