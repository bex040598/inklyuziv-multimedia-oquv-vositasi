import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { dashboardPaths } from "@/lib/constants";
import { prisma } from "@/lib/db";
import { onboardingSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Avval tizimga kirish kerak." }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = onboardingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Moslashuv qadamlari hali to‘liq ko‘rinmayapti.",
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const needs = new Set(parsed.data.needs);
  const blockers = new Set(parsed.data.blockers);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      preferredLearningMode: parsed.data.preferredLearningMode,
      disabilityProfile: [...needs, ...blockers].join(", ")
    }
  });

  await prisma.accessibilitySettings.upsert({
    where: { userId: user.id },
    update: {
      fontScale: parsed.data.fontScale,
      contrastMode: parsed.data.contrastMode,
      easyLanguage: blockers.has("Murakkab so‘zlar"),
      reduceMotion: blockers.has("Tez animatsiyalar"),
      simplifiedUi: blockers.has("Juda uzun matn") || blockers.has("Shovqinli dizayn"),
      largeControls: blockers.has("Mayda tugmalar"),
      keyboardMode: needs.has("mobility"),
      captions: needs.has("hearing") || parsed.data.preferredLearningMode === "VIDEO",
      transcript: needs.has("hearing") || parsed.data.preferredLearningMode === "LISTENING",
      readingRuler: needs.has("reading"),
      letterSpacing: needs.has("reading"),
      lineHeight: parsed.data.fontScale !== "NORMAL",
      calmMode: blockers.has("Tez animatsiyalar") || blockers.has("Shovqinli dizayn")
    },
    create: {
      userId: user.id,
      fontScale: parsed.data.fontScale,
      contrastMode: parsed.data.contrastMode,
      easyLanguage: blockers.has("Murakkab so‘zlar"),
      reduceMotion: blockers.has("Tez animatsiyalar"),
      simplifiedUi: blockers.has("Juda uzun matn") || blockers.has("Shovqinli dizayn"),
      largeControls: blockers.has("Mayda tugmalar"),
      keyboardMode: needs.has("mobility"),
      captions: needs.has("hearing") || parsed.data.preferredLearningMode === "VIDEO",
      transcript: needs.has("hearing") || parsed.data.preferredLearningMode === "LISTENING",
      textToSpeech: true,
      audioDescription: needs.has("visual"),
      readingRuler: needs.has("reading"),
      letterSpacing: needs.has("reading"),
      lineHeight: parsed.data.fontScale !== "NORMAL",
      dyslexiaFont: needs.has("reading"),
      calmMode: blockers.has("Tez animatsiyalar") || blockers.has("Shovqinli dizayn")
    }
  });

  return NextResponse.json({
    ok: true,
    redirectTo: dashboardPaths[user.role]
  });
}
