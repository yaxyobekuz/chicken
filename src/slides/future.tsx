import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Counter } from '@/components/ui/counter'
import { Figure } from '@/components/ui/figure'
import type { ImageId } from '@/data/images.generated'
import { FUTURE_IMPACT, FUTURE_PROJECTS } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * 04 — Istiqbolli loyihalar.
 *
 * Beshta loyiha bitta qatorda (kadr + raqamlar), pastda yakuniy
 * to'rtta ko'rsatkich — hikoyaning eng katta raqamlari.
 */
export function FutureSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="Istiqbolli loyihalar"
        title="Yem bazasidan nasl loyihasi va chakana tarmoqqa qadar — klasterni kengaytiradigan besh yo‘nalish"
      />

      <SlidePad className="flex min-h-0 flex-1 flex-col gap-[clamp(0.5rem,1.4vh,1.15rem)] pt-[clamp(0.6rem,1.8vh,1.5rem)] pb-[clamp(0.4rem,1.2vh,1rem)]">
        {/* Beshta loyiha */}
        <ul className="grid min-h-0 flex-1 grid-cols-2 gap-[clamp(0.45rem,1.1vw,1.15rem)] lg:grid-cols-5">
          {FUTURE_PROJECTS.map((p, i) => (
            <motion.li
              key={p.no}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.26 + i * 0.075, ease: EASE_OUT_EXPO }}
              className="flex min-h-0 flex-col"
            >
              <div className="relative min-h-0 flex-1">
                <Figure
                  id={p.image as ImageId}
                  alt={p.title}
                  priority={i < 2}
                  sizes="20vw"
                  className="size-full"
                />
                <span className="absolute top-[0.5rem] left-[0.5rem] rounded-full bg-white/92 px-[0.7em] py-[0.32em] font-mono text-[clamp(0.58rem,0.84vw,0.8rem)] font-medium tracking-[0.12em] text-brand-700 backdrop-blur-sm">
                  {p.no}
                </span>
              </div>

              <div className="shrink-0 pt-[clamp(0.35rem,0.95vh,0.75rem)]">
                <p className="font-mono text-[clamp(0.58rem,0.82vw,0.78rem)] tracking-[0.13em] text-brand-600 uppercase">
                  {p.quarter}
                </p>
                {/*
                  Qat'iy ikki qator balandlik: sarlavha bir qatormi yoki
                  ikkimi — matn bloki bir xil joy egallaydi, shuning uchun
                  barcha panellarda rasmlar bir tekisda tugaydi.
                */}
                <h3 className="mt-[0.3em] line-clamp-2 h-[2.4em] font-display text-[clamp(0.78rem,1.22vw,1.18rem)] leading-[1.2] tracking-[-0.015em] text-balance text-ink-950">
                  {p.title}
                </h3>

                <dl className="mt-[clamp(0.3rem,0.8vh,0.6rem)] flex items-end justify-between gap-2 border-t border-ink-200 pt-[clamp(0.25rem,0.7vh,0.5rem)]">
                  <div>
                    <dt className="sr-only">Investitsiya</dt>
                    <dd className="font-display text-[clamp(0.82rem,1.42vw,1.35rem)] leading-none tracking-[-0.025em] text-brand-700">
                      {p.investment}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="sr-only">Ish o&#8216;rni</dt>
                    <dd className="font-display text-[clamp(0.82rem,1.42vw,1.35rem)] leading-none tracking-[-0.025em] text-ink-950">
                      {p.jobs}
                      <span className="ml-[0.15em] font-mono text-[0.42em] text-ink-400">ta</span>
                    </dd>
                  </div>
                </dl>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Yakuniy ko'rsatkichlar — to'q fonda, eng katta raqamlar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease: EASE_OUT_EXPO }}
          className="relative shrink-0 overflow-hidden rounded-[clamp(0.55rem,1vw,1.15rem)] bg-ink-950 px-[clamp(0.7rem,1.5vw,1.6rem)] py-[clamp(0.55rem,1.4vh,1.15rem)] text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/3 size-[22rem] rounded-full bg-brand-700/25 blur-3xl"
          />

          <div className="relative flex items-center gap-[0.8em]">
            <span className="h-px w-[1.6em] bg-gold-500/70" />
            <p className="font-mono text-[clamp(0.6rem,0.86vw,0.82rem)] tracking-[0.16em] text-ink-400 uppercase">
              Istiqboldagi umumiy ko&#8216;rsatkichlar
            </p>
          </div>

          <motion.dl
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.08, delayChildren: 0.72 }}
            className="relative mt-[clamp(0.35rem,0.9vh,0.75rem)] grid grid-cols-2 gap-x-[clamp(0.6rem,1.6vw,2rem)] gap-y-[clamp(0.35rem,0.9vh,0.7rem)] lg:grid-cols-4"
          >
            {FUTURE_IMPACT.map((k) => (
              <motion.div
                key={k.id}
                variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                className="flex items-baseline gap-[0.5em] border-l border-white/15 pl-[clamp(0.5rem,1vw,1rem)]"
              >
                <dd className="flex shrink-0 items-baseline gap-[0.22em] font-display text-[clamp(1.35rem,3vw,2.9rem)] leading-none tracking-[-0.035em]">
                  <Counter to={k.value} delay={0.78} />
                  <span className="font-mono text-[clamp(0.6rem,0.88vw,0.85rem)] tracking-normal text-gold-500">
                    {k.unit}
                  </span>
                </dd>
                <dt className="min-w-0 text-[clamp(0.61rem,0.9vw,0.85rem)] leading-[1.25] text-ink-400">
                  {k.label}
                </dt>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </SlidePad>
    </SlideShell>
  )
}
