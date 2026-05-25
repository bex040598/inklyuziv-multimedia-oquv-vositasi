import { updateUserRoleAction } from "@/app/actions";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { roleLabels } from "@/lib/constants";
import { getAdminDashboardData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

type AdminDashboardData = Awaited<ReturnType<typeof getAdminDashboardData>>;

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  if (!data.users.length) {
    return (
      <EmptyState
        title="Foydalanuvchilar hali mavjud emas"
        description="Seed ma’lumotlarini yuklash yoki yangi foydalanuvchilarni ro‘yxatdan o‘tkazish kerak."
      />
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Jami foydalanuvchi"
          value={data.stats.totalUsers}
          description="Platformada ro‘yxatdan o‘tgan barcha foydalanuvchilar."
        />
        <StatCard
          label="Jami dars"
          value={data.stats.totalLessons}
          description="Barcha kurslarga tegishli darslar soni."
        />
        <StatCard
          label="Tugallangan darslar"
          value={data.stats.completedLessons}
          description="O‘quvchilar tomonidan yakunlangan darslar."
        />
        <StatCard
          label="O‘rtacha test natijasi"
          value={`${data.stats.averageQuizScore}%`}
          description="Barcha quiz urinishlarining umumiy o‘rtacha ko‘rsatkichi."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Foydalanuvchilar
            </p>
            <h3 className="text-2xl font-semibold">Rol va hisoblarni boshqarish</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted">
                  <th className="px-2 py-3 font-medium">Foydalanuvchi</th>
                  <th className="px-2 py-3 font-medium">Rol</th>
                  <th className="px-2 py-3 font-medium">Qo‘shilgan sana</th>
                  <th className="px-2 py-3 font-medium">Amal</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id} className="border-b border-border/70 align-top">
                    <td className="px-2 py-4">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </td>
                    <td className="px-2 py-4">
                      <StatusBadge>{roleLabels[user.role]}</StatusBadge>
                    </td>
                    <td className="px-2 py-4 text-muted">{formatDate(user.createdAt)}</td>
                    <td className="px-2 py-4">
                      <form action={updateUserRoleAction} className="flex flex-wrap gap-2">
                        <input type="hidden" name="userId" value={user.id} />
                        <select
                          name="role"
                          defaultValue={user.role}
                          className="rounded-2xl border border-border bg-white px-3 py-2"
                          aria-label={`${user.name} roli`}
                        >
                          {Object.entries(roleLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="rounded-2xl border border-border bg-accentSoft px-3 py-2 font-semibold"
                        >
                          Saqlash
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              Kontent holati
            </p>
            <h3 className="text-2xl font-semibold">Kurs va darslar nazorati</h3>
          </div>

          <div className="space-y-4">
            {data.courses.map((course) => (
              <div key={course.id} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{course.title}</p>
                    <p className="text-sm text-muted">{course.description}</p>
                  </div>
                  <StatusBadge>{course.lessons.length} ta dars</StatusBadge>
                </div>
                <p className="mt-3 text-xs text-muted">
                  Muallif: {course.createdBy.name} • {formatDate(course.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
