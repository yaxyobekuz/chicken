import { motion } from 'motion/react'
import { Donut } from '@/components/charts/donut'
import { SlideHead } from '@/components/chrome/slide-head'
import { SlidePad, SlideShell } from '@/components/chrome/slide-shell'
import { ADDED_VALUE, COST_REDUCTION, type IndicatorGroup } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

type Tone = 'brand' | 'gold'

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
function GroupCard({ group, tone, delay }: { group: IndicatorGroup; tone: Tone; delay: number }) {
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
              variants={{
                hidden: { opacity: 0, x: -10 },
                show: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              className="flex items-baseline gap-[clamp(0.35rem,0.7vw,0.65rem)] border-b border-ink-900/10 py-[clamp(0.25rem,0.8vh,0.6rem)] last:border-b-0"
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
              {r.value !== undefined && (
                <span className="shrink-0 font-mono text-[clamp(0.55rem,0.82vw,0.78rem)] text-ink-500 tabular-nums">
                  {num(r.value)} <span className="text-ink-400">mln&nbsp;$</span>
                </span>
              )}
              <span className="flex shrink-0 items-baseline gap-[0.1em] font-display text-[clamp(0.82rem,1.32vw,1.28rem)] leading-none tracking-[-0.02em] text-ink-950 tabular-nums">
                {num(r.percent)}
                <span className="text-[0.55em] text-ink-400">%</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.article>
  )
}

/**
 * Ustun ostidagi yakuniy karta — ustundagi ikkala guruh yig'indisi.
 *
 * Rang ustun palitrasidan olinadi: yashil ustun ostida to'yingan yashil,
 * oltin ustun ostida to'yingan oltin karta. Ustun ichidagi kartalar och
 * ton'da, yakun esa to'q — shu farq yig'indini ajratib ko'rsatadi.
 *
 * Faqat pul summasi chiqariladi: foiz ulushlari kartalar ichida
 * allaqachon guruhma-guruh ko'rsatilgan.
 */
function ColumnTotal({
  data,
  tone,
  delay,
}: {
  data: typeof COST_REDUCTION | typeof ADDED_VALUE
  tone: Tone
  delay: number
}) {
  const brand = tone === 'brand'

  /*
   * Jami qiymat qatorlardan hisoblanadi — qo'lda yozilmaydi.
   * Yakuniy summa butun songacha yuqoriga yaxlitlanadi (15,9 -> 16):
   * bu xulosa raqami, kasr qismi uni faqat og'irlashtiradi.
   */
  const total = Math.ceil(
    data.groups.reduce((sum, g) => sum + g.rows.reduce((s, r) => s + (r.value ?? 0), 0), 0),
  )

  /*
   * Umumiy foiz — odatda guruh foizlari yig'indisi (5,4 + 14,6 = 20).
   * Ba'zi ustunda yig'indi mantiqan to'g'ri kelmaydi (guruhlar turli
   * hajmdagi yo'nalishlar), o'shanda manbadagi tayyor qiymat olinadi.
   */
  const override = 'percentOverride' in data ? data.percentOverride : undefined
  const totalPercent =
    override?.value ??
    Math.round(data.groups.reduce((sum, g) => sum + g.total, 0) * 100) / 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: EASE_OUT_EXPO }}
      className={cn(
        'relative shrink-0 overflow-hidden rounded-[clamp(0.55rem,1vw,1.15rem)] px-[clamp(0.7rem,1.5vw,1.5rem)] py-[clamp(0.5rem,1.3vh,1rem)] text-white',
        brand ? 'bg-brand-600' : 'bg-gold-700',
      )}
    >
      {/* Yengil yorug'lik — karta tekis bo'lib qolmasin */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/2 right-0 size-64 rounded-full bg-white/12 blur-3xl"
      />
      <div className="relative flex items-center justify-between gap-[clamp(0.5rem,1.2vw,1.25rem)]">
        <div className="min-w-0">
          <p className="font-mono text-[clamp(0.48rem,0.72vw,0.68rem)] tracking-[0.16em] text-white/65 uppercase">
            Jami
          </p>
          <p className="mt-[0.15em] flex items-baseline gap-[0.18em] font-display leading-none tracking-[-0.03em] text-white">
            <span className="text-[clamp(1.25rem,2.4vw,2.4rem)] tabular-nums">
              {num(total)}
            </span>
            <span className="text-[clamp(0.55rem,0.9vw,0.9rem)] font-normal text-white/70">
              {data.unit}
            </span>
          </p>
        </div>

        {/* Umumiy foiz — kartaning o'ng chekkasida, pul summasiga juft.
            Foiz belgisi raqam bilan bir xil o'lchamda. */}
        <p className="flex shrink-0 items-baseline gap-[0.4em] text-white">
          {override?.prefix && (
            <span className="font-mono text-[clamp(0.48rem,0.72vw,0.68rem)] tracking-[0.16em] text-white/65 uppercase">
              {override.prefix}
            </span>
          )}
          <span className="font-display text-[clamp(1.25rem,2.4vw,2.4rem)] leading-none tracking-[-0.03em] tabular-nums">
            {num(totalPercent)}%
          </span>
        </p>
      </div>
    </motion.div>
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
      {/* Guruhlar ustun ichida vertikal joylashadi */}
      <div className="flex min-h-0 flex-1 flex-col gap-[clamp(0.45rem,1.1vh,0.95rem)]">
        {data.groups.map((g, i) => (
          <GroupCard key={g.id} group={g} tone={tone} delay={delay + 0.1 + i * 0.1} />
        ))}
        {/* Ustun yakuni */}
        <ColumnTotal data={data} tone={tone} delay={delay + 0.32} />
      </div>
    </section>
  )
}

export function IndicatorsSlide() {
  return (
    <SlideShell>
      <SlideHead
        period="Yangi loyihalar ko‘rsatkichlari"
        title="Tannarxni pasaytirish va qo‘shimcha qiymat — asosiy natijalar bir sahifada"
      />
      <SlidePad className="flex min-h-0 flex-1 flex-col gap-[clamp(0.45rem,1.3vh,1.1rem)] pt-[clamp(0.5rem,1.5vh,1.25rem)] pb-[clamp(0.4rem,1.2vh,1rem)]">
        {/* Ikkita mavzu yonma-yon ustun bo'lib turadi */}
        <div className="grid min-h-0 flex-1 gap-[clamp(0.6rem,1.4vw,1.75rem)] lg:grid-cols-2">
          <IndicatorSection data={COST_REDUCTION} tone="gold" delay={0.24} />
          <IndicatorSection data={ADDED_VALUE} tone="brand" delay={0.4} />
        </div>
      </SlidePad>
    </SlideShell>
  )
}
