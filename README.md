# Sokin Savdo Servis — interaktiv taqdimot

Korxonaning `SSS.pptx` taqdimoti asosida qurilgan veb-taqdimot.
Har bir slayd **bitta to'liq ekran** — scroll yo'q, chunki taqdimot qisqa
vaqtda og'zaki tushuntiriladi.

## Ishga tushirish

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ ga yig'ish
```

## Slaydlar

| № | Yo'l | Mazmun |
|---|------|--------|
| 01 | `/` | Kirish — Prezident iqtibosi |
| 02 | `/korxona` | Korxona: asosiy ko'rsatkichlar va qiymat zanjiri |
| 03 | `/rivojlanish` | 2020–2026 o'sish jadvali va moliyalashtirish |
| 04 | `/loyihalar` | 2026–2027 uchta yangi loyiha va yig'ma ta'sir |
| 05 | `/istiqbol` | Beshta istiqbolli loyiha va yakuniy ko'rsatkichlar |

## Boshqaruv

| Tugma | Amal |
|-------|------|
| `→` `Space` `PageDown` | Keyingi slayd |
| `←` `PageUp` | Oldingi slayd |
| `Home` / `End` | Birinchi / oxirgi slayd |
| `1`–`5` | To'g'ridan-to'g'ri slaydga o'tish |
| `F` | To'liq ekran |

Pastdagi step bar orqali ham o'tish mumkin.

## Tuzilma

```
src/
  slides/        Beshta slayd — har biri bitta ekran
  components/
    chrome/      Slayd karkasi, sarlavha, pastki panel, timeline
    ui/          Qayta ishlatiladigan: Figure, Counter, Logo
  data/
    site.ts      BARCHA matn va raqamlar (yagona manba)
    images.generated.ts   Avtomatik yaratiladi — qo'lda tahrirlamang
  lib/           Router, animatsiya sozlamalari, yordamchilar
scripts/
  build-assets.mjs   PPTX'dan rasmlarni ajratadi va optimallashtiradi
  shots.mjs          Slaydlarni suratga oladi, ekrandan toshishini tekshiradi
  smoke.mjs          Navigatsiya testlari
```

### Ma'lumotlar

Barcha ko'rsatkichlar `src/data/site.ts` da. Komponentlar faqat shu
fayldan o'qiydi — raqam hech qayerda takrorlanmaydi.

> **Muhim:** raqamlar `SSS.pptx` dan aynan olingan. Buyurtmachi yangi
> ma'lumot bermaguncha ularni o'zgartirmang va yangi raqam qo'shmang.

### Rasmlar

`SSS.pptx` ichidagi rasmlardan tayyorlanadi:

```bash
node scripts/build-assets.mjs
```

Skript kollaj rasmlarni alohida kadrlarga kesadi, WebP'ga o'giradi va
`src/data/images.generated.ts` manifestini yangilaydi. `SSS.pptx`
bo'lmasa, skript mavjud `public/img` ni tegmay qoldiradi.

Logotip alohida: `src/assets/logo.png` to'g'ridan-to'g'ri import qilinadi.

## Tekshirish

```bash
npm run build                  # tip tekshiruvi + yig'ish
npm run lint
node scripts/shots.mjs 5173 shots   # 3 xil ekranda surat + toshish tekshiruvi
node scripts/smoke.mjs 5173         # navigatsiya testlari
```

`shots.mjs` har bir slayd 1920×1080, 1440×900 va 1366×768 da ekranga
to'liq sig'ishini tekshiradi — slayd tahrirlangach shuni ishga tushiring.

## Dizayn

- Asosiy rang `#2D6A4F` (`brand-600`), oltin — faqat urg'u uchun
- O'lchamlar `clamp()` va `vh`/`vw` da — kontent ekranga moslashadi
- Shriftlar: Fraunces (sarlavha), Inter Tight (matn), JetBrains Mono (yorliq)
