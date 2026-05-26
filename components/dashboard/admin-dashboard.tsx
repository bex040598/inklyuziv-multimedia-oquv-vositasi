import { updateUserRoleAction } from "@/app/actions";
import { HumanEmptyState } from "@/components/shared/human-empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { roleLabels } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import type { AdminDashboardData } from "@/types";

export function AdminDashboard({ data }: { data: AdminDashboardData }) {
  if (!data.users.length) {
    return (
      <HumanEmptyState
        title="Hali foydalanuvchi yo‘q"
        description="Seed ma’lumotlar yoki yangi hisoblar paydo bo‘lgach, admin panel shu yerda to‘ladi."
      />
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Foydalanuvchilar" value={data.stats.totalUsers} description="Jami hisoblar soni." />
        <StatCard label="Darslar" value={data.stats.totalLessons} description="Kurslar ichidagi jami darslar." />
        <StatCard
          label="Moslashuv rejimi"
          value={data.stats.mostUsedPreset}
          description="Foydalanuvchilar ko‘proq tanlayotgan preset."
        />
        <StatCard
          label="Accessibility health"
          value={`${data.stats.accessibilityHealthScore}%`}
          description="Alt matn, transkript, subtitr va oson matn qamrovi bo‘yicha umumiy ko‘rsatkich."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Foydalanuvchilar va rollar
            </p>
            <h2 className="text-3xl font-semibold">Boshqaruv jadvali</h2>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                  <th className="px-2 py-3">Ism</th>
                  <th className="px-2 py-3">Rol</th>
                  <th className="px-2 py-3">Qo‘shilgan sana</th>
                  <th className="px-2 py-3">Amal</th>
                </tr>
              </thead>
              <tbody>
                {data.users.map((user) => (
                  <tr key={user.id} className="border-b border-[var(--border)]/70">
                    <td className="px-2 py-4">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-[var(--muted)]">{user.email}</p>
                    </td>
                    <td className="px-2 py-4">
                      <StatusBadge>{roleLabels[user.role]}</StatusBadge>
                    </td>
                    <td className="px-2 py-4 text-[var(--muted)]">{formatDate(user.createdAt)}</td>
                    <td className="px-2 py-4">
                      <form action={updateUserRoleAction} className="flex flex-wrap gap-2">
                        <input type="hidden" name="userId" value={user.id} />
                        <select
                          name="role"
                          defaultValue={user.role}
                          className="rounded-full border border-[var(--border)] bg-white px-3 py-2"
                        >
                          {Object.entries(roleLabels).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="rounded-full border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-semibold text-white"
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
        </div>

        <div className="space-y-4">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Qayerda ko‘proq to‘xtab qolishmoqda?
            </p>
            <div className="mt-4 space-y-3">
              {data.stuckLessons.map((lesson) => (
                <div key={lesson.lessonId} className="rounded-[1.5rem] bg-white/80 px-4 py-4">
                  <p className="font-semibold">{lesson.title}</p>
                  <p className="text-sm leading-6 text-[var(--muted)]">
                    {lesson.stopCount} ta foydalanuvchi shu joyda ko‘proq vaqt sarflagan yoki tugatmagan.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Kontent
            </p>
            <div className="mt-4 space-y-3">
              {data.courses.map((course) => (
                <div key={course.id} className="rounded-[1.5rem] bg-white/80 px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold">{course.title}</p>
                    <StatusBadge tone="info">{course.lessons.length} ta dars</StatusBadge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    Muallif: {course.createdBy.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
