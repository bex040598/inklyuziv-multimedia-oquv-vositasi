"use client";

import { RotateCcw } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TranscriptPanel } from "@/components/learning/transcript-panel";
import { useAccessibility } from "@/components/providers/accessibility-provider";

type VideoWithCaptionsProps = {
  title: string;
  videoUrl: string;
  captions?: string | null;
  transcript?: string | null;
  audioDescription?: string | null;
};

export function VideoWithCaptions({
  title,
  videoUrl,
  captions,
  transcript,
  audioDescription
}: VideoWithCaptionsProps) {
  const { settings } = useAccessibility();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [speed, setSpeed] = useState(1);

  function setPlaybackRate(nextSpeed: number) {
    setSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {[0.75, 1, 1.25].map((option) => (
              <Button
                key={option}
                variant={speed === option ? "primary" : "secondary"}
                onClick={() => setPlaybackRate(option)}
              >
                {option}x
              </Button>
            ))}
            <Button
              variant="soft"
              onClick={() => {
                if (!videoRef.current) {
                  return;
                }

                videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              10 soniya orqaga
            </Button>
          </div>
        </div>

        <video
          ref={videoRef}
          controls
          preload="metadata"
          data-active-media
          className="w-full rounded-[1.75rem] border border-[var(--border)] bg-slate-950"
        >
          <source src={videoUrl} />
          Brauzer videoni ko‘rsata olmayapti.
        </video>
      </Card>

      <div className="grid gap-4 xl:grid-cols-3">
        {settings.captions && captions ? <TranscriptPanel title="Subtitr" content={captions} /> : null}
        {settings.transcript && transcript ? <TranscriptPanel title="Transkript" content={transcript} /> : null}
        {settings.audioDescription && audioDescription ? (
          <TranscriptPanel title="Audio tavsif" content={audioDescription} />
        ) : null}
      </div>
    </div>
  );
}
