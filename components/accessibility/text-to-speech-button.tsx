"use client";

import { Volume2, VolumeX } from "lucide-react";

import { useAccessibility } from "@/components/providers/accessibility-provider";
import { Button } from "@/components/ui/button";

type TextToSpeechButtonProps = {
  text: string;
  label?: string;
};

export function TextToSpeechButton({
  text,
  label = "Menga o‘qib ber"
}: TextToSpeechButtonProps) {
  const { speak, stop, settings, speechSupported } = useAccessibility();

  if (!speechSupported || !settings.textToSpeech) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="soft" onClick={() => speak(text)}>
        <Volume2 className="mr-2 h-4 w-4" />
        {label}
      </Button>
      <Button variant="ghost" onClick={stop}>
        <VolumeX className="mr-2 h-4 w-4" />
        To‘xtatish
      </Button>
    </div>
  );
}
