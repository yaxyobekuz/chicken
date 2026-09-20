import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Figure } from '@/components/ui/figure'
import type { ImageId } from '@/data/images.generated'
import { IMPACT_2027, NEW_PROJECTS } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * 03 — 2026–2027 yangi loyihalar.
 *
 * Yuqorida uchta loyiha kartasi (kadr + raqamlar), pastda yig'ma
 * natijaning sakkizta ko'rsatkichi bitta yashil tasmada.
 */
export function ProjectsSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="2026–2027-yillar"
        title="PQ-274-sonli qarorga asosan «Parrandasanoat» uyushmasi hamkorligidagi yangi loyihalar"
      />

      <SlidePad className="flex min-h-0 flex-1 flex-col gap-[clamp(0.5rem,1.4vh,1.15rem)] pt-[clamp(0.6rem,1.8vh,1.5rem)] pb-[clamp(0.4rem,1.2vh,1rem)]">
        {/* Uchta loyiha */}
        <ul className="grid min-h-0 flex-1 gap-[clamp(0.5rem,1.3vw,1.5rem)] md:grid-cols-3">
          {NEW_PROJECTS.map((p, i) => (
            <motion.li
              key={p.no}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.26 + i * 0.09, ease: EASE_OUT_EXPO }}
              className="flex min-h-0 flex-col"
            >
              {/* Kadr */}
              <div className="relative min-h-0 flex-1">
                <Figure
                  id={p.image as ImageId}
                  alt={p.title}
                  priority={i === 0}
                  sizes="33vw"
                  className="size-full"
                />
              </div>

              {/* Matn */}
              <div className="shrink-0 pt-[clamp(0.4rem,1.1vh,0.85rem)]">
                <p className="font-mono text-[clamp(0.6rem,0.86vw,0.82rem)] tracking-[0.14em] text-brand-600 uppercase">
                  {p.quarter}
                </p>
                {/* Qat'iy ikki qator — uchala panelda rasmlar bir tekisda tugaydi */}
                <h3 className="mt-[0.35em] line-clamp-2 h-[2.36em] font-display text-[clamp(0.9rem,1.48vw,1.48rem)] leading-[1.18] tracking-[-0.018em] text-balance text-ink-950">
                  {p.title}
                </h3>

                {/*
                  Ikkala qiymat yonma-yon, slash bilan ajratiladi —
                  istiqbolli loyihalar slaydidagi kabi.
                */}
                <dl className="mt-[clamp(0.35rem,0.9vh,0.7rem)] flex items-baseline gap-[0.45em] border-t border-ink-200 pt-[clamp(0.3rem,0.8vh,0.6rem)]">
                  <dt className="sr-only">Investitsiya</dt>
                  <dd className="font-display text-[clamp(1rem,1.85vw,1.7rem)] leading-none tracking-tight text-brand-700">
                    {p.investment}
                  </dd>

                  <span
                    aria-hidden
                    className="font-display text-[clamp(1rem,1.85vw,1.7rem)] leading-none text-ink-300"
                  >
                    /
                  </span>

                  <dt className="sr-only">Ish o&#8216;rni</dt>
                  <dd className="font-display text-[clamp(1rem,1.85vw,1.7rem)] leading-none tracking-tight text-ink-950">
                    {p.jobs}
                    <span className="ml-[0.3em] font-mono text-[0.4em] text-ink-500">
                      ish o&#8216;rni
                    </span>
                  </dd>
                </dl>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Yig'ma natija — yashil tasma */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease: EASE_OUT_EXPO }}
          className="shrink-0 rounded-[clamp(0.55rem,1vw,1.15rem)] bg-brand-600 px-[clamp(0.7rem,1.5vw,1.6rem)] py-[clamp(0.55rem,1.4vh,1.15rem)] text-white"
        >
          <motion.dl
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.05, delayChildren: 0.68 }}
            className="mt-[clamp(0.4rem,1vh,0.8rem)] grid grid-cols-4 gap-x-[clamp(0.4rem,1vw,1.2rem)] gap-y-[clamp(0.4rem,1vh,0.8rem)] lg:grid-cols-8"
          >
            {IMPACT_2027.map((k) => (
              <motion.div
                key={k.id}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
                className="min-w-0 border-l border-white/20 pl-[clamp(0.4rem,0.8vw,0.8rem)]"
              >
                <dd className="flex items-baseline gap-[0.25em]">
                  <span className="font-display text-[clamp(0.95rem,1.85vw,1.9rem)] leading-none tracking-[-0.03em]">
                    {k.value}
                  </span>
                  <span className="font-mono text-[clamp(0.58rem,0.82vw,0.78rem)] text-brand-200">
                    {k.unit}
                  </span>
                  {'note' in k && k.note && (
                    <span className="font-mono text-[clamp(0.56rem,0.8vw,0.75rem)] text-gold-300">
                      {k.note}
                    </span>
                  )}
                </dd>
                <dt className="mt-[0.4em] text-[clamp(0.6rem,0.88vw,0.82rem)] leading-[1.25] text-brand-100/75">
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
