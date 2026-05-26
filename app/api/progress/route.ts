import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { lessonFeedbackSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user || user.role !== Role.STUDENT) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = lessonFeedbackSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Bu yozuvni hozircha saqlab bo‘lmadi."
      },
      { status: 400 }
    );
  }

  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId: parsed.data.lessonId
      }
    },
    update: {
      learnerFeedback: parsed.data.learnerFeedback ?? parsed.data.feedback ?? null,
      emotionalState: parsed.data.emotionalState ?? undefined,
      preferredModeUsed: parsed.data.preferredModeUsed ?? undefined,
      completed: parsed.data.completed ?? undefined,
      lastOpenedAt: new Date()
    },
    create: {
      userId: user.id,
      lessonId: parsed.data.lessonId,
      learnerFeedback: parsed.data.learnerFeedback ?? parsed.data.feedback ?? null,
      emotionalState: parsed.data.emotionalState ?? null,
      preferredModeUsed: parsed.data.preferredModeUsed ?? null,
      completed: parsed.data.completed ?? false,
      lastOpenedAt: new Date()
    }
  });

  return NextResponse.json({ ok: true });
}
