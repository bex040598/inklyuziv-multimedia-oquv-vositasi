"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { demoCredentials, dashboardPaths } from "@/lib/constants";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(values: LoginInput) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });

      const data = (await response.json()) as {
        message?: string;
        errors?: Record<string, string[]>;
        role?: keyof typeof dashboardPaths;
      };

      if (!response.ok) {
        if (data.errors) {
          Object.entries(data.errors).forEach(([field, errors]) => {
            form.setError(field as keyof LoginInput, {
              message: errors[0]
            });
          });
        }

        setMessage(data.message ?? "Kirishda kichik muammo bo‘ldi.");
        return;
      }

      router.push(data.role ? dashboardPaths[data.role] : "/dashboard");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">Kirish</p>
        <h1 className="text-4xl font-semibold">Qaytganingiz yaxshi bo‘ldi</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          O‘zingizga mos darslar, qisqa xulosalar va oldingi sozlamalaringiz shu yerda kutib turibdi.
        </p>
        <div className="grid gap-3">
          {demoCredentials.map((credential) => (
            <button
              key={credential.email}
              type="button"
              onClick={() => {
                form.setValue("email", credential.email);
                form.setValue("password", credential.password);
              }}
              className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4 text-left"
            >
              <span className="block text-base font-semibold">{credential.role} demo</span>
              <span className="mt-1 block text-sm text-[var(--muted)]">{credential.email}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-5">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="text-base font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
              {...form.register("email")}
              aria-invalid={Boolean(form.formState.errors.email)}
              aria-describedby={form.formState.errors.email ? "email-error" : undefined}
            />
            {form.formState.errors.email ? (
              <p id="email-error" className="text-sm text-[var(--danger)]">
                {form.formState.errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-base font-semibold">
              Parol
            </label>
            <div className="flex rounded-[1.5rem] border border-[var(--border)] bg-white">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className="w-full rounded-l-[1.5rem] px-4 py-3 text-base"
                {...form.register("password")}
                aria-invalid={Boolean(form.formState.errors.password)}
                aria-describedby={form.formState.errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-r-[1.5rem] px-3"
              >
                <span className="sr-only">Parolni ko‘rsatish</span>
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {form.formState.errors.password ? (
              <p id="password-error" className="text-sm text-[var(--danger)]">
                {form.formState.errors.password.message}
              </p>
            ) : null}
          </div>

          {message ? <p className="text-sm text-[var(--danger)]">{message}</p> : null}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Kiritilmoqda..." : "Kirish"}
          </Button>
        </form>

        <p className="text-base leading-7 text-[var(--muted)]">
          Hisobingiz yo‘qmi?{" "}
          <Link href="/register" className="font-semibold text-[var(--accent)]">
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </Card>
    </div>
  );
}
