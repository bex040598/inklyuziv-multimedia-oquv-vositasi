import { Card } from "@/components/ui/card";

type TranscriptPanelProps = {
  title: string;
  content: string;
};

export function TranscriptPanel({ title, content }: TranscriptPanelProps) {
  return (
    <Card className="space-y-3">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-base leading-8 text-[var(--muted)] whitespace-pre-line">{content}</p>
    </Card>
  );
}
