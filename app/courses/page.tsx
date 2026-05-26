import Link from "next/link";

import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCoursesCatalog } from "@/lib/data";
import { levelLabels, learningModeLabels } from "@/lib/constants";
import { minutesLabel, safeModeLabel } from "@/lib/utils";

type CoursesPageProps = {
  searchParams: Promise<{
    level?: string;
    format?: string;
    need?: string;
    duration?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const filters = await searchParams;
  const courses = await getCoursesCatalog(filters);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Kurslar
        </p>
        <h1 className="text-4xl font-semibold">Bir mavzuga bir nechta kirish yo‘li</h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
          Qaysi darsni qanday formatda boshlash qulayroq bo‘lsa, shundan boshlashingiz mumkin.
        </p>
      </section>

      <Card className="space-y-4">
        <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <select name="level" defaultValue={filters.level ?? "ALL"} className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base">
            <option value="ALL">Barcha daraja</option>
            <option value="BEGINNER">{levelLabels.BEGINNER}</option>
            <option value="INTERMEDIATE">{levelLabels.INTERMEDIATE}</option>
            <option value="ADVANCED">{levelLabels.ADVANCED}</option>
          </select>
          <select name="format" defaultValue={filters.format ?? ""} className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base">
            <option value="">Barcha format</option>
            {Object.entries(learningModeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select name="need" defaultValue={filters.need ?? ""} className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base">
            <option value="">Barcha ehtiyoj</option>
            <option value="visual">Ko‘rishga yordam</option>
            <option value="hearing">Eshitishga yordam</option>
            <option value="mobility">Harakatlanishga yordam</option>
            <option value="attention">Diqqatni jamlash</option>
            <option value="reading">O‘qishga yordam</option>
          </select>
          <select name="duration" defaultValue={filters.duration ?? ""} className="rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base">
            <option value="">Davomiylik</option>
            <option value="SHORT">60 daqiqagacha</option>
            <option value="MEDIUM">1-2 soat</option>
            <option value="LONG">2 soatdan ko‘p</option>
          </select>
          <div className="md:col-span-2 xl:col-span-4">
            <button type="submit" className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-base font-semibold text-white">
              Filtrni qo‘llash
            </button>
          </div>
        </form>
      </Card>

      {courses.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.id} className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">{course.title}</h2>
                  <p className="text-base leading-7 text-[var(--muted)]">{course.description}</p>
                </div>
                <StatusBadge tone="info">{minutesLabel(course.estimatedDuration)}</StatusBadge>
              </div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge>{levelLabels[course.level]}</StatusBadge>
                {course.recommendedModes.map((mode) => (
                  <StatusBadge key={mode} tone="info">
                    {safeModeLabel(mode)}
                  </StatusBadge>
                ))}
              </div>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Ehtiyojga mos ko‘mak: {course.needs.length ? course.needs.join(", ") : "dars ichida aniqlanadi"}
              </p>
              <Link href={`/courses/${course.id}`} className="inline-flex text-sm font-semibold text-[var(--accent)]">
                Kurs ichiga kirish
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <HumanEmptyState
          title="Bu filtrlar bilan hozircha kurs topilmadi"
          description="Boshqa format yoki darajani tanlab ko‘rsangiz, sizga yaqinroq yo‘l chiqishi mumkin."
        />
      )}
    </div>
  );
}
