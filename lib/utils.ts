import { type LearningMode } from "@prisma/client";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) {
    return "Ma’lumot yo‘q";
  }

  return new Intl.DateTimeFormat("uz-UZ", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

export function formatShortDate(date: Date | string | null | undefined) {
  if (!date) {
    return "Ma’lum emas";
  }

  return new Intl.DateTimeFormat("uz-UZ", {
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

export function average(numbers: number[]) {
  if (!numbers.length) {
    return 0;
  }

  return Math.round((numbers.reduce((sum, value) => sum + value, 0) / numbers.length) * 10) / 10;
}

export function percentage(part: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((part / total) * 100);
}

export function clamp(value: number, min = 0, max = 100) {
  return Math.min(Math.max(value, min), max);
}

export function parseJsonArray<T>(value: unknown) {
  return Array.isArray(value) ? (value as T[]) : [];
}

export function parseJsonRecord<T extends object>(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as T;
  }

  return value as T;
}

export function toSentence(items: string[]) {
  if (!items.length) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} va ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")} va ${items.at(-1)}`;
}

export function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function safeModeLabel(mode: LearningMode | null | undefined) {
  switch (mode) {
    case "READING":
      return "Matn";
    case "LISTENING":
      return "Audio";
    case "VIDEO":
      return "Video";
    case "VISUAL":
      return "Rasmli izoh";
    case "MIXED":
      return "Aralash";
    default:
      return "Aralash";
  }
}

export function minutesLabel(minutes: number) {
  if (minutes < 60) {
    return `${minutes} daqiqa`;
  }

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours} soat ${rest} daqiqa` : `${hours} soat`;
}

export function firstSentence(value: string) {
  return value.split(".").map((part) => part.trim()).find(Boolean) ?? value.trim();
}

export function buildQueryString(input: Record<string, string | undefined>) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(input)) {
    if (value) {
      params.set(key, value);
    }
  }

  return params.toString();
}
