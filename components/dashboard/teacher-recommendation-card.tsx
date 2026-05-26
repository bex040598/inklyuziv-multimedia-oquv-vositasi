import { Card } from "@/components/ui/card";

type TeacherRecommendationCardProps = {
  studentName: string;
  message: string;
  suggestion: string;
};

export function TeacherRecommendationCard({
  studentName,
  message,
  suggestion
}: TeacherRecommendationCardProps) {
  return (
    <Card className="space-y-3">
      <p className="text-sm font-semibold text-[var(--muted)]">{studentName}</p>
      <h3 className="text-xl font-semibold">{message}</h3>
      <p className="text-base leading-7 text-[var(--muted)]">{suggestion}</p>
    </Card>
  );
}
