"use client";

import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type SpeechToTextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
};

type RecognitionConstructor = new () => {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

export function SpeechToTextInput({
  value,
  onChange,
  placeholder = "Savolingizni yozing",
  id,
  name
}: SpeechToTextInputProps) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<InstanceType<RecognitionConstructor> | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    setSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "uz-UZ";
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ")
        .trim();
      if (transcript) {
        onChange(`${value} ${transcript}`.trim());
      }
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognitionRef.current = recognition;
  }, [onChange, value]);

  return (
    <div className="space-y-3">
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white px-4 py-3 text-base"
      />
      {supported ? (
        <Button
          variant="soft"
          onClick={() => {
            if (!recognitionRef.current) {
              return;
            }

            if (listening) {
              recognitionRef.current.stop();
              setListening(false);
              return;
            }

            recognitionRef.current.start();
            setListening(true);
          }}
        >
          {listening ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
          {listening ? "Yozib olinish to‘xtasin" : "Gapirib yozdirish"}
        </Button>
      ) : (
        <p className="text-sm leading-6 text-[var(--muted)]">
          Brauzerda ovozdan matnga funksiyasi topilmadi. Oddiy yozish maydoni ishlashda davom etadi.
        </p>
      )}
    </div>
  );
}
