import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Counter } from '@/components/ui/counter'
import { Figure } from '@/components/ui/figure'
import { COOPERATION } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * 06 — KOOPERATSIYA TIZIMI
 *
 * Kompozitsiya:
 *   chapda — to'liq balandlikdagi kadr
 *   o'ngda — izoh matni, ostida ikkita natija ko'rsatkichi
 *
 * MANBA: site.ts -> COOPERATION. Bu yerda hech qanday raqam yoki
 * biznes-fakt yozilmaydi — barchasi data faylidan keladi.
 */
export function CooperationSlide() {
  const { title, lead, text, image, metrics } = COOPERATION

  return (
    <SlideShell>
      <SlideHead period={title} title={lead} />

      <SlidePad className="flex min-h-0 flex-1 flex-col pt-[clamp(0.75rem,2vh,1.75rem)] pb-[clamp(0.5rem,1.4vh,1.25rem)]">
        <div className="grid min-h-0 flex-1 gap-[clamp(0.85rem,2.2vw,2.75rem)] lg:grid-cols-[0.96fr_1.04fr]">
          {/* Chap: kadr */}
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.24, ease: EASE_OUT_EXPO }}
            className="min-h-0"
          >
            <Figure
              id={image}
              alt="Klaster vakili fermer xo‘jaligi rahbari bilan kelishmoqda"
              priority
              sizes="48vw"
              className="size-full"
            />
          </motion.div>

          {/* O'ng: izoh + ko'rsatkichlar */}
          <div className="flex min-h-0 flex-col gap-[clamp(0.8rem,2.2vh,1.9rem)]">
            {/*
              Izoh matni ustunning butun kengligini egallaydi va qolgan
              balandlikda vertikal markazlashadi — shunda ostida bo'sh
              maydon qolib ketmaydi.
            */}
            <div className="flex min-h-0 flex-1 items-center">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.36, ease: EASE_OUT_EXPO }}
                className="font-display text-[clamp(1.08rem,2.5vw,2.5rem)] leading-[1.3] tracking-[-0.018em] text-ink-900"
              >
                {text}
              </motion.p>
            </div>

            {/*
              Ikkita ko'rsatkich — teng ikki ustun, orasida ajratuvchi.
              Karta ustun kengligini to'liq egallaydi, shuning uchun
              o'ng chekkada bo'sh joy qolmaydi.
            */}
            <motion.dl
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.12, delayChildren: 0.58 }}
              className="grid shrink-0 grid-cols-2 items-end rounded-[clamp(0.6rem,1.1vw,1.25rem)] bg-brand-50 px-[clamp(0.85rem,1.8vw,2rem)] py-[clamp(0.8rem,2vh,1.7rem)]"
            >
              {metrics.map((m, i) => (
                <motion.div
                  key={m.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                  className={
                    i > 0
                      ? 'min-w-0 border-l border-brand-600/20 pl-[clamp(0.85rem,1.8vw,2rem)]'
                      : 'min-w-0 pr-[clamp(0.6rem,1.2vw,1.35rem)]'
                  }
                >
                  {m.label && (
                    <dt className="max-w-[30ch] font-mono text-[clamp(0.54rem,0.85vw,0.84rem)] leading-[1.45] tracking-[0.16em] text-ink-500 uppercase">
                      {m.label}
                    </dt>
                  )}

                  {/*
                    Qisqa raqam yonida birlik turadi; uzun oraliq raqamda
                    esa ostida — aks holda qator juda cho'zilib ketadi.
                  */}
                  <dd
                    className={cn(
                      m.label && 'mt-[0.28em]',
                      m.unitBelow ? 'block' : 'flex items-baseline gap-[0.3em]',
                    )}
                  >
                    <span
                      className={cn(
                        'block shrink-0 font-display leading-none tracking-[-0.03em] whitespace-nowrap text-brand-600',
                        m.unitBelow
                          ? 'text-[clamp(1.45rem,3.3vw,3.3rem)]'
                          : 'text-[clamp(1.9rem,5vw,5rem)]',
                      )}
                    >
                      {typeof m.value === 'number' ? (
                        <Counter to={m.value} decimals={m.decimals ?? 0} delay={0.7} />
                      ) : (
                        m.value
                      )}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[clamp(0.63rem,1.15vw,1.15rem)] leading-[1.4] text-ink-700',
                        m.unitBelow ? 'mt-[0.5em] block max-w-[16ch]' : 'max-w-[8ch]',
                      )}
                    >
                      {m.unit}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </SlidePad>
    </SlideShell>
  )
}
