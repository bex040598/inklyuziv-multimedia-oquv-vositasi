import { Role } from "@prisma/client";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { requireUser } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireUser([Role.ADMIN]);
  const data = await getAdminDashboardData();

  return <AdminDashboard data={data} />;
}
