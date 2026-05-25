"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren
} from "react";

import type { AccessibilityState } from "@/types";

type AccessibilityContextValue = {
  settings: AccessibilityState;
  updateSetting: (key: keyof AccessibilityState, value: boolean) => void;
  speak: (text: string) => void;
  stop: () => void;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

type ProviderProps = PropsWithChildren<{
  initialSettings: AccessibilityState;
  userId?: string | null;
}>;

const CLASS_MAP: Record<keyof AccessibilityState, string> = {
  largeText: "a11y-large-text",
  highContrast: "a11y-high-contrast",
  simplifiedUi: "a11y-simplified",
  dyslexiaFont: "a11y-dyslexia",
  focusOutline: "a11y-focus-outline",
  reduceMotion: "a11y-reduce-motion",
  captions: "a11y-captions",
  textToSpeech: "a11y-tts",
  easyLanguage: "a11y-easy-language"
};

export function AccessibilityProvider({ children, initialSettings, userId }: ProviderProps) {
  const [settings, setSettings] = useState(initialSettings);
  const initialised = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(CLASS_MAP).forEach(([key, className]) => {
      root.classList.toggle(className, settings[key as keyof AccessibilityState]);
    });
  }, [settings]);

  useEffect(() => {
    if (initialised.current) {
      return;
    }

    initialised.current = true;

    if (!userId) {
      const localData = window.localStorage.getItem("inclusive-a11y-settings");

      if (localData) {
        try {
          setSettings((current) => ({
            ...current,
            ...(JSON.parse(localData) as AccessibilityState)
          }));
        } catch {
          // noto'g'ri local state e'tiborsiz qoldiriladi
        }
      }
    }
  }, [userId]);

  function persist(nextState: AccessibilityState) {
    if (userId) {
      void fetch("/api/accessibility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(nextState)
      });
      return;
    }

    window.localStorage.setItem("inclusive-a11y-settings", JSON.stringify(nextState));
  }

  function updateSetting(key: keyof AccessibilityState, value: boolean) {
    setSettings((current) => {
      const nextState = { ...current, [key]: value };
      persist(nextState);
      return nextState;
    });
  }

  function speak(text: string) {
    if (!settings.textToSpeech || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "uz-UZ";
    window.speechSynthesis.speak(utterance);
  }

  function stop() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
  }

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        speak,
        stop
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error("useAccessibility AccessibilityProvider ichida ishlatilishi kerak.");
  }

  return context;
}
