"use client";
/* eslint-disable @next/next/no-img-element */

import { useAccessibility } from "@/components/providers/accessibility-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RecommendationMap } from "@/types";

type MultimediaPlayerProps = {
  title: string;
  content: string;
  easyContent: string;
  audioUrl?: string | null;
  videoUrl?: string | null;
  imageUrl?: string | null;
  imageAlt: string;
  captions?: string | null;
  recommendations?: RecommendationMap | null;
};

const recommendationLabels: Array<{ key: keyof RecommendationMap; title: string }> = [
  { key: "visual", title: "Ko‘rishda qiyinchilik" },
  { key: "hearing", title: "Eshitishda qiyinchilik" },
  { key: "mobility", title: "Harakatlanishda qiyinchilik" },
  { key: "autism", title: "Autizm spektri" },
  { key: "intellectual", title: "Intellektual rivojlanishdagi qiyinchiliklar" }
];

export function MultimediaPlayer({
  title,
  content,
  easyContent,
  audioUrl,
  videoUrl,
  imageUrl,
  imageAlt,
  captions,
  recommendations
}: MultimediaPlayerProps) {
  const { settings, speak, stop } = useAccessibility();
  const activeText = settings.easyLanguage ? easyContent : content;

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Multimedia dars
            </p>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => speak(`${title}. ${activeText}`)}>
              Matnni o‘qish
            </Button>
            <Button variant="ghost" onClick={stop}>
              O‘qishni to‘xtatish
            </Button>
          </div>
        </div>

        <div className="prose-readable rounded-[28px] border border-border bg-white/70 p-5 text-sm leading-8">
          <p>{activeText}</p>
        </div>
      </Card>

      {imageUrl ? (
        <Card className="space-y-3">
          <p className="text-sm font-semibold">Rasmli tushuntirish</p>
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-auto w-full rounded-[24px] border border-border object-cover"
          />
          <p className="text-xs leading-6 text-muted">Alt matn: {imageAlt}</p>
        </Card>
      ) : null}

      {videoUrl ? (
        <Card className="space-y-3">
          <p className="text-sm font-semibold">Video material</p>
          <video
            controls
            preload="metadata"
            className="w-full rounded-[24px] border border-border bg-black"
          >
            <source src={videoUrl} />
            Brauzeringiz video ko‘rsatishni qo‘llab-quvvatlamaydi.
          </video>
          {settings.captions && captions ? (
            <div className="rounded-2xl border border-border bg-white/70 p-4 text-sm leading-7">
              <p className="font-semibold">Subtitr matni</p>
              <p>{captions}</p>
            </div>
          ) : null}
        </Card>
      ) : null}

      {audioUrl ? (
        <Card className="space-y-3">
          <p className="text-sm font-semibold">Audio material</p>
          <audio controls preload="metadata" className="w-full">
            <source src={audioUrl} />
            Brauzeringiz audio tinglashni qo‘llab-quvvatlamaydi.
          </audio>
          {settings.captions && captions ? (
            <div className="rounded-2xl border border-border bg-white/70 p-4 text-sm leading-7">
              <p className="font-semibold">Audio uchun yozma matn</p>
              <p>{captions}</p>
            </div>
          ) : null}
        </Card>
      ) : null}

      {recommendations ? (
        <Card className="space-y-4">
          <p className="text-sm font-semibold">Moslashtirilgan tavsiyalar</p>
          <div className="grid gap-4 md:grid-cols-2">
            {recommendationLabels.map((item) => (
              <div key={item.key} className="rounded-2xl border border-border bg-white/70 p-4">
                <p className="font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {recommendations[item.key] || "Qo‘shimcha tavsiya kiritilmagan."}
                </p>
              </div>
            ))}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
