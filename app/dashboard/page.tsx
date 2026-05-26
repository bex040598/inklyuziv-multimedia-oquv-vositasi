import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth";
import { dashboardPaths } from "@/lib/constants";

export default async function DashboardPage() {
  const user = await requireUser();
  redirect(dashboardPaths[user.role]);
}
