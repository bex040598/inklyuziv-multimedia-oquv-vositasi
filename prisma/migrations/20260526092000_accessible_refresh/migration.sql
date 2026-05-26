-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "disabilityProfile" TEXT,
    "preferredLearningMode" TEXT,
    "childEmail" TEXT,
    "parentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccessibilitySettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fontScale" TEXT NOT NULL DEFAULT 'NORMAL',
    "contrastMode" TEXT NOT NULL DEFAULT 'NORMAL',
    "dyslexiaFont" BOOLEAN NOT NULL DEFAULT false,
    "reduceMotion" BOOLEAN NOT NULL DEFAULT false,
    "captions" BOOLEAN NOT NULL DEFAULT true,
    "transcript" BOOLEAN NOT NULL DEFAULT true,
    "textToSpeech" BOOLEAN NOT NULL DEFAULT true,
    "audioDescription" BOOLEAN NOT NULL DEFAULT false,
    "readingRuler" BOOLEAN NOT NULL DEFAULT false,
    "letterSpacing" BOOLEAN NOT NULL DEFAULT false,
    "lineHeight" BOOLEAN NOT NULL DEFAULT false,
    "simplifiedUi" BOOLEAN NOT NULL DEFAULT false,
    "easyLanguage" BOOLEAN NOT NULL DEFAULT false,
    "largeControls" BOOLEAN NOT NULL DEFAULT false,
    "keyboardMode" BOOLEAN NOT NULL DEFAULT false,
    "calmMode" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "AccessibilitySettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "estimatedDuration" INTEGER NOT NULL,
    "coverImage" TEXT,
    "coverAlt" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Course_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "learningGoals" JSONB NOT NULL,
    "content" TEXT NOT NULL,
    "easyContent" TEXT NOT NULL,
    "shortSummary" TEXT NOT NULL,
    "pictogramSummary" JSONB NOT NULL,
    "audioUrl" TEXT,
    "audioTranscript" TEXT,
    "videoUrl" TEXT,
    "videoCaptions" TEXT,
    "videoTranscript" TEXT,
    "audioDescription" TEXT,
    "imageUrl" TEXT,
    "imageAlt" TEXT NOT NULL,
    "imageLongDescription" TEXT,
    "keywords" JSONB NOT NULL,
    "level" TEXT NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL,
    "recommendedModes" JSONB NOT NULL,
    "disabilityRecommendations" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "friendlyIntro" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "easyText" TEXT NOT NULL,
    "audioPromptUrl" TEXT,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "options" JSONB,
    "correctAnswer" JSONB NOT NULL,
    "explanation" TEXT NOT NULL,
    "easyExplanation" TEXT NOT NULL,
    CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "answers" JSONB NOT NULL,
    "strengths" JSONB NOT NULL,
    "improvementAreas" JSONB NOT NULL,
    "recommendedNextStep" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "QuizAttempt_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QuizAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Progress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "preferredModeUsed" TEXT,
    "timeSpent" INTEGER NOT NULL DEFAULT 0,
    "lastOpenedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "teacherComment" TEXT,
    "strengths" TEXT,
    "improvementAreas" TEXT,
    "learnerFeedback" TEXT,
    "emotionalState" TEXT,
    CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Progress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AIInteraction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "promptType" TEXT NOT NULL,
    "userQuestion" TEXT,
    "response" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AIInteraction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AIInteraction_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AccessibilitySettings_userId_key" ON "AccessibilitySettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_lessonId_key" ON "Quiz"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "Progress_userId_lessonId_key" ON "Progress"("userId", "lessonId");
