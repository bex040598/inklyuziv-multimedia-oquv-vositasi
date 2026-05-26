"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const textOptions = [
  {
    label: "Oddiy matn",
    value: "NORMAL",
    note: "Standart ko‘rinish. Istasangiz keyin o‘zgartirasiz."
  },
  {
    label: "Kattaroq matn",
    value: "LARGE",
    note: "Ko‘zni kamroq charchatadi."
  },
  {
    label: "Juda katta matn",
    value: "XLARGE",
    note: "Mayda yozuv bilan qiynalsangiz qulay."
  },
  {
    label: "Ko‘proq bo‘sh joy bilan",
    value: "XLARGE",
    note: "Qatorlar oralig‘i keyingi bosqichda ham kengroq bo‘ladi."
  }
] as const;

const learningOptions = [
  { label: "O‘qib", value: "READING" },
  { label: "Tinglab", value: "LISTENING" },
  { label: "Video orqali", value: "VIDEO" },
  { label: "Rasm va qisqa izohlar bilan", value: "VISUAL" },
  { label: "Aralash usulda", value: "MIXED" }
] as const;

const blockers = [
  "Tez animatsiyalar",
  "Juda uzun matn",
  "Mayda tugmalar",
  "Past kontrast",
  "Murakkab so‘zlar",
  "Shovqinli dizayn"
];

const needs = [
  { label: "Matnni o‘qish qiyin bo‘lsa", value: "reading" },
  { label: "Video ovozini eshitish qiyin bo‘lsa", value: "hearing" },
  { label: "Sichqoncha ishlatish noqulay bo‘lsa", value: "mobility" },
  { label: "Uzoq matn charchatsa", value: "attention" },
  { label: "Murakkab so‘zlar to‘xtatib qo‘ysa", value: "visual" },
  { label: "Ko‘p ma’lumotni eslab qolish qiyin bo‘lsa", value: "memory" }
] as const;

type OnboardingWizardProps = {
  currentRolePath: string;
};

export function OnboardingWizard({ currentRolePath }: OnboardingWizardProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [fontScale, setFontScale] = useState<"NORMAL" | "LARGE" | "XLARGE">("LARGE");
  const [contrastMode, setContrastMode] = useState<"NORMAL" | "HIGH" | "CALM_DARK">("NORMAL");
  const [preferredLearningMode, setPreferredLearningMode] = useState<
    "READING" | "LISTENING" | "VIDEO" | "VISUAL" | "MIXED"
  >("MIXED");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [selectedBlockers, setSelectedBlockers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function finish() {
    setLoading(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fontScale,
          contrastMode,
          preferredLearningMode,
          needs: selectedNeeds,
          blockers: selectedBlockers
        })
      });

      const data = (await response.json()) as { redirectTo?: string };
      router.push(data.redirectTo ?? currentRolePath);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          4 bosqichli moslashuv
        </p>
        <h1 className="text-4xl font-semibold">Sizga qanday o‘rganish qulay?</h1>
        <ProgressBar value={(step / 4) * 100} label={`Bosqich ${step} / 4`} />
      </Card>

      {step === 1 ? (
        <Card className="space-y-4">
          <h2 className="text-3xl font-semibold">Matn sizga qanday qulay?</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {textOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => setFontScale(option.value)}
                className={`rounded-[1.5rem] border px-4 py-4 text-left ${
                  fontScale === option.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-white/80"
                }`}
              >
                <span className="block text-lg font-semibold">{option.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--muted)]">{option.note}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => setStep(2)}>Keyingi bosqich</Button>
            <Button variant="secondary" onClick={() => setContrastMode("HIGH")}>
              Kontrastni ham kuchaytirish
            </Button>
          </div>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card className="space-y-4">
          <h2 className="text-3xl font-semibold">Darsni qanday qabul qilish oson?</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {learningOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setPreferredLearningMode(option.value)}
                className={`rounded-[1.5rem] border px-4 py-4 text-left ${
                  preferredLearningMode === option.value
                    ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                    : "border-[var(--border)] bg-white/80"
                }`}
              >
                <span className="block text-lg font-semibold">{option.label}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              Orqaga
            </Button>
            <Button onClick={() => setStep(3)}>Keyingi bosqich</Button>
          </div>
        </Card>
      ) : null}

      {step === 3 ? (
        <Card className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">Nimalar xalaqit berishi mumkin?</h2>
            <p className="text-base leading-7 text-[var(--muted)]">
              Hammasini tanlash shart emas. Sizga tez-tez to‘siq bo‘ladiganlarini belgilang.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {blockers.map((item) => {
              const active = selectedBlockers.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setSelectedBlockers((current) =>
                      active ? current.filter((value) => value !== item) : [...current, item]
                    )
                  }
                  className={`rounded-[1.5rem] border px-4 py-4 text-left ${
                    active ? "border-[var(--accent)] bg-[var(--accent-soft)]" : "border-[var(--border)] bg-white/80"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold">Yordam bo‘ladigan narsalar</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {needs.map((item) => {
                const active = selectedNeeds.includes(item.value);
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSelectedNeeds((current) =>
                        active ? current.filter((value) => value !== item.value) : [...current, item.value]
                      )
                    }
                    className={`rounded-[1.5rem] border px-4 py-4 text-left ${
                      active
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                        : "border-[var(--border)] bg-white/80"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)}>
              Orqaga
            </Button>
            <Button onClick={() => setStep(4)}>Tayyorlash</Button>
          </div>
        </Card>
      ) : null}

      {step === 4 ? (
        <Card className="space-y-5">
          <h2 className="text-3xl font-semibold">Tayyor. Siz uchun boshlang‘ich muhitni mosladik.</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
              <p className="font-semibold">Matn</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">{fontScale}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
              <p className="font-semibold">Asosiy format</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">{preferredLearningMode}</p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
              <p className="font-semibold">Xalaqit berishi mumkin</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                {selectedBlockers.length ? selectedBlockers.join(", ") : "Hozircha alohida belgi yo‘q"}
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
              <p className="font-semibold">Yordam bo‘ladigan narsalar</p>
              <p className="mt-2 text-base leading-7 text-[var(--muted)]">
                {selectedNeeds.length ? selectedNeeds.join(", ") : "Jarayonda aniqlanadi"}
              </p>
            </div>
          </div>
          <p className="text-base leading-7 text-[var(--muted)]">
            Keyin xohlagan payt buni o‘zgartirasiz. Siz tanlagan sozlamalar keyingi darslarda ham saqlanadi.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(3)}>
              Orqaga
            </Button>
            <Button onClick={finish} disabled={loading}>
              {loading ? "Saqlanmoqda..." : "Boshlash"}
            </Button>
          </div>
        </Card>
      ) : null}
    </div>
  );
}
