import { requireUser } from "@/lib/auth";
import { getReportData } from "@/lib/data";
import { ReportView } from "@/components/reports/report-view";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await requireUser();
  const data = await getReportData(user.role, user.id);

  return <ReportView data={data} />;
}
