import type { AccessibilityState, EmotionalStateOption, HelpShortcut } from "@/types";

export const siteTitle = "Inklyuziv Multimedia O‘quv Vositasi";

export const roleLabels = {
  ADMIN: "Admin",
  TEACHER: "O‘qituvchi",
  STUDENT: "O‘quvchi",
  PARENT: "Ota-ona"
} as const;

export const levelLabels = {
  BEGINNER: "Boshlang‘ich",
  INTERMEDIATE: "O‘rta",
  ADVANCED: "Yuqori"
} as const;

export const learningModeLabels = {
  READING: "O‘qish rejimi",
  LISTENING: "Tinglash rejimi",
  VIDEO: "Video va subtitr",
  VISUAL: "Rasmli izoh",
  MIXED: "Aralash usul"
} as const;

export const questionTypeLabels = {
  SINGLE_CHOICE: "Bitta javob",
  MULTIPLE_CHOICE: "Bir nechta javob",
  TRUE_FALSE: "To‘g‘ri / noto‘g‘ri",
  IMAGE_CHOICE: "Rasm asosida",
  AUDIO_PROMPT: "Audio savol",
  SHORT_ANSWER: "Qisqa javob",
  ORDERING: "Tartiblash",
  MATCHING: "Moslashtirish"
} as const;

export const learningNeeds = [
  { key: "visual", title: "Matnni o‘qish qiyin bo‘lsa", note: "Katta matn, kontrast va ovozli o‘qish yordam beradi." },
  { key: "hearing", title: "Video ovozini eshitish qiyin bo‘lsa", note: "Subtitr va transkriptni doim ko‘rsatamiz." },
  { key: "mobility", title: "Sichqoncha ishlatish noqulay bo‘lsa", note: "Katta tugmalar va klaviatura yo‘llarini yoqamiz." },
  { key: "attention", title: "Uzoq matn charchatsa", note: "Qisqa bo‘limlar va bitta vazifa rejimi taklif qilinadi." },
  { key: "reading", title: "Murakkab so‘zlar to‘xtatib qo‘ysa", note: "Oson til va qadam-baqadam ko‘rsatma beriladi." },
  { key: "memory", title: "Ko‘p ma’lumotni eslab qolish qiyin bo‘lsa", note: "Qisqa xulosa va qayta ko‘rish bloklari qo‘shiladi." }
] as const;

export const emotionalStateOptions: EmotionalStateOption[] = [
  { value: "CALM", label: "Tinch", note: "Bugun odatdagi tempda davom etsak bo‘ladi." },
  { value: "TIRED", label: "Biroz charchadim", note: "Qisqa bo‘limlar va tanaffus eslatmasi foydali bo‘lishi mumkin." },
  { value: "READY", label: "Tushunishga tayyorman", note: "Bugun yangi mavzuga o‘tish uchun yaxshi payt." },
  { value: "NEED_HELP", label: "Menga yordam kerak", note: "Murakkab joyni soddalashtirib, boshqa format taklif qilamiz." },
  { value: "LATER", label: "Keyinroq davom etaman", note: "Hechqisi yo‘q. Qolgan joy saqlanadi." }
];

export const defaultAccessibilitySettings: AccessibilityState = {
  fontScale: "NORMAL",
  contrastMode: "NORMAL",
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

export const accessibilityPresets = [
  {
    id: "visual",
    title: "Ko‘rishga qulay",
    description: "Katta matn, yuqori kontrast va ovozli o‘qish faol bo‘ladi.",
    settings: {
      fontScale: "XLARGE",
      contrastMode: "HIGH",
      textToSpeech: true,
      readingRuler: true,
      captions: true
    } satisfies Partial<AccessibilityState>
  },
  {
    id: "hearing",
    title: "Eshitishga qulay",
    description: "Subtitr, transkript va ko‘proq yozma ko‘rsatma yoqiladi.",
    settings: {
      captions: true,
      transcript: true,
      audioDescription: false,
      easyLanguage: false
    } satisfies Partial<AccessibilityState>
  },
  {
    id: "mobility",
    title: "Harakatlanishga qulay",
    description: "Katta tugmalar, klaviatura rejimi va kamroq mayda bosishlar.",
    settings: {
      largeControls: true,
      keyboardMode: true,
      simplifiedUi: true
    } satisfies Partial<AccessibilityState>
  },
  {
    id: "focus",
    title: "Diqqatni jamlash",
    description: "Chalg‘ituvchi bloklar kamayadi, harakat sekinlashadi.",
    settings: {
      simplifiedUi: true,
      reduceMotion: true,
      calmMode: true,
      readingRuler: true
    } satisfies Partial<AccessibilityState>
  },
  {
    id: "easy-language",
    title: "Oson til",
    description: "Qisqa gaplar, ko‘proq bo‘sh joy va soddaroq tushuntirishlar.",
    settings: {
      easyLanguage: true,
      lineHeight: true,
      letterSpacing: true,
      fontScale: "LARGE"
    } satisfies Partial<AccessibilityState>
  }
] as const;

export const keyboardShortcuts: HelpShortcut[] = [
  { keys: "Alt + M", action: "Moslash panelini ochish yoki yopish" },
  { keys: "Alt + D", action: "Dashboardga o‘tish" },
  { keys: "Alt + L", action: "Darslar ro‘yxatini ochish" },
  { keys: "Alt + H", action: "Yordam sahifasini ochish" },
  { keys: "Space", action: "Media ijrosini to‘xtatish yoki davom ettirish" },
  { keys: "Arrow keys", action: "Test variantlari orasida yurish" },
  { keys: "Enter", action: "Tanlash yoki tasdiqlash" },
  { keys: "Esc", action: "Modal yoki panelni yopish" }
];

export const studentMessages = [
  "Bugun bitta kichik qadam ham yetarli.",
  "Xato to‘xtash joyi emas. U keyingi qadamni ko‘rsatadi.",
  "Darsni o‘qish shart emas. Xohlasangiz tinglab boshlang.",
  "Tanaffus ham o‘rganishning bir qismi."
];

export const parentAdviceSamples = [
  "Bugun 10 daqiqa davomida birga transkriptni o‘qib chiqsangiz, mavzu ancha yengillashadi.",
  "Agar matn cho‘zilib ketsa, o‘g‘lingiz yoki qizingizdan shu darsni audio shaklda qayta eshitib ko‘rishni so‘rang.",
  "Murakkab joyda to‘xtab qolsa, natijani so‘rashdan oldin “Qaysi format qulayroq bo‘ldi?” deb so‘rash foydali."
];

export const dashboardPaths = {
  ADMIN: "/admin",
  TEACHER: "/teacher",
  STUDENT: "/student",
  PARENT: "/parent"
} as const;

export const demoCredentials = [
  { role: "Admin", email: "admin@example.com", password: "admin123" },
  { role: "O‘qituvchi", email: "teacher@example.com", password: "teacher123" },
  { role: "O‘quvchi", email: "student@example.com", password: "student123" },
  { role: "Ota-ona", email: "parent@example.com", password: "parent123" }
];
