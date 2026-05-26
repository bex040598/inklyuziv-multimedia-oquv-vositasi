import type { Metadata } from "next";

import { AccessibilityPanel } from "@/components/accessibility/accessibility-panel";
import { ReadingRuler } from "@/components/accessibility/reading-ruler";
import { SiteHeader } from "@/components/layout/site-header";
import { AccessibilityProvider } from "@/components/providers/accessibility-provider";
import { SkipToContent } from "@/components/shared/skip-to-content";
import { getAccessibilityState, getCurrentUser } from "@/lib/auth";
import { siteTitle } from "@/lib/constants";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: siteTitle,
  description:
    "Nogironligi bo‘lgan o‘quvchilar, talabalar va kuzatuvchilar uchun shaxsiy o‘rganish muhiti."
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  const accessibilitySettings = getAccessibilityState(user);

  const sessionUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    : null;

  return (
    <html lang="uz" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AccessibilityProvider initialSettings={accessibilitySettings} userId={sessionUser?.id ?? null}>
          <SkipToContent />
          <div className="decorative-only pointer-events-none fixed inset-x-0 top-0 -z-10 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(123,187,214,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,218,164,0.2),transparent_26%)]" />
          <SiteHeader currentUser={sessionUser} />
          <ReadingRuler />
          <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">
            {children}
          </main>
          <AccessibilityPanel />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
