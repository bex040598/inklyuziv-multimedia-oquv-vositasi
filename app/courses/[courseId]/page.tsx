import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { requireUser } from "@/lib/auth";
import { levelLabels } from "@/lib/constants";
import { getCourseDetails } from "@/lib/data";

type CoursePageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function CoursePage({ params }: CoursePageProps) {
  const user = await requireUser();
  const { courseId } = await params;
  const data = await getCourseDetails(courseId, user.id);

  if (!data) {
    notFound();
  }

  const completedLessons = data.course.lessons.filter(
    (lesson) => data.progressByLessonId[lesson.id]?.completed
  ).length;

  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Kurs tafsiloti
            </p>
            <h2 className="text-4xl font-semibold">{data.course.title}</h2>
            <p className="max-w-3xl text-sm leading-7 text-muted">{data.course.description}</p>
          </div>
          <StatusBadge>{levelLabels[data.course.level]}</StatusBadge>
        </div>
        <ProgressBar
          value={Math.round((completedLessons / Math.max(data.course.lessons.length, 1)) * 100)}
          label="Kursdagi umumiy progress"
        />
      </Card>

      <section className="grid gap-5">
        {data.course.lessons.map((lesson) => {
          const progress = data.progressByLessonId[lesson.id];

          return (
            <Card key={lesson.id} className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold">{lesson.title}</h3>
                  <p className="text-sm leading-7 text-muted">{lesson.description}</p>
                </div>
                <StatusBadge tone={progress?.completed ? "success" : "warning"}>
                  {progress?.completed ? "Tugallangan" : "Faol"}
                </StatusBadge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/lessons/${lesson.id}`} className="text-sm font-semibold text-accent">
                  Darsni ochish
                </Link>
              </div>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
