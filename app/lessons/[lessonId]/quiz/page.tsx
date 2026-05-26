import { notFound } from "next/navigation";

import { QuizCard } from "@/components/learning/quiz-card";
import { requireUser } from "@/lib/auth";
import { getQuizDetails } from "@/lib/data";

type LessonQuizPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function LessonQuizPage({ params }: LessonQuizPageProps) {
  const user = await requireUser();
  const { lessonId } = await params;
  const data = await getQuizDetails(lessonId, user.id);

  if (!data) {
    notFound();
  }

  return (
    <QuizCard
      lessonId={lessonId}
      lessonHref={`/lessons/${lessonId}`}
      quiz={{
        id: data.quiz.id,
        title: data.quiz.title,
        friendlyIntro: data.quiz.friendlyIntro,
        questions: data.quiz.questions
      }}
    />
  );
}
