"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

import { TextToSpeechButton } from "@/components/accessibility/text-to-speech-button";
import { QuizResultCarefully } from "@/components/learning/quiz-result-carefully";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { QuizResultPayload } from "@/types";

type QuizCardProps = {
  lessonId: string;
  lessonHref: string;
  quiz: {
    id: string;
    title: string;
    friendlyIntro: string;
    questions: Array<{
      id: string;
      type: string;
      text: string;
      easyText: string;
      options: unknown;
      imageUrl?: string | null;
      imageAlt?: string | null;
      audioPromptUrl?: string | null;
    }>;
  };
};

function getOptions(options: unknown) {
  return Array.isArray(options) ? options : [];
}

export function QuizCard({ lessonId, lessonHref, quiz }: QuizCardProps) {
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [result, setResult] = useState<QuizResultPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quizId: quiz.id,
          lessonId,
          answers
        })
      });

      if (!response.ok) {
        const data = (await response.json()) as { message?: string };
        setError(data.message ?? "Mashqni tekshirishda muammo bo‘ldi.");
        return;
      }

      setResult((await response.json()) as QuizResultPayload);
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return <QuizResultCarefully result={result} lessonHref={lessonHref} />;
  }

  return (
    <Card className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Tekshirib ko‘ramiz
        </p>
        <h2 className="text-3xl font-semibold">{quiz.title}</h2>
        <p className="text-base leading-7 text-[var(--muted)]">{quiz.friendlyIntro}</p>
      </div>

      <div className="space-y-5">
        {quiz.questions.map((question, index) => {
          const options = getOptions(question.options);
          const value = answers[question.id];

          return (
            <fieldset key={question.id} className="space-y-4 rounded-[1.75rem] border border-[var(--border)] p-5">
              <legend className="w-full">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-[var(--muted)]">Savol {index + 1}</p>
                  <p className="text-xl font-semibold">{question.text}</p>
                  <p className="text-base leading-7 text-[var(--muted)]">{question.easyText}</p>
                  <TextToSpeechButton text={`${question.text}. ${question.easyText}`} label="Savolni o‘qib ber" />
                </div>
              </legend>

              {question.audioPromptUrl ? (
                <audio controls preload="metadata" data-active-media className="w-full">
                  <source src={question.audioPromptUrl} />
                </audio>
              ) : null}

              {question.imageUrl ? (
                <img
                  src={question.imageUrl}
                  alt={question.imageAlt ?? "Savol rasmi"}
                  className="max-h-64 rounded-[1.5rem] border border-[var(--border)] object-cover"
                />
              ) : null}

              {question.type === "SHORT_ANSWER" ? (
                <input
                  type="text"
                  value={typeof value === "string" ? value : ""}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: event.target.value
                    }))
                  }
                  className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                />
              ) : question.type === "ORDERING" ? (
                <div className="space-y-3">
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                    <p className="text-sm leading-6 text-[var(--muted)]">
                      Variantlarni tartiblab, vergul bilan yozing.
                    </p>
                    <ol className="mt-3 space-y-2 text-base">
                      {options.map((option) => (
                        <li key={String(option)}>• {String(option)}</li>
                      ))}
                    </ol>
                  </div>
                  <textarea
                    rows={3}
                    value={typeof value === "string" ? value : ""}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value
                      }))
                    }
                    className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                    placeholder="Masalan: Xavfsizlikni tekshirish, Kompyuterni yoqish, Ekrandagi yozuvni o‘qish"
                  />
                </div>
              ) : question.type === "MATCHING" ? (
                <div className="space-y-3">
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                    <p className="text-sm leading-6 text-[var(--muted)]">
                      Juftliklarni `chap = o‘ng` ko‘rinishida yozing. Har juftlikni yangi qatordan yoki `;` bilan ajratsangiz bo‘ladi.
                    </p>
                    <ul className="mt-3 space-y-2 text-base">
                      {options.map((option, optionIndex) => (
                        <li key={optionIndex}>
                          {(option as { left?: string }).left} = {(option as { right?: string }).right}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <textarea
                    rows={4}
                    value={typeof value === "string" ? value : ""}
                    onChange={(event) =>
                      setAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value
                      }))
                    }
                    className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                    placeholder="Masalan: Parolni aytish = Xavfli; Parolni yashirin saqlash = To‘g‘ri"
                  />
                </div>
              ) : question.type === "MULTIPLE_CHOICE" ? (
                <div className="grid gap-3">
                  {options.map((option) => {
                    const label = typeof option === "string" ? option : String(option);
                    const currentValues = Array.isArray(value) ? value : [];
                    const checked = currentValues.includes(label);
                    return (
                      <label
                        key={label}
                        className="flex min-h-12 items-start gap-3 rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => {
                            setAnswers((current) => {
                              const existing = Array.isArray(current[question.id]) ? (current[question.id] as string[]) : [];
                              return {
                                ...current,
                                [question.id]: event.target.checked
                                  ? [...existing, label]
                                  : existing.filter((item) => item !== label)
                              };
                            });
                          }}
                          className="mt-1 h-5 w-5 accent-[var(--accent)]"
                        />
                        <span className="text-base leading-7">{label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="grid gap-3">
                  {options.map((option) => {
                    const normalized =
                      typeof option === "string"
                        ? { label: option, value: option, image: null }
                        : {
                            label: String((option as { label?: string }).label ?? ""),
                            value: String((option as { value?: string }).value ?? (option as { label?: string }).label ?? ""),
                            image: (option as { image?: string }).image ?? null
                          };
                    return (
                      <label
                        key={normalized.value}
                        className="flex min-h-12 gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4"
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={normalized.value}
                          checked={value === normalized.value}
                          onChange={(event) =>
                            setAnswers((current) => ({
                              ...current,
                              [question.id]: event.target.value
                            }))
                          }
                          className="mt-1 h-5 w-5 accent-[var(--accent)]"
                        />
                        <div className="space-y-2">
                          <span className="block text-base leading-7">{normalized.label}</span>
                          {normalized.image ? (
                            <img
                              src={normalized.image}
                              alt={normalized.label}
                              className="max-h-44 rounded-[1rem] border border-[var(--border)] object-cover"
                            />
                          ) : null}
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </fieldset>
          );
        })}
      </div>

      {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}

      <Button onClick={submit} disabled={loading}>
        {loading ? "Tekshirilmoqda..." : "Javoblarni saqlash"}
      </Button>
    </Card>
  );
}
