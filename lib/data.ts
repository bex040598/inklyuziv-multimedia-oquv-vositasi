import "server-only";

import { Role } from "@prisma/client";

import { motivationMessages } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { average, percentage, randomItem } from "@/lib/utils";

export async function getAdminDashboardData() {
  const [users, courses, lessons, progress, attempts] = await Promise.all([
    prisma.user.findMany({
      include: {
        children: true,
        accessibilitySettings: true
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.course.findMany({
      include: {
        createdBy: true,
        lessons: {
          include: {
            quiz: {
              include: {
                questions: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.lesson.findMany(),
    prisma.progress.findMany({
      where: { completed: true }
    }),
    prisma.quizAttempt.findMany()
  ]);

  return {
    users,
    courses,
    stats: {
      totalUsers: users.length,
      totalLessons: lessons.length,
      completedLessons: progress.length,
      averageQuizScore: average(attempts.map((attempt) => attempt.score))
    }
  };
}

export async function getTeacherDashboardData(teacherId: string) {
  const [courses, students, progressRecords] = await Promise.all([
    prisma.course.findMany({
      where: { createdById: teacherId },
      include: {
        lessons: {
          include: {
            quiz: {
              include: {
                questions: true,
                attempts: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.user.findMany({
      where: { role: Role.STUDENT },
      include: {
        progressEntries: {
          include: {
            lesson: {
              include: {
                course: true
              }
            }
          }
        },
        quizAttempts: {
          include: {
            quiz: {
              include: {
                lesson: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "asc" }
    }),
    prisma.progress.findMany({
      include: {
        user: true,
        lesson: {
          include: {
            course: true
          }
        }
      },
      orderBy: { lastOpenedAt: "desc" }
    })
  ]);

  const lessonOptions = courses.flatMap((course) => course.lessons);

  return {
    courses,
    students,
    progressRecords,
    lessonOptions,
    stats: {
      courseCount: courses.length,
      lessonCount: lessonOptions.length,
      quizCount: lessonOptions.filter((lesson) => lesson.quiz).length,
      averageStudentScore: average(
        students.flatMap((student) => student.quizAttempts.map((attempt) => attempt.score))
      )
    }
  };
}

export async function getStudentDashboardData(studentId: string) {
  const [courses, progressEntries, attempts] = await Promise.all([
    prisma.course.findMany({
      include: {
        createdBy: true,
        lessons: {
          include: {
            quiz: {
              include: {
                questions: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.progress.findMany({
      where: { userId: studentId },
      include: {
        lesson: {
          include: {
            course: true
          }
        }
      }
    }),
    prisma.quizAttempt.findMany({
      where: { userId: studentId },
      include: {
        quiz: {
          include: {
            lesson: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  const totalLessons = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completedLessons = progressEntries.filter((progress) => progress.completed).length;
  const progressByLessonId = Object.fromEntries(progressEntries.map((item) => [item.lessonId, item]));
  const latestAttempt = attempts[0] ?? null;

  return {
    courses,
    progressEntries,
    progressByLessonId,
    attempts,
    latestAttempt,
    stats: {
      completedLessons,
      totalLessons,
      completionRate: percentage(completedLessons, totalLessons),
      averageScore: average(attempts.map((attempt) => attempt.score)),
      lastActivity: progressEntries[0]?.lastOpenedAt ?? attempts[0]?.createdAt ?? null,
      motivation: randomItem(motivationMessages)
    }
  };
}

export async function getParentDashboardData(parentId: string) {
  const parent = await prisma.user.findUnique({
    where: { id: parentId },
    include: {
      children: {
        include: {
          progressEntries: {
            include: {
              lesson: {
                include: {
                  course: true
                }
              }
            }
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
      }
    }
  });

  const child = parent?.children[0] ?? null;

  if (!child) {
    return {
      child: null,
      stats: null
    };
  }

  const completedLessons = child.progressEntries.filter((progress) => progress.completed).length;

  return {
    child,
    stats: {
      completedLessons,
      averageScore: average(child.quizAttempts.map((attempt) => attempt.score)),
      recentActivity:
        child.progressEntries[0]?.lastOpenedAt ?? child.quizAttempts[0]?.createdAt ?? null,
      reportSummary:
        child.progressEntries[0]?.teacherComment ||
        "Farzandingiz darslarga muntazam kirib turibdi. Davomiy qo‘llab-quvvatlash foydali."
    }
  };
}

export async function getCourseDetails(courseId: string, userId?: string) {
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
    progressByLessonId: Object.fromEntries(progressEntries.map((item) => [item.lessonId, item]))
  };
}

export async function getLessonDetails(lessonId: string, userId?: string) {
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

  const [progress, attempts] = userId
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
          ? prisma.quizAttempt.findMany({
              where: {
                userId,
                quizId: lesson.quiz.id
              },
              orderBy: { createdAt: "desc" }
            })
          : Promise.resolve([])
      ])
    : [null, []];

  return {
    lesson,
    progress,
    attempts
  };
}

export async function getReportData(role: Role, actorId: string, selectedStudentId?: string) {
  const students =
    role === Role.STUDENT
      ? await prisma.user.findMany({
          where: { id: actorId },
          include: {
            progressEntries: {
              include: {
                lesson: {
                  include: {
                    course: true
                  }
                }
              }
            },
            quizAttempts: {
              include: {
                quiz: {
                  include: {
                    lesson: true
                  }
                }
              }
            }
          }
        })
      : role === Role.PARENT
        ? await prisma.user.findMany({
            where: { parentId: actorId, role: Role.STUDENT },
            include: {
              progressEntries: {
                include: {
                  lesson: {
                    include: {
                      course: true
                    }
                  }
                }
              },
              quizAttempts: {
                include: {
                  quiz: {
                    include: {
                      lesson: true
                    }
                  }
                }
              }
            }
          })
        : await prisma.user.findMany({
            where: { role: Role.STUDENT },
            include: {
              progressEntries: {
                include: {
                  lesson: {
                    include: {
                      course: true
                    }
                  }
                }
              },
              quizAttempts: {
                include: {
                  quiz: {
                    include: {
                      lesson: true
                    }
                  }
                }
              }
            }
          });

  const activeStudent =
    students.find((student) => student.id === selectedStudentId) ?? students[0] ?? null;

  const lessons = await prisma.lesson.findMany({
    include: {
      course: true,
      progressEntries: true,
      quiz: {
        include: {
          attempts: true
        }
      }
    }
  });

  const lessonStats = lessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.title,
    courseTitle: lesson.course.title,
    completionCount: lesson.progressEntries.filter((progress) => progress.completed).length,
    averageScore: average(lesson.quiz?.attempts.map((attempt) => attempt.score) ?? [])
  }));

  return {
    students,
    activeStudent,
    lessonStats
  };
}
