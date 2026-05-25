import { Role } from "@prisma/client";

import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { ParentDashboard } from "@/components/dashboard/parent-dashboard";
import { StudentDashboard } from "@/components/dashboard/student-dashboard";
import { TeacherDashboard } from "@/components/dashboard/teacher-dashboard";
import { requireUser } from "@/lib/auth";
import {
  getAdminDashboardData,
  getParentDashboardData,
  getStudentDashboardData,
  getTeacherDashboardData
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">Dashboard</p>
        <h2 className="text-4xl font-semibold">{user.name}, xush kelibsiz</h2>
        <p className="text-sm leading-7 text-muted">
          Rolingizga mos boshqaruv paneli orqali kontent, progress va hisobotlarni ko‘rishingiz mumkin.
        </p>
      </section>

      {user.role === Role.ADMIN ? <AdminDashboard data={await getAdminDashboardData()} /> : null}
      {user.role === Role.TEACHER ? (
        <TeacherDashboard data={await getTeacherDashboardData(user.id)} />
      ) : null}
      {user.role === Role.STUDENT ? (
        <StudentDashboard data={await getStudentDashboardData(user.id)} />
      ) : null}
      {user.role === Role.PARENT ? <ParentDashboard data={await getParentDashboardData(user.id)} /> : null}
    </div>
  );
}
