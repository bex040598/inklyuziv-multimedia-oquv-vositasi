"use client";

import { useActionState } from "react";

import { createCourseAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { levelOptions } from "@/lib/constants";
import type { ActionState } from "@/types";

const initialState: ActionState = {
  status: "idle"
};

export function CourseForm() {
  const [state, action] = useActionState(createCourseAction, initialState);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">Yangi kurs qo‘shish</h3>
        <p className="text-sm leading-7 text-muted">
          Kurs sarlavhasi, tavsifi va darajasini kiriting.
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="course-title" className="text-sm font-semibold">
            Kurs nomi
          </label>
          <input
            id="course-title"
            name="title"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          {state.errors?.title ? <p className="text-sm text-danger">{state.errors.title}</p> : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="course-description" className="text-sm font-semibold">
            Tavsif
          </label>
          <textarea
            id="course-description"
            name="description"
            rows={4}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          {state.errors?.description ? (
            <p className="text-sm text-danger">{state.errors.description}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="course-level" className="text-sm font-semibold">
            Daraja
          </label>
          <select
            id="course-level"
            name="level"
            defaultValue="BEGINNER"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          >
            {levelOptions.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {state.message ? (
          <p className={state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}>
            {state.message}
          </p>
        ) : null}

        <SubmitButton label="Kurs yaratish" pendingLabel="Saqlanmoqda..." />
      </form>
    </Card>
  );
}
