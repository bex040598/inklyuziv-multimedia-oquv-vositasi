import Link from "next/link";
import { notFound } from "next/navigation";

import { markLessonCompleteAction } from "@/app/actions";
import { LessonOpenTracker } from "@/components/lessons/lesson-open-tracker";
import { MultimediaPlayer } from "@/components/lessons/multimedia-player";
import { QuizPlayer } from "@/components/lessons/quiz-player";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatusBadge } from "@/components/ui/status-badge";
import { requireUser } from "@/lib/auth";
import { getLessonDetails } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import type { RecommendationMap } from "@/types";

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

  const recommendations = (data.lesson.disabilityRecommendations as RecommendationMap | null) ?? null;
  const latestAttempt = data.attempts[0] ?? null;

  return (
    <div className="space-y-8">
      {user.role === "STUDENT" ? <LessonOpenTracker lessonId={lessonId} /> : null}

      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Dars sahifasi
            </p>
            <h2 className="text-4xl font-semibold">{data.lesson.title}</h2>
            <p className="max-w-3xl text-sm leading-7 text-muted">{data.lesson.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge tone={data.progress?.completed ? "success" : "warning"}>
              {data.progress?.completed ? "Tugallangan" : "Jarayonda"}
            </StatusBadge>
            <p className="text-xs text-muted">Oxirgi ochilgan vaqt: {formatDate(data.progress?.lastOpenedAt)}</p>
          </div>
        </div>

        {user.role === "STUDENT" ? (
          <form action={markLessonCompleteAction} className="flex flex-wrap gap-3">
            <input type="hidden" name="lessonId" value={lessonId} />
            <Button type="submit">Darsni tugalladim</Button>
            <Link href={`/courses/${data.lesson.courseId}`} className="inline-flex">
              <Button variant="secondary">Kursga qaytish</Button>
            </Link>
          </form>
        ) : (
          <Link href={`/courses/${data.lesson.courseId}`} className="inline-flex">
            <Button variant="secondary">Kursga qaytish</Button>
          </Link>
        )}
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <MultimediaPlayer
          title={data.lesson.title}
          content={data.lesson.content}
          easyContent={data.lesson.easyContent}
          audioUrl={data.lesson.audioUrl}
          videoUrl={data.lesson.videoUrl}
          imageUrl={data.lesson.imageUrl}
          imageAlt={data.lesson.imageAlt}
          captions={data.lesson.captions}
          recommendations={recommendations}
        />

        <div className="space-y-6">
          <Card className="space-y-4">
            <p className="text-sm font-semibold">Qisqa ko‘rsatkichlar</p>
            <ProgressBar value={data.progress?.completed ? 100 : 45} label="Joriy dars progressi" />
            {latestAttempt ? (
              <div className="rounded-2xl border border-border bg-white/80 p-4">
                <p className="font-semibold">So‘nggi test natijasi</p>
                <p className="mt-2 text-3xl font-semibold">{latestAttempt.score}%</p>
                <p className="text-xs text-muted">{formatDate(latestAttempt.createdAt)}</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-4 text-sm text-muted">
                Hali test yechilmagan.
              </div>
            )}
          </Card>

          {data.lesson.quiz ? <QuizPlayer quiz={data.lesson.quiz} /> : null}
        </div>
      </section>
    </div>
  );
}
