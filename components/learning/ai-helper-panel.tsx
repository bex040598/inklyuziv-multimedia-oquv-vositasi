"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { SpeechToTextInput } from "@/components/accessibility/speech-to-text-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AIExplainResponse } from "@/types";

type AIHelperPanelProps = {
  lessonId: string;
  accessibilityProfile?: string | null;
};

const actions = [
  { mode: "simplify", label: "Qisqaroq tushuntir" },
  { mode: "example", label: "Misol bilan tushuntir" },
  { mode: "summarize", label: "Qisqa xulosa ber" },
  { mode: "quiz-help", label: "Mashqdagi xatoni tushuntir" },
  { mode: "next-step", label: "Keyingi eng yengil qadam" }
] as const;

export function AIHelperPanel({ lessonId, accessibilityProfile }: AIHelperPanelProps) {
  const [response, setResponse] = useState<AIExplainResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  async function ask(mode: (typeof actions)[number]["mode"]) {
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lessonId,
          mode,
          userText: question || undefined,
          accessibilityProfile
        })
      });

      const data = (await res.json()) as AIExplainResponse;
      setResponse(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold">Dars yordamchisi</h3>
          <p className="text-base leading-7 text-[var(--muted)]">
            Mavzuni yengilroq yo‘l bilan ko‘rib chiqamiz.
          </p>
        </div>
      </div>

      <SpeechToTextInput
        value={question}
        onChange={setQuestion}
        placeholder="Agar xohlasangiz savolingizni yozing yoki gapirib ayting."
      />

      <div className="flex flex-wrap gap-3">
        {actions.map((action) => (
          <Button key={action.mode} variant="secondary" onClick={() => ask(action.mode)}>
            {action.label}
          </Button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm leading-6 text-[var(--muted)]">Javob tayyorlanmoqda...</p>
      ) : null}

      {response ? (
        <div className="space-y-3 rounded-[1.75rem] border border-[var(--border)] bg-white/80 p-4">
          <p className="text-base leading-8">{response.message}</p>
          {response.easierVersion ? (
            <div className="rounded-[1.25rem] bg-[var(--accent-soft)]/60 p-3">
              <p className="text-sm font-semibold">Yana ham soddalashtirilgan ko‘rinish</p>
              <p className="mt-2 text-base leading-7">{response.easierVersion}</p>
            </div>
          ) : null}
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm leading-6 text-[var(--muted)]">{response.suggestedAction}</p>
            <Button variant="soft" onClick={() => ask("simplify")}>
              Yana ham soddalashtiraymi?
            </Button>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
