"use client";

import { useActionState } from "react";

import { updateProgressNoteAction } from "@/app/actions";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

type ProgressNoteFormProps = {
  progressId: string;
  teacherComment?: string | null;
  strengths?: string | null;
  improvementAreas?: string | null;
};

const initialState: ActionState = {
  status: "idle"
};

export function ProgressNoteForm({
  progressId,
  teacherComment,
  strengths,
  improvementAreas
}: ProgressNoteFormProps) {
  const [state, action] = useActionState(updateProgressNoteAction, initialState);

  return (
    <form action={action} className="space-y-3 rounded-2xl border border-border p-4">
      <input type="hidden" name="progressId" value={progressId} />

      <div className="space-y-2">
        <label htmlFor={`teacher-comment-${progressId}`} className="text-sm font-semibold">
          O‘qituvchi izohi
        </label>
        <textarea
          id={`teacher-comment-${progressId}`}
          name="teacherComment"
          defaultValue={teacherComment ?? ""}
          rows={3}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`strengths-${progressId}`} className="text-sm font-semibold">
          Kuchli tomonlar
        </label>
        <input
          id={`strengths-${progressId}`}
          name="strengths"
          defaultValue={strengths ?? ""}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor={`improvement-${progressId}`} className="text-sm font-semibold">
          Yaxshilanish yo‘nalishlari
        </label>
        <input
          id={`improvement-${progressId}`}
          name="improvementAreas"
          defaultValue={improvementAreas ?? ""}
          className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm"
        />
      </div>

      {state.message ? (
        <p className={state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}>
          {state.message}
        </p>
      ) : null}

      <SubmitButton
        label="Izohni saqlash"
        pendingLabel="Saqlanmoqda..."
        variant="secondary"
      />
    </form>
  );
}
