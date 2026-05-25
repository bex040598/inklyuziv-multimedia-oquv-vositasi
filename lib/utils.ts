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

export function average(numbers: number[]) {
  if (!numbers.length) {
    return 0;
  }

  const total = numbers.reduce((sum, value) => sum + value, 0);
  return Math.round((total / numbers.length) * 10) / 10;
}

export function percentage(part: number, total: number) {
  if (!total) {
    return 0;
  }

  return Math.round((part / total) * 100);
}

export function parseKeywords(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}
