import {
  ContrastMode,
  CourseLevel,
  FontScale,
  LearningMode,
  PrismaClient,
  PromptType,
  QuestionType,
  Role
} from "@prisma/client";

import { hashPassword } from "../lib/password.ts";

const prisma = new PrismaClient();

const sampleVideoUrl = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const sampleAudioUrl = "https://www.w3schools.com/html/horse.mp3";

const commonRecommendations = {
  visual: "Matnni kattalashtirib, rasm tavsifini ovozli o‘qish bilan birga ishlatish foydali.",
  hearing: "Subtitr, transkript va qisqa vizual ko‘rsatmalarni birga qo‘llash tavsiya etiladi.",
  mobility: "Katta tugmalar, klaviatura yo‘llari va kamroq bosqichli harakat yordam beradi.",
  attention: "Mavzuni kichik qismlarga bo‘lish va tanaffus eslatmasi diqqatni saqlashga yordam beradi.",
  reading: "Murakkab so‘z chiqsa, oson til bloki va misolli tushuntirishdan foydalaning.",
  memory: "Qisqa xulosa va qayta ko‘rish kartalari eslab qolishni yengillashtiradi."
};

const courses = [
  {
    title: "Kompyuter savodxonligi: birinchi qadamlar",
    description:
      "Kompyuterni xavfsiz yoqish, klaviatura bilan yurish va internetda kerakli narsani topish bo‘yicha sokin boshlanish kursi.",
    level: CourseLevel.BEGINNER,
    estimatedDuration: 95,
    coverImage: "/images/lesson-1.svg",
    coverAlt: "Kompyuter ekrani yonida qulay o‘rganish kartalari",
    lessons: [
      {
        title: "Kompyuterni yoqish va xavfsiz ishlatish",
        description: "Kompyuterni bosim qilmasdan, ketma-ket va xavfsiz yoqishni o‘rganamiz.",
        learningGoals: [
          { title: "Asosiy tugmalarni topish", detail: "Monitor va tizim blokidagi kerakli tugmani farqlaysiz." },
          { title: "Xavfsizlikni eslab qolish", detail: "Suv, sim va parol bilan ehtiyot bo‘lishni bilasiz." },
          { title: "Ketma-ketlikni saqlash", detail: "Oldin nima, keyin nima qilishni adashtirmaysiz." }
        ],
        content:
          "Kompyuterni yoqishda shoshilish kerak emas. Avval stol usti quruq va xavfsiz ekanini tekshiring. So‘ng monitor va tizim blokidagi yoqish tugmalarini toping. Qurilma ishga tushganda ekranda yangi oynalar paydo bo‘lishi mumkin. Ularni birdan bosib ketmang. Avval sarlavhani o‘qing, keyin keyingi qadamni tanlang. Agar ekran juda yorqin yoki matn mayda ko‘rinsa, moslash paneli yordam beradi.",
        easyContent:
          "Oldin xavfsizlikni tekshiring. Keyin kompyuterni yoqing. Ekranda yangi narsa chiqsa, birdan bosmang. Avval o‘qing, keyin tanlang.",
        shortSummary:
          "Kompyuterni sokin yoqish uchun: xavfsizlikni tekshiring, tugmani bosing, ekranni o‘qib keyin davom eting.",
        pictogramSummary: [
          { label: "1-qadam", description: "Stol quruq va simlar joyida ekanini ko‘ring." },
          { label: "2-qadam", description: "Yoqish tugmasini topib bir marta bosing." },
          { label: "3-qadam", description: "Ekrandagi yozuvni o‘qib, keyingi qadamni tanlang." }
        ],
        audioTranscript:
          "Kompyuterni yoqishda avval xavfsizlikni tekshiramiz. So‘ng yoqish tugmasini bosamiz. Ekrandagi yozuvni o‘qib, shoshmasdan davom etamiz.",
        videoCaptions:
          "Yoqish tugmasi topildi. Qurilma ishga tushmoqda. Ekrandagi yozuv o‘qildi. Keyingi qadam tanlandi.",
        videoTranscript:
          "Videoda kompyuterni yoqishning uch bosqichi ko‘rsatiladi: xavfsizlik, tugmani bosish va ekrandagi yozuvni tushunish.",
        audioDescription:
          "Qo‘l stolning quruqligini tekshiradi. Keyin kompyuter tugmasi ko‘rsatiladi. Ekranda katta yozuv paydo bo‘ladi.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Kompyuterni yoqish bosqichlari ko‘rsatilgan illyustratsiya",
        imageLongDescription:
          "Rasmda chap tomonda elektr simi, o‘ng tomonda tizim bloki va yuqorida monitor ko‘rsatilgan. Har birining yonida tartib bilan raqamlangan qadamlar bor.",
        keywords: ["kompyuter", "xavfsizlik", "yoqish", "ekran"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 18,
        recommendedModes: [LearningMode.READING, LearningMode.LISTENING, LearningMode.VISUAL],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: kompyuterni xavfsiz yoqish",
          friendlyIntro: "Bu baho emas. Faqat qaysi joyni yana bir ko‘rsak foydali bo‘lishini bilib olamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Kompyuterni yoqishdan oldin nimani tekshirish foydali?",
              easyText: "Boshlashdan oldin nimaga qaraymiz?",
              options: ["Stol xavfsizligini", "Faqat rangini", "Faqat sanani", "Faqat musiqani"],
              correctAnswer: "Stol xavfsizligini",
              explanation: "Avval xavfsizlikni tekshirish qurilma va foydalanuvchini asraydi.",
              easyExplanation: "Oldin xavfsizlikka qarash kerak."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Ekranda yangi oyna chiqsa, darhol bosib yuborish kerak.",
              easyText: "Yangi oyna chiqsa, birdan bosamizmi?",
              options: ["True", "False"],
              correctAnswer: false,
              explanation: "Shoshilmasdan sarlavhani o‘qish yaxshiroq.",
              easyExplanation: "Yo‘q. Avval o‘qiymiz."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Yoqishdan keyin ekranda paydo bo‘lgan yozuvni avval nima qilamiz?",
              easyText: "Yozuv chiqsa, birinchi ish nima?",
              correctAnswer: ["o‘qiymiz", "oqiymiz", "o‘qish"],
              explanation: "Yozuvni o‘qish keyingi qadamni to‘g‘ri tanlashga yordam beradi.",
              easyExplanation: "Oldin o‘qiymiz."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Qaysi holatlar xavfsizlikka kiradi?",
              easyText: "Qaysi narsalar xavfsizlikka tegishli?",
              options: ["Stol quruq bo‘lishi", "Sim joyida bo‘lishi", "Parolni baland aytish", "Suvni yonida qoldirish"],
              correctAnswer: ["Stol quruq bo‘lishi", "Sim joyida bo‘lishi"],
              explanation: "Quruq stol va joyidagi simlar xavfsizlikning oddiy, lekin muhim qismi.",
              easyExplanation: "Quruq stol va joyidagi sim xavfsiz."
            },
            {
              type: QuestionType.ORDERING,
              text: "Qadamlarni to‘g‘ri tartibga qo‘ying.",
              easyText: "Qaysi qadam oldin keladi?",
              options: ["Ekrandagi yozuvni o‘qish", "Kompyuterni yoqish", "Xavfsizlikni tekshirish"],
              correctAnswer: ["Xavfsizlikni tekshirish", "Kompyuterni yoqish", "Ekrandagi yozuvni o‘qish"],
              explanation: "Oldin xavfsizlik, keyin yoqish, so‘ng ekrandagi ko‘rsatmani o‘qiymiz.",
              easyExplanation: "Avval xavfsizlik. Keyin yoqish. So‘ng o‘qish."
            }
          ]
        }
      },
      {
        title: "Klaviatura bilan boshqarish",
        description: "Sichqoncha kerak bo‘lmaganda ham sahifalar orasida yurishni mashq qilamiz.",
        learningGoals: [
          { title: "Tab tugmasi", detail: "Keyingi elementga qanday o‘tishni bilasiz." },
          { title: "Enter bilan tanlash", detail: "Tugma yoki havolani klaviaturadan ochasiz." },
          { title: "Fokusni kuzatish", detail: "Qaysi element faol ekanini ko‘rib borasiz." }
        ],
        content:
          "Klaviatura bilan boshqarish mustaqillik beradi. Tab tugmasi elementdan elementga o‘tadi. Shift va Tab birga bosilganda orqaga qaytasiz. Enter esa tanlangan tugmani ishga tushiradi. Eng muhimi, fokus chizig‘ini ko‘rib borish. Qaysi joyda turganingizni bilsangiz, sahifada yo‘qolib qolmaysiz.",
        easyContent:
          "Tab keyingi joyga o‘tadi. Shift va Tab orqaga qaytaradi. Enter tanlaydi. Fokus chizig‘i qayerda turganingizni ko‘rsatadi.",
        shortSummary:
          "Tab yuradi, Shift + Tab ortga qaytaradi, Enter ochadi. Fokus sizga qayerda turganingizni aytadi.",
        pictogramSummary: [
          { label: "Tab", description: "Keyingi tugma yoki havolaga o‘tish." },
          { label: "Shift + Tab", description: "Oldingi elementga qaytish." },
          { label: "Enter", description: "Tanlangan elementni ochish." }
        ],
        audioTranscript:
          "Bu darsda Tab, Shift va Tab, Enter tugmalari bilan sahifa bo‘ylab yurish ko‘rsatiladi.",
        videoCaptions:
          "Fokus birinchi tugmada. Tab bosildi. Fokus keyingi tugmaga o‘tdi. Enter bosildi.",
        videoTranscript:
          "Videoda fokus chizig‘i qanday harakatlanishi va Enter tugmasi bilan elementni ochish jarayoni ko‘rsatiladi.",
        audioDescription:
          "Ekranda tugmalar ketma-ket joylashgan. Sariq fokus halqasi navbat bilan ularning ustiga o‘tadi.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Klaviatura tugmalari va fokus halqasi",
        imageLongDescription:
          "Rasmda Tab, Shift va Enter tugmalari kattalashtirib ko‘rsatilgan. Yonida fokus bilan ajratilgan tugma namoyish etilgan.",
        keywords: ["klaviatura", "tab", "enter", "fokus"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 20,
        recommendedModes: [LearningMode.READING, LearningMode.VISUAL, LearningMode.LISTENING],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: klaviatura bilan yurish",
          friendlyIntro: "Javobingiz saqlandi. Endi qaysi qadam qulayroq ekanini birga ko‘ramiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Keyingi elementga o‘tish uchun odatda qaysi tugmadan foydalaniladi?",
              easyText: "Oldinga yurish uchun qaysi tugma kerak?",
              options: ["Tab", "Ctrl", "Esc", "Caps Lock"],
              correctAnswer: "Tab",
              explanation: "Tab fokusni keyingi elementga olib o‘tadi.",
              easyExplanation: "To‘g‘ri javob: Tab."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Enter odatda tanlangan elementni ochadi yoki ishga tushiradi.",
              easyText: "Enter tanlaydimi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Ko‘p tugma va havolalar Enter bilan faollashadi.",
              easyExplanation: "Ha, Enter ko‘p joyda tanlaydi."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Klaviatura rejimida foydali bo‘lgan narsalarni tanlang.",
              easyText: "Nimalar yordam beradi?",
              options: ["Fokus halqasi", "Katta tugmalar", "Yashirin menyu", "Tiniq yozuv"],
              correctAnswer: ["Fokus halqasi", "Katta tugmalar", "Tiniq yozuv"],
              explanation: "Faol elementni ko‘rish va tugmalarni aniq topish boshqaruvni yengillashtiradi.",
              easyExplanation: "Fokus, katta tugma va tiniq yozuv yordam beradi."
            },
            {
              type: QuestionType.ORDERING,
              text: "Sahifada tugmani ochish jarayonini tartiblang.",
              easyText: "Qadamlarni joylang.",
              options: ["Enter bosish", "Fokusni kerakli tugmaga olib borish", "Tab bosish"],
              correctAnswer: ["Tab bosish", "Fokusni kerakli tugmaga olib borish", "Enter bosish"],
              explanation: "Avval Tab bilan yuramiz, kerakli joyga kelgach Enter bosamiz.",
              easyExplanation: "Oldin yuramiz, keyin tanlaymiz."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Oldingi elementga qaytish uchun Tab bilan qaysi tugma birga bosiladi?",
              easyText: "Ortga qaytish uchun Tab bilan yana qaysi tugma kerak?",
              correctAnswer: ["shift", "shift tugmasi"],
              explanation: "Shift + Tab fokusni orqaga qaytaradi.",
              easyExplanation: "Shift kerak."
            }
          ]
        }
      },
      {
        title: "Internetda kerakli ma’lumotni topish",
        description: "Kerakli so‘zni tanlash, xavfsiz havolani farqlash va chalg‘imasdan qidirishni o‘rganamiz.",
        learningGoals: [
          { title: "Kalit so‘z yozish", detail: "Qidiruvga qisqa va aniq so‘z yozishni bilasiz." },
          { title: "Havolani tekshirish", detail: "Havola qayerga olib borishini ko‘rasiz." },
          { title: "Keraksiz chalg‘ituvchini kamaytirish", detail: "Reklama va keraksiz oynani farqlaysiz." }
        ],
        content:
          "Internetda hamma narsa kerakli emas. Shuning uchun qidiruvga uzun gap emas, kerakli kalit so‘z yozish foydali. Masalan, “soatni o‘rganish mashqi” yoki “klaviatura tab tugmasi”. Natijalarni ochishda esa sahifa nomi va havolani ko‘rib chiqing. Juda baland harf bilan “tez yuklab oling” kabi chalg‘ituvchi yozuvlar chiqsa, ehtiyot bo‘ling.",
        easyContent:
          "Qidiruvga qisqa va aniq so‘z yozing. Natijada sahifa nomini o‘qing. Juda shovqinli yozuv bo‘lsa, darhol bosmang.",
        shortSummary:
          "Qisqa kalit so‘z yozing, natijani o‘qing, chalg‘ituvchi yozuvni darhol bosmang.",
        pictogramSummary: [
          { label: "Qidiruv", description: "Uzun gap o‘rniga qisqa kalit so‘z yozing." },
          { label: "Tekshirish", description: "Sahifa nomi va havolaga qarang." },
          { label: "Ehtiyot", description: "Chalg‘ituvchi bannerlarni birdan bosmang." }
        ],
        audioTranscript:
          "Qidiruvda qisqa kalit so‘z ishlatish va havolani o‘qib ko‘rish ko‘rsatiladi.",
        videoCaptions:
          "Kalit so‘z yozildi. Natija o‘qildi. Havola tekshirildi. Keraksiz banner bosilmadi.",
        videoTranscript:
          "Videoda qidiruv maydoni, sahifa nomi va chalg‘ituvchi bannerning farqi ko‘rsatiladi.",
        audioDescription:
          "Qidiruv satriga qisqa so‘z yoziladi. Natijalarda biri soddaroq, biri esa juda yorqin banner bilan turibdi.",
        imageUrl: "/images/lesson-3.svg",
        imageAlt: "Qidiruv satri va xavfsiz natija namunasi",
        imageLongDescription:
          "Rasmda yuqorida qidiruv satri, pastda esa ikkita natija ko‘rsatilgan. Birinchi natija oddiy matn bilan, ikkinchi natija esa yorqin reklama ko‘rinishida.",
        keywords: ["internet", "qidiruv", "havola", "xavfsizlik"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 24,
        recommendedModes: [LearningMode.READING, LearningMode.VIDEO, LearningMode.VISUAL],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: internetda izlash",
          friendlyIntro: "Bu joy biroz chalg‘itishi mumkin. Keling, qidiruvni oddiy qadamlar bilan eslab olamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Qidiruvga qanday yozish foydaliroq?",
              easyText: "Qidiruvga nimani yozgan yaxshi?",
              options: ["Qisqa kalit so‘z", "Juda uzun hikoya", "Faqat tasodifiy harf", "Faqat raqam"],
              correctAnswer: "Qisqa kalit so‘z",
              explanation: "Qisqa kalit so‘z natijani aniqroq qiladi.",
              easyExplanation: "Qisqa so‘z foydaliroq."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Yorqin reklama chiqsa, odatda birdan bosish kerak emas.",
              easyText: "Reklama chiqsa, birdan bosamizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Avval sahifa nomi va havolani ko‘rish xavfsizroq.",
              easyExplanation: "Ha, avval tekshiramiz."
            },
            {
              type: QuestionType.IMAGE_CHOICE,
              text: "Qaysi rasm qidiruv natijasini ko‘rsatadi?",
              easyText: "Qidiruv natijasi qaysi?",
              options: [
                { label: "Qidiruv satri va natijalar", value: "result", image: "/images/lesson-3.svg" },
                { label: "Faqat bo‘sh ekran", value: "blank", image: "/images/lesson-1.svg" }
              ],
              correctAnswer: "result",
              explanation: "Natijalar ko‘rinishi qidiruvdan keyin paydo bo‘ladi.",
              easyExplanation: "Natijalar chiqqan rasm to‘g‘ri."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Qidiruvda nimalarga qarash foydali?",
              easyText: "Nimani tekshiramiz?",
              options: ["Sahifa nomi", "Havola", "Faqat rang", "Matn mazmuni"],
              correctAnswer: ["Sahifa nomi", "Havola", "Matn mazmuni"],
              explanation: "Nom, havola va qisqa mazmun foydali ma’lumot beradi.",
              easyExplanation: "Nom, havola va mazmunni ko‘ramiz."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Qidiruvda kerakli narsani topishga yordam beradigan qisqa so‘zlar nima deyiladi?",
              easyText: "Qisqa izlash so‘zlari qanday ataladi?",
              correctAnswer: ["kalit so‘z", "kalit soz", "kalit so'z"],
              explanation: "Kalit so‘zlar kerakli natijani aniqroq topishga yordam beradi.",
              easyExplanation: "Kalit so‘z deyiladi."
            }
          ]
        }
      },
      {
        title: "Parolni eslab qolishning xavfsiz usullari",
        description: "Parolni himoya qilish va uni eslab qolish uchun xavfsiz usullarni ko‘ramiz.",
        learningGoals: [
          { title: "Kuchli parol", detail: "Oddiy, lekin himoyalangan parol qoidalarini bilasiz." },
          { title: "Xavfsiz eslab qolish", detail: "Parolni oshkor qilmasdan yodda saqlash usullarini bilasiz." },
          { title: "Ulashmaslik", detail: "Parolni kim bilan bo‘lishmaslik kerakligini tushunasiz." }
        ],
        content:
          "Parol shaxsiy kalitga o‘xshaydi. Uni oson topiladigan so‘z bilan tuzish xavfli. Lekin juda murakkab qilib yozib, darrov unutib qo‘yish ham foydali emas. Shuning uchun sizga yaqin, lekin boshqalarga ayon bo‘lmagan iboradan foydalanish mumkin. Masalan, harf, raqam va belgi aralashsa yaxshi. Parolni qog‘ozga yozsangiz, ochiq joyda qoldirmang.",
        easyContent:
          "Parolni hammaga aytmang. Uni o‘zingiz eslab qoladigan, lekin boshqalar topa olmaydigan qilib tuzing. Qog‘ozga yozsangiz, xavfsiz joyda saqlang.",
        shortSummary:
          "Parol sizniki. Uni boshqaga bermang, oddiy qilib qo‘ymang va xavfsiz joyda saqlang.",
        pictogramSummary: [
          { label: "Shaxsiy", description: "Parolni boshqaga aytmaslik kerak." },
          { label: "Aralash", description: "Harf, raqam va belgi qo‘shish foydali." },
          { label: "Yashirin", description: "Yozib qo‘ysangiz, ochiq joyda qoldirmang." }
        ],
        audioTranscript:
          "Parolni kuchli qilish, uni oshkor qilmaslik va xavfsiz saqlash usullari aytiladi.",
        videoCaptions:
          "Oddiy parol xavfli. Aralash parol yaxshiroq. Parolni boshqaga bermang.",
        videoTranscript:
          "Videoda ikki xil parol solishtiriladi va qaysi biri xavfsizroq ekani ko‘rsatiladi.",
        audioDescription:
          "Ekranda birinchi parol juda oddiy, ikkinchisi esa harf, raqam va belgi bilan aralash ko‘rsatilgan.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Qulf belgisi va parol yaratish kartasi",
        imageLongDescription:
          "Rasmda qulf belgisi, parol satri va yonida “boshqaga aytmang” degan qisqa ogohlantirish joylashgan.",
        keywords: ["parol", "xavfsizlik", "himoya", "xotira"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 21,
        recommendedModes: [LearningMode.READING, LearningMode.LISTENING, LearningMode.VISUAL],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: parolni himoya qilish",
          friendlyIntro: "Bu natija baho emas. Keyingi xavfsiz qadamni tanlash uchun yordam.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Parol haqida qaysi fikr to‘g‘ri?",
              easyText: "Qaysi gap to‘g‘ri?",
              options: ["Parolni hammaga aytish mumkin", "Parol shaxsiy bo‘lishi kerak", "Faqat ismning o‘zi yetadi", "Faqat bitta harf bo‘lsa bo‘ladi"],
              correctAnswer: "Parol shaxsiy bo‘lishi kerak",
              explanation: "Parol shaxsiy ma’lumot bo‘lib, boshqalar bilan ulashilmaydi.",
              easyExplanation: "Parol shaxsiy bo‘lishi kerak."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Parolni qog‘ozga yozsangiz, uni ochiq joyda qoldirish yaxshi emas.",
              easyText: "Yozilgan parolni ochiq joyda qoldiramizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Ochiq joyda qolgan parolni boshqalar ko‘rib qolishi mumkin.",
              easyExplanation: "Ha, ochiq joyda qoldirmaymiz."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Kuchliroq parol uchun nimalar foydali bo‘lishi mumkin?",
              easyText: "Parolni yaxshiroq qilish uchun nima qo‘shamiz?",
              options: ["Harf", "Raqam", "Belgi", "Faqat tug‘ilgan sana"],
              correctAnswer: ["Harf", "Raqam", "Belgi"],
              explanation: "Aralash belgilar parolni topishni qiyinlashtiradi.",
              easyExplanation: "Harf, raqam va belgi yaxshi."
            },
            {
              type: QuestionType.MATCHING,
              text: "Harakatni mos joyiga qo‘ying.",
              easyText: "To‘g‘ri juftni toping.",
              options: [
                { left: "Parolni aytish", right: "Xavfli" },
                { left: "Parolni yashirin saqlash", right: "To‘g‘ri" }
              ],
              correctAnswer: [
                { left: "Parolni aytish", right: "Xavfli" },
                { left: "Parolni yashirin saqlash", right: "To‘g‘ri" }
              ],
              explanation: "Parolni boshqalarga aytish xavfli, yashirin saqlash esa to‘g‘ri.",
              easyExplanation: "Aytish xavfli. Yashirish to‘g‘ri."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Parol kimniki bo‘lishi kerak?",
              easyText: "Parol kimga tegishli?",
              correctAnswer: ["shaxsiy", "o‘zimniki", "ozimniki"],
              explanation: "Parol shaxsiy bo‘lishi kerak.",
              easyExplanation: "Parol shaxsiy."
            }
          ]
        }
      }
    ]
  },
  {
    title: "Muloqot va mustaqil hayot ko‘nikmalari",
    description:
      "Yordam so‘rash, kunni rejalashtirish va kundalik muloqotda o‘zingizni aniq ifoda etish uchun amaliy darslar.",
    level: CourseLevel.INTERMEDIATE,
    estimatedDuration: 110,
    coverImage: "/images/lesson-2.svg",
    coverAlt: "Reja, suhbat va yordam so‘rash bo‘yicha kartalar",
    lessons: [
      {
        title: "Jamoat joyida yordam so‘rash",
        description: "Kerak paytda qisqa va aniq yordam so‘rashni mashq qilamiz.",
        learningGoals: [
          { title: "Qisqa gap tuzish", detail: "Kerakni ikki-uch gap bilan ayta olasiz." },
          { title: "Mos kishini tanlash", detail: "Kimdan yordam so‘rash xavfsizroq ekanini bilasiz." },
          { title: "Hurmatli ohang", detail: "Sokin va aniq murojaat qilasiz." }
        ],
        content:
          "Ba’zan mustaqillik yordam so‘ramaslik emas, kerak paytda to‘g‘ri yordam so‘ray bilishdir. Jamoat joyida xodim belgisi bor odam, navbatchi yoki yaqinidagi mas’ul kishiga murojaat qilish xavfsizroq bo‘ladi. “Iltimos, menga yo‘l ko‘rsatib yuborasizmi?” yoki “Menga shu joyni topishda yordam kerak” kabi qisqa gaplar yetarli.",
        easyContent:
          "Yordam kerak bo‘lsa, qisqa gap ayting. Xodim yoki navbatchidan so‘rash xavfsizroq. “Iltimos, yordam kerak” deb boshlash mumkin.",
        shortSummary:
          "Kerak paytda qisqa va aniq yordam so‘rash mustaqillikning bir qismi.",
        pictogramSummary: [
          { label: "Kimdan?", description: "Xodim yoki navbatchidan so‘rang." },
          { label: "Qanday?", description: "Qisqa va aniq gap bilan ayting." },
          { label: "Nima uchun?", description: "Kerakli joy yoki yordamni tushuntiring." }
        ],
        audioTranscript:
          "Yordam kerak bo‘lganda kimga va qanday murojaat qilish mumkinligi tushuntiriladi.",
        videoCaptions:
          "Xodim belgisi ko‘rildi. Sokin murojaat qilindi. Yordam olindi.",
        videoTranscript:
          "Videoda foydalanuvchi jamoat joyida navbatchidan yo‘l so‘raydi va aniq javob oladi.",
        audioDescription:
          "Rasmda navbatchi stoli oldida turgan kishi qo‘l ko‘tarib, muloyim yordam so‘ramoqda.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Jamoat joyida yordam so‘rash holati",
        imageLongDescription:
          "Rasmda metro yoki katta bino ichidagi ma’lumot stoli tasvirlangan. Oldida turgan kishi qo‘l ishorasi bilan murojaat qilmoqda.",
        keywords: ["muloqot", "yordam", "jamoat joyi", "xavfsizlik"],
        level: CourseLevel.INTERMEDIATE,
        estimatedMinutes: 22,
        recommendedModes: [LearningMode.READING, LearningMode.VIDEO, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: yordam so‘rash",
          friendlyIntro: "Bu mashq sizni sinash uchun emas. Qaysi gap qulayroq chiqayotganini bilib olamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Yordam so‘rash uchun kim xavfsizroq tanlov bo‘lishi mumkin?",
              easyText: "Kimdan so‘rash xavfsizroq?",
              options: ["Xodim yoki navbatchi", "Tasodifiy shoshayotgan odam", "Hech kim", "Faqat telefondan"],
              correctAnswer: "Xodim yoki navbatchi",
              explanation: "Mas’ul odamdan yordam so‘rash odatda xavfsizroq va aniqroq bo‘ladi.",
              easyExplanation: "Xodim yoki navbatchi yaxshi tanlov."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Qisqa va aniq gap yordamni tezroq olishga yordam beradi.",
              easyText: "Qisqa gap foydalimi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Kerakni aniq aytsangiz, qarshi tomondagi odam tezroq tushunadi.",
              easyExplanation: "Ha, qisqa gap tushunishni osonlashtiradi."
            },
            {
              type: QuestionType.AUDIO_PROMPT,
              text: "Audio misolda kishi nima qilmoqda?",
              easyText: "Audio nimani ko‘rsatmoqda?",
              audioPromptUrl: sampleAudioUrl,
              options: ["Yo‘l so‘ramoqda", "Qo‘shiq aytmoqda", "Hech narsa demayapti"],
              correctAnswer: "Yo‘l so‘ramoqda",
              explanation: "Audio murojaat ohangini eshitish yordam so‘rashning sokin usulini ko‘rsatadi.",
              easyExplanation: "U yordam so‘rayapti."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Muloyim murojaatda qaysi so‘zlar yordam beradi?",
              easyText: "Qaysi so‘zlar yaxshi eshitiladi?",
              options: ["Iltimos", "Rahmat", "Tez bo‘l", "Menga yordam kerak"],
              correctAnswer: ["Iltimos", "Rahmat", "Menga yordam kerak"],
              explanation: "Muloyim va aniq iboralar muloqotni yengillashtiradi.",
              easyExplanation: "Iltimos, rahmat va aniq so‘zlar yaxshi."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Yordam so‘rashda gapni muloyim boshlash uchun bir so‘z yozing.",
              easyText: "Muloyim boshlash uchun bir so‘z yozing.",
              correctAnswer: ["iltimos"],
              explanation: "“Iltimos” so‘zi murojaatni yumshoq qiladi.",
              easyExplanation: "Masalan, “iltimos”."
            }
          ]
        }
      },
      {
        title: "Kun tartibini rejalashtirish",
        description: "Kunni juda qattiq bosimsiz, kichik qadamlar bilan rejalashtirib ko‘ramiz.",
        learningGoals: [
          { title: "Asosiy ishni tanlash", detail: "Bir kunda 2-3 muhim ishni ajratasiz." },
          { title: "Tanaffus qo‘shish", detail: "Dam olishni ham rejaga kiritasiz." },
          { title: "Belgilib borish", detail: "Bajarilgan ishni qayd etib borasiz." }
        ],
        content:
          "Kun tartibi qattiq jadval bo‘lishi shart emas. U sizga “hozir nima qilaman?” degan savolga javob berishi kifoya. Bir kun uchun 2 yoki 3 asosiy ish tanlansa, rejani davom ettirish osonroq bo‘ladi. Orada dam olish ham albatta rejaning bir qismi. Belgilab borish esa tugallangan ishni ko‘rishga yordam beradi.",
        easyContent:
          "Rejaga hamma narsani sig‘dirish shart emas. 2-3 muhim ishni yozing. Dam olishni ham kiriting. Bajarilganda belgi qo‘ying.",
        shortSummary:
          "Yaxshi reja qisqa bo‘ladi, dam olishni ham hisobga oladi va bajarilgan ishni ko‘rsatib boradi.",
        pictogramSummary: [
          { label: "Tanlash", description: "Bugungi 2-3 asosiy ishni ajrating." },
          { label: "Dam olish", description: "Qisqa tanaffusni ham yozing." },
          { label: "Belgi", description: "Bajarilgach belgilab boring." }
        ],
        audioTranscript:
          "Kunni rejalashtirishda kamroq, lekin aniq ish tanlash foydali ekani tushuntiriladi.",
        videoCaptions:
          "Bugungi ishlar yozildi. Tanaffus qo‘shildi. Bajarilgan ish belgilandi.",
        videoTranscript:
          "Videoda kun tartibi kartasi to‘ldiriladi, tanaffus qo‘shiladi va yakunda bajarilgan ishlar belgilanadi.",
        audioDescription:
          "Qog‘oz yoki ekran ustida uchta yumshoq rangli karta joylashgan. Bittasida dam olish belgisi bor.",
        imageUrl: "/images/lesson-3.svg",
        imageAlt: "Kun tartibi kartalari va belgi qo‘yish namunasi",
        imageLongDescription:
          "Rasmda ertalab, tushlikdan keyin va kechga oid uchta karta turibdi. Ikkinchisida choy ichish yoki dam olish belgisi bor.",
        keywords: ["reja", "kun tartibi", "tanaffus", "mustaqillik"],
        level: CourseLevel.INTERMEDIATE,
        estimatedMinutes: 20,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: kun tartibi",
          friendlyIntro: "Tanaffus ham o‘rganishning bir qismi. Shu fikrni yodda tutib mashq qilamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Bir kun uchun nechta muhim ish tanlash qulayroq bo‘lishi mumkin?",
              easyText: "Bir kun uchun nechta asosiy ish yetarli?",
              options: ["2 yoki 3 ta", "15 ta", "Hech qaysi", "Faqat 10 ta"],
              correctAnswer: "2 yoki 3 ta",
              explanation: "Kamroq, lekin aniq vazifa rejani davom ettirishni osonlashtiradi.",
              easyExplanation: "2 yoki 3 ta ish qulayroq."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Dam olishni reja ichiga kiritish mumkin.",
              easyText: "Dam olishni ham yozamizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Dam olish bo‘lmasa, charchoq tez ortadi.",
              easyExplanation: "Ha, dam olish ham rejaning qismi."
            },
            {
              type: QuestionType.ORDERING,
              text: "Reja bilan ishlash qadamlarini tartiblang.",
              easyText: "Qadamlarni joylang.",
              options: ["Bajarilgan ishni belgilash", "Asosiy ishlarni yozish", "Tanaffus qo‘shish"],
              correctAnswer: ["Asosiy ishlarni yozish", "Tanaffus qo‘shish", "Bajarilgan ishni belgilash"],
              explanation: "Avval ishlarni yozamiz, so‘ng dam olishni qo‘shamiz, keyin belgilab boramiz.",
              easyExplanation: "Oldin yozamiz, keyin dam olamiz, so‘ng belgi qo‘yamiz."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Qaysi ishlar reja uchun foydali bo‘lishi mumkin?",
              easyText: "Rejaga nimalarni yozamiz?",
              options: ["Asosiy vazifa", "Tanaffus", "Faqat bezak", "Muddat"],
              correctAnswer: ["Asosiy vazifa", "Tanaffus", "Muddat"],
              explanation: "Vazifa, dam olish va kerak bo‘lsa vaqt foydali ko‘rsatkich beradi.",
              easyExplanation: "Vazifa, dam olish va vaqt foydali."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Bajarilgan ishni ko‘rsatish uchun nima qilamiz?",
              easyText: "Ish bitganda nima qilamiz?",
              correctAnswer: ["belgi qo‘yamiz", "belgi qoyamiz", "belgilaymiz"],
              explanation: "Belgilab borish motivatsiya beradi va yo‘nalishni ushlab turadi.",
              easyExplanation: "Belgi qo‘yamiz."
            }
          ]
        }
      },
      {
        title: "Telefon orqali aniq gapirish",
        description: "Telefon suhbatida sekin, aniq va kerakli ma’lumotni aytishni mashq qilamiz.",
        learningGoals: [
          { title: "Salomlashish", detail: "Gapni ochiq va muloyim boshlaysiz." },
          { title: "Asosiy gap", detail: "Kerakni qisqa ifoda qila olasiz." },
          { title: "Takrorlab tekshirish", detail: "Tushunganingizni qayta aytib tekshirasiz." }
        ],
        content:
          "Telefon suhbati ko‘rinmas muloqot bo‘lgani uchun gapni aniq va sokin aytish muhim. Juda tez gapirish tinglovchini ham, sizni ham charchatadi. Avval salomlashing, keyin nima kerakligini bir-ikki gap bilan ayting. Agar qarshi tomon ma’lumot bersa, uni qayta aytib tekshirish mumkin: “Demak, uchrashuv soat 3 da, to‘g‘rimi?”",
        easyContent:
          "Telefon orqali gapirganda sekin gapiring. Avval salomlashing. Keyin kerakli gapni qisqa ayting. Oxirida tushunganingizni tekshirib oling.",
        shortSummary:
          "Telefon suhbati uchun: salomlashish, qisqa gapirish va qayta tekshirish foydali.",
        pictogramSummary: [
          { label: "Salom", description: "Suhbatni muloyim oching." },
          { label: "Qisqa gap", description: "Kerakli ma’lumotni aniq ayting." },
          { label: "Tekshirish", description: "Tushunganingizni qayta so‘rab ko‘ring." }
        ],
        audioTranscript:
          "Telefon suhbatini sekin boshlash, kerakni aytish va yakunda tekshirish ko‘rsatiladi.",
        videoCaptions:
          "Salomlashildi. Kerakli gap aytildi. Vaqt qayta tekshirildi.",
        videoTranscript:
          "Videoda ikki kishi telefon orqali gaplashadi va ma’lumotni qayta tasdiqlaydi.",
        audioDescription:
          "Ekranda telefon tutib turgan odamning yonida uchta qadamli ko‘rsatma chiqadi.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Telefon suhbati bosqichlari",
        imageLongDescription:
          "Rasmda telefon rasmi va yonida “salomlashish”, “kerakni aytish”, “tekshirish” kartalari joylashgan.",
        keywords: ["telefon", "muloqot", "aniq gap", "tekshirish"],
        level: CourseLevel.INTERMEDIATE,
        estimatedMinutes: 20,
        recommendedModes: [LearningMode.LISTENING, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: telefon orqali gapirish",
          friendlyIntro: "Murakkab bo‘lsa ham mayli. Keling, gapni qisqa qilib boshlashni mashq qilamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Telefon suhbatini qanday boshlash foydaliroq?",
              easyText: "Suhbatni qanday boshlaymiz?",
              options: ["Salomlashib", "Birdan baqirib", "Hech nima demasdan", "Faqat kutib"],
              correctAnswer: "Salomlashib",
              explanation: "Muloyim salomlashish suhbatni yengil boshlaydi.",
              easyExplanation: "Oldin salomlashamiz."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Juda tez gapirish tushunishni qiyinlashtirishi mumkin.",
              easyText: "Tez gapirish qiyinlik tug‘diradimi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Sekin va aniq gap ko‘proq tushuniladi.",
              easyExplanation: "Ha, sekinroq gap yaxshi."
            },
            {
              type: QuestionType.AUDIO_PROMPT,
              text: "Audio misolda odam nima qilmoqda?",
              easyText: "Audio nimani ko‘rsatmoqda?",
              audioPromptUrl: sampleAudioUrl,
              options: ["Vaqtni qayta tekshirayotgani", "Qo‘shiq eshitayotgani", "Ko‘chada yurgani"],
              correctAnswer: "Vaqtni qayta tekshirayotgani",
              explanation: "Qayta tekshirish noto‘g‘ri tushunish ehtimolini kamaytiradi.",
              easyExplanation: "U ma’lumotni tekshiryapti."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Telefon suhbatida qaysi odatlar foydali?",
              easyText: "Nimalar foydali?",
              options: ["Sekin gapirish", "Qisqa gapirish", "Tekshirib olish", "Gapni juda cho‘zish"],
              correctAnswer: ["Sekin gapirish", "Qisqa gapirish", "Tekshirib olish"],
              explanation: "Sokin tempo va qayta tekshirish suhbatni aniq qiladi.",
              easyExplanation: "Sekin, qisqa va tekshirib gapirish yaxshi."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Tushunganingizni yana bir bor so‘rashning foydasi nima?",
              easyText: "Nega yana bir bor tekshiramiz?",
              correctAnswer: ["xato bo‘lmasligi uchun", "aniq bo‘lishi uchun", "tushunish uchun"],
              explanation: "Qayta tekshirish xatoni kamaytiradi.",
              easyExplanation: "Aniq bo‘lishi uchun."
            }
          ]
        }
      },
      {
        title: "Yo‘l belgilarini tushunib harakat qilish",
        description: "Belgi, yozuv va rangni birga o‘qib, xavfsiz harakatlanishni ko‘ramiz.",
        learningGoals: [
          { title: "Belgi va yozuvni birga ko‘rish", detail: "Faqat rangga emas, yozuvga ham qaraysiz." },
          { title: "Asosiy ogohlantirishni tushunish", detail: "Qayerda to‘xtash yoki ehtiyot bo‘lishni bilasiz." },
          { title: "Yo‘nalishni topish", detail: "Ko‘rsatkich belgidan foydalanasiz." }
        ],
        content:
          "Ba’zi belgilar rang bilan tez ko‘zga tashlanadi, lekin har doim yozuvga ham qarash kerak. Chunki rangning o‘zi yetmaydi. Masalan, chiqish yo‘li ko‘rsatkichi, lift, zinapoya yoki xavf belgisi. Agar belgi murakkab ko‘rinsa, yonidagi yozuv yoki piktogrammaga qarang. Kerak bo‘lsa, yo‘l ko‘rsatkichni suratga olib, keyin yana ko‘rib chiqish ham mumkin.",
        easyContent:
          "Belgida faqat rangga qarab qolmang. Yozuvni ham o‘qing. Rasm yoki piktogramma ham yordam beradi.",
        shortSummary:
          "Belgi, yozuv va rasmni birga o‘qisangiz, yo‘nalishni topish osonlashadi.",
        pictogramSummary: [
          { label: "Rang", description: "Rang yordam beradi, lekin o‘zi yetmaydi." },
          { label: "Yozuv", description: "Belgining matniga ham qarang." },
          { label: "Piktogramma", description: "Rasmli ishora tez tushunishga yordam beradi." }
        ],
        audioTranscript:
          "Belgi va yozuvni birga o‘qish nega kerakligi va qanday yordam berishi aytiladi.",
        videoCaptions:
          "Belgi ko‘rildi. Yozuv o‘qildi. Yo‘nalish topildi.",
        videoTranscript:
          "Videoda chiqish belgisi va lift ko‘rsatkichi yordamida yo‘nalish tanlanadi.",
        audioDescription:
          "Rasmda yashil chiqish belgisi va uning yonida qora yozuvli yo‘nalish belgisi turibdi.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Yo‘l belgilari va piktogrammalar",
        imageLongDescription:
          "Rasmda chiqish yo‘li belgisi, lift belgisi va yonida qisqa matnli ko‘rsatkichlar bor.",
        keywords: ["belgi", "yo‘nalish", "piktogramma", "xavfsizlik"],
        level: CourseLevel.INTERMEDIATE,
        estimatedMinutes: 23,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: belgi va yozuv",
          friendlyIntro: "Rangning o‘zi yetmaydi. Keling, yozuv va rasmni birga ko‘rishni mashq qilamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Belgini tushunishda yana nimaga qarash kerak?",
              easyText: "Belgidan tashqari nimaga qaraymiz?",
              options: ["Yozuvga", "Faqat rangga", "Faqat ovozga", "Hech narsaga"],
              correctAnswer: "Yozuvga",
              explanation: "Yozuv ma’noni aniqroq qiladi.",
              easyExplanation: "Yozuvga ham qaraymiz."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Rang bilan berilgan ma’lumotni matn bilan ham tushuntirish foydali.",
              easyText: "Rang yonida matn bo‘lsa foydalimi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Matn va rasm birga bo‘lsa, ko‘proq foydalanuvchiga yordam beradi.",
              easyExplanation: "Ha, matn ham kerak."
            },
            {
              type: QuestionType.IMAGE_CHOICE,
              text: "Qaysi rasm yo‘nalish ko‘rsatkichini yaxshiroq tasvirlaydi?",
              easyText: "Yo‘nalish belgisi qaysi?",
              options: [
                { label: "Belgi va yozuv birga", value: "sign", image: "/images/lesson-2.svg" },
                { label: "Faqat bo‘sh ekran", value: "blank", image: "/images/lesson-1.svg" }
              ],
              correctAnswer: "sign",
              explanation: "Belgi va yozuv birga bo‘lsa, ma’no aniqroq bo‘ladi.",
              easyExplanation: "Belgi va yozuv birga turgani to‘g‘ri."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Yo‘l topishda nimalar yordam beradi?",
              easyText: "Nimalar yordam beradi?",
              options: ["Belgi", "Yozuv", "Piktogramma", "Faqat bezak"],
              correctAnswer: ["Belgi", "Yozuv", "Piktogramma"],
              explanation: "Bu uchala ma’lumot birga bo‘lsa, tushunish osonlashadi.",
              easyExplanation: "Belgi, yozuv va piktogramma yordam beradi."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Belgining rasmli qismini bir so‘z bilan nima deyish mumkin?",
              easyText: "Rasmli ishora nima deyiladi?",
              correctAnswer: ["piktogramma", "piktogram"],
              explanation: "Piktogramma tez tushunishga yordam beradigan rasmli ishora.",
              easyExplanation: "Piktogramma deyiladi."
            }
          ]
        }
      }
    ]
  },
  {
    title: "Matematika kundalik hayotda",
    description:
      "Do‘kon, vaqt va oddiy rejalarda ishlatiladigan sonlarni tushunish uchun kundalik misollarga tayangan kurs.",
    level: CourseLevel.BEGINNER,
    estimatedDuration: 105,
    coverImage: "/images/lesson-3.svg",
    coverAlt: "Pul, soat va hisob-kitob bo‘yicha iliq kartalar",
    lessons: [
      {
        title: "Do‘konda hisob-kitob qilish",
        description: "Narxni o‘qish, pulni berish va qaytimni tekshirishni mashq qilamiz.",
        learningGoals: [
          { title: "Narxni ko‘rish", detail: "Mahsulot narxini to‘g‘ri o‘qiysiz." },
          { title: "Pulni tanlash", detail: "Kerakli kupyura yoki tangani topasiz." },
          { title: "Qaytimni tekshirish", detail: "Ortiqcha yoki kam pul qolmaganini ko‘rasiz." }
        ],
        content:
          "Do‘konda hisob-kitob qilish matematikani kundalik hayotga olib keladi. Avval mahsulot narxini o‘qing. Keyin qancha pul berayotganingizni ayting yoki ko‘rsating. Agar qaytim bo‘lsa, uni ham ko‘rib chiqing. Bu yerda shoshilish shart emas. Kerak bo‘lsa, sotuvchidan qayta aytib berishni so‘rash mumkin. Muhimi, siz jarayonni tushunib turing.",
        easyContent:
          "Narxga qarang. Qancha pul berayotganingizni biling. Qaytim bo‘lsa, uni ham tekshiring. Tushunmasangiz yana bir bor so‘rang.",
        shortSummary:
          "Narx, berilgan pul va qaytimni birga ko‘rsangiz, do‘kondagi hisob ancha osonlashadi.",
        pictogramSummary: [
          { label: "Narx", description: "Avval mahsulot narxini o‘qing." },
          { label: "Pul", description: "Qancha berayotganingizni biling." },
          { label: "Qaytim", description: "Qolgan pulni tekshiring." }
        ],
        audioTranscript:
          "Do‘konda narxni o‘qish, pul berish va qaytimni tekshirish bosqichlari aytiladi.",
        videoCaptions:
          "Narx o‘qildi. Pul berildi. Qaytim tekshirildi.",
        videoTranscript:
          "Videoda mahsulot tanlanadi, narx ko‘riladi va sotuvchi qaytim beradi.",
        audioDescription:
          "Stolda non, daftar va narx yozilgan yorliq bor. Keyin qo‘lda kupyura ko‘rsatiladi.",
        imageUrl: "/images/lesson-1.svg",
        imageAlt: "Do‘konda narx va qaytim misoli",
        imageLongDescription:
          "Rasmda mahsulot, uning narxi va pastda qaytim sifatida berilgan ikki xil kupyura tasvirlangan.",
        keywords: ["matematika", "do‘kon", "narx", "qaytim"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 20,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: do‘konda hisob",
          friendlyIntro: "Bu mavzu hali mustahkamlanayotgan bo‘lishi mumkin. Keling, eng yengil qadamdan boramiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Hisob-kitobni boshlashda avval nimaga qaraymiz?",
              easyText: "Oldin nimani ko‘ramiz?",
              options: ["Narxga", "Faqat rangga", "Faqat paketga", "Faqat tovushga"],
              correctAnswer: "Narxga",
              explanation: "Narxni bilmasdan to‘g‘ri pul ajratish qiyin.",
              easyExplanation: "Oldin narxga qaraymiz."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Qaytimni tekshirish foydali.",
              easyText: "Qaytimni ko‘ramizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Qaytimni tekshirish hisobni tushunishga yordam beradi.",
              easyExplanation: "Ha, qaytimni ko‘ramiz."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Do‘kondagi hisobda qaysi narsalar muhim?",
              easyText: "Nimalar kerak?",
              options: ["Narx", "Berilgan pul", "Qaytim", "Faqat sumka rangi"],
              correctAnswer: ["Narx", "Berilgan pul", "Qaytim"],
              explanation: "Shu uch ma’lumot birga bo‘lsa, hisob aniqroq ko‘rinadi.",
              easyExplanation: "Narx, pul va qaytim kerak."
            },
            {
              type: QuestionType.IMAGE_CHOICE,
              text: "Qaysi rasmda do‘kon hisobiga oid ma’lumot bor?",
              easyText: "Qaysi rasm hisobni ko‘rsatadi?",
              options: [
                { label: "Narx va qaytim rasmi", value: "shop", image: "/images/lesson-1.svg" },
                { label: "Bo‘sh ekran", value: "blank", image: "/images/lesson-2.svg" }
              ],
              correctAnswer: "shop",
              explanation: "Narx va qaytim aks etgan rasm hisob-kitobga yaqinroq.",
              easyExplanation: "Narxli rasm to‘g‘ri."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Sotuvchi qaytargan pul nima deyiladi?",
              easyText: "Qolgan pul nima?",
              correctAnswer: ["qaytim"],
              explanation: "Mahsulot uchun ortiqcha berilgan pulning qaytarilgan qismi qaytim deyiladi.",
              easyExplanation: "Qaytim deyiladi."
            }
          ]
        }
      },
      {
        title: "Pulni tejash uchun oddiy reja tuzish",
        description: "Kichik maqsad uchun qancha yig‘ish kerakligini sodda usulda ko‘ramiz.",
        learningGoals: [
          { title: "Maqsadni yozish", detail: "Nima uchun pul yig‘ayotganingizni aniqlaysiz." },
          { title: "Qismlarga bo‘lish", detail: "Katta summani kichik bo‘laklarga bo‘lasiz." },
          { title: "Belgilab borish", detail: "Yig‘ilgan pulni muntazam qayd etasiz." }
        ],
        content:
          "Tejash rejasi katta bo‘lishi shart emas. Masalan, daftar, quloqchin yoki sayohat uchun ham pul yig‘ish mumkin. Muhimi, umumiy summani kichik qismlarga bo‘lish. Agar 60 ming so‘m kerak bo‘lsa, uni 10 mingdan 6 marta yig‘ish ham mumkin. Belgilab borish sizga qanchasi qolganini ko‘rsatadi.",
        easyContent:
          "Maqsadni yozing. Katta summani kichik qismlarga bo‘ling. Har safar yig‘gan pulni belgilang.",
        shortSummary:
          "Tejash osonroq bo‘lishi uchun katta summani kichik bo‘laklarga bo‘lish foydali.",
        pictogramSummary: [
          { label: "Maqsad", description: "Nima uchun yig‘ayotganingizni yozing." },
          { label: "Qism", description: "Pulni kichik bo‘laklarga ajrating." },
          { label: "Belgila", description: "Har safar yig‘ilganini yozib boring." }
        ],
        audioTranscript:
          "Tejashda maqsad, kichik summa va belgilib borish qanday yordam berishi tushuntiriladi.",
        videoCaptions:
          "Maqsad yozildi. Summa qismlarga bo‘lindi. Belgilar qo‘yildi.",
        videoTranscript:
          "Videoda jamg‘arma kartasi to‘ldiriladi va yig‘ilgan pul ustiga belgi qo‘yiladi.",
        audioDescription:
          "Ekranda chiziqli jadval va yonida olti ta kichik doira ko‘rsatilgan. Ikki doira bo‘yalgan.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Tejash rejasini ko‘rsatuvchi kartalar",
        imageLongDescription:
          "Rasmda maqsad nomi, umumiy summa va uni kichik qismga ajratilgan doiralar bilan ko‘rsatilgan reja bor.",
        keywords: ["pul", "tejash", "reja", "summa"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 19,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.LISTENING],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: tejash rejasi",
          friendlyIntro: "Katta summa ko‘rinsa, qo‘rqinchli tuyilishi mumkin. Keling, uni mayda qismlarga bo‘lib ko‘ramiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Katta summani yengilroq qilish uchun nima foydali?",
              easyText: "Katta pulni qanday yengillatamiz?",
              options: ["Qismlarga bo‘lish", "Uni unutish", "Faqat bir kunda yig‘ish", "Hech narsa yozmaslik"],
              correctAnswer: "Qismlarga bo‘lish",
              explanation: "Katta maqsadni kichik qadamlar bilan ko‘rish ruhiy bosimni kamaytiradi.",
              easyExplanation: "Qismlarga bo‘lamiz."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Yig‘ilgan pulni qayd etib borish foydali.",
              easyText: "Belgilib boramizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Qayd etish qanchasi qolganini aniq ko‘rsatadi.",
              easyExplanation: "Ha, belgilash foydali."
            },
            {
              type: QuestionType.ORDERING,
              text: "Tejash rejasining qadamlarini tartiblang.",
              easyText: "Qadamlarni joylang.",
              options: ["Yig‘ilgan pulni belgilash", "Maqsadni yozish", "Summani bo‘lish"],
              correctAnswer: ["Maqsadni yozish", "Summani bo‘lish", "Yig‘ilgan pulni belgilash"],
              explanation: "Oldin maqsad, keyin qism, keyin belgilash.",
              easyExplanation: "Maqsad, qism, belgi."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Tejashga nimalar yordam beradi?",
              easyText: "Nimalar foydali?",
              options: ["Aniq maqsad", "Kichik summa", "Qayd", "Hammasini bir kunda qilish"],
              correctAnswer: ["Aniq maqsad", "Kichik summa", "Qayd"],
              explanation: "Maqsad, mayda qadam va qayd jarayonni ko‘rinadigan qiladi.",
              easyExplanation: "Maqsad, kichik summa va qayd kerak."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Pul yig‘ish uchun oldin nimani aniqlab olamiz?",
              easyText: "Avval nimani bilamiz?",
              correctAnswer: ["maqsad", "maqsadni"],
              explanation: "Maqsad bo‘lsa, reja tuzish osonlashadi.",
              easyExplanation: "Avval maqsad."
            }
          ]
        }
      },
      {
        title: "Vaqtni soat bo‘yicha tushunish",
        description: "Soatga qarab uchrashuv yoki dars vaqtini to‘g‘ri anglashni ko‘ramiz.",
        learningGoals: [
          { title: "Soatni o‘qish", detail: "Butun va yarim soatni ajratasiz." },
          { title: "Vaqtni aytish", detail: "Qachon boshlanishini og‘zaki ayta olasiz." },
          { title: "Kechikmaslik", detail: "Oldindan tayyor turish odatini shakllantirasiz." }
        ],
        content:
          "Vaqtni tushunish kundalik mustaqillikda juda kerak. Soatga qarab “hozir”, “yarim soatdan keyin” yoki “soat uchda” degan ma’noni bilish uchrashuv va darslarga tayyor turishga yordam beradi. Agar soat murakkab ko‘rinsa, raqamli ko‘rinishdan boshlash mumkin. Keyin asta-sekin oddiy soat ko‘rinishiga o‘tasiz.",
        easyContent:
          "Soat sizga qachon borish yoki kutish kerakligini aytadi. Avval butun soat va yarim soatni o‘rganish yetarli.",
        shortSummary:
          "Avval butun soat va yarim soatni tushunsangiz, kun tartibi ancha yengillashadi.",
        pictogramSummary: [
          { label: "Butun soat", description: "Masalan, 3:00." },
          { label: "Yarim soat", description: "Masalan, 3:30." },
          { label: "Oldindan tayyor", description: "Vaqtdan biroz oldin tayyor turish foydali." }
        ],
        audioTranscript:
          "Soatning butun va yarim ko‘rinishi hamda oldindan tayyor turish haqida aytiladi.",
        videoCaptions:
          "Soat 3:00. Keyin 3:30. Tayyorgarlik eslatildi.",
        videoTranscript:
          "Videoda raqamli va oddiy soat ko‘rinishi birgalikda ko‘rsatiladi.",
        audioDescription:
          "Ekranda dumaloq soat va yonida 3:00 hamda 3:30 yozuvlari turibdi.",
        imageUrl: "/images/lesson-3.svg",
        imageAlt: "Soat va vaqt ko‘rsatkichlari",
        imageLongDescription:
          "Rasmda bitta analog soat va yonida raqamli vaqt ko‘rsatuvchi ikkita kichik blok joylashgan.",
        keywords: ["vaqt", "soat", "reja", "uchrashuv"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 22,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: soatni tushunish",
          friendlyIntro: "Bu joy murakkabroq tuyulsa ham mayli. Keling, eng sodda ko‘rinishdan boshlaymiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "3:30 nimani bildiradi?",
              easyText: "3:30 nima?",
              options: ["Yarim soat", "Tun yarmi", "Bir kun", "Bir daqiqa"],
              correctAnswer: "Yarim soat",
              explanation: "3:30 uch yarim yoki uchdan yarim soat o‘tgan vaqtni bildiradi.",
              easyExplanation: "Bu yarim soatli ko‘rinish."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Vaqtdan biroz oldin tayyor turish foydali.",
              easyText: "Oldindan tayyor turamizmi?",
              options: ["True", "False"],
              correctAnswer: true,
              explanation: "Bu kechikmaslikka yordam beradi.",
              easyExplanation: "Ha, foydali."
            },
            {
              type: QuestionType.IMAGE_CHOICE,
              text: "Qaysi rasm vaqt mavzusiga mos?",
              easyText: "Soat qaysi rasmda?",
              options: [
                { label: "Soat rasmi", value: "clock", image: "/images/lesson-3.svg" },
                { label: "Faqat bezak", value: "blank", image: "/images/lesson-1.svg" }
              ],
              correctAnswer: "clock",
              explanation: "Soat rasmi vaqtni tushunishga doir ma’lumot beradi.",
              easyExplanation: "Soatli rasm to‘g‘ri."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Vaqtni tushunishga nimalar yordam beradi?",
              easyText: "Nima yordam beradi?",
              options: ["Raqamli ko‘rinish", "Analog soat", "Oldindan tayyor turish", "Faqat taxmin qilish"],
              correctAnswer: ["Raqamli ko‘rinish", "Analog soat", "Oldindan tayyor turish"],
              explanation: "Turli ko‘rinishlar va tayyorgarlik vaqtni boshqarishni yengillashtiradi.",
              easyExplanation: "Raqamli, analog va tayyorgarlik yordam beradi."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "3:00 qanday ko‘rinish hisoblanadi?",
              easyText: "3:00 qanaqa vaqt?",
              correctAnswer: ["butun soat", "butun"],
              explanation: "Bu butun soat ko‘rinishi.",
              easyExplanation: "Butun soat."
            }
          ]
        }
      },
      {
        title: "O‘lchov va taqqoslash",
        description: "Uzun, qisqa, og‘ir, yengil kabi oddiy taqqoslashlardan foydalanamiz.",
        learningGoals: [
          { title: "Taqqoslash so‘zlari", detail: "Uzunroq, qisqaroq, og‘irroq kabi so‘zlarni ajratasiz." },
          { title: "Oddiy o‘lchov", detail: "Asosiy farqni ko‘ra olasiz." },
          { title: "Tanlash", detail: "Qaysi narsa mosroq ekanini solishtirib tanlaysiz." }
        ],
        content:
          "Taqqoslash kundalik hayotda ko‘p kerak bo‘ladi. Masalan, qaysi sumka yengilroq, qaysi yo‘l yaqinroq, qaysi shisha kattaroq. Murakkab formula shart emas. Ko‘p holatda narsa-narsani solishtirishning o‘zi kifoya. Agar rasm yordam bersa, ikkita narsani yonma-yon qo‘yib ko‘rish foydali.",
        easyContent:
          "Ba’zan faqat solishtirishning o‘zi yetadi. Qaysi biri katta, qaysi biri kichik, qaysi biri og‘ir yoki yengil ekanini ko‘ring.",
        shortSummary:
          "Taqqoslash kundalik tanlovlarda foydali: qaysi biri katta, yaqin yoki yengil ekanini bilasiz.",
        pictogramSummary: [
          { label: "Katta-kichik", description: "Hajmni taqqoslash." },
          { label: "Og‘ir-yengil", description: "Ko‘tarish yoki tanlashda foydali." },
          { label: "Yaqin-uzoq", description: "Yo‘l yoki joy tanlashda kerak." }
        ],
        audioTranscript:
          "Taqqoslash so‘zlari va ularni kundalik hayotda ishlatish tushuntiriladi.",
        videoCaptions:
          "Ikki buyum yonma-yon turibdi. Farq topildi. Mosrog‘i tanlandi.",
        videoTranscript:
          "Videoda ikki shisha, ikki quti va ikki yo‘l belgisi taqqoslab ko‘rsatiladi.",
        audioDescription:
          "Rasmda yonma-yon ikkita buyum turibdi. Biri kattaroq, biri kichikroq ko‘rinadi.",
        imageUrl: "/images/lesson-2.svg",
        imageAlt: "Taqqoslash uchun yonma-yon qo‘yilgan buyumlar",
        imageLongDescription:
          "Rasmda ikki xil kattalikdagi quti va ikki xil uzunlikdagi chiziq tasvirlangan. Farq ko‘z bilan ko‘rinadi.",
        keywords: ["o‘lchov", "taqqoslash", "katta", "yengil"],
        level: CourseLevel.BEGINNER,
        estimatedMinutes: 21,
        recommendedModes: [LearningMode.VISUAL, LearningMode.READING, LearningMode.MIXED],
        disabilityRecommendations: commonRecommendations,
        quiz: {
          title: "Kichik mashq: taqqoslash",
          friendlyIntro: "Noto‘g‘ri bo‘lsa ham mayli. Muhimi, qaysi joy chalg‘itganini ko‘rib olamiz.",
          questions: [
            {
              type: QuestionType.SINGLE_CHOICE,
              text: "Ikki narsani yonma-yon ko‘rish nimaga yordam beradi?",
              easyText: "Yonma-yon ko‘rish nima qiladi?",
              options: ["Taqqoslashga", "Yashirishga", "Unutishga", "Faqat bezakka"],
              correctAnswer: "Taqqoslashga",
              explanation: "Yonma-yon ko‘rish farqni aniqroq qiladi.",
              easyExplanation: "Taqqoslashga yordam beradi."
            },
            {
              type: QuestionType.TRUE_FALSE,
              text: "Taqqoslash uchun har doim murakkab formula kerak.",
              easyText: "Har doim formula kerakmi?",
              options: ["True", "False"],
              correctAnswer: false,
              explanation: "Ko‘p holatda oddiy kuzatishning o‘zi yetadi.",
              easyExplanation: "Yo‘q, oddiy qarash ham yetadi."
            },
            {
              type: QuestionType.MULTIPLE_CHOICE,
              text: "Taqqoslash qaysi juftliklarda foydali bo‘lishi mumkin?",
              easyText: "Qaysi juftlarni solishtiramiz?",
              options: ["Katta-kichik", "Og‘ir-yengil", "Yaqin-uzoq", "Faqat bir xil narsalar"],
              correctAnswer: ["Katta-kichik", "Og‘ir-yengil", "Yaqin-uzoq"],
              explanation: "Bu juftliklar kundalik hayotda tez-tez uchraydi.",
              easyExplanation: "Katta-kichik, og‘ir-yengil, yaqin-uzoq."
            },
            {
              type: QuestionType.IMAGE_CHOICE,
              text: "Qaysi rasmda taqqoslash aniqroq ko‘rinadi?",
              easyText: "Taqqoslash uchun qaysi rasm yaxshi?",
              options: [
                { label: "Yonma-yon buyumlar", value: "compare", image: "/images/lesson-2.svg" },
                { label: "Bo‘sh fon", value: "blank", image: "/images/lesson-1.svg" }
              ],
              correctAnswer: "compare",
              explanation: "Yonma-yon joylashuv farqni ko‘rsatadi.",
              easyExplanation: "Yonma-yon buyumlar yaxshi."
            },
            {
              type: QuestionType.SHORT_ANSWER,
              text: "Ikki narsani bir-biriga qarab farqini ko‘rish nima deyiladi?",
              easyText: "Farqini ko‘rish nima?",
              correctAnswer: ["taqqoslash", "solishtirish"],
              explanation: "Bu taqqoslash yoki solishtirish deyiladi.",
              easyExplanation: "Taqqoslash deyiladi."
            }
          ]
        }
      }
    ]
  }
];

function getDefaultAccessibility() {
  return {
    fontScale: FontScale.NORMAL,
    contrastMode: ContrastMode.NORMAL,
    dyslexiaFont: false,
    reduceMotion: false,
    captions: true,
    transcript: true,
    textToSpeech: true,
    audioDescription: false,
    readingRuler: false,
    letterSpacing: false,
    lineHeight: false,
    simplifiedUi: false,
    easyLanguage: false,
    largeControls: false,
    keyboardMode: false,
    calmMode: false
  };
}

async function main() {
  await prisma.quizAttempt.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.aiInteraction.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.accessibilitySettings.deleteMany();
  await prisma.user.deleteMany();

  const admin = await prisma.user.create({
    data: {
      name: "Boshqaruv administratori",
      email: "admin@example.com",
      passwordHash: hashPassword("admin123"),
      role: Role.ADMIN,
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          keyboardMode: true
        }
      }
    }
  });

  const teacher = await prisma.user.create({
    data: {
      name: "Dilnoza Rahimova",
      email: "teacher@example.com",
      passwordHash: hashPassword("teacher123"),
      role: Role.TEACHER,
      preferredLearningMode: LearningMode.MIXED,
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          captions: true,
          transcript: true
        }
      }
    }
  });

  const student = await prisma.user.create({
    data: {
      name: "Ali Karimov",
      email: "student@example.com",
      passwordHash: hashPassword("student123"),
      role: Role.STUDENT,
      disabilityProfile: "Matn cho‘zilib ketsa charchatadi. Audio va qisqa xulosa yordam beradi.",
      preferredLearningMode: LearningMode.LISTENING,
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          fontScale: FontScale.LARGE,
          captions: true,
          transcript: true,
          textToSpeech: true,
          easyLanguage: true,
          calmMode: true
        }
      }
    }
  });

  const parent = await prisma.user.create({
    data: {
      name: "Malika Karimova",
      email: "parent@example.com",
      passwordHash: hashPassword("parent123"),
      role: Role.PARENT,
      childEmail: "student@example.com",
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          fontScale: FontScale.LARGE,
          largeControls: true
        }
      }
    }
  });

  const secondStudent = await prisma.user.create({
    data: {
      name: "Sardor Nematov",
      email: "sardor@example.com",
      passwordHash: hashPassword("student123"),
      role: Role.STUDENT,
      disabilityProfile: "Klaviatura bilan boshqarish qulay. Fokus halqasi aniq ko‘rinsa yaxshi.",
      preferredLearningMode: LearningMode.VISUAL,
      parentId: parent.id,
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          largeControls: true,
          keyboardMode: true,
          readingRuler: true
        }
      }
    }
  });

  const thirdStudent = await prisma.user.create({
    data: {
      name: "Lobar Otaboyeva",
      email: "lobar@example.com",
      passwordHash: hashPassword("student123"),
      role: Role.STUDENT,
      disabilityProfile: "Subtitr va transkript bo‘lsa darsni tezroq tushunadi.",
      preferredLearningMode: LearningMode.VIDEO,
      accessibilitySettings: {
        create: {
          ...getDefaultAccessibility(),
          captions: true,
          transcript: true,
          contrastMode: ContrastMode.HIGH
        }
      }
    }
  });

  const createdCourses = [];

  for (const course of courses) {
    const createdCourse = await prisma.course.create({
      data: {
        title: course.title,
        description: course.description,
        level: course.level,
        estimatedDuration: course.estimatedDuration,
        coverImage: course.coverImage,
        coverAlt: course.coverAlt,
        createdById: teacher.id,
        lessons: {
          create: course.lessons.map((lesson) => ({
            title: lesson.title,
            description: lesson.description,
            learningGoals: lesson.learningGoals,
            content: lesson.content,
            easyContent: lesson.easyContent,
            shortSummary: lesson.shortSummary,
            pictogramSummary: lesson.pictogramSummary,
            audioUrl: sampleAudioUrl,
            audioTranscript: lesson.audioTranscript,
            videoUrl: sampleVideoUrl,
            videoCaptions: lesson.videoCaptions,
            videoTranscript: lesson.videoTranscript,
            audioDescription: lesson.audioDescription,
            imageUrl: lesson.imageUrl,
            imageAlt: lesson.imageAlt,
            imageLongDescription: lesson.imageLongDescription,
            keywords: lesson.keywords,
            level: lesson.level,
            estimatedMinutes: lesson.estimatedMinutes,
            recommendedModes: lesson.recommendedModes,
            disabilityRecommendations: lesson.disabilityRecommendations,
            quiz: {
              create: {
                title: lesson.quiz.title,
                friendlyIntro: lesson.quiz.friendlyIntro,
                questions: {
                  create: lesson.quiz.questions
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
  const lessonsByTitle = Object.fromEntries(allLessons.map((lesson) => [lesson.title, lesson]));

  const studentProgress = [
    {
      userId: student.id,
      lessonTitle: "Kompyuterni yoqish va xavfsiz ishlatish",
      completed: true,
      preferredModeUsed: LearningMode.LISTENING,
      timeSpent: 16,
      teacherComment: "Audio va qisqa xulosa birga berilganda mavzuni ancha tez ushladi.",
      strengths: "Ketma-ketlikni eslab qolish",
      improvementAreas: "Klaviatura amaliyotini yana bir marta ko‘rish foydali",
      learnerFeedback: "Audio bilan boshlaganimda osonroq bo‘ldi.",
      emotionalState: "READY" as const
    },
    {
      userId: student.id,
      lessonTitle: "Klaviatura bilan boshqarish",
      completed: false,
      preferredModeUsed: LearningMode.VISUAL,
      timeSpent: 12,
      teacherComment: "Fokusni topmoqda, lekin amaliyotda sekinlik bor.",
      strengths: "Tab tugmasini topish",
      improvementAreas: "Enter va Shift + Tab ni ko‘proq mashq qilish",
      learnerFeedback: "Rasmli ko‘rsatma yaxshi yordam berdi.",
      emotionalState: "NEED_HELP" as const
    },
    {
      userId: secondStudent.id,
      lessonTitle: "Kun tartibini rejalashtirish",
      completed: true,
      preferredModeUsed: LearningMode.VISUAL,
      timeSpent: 18,
      teacherComment: "Kartalar bilan ishlaganda vazifalarni ancha tez tartibladi.",
      strengths: "Qadamlarni bo‘lib olish",
      improvementAreas: "Matnli tushuntirishni qisqa ushlab turish kerak",
      learnerFeedback: "Kartalar bilan ishlash qulayroq bo‘ldi.",
      emotionalState: "CALM" as const
    },
    {
      userId: thirdStudent.id,
      lessonTitle: "Telefon orqali aniq gapirish",
      completed: false,
      preferredModeUsed: LearningMode.VIDEO,
      timeSpent: 14,
      teacherComment: "Subtitr yoqilganda yaxshi kuzatdi, lekin qayta aytish qismi qiyin bo‘ldi.",
      strengths: "Asosiy gapni topish",
      improvementAreas: "Yakuniy tekshirish iborasini ko‘proq mashq qilish",
      learnerFeedback: "Subtitr bo‘lsa anchagina osonlashadi.",
      emotionalState: "TIRED" as const
    }
  ];

  for (const entry of studentProgress) {
    const lesson = lessonsByTitle[entry.lessonTitle];

    if (!lesson) {
      continue;
    }

    await prisma.progress.create({
      data: {
        userId: entry.userId,
        lessonId: lesson.id,
        completed: entry.completed,
        preferredModeUsed: entry.preferredModeUsed,
        timeSpent: entry.timeSpent,
        teacherComment: entry.teacherComment,
        strengths: entry.strengths,
        improvementAreas: entry.improvementAreas,
        learnerFeedback: entry.learnerFeedback,
        emotionalState: entry.emotionalState,
        lastOpenedAt: new Date()
      }
    });
  }

  const attemptBlueprints = [
    {
      userId: student.id,
      lessonTitle: "Kompyuterni yoqish va xavfsiz ishlatish",
      score: 80,
      strengths: ["Ketma-ketlikni topdi", "Xavfsizlikni eslab qoldi"],
      improvementAreas: ["Tartiblash savolida yana bir marta ko‘rish foydali"],
      recommendedNextStep: "Keyingi safar klaviatura darsini audio va rasmli izoh bilan boshlang."
    },
    {
      userId: student.id,
      lessonTitle: "Klaviatura bilan boshqarish",
      score: 60,
      strengths: ["Tab tugmasini to‘g‘ri topdi"],
      improvementAreas: ["Shift + Tab va tartiblash savolida yana bir marta ko‘rish kerak"],
      recommendedNextStep: "Bu mavzuni video emas, rasmli izoh va qisqa mashq bilan qayta boshlash yengilroq bo‘lishi mumkin."
    },
    {
      userId: secondStudent.id,
      lessonTitle: "Kun tartibini rejalashtirish",
      score: 92,
      strengths: ["Tanaffusni reja qismiga qo‘shdi", "Qadamlarni yaxshi ajratdi"],
      improvementAreas: ["Qisqa javobda biroz ko‘proq misol kerak"],
      recommendedNextStep: "Keyingi darsda ham kartalar bilan davom eting."
    },
    {
      userId: thirdStudent.id,
      lessonTitle: "Telefon orqali aniq gapirish",
      score: 68,
      strengths: ["Salomlashish qismida ishonchli javob berdi"],
      improvementAreas: ["Audio savolda qayta tekshirish ma’nosini yana ko‘rish kerak"],
      recommendedNextStep: "Bu mavzuni subtitr va transkript bilan yana bir marta ko‘rish foydali."
    }
  ];

  for (const attempt of attemptBlueprints) {
    const lesson = lessonsByTitle[attempt.lessonTitle];

    if (!lesson?.quiz) {
      continue;
    }

    const answers = Object.fromEntries(
      lesson.quiz.questions.map((question, index) => [question.id, `demo-answer-${index + 1}`])
    );

    await prisma.quizAttempt.create({
      data: {
        quizId: lesson.quiz.id,
        userId: attempt.userId,
        score: attempt.score,
        answers,
        strengths: attempt.strengths,
        improvementAreas: attempt.improvementAreas,
        recommendedNextStep: attempt.recommendedNextStep
      }
    });
  }

  const aiLesson = lessonsByTitle["Klaviatura bilan boshqarish"];

  if (aiLesson) {
    await prisma.aiInteraction.createMany({
      data: [
        {
          userId: student.id,
          lessonId: aiLesson.id,
          promptType: PromptType.SIMPLIFY,
          userQuestion: "Tab va Enter farqini sodda tushuntirib bering.",
          response: "Tab sizni keyingi joyga olib boradi. Enter esa tanlangan joyni ochadi."
        },
        {
          userId: student.id,
          lessonId: aiLesson.id,
          promptType: PromptType.EXAMPLE,
          userQuestion: "Misol bilan ayting.",
          response: "Masalan, menyuda yurayotgan bo‘lsangiz, Tab bilan “Darslar” tugmasiga kelasiz, Enter bilan uni ochasiz."
        }
      ]
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
