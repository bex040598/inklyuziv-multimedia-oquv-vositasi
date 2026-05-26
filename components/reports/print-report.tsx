import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { formatDate } from "@/lib/utils";
import type { ReportPageData } from "@/types";

type PrintReportProps = {
  data: ReportPageData;
};

export function PrintReport({ data }: PrintReportProps) {
  if (!data.activeStudent) {
    return null;
  }

  const completed = data.activeStudent.progressEntries.filter((entry) => entry.completed).length;

  return (
    <div className="space-y-6 print-only">
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">{data.activeStudent.name} uchun hisobot</h1>
        <p className="text-base leading-7 text-[var(--muted)]">
          Davr: {formatDate(data.activeStudent.createdAt)} dan bugungacha
        </p>
        <ProgressBar value={Math.round((completed / Math.max(data.activeStudent.progressEntries.length, 1)) * 100)} label="Tugallangan darslar ulushi" />
      </Card>
      <Card className="space-y-3">
        <h2 className="text-2xl font-semibold">Keyingi 3 ta tavsiya</h2>
        {data.recommendations.slice(0, 3).map((item) => (
          <p key={item} className="text-base leading-7">
            • {item}
          </p>
        ))}
      </Card>
    </div>
  );
}
