"use server";

import { QuestionType, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearSession, requireUser, setSession } from "@/lib/auth";
import { defaultAccessibilitySettings } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/password";
import { isReadOnlyDemo, readOnlyDemoMessage } from "@/lib/runtime";
import {
  validateCourse,
  validateLesson,
  validateLogin,
  validateQuiz,
  validateRegister,
  validateRole
} from "@/lib/validations";
import type { ActionState, SessionUser } from "@/types";

const idleState: ActionState = {
  status: "idle"
};

function errorState(message: string, errors?: Record<string, string>): ActionState {
  return {
    status: "error",
    message,
    errors
  };
}

function successState(message: string, payload?: Record<string, unknown>): ActionState {
  return {
    status: "success",
    message,
    payload
  };
}

function normalizeAnswer(value: string) {
  return value.trim().toLowerCase();
}

function getSessionPayload(user: SessionUser): SessionUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function loginAction(_previousState: ActionState, formData: FormData) {
  const { errors, values } = validateLogin(formData);

  if (Object.keys(errors).length > 0) {
    return errorState("Kirish ma’lumotlarini tekshiring.", errors);
  }

  const user = await prisma.user.findUnique({
    where: { email: values.email }
  });

  if (!user || !verifyPassword(values.password, user.passwordHash)) {
    return errorState("Email yoki parol noto‘g‘ri.");
  }

  await setSession(getSessionPayload(user));
  redirect("/dashboard");
}

export async function registerAction(_previousState: ActionState, formData: FormData) {
  if (isReadOnlyDemo) {
    return errorState(readOnlyDemoMessage);
  }

  const { errors, values } = validateRegister(formData);

  if (Object.keys(errors).length > 0) {
    return errorState("Ro‘yxatdan o‘tish formasini to‘g‘rilang.", errors);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: values.email }
  });

  if (existingUser) {
    return errorState("Bu email bilan foydalanuvchi allaqachon mavjud.");
  }

  let parentId: string | undefined;

  if (values.role === "PARENT" && values.childEmail) {
    const child = await prisma.user.findFirst({
      where: {
        email: values.childEmail,
        role: Role.STUDENT
      }
    });

    if (!child) {
      return errorState("Ko‘rsatilgan o‘quvchi topilmadi.", {
        childEmail: "Farzand email manzili bazada topilmadi."
      });
    }

    parentId = child.id;
  }

  const user = await prisma.user.create({
    data: {
      name: values.name,
      email: values.email,
      passwordHash: hashPassword(values.password),
      role: values.role as Role,
      disabilityProfile: values.disabilityProfile || null,
      accessibilitySettings: {
        create: defaultAccessibilitySettings
      }
    }
  });

  if (user.role === Role.PARENT && parentId) {
    await prisma.user.update({
      where: { id: parentId },
      data: { parentId: user.id }
    });
  }

  await setSession(getSessionPayload(user));
  redirect("/dashboard");
}

export async function logoutAction() {
  await clearSession();
  redirect("/");
}

export async function createCourseAction(
  previousState: ActionState = idleState,
  formData: FormData
) {
  void previousState;
  if (isReadOnlyDemo) {
    return errorState(readOnlyDemoMessage);
  }

  const user = await requireUser([Role.ADMIN, Role.TEACHER]);
  const { errors, values } = validateCourse(formData);

  if (Object.keys(errors).length > 0) {
    return errorState("Kurs ma’lumotlarini tekshiring.", errors);
  }

  await prisma.course.create({
    data: {
      title: values.title,
      description: values.description,
      level: values.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      createdById: user.id
    }
  });

  revalidatePath("/dashboard");
  return successState("Yangi kurs muvaffaqiyatli yaratildi.");
}

export async function createLessonAction(
  previousState: ActionState = idleState,
  formData: FormData
) {
  void previousState;
  if (isReadOnlyDemo) {
    return errorState(readOnlyDemoMessage);
  }

  await requireUser([Role.ADMIN, Role.TEACHER]);
  const { errors, values } = validateLesson(formData);

  if (Object.keys(errors).length > 0) {
    return errorState("Dars ma’lumotlari to‘liq emas.", errors);
  }

  await prisma.lesson.create({
    data: {
      courseId: values.courseId,
      title: values.title,
      description: values.description,
      content: values.content,
      easyContent: values.easyContent,
      audioUrl: values.audioUrl || null,
      videoUrl: values.videoUrl || null,
      imageUrl: values.imageUrl || null,
      imageAlt: values.imageAlt,
      captions: values.captions || null,
      keywords: values.keywords || null,
      level: values.level as "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
      disabilityRecommendations: {
        visual: String(formData.get("recommendationVisual") || ""),
        hearing: String(formData.get("recommendationHearing") || ""),
        mobility: String(formData.get("recommendationMobility") || ""),
        autism: String(formData.get("recommendationAutism") || ""),
        intellectual: String(formData.get("recommendationIntellectual") || "")
      }
    }
  });

  revalidatePath("/dashboard");
  return successState("Dars muvaffaqiyatli qo‘shildi.");
}

export async function createQuizAction(
  previousState: ActionState = idleState,
  formData: FormData
) {
  void previousState;
  if (isReadOnlyDemo) {
    return errorState(readOnlyDemoMessage);
  }

  await requireUser([Role.ADMIN, Role.TEACHER]);
  const { errors, values } = validateQuiz(formData);

  if (Object.keys(errors).length > 0) {
    return errorState("Quiz savollarini tekshiring.", errors);
  }

  const existingQuiz = await prisma.quiz.findUnique({
    where: { lessonId: values.lessonId }
  });

  if (existingQuiz) {
    return errorState("Bu dars uchun allaqachon test mavjud.");
  }

  const questions = Array.from({ length: 3 }, (_, index) => {
    const questionIndex = index + 1;
    const type = String(formData.get(`questionType${questionIndex}`) || "");
    const text = String(formData.get(`questionText${questionIndex}`) || "");
    const correctAnswer = String(formData.get(`correctAnswer${questionIndex}`) || "");
    const explanation = String(formData.get(`explanation${questionIndex}`) || "");

    let options: string[] | null = null;

    if (type === QuestionType.SINGLE_CHOICE) {
      options = ["A", "B", "C", "D"]
        .map((key) => String(formData.get(`option${key}${questionIndex}`) || "").trim())
        .filter(Boolean);
    }

    if (type === QuestionType.TRUE_FALSE) {
      options = ["True", "False"];
    }

    return {
      type: type as QuestionType,
      text,
      correctAnswer,
      explanation: explanation || null,
      options: options ?? undefined
    };
  });

  await prisma.quiz.create({
    data: {
      lessonId: values.lessonId,
      title: values.title,
      questions: {
        create: questions
      }
    }
  });

  revalidatePath("/dashboard");
  return successState("Test savollari qo‘shildi.");
}

export async function submitQuizAction(
  previousState: ActionState = idleState,
  formData: FormData
) {
  void previousState;
  if (isReadOnlyDemo) {
    return successState(readOnlyDemoMessage, {
      score: 0,
      correctCount: 0,
      totalQuestions: 0,
      incorrectRecommendations: []
    });
  }

  const user = await requireUser([Role.STUDENT]);
  const quizId = String(formData.get("quizId") || "");

  if (!quizId) {
    return errorState("Quiz topilmadi.");
  }

  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      lesson: true,
      questions: true
    }
  });

  if (!quiz) {
    return errorState("Quiz topilmadi.");
  }

  const answers: Record<string, string> = {};
  const incorrectRecommendations: string[] = [];
  let correctCount = 0;

  for (const question of quiz.questions) {
    const answer = String(formData.get(`question-${question.id}`) || "");
    answers[question.id] = answer;

    const normalizedUserAnswer = normalizeAnswer(answer);
    const acceptedAnswers = question.correctAnswer.split("|").map(normalizeAnswer);
    const isCorrect = acceptedAnswers.includes(normalizedUserAnswer);

    if (isCorrect) {
      correctCount += 1;
      continue;
    }

    incorrectRecommendations.push(
      question.explanation ||
        `${question.text} savolini yana bir marta ko‘rib chiqing va darsning oson til versiyasini qayta o‘qing.`
    );
  }

  const score = Math.round((correctCount / quiz.questions.length) * 100);

  await prisma.quizAttempt.create({
    data: {
      quizId: quiz.id,
      userId: user.id,
      score,
      answers
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
      lastOpenedAt: new Date()
    },
    create: {
      userId: user.id,
      lessonId: quiz.lessonId,
      completed: false,
      lastOpenedAt: new Date()
    }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/lessons/${quiz.lessonId}`);
  revalidatePath("/reports");

  return successState(`Natijangiz ${score}% bo‘ldi.`, {
    score,
    correctCount,
    totalQuestions: quiz.questions.length,
    incorrectRecommendations
  });
}

export async function markLessonCompleteAction(formData: FormData) {
  if (isReadOnlyDemo) {
    return;
  }

  const user = await requireUser([Role.STUDENT]);
  const lessonId = String(formData.get("lessonId") || "");

  if (!lessonId) {
    return;
  }

  await prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: user.id,
        lessonId
      }
    },
    update: {
      completed: true,
      lastOpenedAt: new Date()
    },
    create: {
      userId: user.id,
      lessonId,
      completed: true,
      lastOpenedAt: new Date()
    }
  });

  revalidatePath("/dashboard");
  revalidatePath(`/lessons/${lessonId}`);
}

export async function updateProgressNoteAction(
  previousState: ActionState = idleState,
  formData: FormData
) {
  void previousState;
  if (isReadOnlyDemo) {
    return errorState(readOnlyDemoMessage);
  }

  await requireUser([Role.ADMIN, Role.TEACHER]);
  const progressId = String(formData.get("progressId") || "");
  const teacherComment = String(formData.get("teacherComment") || "").trim();
  const strengths = String(formData.get("strengths") || "").trim();
  const improvementAreas = String(formData.get("improvementAreas") || "").trim();

  if (!progressId) {
    return errorState("Progress yozuvi topilmadi.");
  }

  await prisma.progress.update({
    where: { id: progressId },
    data: {
      teacherComment: teacherComment || null,
      strengths: strengths || null,
      improvementAreas: improvementAreas || null
    }
  });

  revalidatePath("/dashboard");
  revalidatePath("/reports");
  return successState("O‘qituvchi izohi saqlandi.");
}

export async function updateUserRoleAction(formData: FormData) {
  if (isReadOnlyDemo) {
    return;
  }

  await requireUser([Role.ADMIN]);
  const userId = String(formData.get("userId") || "");
  const role = String(formData.get("role") || "");

  if (!userId || !validateRole(role)) {
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  revalidatePath("/dashboard");
}
