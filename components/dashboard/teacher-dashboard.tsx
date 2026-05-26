import Link from "next/link";

import { updateTeacherNoteAction } from "@/app/actions";
import { TeacherRecommendationCard } from "@/components/dashboard/teacher-recommendation-card";
import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { average, formatDate, parseJsonArray, safeModeLabel } from "@/lib/utils";
import type { TeacherDashboardData } from "@/types";

export function TeacherDashboard({ data }: { data: TeacherDashboardData }) {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Kurslar"
          value={data.courses.length}
          description="Siz tuzgan yo‘llar va ularga biriktirilgan darslar."
        />
        <StatCard
          label="Faol o‘quvchilar"
          value={data.students.length}
          description="Moslashuv va faollik bo‘yicha kuzatilayotgan o‘quvchilar."
        />
        <StatCard
          label="Qiyin mavzular"
          value={
            data.supportPanel.filter((item) => item.message.includes("pasaygan") || item.message.includes("yordam")).length
          }
          description="Hozirroq yaqinroq e’tibor kerak bo‘lishi mumkin bo‘lgan holatlar."
        />
        <StatCard
          label="O‘rtacha natija"
          value={`${average(data.students.flatMap((student) => student.quizAttempts.map((attempt) => attempt.score)))}%`}
          description="Bu faqat yo‘nalish uchun ko‘rsatkich. Asosiy e’tibor format va ritmga qaratiladi."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Har bir o‘quvchi uchun mos yo‘l
            </p>
            <h2 className="text-3xl font-semibold">Kimga yordam kerak?</h2>
          </div>
          <div className="grid gap-4">
            {data.supportPanel.map((item) => (
              <TeacherRecommendationCard
                key={item.studentId}
                studentName={item.studentName}
                message={item.message}
                suggestion={item.suggestion}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Darsni moslashtirish
              </p>
              <h2 className="text-3xl font-semibold">O‘quvchi profillari</h2>
            </div>
            <Link href="/reports" className="text-sm font-semibold text-[var(--accent)]">
              Hisobotga o‘tish
            </Link>
          </div>
          {data.students.length ? (
            data.students.map((student) => {
              const lastProgress = student.progressEntries[0];
              const topMode = lastProgress?.preferredModeUsed ? safeModeLabel(lastProgress.preferredModeUsed) : "Jarayonda aniqlanadi";

              return (
                <div key={student.id} className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{student.name}</h3>
                      <p className="text-base leading-7 text-[var(--muted)]">
                        Ehtiyoj profili: {student.disabilityProfile || "Hali yozilmagan"}
                      </p>
                    </div>
                    <StatusBadge tone="info">{topMode}</StatusBadge>
                  </div>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-[1.5rem] bg-white/80 p-4">
                      <p className="font-semibold">Oxirgi faollik</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {lastProgress ? formatDate(lastProgress.lastOpenedAt) : "Hali dars ochilmagan"}
                      </p>
                    </div>
                    <div className="rounded-[1.5rem] bg-white/80 p-4">
                      <p className="font-semibold">Qiyin bo‘lgan mavzu</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {student.quizAttempts[0]?.improvementAreas
                          ? parseJsonArray<string>(student.quizAttempts[0].improvementAreas).join(", ")
                          : "Hali aniqlanmagan"}
                      </p>
                    </div>
                  </div>

                  {lastProgress ? (
                    <form action={updateTeacherNoteAction} className="mt-4 space-y-3">
                      <input type="hidden" name="progressId" value={lastProgress.id} />
                      <textarea
                        name="teacherComment"
                        defaultValue={lastProgress.teacherComment ?? ""}
                        rows={2}
                        className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                        placeholder="Yumshoq tavsiya yozing"
                      />
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          name="strengths"
                          defaultValue={lastProgress.strengths ?? ""}
                          className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                          placeholder="Kuchli tomoni"
                        />
                        <input
                          name="improvementAreas"
                          defaultValue={lastProgress.improvementAreas ?? ""}
                          className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                          placeholder="Yana ko‘rsak foydali joy"
                        />
                      </div>
                      <button
                        type="submit"
                        className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-base font-semibold text-white"
                      >
                        Tavsiyani saqlash
                      </button>
                    </form>
                  ) : null}
                </div>
              );
            })
          ) : (
            <HumanEmptyState
              title="O‘quvchilar hali ko‘rinmayapti"
              description="Demo ma’lumotlar yoki yangi ro‘yxatdan o‘tgan o‘quvchilar paydo bo‘lgach bu joy to‘ladi."
            />
          )}
        </div>
      </section>
    </div>
  );
}
