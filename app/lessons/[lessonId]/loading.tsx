import { Card } from "@/components/ui/card";

export default function LessonLoading() {
  return (
    <div className="space-y-6">
      <Card className="animate-pulse space-y-4">
        <div className="h-4 w-24 rounded bg-accentSoft" />
        <div className="h-9 w-2/3 rounded bg-accentSoft" />
        <div className="h-28 rounded bg-accentSoft" />
      </Card>
      <Card className="animate-pulse space-y-4">
        <div className="h-48 rounded bg-accentSoft" />
      </Card>
    </div>
  );
}
