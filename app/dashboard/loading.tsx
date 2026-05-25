import { Card } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index} className="animate-pulse space-y-4">
          <div className="h-4 w-24 rounded bg-accentSoft" />
          <div className="h-8 w-2/3 rounded bg-accentSoft" />
          <div className="h-20 rounded bg-accentSoft" />
        </Card>
      ))}
    </div>
  );
}
