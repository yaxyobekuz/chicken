/**
 * PPTX ichidagi rasmlarni saytga mos editorial kadrlarga ajratadi.
 *
 * Manba: SSS.pptx -> ppt/media/*.png
 * Natija: public/img/*.webp (+ kichik blur placeholder'lar)
 *
 * Ishga tushirish: node scripts/build-assets.mjs
 * Manba .pptx mavjud bo'lmasa, skript jimgina to'xtaydi — public/img allaqachon commit qilingan.
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PPTX = path.join(ROOT, 'SSS.pptx')
const OUT = path.join(ROOT, 'public', 'img')

if (!fs.existsSync(PPTX)) {
  console.log('SSS.pptx topilmadi — mavjud public/img saqlanadi.')
  process.exit(0)
}

// --- 1. PPTX'ni vaqtinchalik papkaga ochish -------------------------------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sss-pptx-'))
const zip = path.join(tmp, 'sss.zip')
fs.copyFileSync(PPTX, zip)
execFileSync('powershell', [
  '-NoProfile',
  '-Command',
  `Expand-Archive -Path '${zip}' -DestinationPath '${tmp}' -Force`,
])
const MEDIA = path.join(tmp, 'ppt', 'media')

fs.mkdirSync(OUT, { recursive: true })

/**
 * Kadrlash retsepti.
 *
 * `crop` — manba rasmdagi nisbiy soha (0..1). Kollaj rasmlardan bitta
 * sahnani ajratib olish uchun ishlatiladi.
 * `ar`   — yakuniy tomonlar nisbati (kenglik / balandlik).
 */
const RECIPES = [
  // Hero va brend kadrlari
  { id: 'hero-complex', src: 'image6.png', ar: 16 / 9, w: 2400 },
  { id: 'feed-plant-aerial', src: 'image11.png', ar: 16 / 10, w: 2000 },
  // Do'kon peshtoqi markazda tursin — `attention` yozuvni kesib yuboradi
  { id: 'retail-store', src: 'image9.png', ar: 16 / 10, w: 2000, position: 'centre' },
  // Slayd 04 dagi tik panel uchun alohida kadr
  { id: 'retail-store-tall', src: 'image9.png', ar: 3 / 4, w: 1100, position: 'centre' },
  { id: 'president', src: 'image2.png', ar: 3 / 2, w: 1400 },
  // Kirish slaydining fon kadri — ekran balandligini to'liq egallaydi.
  // `north` bilan yuz yuqori qismda qoladi, pastdagi minbar kesiladi.
  { id: 'president-tall', src: 'image2.png', ar: 1 / 1.25, w: 1600, position: 'north' },

  // Portret kadrlar
  { id: 'hen-portrait', src: 'image8.png', ar: 4 / 5, w: 1200 },
  { id: 'cattle-farm', src: 'image10.png', ar: 4 / 5, w: 1200 },
  { id: 'meat-products', src: 'image7.png', ar: 4 / 5, w: 1200 },

  // image3 — 9 katakli kollaj (3 qator: 1/3, 1/3, 1/3)
  { id: 'chain-farming', src: 'image3.png', crop: [0.0, 0.0, 0.25, 0.372], ar: 4 / 3, w: 1200 },
  { id: 'chain-processing', src: 'image3.png', crop: [0.257, 0.0, 0.253, 0.383], ar: 4 / 3, w: 1200 },
  { id: 'chain-packaging', src: 'image3.png', crop: [0.515, 0.0, 0.222, 0.383], ar: 4 / 3, w: 1200 },
  { id: 'chain-coldstore', src: 'image3.png', crop: [0.742, 0.0, 0.258, 0.383], ar: 4 / 3, w: 1200 },
  { id: 'chain-logistics', src: 'image3.png', crop: [0.0, 0.389, 0.315, 0.3], ar: 16 / 10, w: 1400 },
  { id: 'chain-fleet', src: 'image3.png', crop: [0.615, 0.389, 0.385, 0.3], ar: 16 / 10, w: 1400 },
  { id: 'chain-retail', src: 'image3.png', crop: [0.322, 0.695, 0.257, 0.305], ar: 4 / 3, w: 1200 },
  { id: 'chain-distribution', src: 'image3.png', crop: [0.585, 0.695, 0.415, 0.305], ar: 16 / 10, w: 1400 },

  // image4 — rendering liniyasi kollaji (yuqori qator 3 kadr + pastki qator)
  { id: 'rendering-line', src: 'image4.png', crop: [0.297, 0.0, 0.32, 0.592], ar: 4 / 3, w: 1200 },
  { id: 'rendering-hall', src: 'image4.png', crop: [0.0, 0.0, 0.275, 0.592], ar: 4 / 3, w: 1200 },
  { id: 'rendering-output', src: 'image4.png', crop: [0.0, 0.61, 1.0, 0.39], ar: 21 / 9, w: 2000 },

  // image5 — ko'p qavatli katak tizimi kollaji
  { id: 'cage-system', src: 'image5.png', crop: [0.0, 0.0, 0.638, 0.71], ar: 4 / 3, w: 1400 },
  { id: 'cage-silos', src: 'image5.png', crop: [0.641, 0.0, 0.359, 0.335], ar: 16 / 10, w: 1200 },
  { id: 'cage-aisle', src: 'image5.png', crop: [0.641, 0.34, 0.359, 0.365], ar: 16 / 10, w: 1200 },
  { id: 'cage-eggs', src: 'image5.png', crop: [0.0, 0.715, 0.245, 0.285], ar: 4 / 3, w: 1000 },
  { id: 'cage-feed', src: 'image5.png', crop: [0.248, 0.715, 0.245, 0.285], ar: 4 / 3, w: 1000 },
]

// Logotip bu yerda ishlanmaydi: src/assets/logo.png to'g'ridan-to'g'ri
// komponentga import qilinadi (src/components/ui/logo.tsx).

const manifest = {}

for (const r of RECIPES) {
  const srcPath = path.join(MEDIA, r.src)
  if (!fs.existsSync(srcPath)) {
    console.warn(`o'tkazib yuborildi (manba yo'q): ${r.src}`)
    continue
  }

  const base = sharp(srcPath)
  const meta = await base.metadata()

  let pipeline = sharp(srcPath)

  if (r.crop) {
    const [rx, ry, rw, rh] = r.crop
    pipeline = pipeline.extract({
      left: Math.round(rx * meta.width),
      top: Math.round(ry * meta.height),
      width: Math.max(1, Math.round(rw * meta.width)),
      height: Math.max(1, Math.round(rh * meta.height)),
    })
  }

  const width = r.w
  const height = Math.round(width / r.ar)

  const buf = await pipeline
    .resize(width, height, { fit: 'cover', position: r.position ?? 'attention' })
    .webp({ quality: 82, effort: 5 })
    .toBuffer()

  fs.writeFileSync(path.join(OUT, `${r.id}.webp`), buf)

  // LQIP — sahifa yuklanayotganda ko'rinadigan mayda blur nusxa
  const lqip = await sharp(buf).resize(20).webp({ quality: 40 }).toBuffer()

  manifest[r.id] = {
    src: `/img/${r.id}.webp`,
    width,
    height,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  }

  console.log(`${r.id}.webp  ${width}x${height}  ${(buf.length / 1024).toFixed(0)}KB`)
}

fs.writeFileSync(
  path.join(ROOT, 'src', 'data', 'images.generated.ts'),
  `/* AUTO-GENERATED — scripts/build-assets.mjs tomonidan yaratilgan. Qo'lda tahrirlamang. */\n` +
    `export type ImageAsset = { src: string; width: number; height: number; lqip: string }\n\n` +
    `export const IMAGES = ${JSON.stringify(manifest, null, 2)} as const satisfies Record<string, ImageAsset>\n\n` +
    `export type ImageId = keyof typeof IMAGES\n`,
)

fs.rmSync(tmp, { recursive: true, force: true })
console.log(`\nTayyor: ${Object.keys(manifest).length} ta rasm -> public/img`)
