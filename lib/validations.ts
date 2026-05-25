import type { Role } from "@prisma/client";

type ValidationResult = {
  errors: Record<string, string>;
  values: Record<string, string>;
};

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function pushError(errors: Record<string, string>, key: string, message: string) {
  if (!errors[key]) {
    errors[key] = message;
  }
}

export function validateRegister(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const name = getString(formData, "name");
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");
  const role = getString(formData, "role");
  const disabilityProfile = getString(formData, "disabilityProfile");
  const childEmail = getString(formData, "childEmail").toLowerCase();

  if (name.length < 3) {
    pushError(errors, "name", "Ism kamida 3 ta belgidan iborat bo‘lsin.");
  }

  if (!email.includes("@")) {
    pushError(errors, "email", "To‘g‘ri email manzil kiriting.");
  }

  if (password.length < 6) {
    pushError(errors, "password", "Parol kamida 6 ta belgidan iborat bo‘lsin.");
  }

  if (!["STUDENT", "TEACHER", "PARENT"].includes(role)) {
    pushError(errors, "role", "Rolni tanlang.");
  }

  return {
    errors,
    values: { name, email, password, role, disabilityProfile, childEmail }
  };
}

export function validateLogin(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const email = getString(formData, "email").toLowerCase();
  const password = getString(formData, "password");

  if (!email.includes("@")) {
    pushError(errors, "email", "Email manzil noto‘g‘ri.");
  }

  if (password.length < 6) {
    pushError(errors, "password", "Parol noto‘g‘ri formatda.");
  }

  return {
    errors,
    values: { email, password }
  };
}

export function validateCourse(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const title = getString(formData, "title");
  const description = getString(formData, "description");
  const level = getString(formData, "level");

  if (title.length < 4) {
    pushError(errors, "title", "Kurs nomi kamida 4 ta belgidan iborat bo‘lsin.");
  }

  if (description.length < 10) {
    pushError(errors, "description", "Kurs tavsifi aniqroq yozilsin.");
  }

  if (!["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(level)) {
    pushError(errors, "level", "Darajani tanlang.");
  }

  return {
    errors,
    values: { title, description, level }
  };
}

export function validateLesson(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const keys = [
    "courseId",
    "title",
    "description",
    "content",
    "easyContent",
    "audioUrl",
    "videoUrl",
    "imageUrl",
    "imageAlt",
    "captions",
    "keywords",
    "level"
  ];

  const values = Object.fromEntries(keys.map((key) => [key, getString(formData, key)]));

  if (!values.courseId) {
    pushError(errors, "courseId", "Kurs tanlang.");
  }

  if (values.title.length < 4) {
    pushError(errors, "title", "Dars sarlavhasi kamida 4 ta belgidan iborat bo‘lsin.");
  }

  if (values.description.length < 10) {
    pushError(errors, "description", "Qisqa tavsifni boyiting.");
  }

  if (values.content.length < 20) {
    pushError(errors, "content", "Asosiy matn yetarlicha to‘liq emas.");
  }

  if (values.easyContent.length < 10) {
    pushError(errors, "easyContent", "Oson o‘qiladigan versiya ham kiriting.");
  }

  if (!values.imageAlt) {
    pushError(errors, "imageAlt", "Rasm uchun alt matn majburiy.");
  }

  if (!["BEGINNER", "INTERMEDIATE", "ADVANCED"].includes(values.level)) {
    pushError(errors, "level", "Dars darajasi tanlanishi kerak.");
  }

  return { errors, values };
}

export function validateQuiz(formData: FormData): ValidationResult {
  const errors: Record<string, string> = {};
  const lessonId = getString(formData, "lessonId");
  const title = getString(formData, "title");

  if (!lessonId) {
    pushError(errors, "lessonId", "Dars tanlanishi kerak.");
  }

  if (title.length < 4) {
    pushError(errors, "title", "Quiz sarlavhasi qisqa.");
  }

  for (let index = 1; index <= 3; index += 1) {
    const text = getString(formData, `questionText${index}`);
    const type = getString(formData, `questionType${index}`);
    const correctAnswer = getString(formData, `correctAnswer${index}`);

    if (text.length < 5) {
      pushError(errors, `questionText${index}`, `${index}-savol matni yetarli emas.`);
    }

    if (!["SINGLE_CHOICE", "TRUE_FALSE", "SHORT_ANSWER"].includes(type)) {
      pushError(errors, `questionType${index}`, `${index}-savol turi tanlanmagan.`);
    }

    if (!correctAnswer) {
      pushError(errors, `correctAnswer${index}`, `${index}-savol uchun to‘g‘ri javob kiriting.`);
    }
  }

  return {
    errors,
    values: {
      lessonId,
      title
    }
  };
}

export function validateRole(role: string): role is Role {
  return ["ADMIN", "TEACHER", "STUDENT", "PARENT"].includes(role);
}
