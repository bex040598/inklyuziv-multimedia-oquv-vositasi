# Inklyuziv Multimedia O‘quv Vositasi

Nogironligi bo‘lgan o‘quvchilar, talabalar va foydalanuvchilar uchun moslashtirilgan, qulay va inklyuziv multimedia ta’lim platformasi.

## Maqsadi

Ushbu loyiha matn, audio, video, rasm, subtitr, test, individual progress va accessibility sozlamalarini yagona web tizimga birlashtiradi. Platforma ilmiy ish mavzusi: “Nogironligi bo‘lgan shaxslarni rivojlantirishda inklyuziv multimedia o‘quv vositasini takomillashtirish” uchun MVP sifatida ishlab chiqilgan.

## O‘rnatish tartibi

1. Loyihaga kiring.
2. Paketlarni o‘rnating.
3. Prisma migration yarating va bazani tayyorlang.
4. Demo seed ma’lumotlarini yuklang.
5. Development serverni ishga tushiring.

## Ishga tushirish buyruqlari

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Production tekshiruvlari:

```bash
npm run lint
npm run build
npm run start
```

## Demo loginlar

- Admin: `admin@example.com / admin123`
- O‘qituvchi: `teacher@example.com / teacher123`
- O‘quvchi: `student@example.com / student123`
- Ota-ona: `parent@example.com / parent123`

## Asosiy imkoniyatlar

- Next.js App Router asosidagi zamonaviy frontend va backend
- Oddiy login/register va session cookie asosidagi auth tizimi
- Role-based dashboard:
  - Admin: foydalanuvchilar, kurslar, statistika
  - O‘qituvchi: kurs, dars, quiz va progress izohlari
  - O‘quvchi: multimedia darslar, testlar, motivatsion bloklar
  - Ota-ona: farzand progressi va qisqa hisobot
- Kurs, dars va quiz modullari
- Progress kuzatuvi va teacher comment yozish
- Hisobot sahifasi va browser print rejimi

## Accessibility imkoniyatlari

- Katta shrift rejimi
- Yuqori kontrast rejimi
- Oddiylashtirilgan interfeys
- Dyslexia-friendly shrift rejimi
- Focus outline
- Matnni ovoz chiqarib o‘qish (Web Speech API)
- Video va audio uchun subtitr ko‘rsatish
- Animatsiyalarni kamaytirish
- Oson til rejimi
- Semantik HTML va klaviatura navigatsiyasi

## Texnologiyalar

- Frontend: Next.js + TypeScript
- Styling: Tailwind CSS
- Backend: Next.js Server Actions va API routes
- Database: SQLite + Prisma
- Auth: cookie session va scrypt parol hashing

## Papka tuzilmasi

- `app/`
- `components/`
- `lib/`
- `prisma/`
- `public/`
- `styles/`
- `types/`

## Package scriptlar

- `npm run dev`
- `npm run build`
- `npm run start`
- `npm run lint`
- `npm run seed`

## Seed ma’lumotlari

- 4 demo foydalanuvchi
- 2 ta kurs
- Har bir kursda kamida 3 ta dars
- Har bir darsda kamida 3 ta quiz savoli
- O‘quvchi uchun boshlang‘ich progress va quiz natijalari

## Kelajakda takomillashtirish rejalari

- Fayl yuklash orqali lokal audio/video boshqaruvi
- Ota-ona va o‘qituvchi o‘rtasida xabar almashish
- Ko‘proq disability profillari va AI tavsiyalar
- PDF eksportni server-side shaklda ishlab chiqish
- Real-time bildirishnomalar va analytics panel
