import "server-only";

import {
  type AccessibilitySettings,
  type Course,
  type LearningMode,
  type Lesson,
  type Progress,
  type QuizAttempt,
  Role
} from "@prisma/client";

import { accessibilityPresets, parentAdviceSamples, studentMessages } from "@/lib/constants";
import { prisma } from "@/lib/db";
import {
  average,
  parseJsonArray,
  percentage,
  randomItem,
  safeModeLabel,
  toSentence
} from "@/lib/utils";
import type {
  AdminDashboardData,
  CourseCardData,
  CoursePageData,
  LessonPageData,
  ParentDashboardData,
  ReportPageData,
  StudentDashboardData,
  TeacherDashboardData,
  TeacherStudentInsight
} from "@/types";

function resolvePresetName(settings: AccessibilitySettings | null) {
  if (!settings) {
    return "Hali moslanmagan";
  }

  for (const preset of accessibilityPresets) {
    const matches = Object.entries(preset.settings).every(([key, value]) => {
      return settings[key as keyof typeof settings] === value;
    });

    if (matches) {
      return preset.title;
    }
  }

  if (settings.easyLanguage) {
    return "Oson til";
  }

  if (settings.captions && settings.transcript) {
    return "Eshitishga qulay";
  }

  if (settings.largeControls && settings.keyboardMode) {
    return "Harakatlanishga qulay";
  }

  return "Shaxsiy moslama";
}

function buildCourseCard(
  course: Course & {
    lessons: Lesson[];
  }
): CourseCardData {
  const modes = new Set<LearningMode>();
  const needs = new Set<string>();

  for (const lesson of course.lessons) {
    parseJsonArray<LearningMode>(lesson.recommendedModes).forEach((mode) => modes.add(mode));
    const recommendations = lesson.disabilityRecommendations;
    if (recommendations && typeof recommendations === "object" && !Array.isArray(recommendations)) {
      Object.keys(recommendations).forEach((key) => needs.add(key));
    }
  }

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    estimatedDuration: course.estimatedDuration,
    coverImage: course.coverImage,
    coverAlt: course.coverAlt,
    lessonCount: course.lessons.length,
    recommendedModes: Array.from(modes),
    needs: Array.from(needs)
  };
}

function getBestMode(progressEntries: Array<Progress>) {
  const modeCounts = progressEntries.reduce<Record<string, number>>((accumulator, entry) => {
    if (!entry.preferredModeUsed) {
      return accumulator;
    }

    accumulator[entry.preferredModeUsed] = (accumulator[entry.preferredModeUsed] ?? 0) + 1;
    return accumulator;
  }, {});

  const topMode = Object.entries(modeCounts).sort((left, right) => right[1] - left[1])[0]?.[0];
  return safeModeLabel((topMode as LearningMode | undefined) ?? "MIXED");
}

function getQuestionTypeDifficulty(attempts: QuizAttempt[]) {
  if (!attempts.length) {
    return "Qisqa javoblar hali sinab ko‘rilmagan.";
  }

  const lowAttempt = [...attempts].sort((left, right) => left.score - right.score)[0];
  const improvements = parseJsonArray<string>(lowAttempt.improvementAreas);
  return improvements[0] ?? "Qisqa javob va tartiblash savollarini yana ko‘rib chiqish foydali.";
}

function getSupportSuggestion(student: TeacherStudentInsight) {
  const averageScore = average(student.quizAttempts.map((attempt) => attempt.score));
  const lastProgress = student.progressEntries[0];

  if (lastProgress?.emotionalState === "NEED_HELP") {
    return {
      message: "So‘nggi darsda yordam so‘ralgan.",
      suggestion: "Keyingi mavzuni qisqa audio va oson matn bilan boshlash foydali."
    };
  }

  if (averageScore < 60) {
    return {
      message: "Natijalar biroz pasaygan.",
      suggestion: "Savollarni kichik bo‘limlarga bo‘lib, misol bilan tushuntirib ko‘rish kerak."
    };
  }

  if (student.accessibilitySettings?.easyLanguage) {
    return {
      message: "Oson til rejimi ko‘p yordam bermoqda.",
      suggestion: "Keyingi darsda video emas, audio va qisqa matndan boshlang."
    };
  }

  return {
    message: "Ritmi barqaror.",
    suggestion: "Qiyin joylarda “misol bilan tushuntir” blokini oldinroq ko‘rsatish mumkin."
  };
}

export async function getHomePageData() {
  const courses = await prisma.course.findMany({
    include: {
      lessons: true
    },
    take: 3,
    orderBy: { createdAt: "asc" }
  });

  return courses.map(buildCourseCard);
}

export async function getStudentDashboardData(studentId: string): Promise<StudentDashboardData> {
  const student = await prisma.user.findUniqueOrThrow({
    where: { id: studentId },
    include: {
      accessibilitySettings: true,
      progressEntries: {
        include: {
          lesson: {
            include: {
              course: true
            }
          }
        },
        orderBy: { lastOpenedAt: "desc" }
      },
      quizAttempts: {
        include: {
          quiz: {
            include: {
              lesson: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      }
    }
  });

  const courses = await prisma.course.findMany({
    include: {
      lessons: true
    },
    orderBy: { createdAt: "asc" }
  });

  const continueTarget = student.progressEntries.find((entry) => !entry.completed)?.lesson.id;
  const continueLesson = continueTarget
    ? await prisma.lesson.findUnique({
        where: { id: continueTarget },
        include: {
          course: true,
          quiz: {
            include: {
              questions: true
            }
          }
        }
      })
    : null;

  const recommendedCourses = courses
    .map(buildCourseCard)
    .sort((left, right) => {
      const leftMatches = left.recommendedModes.includes(student.preferredLearningMode ?? "MIXED") ? 1 : 0;
      const rightMatches = right.recommendedModes.includes(student.preferredLearningMode ?? "MIXED")
        ? 1
        : 0;
      return rightMatches - leftMatches;
    })
    .slice(0, 3);

  return {
    student,
    recommendedCourses,
    continueLesson,
    recentAttempts: student.quizAttempts.slice(0, 4),
    formatInsight: {
      bestMode: getBestMode(student.progressEntries),
      easiestTopics: student.progressEntries
        .filter((entry) => entry.completed)
        .slice(0, 3)
        .map((entry) => entry.lesson.title),
      difficultQuestionType: getQuestionTypeDifficulty(student.quizAttempts)
    },
    checkInMessage: randomItem(studentMessages)
  };
}

export async function getTeacherDashboardData(teacherId: string): Promise<TeacherDashboardData> {
  const teacher = await prisma.user.findUniqueOrThrow({
    where: { id: teacherId }
  });

  const [courses, students] = await Promise.all([
    prisma.course.findMany({
      where: { createdById: teacherId },
      include: {
        lessons: {
          include: {
            quiz: true
          }
        }
      },
      orderBy: { createdAt: "asc" }
    }),
    prisma.user.findMany({
      where: { role: Role.STUDENT },
      include: {
        accessibilitySettings: true,
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          },
          orderBy: { lastOpenedAt: "desc" }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "asc" }
    })
  ]);

  return {
    teacher,
    courses,
    students,
    supportPanel: students.slice(0, 6).map((student) => {
      const suggestion = getSupportSuggestion(student);
      return {
        studentId: student.id,
        studentName: student.name,
        message: suggestion.message,
        suggestion: suggestion.suggestion
      };
    })
  };
}

export async function getParentDashboardData(parentId: string): Promise<ParentDashboardData> {
  const parent = await prisma.user.findUniqueOrThrow({
    where: { id: parentId }
  });

  const child =
    (await prisma.user.findFirst({
      where: {
        OR: parent.childEmail ? [{ parentId }, { email: parent.childEmail }] : [{ parentId }]
      },
      include: {
        accessibilitySettings: true,
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          },
          orderBy: { lastOpenedAt: "desc" }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    })) ?? null;

  const advice = child
    ? [
        child.progressEntries[0]?.teacherComment ??
          "Uyda qayta ko‘rish uchun eng avval qisqa xulosadan boshlash foydali.",
        ...parentAdviceSamples.slice(0, 2)
      ]
    : parentAdviceSamples;

  return {
    parent,
    child,
    advice
  };
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [users, courses, progressEntries, attempts] = await Promise.all([
    prisma.user.findMany({
      include: {
        accessibilitySettings: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.course.findMany({
      include: {
        lessons: true,
        createdBy: true
      },
      orderBy: { createdAt: "asc" }
    }),
    prisma.progress.findMany({
      include: {
        lesson: true
      }
    }),
    prisma.quizAttempt.findMany()
  ]);

  const presetCounts = users.reduce<Record<string, number>>((accumulator, user) => {
    const key = resolvePresetName(user.accessibilitySettings);
    accumulator[key] = (accumulator[key] ?? 0) + 1;
    return accumulator;
  }, {});

  const mostUsedPreset = Object.entries(presetCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ??
    "Hali tanlanmagan";

  const lessons = courses.flatMap((course) => course.lessons);
  const accessibilityHealthScore = Math.round(
    average(
      lessons.map((lesson) => {
        let score = 0;
        if (lesson.imageAlt) score += 20;
        if (lesson.audioTranscript) score += 20;
        if (lesson.videoCaptions) score += 20;
        if (lesson.videoTranscript) score += 20;
        if (lesson.easyContent) score += 20;
        return score;
      })
    )
  );

  const stuckLessons = Object.values(
    progressEntries.reduce<
      Record<
        string,
        {
          lessonId: string;
          title: string;
          stopCount: number;
        }
      >
    >((accumulator, entry) => {
      if (entry.completed) {
        return accumulator;
      }

      const existing = accumulator[entry.lessonId] ?? {
        lessonId: entry.lessonId,
        title: entry.lesson.title,
        stopCount: 0
      };

      existing.stopCount += 1;
      accumulator[entry.lessonId] = existing;
      return accumulator;
    }, {})
  )
    .sort((left, right) => right.stopCount - left.stopCount)
    .slice(0, 5);

  return {
    users,
    courses,
    stats: {
      totalUsers: users.length,
      totalLessons: lessons.length,
      completionCount: progressEntries.filter((entry) => entry.completed).length,
      averageScore: average(attempts.map((attempt) => attempt.score)),
      mostUsedPreset,
      accessibilityHealthScore
    },
    stuckLessons
  };
}

export async function getCoursesCatalog(filters?: {
  level?: string;
  format?: string;
  need?: string;
  duration?: string;
}) {
  const courses = await prisma.course.findMany({
    include: {
      lessons: true
    },
    orderBy: { createdAt: "asc" }
  });

  return courses
    .map(buildCourseCard)
    .filter((course) => {
      if (filters?.level && filters.level !== "ALL" && course.level !== filters.level) {
        return false;
      }

      if (filters?.format && !course.recommendedModes.includes(filters.format as LearningMode)) {
        return false;
      }

      if (filters?.need && !course.needs.includes(filters.need)) {
        return false;
      }

      if (filters?.duration === "SHORT" && course.estimatedDuration > 60) {
        return false;
      }

      if (filters?.duration === "MEDIUM" && (course.estimatedDuration <= 60 || course.estimatedDuration > 120)) {
        return false;
      }

      if (filters?.duration === "LONG" && course.estimatedDuration <= 120) {
        return false;
      }

      return true;
    });
}

export async function getCourseDetails(
  courseId: string,
  userId?: string
): Promise<CoursePageData | null> {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      createdBy: true,
      lessons: {
        include: {
          quiz: {
            include: {
              questions: true
            }
          }
        },
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!course) {
    return null;
  }

  const progressEntries = userId
    ? await prisma.progress.findMany({
        where: {
          userId,
          lessonId: { in: course.lessons.map((lesson) => lesson.id) }
        }
      })
    : [];

  return {
    course,
    progressMap: Object.fromEntries(progressEntries.map((entry) => [entry.lessonId, entry]))
  };
}

export async function getLessonDetails(
  lessonId: string,
  userId?: string
): Promise<LessonPageData | null> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      course: true,
      quiz: {
        include: {
          questions: true
        }
      }
    }
  });

  if (!lesson) {
    return null;
  }

  const [progress, latestAttempt, aiHistory] = userId
    ? await Promise.all([
        prisma.progress.findUnique({
          where: {
            userId_lessonId: {
              userId,
              lessonId
            }
          }
        }),
        lesson.quiz
          ? prisma.quizAttempt.findFirst({
              where: {
                userId,
                quizId: lesson.quiz.id
              },
              orderBy: { createdAt: "desc" }
            })
          : Promise.resolve(null),
        prisma.aiInteraction.findMany({
          where: { userId, lessonId },
          orderBy: { createdAt: "desc" },
          take: 6
        })
      ])
    : [null, null, []];

  return {
    lesson,
    progress,
    latestAttempt,
    aiHistory
  };
}

export async function getQuizDetails(lessonId: string, userId?: string) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      course: true,
      quiz: {
        include: {
          questions: true
        }
      }
    }
  });

  if (!lesson?.quiz) {
    return null;
  }

  const latestAttempt = userId
    ? await prisma.quizAttempt.findFirst({
        where: {
          userId,
          quizId: lesson.quiz.id
        },
        orderBy: { createdAt: "desc" }
      })
    : null;

  return {
    lesson,
    quiz: lesson.quiz,
    latestAttempt
  };
}

export async function getProgressPageData(role: Role, actorId: string) {
  if (role === Role.STUDENT) {
    return getStudentDashboardData(actorId);
  }

  if (role === Role.TEACHER) {
    return getTeacherDashboardData(actorId);
  }

  if (role === Role.PARENT) {
    return getParentDashboardData(actorId);
  }

  return getAdminDashboardData();
}

export async function getReportData(role: Role, actorId: string): Promise<ReportPageData> {
  const actor = await prisma.user.findUniqueOrThrow({
    where: { id: actorId }
  });

  let activeStudent: TeacherStudentInsight | null = null;

  if (role === Role.STUDENT) {
    activeStudent = await prisma.user.findUnique({
      where: { id: actorId },
      include: {
        accessibilitySettings: true,
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          },
          orderBy: { lastOpenedAt: "desc" }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });
  } else if (role === Role.PARENT) {
    activeStudent = await prisma.user.findFirst({
      where: { parentId: actorId },
      include: {
        accessibilitySettings: true,
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          },
          orderBy: { lastOpenedAt: "desc" }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });
  } else {
    activeStudent = await prisma.user.findFirst({
      where: { role: Role.STUDENT },
      include: {
        accessibilitySettings: true,
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          },
          orderBy: { lastOpenedAt: "desc" }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        }
      }
    });
  }

  const formatHelpfulness = activeStudent
    ? Object.entries(
        activeStudent.progressEntries.reduce<Record<string, number>>((accumulator, entry) => {
          const key = safeModeLabel(entry.preferredModeUsed);
          accumulator[key] = (accumulator[key] ?? 0) + 1;
          return accumulator;
        }, {})
      ).map(([mode, count]) => ({
        mode,
        label: `${mode} ko‘proq yordam bergan`,
        count
      }))
    : [];

  const recommendations = activeStudent
    ? [
        `Ko‘proq yordam bergan format: ${formatHelpfulness[0]?.mode ?? "hali aniq emas"}.`,
        activeStudent.progressEntries[0]?.teacherComment ??
          "Keyingi darsni qisqa xulosa bilan boshlab, so‘ng qulay formatga o‘tish tavsiya etiladi.",
        activeStudent.quizAttempts.length
          ? `Yana bir marta ko‘rib chiqish foydali bo‘lishi mumkin: ${getQuestionTypeDifficulty(
              activeStudent.quizAttempts
            )}`
          : "Kichik mashq ishlangach, qaysi savol turi qiyinroq ekani ko‘rinadi."
      ]
    : [];

  return {
    actor,
    activeStudent,
    formatHelpfulness,
    recommendations
  };
}

export function getCompletionSummary(progressEntries: Progress[]) {
  const completed = progressEntries.filter((entry) => entry.completed).length;
  return {
    completed,
    total: progressEntries.length,
    percent: percentage(completed, progressEntries.length || 1)
  };
}

export function getStrengthSummary(student: TeacherStudentInsight | null) {
  if (!student) {
    return "Hali yetarli ma’lumot yo‘q.";
  }

  const strengths = student.progressEntries
    .map((entry) => entry.strengths)
    .filter((value): value is string => Boolean(value));

  return strengths.length ? toSentence(strengths.slice(0, 3)) : "Dars davomida kuchli tomonlar asta-sekin aniqlanadi.";
}
