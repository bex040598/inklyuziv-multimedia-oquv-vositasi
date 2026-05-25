"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { SubmitButton } from "@/components/ui/submit-button";
import { roleOptions } from "@/lib/constants";
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

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, initialState);

  return (
    <Card className="mx-auto w-full max-w-3xl animate-rise">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Ro‘yxatdan o‘tish
        </p>
        <h2 className="text-3xl font-semibold">Platformaga qo‘shiling</h2>
        <p className="text-sm leading-7 text-muted">
          Rolingizni tanlab, o‘zingizga mos ta’lim muhitiga ulaning.
        </p>
      </div>

      <form action={action} className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold">
            To‘liq ism
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          <FieldError error={state.errors?.name} />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
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
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            required
          />
          <FieldError error={state.errors?.password} />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-semibold">
            Rol
          </label>
          <select
            id="role"
            name="role"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            defaultValue="STUDENT"
          >
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <FieldError error={state.errors?.role} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="disabilityProfile" className="text-sm font-semibold">
            Qo‘shimcha ehtiyoj yoki tavsif
          </label>
          <textarea
            id="disabilityProfile"
            name="disabilityProfile"
            rows={3}
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="Masalan: ko‘rishda qiyinchilik, subtitr va katta shrift foydali."
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label htmlFor="childEmail" className="text-sm font-semibold">
            Farzand emaili
          </label>
          <input
            id="childEmail"
            name="childEmail"
            type="email"
            className="w-full rounded-2xl border border-border bg-white px-4 py-3"
            placeholder="Faqat ota-ona roli uchun ixtiyoriy"
          />
          <p className="text-xs leading-6 text-muted">
            Agar ota-ona sifatida ro‘yxatdan o‘tsangiz, bu maydon orqali o‘quvchi bilan bog‘lanish
            mumkin.
          </p>
          <FieldError error={state.errors?.childEmail} />
        </div>

        {state.message ? (
          <p
            className={`md:col-span-2 ${state.status === "error" ? "text-sm text-danger" : "text-sm text-success"}`}
            aria-live="polite"
          >
            {state.message}
          </p>
        ) : null}

        <div className="md:col-span-2">
          <SubmitButton label="Ro‘yxatdan o‘tish" pendingLabel="Yaratilmoqda..." />
        </div>
      </form>

      <p className="mt-6 text-sm text-muted">
        Avval ro‘yxatdan o‘tganmisiz?{" "}
        <Link href="/login" className="font-semibold text-accent underline-offset-4 hover:underline">
          Kirish sahifasiga o‘ting
        </Link>
      </p>
    </Card>
  );
}
