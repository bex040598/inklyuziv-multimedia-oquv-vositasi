import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

type Context = {
  params: Promise<{
    lessonId: string;
  }>;
};

export async function POST(_request: Request, context: Context) {
  const user = await getCurrentUser();

  if (!user || user.role !== "STUDENT") {
    return NextResponse.json({ ok: true });
  }

  const { lessonId } = await context.params;

  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId
      }
    },
    update: {
      lastOpenedAt: new Date()
    },
    create: {
      userId: user.id,
      lessonId,
      completed: false,
      lastOpenedAt: new Date()
    }
  });

  return NextResponse.json({ ok: true });
}
