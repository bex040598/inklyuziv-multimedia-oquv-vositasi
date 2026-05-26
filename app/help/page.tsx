import { keyboardShortcuts } from "@/lib/constants";
import { Card } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <Card className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          Yordam
        </p>
        <h1 className="text-4xl font-semibold">Platformadan qanday foydalanaman?</h1>
        <p className="text-lg leading-8 text-[var(--muted)]">
          Agar qaysi tugmadan boshlashni bilmay tursangiz, dars sahifasidagi format tanlash blokidan foydalaning. O‘qish shart emas, xohlasangiz tinglab ham boshlashingiz mumkin.
        </p>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-3">
          <h2 className="text-2xl font-semibold">Keyboard shortcuts</h2>
          <div className="space-y-3">
            {keyboardShortcuts.map((item) => (
              <div key={item.keys} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4">
                <p className="font-semibold">{item.keys}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.action}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="space-y-3">
            <h2 className="text-2xl font-semibold">Screen reader uchun</h2>
            <p className="text-base leading-7 text-[var(--muted)]">
              Har bir rasm alt text bilan berilgan. Dars ichida “Rasmda nima bor?” bo‘limi murakkab tasvirlarni yozma shaklda tushuntiradi.
            </p>
          </Card>
          <Card className="space-y-3">
            <h2 className="text-2xl font-semibold">Ota-ona uchun yordam</h2>
            <p className="text-base leading-7 text-[var(--muted)]">
              Natijani foiz bilan baholashdan oldin, farzandingizdan qaysi format qulayroq bo‘lganini so‘rash ko‘proq yordam beradi.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
