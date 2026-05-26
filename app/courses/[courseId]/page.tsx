import { notFound } from "next/navigation";

import { ProgressMap } from "@/components/learning/progress-map";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { getCurrentUser } from "@/lib/auth";
import { getCourseDetails } from "@/lib/data";
import { levelLabels } from "@/lib/constants";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: CoursePageProps) {
  const user = await getCurrentUser();
  const { courseId } = await params;
  const data = await getCourseDetails(courseId, user?.id);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Kurs ichidagi yo‘l
            </p>
            <h1 className="text-4xl font-semibold">{data.course.title}</h1>
            <p className="max-w-4xl text-lg leading-8 text-[var(--muted)]">{data.course.description}</p>
          </div>
          <StatusBadge tone="info">{levelLabels[data.course.level]}</StatusBadge>
        </div>
      </Card>

      <section className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Rivojlanish xaritasi
          </p>
          <h2 className="text-3xl font-semibold">Darslar birin-ketin ko‘rinadi</h2>
        </div>
        <ProgressMap
          items={data.course.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            href: `/lessons/${lesson.id}`,
            completed: Boolean(data.progressMap[lesson.id]?.completed),
            note: data.progressMap[lesson.id]?.teacherComment ?? lesson.shortSummary
          }))}
        />
      </section>
    </div>
  );
}
