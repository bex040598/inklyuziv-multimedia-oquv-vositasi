import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  "Matn, audio, video, rasm va subtitrlarni bir joyda boshqarish",
  "Rolga mos dashboard: admin, o‘qituvchi, o‘quvchi va ota-ona",
  "Accessibility sozlamalari: katta shrift, kontrast, oson til va TTS",
  "Quiz, progress kuzatuvi va hisobotlarni chop etish rejimi"
];

const promises = [
  "Semantik HTML va klaviatura bilan boshqarish",
  "Har bir rasm uchun alt matn va subtitr ko‘rinishi",
  "Rang bilan berilgan ma’lumotni matn bilan ham tushuntirish",
  "Reduce motion va focus outline kabi foydali moslamalar"
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="animate-rise overflow-hidden p-8 lg:p-10">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Ilmiy ishga mos MVP
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight lg:text-6xl">
              Nogironligi bo‘lgan shaxslarni rivojlantirishga xizmat qiluvchi inklyuziv o‘quv
              platforma
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              “Inklyuziv Multimedia O‘quv Vositasi” darslar, testlar, individual kuzatuv va
              accessibility sozlamalarini bitta qulay muhitda jamlaydi.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/register">
                <Button>Boshlash</Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary">Kirish</Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="animate-rise space-y-5 [animation-delay:120ms]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
            Asosiy imkoniyatlar
          </p>
          <ul className="space-y-4 text-sm leading-7">
            {features.map((feature) => (
              <li key={feature} className="rounded-2xl border border-border bg-white/80 px-4 py-4">
                {feature}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">1-bosqich</p>
          <h3 className="text-2xl font-semibold">Moslashuvchan kirish</h3>
          <p className="text-sm leading-7 text-muted">
            Oddiy login va register, foydalanuvchi roli va ehtiyojiga mos shaxsiy muhit.
          </p>
        </Card>
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">2-bosqich</p>
          <h3 className="text-2xl font-semibold">Multimedia darslar</h3>
          <p className="text-sm leading-7 text-muted">
            Video, audio, subtitr, oson matn va nogironlik turiga mos tavsiyalar bilan darslar.
          </p>
        </Card>
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">3-bosqich</p>
          <h3 className="text-2xl font-semibold">Rivojlanishni kuzatish</h3>
          <p className="text-sm leading-7 text-muted">
            Test natijalari, kuchli tomonlar, yaxshilanish nuqtalari va ota-ona hisobotlari.
          </p>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Accessibility va WCAG
          </p>
          <h3 className="text-3xl font-semibold">Inklyuzivlik platforma markazida</h3>
          <p className="text-sm leading-7 text-muted">
            Dastur nafaqat o‘quv kontentini ko‘rsatadi, balki foydalanuvchining individual
            ehtiyojlariga mos ravishda interfeysni ham o‘zgartira oladi.
          </p>
        </Card>
        <Card>
          <ul className="grid gap-4 md:grid-cols-2">
            {promises.map((item) => (
              <li key={item} className="rounded-2xl border border-border bg-white/80 p-5 text-sm">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
