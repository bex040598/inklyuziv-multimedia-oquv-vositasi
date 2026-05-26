# Inklyuziv Multimedia O‘quv Vositasi

“Nogironligi bo‘lgan shaxslarni rivojlantirishda inklyuziv multimedia o‘quv vositasini takomillashtirish” mavzusi uchun tayyorlangan, darsni foydalanuvchiga moslab beradigan shaxsiy o‘rganish muhiti.

## Nima uchun bu oddiy LMS emas

Bu loyiha faqat darslar ro‘yxati emas.

Bu yerda foydalanuvchi:

- matnni kattalashtirishi mumkin
- darsni tinglab boshlashi mumkin
- subtitr va transkript bilan ko‘rishi mumkin
- oson tilga o‘tishi mumkin
- klaviatura bilan boshqarishi mumkin
- diqqatni jamlash rejimini yoqishi mumkin
- o‘qish chizig‘i va ovozli o‘qishdan foydalanishi mumkin

Shu sababli tizim “kontentni ko‘rsatish” bilan cheklanmaydi. U o‘rganish usulini ham moslaydi.

## Asosiy g‘oya

Har bir o‘quvchi bir xil tempda va bir xil formatda o‘rganmaydi.

Shuning uchun platforma:

- onboarding orqali boshlang‘ich muhitni moslaydi
- darsni 5 xil formatda ochadi
- natijani uyaltirmaydi, keyingi qadamga yo‘naltiradi
- ota-ona va o‘qituvchiga “qaysi format yengilroq bo‘ldi?” degan nuqtadan qaraydi

## Asosiy imkoniyatlar

- Next.js App Router asosidagi to‘liq web dastur
- TypeScript strict rejimi
- Tailwind CSS asosidagi iliq va sokin dizayn
- SQLite + Prisma ma’lumotlar bazasi
- Custom auth va role-based access
- 4 bosqichli onboarding
- Global accessibility panel
- Darsni matn, oson matn, audio, video, rasmli izoh va test formatida ko‘rish
- Web Speech API orqali matnni ovoz chiqarib o‘qish
- Browser SpeechRecognition mavjud bo‘lsa gapirib yozdirish
- O‘qituvchi, o‘quvchi, ota-ona va admin uchun alohida dashboardlar
- Print-friendly hisobot sahifasi
- AI yordamchi endpointi va API key bo‘lmasa ishlaydigan fallback

## Accessibility imkoniyatlari

- katta matn va juda katta matn rejimi
- yuqori kontrast va qorong‘i sokin rejim
- dyslexia-friendly shrift
- qator oralig‘i va harf oralig‘ini kengaytirish
- o‘qish chizig‘i
- diqqatni jamlash uchun soddalashtirilgan ko‘rinish
- katta tugmalar
- klaviatura shortcuts
- subtitr va transkript
- audio tavsif
- oson til
- semantik HTML, skip link va aniq focus holati

## AI yordamchi qanday ishlaydi

Endpoint: `POST /api/ai/explain`

Qo‘llab-quvvatlanadigan rejimlar:

- `simplify`
- `example`
- `summarize`
- `quiz-help`
- `next-step`

Ishlash tartibi:

- agar `OPENAI_API_KEY` mavjud bo‘lsa, dars kontekstidan chiqmaydigan qisqa yordamchi javob qaytaradi
- agar API key bo‘lmasa, darsning `easyContent`, `shortSummary` va quiz explanation maydonlaridan fallback javob tayyorlaydi
- javoblarda “men sun’iy intellektman” kabi matn chiqmaydi

## Demo loginlar

- Admin: `admin@example.com / admin123`
- O‘qituvchi: `teacher@example.com / teacher123`
- O‘quvchi: `student@example.com / student123`
- Ota-ona: `parent@example.com / parent123`

Qo‘shimcha demo o‘quvchilar ham seed ichida bor:

- `sardor@example.com / student123`
- `lobar@example.com / student123`

## Texnologiyalar

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- React Hook Form
- Zod
- Framer Motion
- Lucide React

## Papka tuzilmasi

- `app/`
- `components/`
- `lib/`
- `prisma/`
- `public/`
- `styles/`
- `types/`
- `AGENTS.md`

## O‘rnatish

```bash
npm install
```

## Database migration

Odatiy buyruq:

```bash
npx prisma migrate dev
```

Loyiha ichida yangi migration fayli allaqachon qo‘shilgan:

- `prisma/migrations/20260526092000_accessible_refresh/migration.sql`

Muhim eslatma:

Windows + OneDrive muhitida Prisma schema engine ba’zan `spawn EPERM` yoki bo‘sh `Schema engine error` bilan yiqilishi mumkin. Shu repo ichida migration SQL tayyorlangan va lokal tekshiruv uchun baza shu skript asosida tiklandi. Agar sizda ham shu xato chiqsa:

1. loyihani OneDrive tashqarisidagi oddiy yo‘lga ko‘chiring
2. yoki mavjud migration faylidan foydalaning
3. keyin `npx prisma db seed` ni ishga tushiring

## Seed

```bash
npx prisma db seed
```

Yoki package script orqali:

```bash
npm run seed
```

## Development server

```bash
npm run dev
```

Lokal tekshiruvda server `http://localhost:3001` da muvaffaqiyatli ochildi.

## Build

```bash
npm run lint
npm run build
```

## Ishga tushirish tartibi

```bash
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

## Deployment

Build tayyor:

```bash
npm run build
npm run start
```

Netlify yoki boshqa platformaga deploy qilishdan oldin:

- `DATABASE_URL` ni server muhitiga moslang
- `SESSION_SECRET` ni kuchli qiymatga almashtiring
- ixtiyoriy ravishda `OPENAI_API_KEY` qo‘shing

## Kelajakdagi reja

- dars media fayllarini lokal upload qilish
- ota-ona uchun ko‘proq uy tavsiyalari
- o‘quvchi kayfiyat trendini grafik ko‘rinishda berish
- dars yordamchisiga ko‘proq kontekstli format tavsiyalari
- accessibility presetlardan foydalanish statistikasi uchun chuqurroq analytics
