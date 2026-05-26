import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { accessibilitySchema } from "@/lib/validations";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = accessibilitySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Sozlamalarni saqlashda kichik muammo bo‘ldi."
      },
      { status: 400 }
    );
  }

  await prisma.accessibilitySettings.upsert({
    where: { userId: user.id },
    update: parsed.data,
    create: {
      userId: user.id,
      ...parsed.data
    }
  });

  return NextResponse.json({ ok: true });
}
