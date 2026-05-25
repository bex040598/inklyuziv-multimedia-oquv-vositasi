import "server-only";

import { Role } from "@prisma/client";
import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { defaultAccessibilitySettings } from "@/lib/constants";
import { prisma } from "@/lib/db";
import type { AccessibilityState, SessionUser } from "@/types";

const SESSION_COOKIE = "inclusive-platform-session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = SessionUser & {
  exp: number;
};

function getSecret() {
  return process.env.SESSION_SECRET || "temporary-inklyuziv-secret";
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

function sign(unsignedValue: string) {
  return createHmac("sha256", getSecret()).update(unsignedValue).digest("hex");
}

export function createSessionToken(user: SessionUser) {
  const payload: SessionPayload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function parseSessionToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [encodedPayload, providedSignature] = token.split(".");

  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);

  if (expectedSignature !== providedSignature) {
    return null;
  }

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as SessionPayload;

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
    path: "/",
    maxAge: SESSION_DURATION_SECONDS
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
    redirect("/dashboard");
  }

  return user;
}

export function getAccessibilityState(
  user:
    | {
        accessibilitySettings:
          | {
              largeText: boolean;
              highContrast: boolean;
              simplifiedUi: boolean;
              dyslexiaFont: boolean;
              focusOutline: boolean;
              reduceMotion: boolean;
              captions: boolean;
              textToSpeech: boolean;
              easyLanguage: boolean;
            }
          | null;
      }
    | null
    | undefined
): AccessibilityState {
  return {
    ...defaultAccessibilitySettings,
    ...(user?.accessibilitySettings ?? {})
  };
}
