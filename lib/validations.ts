import { z } from "zod";

const emailField = z
  .string()
  .trim()
  .min(1, "Email kiriting.")
  .email("Email manzilini yana bir tekshirib ko‘ring.");

const passwordField = z
  .string()
  .min(6, "Parol kamida 6 belgidan iborat bo‘lsin.")
  .max(64, "Parol juda uzun bo‘lib ketdi.");

export const loginSchema = z.object({
  email: emailField,
  password: passwordField
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, "Ismingizni biroz to‘liqroq yozing."),
    email: emailField,
    password: passwordField,
    role: z.enum(["STUDENT", "TEACHER", "PARENT"], {
      message: "Rolni tanlang."
    }),
    disabilityProfile: z.string().trim().max(280, "Qisqaroq yozsangiz ham yetarli.").optional(),
    preferredLearningMode: z.enum(["READING", "LISTENING", "VIDEO", "VISUAL", "MIXED"], {
      message: "O‘rganish usulini tanlang."
    }),
    childEmail: z.string().trim().optional()
  })
  .superRefine((value, context) => {
    if (value.role === "PARENT" && value.childEmail) {
      const result = emailField.safeParse(value.childEmail);
      if (!result.success) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["childEmail"],
          message: "Farzand emailini to‘g‘ri formatda kiriting."
        });
      }
    }
  });

export const onboardingSchema = z.object({
  fontScale: z.enum(["NORMAL", "LARGE", "XLARGE"]),
  contrastMode: z.enum(["NORMAL", "HIGH", "CALM_DARK"]),
  preferredLearningMode: z.enum(["READING", "LISTENING", "VIDEO", "VISUAL", "MIXED"]),
  needs: z.array(z.string()).default([]),
  blockers: z.array(z.string()).default([])
});

export const accessibilitySchema = z.object({
  fontScale: z.enum(["NORMAL", "LARGE", "XLARGE"]),
  contrastMode: z.enum(["NORMAL", "HIGH", "CALM_DARK"]),
  dyslexiaFont: z.boolean(),
  reduceMotion: z.boolean(),
  captions: z.boolean(),
  transcript: z.boolean(),
  textToSpeech: z.boolean(),
  audioDescription: z.boolean(),
  readingRuler: z.boolean(),
  letterSpacing: z.boolean(),
  lineHeight: z.boolean(),
  simplifiedUi: z.boolean(),
  easyLanguage: z.boolean(),
  largeControls: z.boolean(),
  keyboardMode: z.boolean(),
  calmMode: z.boolean()
});

export const aiExplainSchema = z.object({
  lessonId: z.string().trim().min(1, "Dars topilmadi."),
  mode: z.enum(["simplify", "example", "summarize", "quiz-help", "next-step"]),
  userText: z.string().trim().max(300).optional(),
  accessibilityProfile: z.string().trim().max(200).optional()
});

export const lessonFeedbackSchema = z.object({
  lessonId: z.string().trim().min(1),
  feedback: z.string().trim().max(200).optional(),
  learnerFeedback: z.string().trim().max(200).optional(),
  emotionalState: z.enum(["CALM", "TIRED", "READY", "NEED_HELP", "LATER"]).optional(),
  preferredModeUsed: z.enum(["READING", "LISTENING", "VIDEO", "VISUAL", "MIXED"]).optional(),
  completed: z.boolean().optional()
});

export const teacherNoteSchema = z.object({
  progressId: z.string().trim().min(1),
  teacherComment: z.string().trim().max(280).optional(),
  strengths: z.string().trim().max(280).optional(),
  improvementAreas: z.string().trim().max(280).optional()
});

export const roleUpdateSchema = z.object({
  userId: z.string().trim().min(1),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT", "PARENT"])
});

export const quizAnswerSchema = z.object({
  quizId: z.string().trim().min(1),
  answers: z.record(z.string(), z.union([z.string(), z.array(z.string())]))
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type AccessibilityInput = z.infer<typeof accessibilitySchema>;
export type AIExplainInput = z.infer<typeof aiExplainSchema>;
export type QuizAnswerInput = z.infer<typeof quizAnswerSchema>;
