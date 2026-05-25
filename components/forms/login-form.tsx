"use client";

import Link from "next/link";
import { useActionState } from "react";

import { loginAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import type { ActionState } from "@/types";

const initialState: ActionState = {
  status: "idle"
};

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="text-sm text-danger">{error}</p>;
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <Card className="mx-auto w-full max-w-xl animate-rise">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Kirish</p>
        <h2 className="text-3xl font-semibold">Shaxsiy kabinetga kiring</h2>
        <p className="text-sm leading-7 text-muted">
          O‘zingizga mos dashboard, darslar va hisobotlarni ko‘rish uchun tizimga kiring.
        </p>
      </div>

      <form action={action} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="student@example.com"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          <FieldError error={state.errors?.email} />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-semibold">
            Parol
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Parolingiz"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          <FieldError error={state.errors?.password} />
        </div>

        {state.message ? (
          <p
            className={state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        <SubmitButton label="Kirish" pendingLabel="Kirilmoqda..." />
      </form>

      <p className="mt-6 text-sm text-muted">
        Hisobingiz yo‘qmi?{" "}
        <Link href="/register" className="font-semibold text-accent underline-offset-4 hover:underline">
          Ro‘yxatdan o‘ting
        </Link>
      </p>
    </Card>
  );
}
