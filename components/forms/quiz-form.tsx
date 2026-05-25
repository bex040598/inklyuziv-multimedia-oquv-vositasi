"use client";

import { useActionState } from "react";

import { createQuizAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

type QuizFormProps = {
  lessons: Array<{
    id: string;
    title: string;
  }>;
};

const initialState: ActionState = {
  status: "idle"
};

const questionTypes = [
  { value: "SINGLE_CHOICE", label: "Bitta javobli test" },
  { value: "TRUE_FALSE", label: "True / False" },
  { value: "SHORT_ANSWER", label: "Qisqa javob" }
];

export function QuizForm({ lessons }: QuizFormProps) {
  const [state, action] = useActionState(createQuizAction, initialState);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">Darsga test qo‘shish</h3>
        <p className="text-sm leading-7 text-muted">
          Kamida 3 ta savol kiritiladi. Agar savol true/false yoki qisqa javob bo‘lsa, variantlar
          ixtiyoriy.
        </p>
      </div>

      <form action={action} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="quiz-lesson" className="text-sm font-semibold">
              Dars
            </label>
            <select
              id="quiz-lesson"
              name="lessonId"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Darsni tanlang
              </option>
              {lessons.map((lesson) => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="quiz-title" className="text-sm font-semibold">
              Test nomi
            </label>
            <input
              id="quiz-title"
              name="title"
              className="w-full rounded-2xl border border-border bg-white px-4 py-3"
              required
            />
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, index) => {
          const questionIndex = index + 1;

          return (
            <div key={questionIndex} className="rounded-[28px] border border-border p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={`questionType${questionIndex}`} className="text-sm font-semibold">
                    {questionIndex}-savol turi
                  </label>
                  <select
                    id={`questionType${questionIndex}`}
                    name={`questionType${questionIndex}`}
                    defaultValue="SINGLE_CHOICE"
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                  >
                    {questionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor={`correctAnswer${questionIndex}`} className="text-sm font-semibold">
                    To‘g‘ri javob
                  </label>
                  <input
                    id={`correctAnswer${questionIndex}`}
                    name={`correctAnswer${questionIndex}`}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                    placeholder="Masalan: B yoki ha"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor={`questionText${questionIndex}`} className="text-sm font-semibold">
                    Savol matni
                  </label>
                  <textarea
                    id={`questionText${questionIndex}`}
                    name={`questionText${questionIndex}`}
                    rows={3}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                    required
                  />
                </div>

                {["A", "B", "C", "D"].map((optionKey) => (
                  <div key={optionKey} className="space-y-2">
                    <label
                      htmlFor={`option${optionKey}${questionIndex}`}
                      className="text-sm font-semibold"
                    >
                      Variant {optionKey}
                    </label>
                    <input
                      id={`option${optionKey}${questionIndex}`}
                      name={`option${optionKey}${questionIndex}`}
                      className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                    />
                  </div>
                ))}

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor={`explanation${questionIndex}`} className="text-sm font-semibold">
                    Izoh yoki tavsiya
                  </label>
                  <textarea
                    id={`explanation${questionIndex}`}
                    name={`explanation${questionIndex}`}
                    rows={3}
                    className="w-full rounded-2xl border border-border bg-white px-4 py-3"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {state.message ? (
          <p className={state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}>
            {state.message}
          </p>
        ) : null}

        <SubmitButton label="Testni saqlash" pendingLabel="Saqlanmoqda..." />
      </form>
    </Card>
  );
}
