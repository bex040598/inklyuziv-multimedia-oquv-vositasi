import type { Metadata } from "next";

import { AccessibilityProvider } from "@/components/providers/accessibility-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { getAccessibilityState, getCurrentUser } from "@/lib/auth";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Inklyuziv Multimedia O‘quv Vositasi",
  description:
    "Nogironligi bo‘lgan shaxslar uchun inklyuziv, multimedia asosidagi o‘quv platforma."
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
        <AccessibilityProvider
          initialSettings={accessibilitySettings}
          userId={sessionUser?.id ?? null}
        >
          <div className="decorative-only pointer-events-none fixed inset-x-0 top-0 -z-10 h-[380px] rounded-b-[40px] bg-[linear-gradient(135deg,rgba(14,143,131,0.18),transparent_45%,rgba(196,129,26,0.14))]" />
          <SiteHeader currentUser={sessionUser} />
          <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-6">{children}</main>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
