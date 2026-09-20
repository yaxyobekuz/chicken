import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Counter } from '@/components/ui/counter'
import { Figure } from '@/components/ui/figure'
import { COOPERATION } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * 06 — KOOPERATSIYA TIZIMI
 *
 * Bu slayd qasddan to'q fonda: undan oldingi (istiqbol) va keyingi
 * (ko'rsatkichlar) slaydlar oq, shuning uchun to'q kadr hikoyada
 * nafas va urg'u beradi — kooperatsiya alohida mavzu ekani ko'rinadi.
 *
 * Kompozitsiya:
 *   chapda  — to'liq balandlikdagi kadr + ustida natija raqami
 *   o'ngda  — uch bosqich (manbadagi bitta gapning tuzilmasi)
 *
 * MANBA: site.ts -> COOPERATION. Bu yerda hech qanday raqam yoki
 * biznes-fakt yozilmaydi — barchasi data faylidan keladi.
 */

const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
}

/** Ulanish ikonkasi — kooperatsiya (birgalikda ishlash) belgisi. */
function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M9.5 14.5 14.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M11 7.2l1.6-1.6a3.4 3.4 0 0 1 4.8 4.8L15.8 12M8.2 12l-1.6 1.6a3.4 3.4 0 0 0 4.8 4.8L13 16.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CooperationSlide() {
  const { title, lead, image, stages, highlight, outcome } = COOPERATION

  return (
    <SlideShell tone="dark">
      <SlideHead period={title} title={lead} tone="dark" />

      <SlidePad className="flex min-h-0 flex-1 flex-col pt-[clamp(0.75rem,2vh,1.75rem)] pb-[clamp(0.5rem,1.4vh,1.25rem)]">
        <div className="grid min-h-0 flex-1 gap-[clamp(0.85rem,2vw,2.25rem)] lg:grid-cols-[1.02fr_0.98fr]">
          {/* Chap: kadr + ustida natija raqami */}
          <motion.figure
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.24, ease: EASE_OUT_EXPO }}
            className="relative min-h-0"
          >
            <Figure
              id={image}
              alt="Kooperatsiya tizimiga qo‘shilgan fermer xo‘jaligi binolari"
              priority
              sizes="50vw"
              className="size-full"
            />

            {/* Kadrni pastdan qoraytirish — raqam o'qilishi uchun */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[clamp(0.5rem,0.9vw,1.25rem)] bg-linear-to-t from-ink-950 from-8% via-ink-950/70 via-42% to-transparent to-72%"
            />

            {/* Asosiy natija — slayddagi eng kuchli raqam */}
            <figcaption className="absolute inset-x-0 bottom-0 p-[clamp(0.75rem,1.8vw,2rem)]">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT_EXPO }}
                className="font-mono text-[clamp(0.5rem,0.74vw,0.7rem)] tracking-[0.18em] text-gold-400/90 uppercase"
              >
                {highlight.label}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.62, ease: EASE_OUT_EXPO }}
                className="mt-[0.3em] flex items-baseline gap-[0.22em] font-display leading-none tracking-[-0.03em] text-white"
              >
                <Counter
                  to={highlight.value}
                  decimals={1}
                  delay={0.7}
                  className="text-[clamp(2rem,5.2vw,5rem)]"
                />
                <span className="text-[clamp(0.7rem,1.25vw,1.3rem)] font-normal tracking-[-0.01em] text-white/70">
                  {highlight.unit}
                </span>
              </motion.p>
            </figcaption>
          </motion.figure>

          {/* O'ng: bosqichlar + ijtimoiy natija */}
          <div className="flex min-h-0 flex-col justify-between gap-[clamp(0.7rem,2vh,1.5rem)]">
            {/* Uch bosqich */}
            <motion.ol
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.1, delayChildren: 0.38 }}
              className="flex min-h-0 flex-1 flex-col justify-between"
            >
              {stages.map((s) => (
                <motion.li
                  key={s.id}
                  variants={rise}
                  transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
                  className="relative flex min-h-0 shrink-0 gap-[clamp(0.6rem,1.4vw,1.5rem)] border-t border-white/12 py-[clamp(0.7rem,2vh,1.6rem)] first:border-t-0 first:pt-0 last:pb-0"
                >
                  {/* Tartib raqami */}
                  <span className="grid size-[clamp(1.6rem,2.7vw,2.5rem)] shrink-0 place-items-center rounded-full bg-brand-600/25 font-mono text-[clamp(0.5rem,0.74vw,0.7rem)] text-brand-200 ring-1 ring-brand-400/25">
                    {s.no}
                  </span>

                  {/* Sarlavha raqam bilan bir sathda boshlanadi */}
                  <div className="flex min-w-0 flex-col pt-[0.1em]">
                    <h3 className="font-display text-[clamp(1.05rem,2.05vw,2.2rem)] leading-tight tracking-[-0.022em] text-white">
                      {s.title}
                    </h3>
                    <p className="mt-[0.4em] max-w-[44ch] text-[clamp(0.68rem,1.05vw,1.05rem)] leading-[1.55] text-ink-300">
                      {s.text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            {/* Ijtimoiy natija — manbada raqamsiz berilgan */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: EASE_OUT_EXPO }}
              className="relative shrink-0 overflow-hidden rounded-[clamp(0.55rem,1vw,1.15rem)] bg-white/5 px-[clamp(0.75rem,1.6vw,1.6rem)] py-[clamp(0.55rem,1.4vh,1.1rem)] ring-1 ring-white/10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-1/2 right-0 size-64 rounded-full bg-brand-600/20 blur-3xl"
              />
              <div className="relative flex items-center gap-[clamp(0.6rem,1.3vw,1.25rem)]">
                <span className="grid size-[clamp(1.7rem,2.8vw,2.6rem)] shrink-0 place-items-center rounded-full bg-brand-600/30">
                  <LinkIcon className="size-[58%] text-brand-200" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[clamp(0.48rem,0.72vw,0.68rem)] tracking-[0.16em] text-ink-400 uppercase">
                    {outcome.label}
                  </p>
                  <p className="mt-[0.2em] font-display text-[clamp(0.9rem,1.5vw,1.55rem)] leading-tight tracking-[-0.02em] text-gold-400">
                    {outcome.value}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SlidePad>
    </SlideShell>
  )
}
