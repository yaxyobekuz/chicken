import { motion } from 'motion/react'

import { Counter } from '@/components/ui/counter'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

const SIZE = 200
const STROKE = 18
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R
/** Segmentlar orasidagi nozik bo'shliq, foizda. */
const GAP = 1.1

export type DonutSegment = {
  id: string
  label: string
  percent: number
}

/**
 * Segmentli halqa diagramma.
 *
 * Har bir segment jadvaldagi qatorga mos keladi va o'z rang darajasida
 * chiziladi — shuning uchun halqaga qarab qaysi ulush qanchaligi
 * darhol ko'rinadi. Markazda umumiy foiz turadi.
 *
 * Segment `strokeDasharray` bilan qat'iy uzunlikda chiziladi va
 * `strokeDashoffset` orqali o'sib chiqadi. `pathLength` ishlatilmaydi:
 * u dasharray'ni qayta masshtablab, yoyni butun halqaga cho'zib yuboradi.
 */
export function Donut({
  segments,
  total,
  label,
  tone = 'brand',
  delay = 0,
  className,
}: {
  segments: readonly DonutSegment[]
  /** Markazdagi umumiy foiz. */
  total: number
  label: string
  tone?: 'brand' | 'gold'
  delay?: number
  className?: string
}) {
  const brand = tone === 'brand'

  // Segmentlarning boshlanish burchagi to'planib boradi
  let acc = 0
  const arcs = segments.map((s, i) => {
    const start = acc
    acc += s.percent
    const len = (Math.max(s.percent - GAP, 0.5) / 100) * CIRC
    return {
      ...s,
      i,
      len,
      rest: CIRC - len,
      rotate: (start / 100) * 360,
    }
  })

  /** Segment rangi — birinchisi to'q, keyingilari ochroq. */
  const shade = (i: number) => {
    const brandShades = ['text-brand-600', 'text-brand-400', 'text-brand-300']
    const goldShades = ['text-gold-600', 'text-gold-500', 'text-gold-400']
    const list = brand ? brandShades : goldShades
    return list[i % list.length]
  }

  return (
    // aspect-square + h-full: konteyner balandligiga moslashadi va
    // kengligini o'zi hisoblaydi — shuning uchun hech qachon cho'zilmaydi.
    <div className={cn('relative aspect-square h-full', className)}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="size-full"
        role="img"
        aria-label={`${label}: ${total}%`}
      >
        {/* Fon halqasi */}
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          strokeWidth={STROKE}
          stroke="currentColor"
          className={brand ? 'text-brand-600/12' : 'text-gold-600/12'}
        />

        {arcs.map((a) => (
          <motion.circle
            key={a.id}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="butt"
            stroke="currentColor"
            strokeDasharray={`${a.len} ${a.rest}`}
            className={shade(a.i)}
            // -90° — yoy soat 12 dan boshlanadi
            style={{ transformOrigin: 'center', rotate: `${a.rotate - 90}deg` }}
            initial={{ strokeDashoffset: a.len }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 1,
              delay: delay + a.i * 0.16,
              ease: EASE_OUT_EXPO,
            }}
          />
        ))}
      </svg>

      {/* Markazdagi umumiy foiz */}
      <div className="absolute inset-0 grid place-content-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: delay + 0.3, ease: EASE_OUT_EXPO }}
          className={cn(
            'flex items-baseline justify-center gap-[0.1em] font-display text-[clamp(1.5rem,3.3vw,3.1rem)] leading-none tracking-[-0.03em]',
            brand ? 'text-brand-700' : 'text-gold-700',
          )}
        >
          {/* O'nlik kasrli qiymat yaxlitlanmasin: 14,6% "15%" bo'lib qolmasin */}
          <Counter
            to={total}
            decimals={Number.isInteger(total) ? 0 : 1}
            delay={delay + 0.3}
          />
          <span className="text-[0.5em]">%</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: delay + 0.45 }}
          className="mt-[0.45em] font-mono text-[clamp(0.55rem,0.8vw,0.75rem)] tracking-[0.16em] text-ink-500 uppercase"
        >
          {label}
        </motion.p>
      </div>
    </div>
  )
}
