"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { learningModeLabels, learningNeeds } from "@/lib/constants";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const roles = [
  { value: "STUDENT", title: "O‘quvchi", note: "Darsni o‘qish, tinglash va mashq qilish uchun." },
  { value: "TEACHER", title: "O‘qituvchi", note: "O‘quvchini kuzatish va darsni moslashtirish uchun." },
  { value: "PARENT", title: "Ota-ona", note: "Farzandingizning ritmini tinch kuzatish uchun." }
] as const;

export function RegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
      disabilityProfile: "",
      preferredLearningMode: "MIXED",
      childEmail: ""
    }
  });

  const role = form.watch("role");

  async function onSubmit(values: RegisterInput) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
        redirectTo?: string;
      };

      if (!response.ok) {
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, errors]) => {
            form.setError(field as keyof RegisterInput, {
              message: errors[0]
            });
          });
        }
        setMessage(data.message ?? "Ro‘yxatdan o‘tishda muammo bo‘ldi.");
        return;
      }

      router.push(data.redirectTo ?? "/onboarding");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Yangi boshlanish
        </p>
        <h1 className="text-4xl font-semibold">Sizga qulay yo‘lni birga tanlaymiz</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Bu yerda hammasi birdan talab qilinmaydi. Avval rol, keyin qanday o‘rganish qulayligi haqida qisqa ma’lumot kifoya.
        </p>
      </Card>

      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 xl:grid-cols-[1fr_1.2fr]" noValidate>
        <Card className="space-y-4">
          <h2 className="text-2xl font-semibold">Rolni tanlang</h2>
          <div className="grid gap-3">
            {roles.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => form.setValue("role", item.value)}
                className={`rounded-[1.5rem] border px-4 py-4 text-left ${
                  role === item.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-white/80"
                }`}
              >
                <span className="block text-lg font-semibold">{item.title}</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{item.note}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-base font-semibold">
                Ism
              </label>
              <input
                id="name"
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                {...form.register("name")}
              />
              <p className="text-sm text-[var(--danger)]">{form.formState.errors.name?.message}</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-base font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                {...form.register("email")}
              />
              <p className="text-sm text-[var(--danger)]">{form.formState.errors.email?.message}</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="password" className="text-base font-semibold">
                Parol
              </label>
              <input
                id="password"
                type="password"
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                {...form.register("password")}
              />
              <p className="text-sm text-[var(--danger)]">{form.formState.errors.password?.message}</p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="preferredLearningMode" className="text-base font-semibold">
                Darsni qanday qabul qilish oson?
              </label>
              <select
                id="preferredLearningMode"
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                {...form.register("preferredLearningMode")}
              >
                {Object.entries(learningModeLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="disabilityProfile" className="text-base font-semibold">
                Qisqacha ehtiyoj yoki eslatma
              </label>
              <textarea
                id="disabilityProfile"
                rows={4}
                className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                placeholder="Masalan: matn cho‘zilib ketsa audio bilan boshlash qulay."
                {...form.register("disabilityProfile")}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <p className="text-base font-semibold">Ko‘proq qaysi yordam sizga yaqin?</p>
              <div className="grid gap-3 md:grid-cols-2">
                {learningNeeds.map((need) => (
                  <div key={need.key} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                    <p className="font-semibold">{need.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{need.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {role === "PARENT" ? (
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="childEmail" className="text-base font-semibold">
                  Farzand emaili
                </label>
                <input
                  id="childEmail"
                  type="email"
                  className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
                  placeholder="Agar hozir bog‘lash qulay bo‘lsa kiriting"
                  {...form.register("childEmail")}
                />
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Keyinroq ham ulash mumkin. Hozircha bo‘sh qoldirsangiz ham bo‘ladi.
                </p>
                <p className="text-sm text-[var(--danger)]">{form.formState.errors.childEmail?.message}</p>
              </div>
            ) : null}
          </div>

          {message ? <p className="text-sm text-[var(--danger)]">{message}</p> : null}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Yaratilmoqda..." : "Davom etish"}
          </Button>
          <p className="text-base leading-7 text-[var(--muted)]">
            Avvaldan hisobingiz bormi?{" "}
            <Link href="/login" className="font-semibold text-[var(--accent)]">
              Kirish
            </Link>
          </p>
        </Card>
      </form>
    </div>
  );
}
