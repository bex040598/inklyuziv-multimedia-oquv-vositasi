import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-accentSoft" />
          <div className="h-8 w-3/4 rounded bg-accentSoft" />
          <div className="h-20 rounded bg-accentSoft" />
        </Card>
      ))}
    </div>
  );
}
