import type {
  AiInteraction,
  Course,
  CourseLevel,
  EmotionalState,
  FontScale,
  LearningMode,
  Lesson,
  Progress,
  Question,
  QuestionType,
  Quiz,
  QuizAttempt,
  Role,
  User
} from "@prisma/client";

export type ActionStatus = "idle" | "success" | "error";

export type ActionState = {
  status: ActionStatus;
  message?: string;
  errors?: Record<string, string>;
  payload?: Record<string, unknown>;
};

export type AccessibilityState = {
  fontScale: FontScale;
  contrastMode: "NORMAL" | "HIGH" | "CALM_DARK";
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  captions: boolean;
  transcript: boolean;
  textToSpeech: boolean;
  audioDescription: boolean;
  readingRuler: boolean;
  letterSpacing: boolean;
  lineHeight: boolean;
  simplifiedUi: boolean;
  easyLanguage: boolean;
  largeControls: boolean;
  keyboardMode: boolean;
  calmMode: boolean;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

export type LearningNeedKey =
  | "visual"
  | "hearing"
  | "mobility"
  | "attention"
  | "reading"
  | "memory";

export type RecommendationMap = Record<string, string>;

export type LearningGoal = {
  title: string;
  detail: string;
};

export type PictogramItem = {
  label: string;
  description: string;
};

export type CourseCardData = Pick<
  Course,
  "id" | "title" | "description" | "level" | "estimatedDuration" | "coverImage" | "coverAlt"
> & {
  lessonCount: number;
  recommendedModes: LearningMode[];
  needs: string[];
};

export type LessonDetail = Lesson & {
  course: Course;
  quiz: (Quiz & { questions: Question[] }) | null;
};

export type StudentDashboardData = {
  student: User & {
    accessibilitySettings: import("@prisma/client").AccessibilitySettings | null;
    progressEntries: (Progress & { lesson: Lesson & { course: Course } })[];
    quizAttempts: (QuizAttempt & { quiz: Quiz & { lesson: Lesson } })[];
  };
  recommendedCourses: CourseCardData[];
  continueLesson: LessonDetail | null;
  recentAttempts: (QuizAttempt & { quiz: Quiz & { lesson: Lesson } })[];
  formatInsight: {
    bestMode: string;
    easiestTopics: string[];
    difficultQuestionType: string;
  };
  checkInMessage: string;
};

export type TeacherStudentInsight = User & {
  progressEntries: (Progress & { lesson: Lesson & { course: Course } })[];
  quizAttempts: (QuizAttempt & { quiz: Quiz & { lesson: Lesson } })[];
  accessibilitySettings: import("@prisma/client").AccessibilitySettings | null;
};

export type TeacherDashboardData = {
  teacher: User;
  courses: (Course & { lessons: (Lesson & { quiz: Quiz | null })[] })[];
  students: TeacherStudentInsight[];
  supportPanel: Array<{
    studentId: string;
    studentName: string;
    message: string;
    suggestion: string;
  }>;
};

export type ParentDashboardData = {
  parent: User;
  child: TeacherStudentInsight | null;
  advice: string[];
};

export type AdminDashboardData = {
  users: (User & { accessibilitySettings: import("@prisma/client").AccessibilitySettings | null })[];
  courses: (Course & { lessons: Lesson[]; createdBy: User })[];
  stats: {
    totalUsers: number;
    totalLessons: number;
    completionCount: number;
    averageScore: number;
    mostUsedPreset: string;
    accessibilityHealthScore: number;
  };
  stuckLessons: Array<{
    lessonId: string;
    title: string;
    stopCount: number;
  }>;
};

export type CoursePageData = {
  course: Course & {
    lessons: (Lesson & {
      quiz: (Quiz & { questions: Question[] }) | null;
    })[];
    createdBy: User;
  };
  progressMap: Record<string, Progress | undefined>;
};

export type LessonPageData = {
  lesson: LessonDetail;
  progress: Progress | null;
  latestAttempt: QuizAttempt | null;
  aiHistory: AiInteraction[];
};

export type ReportPageData = {
  actor: User;
  activeStudent: TeacherStudentInsight | null;
  formatHelpfulness: Array<{ mode: string; label: string; count: number }>;
  recommendations: string[];
};

export type HelpShortcut = {
  keys: string;
  action: string;
};

export type QuizResultPayload = {
  score: number;
  strengths: string[];
  improvementAreas: string[];
  recommendedNextStep: string;
  easierReview: string;
};

export type AIExplainResponse = {
  message: string;
  suggestedAction: string;
  easierVersion?: string;
};

export type SeedQuestion = {
  type: QuestionType;
  text: string;
  easyText: string;
  options?: unknown;
  correctAnswer: unknown;
  explanation: string;
  easyExplanation: string;
  imageUrl?: string;
  imageAlt?: string;
  audioPromptUrl?: string;
};

export type EmotionalStateOption = {
  value: EmotionalState;
  label: string;
  note: string;
};

export type FilterLevel = CourseLevel | "ALL";
