import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Counter } from '@/components/ui/counter'
import { Figure } from '@/components/ui/figure'
import { CAPABILITIES } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/** Ishlab chiqarish zanjirining uchta bosqichi — kadrlar bilan. */
const CHAIN_SHOTS = [
  { id: 'chain-farming', label: 'Boqish' },
  { id: 'chain-processing', label: 'Qayta ishlash' },
  { id: 'chain-logistics', label: 'Logistika' },
] as const

/** Slayddagi asosiy raqamlar — manbadagi 2026-yil ko'rsatkichlari. */
const HEADLINE = [
  { v: 1.5, u: 'mln bosh', l: 'Bir aylanmada' },
  { v: 356, u: 'mlrd so‘m', l: 'Yillik aylanma' },
  { v: 14850, u: 'tonna', l: 'Ishlab chiqarish' },
  { v: 417, u: 'nafar', l: 'Xodimlar' },
] as const

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

export function OverviewSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="Sokin Savdo Servis"
        title="Parranda boqish, so‘yish, qayta ishlash va yem ishlab chiqarishni bitta zanjirda birlashtirgan korxona"
      />

      {/* Asosiy maydon */}
      <SlidePad className="flex min-h-0 flex-1 flex-col pt-[clamp(0.75rem,2vh,1.75rem)] pb-[clamp(0.5rem,1.4vh,1.25rem)]">
        <div className="grid min-h-0 flex-1 gap-[clamp(0.85rem,2vw,2.25rem)] lg:grid-cols-[1.08fr_0.92fr]">
          {/* Chap: bosh kadr */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.22, ease: EASE_OUT_EXPO }}
            className="relative min-h-0"
          >
            <Figure
              id="hero-complex"
              alt="Sokin Savdo Servis parranda so'yish majmuasi"
              priority
              sizes="55vw"
              className="size-full"
            />
          </motion.div>

          {/* O'ng: raqamlar + zanjir + iqtibos */}
          <div className="flex min-h-0 flex-col justify-between gap-[clamp(0.7rem,2vh,1.6rem)]">
            {/* Raqamlar */}
            <motion.dl
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.07, delayChildren: 0.3 }}
              className="grid min-h-0 flex-1 basis-0 grid-cols-2 grid-rows-2 gap-x-[clamp(0.6rem,1.4vw,1.5rem)] gap-y-[clamp(0.7rem,2vh,1.5rem)]"
            >
              {HEADLINE.map((h) => (
                <motion.div
                  key={h.l}
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                  className="flex min-h-0 flex-col justify-center border-t border-ink-200 pt-[clamp(0.35rem,1.1vh,0.85rem)]"
                >
                  <dd className="flex items-baseline gap-1 font-display text-[clamp(1.6rem,4.3vw,4.4rem)] leading-none tracking-[-0.03em] text-ink-950">
                    {/* Kasrli qiymat yaxlitlanmasin: 1,5 "2" bo'lib qolmasin */}
                    <Counter
                      to={h.v}
                      decimals={Number.isInteger(h.v) ? 0 : 1}
                      delay={0.35}
                    />
                  </dd>
                  <dt className="mt-[0.45em] font-mono text-[clamp(0.45rem,0.66vw,0.625rem)] tracking-[0.14em] text-ink-400 uppercase">
                    {h.u}
                  </dt>
                  <dt className="mt-[0.25em] text-[clamp(0.6rem,0.88vw,0.8125rem)] leading-tight text-ink-700">
                    {h.l}
                  </dt>
                </motion.div>
              ))}
            </motion.dl>

            {/* Qiymat zanjiri */}
            <motion.ul
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.05, delayChildren: 0.5 }}
              className="flex shrink-0 flex-wrap items-center gap-x-[clamp(0.3rem,0.8vw,0.75rem)] gap-y-[0.4rem]"
            >
              {CAPABILITIES.map((c, i) => (
                <motion.li
                  key={c.id}
                  variants={rise}
                  transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                  className="flex items-center gap-[clamp(0.3rem,0.8vw,0.75rem)]"
                >
                  <span className="rounded-full bg-brand-50 px-[0.85em] py-[0.42em] font-mono text-[clamp(0.48rem,0.7vw,0.6875rem)] tracking-[0.1em] text-brand-700 uppercase">
                    {c.title}
                  </span>
                  {i < CAPABILITIES.length - 1 && (
                    <span className="text-[0.6rem] text-ink-300">&rarr;</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>

            {/* Zanjirning uchta bosqichi — kadrlar bilan */}
            <motion.ul
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.09, delayChildren: 0.6 }}
              className="grid min-h-0 shrink-0 basis-[32%] grid-cols-3 gap-[clamp(0.4rem,0.9vw,0.9rem)]"
            >
              {CHAIN_SHOTS.map((s) => (
                <motion.li
                  key={s.id}
                  variants={rise}
                  transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                  className="flex min-h-0 flex-col"
                >
                  {/*
                    Yorliq yozilmaydi: bosqich nomlari yuqoridagi chip'lar
                    qatorida allaqachon bor. `alt` matni saqlanadi.
                  */}
                  <Figure id={s.id} alt={s.label} sizes="16vw" className="min-h-0 flex-1" />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </SlidePad>
    </SlideShell>
  )
}
