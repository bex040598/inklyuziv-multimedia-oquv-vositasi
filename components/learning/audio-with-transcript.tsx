"use client";

import { Card } from "@/components/ui/card";
import { TranscriptPanel } from "@/components/learning/transcript-panel";
import { useAccessibility } from "@/components/providers/accessibility-provider";

type AudioWithTranscriptProps = {
  title: string;
  audioUrl: string;
  transcript?: string | null;
};

export function AudioWithTranscript({ title, audioUrl, transcript }: AudioWithTranscriptProps) {
  const { settings } = useAccessibility();

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <audio controls preload="metadata" data-active-media className="w-full">
          <source src={audioUrl} />
          Brauzer audio ijrosini ocholmadi.
        </audio>
        <p className="text-sm leading-6 text-[var(--muted)]">
          Progress chizig‘i klaviatura bilan ham ishlaydi. Space bilan to‘xtatish yoki davom ettirish mumkin.
        </p>
      </Card>
      {settings.transcript && transcript ? (
        <TranscriptPanel title="Matnni kuzatib borish" content={transcript} />
      ) : null}
    </div>
  );
}
