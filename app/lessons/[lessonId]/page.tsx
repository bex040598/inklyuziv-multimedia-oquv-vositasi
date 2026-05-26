import Link from "next/link";
import { notFound } from "next/navigation";

import { LessonPlayer } from "@/components/learning/lesson-player";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { getLessonDetails } from "@/lib/data";

type LessonPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: LessonPageProps) {
  const user = await requireUser();
  const { lessonId } = await params;
  const data = await getLessonDetails(lessonId, user.id);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {data.lesson.course.title}
            </p>
            <h1 className="text-4xl font-semibold">{data.lesson.title}</h1>
          </div>
          <Link href={`/courses/${data.lesson.courseId}`} className="inline-flex">
            <Button variant="secondary">Kursga qaytish</Button>
          </Link>
        </div>
      </Card>

      <LessonPlayer
        lesson={data.lesson}
        currentFeedback={data.progress?.learnerFeedback}
        currentEmotion={data.progress?.emotionalState ?? null}
        currentMode={data.progress?.preferredModeUsed ?? null}
        quizHref={`/lessons/${data.lesson.id}/quiz`}
      />
    </div>
  );
}
