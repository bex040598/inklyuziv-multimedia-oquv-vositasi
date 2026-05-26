import { PromptType } from "@prisma/client";
import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { aiExplainSchema } from "@/lib/validations";

type LessonWithHelperContext = {
  id: string;
  title: string;
  content: string;
  easyContent: string;
  shortSummary: string;
  quiz: {
    questions: Array<{
      easyExplanation: string;
    }>;
  } | null;
};

function mapPromptType(mode: "simplify" | "example" | "summarize" | "quiz-help" | "next-step") {
  switch (mode) {
    case "simplify":
      return PromptType.SIMPLIFY;
    case "example":
      return PromptType.EXAMPLE;
    case "summarize":
      return PromptType.SUMMARIZE;
    case "quiz-help":
      return PromptType.QUIZ_HELP;
    case "next-step":
      return PromptType.NEXT_STEP;
  }
}

function buildFallback(mode: string, lesson: LessonWithHelperContext) {
  if (mode === "simplify") {
    return {
      message: lesson.easyContent,
      suggestedAction: "Agar xohlasangiz, shu darsni audio yoki rasmli izoh rejimida ham ochamiz.",
      easierVersion: lesson.shortSummary
    };
  }

  if (mode === "example") {
    return {
      message: `Keling, buni oddiy misol bilan ko‘ramiz. ${lesson.shortSummary}`,
      suggestedAction: "Endi shu misolni dars ichidagi rasmli izoh bilan solishtirib ko‘ring.",
      easierVersion: lesson.easyContent
    };
  }

  if (mode === "quiz-help") {
    const explanation = lesson.quiz?.questions[0]?.easyExplanation ?? lesson.shortSummary;
    return {
      message: `Bu joy biroz chalg‘itishi mumkin. ${explanation}`,
      suggestedAction: "Mashqdan oldin oson matn bo‘limini yana bir marta ko‘rib chiqsangiz foydali.",
      easierVersion: lesson.easyContent
    };
  }

  if (mode === "next-step") {
    return {
      message: "Keyingi yengil qadam sifatida qisqa xulosani o‘qib, keyin bitta misolni ko‘rib chiqamiz.",
      suggestedAction: "So‘ng rasmli izoh yoki audio rejimdan birini tanlang.",
      easierVersion: lesson.shortSummary
    };
  }

  return {
    message: lesson.shortSummary,
    suggestedAction: "Kerak bo‘lsa, shu yerning o‘zida yana ham soddalashtirib beraman.",
    easierVersion: lesson.easyContent
  };
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  const body = (await request.json()) as Record<string, unknown>;
  const parsed = aiExplainSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Savolni qayta yozib ko‘rsak yaxshi bo‘ladi.",
        suggestedAction: "Darsning kerakli joyini qisqaroq aytib bering."
      },
      { status: 400 }
    );
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: parsed.data.lessonId },
    include: {
      quiz: {
        include: {
          questions: true
        }
      }
    }
  });

  if (!lesson) {
    return NextResponse.json(
      {
        message: "Bu dars topilmadi.",
        suggestedAction: "Boshqa darsni ochib yana urinib ko‘ring."
      },
      { status: 404 }
    );
  }

  const fallback = buildFallback(parsed.data.mode, lesson);
  const apiKey = process.env.OPENAI_API_KEY;
  let response = fallback;

  if (apiKey) {
    try {
      const completion = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
          input: [
            {
              role: "system",
              content: [
                {
                  type: "input_text",
                  text:
                    "Siz dars yordamchisisiz. Javoblar qisqa, iliq, tabiiy o‘zbek lotinida bo‘lsin. Hech qachon o‘zingizni sun’iy intellekt deb tanishtirmang. Faqat berilgan dars mazmuni ichida qoling."
                }
              ]
            },
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: `Dars nomi: ${lesson.title}
Asosiy matn: ${lesson.content}
Oson matn: ${lesson.easyContent}
Qisqa xulosa: ${lesson.shortSummary}
Foydalanuvchi ehtiyoji: ${parsed.data.accessibilityProfile ?? "berilmagan"}
So‘rov turi: ${parsed.data.mode}
Foydalanuvchi savoli: ${parsed.data.userText ?? "yo‘q"}`
                }
              ]
            }
          ],
          text: {
            format: {
              type: "json_schema",
              name: "lesson_helper_response",
              schema: {
                type: "object",
                additionalProperties: false,
                properties: {
                  message: { type: "string" },
                  suggestedAction: { type: "string" },
                  easierVersion: { type: "string" }
                },
                required: ["message", "suggestedAction"]
              }
            }
          }
        })
      });

      if (completion.ok) {
        const data = (await completion.json()) as {
          output_text?: string;
        };

        if (data.output_text) {
          response = JSON.parse(data.output_text) as typeof fallback;
        }
      }
    } catch {
      response = fallback;
    }
  }

  if (user) {
    await prisma.aiInteraction.create({
      data: {
        userId: user.id,
        lessonId: lesson.id,
        promptType: mapPromptType(parsed.data.mode),
        userQuestion: parsed.data.userText ?? null,
        response: response.message
      }
    });
  }

  return NextResponse.json(response);
}
