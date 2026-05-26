import { LearningMode, Prisma, Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

function normalizeValue(value: unknown) {
  return String(value).trim().toLowerCase();
}

function parseCommaList(value: string) {
  return value
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseMatchingInput(value: string) {
  return value
    .split(/;|\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const [left, right] = item.split(/=|:/).map((part) => part.trim());
      return { left, right };
    });
}

function compareAnswers(type: string, expected: unknown, received: unknown) {
  if (type === "SHORT_ANSWER" && Array.isArray(expected)) {
    return expected.map(normalizeValue).includes(normalizeValue(received));
  }

  if (type === "MULTIPLE_CHOICE" && Array.isArray(expected) && Array.isArray(received)) {
    const normalizedExpected = expected.map(normalizeValue).sort();
    const normalizedReceived = received.map(normalizeValue).sort();
    return JSON.stringify(normalizedExpected) === JSON.stringify(normalizedReceived);
  }

  if (type === "ORDERING" && Array.isArray(expected) && typeof received === "string") {
    const normalizedExpected = expected.map(normalizeValue);
    const normalizedReceived = parseCommaList(received).map(normalizeValue);
    return JSON.stringify(normalizedExpected) === JSON.stringify(normalizedReceived);
  }

  if (type === "MATCHING" && Array.isArray(expected) && typeof received === "string") {
    const normalizedExpected = expected
      .map((item) => JSON.stringify(item))
      .sort();
    const normalizedReceived = parseMatchingInput(received)
      .map((item) => JSON.stringify(item))
      .sort();
    return JSON.stringify(normalizedExpected) === JSON.stringify(normalizedReceived);
  }

  if (typeof expected === "boolean") {
    return expected === (normalizeValue(received) === "true");
  }

  if (expected && typeof expected === "object") {
    return JSON.stringify(expected) === JSON.stringify(received);
  }

  return normalizeValue(expected) === normalizeValue(received);
}

function modeFromAnswerProfile(answers: Record<string, unknown>) {
  if (Object.values(answers).some((value) => Array.isArray(value))) {
    return LearningMode.VISUAL;
  }

  return LearningMode.READING;
}

export async function POST(
  request: Request,
  context: {
    params: Promise<{
      quizId: string;
    }>;
  }
) {
  const user = await getCurrentUser();

  if (!user || user.role !== Role.STUDENT) {
    return NextResponse.json({ message: "Bu mashq faqat o‘quvchi uchun." }, { status: 403 });
  }

  const { quizId } = await context.params;
  const body = (await request.json()) as {
    answers?: Record<string, unknown>;
    lessonId?: string;
  };

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      lesson: true,
      questions: true
    }
  });

  if (!quiz) {
    return NextResponse.json({ message: "Mashq topilmadi." }, { status: 404 });
  }

  const answers = body.answers ?? {};
  let correctCount = 0;
  const strengths: string[] = [];
  const improvementAreas: string[] = [];

  for (const question of quiz.questions) {
    const received = answers[question.id];
    const isCorrect = compareAnswers(question.type, question.correctAnswer, received);

    if (isCorrect) {
      correctCount += 1;
      strengths.push(question.easyText);
    } else {
      improvementAreas.push(question.easyExplanation);
    }
  }

  const score = Math.round((correctCount / Math.max(quiz.questions.length, 1)) * 100);
  const recommendedNextStep =
    score >= 70
      ? "Endi shu mavzuni boshqa formatda ko‘rib, tushunchani yanada mustahkamlasangiz yaxshi bo‘ladi."
      : "Avval oson matn yoki rasmli izohga qaytamiz. Keyin bittadan savol bilan davom etamiz.";
  const easierReview =
    score >= 70
      ? "Xohlasangiz, shu mavzuni audio orqali qayta eshitib ko‘rishingiz mumkin."
      : "Bu mavzuni video o‘rniga qisqa matn va audio bilan qayta ko‘rish yengilroq bo‘lishi mumkin.";

  await prisma.quizAttempt.create({
    data: {
      quizId,
      userId: user.id,
      score,
      answers: answers as Prisma.InputJsonValue,
      strengths: strengths as Prisma.InputJsonValue,
      improvementAreas: improvementAreas as Prisma.InputJsonValue,
      recommendedNextStep
    }
  });

  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: quiz.lessonId
      }
    },
    update: {
      lastOpenedAt: new Date(),
      preferredModeUsed: modeFromAnswerProfile(answers)
    },
    create: {
      userId: user.id,
      lessonId: quiz.lessonId,
      preferredModeUsed: modeFromAnswerProfile(answers),
      completed: false,
      lastOpenedAt: new Date()
    }
  });

  return NextResponse.json({
    score,
    strengths:
      strengths.slice(0, 3).length > 0
        ? strengths.slice(0, 3)
        : ["Siz savollarni oxirigacha ko‘rib chiqqaningizning o‘zi ham yaxshi qadam."],
    improvementAreas:
      improvementAreas.slice(0, 3).length > 0
        ? improvementAreas.slice(0, 3)
        : ["Bu safar ancha barqaror javob berdingiz."],
    recommendedNextStep,
    easierReview
  });
}
