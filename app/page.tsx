import Link from "next/link";
import { ArrowRight, Headphones, Keyboard, Subtitles, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeroPreview } from "@/components/shared/hero-preview";
import { getHomePageData } from "@/lib/data";
import { safeModeLabel } from "@/lib/utils";

export default async function HomePage() {
  const featuredCourses = await getHomePageData();

  return (
    <div className="space-y-12">
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="space-y-6 p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Shaxsiy o‘rganish muhiti
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight lg:text-6xl">
            Har bir o‘quvchi o‘z uslubida o‘rganadi
          </h1>
          <p className="max-w-3xl text-xl leading-9 text-[var(--muted)]">
            Matnni kattalashtiring, darsni tinglang, subtitr bilan ko‘ring yoki oson tildagi izohdan boshlang. Bu yerda o‘rganish sizga moslashadi.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/register" className="inline-flex">
              <Button>
                Menga moslab boshlash
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/courses" className="inline-flex">
              <Button variant="secondary">Darslarni ko‘rish</Button>
            </Link>
            <Link href="/login" className="inline-flex">
              <Button variant="ghost">Kirish</Button>
            </Link>
          </div>
        </Card>
        <HeroPreview />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Avval sizni tushunamiz
            </p>
            <h2 className="text-3xl font-semibold">Nimalar yordam berishi mumkin?</h2>
          </div>
          <div className="grid gap-3">
            {[
              "Matnni o‘qish qiyin bo‘lsa",
              "Video ovozini eshitish qiyin bo‘lsa",
              "Sichqoncha ishlatish noqulay bo‘lsa",
              "Uzoq matn charchatsa",
              "Tez harakatlanuvchi animatsiyalar bezovta qilsa"
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-4 text-base">
                {item}
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Bir dars — bir nechta yo‘l
            </p>
            <h2 className="text-3xl font-semibold">Bitta mavzuni 5 xil formatda oching</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Type, title: "O‘qish rejimi" },
              { icon: Headphones, title: "Tinglash rejimi" },
              { icon: Subtitles, title: "Video + subtitr" },
              { icon: Keyboard, title: "Oson til rejimi" },
              { icon: ArrowRight, title: "Rasmli qisqa izoh" }
            ].map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-[var(--border)] bg-white/80 p-4">
                <item.icon className="h-5 w-5" />
                <p className="mt-3 text-lg font-semibold">{item.title}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Ota-ona va o‘qituvchi uchun
          </p>
          <h2 className="text-2xl font-semibold">Qattiq nazorat emas, xotirjam kuzatuv</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            “Nechta xato qildi?” degan savoldan ko‘ra, “qaysi format yengilroq bo‘ldi?” degan kuzatuv muhimroq.
          </p>
        </Card>
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Platforma tushuntiradi
          </p>
          <h2 className="text-2xl font-semibold">Ovoz chiqaradi, subtitr beradi, sekinlashtiradi</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            TTS, transkript, audio tavsif, diqqatni jamlash rejimi va klaviatura boshqaruvi bir joyda ishlaydi.
          </p>
        </Card>
        <Card className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Dars yordamchisi
          </p>
          <h2 className="text-2xl font-semibold">Murakkab joyni boshqacha yo‘l bilan ko‘rsatadi</h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            Qisqaroq tushuntirish, misol, xulosa yoki keyingi eng yengil qadamni taklif qiladi.
          </p>
        </Card>
      </section>

      <section className="space-y-5">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
            Boshlash uchun kurslar
          </p>
          <h2 className="text-3xl font-semibold">Bugun ko‘rish mumkin bo‘lgan yo‘llar</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{course.title}</h3>
                <p className="text-base leading-7 text-[var(--muted)]">{course.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {course.recommendedModes.map((mode) => (
                  <span key={mode} className="rounded-full bg-[var(--accent-soft)] px-3 py-2 text-sm font-semibold">
                    {safeModeLabel(mode)}
                  </span>
                ))}
              </div>
              <Link href={`/courses/${course.id}`} className="inline-flex text-sm font-semibold text-[var(--accent)]">
                Kursni ko‘rish
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
