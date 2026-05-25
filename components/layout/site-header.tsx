import Link from "next/link";

import { logoutAction } from "@/app/actions";
import { AccessibilityPanel } from "@/components/accessibility/accessibility-panel";
import { Button } from "@/components/ui/button";
import { roleLabels } from "@/lib/constants";
import type { SessionUser } from "@/types";

type SiteHeaderProps = {
  currentUser: SessionUser | null;
};

export function SiteHeader({ currentUser }: SiteHeaderProps) {
  return (
    <header className="screen-only border-b border-white/60 bg-white/55 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="space-y-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="decorative-only h-11 w-11 rounded-2xl bg-accentSoft" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Inklyuziv platforma
              </p>
              <h1 className="text-xl font-semibold">Inklyuziv Multimedia O‘quv Vositasi</h1>
            </div>
          </Link>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            Nogironligi bo‘lgan shaxslar uchun moslashuvchan, multimedia asosidagi o‘quv muhit.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <nav className="flex flex-wrap items-center gap-3">
            <Link href="/" className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white/60">
              Bosh sahifa
            </Link>
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white/60"
                >
                  Dashboard
                </Link>
                <Link
                  href="/reports"
                  className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white/60"
                >
                  Hisobotlar
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white/60"
                >
                  Kirish
                </Link>
                <Link
                  href="/register"
                  className="rounded-full px-3 py-2 text-sm font-medium hover:bg-white/60"
                >
                  Ro‘yxatdan o‘tish
                </Link>
              </>
            )}
          </nav>

          <div className="flex flex-col gap-3 lg:items-end">
            <AccessibilityPanel />
            {currentUser ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/70 px-4 py-2 text-sm">
                  {currentUser.name} • {roleLabels[currentUser.role]}
                </span>
                <form action={logoutAction}>
                  <Button variant="ghost" type="submit">
                    Chiqish
                  </Button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
