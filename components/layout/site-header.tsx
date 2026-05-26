import Link from "next/link";

import { logoutAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { dashboardPaths, roleLabels, siteTitle } from "@/lib/constants";
import type { SessionUser } from "@/types";

type SiteHeaderProps = {
  currentUser: SessionUser | null;
};

export function SiteHeader({ currentUser }: SiteHeaderProps) {
  return (
    <header className="screen-only sticky top-0 z-30 border-b border-white/60 bg-[var(--surface)]/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="flex items-center gap-4">
          <div className="decorative-only h-14 w-14 rounded-[1.5rem] bg-[linear-gradient(135deg,#dfeef5,#ffe4b5)]" />
          <div className="space-y-1">
            <Link href="/" className="text-xl font-semibold">
              {siteTitle}
            </Link>
            <p className="max-w-xl text-sm leading-6 text-[var(--muted)]">
              Har bir o‘quvchi o‘z uslubida o‘rganadi.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <Link href="/" className="rounded-full px-3 py-2 hover:bg-white/70">
              Bosh sahifa
            </Link>
            <Link href="/courses" className="rounded-full px-3 py-2 hover:bg-white/70">
              Darslar
            </Link>
            <Link href="/help" className="rounded-full px-3 py-2 hover:bg-white/70">
              Yordam
            </Link>
            {currentUser ? (
              <>
                <Link
                  href={dashboardPaths[currentUser.role]}
                  className="rounded-full px-3 py-2 hover:bg-white/70"
                >
                  Dashboard
                </Link>
                <Link href="/reports" className="rounded-full px-3 py-2 hover:bg-white/70">
                  Hisobot
                </Link>
                <Link
                  href="/settings/accessibility"
                  className="rounded-full px-3 py-2 hover:bg-white/70"
                >
                  Sozlamalar
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-full px-3 py-2 hover:bg-white/70">
                  Kirish
                </Link>
                <Link href="/register" className="rounded-full px-3 py-2 hover:bg-white/70">
                  Ro‘yxatdan o‘tish
                </Link>
              </>
            )}
          </nav>

          {currentUser ? (
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-sm">
                {currentUser.name} • {roleLabels[currentUser.role]}
              </span>
              <form action={logoutAction}>
                <Button variant="secondary" type="submit">
                  Chiqish
                </Button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
