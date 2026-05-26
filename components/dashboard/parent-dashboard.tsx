import Link from "next/link";

import { ParentAdviceCard } from "@/components/dashboard/parent-advice-card";
import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { average, formatDate } from "@/lib/utils";
import type { ParentDashboardData } from "@/types";

export function ParentDashboard({ data }: { data: ParentDashboardData }) {
  if (!data.child) {
    return (
      <HumanEmptyState
        title="Farzand bilan bog‘lanish hali ko‘rinmadi"
        description="Farzand emaili orqali bog‘langach, bu yerda tinch kuzatuv hisobotlari ko‘rinadi."
      />
    );
  }

  const completed = data.child.progressEntries.filter((entry) => entry.completed).length;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Bugungi faollik"
          value={formatDate(data.child.progressEntries[0]?.lastOpenedAt)}
          description="Oxirgi kirish yoki mashq shu yerda ko‘rinadi."
        />
        <StatCard
          label="Tugallangan darslar"
          value={completed}
          description="Har bir dars kichik qadam sifatida hisoblanadi."
        />
        <StatCard
          label="Kayfiyat"
          value={data.child.progressEntries[0]?.emotionalState ?? "Hali belgilanmagan"}
          description="Bu baho emas, ritmni tushunishga yordam beradi."
        />
        <StatCard
          label="O‘rtacha natija"
          value={`${average(data.child.quizAttempts.map((attempt) => attempt.score))}%`}
          description="Foizdan ko‘ra, qaysi format yengilroq bo‘lganiga ko‘proq qaraymiz."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Farzandingiz qanday o‘rganayotganini sokin kuzating
              </p>
              <h2 className="text-3xl font-semibold">{data.child.name}</h2>
            </div>
            <Link href="/reports" className="text-sm font-semibold text-[var(--accent)]">
              To‘liq hisobot
            </Link>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <ProgressBar
              value={Math.round((completed / Math.max(data.child.progressEntries.length, 1)) * 100)}
              label="Rivojlanish xaritasi"
              hint="Bu natija baho emas, keyingi qadamni tanlash uchun yordam."
            />
            <div className="mt-5 grid gap-3">
              {data.child.progressEntries.slice(0, 4).map((entry) => (
                <div key={entry.id} className="rounded-[1.5rem] bg-white/80 px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{entry.lesson.title}</p>
                      <p className="text-sm leading-6 text-[var(--muted)]">{entry.teacherComment || "Izoh keyinroq qo‘shiladi."}</p>
                    </div>
                    <StatusBadge tone={entry.completed ? "success" : "warning"}>
                      {entry.completed ? "Yakunlandi" : "Jarayonda"}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Uyda yordam berish uchun 3 ta oddiy tavsiya
            </p>
            <h2 className="text-3xl font-semibold">Yordam ohangida</h2>
          </div>
          {data.advice.map((item) => (
            <ParentAdviceCard key={item} text={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
