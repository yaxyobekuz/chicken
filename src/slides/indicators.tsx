import { motion } from 'motion/react'

import { Donut } from '@/components/charts/donut'
import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { ADDED_VALUE, COOPERATION, COST_REDUCTION, type IndicatorGroup } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Tone = 'brand' | 'gold'

/** Parranda ikonkasi — kooperatsiya blokidagi urg'u uchun. */
function BirdIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M14.5 4.5a2 2 0 1 0-2.9 1.8C10 7.2 9 8.9 9 11v1.5H6.5c-.8 0-1.3.9-.9 1.6l1.6 2.6c.6 1 1.7 1.6 2.9 1.6H14c2.8 0 5-2.2 5-5v-1c0-1.5-.7-2.9-1.8-3.8l-1.4-1.1c-.2-.7-.6-1.3-1.3-1.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 18.3V21M13.5 18.5V21M17 6.2l2.6-.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14.4" cy="4.4" r=".9" fill="currentColor" />
    </svg>
  )
}

/** O'nlik kasr — o'zbekcha vergul bilan. */
const num = (n: number) => String(n).replace('.', ',')

/** Segment rangi — halqadagi tartib bilan bir xil. */
function dotColor(tone: Tone, i: number) {
  const brand = ['bg-brand-600', 'bg-brand-400', 'bg-brand-300']
  const gold = ['bg-gold-600', 'bg-gold-500', 'bg-gold-400']
  return (tone === 'brand' ? brand : gold)[i % 3]
}

/**
 * Bitta guruh: chapda halqa, o'ngda qatorlar.
 *
 * Halqa har doim foizni ko'rsatadi (guruhlar o'zaro taqqoslansin),
 * qatorda esa pul qiymati bo'lsa — foiz yonida beriladi.
 */
function GroupCard({
  group,
  tone,
  showValue,
  delay,
}: {
  group: IndicatorGroup
  tone: Tone
  /** Qatorlarda mln $ ham ko'rsatilsinmi. */
  showValue: boolean
  delay: number
}) {
  const brand = tone === 'brand'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
      className={cn(
        'flex min-h-0 flex-col rounded-[clamp(0.55rem,1vw,1.15rem)] p-[clamp(0.6rem,1.2vw,1.3rem)]',
        brand ? 'bg-brand-50' : 'bg-gold-200/22',
      )}
    >
      <h4
        className={cn(
          'shrink-0 truncate font-mono text-[clamp(0.55rem,0.82vw,0.78rem)] font-medium tracking-[0.12em] uppercase',
          brand ? 'text-brand-700' : 'text-gold-700',
        )}
      >
        {group.title}
      </h4>

      <div className="grid min-h-0 flex-1 items-center gap-[clamp(0.5rem,1.2vw,1.35rem)] pt-[clamp(0.35rem,1vh,0.8rem)] sm:grid-cols-[auto_1fr]">
        <div className="flex min-h-0 justify-center self-stretch">
          <Donut
            segments={group.rows}
            total={group.total}
            label="Jami"
            tone={tone}
            delay={delay + 0.18}
            className="min-h-0 flex-none"
          />
        </div>

        <motion.ul
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.07, delayChildren: delay + 0.32 }}
          className="min-w-0"
        >
          {group.rows.map((r, i) => (
            <motion.li
              key={r.id}
              variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex items-baseline gap-[clamp(0.35rem,0.7vw,0.65rem)] border-b border-ink-900/10 py-[clamp(0.25rem,0.8vh,0.6rem)]"
            >
              <span
                className={cn(
                  'size-[0.6em] shrink-0 translate-y-[-0.1em] rounded-full',
                  dotColor(tone, i),
                )}
              />
              <span className="min-w-0 flex-1 text-[clamp(0.62rem,0.95vw,0.92rem)] leading-snug text-ink-800">
                {r.label}
              </span>

              {showValue && r.value !== undefined && (
                <span className="shrink-0 font-mono text-[clamp(0.55rem,0.82vw,0.78rem)] text-ink-500 tabular-nums">
                  {num(r.value)}
                </span>
              )}

              <span className="flex shrink-0 items-baseline gap-[0.1em] font-display text-[clamp(0.82rem,1.32vw,1.28rem)] leading-none tracking-[-0.02em] text-ink-950 tabular-nums">
                {num(r.percent)}
                <span className="text-[0.55em] text-ink-400">%</span>
              </span>
            </motion.li>
          ))}

          {/* Jami */}
          <motion.li
            variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            className="flex items-baseline gap-[clamp(0.35rem,0.7vw,0.65rem)] pt-[clamp(0.3rem,0.9vh,0.65rem)]"
          >
            <span className="size-[0.6em] shrink-0" />
            <span
              className={cn(
                'min-w-0 flex-1 font-mono text-[clamp(0.55rem,0.82vw,0.78rem)] font-medium tracking-[0.14em] uppercase',
                brand ? 'text-brand-700' : 'text-gold-700',
              )}
            >
              Jami
            </span>

            {showValue && group.totalValue !== undefined && (
              <span
                className={cn(
                  'shrink-0 font-mono text-[clamp(0.58rem,0.86vw,0.82rem)] font-medium tabular-nums',
                  brand ? 'text-brand-700' : 'text-gold-700',
                )}
              >
                {num(group.totalValue)} mln $
              </span>
            )}

            <span
              className={cn(
                'flex shrink-0 items-baseline gap-[0.1em] font-display text-[clamp(0.95rem,1.55vw,1.5rem)] leading-none tracking-[-0.025em] tabular-nums',
                brand ? 'text-brand-700' : 'text-gold-700',
              )}
            >
              {num(group.total)}
              <span className="text-[0.55em]">%</span>
            </span>
          </motion.li>
        </motion.ul>
      </div>
    </motion.article>
  )
}

/** Ikkita guruhni bitta mavzu ostida birlashtiruvchi qator. */
function IndicatorSection({
  data,
  tone,
  delay,
}: {
  data: typeof COST_REDUCTION | typeof ADDED_VALUE
  tone: Tone
  delay: number
}) {
  const brand = tone === 'brand'
  const showValue = data.unit !== '%'

  return (
    <section className="flex min-h-0 flex-1 flex-col">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay, ease: EASE_OUT_EXPO }}
        className="flex shrink-0 items-center gap-[clamp(0.45rem,0.9vw,0.85rem)] pb-[clamp(0.3rem,0.9vh,0.65rem)]"
      >
        <span
          className={cn(
            'h-px w-[clamp(0.9rem,1.7vw,1.9rem)] shrink-0',
            brand ? 'bg-brand-600/50' : 'bg-gold-600/50',
          )}
        />
        <h3
          className={cn(
            'font-display text-[clamp(0.9rem,1.55vw,1.6rem)] leading-tight tracking-[-0.02em]',
            brand ? 'text-brand-700' : 'text-gold-700',
          )}
        >
          {data.caption}
        </h3>
      </motion.div>

      <div className="grid min-h-0 flex-1 gap-[clamp(0.5rem,1.2vw,1.35rem)] lg:grid-cols-2">
        {data.groups.map((g, i) => (
          <GroupCard
            key={g.id}
            group={g}
            tone={tone}
            showValue={showValue}
            delay={delay + 0.1 + i * 0.1}
          />
        ))}
      </div>
    </section>
  )
}

export function IndicatorsSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="Yangi loyihalar ko‘rsatkichlari"
        title="Tannarxni pasaytirish, qo‘shimcha qiymat va kooperatsiya tizimi — asosiy natijalar bir sahifada"
      />

      <SlidePad className="flex min-h-0 flex-1 flex-col gap-[clamp(0.45rem,1.3vh,1.1rem)] pt-[clamp(0.5rem,1.5vh,1.25rem)] pb-[clamp(0.4rem,1.2vh,1rem)]">
        <IndicatorSection data={COST_REDUCTION} tone="gold" delay={0.24} />
        <IndicatorSection data={ADDED_VALUE} tone="brand" delay={0.4} />

        {/* Kooperatsiya tizimi */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.66, ease: EASE_OUT_EXPO }}
          className="relative shrink-0 overflow-hidden rounded-[clamp(0.55rem,1vw,1.15rem)] bg-ink-950 px-[clamp(0.75rem,1.6vw,1.75rem)] py-[clamp(0.5rem,1.3vh,1.1rem)] text-white"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/4 size-[18rem] rounded-full bg-brand-700/25 blur-3xl"
          />

          <div className="relative grid items-center gap-[clamp(0.5rem,1.4vw,2rem)] lg:grid-cols-[auto_1fr_auto]">
            <div className="flex shrink-0 items-center gap-[clamp(0.45rem,0.9vw,0.85rem)]">
              <span className="grid size-[clamp(1.7rem,2.8vw,2.6rem)] shrink-0 place-items-center rounded-full bg-brand-600/30">
                <BirdIcon className="size-[58%] text-brand-200" />
              </span>
              <h3 className="font-display text-[clamp(0.92rem,1.5vw,1.55rem)] leading-tight tracking-[-0.02em] whitespace-nowrap">
                {COOPERATION.title}
              </h3>
            </div>

            <p className="max-w-[82ch] text-[clamp(0.62rem,0.92vw,0.9rem)] leading-[1.5] text-ink-300">
              {COOPERATION.text}
            </p>

            <div className="shrink-0 border-t border-white/15 pt-[clamp(0.35rem,0.9vh,0.6rem)] lg:border-t-0 lg:border-l lg:pt-0 lg:pl-[clamp(0.8rem,1.6vw,1.75rem)]">
              <p className="font-mono text-[clamp(0.5rem,0.76vw,0.72rem)] tracking-[0.14em] text-ink-400 uppercase">
                {COOPERATION.highlight.label}
              </p>
              <p className="mt-[0.3em] font-display text-[clamp(0.95rem,1.75vw,1.8rem)] leading-none tracking-[-0.025em] whitespace-nowrap text-gold-400">
                {COOPERATION.highlight.value}
              </p>
            </div>
          </div>
        </motion.section>
      </SlidePad>
    </SlideShell>
  )
}
