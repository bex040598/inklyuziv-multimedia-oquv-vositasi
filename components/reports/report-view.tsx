import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { PrintReport } from "@/components/reports/print-report";
import { PrintButton } from "@/components/reports/print-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDate } from "@/lib/utils";
import type { ReportPageData } from "@/types";

function getFirst(items: Array<string | null | undefined>) {
  return items.find((item): item is string => Boolean(item));
}

export function ReportView({ data }: { data: ReportPageData }) {
  if (!data.activeStudent) {
    return (
      <HumanEmptyState
        title="Hisobot uchun o‘quvchi topilmadi"
        description="Bir nechta dars ochilgach va progress yozuvlari paydo bo‘lgach, bu sahifa to‘ladi."
      />
    );
  }

  const completed = data.activeStudent.progressEntries.filter((entry) => entry.completed).length;

  return (
    <div className="space-y-8">
      <section className="screen-only flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Hisobot
          </p>
          <h1 className="text-4xl font-semibold">{data.activeStudent.name} uchun rivojlanish hisoboti</h1>
          <p className="text-lg leading-8 text-[var(--muted)]">
            Baholashdan ko‘ra, nimalar osonlashgani va keyingi qadamlar muhimroq.
          </p>
        </div>
        <PrintButton />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            O‘quvchi bo‘yicha
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="text-sm text-[var(--muted)]">Tugallangan darslar</p>
              <p className="mt-2 text-3xl font-semibold">{completed}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="text-sm text-[var(--muted)]">Oxirgi faollik</p>
              <p className="mt-2 text-lg font-semibold">
                {formatDate(data.activeStudent.progressEntries[0]?.lastOpenedAt)}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <ProgressBar
              value={Math.round((completed / Math.max(data.activeStudent.progressEntries.length, 1)) * 100)}
              label="Tugallangan darslar ulushi"
            />
          </div>
          <div className="mt-5 space-y-3">
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="font-semibold">Kuchli tomonlar</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                {getFirst(data.activeStudent.progressEntries.map((entry) => entry.strengths).filter(Boolean)) ??
                  "Darslar davomida asta-sekin aniq ko‘rinadi."}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="font-semibold">Qiyinlashgan joylar</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                {getFirst(data.recommendations) ?? "Hozircha alohida qiyin nuqta ajralmagan."}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="font-semibold">O‘qituvchi izohi</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                {getFirst(
                  data.activeStudent.progressEntries.map((entry) => entry.teacherComment).filter(Boolean)
                ) ?? "Izoh keyinroq qo‘shiladi."}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Qaysi format yordam bergan
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.formatHelpfulness.length ? (
                data.formatHelpfulness.map((item) => (
                  <StatusBadge key={item.mode} tone="info">
                    {item.mode}: {item.count}
                  </StatusBadge>
                ))
              ) : (
                <p className="text-base leading-7 text-[var(--muted)]">
                  Bir nechta darsdan keyin bu yerda aniqroq ko‘rinadi.
                </p>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Keyingi 3 ta tavsiya
            </p>
            <div className="mt-4 space-y-3">
              {data.recommendations.map((item) => (
                <div key={item} className="rounded-[1.5rem] bg-white/80 p-4 text-base leading-7">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PrintReport data={data} />
    </div>
  );
}
