"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren
} from "react";
import { useRouter } from "next/navigation";

import { defaultAccessibilitySettings } from "@/lib/constants";
import type { AccessibilityState } from "@/types";

type AccessibilityContextValue = {
  settings: AccessibilityState;
  panelOpen: boolean;
  shortcutsOpen: boolean;
  updateSetting: <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => void;
  applyPreset: (preset: Partial<AccessibilityState>) => void;
  resetSettings: () => void;
  openPanel: () => void;
  closePanel: () => void;
  openShortcuts: () => void;
  closeShortcuts: () => void;
  speak: (text: string) => void;
  stop: () => void;
  speechSupported: boolean;
};

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const CLASS_FLAGS: Array<keyof AccessibilityState> = [
  "dyslexiaFont",
  "reduceMotion",
  "captions",
  "transcript",
  "textToSpeech",
  "audioDescription",
  "readingRuler",
  "letterSpacing",
  "lineHeight",
  "simplifiedUi",
  "easyLanguage",
  "largeControls",
  "keyboardMode",
  "calmMode"
];

type ProviderProps = PropsWithChildren<{
  initialSettings: AccessibilityState;
  userId?: string | null;
}>;

export function AccessibilityProvider({ children, initialSettings, userId }: ProviderProps) {
  const router = useRouter();
  const [settings, setSettings] = useState<AccessibilityState>(initialSettings);
  const [panelOpen, setPanelOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const hasHydrated = useRef(false);
  const persistTimeout = useRef<number | null>(null);
  const speechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  const persistState = useCallback(
    (nextState: AccessibilityState) => {
      if (typeof window === "undefined") {
        return;
      }

      window.localStorage.setItem("inclusive-a11y-settings-v2", JSON.stringify(nextState));

      if (!userId) {
        return;
      }

      if (persistTimeout.current) {
        window.clearTimeout(persistTimeout.current);
      }

      persistTimeout.current = window.setTimeout(() => {
        void fetch("/api/accessibility", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(nextState)
        });
      }, 250);
    },
    [userId]
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const localValue = window.localStorage.getItem("inclusive-a11y-settings-v2");
    hasHydrated.current = true;

    if (!localValue) {
      return;
    }

    try {
      const parsed = JSON.parse(localValue) as Partial<AccessibilityState>;
      setSettings((current) => ({
        ...current,
        ...parsed
      }));
    } catch {
      window.localStorage.removeItem("inclusive-a11y-settings-v2");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.fontScale = settings.fontScale.toLowerCase();
    root.dataset.contrastMode = settings.contrastMode.toLowerCase();

    for (const key of CLASS_FLAGS) {
      root.classList.toggle(`a11y-${key}`, Boolean(settings[key]));
    }
  }, [settings]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "m") {
        event.preventDefault();
        setPanelOpen((current) => !current);
      }

      if (event.altKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        router.push("/dashboard");
      }

      if (event.altKey && event.key.toLowerCase() === "l") {
        event.preventDefault();
        router.push("/courses");
      }

      if (event.altKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        router.push("/help");
      }

      if (event.key === "Escape") {
        setPanelOpen(false);
        setShortcutsOpen(false);
      }

      if (
        event.code === "Space" &&
        !["INPUT", "TEXTAREA"].includes((event.target as HTMLElement | null)?.tagName ?? "")
      ) {
        const media = document.querySelector<HTMLMediaElement>("audio[data-active-media], video[data-active-media]");
        if (!media) {
          return;
        }

        event.preventDefault();
        if (media.paused) {
          void media.play();
        } else {
          media.pause();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  const updateSetting = useCallback(
    <K extends keyof AccessibilityState>(key: K, value: AccessibilityState[K]) => {
      setSettings((current) => {
        const nextState = {
          ...current,
          [key]: value
        };

        persistState(nextState);
        return nextState;
      });
    },
    [persistState]
  );

  const applyPreset = useCallback(
    (preset: Partial<AccessibilityState>) => {
      setSettings((current) => {
        const nextState = {
          ...current,
          ...preset
        };

        persistState(nextState);
        return nextState;
      });
    },
    [persistState]
  );

  const resetSettings = useCallback(() => {
    setSettings(defaultAccessibilitySettings);
    persistState(defaultAccessibilitySettings);
  }, [persistState]);

  const speak = useCallback(
    (text: string) => {
      if (!speechSupported || !settings.textToSpeech) {
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "uz-UZ";
      utterance.rate = settings.reduceMotion ? 0.9 : 1;
      window.speechSynthesis.speak(utterance);
    },
    [settings.reduceMotion, settings.textToSpeech, speechSupported]
  );

  const stop = useCallback(() => {
    if (!speechSupported) {
      return;
    }

    window.speechSynthesis.cancel();
  }, [speechSupported]);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      settings,
      panelOpen,
      shortcutsOpen,
      updateSetting,
      applyPreset,
      resetSettings,
      openPanel: () => setPanelOpen(true),
      closePanel: () => setPanelOpen(false),
      openShortcuts: () => setShortcutsOpen(true),
      closeShortcuts: () => setShortcutsOpen(false),
      speak,
      stop,
      speechSupported
    }),
    [applyPreset, panelOpen, resetSettings, settings, shortcutsOpen, speak, speechSupported, stop, updateSetting]
  );

  return <AccessibilityContext.Provider value={value}>{children}</AccessibilityContext.Provider>;
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility AccessibilityProvider ichida ishlatilishi kerak.");
  }

  return context;
}
