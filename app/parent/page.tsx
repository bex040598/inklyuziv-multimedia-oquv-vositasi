import { Role } from "@prisma/client";

import { ParentDashboard } from "@/components/dashboard/parent-dashboard";
import { requireUser } from "@/lib/auth";
import { getParentDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ParentPage() {
  const user = await requireUser([Role.PARENT]);
  const data = await getParentDashboardData(user.id);

  return <ParentDashboard data={data} />;
}
