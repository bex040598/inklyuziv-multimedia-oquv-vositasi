import { Role } from "@prisma/client";

import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { requireUser } from "@/lib/auth";
import { getStudentDashboardData } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function StudentPage() {
  const user = await requireUser([Role.STUDENT]);
  const data = await getStudentDashboardData(user.id);

  return <StudentDashboard data={data} />;
}
