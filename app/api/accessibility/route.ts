import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const data = (await request.json()) as Record<string, boolean>;

  await prisma.accessibilitySettings.upsert({
    where: { userId: user.id },
    update: {
      largeText: Boolean(data.largeText),
      highContrast: Boolean(data.highContrast),
      simplifiedUi: Boolean(data.simplifiedUi),
      dyslexiaFont: Boolean(data.dyslexiaFont),
      focusOutline: Boolean(data.focusOutline),
      reduceMotion: Boolean(data.reduceMotion),
      captions: Boolean(data.captions),
      textToSpeech: Boolean(data.textToSpeech),
      easyLanguage: Boolean(data.easyLanguage)
    },
    create: {
      userId: user.id,
      largeText: Boolean(data.largeText),
      highContrast: Boolean(data.highContrast),
      simplifiedUi: Boolean(data.simplifiedUi),
      dyslexiaFont: Boolean(data.dyslexiaFont),
      focusOutline: Boolean(data.focusOutline),
      reduceMotion: Boolean(data.reduceMotion),
      captions: Boolean(data.captions),
      textToSpeech: Boolean(data.textToSpeech),
      easyLanguage: Boolean(data.easyLanguage)
    }
  });

  return NextResponse.json({ ok: true });
}
