"use client";

import { useActionState } from "react";

import { submitQuizAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

type QuizQuestion = {
  id: string;
  type: "SINGLE_CHOICE" | "TRUE_FALSE" | "SHORT_ANSWER";
  text: string;
  options: unknown;
};

type QuizPlayerProps = {
  quiz: {
    id: string;
    title: string;
    questions: QuizQuestion[];
  };
};

const initialState: ActionState = {
  status: "idle"
};

function getOptions(options: unknown) {
  return Array.isArray(options) ? options.filter((item): item is string => typeof item === "string") : [];
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [state, action] = useActionState(submitQuizAction, initialState);
  const recommendations = (state.payload?.incorrectRecommendations as string[] | undefined) ?? [];

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Baholash</p>
        <h3 className="text-2xl font-semibold">{quiz.title}</h3>
        <p className="text-sm leading-7 text-muted">
          Har bir savolga javob bering. Natija avtomatik foizda hisoblanadi.
        </p>
      </div>

      <form action={action} className="space-y-6">
        <input type="hidden" name="quizId" value={quiz.id} />

        {quiz.questions.map((question, index) => {
          const options = getOptions(question.options);

          return (
            <fieldset key={question.id} className="space-y-4 rounded-[28px] border border-border p-5">
              <legend className="text-lg font-semibold">
                {index + 1}. {question.text}
              </legend>

              {question.type === "SHORT_ANSWER" ? (
                <input
                  type="text"
                  name={`question-${question.id}`}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                  aria-label={`${index + 1}-savol uchun javob`}
                  required
                />
              ) : (
                <div className="space-y-3">
                  {(question.type === "TRUE_FALSE" ? ["True", "False"] : options).map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-white/75 px-4 py-3"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        className="mt-1 accent-[var(--accent)]"
                        required
                      />
                      <span className="text-sm leading-7">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </fieldset>
          );
        })}

        {state.message ? (
          <div
            className={`space-y-3 rounded-2xl border p-4 ${
              state.status === "error"
                ? "border-rose-200 bg-rose-50 text-rose-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
            aria-live="polite"
          >
            <p className="font-semibold">{state.message}</p>
            {recommendations.length ? (
              <ul className="list-disc space-y-1 pl-5 text-sm leading-7">
                {recommendations.map((recommendation) => (
                  <li key={recommendation}>{recommendation}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}

        <SubmitButton label="Natijani hisoblash" pendingLabel="Tekshirilmoqda..." />
      </form>
    </Card>
  );
}
