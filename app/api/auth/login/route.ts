import { NextResponse } from "next/server";

import { setSession, toSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Kirish ma’lumotlarini yana bir tekshirib ko‘ring.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (!user || !verifyPassword(parsed.data.password, user.passwordHash)) {
    return NextResponse.json(
      {
        message: "Email yoki parol mos kelmadi."
      },
      { status: 400 }
    );
  }

  await setSession(toSessionUser(user));

  return NextResponse.json({
    ok: true,
    role: user.role
  });
}
