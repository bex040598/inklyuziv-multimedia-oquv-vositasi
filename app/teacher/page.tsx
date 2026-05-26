import { Role } from "@prisma/client";

import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard";
import { requireUser } from "@/lib/auth";
import { getTeacherDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function TeacherPage() {
  const user = await requireUser([Role.TEACHER]);
  const data = await getTeacherDashboardData(user.id);

  return <TeacherDashboard data={data} />;
}
