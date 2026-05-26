"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, Coffee, Lightbulb } from "lucide-react";
import { type CourseLevel } from "@prisma/client";

import { AIHelperPanel } from "@/components/learning/ai-helper-panel";
import { AudioWithTranscript } from "@/components/learning/audio-with-transcript";
import { EasyLanguageBlock } from "@/components/learning/easy-language-block";
import { EmotionalCheckIn } from "@/components/learning/emotional-check-in";
import { FormatSwitcher, type LessonFormat } from "@/components/learning/format-switcher";
import { PictogramSummary } from "@/components/learning/pictogram-summary";
import { TextToSpeechButton } from "@/components/accessibility/text-to-speech-button";
import { TranscriptPanel } from "@/components/learning/transcript-panel";
import { VideoWithCaptions } from "@/components/learning/video-with-captions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { levelLabels } from "@/lib/constants";
import { minutesLabel, parseJsonArray } from "@/lib/utils";
import { useAccessibility } from "@/components/providers/accessibility-provider";
import type { LessonDetail, PictogramItem, RecommendationMap } from "@/types";

type LessonPlayerProps = {
  lesson: LessonDetail;
  currentFeedback?: string | null;
  currentEmotion?: string | null;
  currentMode?: string | null;
  quizHref: string;
};

export function LessonPlayer({
  lesson,
  currentFeedback,
  currentEmotion,
  currentMode,
  quizHref
}: LessonPlayerProps) {
  const { settings } = useAccessibility();
  const [format, setFormat] = useState<LessonFormat>(settings.easyLanguage ? "easy" : "text");
  const [feedbackMessage, setFeedbackMessage] = useState(currentFeedback ?? "");
  const [breakNote, setBreakNote] = useState("");
  const goals = parseJsonArray<{ title: string; detail: string }>(lesson.learningGoals);
  const pictograms = parseJsonArray<PictogramItem>(lesson.pictogramSummary);
  const recommendations = useMemo(
    () => (lesson.disabilityRecommendations as RecommendationMap) ?? {},
    [lesson.disabilityRecommendations]
  );
  const activeLongText = settings.easyLanguage || format === "easy" ? lesson.easyContent : lesson.content;

  useEffect(() => {
    void fetch(`/api/lessons/${lesson.id}/open`, {
      method: "POST"
    });
  }, [lesson.id]);

  function getPreferredMode() {
    switch (format) {
      case "audio":
        return "LISTENING";
      case "video":
        return "VIDEO";
      case "visual":
        return "VISUAL";
      default:
        return "READING";
    }
  }

  async function saveProgress(payload: Record<string, unknown>) {
    await fetch("/api/progress", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lessonId: lesson.id,
        preferredModeUsed: payload.preferredModeUsed ?? currentMode ?? getPreferredMode(),
        ...payload
      })
    });
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Darsni qanday ko‘ramiz?
            </p>
            <FormatSwitcher value={format} onChange={setFormat} />
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusBadge tone="info">{levelLabels[lesson.level as CourseLevel]}</StatusBadge>
            <StatusBadge>{minutesLabel(lesson.estimatedMinutes)}</StatusBadge>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold">{lesson.title}</h1>
            <p className="text-lg leading-8 text-[var(--muted)]">{lesson.description}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {goals.map((goal) => (
                <div key={goal.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                  <p className="text-base font-semibold">{goal.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{goal.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Card className="space-y-3 bg-[var(--accent-soft)]/55">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Qisqa yo‘l
              </p>
              <p className="text-lg leading-8">{lesson.shortSummary}</p>
              <TextToSpeechButton text={`${lesson.title}. ${activeLongText}`} />
            </Card>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={() => setFormat("easy")}>
                <Lightbulb className="mr-2 h-4 w-4" />
                Qisqaroq tushuntir
              </Button>
              <Button
                variant="soft"
                onClick={() => {
                  setBreakNote("Tanaffus ham o‘rganishning bir qismi. Qaytganingizda shu joydan davom etasiz.");
                }}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Tanaffus qilish
              </Button>
            </div>
            {breakNote ? <p className="text-sm leading-6 text-[var(--muted)]">{breakNote}</p> : null}
          </div>
        </div>
      </Card>

      {format === "text" ? (
        <Card className="space-y-4">
          <p className="text-lg leading-9 whitespace-pre-line">{lesson.content}</p>
          <TextToSpeechButton text={`${lesson.title}. ${lesson.content}`} />
        </Card>
      ) : null}

      {format === "easy" ? <EasyLanguageBlock text={lesson.easyContent} /> : null}

      {format === "audio" && lesson.audioUrl ? (
        <AudioWithTranscript
          title="Tinglash rejimi"
          audioUrl={lesson.audioUrl}
          transcript={lesson.audioTranscript}
        />
      ) : null}

      {format === "video" && lesson.videoUrl ? (
        <VideoWithCaptions
          title="Video va subtitr"
          videoUrl={lesson.videoUrl}
          captions={lesson.videoCaptions}
          transcript={lesson.videoTranscript}
          audioDescription={lesson.audioDescription}
        />
      ) : null}

      {format === "visual" ? (
        <div className="space-y-4">
          {lesson.imageUrl ? (
            <Card className="space-y-3">
              <img
                src={lesson.imageUrl}
                alt={lesson.imageAlt}
                className="w-full rounded-[1.75rem] border border-[var(--border)] object-cover"
              />
              <p className="text-base leading-7">{lesson.imageAlt}</p>
              {lesson.imageLongDescription ? (
                <TranscriptPanel title="Rasmda nima bor?" content={lesson.imageLongDescription} />
              ) : null}
            </Card>
          ) : null}
          <PictogramSummary items={pictograms} />
        </div>
      ) : null}

      {format === "quiz" ? (
        <Card className="space-y-4">
          <p className="text-lg leading-8">
            Bu darsni tekshirib ko‘ramiz. Vaqt cheklovi yo‘q. Xohlasangiz keyinroq ham qaytishingiz mumkin.
          </p>
          <Link href={quizHref} className="inline-flex">
            <Button>Boshlash</Button>
          </Link>
        </Card>
      ) : null}

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <Card className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="soft"
                onClick={async () => {
                  await saveProgress({
                    completed: true,
                    learnerFeedback: "Men tushundim"
                  });
                  setFeedbackMessage("Ajoyib. Dars tugallangan deb belgilandi.");
                }}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Men tushundim
              </Button>
              <Button
                variant="secondary"
                onClick={async () => {
                  await saveProgress({
                    learnerFeedback: "Hali qiyin"
                  });
                  setFeedbackMessage("Bu joy biroz murakkabroq bo‘lishi mumkin. Keling, boshqa formatdan davom etamiz.");
                }}
              >
                <CircleHelp className="mr-2 h-4 w-4" />
                Hali qiyin
              </Button>
            </div>
            {feedbackMessage ? <p className="text-base leading-7 text-[var(--muted)]">{feedbackMessage}</p> : null}
          </Card>

          <Card className="space-y-4">
            <h3 className="text-xl font-semibold">Mos tavsiyalar</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {Object.entries(recommendations).map(([key, value]) => (
                <div key={key} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                  <p className="text-base font-semibold">{key}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <AIHelperPanel lessonId={lesson.id} accessibilityProfile={lesson.description} />
        </div>

        <EmotionalCheckIn
          value={currentEmotion}
          onSubmit={async (value) => {
            await saveProgress({
              emotionalState: value
            });
          }}
        />
      </div>
    </div>
  );
}
