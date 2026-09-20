import { motion } from 'motion/react'

import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { Counter } from '@/components/ui/counter'
import { Figure } from '@/components/ui/figure'
import { FUNDING, GROWTH_EXTRAS, GROWTH_KPIS, PROJECT_GROWTH } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

const ROW_DELAY = 0.34

/**
 * 02 — Rivojlanish 2020–2026.
 *
 * Referensdagi tuzilma: chapda kadr, o'ngda ko'rsatkichlar jadvali
 * (KO'RSATKICH / 2020 / 2026 / O'SISH ustunlari). Pastda loyihalar va
 * moliyalashtirish qatori.
 */
export function GrowthSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="2020–2026-yillar"
        title="Dastlabki faoliyatdan klaster tizimiga qadam — quvvat, hajm va ish o‘rinlarining o‘sishi"
      />

      <SlidePad className="flex min-h-0 flex-1 flex-col pt-[clamp(0.6rem,1.8vh,1.5rem)] pb-[clamp(0.4rem,1.2vh,1rem)]">
        <div className="grid min-h-0 flex-1 gap-[clamp(0.8rem,1.8vw,2rem)] lg:grid-cols-[0.82fr_1.18fr]">
          {/* Chap ustun: kadr + moliyalashtirish */}
          <div className="flex min-h-0 flex-col gap-[clamp(0.6rem,1.4vh,1.1rem)]">
            <motion.div
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.24, ease: EASE_OUT_EXPO }}
              className="min-h-0 flex-1"
            >
              <Figure
                id="cage-system"
                alt="Zamonaviy boqish tizimi"
                priority
                sizes="40vw"
                className="size-full"
              />
            </motion.div>

            {/* Moliyalashtirish — ingichka ustun ko'rinishida */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
              className="shrink-0 rounded-[clamp(0.5rem,0.9vw,1rem)] bg-ink-50 p-[clamp(0.6rem,1.2vw,1.15rem)]"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-mono text-[clamp(0.6rem,0.86vw,0.82rem)] tracking-[0.16em] text-ink-500 uppercase">
                  Moliyalashtirish manbasi
                </p>
                <p className="font-display text-[clamp(0.85rem,1.5vw,1.35rem)] leading-none text-ink-950">
                  {FUNDING.total.value}
                  <span className="ml-1 font-mono text-[0.55em] text-ink-400">
                    {FUNDING.total.unit}
                  </span>
                </p>
              </div>

              {/* Ulushlar chizig'i */}
              <div className="mt-[clamp(0.4rem,0.9vh,0.7rem)] flex h-[clamp(0.3rem,0.6vh,0.45rem)] gap-[2px] overflow-hidden rounded-full">
                {FUNDING.parts.map((p, i) => (
                  <motion.span
                    key={p.id}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.12, ease: EASE_OUT_EXPO }}
                    style={{ width: `${p.percent}%` }}
                    className={`origin-left rounded-full ${
                      i === 0 ? 'bg-brand-600' : 'bg-gold-500'
                    }`}
                  />
                ))}
              </div>

              <dl className="mt-[clamp(0.4rem,0.9vh,0.7rem)] flex justify-between gap-3">
                {FUNDING.parts.map((p, i) => (
                  <div key={p.id} className="flex items-baseline gap-[0.45em]">
                    <span
                      className={`size-[0.5em] rounded-full ${
                        i === 0 ? 'bg-brand-600' : 'bg-gold-500'
                      }`}
                    />
                    <dt className="text-[clamp(0.66rem,1vw,0.92rem)] text-ink-600">{p.label}</dt>
                    <dd className="font-mono text-[clamp(0.66rem,1vw,0.92rem)] font-medium text-ink-950">
                      {p.value} mln $ &middot; {p.percent}%
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>

          {/* O'ng ustun: ko'rsatkichlar jadvali */}
          <div className="flex min-h-0 flex-col justify-between gap-[clamp(0.5rem,1.2vh,1rem)]">
            {/* Jadval sarlavhasi */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: EASE_OUT_EXPO }}
              className="grid shrink-0 grid-cols-[1.5fr_1fr_1fr_0.62fr] items-baseline gap-[clamp(0.3rem,0.8vw,0.9rem)] border-b border-ink-300 pb-[clamp(0.3rem,0.8vh,0.6rem)] font-mono text-[clamp(0.6rem,0.88vw,0.85rem)] font-medium tracking-[0.16em] text-brand-600 uppercase"
            >
              <span>Ko&#8216;rsatkich</span>
              <span>2020</span>
              <span>2026</span>
              <span className="text-right">O&#8216;sish</span>
            </motion.div>

            {/* Qatorlar — mavjud balandlikni teng bo'lishadi */}
            <div className="grid min-h-0 flex-1 grid-rows-5">
              {GROWTH_KPIS.map((k, i) => (
                <motion.div
                  key={k.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: ROW_DELAY + i * 0.07,
                    ease: EASE_OUT_EXPO,
                  }}
                  className="grid grid-cols-[1.5fr_1fr_1fr_0.62fr] items-baseline gap-[clamp(0.3rem,0.8vw,0.9rem)] border-b border-ink-100 py-[clamp(0.35rem,1.2vh,1rem)]"
                >
                  <span className="text-[clamp(0.72rem,1.12vw,1.08rem)] leading-tight text-ink-700">
                    {k.label}
                  </span>

                  <span className="flex items-baseline gap-[0.35em]">
                    <span className="font-display text-[clamp(1rem,1.95vw,1.85rem)] leading-none tracking-[-0.02em] text-ink-400">
                      <Counter
                        to={k.from}
                        decimals={k.id === 'value' ? 1 : 0}
                        delay={ROW_DELAY + i * 0.07}
                      />
                    </span>
                    <span className="text-[clamp(0.62rem,0.92vw,0.85rem)] text-ink-400">
                      {k.unit}
                    </span>
                  </span>

                  <span className="flex items-baseline gap-[0.35em]">
                    <span className="font-display text-[clamp(1.15rem,2.3vw,2.2rem)] leading-none tracking-[-0.025em] text-ink-950">
                      <Counter
                        to={k.to}
                        decimals={k.id === 'value' ? 1 : 0}
                        delay={ROW_DELAY + i * 0.07 + 0.1}
                      />
                    </span>
                    <span className="text-[clamp(0.62rem,0.92vw,0.85rem)] text-ink-600">
                      {k.unit}
                    </span>
                  </span>

                  <span className="text-right font-mono text-[clamp(0.7rem,1.08vw,1.02rem)] font-medium text-gold-700">
                    &times;{k.multiplier}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Pastki qator: iqtisod, subsidiya va loyihalar */}
            <motion.div
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.07, delayChildren: 0.72 }}
              className="grid shrink-0 grid-cols-2 gap-[clamp(0.4rem,0.9vw,0.9rem)] sm:grid-cols-5"
            >
              {GROWTH_EXTRAS.map((e) => (
                <motion.div
                  key={e.id}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="rounded-[clamp(0.4rem,0.7vw,0.75rem)] bg-brand-50 px-[clamp(0.5rem,0.9vw,0.9rem)] py-[clamp(0.4rem,0.9vh,0.75rem)]"
                >
                  <p className="flex items-baseline gap-[0.3em]">
                    <span className="font-display text-[clamp(1rem,1.9vw,1.75rem)] leading-none tracking-[-0.025em] text-brand-700">
                      <Counter to={e.value} delay={0.78} />
                    </span>
                    {e.note && (
                      <span className="font-mono text-[clamp(0.6rem,0.86vw,0.82rem)] font-medium text-gold-700">
                        {e.note}
                      </span>
                    )}
                  </p>
                  <p className="mt-[0.35em] text-[clamp(0.63rem,0.94vw,0.85rem)] leading-tight text-ink-600">
                    {e.label}
                  </p>
                </motion.div>
              ))}

              {PROJECT_GROWTH.map((p) => (
                <motion.div
                  key={p.id}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                  className="rounded-[clamp(0.4rem,0.7vw,0.75rem)] border border-ink-200 px-[clamp(0.5rem,0.9vw,0.9rem)] py-[clamp(0.4rem,0.9vh,0.75rem)]"
                >
                  <p className="flex items-baseline gap-[0.3em]">
                    <span className="font-mono text-[clamp(0.63rem,0.92vw,0.85rem)] text-ink-400">
                      {p.id === 'value' ? '0,5' : p.from}
                    </span>
                    <span className="text-[0.55em] text-ink-300">&rarr;</span>
                    <span className="font-display text-[clamp(1rem,1.9vw,1.75rem)] leading-none tracking-[-0.025em] text-ink-950">
                      <Counter to={p.to} delay={0.82} />
                    </span>
                  </p>
                  <p className="mt-[0.35em] text-[clamp(0.63rem,0.94vw,0.85rem)] leading-tight text-ink-600">
                    {p.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SlidePad>
    </SlideShell>
  )
}
