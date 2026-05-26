import { Role } from "@prisma/client";
import { NextResponse } from "next/server";

import { defaultAccessibilitySettings, dashboardPaths } from "@/lib/constants";
import { setSession, toSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Ba’zi maydonlarni yana bir ko‘rib chiqsak yaxshi bo‘ladi.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (existingUser) {
    return NextResponse.json(
      {
        message: "Bu email bilan allaqachon hisob ochilgan."
      },
      { status: 400 }
    );
  }

  const linkedChild =
    parsed.data.role === "PARENT" && parsed.data.childEmail
      ? await prisma.user.findFirst({
          where: {
            email: parsed.data.childEmail.toLowerCase(),
            role: Role.STUDENT
          }
        })
      : null;

  if (parsed.data.role === "PARENT" && parsed.data.childEmail && !linkedChild) {
    return NextResponse.json(
      {
        message: "Farzand emailini topa olmadik. Keyinroq ulab qo‘yish ham mumkin.",
        errors: {
          childEmail: ["Bu email bilan o‘quvchi topilmadi."]
        }
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash: hashPassword(parsed.data.password),
      role: parsed.data.role,
      disabilityProfile: parsed.data.disabilityProfile || null,
      preferredLearningMode: parsed.data.preferredLearningMode,
      childEmail: parsed.data.role === "PARENT" ? parsed.data.childEmail || null : null,
      parentId: parsed.data.role === "STUDENT" && linkedChild ? linkedChild.id : null,
      accessibilitySettings: {
        create: defaultAccessibilitySettings
      }
    }
  });

  if (parsed.data.role === "PARENT" && linkedChild) {
    await prisma.user.update({
      where: { id: linkedChild.id },
      data: {
        parentId: user.id
      }
    });
  }

  await setSession(toSessionUser(user));

  return NextResponse.json({
    ok: true,
    redirectTo: "/onboarding",
    dashboard: dashboardPaths[user.role]
  });
}
