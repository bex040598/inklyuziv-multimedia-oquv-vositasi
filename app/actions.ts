"use server";

import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearSession, requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { roleUpdateSchema, teacherNoteSchema } from "@/lib/validations";

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function updateTeacherNoteAction(formData: FormData) {
  const user = await requireUser([Role.ADMIN, Role.TEACHER]);
  void user;

  const parsed = teacherNoteSchema.safeParse({
    progressId: String(formData.get("progressId") ?? ""),
    teacherComment: String(formData.get("teacherComment") ?? ""),
    strengths: String(formData.get("strengths") ?? ""),
    improvementAreas: String(formData.get("improvementAreas") ?? "")
  });

  if (!parsed.success) {
    return;
  }

  await prisma.progress.update({
    where: { id: parsed.data.progressId },
    data: {
      teacherComment: parsed.data.teacherComment || null,
      strengths: parsed.data.strengths || null,
      improvementAreas: parsed.data.improvementAreas || null
    }
  });

  revalidatePath("/teacher");
  revalidatePath("/reports");
}

export async function updateUserRoleAction(formData: FormData) {
  await requireUser([Role.ADMIN]);

  const parsed = roleUpdateSchema.safeParse({
    userId: String(formData.get("userId") ?? ""),
    role: String(formData.get("role") ?? "")
  });

  if (!parsed.success) {
    return;
  }

  await prisma.user.update({
    where: { id: parsed.data.userId },
    data: {
      role: parsed.data.role
    }
  });

  revalidatePath("/admin");
}
