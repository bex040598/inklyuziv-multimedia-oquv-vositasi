import { CourseLevel, PrismaClient, QuestionType, Role } from "@prisma/client";

import { defaultAccessibilitySettings } from "../lib/constants.ts";
import { hashPassword } from "../lib/password.ts";

const prisma = new PrismaClient();

const sampleVideoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const sampleAudioUrl = "https://www.w3schools.com/html/horse.mp3";

const lessonBlueprints = [
  {
    courseTitle: "Raqamli savodxonlik va inklyuziv navigatsiya",
    courseDescription:
      "Ekran bilan ishlash, subtitrlar, klaviatura boshqaruvi va sodda navigatsiya ko‘nikmalarini rivojlantiradi.",
    level: CourseLevel.BEGINNER,
    lessons: [
      {
        title: "Ekran elementlarini tanish",
        description: "Asosiy tugmalar, sarlavhalar va navigatsiya bo‘limlarini tanib olish.",
        content:
          "Bu darsda foydalanuvchi sahifadagi sarlavha, tugma, menyu va matn bloklarini qanday aniqlashni o‘rganadi. Har bir elementning vazifasi sodda misollar orqali tushuntiriladi. Katta tugmalar va aniq yorliqlar foydalanuvchiga mustaqil harakat qilishga yordam beradi.",
        easyContent:
          "Sahifada katta nomlar, tugmalar va menyular bo‘ladi. Ular nimaga xizmat qilishini bilsangiz, platformadan oson foydalanasiz.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Ekran elementlari va yirik tugmalar ko‘rsatilgan illyustratsiya",
        captions:
          "Sahifadagi sarlavha yuqorida joylashadi. Tugmalar aniq yozuv bilan ko‘rinadi. Menyu bo‘limlari foydalanuvchini kerakli sahifaga olib boradi.",
        keywords: "navigatsiya, tugma, sarlavha, ekran",
        disabilityRecommendations: {
          visual:
            "Katta shrift va matnni ovoz chiqarib o‘qish tugmasidan foydalaning. Alt matnni diqqat bilan o‘qing.",
          hearing:
            "Matnli ko‘rsatmalarni birinchi o‘ringa qo‘ying va subtitr blokini yoqib qo‘ying.",
          mobility:
            "Klaviatura fokusini kuzatib, Tab tugmasi yordamida bo‘limlar bo‘ylab harakatlaning.",
          autism:
            "Bir xil tartibda joylashgan bloklardan foydalaning va ortiqcha animatsiyalarni o‘chirib qo‘ying.",
          intellectual:
            "Oson til rejimini yoqing va bitta bo‘limni tugatgach keyingisiga o‘ting."
        },
        quizTitle: "Ekran elementlari bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Katta yozilgan va sahifa mavzusini bildiradigan qism nima deyiladi?",
            options: ["Sarlavha", "Parol", "Yuklanish", "Skor"],
            correctAnswer: "Sarlavha",
            explanation:
              "Sarlavha foydalanuvchiga sahifa nimaga oid ekanini tushuntiradi. Avval sarlavhani topishga odatlaning."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Aniq yozilgan tugmalar navigatsiyani yengillashtiradi.",
            options: ["True", "False"],
            correctAnswer: "True",
            explanation:
              "Tugma matni tushunarli bo‘lsa, foydalanuvchi keyingi qadamni tez anglaydi."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Sahifadagi bo‘limlarni ketma-ket tanlash uchun klaviaturadagi qaysi tugma yordam beradi?",
            correctAnswer: "tab|Tab",
            explanation:
              "Tab tugmasi fokusni navbatdagi elementga olib o‘tadi va klaviatura bilan boshqaruvni soddalashtiradi."
          }
        ]
      },
      {
        title: "Subtitr va audio yordamida tinglash",
        description: "Audio va video materiallardan subtitr bilan birga foydalanish usullari.",
        content:
          "Multimedia materialni qabul qilish har kimda turlicha bo‘ladi. Shu sababli video, audio va yozma subtitrni birga taklif qilish muhim. Foydalanuvchi kontentni ko‘rish, tinglash yoki o‘qish orqali qabul qilishi mumkin.",
        easyContent:
          "Video va audio bilan birga yozma subtitr bo‘lsa, mavzuni tushunish osonlashadi. Har bir foydalanuvchi o‘zi uchun qulay usulni tanlaydi.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Video oynasi yonida subtitr va audio boshqaruvlari bor illyustratsiya",
        captions:
          "Subtitr video ostida ko‘rinadi. Audio tinglash tugmasi mavjud. Yozma matn eshitishni qo‘llab-quvvatlaydi.",
        keywords: "subtitr, audio, video, multimediya",
        disabilityRecommendations: {
          visual:
            "Subtitr matnini TTS bilan o‘qing va yuqori kontrast rejimida media boshqaruvlarini ishlating.",
          hearing:
            "Subtitrlar yoqilgan bo‘lsin, muhim tushunchalar yozma blokda ham ko‘rsatilsin.",
          mobility:
            "Media boshqaruv tugmalarini klaviatura orqali faollashtirishni sinab ko‘ring.",
          autism:
            "Media qismlarini qisqa segmentlarda ko‘ring va har segmentdan keyin qisqa xulosa o‘qing.",
          intellectual:
            "Avval yozma izohni o‘qing, keyin audio yoki videoni tinglab mustahkamlang."
        },
        quizTitle: "Subtitr va audio bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Subtitrning asosiy foydasi nimada?",
            options: [
              "Yozma ko‘mak beradi",
              "Faqat rangni o‘zgartiradi",
              "Internetni tezlatadi",
              "Parol yaratadi"
            ],
            correctAnswer: "Yozma ko‘mak beradi",
            explanation:
              "Subtitr audio va videodagi ma’lumotni yozma shaklda yetkazadi va tushunishni osonlashtiradi."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Har bir foydalanuvchi kontentni faqat bitta usulda qabul qiladi.",
            options: ["True", "False"],
            correctAnswer: "False",
            explanation:
              "Ba’zi foydalanuvchilar ko‘rish, ba’zilari tinglash, yana boshqalari esa ikkalasini birga afzal ko‘rishi mumkin."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Video ostida ko‘rinib, nutqni yozma shaklda beradigan qism nima?",
            correctAnswer: "subtitr|Subtitr",
            explanation:
              "Subtitr video mazmunini yozma ko‘rinishda qayta beradi va eshitishda qiyinchilik bo‘lganda foydali."
          }
        ]
      },
      {
        title: "Klaviatura bilan boshqarish asoslari",
        description: "Mouse ishlatmasdan platformada harakatlanish ko‘nikmasi.",
        content:
          "Klaviatura bilan boshqarish harakatlanishda qiyinchilik bo‘lgan yoki tezkor navigatsiyani afzal ko‘radigan foydalanuvchilar uchun juda muhim. Fokus ko‘rinadigan bo‘lsa, foydalanuvchi qaysi elementda turganini darhol biladi.",
        easyContent:
          "Mouse bo‘lmasa ham, klaviatura yordamida darslar orasida yurish mumkin. Fokus chizig‘i qaysi joyda turganingizni ko‘rsatadi.",
        imageUrl: "/images/lesson-3.svg",
        imageAlt: "Klaviatura va fokus chizig‘i ko‘rinib turgan illyustratsiya",
        captions:
          "Tab keyingi elementga o‘tadi. Enter tugmasi tanlangan tugmani ishga tushiradi. Fokus chizig‘i faol elementni ko‘rsatadi.",
        keywords: "klaviatura, fokus, navigatsiya, enter",
        disabilityRecommendations: {
          visual:
            "Fokus outline ni yoqib qo‘ying va element nomlarini TTS orqali tinglang.",
          hearing:
            "Har bir tugma matni va ko‘rsatmalar yozma ko‘rinishda berilishi kerak.",
          mobility:
            "Tab va Enter tugmalari bilan harakatlanish vaqtni tejaydi va qo‘l harakatini kamaytiradi.",
          autism:
            "Har bir tugmaning bir xil joylashuvi va barqaror tartibi xavfsiz hissini beradi.",
          intellectual:
            "Qadamlarni birma-bir takrorlab mashq qiling: Tab, Enter, Orqaga qaytish."
        },
        quizTitle: "Klaviatura boshqaruvi bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Tanlangan tugmani ishga tushirish uchun qaysi tugma qulay?",
            options: ["Enter", "Shift", "Caps Lock", "Alt"],
            correctAnswer: "Enter",
            explanation:
              "Enter tugmasi ko‘p hollarda faol elementni ishga tushiradi yoki tasdiqlaydi."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Fokus chizig‘i foydalanuvchiga qaysi elementda turganini ko‘rsatadi.",
            options: ["True", "False"],
            correctAnswer: "True",
            explanation:
              "Fokus ko‘rinadigan bo‘lsa, klaviatura bilan boshqarish ancha ishonchli bo‘ladi."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Keyingi elementga o‘tish uchun odatda qaysi tugmadan foydalaniladi?",
            correctAnswer: "tab|Tab",
            explanation:
              "Tab fokusni keyingi elementga o‘tkazadi va navigatsiya ketma-ketligini saqlaydi."
          }
        ]
      }
    ]
  },
  {
    courseTitle: "Mustaqil o‘rganish va kundalik ko‘nikmalar",
    courseDescription:
      "O‘quvchi uchun reja tuzish, vizual ko‘mak, mustahkamlash va o‘z progressini tahlil qilishni o‘rgatadi.",
    level: CourseLevel.INTERMEDIATE,
    lessons: [
      {
        title: "Kichik reja tuzish",
        description: "Vazifalarni mayda bosqichlarga ajratib o‘rganish.",
        content:
          "Katta topshiriqni kichik qadamchalarga ajratish tashvishni kamaytiradi va muvaffaqiyat hissini oshiradi. Har bir bajarilgan qadam alohida belgilanadi. Bu usul autizm spektridagi yoki intellektual rivojlanishda qo‘shimcha ko‘makka muhtoj foydalanuvchilar uchun ayniqsa foydali.",
        easyContent:
          "Katta vazifani bir nechta kichik ishga ajrating. Har bir kichik ish tugaganda belgi qo‘ying.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Qadamlar ketma-ketligi va belgilangan reja illyustratsiyasi",
        captions:
          "Vazifa 1, vazifa 2, vazifa 3 kabi ketma-ketlik foydalanuvchiga yo‘nalish beradi.",
        keywords: "reja, qadam, mustaqil o‘rganish, ketma-ketlik",
        disabilityRecommendations: {
          visual:
            "Reja bandlarini alohida katta bloklarda ko‘rsating va kerak bo‘lsa TTS tugmasidan foydalaning.",
          hearing:
            "Har bir qadamni yozma ko‘rinishda takrorlab ko‘rsating.",
          mobility:
            "Qisqa bosqichlar foydalanuvchini uzoq vaqt bir joyda ishlashdan charchatmaydi.",
          autism:
            "Oldindan aniq reja va tartib bo‘lishi xavotirni kamaytiradi.",
          intellectual:
            "Bitta qadamga bitta topshiriq yozing va murakkab so‘zlarni kamaytiring."
        },
        quizTitle: "Reja tuzish bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Katta vazifani kichik bo‘laklarga ajratish nimaga yordam beradi?",
            options: [
              "Tushunishni osonlashtiradi",
              "Tugmalarni yashiradi",
              "Rangni yo‘qotadi",
              "Kirishni bloklaydi"
            ],
            correctAnswer: "Tushunishni osonlashtiradi",
            explanation:
              "Kichik qadamlar foydalanuvchiga keyingi ishni aniq ko‘rsatadi va ortiqcha bosimni kamaytiradi."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Har bir bajarilgan qadamni belgilash motivatsiyani oshiradi.",
            options: ["True", "False"],
            correctAnswer: "True",
            explanation:
              "Bajarilgan ishni ko‘rish ijobiy mustahkamlash vazifasini bajaradi."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Katta ishni mayda bosqichlarga ajratish usuli bir so‘z bilan nima deyiladi?",
            correctAnswer: "reja|Reja",
            explanation:
              "Reja tuzish foydalanuvchini yo‘nalishsiz qolishdan saqlaydi."
          }
        ]
      },
      {
        title: "Rasmli ko‘rsatmalar bilan mashq",
        description: "Rasm, alt matn va qisqa izohlar yordamida amaliy topshiriq bajarish.",
        content:
          "Rasmli ko‘rsatmalar matnni qo‘llab-quvvatlaydi va abstrakt tushunchalarni aniqroq qiladi. Ammo rasmning o‘zi yetarli emas, unga alt matn va qisqa tavsif ham birga berilishi kerak. Shunda ko‘rishda qiyinchilik bo‘lgan foydalanuvchi ham mazmunni tushunadi.",
        easyContent:
          "Rasm foydali, lekin rasm yonida qisqa yozuv ham bo‘lishi kerak. Alt matn rasm nimani ko‘rsatayotganini tushuntiradi.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Rasm, alt matn va izoh bloklari aks etgan illyustratsiya",
        captions:
          "Rasm ustida asosiy fikr, pastida alt matn va yonida qisqa izoh berilgan.",
        keywords: "alt matn, rasm, tavsif, ko‘rsatma",
        disabilityRecommendations: {
          visual:
            "Alt matnni batafsil yozing va rasm ma’lumotini matnda ham qaytaring.",
          hearing:
            "Rasmli ko‘rsatmalarni yozma ketma-ketlik bilan birga bering.",
          mobility:
            "Har bir qadamni alohida karta ko‘rinishida ko‘rsatib, bosish maydonini kattalashtiring.",
          autism:
            "Bir xil formatdagi rasm kartalari tartibni saqlashga yordam beradi.",
          intellectual:
            "Har rasmga bitta aniq vazifa biriktiring va murakkab tasvirlardan qoching."
        },
        quizTitle: "Rasmli ko‘rsatmalar bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Rasm mazmunini yozma ko‘rinishda tushuntiruvchi element nima?",
            options: ["Alt matn", "Parol", "Foiz", "Dashboard"],
            correctAnswer: "Alt matn",
            explanation:
              "Alt matn rasm ma’lumotini ko‘rmayotgan foydalanuvchiga yetkazadi."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Rasmni faqat ko‘rsatish kifoya, yozma tavsif shart emas.",
            options: ["True", "False"],
            correctAnswer: "False",
            explanation:
              "Yozma tavsif inklyuzivlikni oshiradi va mazmunni barcha uchun tushunarli qiladi."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Rasm mazmunini ko‘rmaydigan foydalanuvchiga yetkazadigan yozuv qanday ataladi?",
            correctAnswer: "alt matn|Alt matn",
            explanation:
              "Alt matn rasmga bog‘liq muhim ma’lumotni yo‘qotmaslikka yordam beradi."
          }
        ]
      },
      {
        title: "Natijani tahlil qilish va keyingi qadam",
        description: "Quiz natijasi asosida kuchli va zaif tomonlarni aniqlash.",
        content:
          "Natijani faqat ball sifatida ko‘rish yetarli emas. Foydalanuvchi qaysi savollarda qiynalganini, qaysi yo‘nalishda kuchli ekanini tushunishi kerak. Shu orqali keyingi darslar uchun individual tavsiyalar shakllanadi.",
        easyContent:
          "Ballni ko‘ring, keyin qaysi joylarda xato bo‘lganini aniqlang. Keyingi darsni shu bo‘yicha tanlang.",
        imageUrl: "/images/lesson-3.svg",
        imageAlt: "Progress chizig‘i va tavsiya kartalari aks etgan illyustratsiya",
        captions:
          "Foiz natijasi, kuchli tomonlar va yaxshilanish yo‘nalishlari bitta joyda ko‘rsatilgan.",
        keywords: "progress, natija, tavsiya, tahlil",
        disabilityRecommendations: {
          visual:
            "Natijani matn bilan birga ayting va progress bar ma’nosini yozma shaklda ham ko‘rsating.",
          hearing:
            "Barcha tavsiyalar yozma ravishda aniq punktlar bilan berilsin.",
          mobility:
            "Hisobot bo‘limida katta tugmalar va kam bosqichli navigatsiya ishlating.",
          autism:
            "Tavsiyalarni bir xil formatda, qisqa va bashoratli usulda ko‘rsating.",
          intellectual:
            "Avval kuchli tomonlarni, keyin bitta yaxshilanish nuqtasini ko‘rsating."
        },
        quizTitle: "Natijani tahlil qilish bo‘yicha test",
        questions: [
          {
            type: QuestionType.SINGLE_CHOICE,
            text: "Quiz natijasidan keyin nimani ko‘rish foydali?",
            options: [
              "Kuchli va zaif tomonlarni",
              "Faqat ranglarni",
              "Faqat tugmalar sonini",
              "Faqat emailni"
            ],
            correctAnswer: "Kuchli va zaif tomonlarni",
            explanation:
              "Tahlil foydalanuvchini keyingi darsga ongli tayyorlaydi va rivojlanish nuqtasini ko‘rsatadi."
          },
          {
            type: QuestionType.TRUE_FALSE,
            text: "Faqat foizni ko‘rsatish yetarli, tavsiya kerak emas.",
            options: ["True", "False"],
            correctAnswer: "False",
            explanation:
              "Tavsiyalar foydalanuvchiga keyingi aniq qadamni beradi va natijani foydali ma’lumotga aylantiradi."
          },
          {
            type: QuestionType.SHORT_ANSWER,
            text: "Ball va tavsiyalar ko‘rsatiladigan umumiy bo‘lim nima deb ataladi?",
            correctAnswer: "hisobot|Hisobot",
            explanation:
              "Hisobot foydalanuvchi, o‘qituvchi va ota-onaga bir xil ma’lumotni tushunarli shaklda taqdim etadi."
          }
        ]
      }
    ]
  }
];

async function main() {
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.accessibilitySettings.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Platforma Admini",
      email: "admin@example.com",
      passwordHash: hashPassword("admin123"),
      role: Role.ADMIN,
      accessibilitySettings: {
        create: defaultAccessibilitySettings
      }
    }
  });

  const teacher = await prisma.user.create({
    data: {
      name: "Dilnoza O‘qituvchi",
      email: "teacher@example.com",
      passwordHash: hashPassword("teacher123"),
      role: Role.TEACHER,
      accessibilitySettings: {
        create: {
          ...defaultAccessibilitySettings,
          captions: true
        }
      }
    }
  });

  const parent = await prisma.user.create({
    data: {
      name: "Malika Kuzatuvchi",
      email: "parent@example.com",
      passwordHash: hashPassword("parent123"),
      role: Role.PARENT,
      accessibilitySettings: {
        create: {
          ...defaultAccessibilitySettings,
          largeText: true
        }
      }
    }
  });

  const student = await prisma.user.create({
    data: {
      name: "Ali O‘quvchi",
      email: "student@example.com",
      passwordHash: hashPassword("student123"),
      role: Role.STUDENT,
      parentId: parent.id,
      disabilityProfile: "Ko‘rishda qiyinchilik va oson til rejimi foydali.",
      accessibilitySettings: {
        create: {
          ...defaultAccessibilitySettings,
          largeText: true,
          captions: true,
          textToSpeech: true,
          focusOutline: true
        }
      }
    }
  });

  const createdCourses = [];

  for (const blueprint of lessonBlueprints) {
    const createdCourse = await prisma.course.create({
      data: {
        title: blueprint.courseTitle,
        description: blueprint.courseDescription,
        level: blueprint.level,
        createdById: teacher.id,
        lessons: {
          create: blueprint.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
            content: lesson.content,
            easyContent: lesson.easyContent,
            audioUrl: sampleAudioUrl,
            videoUrl: sampleVideoUrl,
            imageUrl: lesson.imageUrl,
            imageAlt: lesson.imageAlt,
            captions: lesson.captions,
            keywords: lesson.keywords,
            level: blueprint.level,
            disabilityRecommendations: lesson.disabilityRecommendations,
            quiz: {
              create: {
                title: lesson.quizTitle,
                questions: {
                  create: lesson.questions.map((question) => ({
                    type: question.type,
                    text: question.text,
                    options: question.options ?? undefined,
                    correctAnswer: question.correctAnswer,
                    explanation: question.explanation
                  }))
                }
              }
            }
          }))
        }
      },
      include: {
        lessons: {
          include: {
            quiz: {
              include: {
                questions: true
              }
            }
          }
        }
      }
    });

    createdCourses.push(createdCourse);
  }

  const allLessons = createdCourses.flatMap((course) => course.lessons);

  const progressEntries = [
    {
      lessonId: allLessons[0]?.id,
      completed: true,
      teacherComment:
        "Ali navigatsiya elementlarini aniq topmoqda va platformada mustaqil harakatlana boshladi.",
      strengths: "Tugmalarni topish, sarlavhalarni ajratish",
      improvementAreas: "Klaviatura bilan tezroq ishlash"
    },
    {
      lessonId: allLessons[1]?.id,
      completed: true,
      teacherComment:
        "Subtitr bilan ishlash yaxshi. Audio va yozma matnni bog‘lay olish ko‘nikmasi kuchaymoqda.",
      strengths: "Subtitrni kuzatish, asosiy fikrni ajratish",
      improvementAreas: "Qisqa javoblarda mustaqilroq ifoda"
    },
    {
      lessonId: allLessons[2]?.id,
      completed: false,
      teacherComment: "Klaviatura fokusini ko‘rmoqda, ammo tezkorlik ustida ishlash kerak.",
      strengths: "Tab tugmasidan foydalanish",
      improvementAreas: "Enter va ketma-ket boshqaruvni mustahkamlash"
    }
  ];

  for (const entry of progressEntries) {
    if (!entry.lessonId) {
      continue;
    }

    await prisma.progress.create({
      data: {
        userId: student.id,
        lessonId: entry.lessonId,
        completed: entry.completed,
        teacherComment: entry.teacherComment,
        strengths: entry.strengths,
        improvementAreas: entry.improvementAreas,
        lastOpenedAt: new Date()
      }
    });
  }

  const attemptTargets = allLessons
    .slice(0, 3)
    .map((lesson) => ({
      quizId: lesson.quiz?.id,
      answers:
        lesson.title === "Klaviatura bilan boshqarish asoslari"
          ? {
              [lesson.quiz?.questions[0]?.id ?? ""]: "Shift",
              [lesson.quiz?.questions[1]?.id ?? ""]: "True",
              [lesson.quiz?.questions[2]?.id ?? ""]: "Tab"
            }
          : {
              [lesson.quiz?.questions[0]?.id ?? ""]: lesson.quiz?.questions[0]?.correctAnswer ?? "",
              [lesson.quiz?.questions[1]?.id ?? ""]: lesson.quiz?.questions[1]?.correctAnswer ?? "",
              [lesson.quiz?.questions[2]?.id ?? ""]: lesson.quiz?.questions[2]?.correctAnswer ?? ""
            },
      score: lesson.title === "Klaviatura bilan boshqarish asoslari" ? 67 : 100
    }))
    .filter((item) => item.quizId);

  for (const attempt of attemptTargets) {
    await prisma.quizAttempt.create({
      data: {
        quizId: attempt.quizId as string,
        userId: student.id,
        score: attempt.score,
        answers: attempt.answers
      }
    });
  }

  console.log("Seed muvaffaqiyatli yakunlandi.");
  console.log(`Admin: ${admin.email} / admin123`);
  console.log(`Teacher: ${teacher.email} / teacher123`);
  console.log(`Student: ${student.email} / student123`);
  console.log(`Parent: ${parent.email} / parent123`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
