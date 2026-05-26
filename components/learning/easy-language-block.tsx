import { Card } from "@/components/ui/card";

type EasyLanguageBlockProps = {
  text: string;
};

export function EasyLanguageBlock({ text }: EasyLanguageBlockProps) {
  return (
    <Card className="space-y-3 border-[var(--accent)] bg-[var(--accent-soft)]/55">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        Oson til
      </p>
      <p className="text-lg leading-9">{text}</p>
    </Card>
  );
}
