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

export const questionTypeLabels = {
  SINGLE_CHOICE: "Bitta javobli test",
  TRUE_FALSE: "True / False",
  SHORT_ANSWER: "Qisqa javob"
} as const;

export const disabilityOptions = [
  { key: "visual", label: "Ko‘rishda qiyinchilik" },
  { key: "hearing", label: "Eshitishda qiyinchilik" },
  { key: "mobility", label: "Harakatlanishda qiyinchilik" },
  { key: "autism", label: "Autizm spektri" },
  { key: "intellectual", label: "Intellektual rivojlanishdagi qiyinchiliklar" }
] as const;

export const roleOptions = [
  { value: "STUDENT", label: "O‘quvchi" },
  { value: "TEACHER", label: "O‘qituvchi" },
  { value: "PARENT", label: "Ota-ona / kuzatuvchi" }
] as const;

export const levelOptions = [
  { value: "BEGINNER", label: "Boshlang‘ich" },
  { value: "INTERMEDIATE", label: "O‘rta" },
  { value: "ADVANCED", label: "Yuqori" }
] as const;

export const defaultAccessibilitySettings = {
  largeText: false,
  highContrast: false,
  simplifiedUi: false,
  dyslexiaFont: false,
  focusOutline: true,
  reduceMotion: false,
  captions: true,
  textToSpeech: true,
  easyLanguage: false
};

export const motivationMessages = [
  "Bugungi kichik qadam ertangi katta natijaga xizmat qiladi.",
  "Har bir tugallangan dars sizning ishonchingizni oshiradi.",
  "Sizning rivojlanishingiz izchil va qadrlidir.",
  "Muntazam mashq sizning kuchli tomonlaringizni yanada mustahkamlaydi."
];
