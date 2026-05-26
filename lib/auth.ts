import "server-only";

import { type Role } from "@prisma/client";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { defaultAccessibilitySettings, dashboardPaths } from "@/lib/constants";
import { prisma } from "@/lib/db";
import type { AccessibilityState, SessionUser } from "@/types";

const SESSION_COOKIE = "inclusive-learning-session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = SessionUser & {
  exp: number;
};

function getSecret() {
  return process.env.SESSION_SECRET || "inklyuziv-learning-secret";
}

function toBase64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf-8");
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(user: SessionUser) {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  };

  const encoded = toBase64Url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

function parseSessionToken(token?: string) {
  if (!token) {
    return null;
  }

  const [encoded, providedSignature] = token.split(".");
  if (!encoded || !providedSignature) {
    return null;
  }

  if (sign(encoded) !== providedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encoded)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function setSession(user: SessionUser) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/"
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  return parseSessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function getCurrentUser() {
  const session = await getCurrentSession();

  if (!session) {
    return null;
  }

  return prisma.user.findUnique({
    where: { id: session.id },
    include: {
      accessibilitySettings: true,
      parent: true,
      children: true
    }
  });
}

export async function requireUser(roles?: Role[]) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (roles && !roles.includes(user.role)) {
    redirect(dashboardPaths[user.role]);
  }

  return user;
}

export function getAccessibilityState(
  user:
    | {
        accessibilitySettings: {
          fontScale: AccessibilityState["fontScale"];
          contrastMode: AccessibilityState["contrastMode"];
          dyslexiaFont: boolean;
          reduceMotion: boolean;
          captions: boolean;
          transcript: boolean;
          textToSpeech: boolean;
          audioDescription: boolean;
          readingRuler: boolean;
          letterSpacing: boolean;
          lineHeight: boolean;
          simplifiedUi: boolean;
          easyLanguage: boolean;
          largeControls: boolean;
          keyboardMode: boolean;
          calmMode: boolean;
        } | null;
      }
    | null
    | undefined
): AccessibilityState {
  return {
    ...defaultAccessibilitySettings,
    ...(user?.accessibilitySettings ?? {})
  };
}

export function toSessionUser(user: SessionUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  } satisfies SessionUser;
}
