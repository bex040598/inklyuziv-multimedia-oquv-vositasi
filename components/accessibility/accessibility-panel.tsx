"use client";

import { useAccessibility } from "@/components/providers/accessibility-provider";
import { Card } from "@/components/ui/card";

const items = [
  {
    key: "largeText",
    title: "Katta shrift",
    description: "Matn o‘qishni yengillashtirish uchun shrift hajmini kattalashtiradi."
  },
  {
    key: "highContrast",
    title: "Yuqori kontrast",
    description: "Ranglar o‘rtasidagi farqni kuchaytiradi."
  },
  {
    key: "simplifiedUi",
    title: "Oddiy interfeys",
    description: "Bezaksiz va diqqatni kam chalg‘ituvchi ko‘rinish beradi."
  },
  {
    key: "dyslexiaFont",
    title: "Dyslexia-friendly shrift",
    description: "Harflarni ajratishni yengillashtiruvchi shrift rejimi."
  },
  {
    key: "focusOutline",
    title: "Focus outline",
    description: "Klaviatura bilan boshqarishda faol elementni aniq ko‘rsatadi."
  },
  {
    key: "textToSpeech",
    title: "Matnni ovoz chiqarib o‘qish",
    description: "Kerakli joylarda matnni tinglash imkonini yoqadi."
  },
  {
    key: "captions",
    title: "Subtitrlarni ko‘rsatish",
    description: "Video va audio bloklarda subtitr matnini faol saqlaydi."
  },
  {
    key: "reduceMotion",
    title: "Animatsiyani kamaytirish",
    description: "Harakatlanuvchi effektlarni minimal darajaga tushiradi."
  },
  {
    key: "easyLanguage",
    title: "Oson til rejimi",
    description: "Murakkab matnlar o‘rniga soddalashtirilgan versiyalarni ko‘rsatadi."
  }
] as const;

export function AccessibilityPanel() {
  const { settings, updateSetting } = useAccessibility();

  return (
    <details className="w-full max-w-sm">
      <summary className="cursor-pointer rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm font-semibold">
        Accessibility sozlamalari
      </summary>
      <Card className="mt-3 space-y-4">
        <p className="text-sm leading-7 text-muted">
          Platformani o‘zingizga moslashtiring. Har bir sozlama istalgan payt yoqilishi yoki
          o‘chirishi mumkin.
        </p>
        <div className="space-y-4">
          {items.map((item) => (
            <label
              key={item.key}
              className="flex items-start justify-between gap-4 rounded-2xl border border-border p-4"
            >
              <span className="space-y-1">
                <span className="block text-sm font-semibold">{item.title}</span>
                <span className="block text-xs leading-6 text-muted">{item.description}</span>
              </span>
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 rounded border-border accent-[var(--accent)]"
                checked={settings[item.key]}
                onChange={(event) => updateSetting(item.key, event.target.checked)}
                aria-label={item.title}
              />
            </label>
          ))}
        </div>
      </Card>
    </details>
  );
}
