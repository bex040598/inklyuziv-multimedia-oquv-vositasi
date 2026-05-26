"use client";

import { SlidersHorizontal } from "lucide-react";

import { accessibilityPresets } from "@/lib/constants";
import { useAccessibility } from "@/components/providers/accessibility-provider";
import { AccessibilityPresetCard } from "@/components/accessibility/accessibility-preset-card";
import { FocusTrapModal } from "@/components/shared/focus-trap-modal";
import { KeyboardShortcutsHelp } from "@/components/shared/keyboard-shortcuts-help";

function Toggle({
  title,
  description,
  checked,
  onChange
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex min-h-14 items-start justify-between gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4">
      <span className="space-y-1">
        <span className="block text-base font-semibold">{title}</span>
        <span className="block text-sm leading-6 text-[var(--muted)]">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-6 w-6 rounded border-[var(--border)] accent-[var(--accent)]"
      />
    </label>
  );
}

function OptionGroup<T extends string>({
  title,
  description,
  value,
  options,
  onChange
}: {
  title: string;
  description: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="space-y-3 rounded-[1.75rem] border border-[var(--border)] bg-white/75 p-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm leading-6 text-[var(--muted)]">{description}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold ${
              option.value === value
                ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)]"
                : "border-[var(--border)] bg-white/90 text-[var(--text)]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AccessibilityPanel() {
  const {
    settings,
    panelOpen,
    shortcutsOpen,
    updateSetting,
    applyPreset,
    openPanel,
    closePanel,
    openShortcuts,
    closeShortcuts,
    resetSettings
  } = useAccessibility();

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-base font-semibold shadow-lg"
      >
        <SlidersHorizontal className="h-5 w-5" />
        Moslash
      </button>

      <FocusTrapModal
        open={panelOpen}
        onClose={closePanel}
        side="right"
        title="Menga moslab bering"
        description="Matn ko‘zingizga mayda ko‘rinyaptimi? Kattalashtiramiz. Video shart emas. Shu darsni matn yoki audio orqali ham ko‘rishingiz mumkin."
      >
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">Tayyor rejimlar</h3>
                <p className="text-sm leading-6 text-[var(--muted)]">
                  Hammasini alohida sozlash shart emas. Kerak bo‘lsa, bir tugma bilan boshlaymiz.
                </p>
              </div>
              <button type="button" onClick={resetSettings} className="text-sm font-semibold text-[var(--accent)]">
                Barchasini tiklash
              </button>
            </div>
            <div className="grid gap-4">
              {accessibilityPresets.map((preset) => (
                <AccessibilityPresetCard
                  key={preset.id}
                  title={preset.title}
                  description={preset.description}
                  preview={preset.settings}
                  onApply={() => applyPreset(preset.settings)}
                  active={Object.entries(preset.settings).every(
                    ([key, value]) => settings[key as keyof typeof settings] === value
                  )}
                />
              ))}
            </div>
          </section>

          <OptionGroup
            title="Matn"
            description="Katta matn butun sahifada joy buzilmasdan qo‘llanadi."
            value={settings.fontScale}
            options={[
              { value: "NORMAL", label: "Oddiy" },
              { value: "LARGE", label: "Katta" },
              { value: "XLARGE", label: "Juda katta" }
            ]}
            onChange={(value) => updateSetting("fontScale", value)}
          />

          <OptionGroup
            title="Kontrast"
            description="Rang bilan berilgan ma’lumot matn bilan ham saqlanadi."
            value={settings.contrastMode}
            options={[
              { value: "NORMAL", label: "Oddiy" },
              { value: "HIGH", label: "Yuqori kontrast" },
              { value: "CALM_DARK", label: "Qorong‘i sokin" }
            ]}
            onChange={(value) => updateSetting("contrastMode", value)}
          />

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">O‘qish yordamchisi</h3>
            <Toggle
              title="O‘qish chizig‘i"
              description="Matn ustida harakatlanadigan yo‘naltiruvchi qatlam ko‘rinadi."
              checked={settings.readingRuler}
              onChange={(value) => updateSetting("readingRuler", value)}
            />
            <Toggle
              title="Harflar oralig‘ini kengaytirish"
              description="Harflar bir-biriga yopishib ketmasligi uchun masofa oshiriladi."
              checked={settings.letterSpacing}
              onChange={(value) => updateSetting("letterSpacing", value)}
            />
            <Toggle
              title="Qator oralig‘ini kengaytirish"
              description="Uzun matnni ko‘rish yengillashadi."
              checked={settings.lineHeight}
              onChange={(value) => updateSetting("lineHeight", value)}
            />
            <Toggle
              title="Dyslexia-friendly shrift"
              description="Harflar shakli aniqroq ko‘rinadigan shrift ishlatiladi."
              checked={settings.dyslexiaFont}
              onChange={(value) => updateSetting("dyslexiaFont", value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Diqqat</h3>
            <Toggle
              title="Chalg‘ituvchi bezaklarni yashirish"
              description="Ortiqcha bezaklar kamayadi, asosiy mazmun ko‘proq ochiladi."
              checked={settings.simplifiedUi}
              onChange={(value) => updateSetting("simplifiedUi", value)}
            />
            <Toggle
              title="Animatsiyalarni kamaytirish"
              description="Harakatlar sekinlashadi yoki deyarli to‘xtaydi."
              checked={settings.reduceMotion}
              onChange={(value) => updateSetting("reduceMotion", value)}
            />
            <Toggle
              title="Sokin rejim"
              description="Ranglar va fon bezaklari yumshatiladi."
              checked={settings.calmMode}
              onChange={(value) => updateSetting("calmMode", value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Multimedia</h3>
            <Toggle
              title="Subtitrni doim ko‘rsatish"
              description="Video va audio yonida subtitr bloklari avtomatik ochiladi."
              checked={settings.captions}
              onChange={(value) => updateSetting("captions", value)}
            />
            <Toggle
              title="Transkriptni ko‘rsatish"
              description="Media yonida yozma matn bloklari ochiq turadi."
              checked={settings.transcript}
              onChange={(value) => updateSetting("transcript", value)}
            />
            <Toggle
              title="Audio tavsif"
              description="Rasm va videodagi ko‘rinishlar haqida qo‘shimcha matn ko‘rsatiladi."
              checked={settings.audioDescription}
              onChange={(value) => updateSetting("audioDescription", value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Boshqaruv</h3>
            <Toggle
              title="Katta tugmalar"
              description="Bosish maydoni kattalashadi va elementlar orasida ko‘proq joy bo‘ladi."
              checked={settings.largeControls}
              onChange={(value) => updateSetting("largeControls", value)}
            />
            <Toggle
              title="Klaviatura yordam rejimi"
              description="Fokus halqasi kuchayadi va tez yo‘llar foydaliroq ko‘rinadi."
              checked={settings.keyboardMode}
              onChange={(value) => updateSetting("keyboardMode", value)}
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Til</h3>
            <Toggle
              title="Oson til"
              description="Dars matni qisqaroq va soddaroq ko‘rinadi."
              checked={settings.easyLanguage}
              onChange={(value) => updateSetting("easyLanguage", value)}
            />
            <Toggle
              title="Matnni ovoz chiqarib o‘qish"
              description="Menga o‘qib ber tugmalari faol turadi."
              checked={settings.textToSpeech}
              onChange={(value) => updateSetting("textToSpeech", value)}
            />
          </div>

          <div className="rounded-[1.75rem] border border-dashed border-[var(--border)] bg-[var(--accent-soft)]/45 p-4">
            <p className="text-base leading-7">
              Siz tanlagan sozlamalar keyingi darslarda ham saqlanadi.
            </p>
            <button
              type="button"
              onClick={openShortcuts}
              className="mt-3 text-sm font-semibold text-[var(--accent)]"
            >
              Klaviatura qisqa yo‘llarini ko‘rsatish
            </button>
          </div>
        </div>
      </FocusTrapModal>

      <KeyboardShortcutsHelp open={shortcutsOpen} onClose={closeShortcuts} />
    </>
  );
}
