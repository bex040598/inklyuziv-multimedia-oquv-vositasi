import { dashboardPaths } from "@/lib/constants";
import { requireUser } from "@/lib/auth";
import { OnboardingWizard } from "@/components/forms/onboarding-wizard";

export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await requireUser();

  return <OnboardingWizard currentRolePath={dashboardPaths[user.role]} />;
}
