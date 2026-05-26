import { accessibilityPresets } from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AccessibilitySettingsPage() {
  await requireUser();

  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Accessibility sozlamalari
        </p>
        <h1 className="text-4xl font-semibold">Barcha moslashuvlar bir joyda</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          O‘ng pastdagi “Moslash” tugmasi bilan barcha sozlamalarni shu sahifadan ham boshqarishingiz mumkin.
        </p>
      </Card>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {accessibilityPresets.map((preset) => (
          <Card key={preset.id} className="space-y-3">
            <h2 className="text-2xl font-semibold">{preset.title}</h2>
            <p className="text-base leading-7 text-[var(--muted)]">{preset.description}</p>
          </Card>
        ))}
      </section>

      <Card className="space-y-3">
        <h2 className="text-2xl font-semibold">Live preview</h2>
        <p className="text-base leading-8">
          Matn ko‘zingizga mayda ko‘rinyaptimi? Kattalashtiramiz. Video shart emas. Shu darsni matn yoki audio orqali ham ko‘rishingiz mumkin.
        </p>
      </Card>
    </div>
  );
}
