"use client";

import { useActionState } from "react";

import { createLessonAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { levelOptions } from "@/lib/constants";
import type { ActionState } from "@/types";

type LessonFormProps = {
  courses: Array<{
    id: string;
    title: string;
  }>;
};

const initialState: ActionState = {
  status: "idle"
};

export function LessonForm({ courses }: LessonFormProps) {
  const [state, action] = useActionState(createLessonAction, initialState);

  return (
    <Card className="space-y-5">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">Yangi dars qo‘shish</h3>
        <p className="text-sm leading-7 text-muted">
          Matn, oson versiya, multimedia va inkluziv tavsiyalarni birga kiriting.
        </p>
      </div>

      <form action={action} className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="lesson-course" className="text-sm font-semibold">
            Kurs
          </label>
          <select
            id="lesson-course"
            name="courseId"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Kursni tanlang
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          {state.errors?.courseId ? (
            <p className="text-sm text-danger">{state.errors.courseId}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="lesson-level" className="text-sm font-semibold">
            Dars darajasi
          </label>
          <select
            id="lesson-level"
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

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="lesson-title" className="text-sm font-semibold">
            Dars sarlavhasi
          </label>
          <input
            id="lesson-title"
            name="title"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          {state.errors?.title ? <p className="text-sm text-danger">{state.errors.title}</p> : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="lesson-description" className="text-sm font-semibold">
            Qisqa tavsif
          </label>
          <textarea
            id="lesson-description"
            name="description"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="lesson-content" className="text-sm font-semibold">
            Asosiy matn
          </label>
          <textarea
            id="lesson-content"
            name="content"
            rows={6}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="lesson-easy-content" className="text-sm font-semibold">
            Oson o‘qiladigan versiya
          </label>
          <textarea
            id="lesson-easy-content"
            name="easyContent"
            rows={5}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="audioUrl" className="text-sm font-semibold">
            Audio link
          </label>
          <input
            id="audioUrl"
            name="audioUrl"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="videoUrl" className="text-sm font-semibold">
            Video link
          </label>
          <input
            id="videoUrl"
            name="videoUrl"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-semibold">
            Rasm link
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="imageAlt" className="text-sm font-semibold">
            Rasm alt matni
          </label>
          <input
            id="imageAlt"
            name="imageAlt"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="captions" className="text-sm font-semibold">
            Subtitr matni
          </label>
          <textarea
            id="captions"
            name="captions"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="keywords" className="text-sm font-semibold">
            Kalit so‘zlar
          </label>
          <input
            id="keywords"
            name="keywords"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="multimedia, subtitr, motivatsiya"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recommendationVisual" className="text-sm font-semibold">
            Ko‘rishda qiyinchilik uchun tavsiya
          </label>
          <textarea
            id="recommendationVisual"
            name="recommendationVisual"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recommendationHearing" className="text-sm font-semibold">
            Eshitishda qiyinchilik uchun tavsiya
          </label>
          <textarea
            id="recommendationHearing"
            name="recommendationHearing"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recommendationMobility" className="text-sm font-semibold">
            Harakatlanishda qiyinchilik uchun tavsiya
          </label>
          <textarea
            id="recommendationMobility"
            name="recommendationMobility"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="recommendationAutism" className="text-sm font-semibold">
            Autizm spektri uchun tavsiya
          </label>
          <textarea
            id="recommendationAutism"
            name="recommendationAutism"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="recommendationIntellectual" className="text-sm font-semibold">
            Intellektual rivojlanishdagi qiyinchiliklar uchun tavsiya
          </label>
          <textarea
            id="recommendationIntellectual"
            name="recommendationIntellectual"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
          />
        </div>

        {state.message ? (
          <p className={`md:col-span-2 ${state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}`}>
            {state.message}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <SubmitButton label="Darsni saqlash" pendingLabel="Saqlanmoqda..." />
        </div>
      </form>
    </Card>
  );
}
