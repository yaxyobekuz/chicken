/**
 * Navigatsiya va o'tishlarni tekshiradi:
 *  - timeline chip'lari, oldingi/keyingi, klaviatura va brauzer tarixi
 *  - har bir o'tishdan keyin to'g'ri slayd va to'g'ri URL ochilishi
 *  - konsol xatolari yo'qligi
 *
 * Ishlatish: node scripts/smoke.mjs [port]
 */
import { chromium } from 'playwright'

const PORT = process.argv[2] ?? '5180'
const BASE = `http://localhost:${PORT}`

const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } })
const page = await ctx.newPage()

const errors = []
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push(String(e)))

let failed = 0
const check = (name, ok, extra = '') => {
  if (!ok) failed++
  console.log(`${ok ? 'ok    ' : 'XATO  '} ${name}${extra ? '  ' + extra : ''}`)
}

/** Slayd sarlavhasidagi davr matni (kirish slaydida sarlavha yo'q). */
const period = async () => {
  const h1 = page.locator('h1 span span').first()
  return (await h1.count()) ? h1.innerText() : ''
}
const path = () => new URL(page.url()).pathname
const settle = () => page.waitForTimeout(1200)

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.waitForTimeout(1800)

// --- 01 Kirish: sarlavha yo'q, iqtibos bor ---
check(
  'kirish slaydi — iqtibos',
  (await page.locator('blockquote').first().innerText()).includes('Tadbirkorlar'),
)
check('kirish slaydida sarlavha yo‘q', (await period()) === '')

// --- Keyingi tugmasi -> 02 Korxona ---
await page.getByRole('button', { name: 'Keyingi slayd' }).click()
await settle()
check('keyingi -> Korxona', (await period()).includes('Sokin'), path())
check('URL /korxona', path() === '/korxona', path())

// --- Klaviatura -> 03 ---
await page.keyboard.press('ArrowRight')
await settle()
check('ArrowRight -> 2020–2026', (await period()).includes('2020'), path())

// --- Probel -> 04 ---
await page.keyboard.press(' ')
await settle()
check('Space -> 2026–2027', (await period()).includes('2026'), path())

// --- End -> oxirgi slayd ---
await page.keyboard.press('End')
await settle()
check(
  'End -> Ko‘rsatkichlar',
  path() === '/korsatkichlar' && (await period()).includes('rsatkichlari'),
  path(),
)
check(
  'oxirgi slaydda keyingi o‘chiq',
  await page.getByRole('button', { name: 'Keyingi slayd' }).isDisabled(),
)

// --- Orqaga ---
await page.keyboard.press('ArrowLeft')
await settle()
check('ArrowLeft -> orqaga', path() === '/kooperatsiya', path())

// --- Home -> birinchi ---
await page.keyboard.press('Home')
await settle()
check('Home -> kirish', (await period()) === '' && path() === '/', path())
check(
  'birinchi slaydda oldingi o‘chiq',
  await page.getByRole('button', { name: 'Oldingi slayd' }).isDisabled(),
)

// --- Raqam bilan to'g'ridan-to'g'ri ---
await page.keyboard.press('3')
await settle()
check('"3" -> 2020–2026', (await period()).includes('2020'), path())

// --- Timeline chip ---
await page.getByRole('button', { name: 'Istiqbol' }).click()
await settle()
check('timeline chip -> Istiqbol', (await period()).includes('Istiqbolli'), path())

// --- Brauzer orqaga ---
await page.goBack()
await settle()
check('brauzer orqaga', path() === '/rivojlanish', path())

// --- To'g'ridan-to'g'ri URL ---
await page.goto(BASE + '/loyihalar', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
check('to‘g‘ridan-to‘g‘ri URL', (await period()).includes('2026'))

// --- Noma'lum yo'l -> kirish ---
await page.goto(BASE + '/yoq-bunday-sahifa', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
check('noma’lum yo‘l -> kirish', (await period()) === '')

check('konsol xatolari yo‘q', errors.length === 0, errors.slice(0, 3).join(' | '))

await browser.close()
console.log(failed ? `\n${failed} ta test yiqildi` : '\nBarcha testlar o‘tdi')
process.exit(failed ? 1 : 0)
