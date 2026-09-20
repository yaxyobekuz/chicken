/**
 * Slaydlarni turli ekran o'lchamlarida suratga oladi va kontent
 * ekrandan toshib ketmaganini tekshiradi.
 *
 * Ishlatish: node scripts/shots.mjs [port] [outDir]
 */
import fs from 'node:fs'
import path from 'node:path'

import { chromium } from 'playwright'

const PORT = process.argv[2] ?? '5180'
const OUT = process.argv[3] ?? 'shots'
const BASE = `http://localhost:${PORT}`

const ROUTES = [
  ['01-intro', '/'],
  ['02-overview', '/korxona'],
  ['03-growth', '/rivojlanish'],
  ['04-projects', '/loyihalar'],
  ['05-future', '/istiqbol'],
  ['06-cooperation', '/kooperatsiya'],
  ['07-indicators', '/korsatkichlar'],
]

const SIZES = [
  ['1920x1080', 1920, 1080],
  ['1440x900', 1440, 900],
  ['1366x768', 1366, 768],
]

fs.mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
let problems = 0

for (const [sizeName, width, height] of SIZES) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()

  const errors = []
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  page.on('pageerror', (e) => errors.push(String(e)))

  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    // Animatsiyalar tugashini kutamiz
    await page.waitForTimeout(2600)

    await page.screenshot({
      path: path.join(OUT, `${sizeName}-${name}.png`),
    })

    // Kontent ekrandan toshdimi?
    const overflow = await page.evaluate(() => {
      const de = document.documentElement
      return {
        scrollH: de.scrollHeight,
        clientH: de.clientHeight,
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
      }
    })

    const vOver = overflow.scrollH - overflow.clientH
    const hOver = overflow.scrollW - overflow.clientW
    const bad = vOver > 1 || hOver > 1

    if (bad) problems++
    console.log(
      `${bad ? 'TOSHDI ' : 'ok     '} ${sizeName} ${name.padEnd(12)} ` +
        `v:+${vOver} h:+${hOver}`,
    )
  }

  if (errors.length) {
    problems++
    console.log(`  konsol xatolari (${sizeName}):`)
    for (const e of [...new Set(errors)].slice(0, 6)) console.log('   -', e)
  }

  await ctx.close()
}

await browser.close()
console.log(problems ? `\n${problems} ta muammo topildi` : '\nBarchasi joyida')
