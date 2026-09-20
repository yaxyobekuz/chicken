import { animate } from 'motion/react'
import { useEffect, useRef } from 'react'

import { EASE_OUT_EXPO } from '@/lib/motion'
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

/** 14850 -> "14 850". O'zbek tilida ming ajratuvchi — ingichka probel. */
export function formatNumber(n: number, decimals = 0) {
  const fixed = n.toFixed(decimals)
  const [int, frac] = fixed.split('.')
  const spaced = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return frac ? `${spaced},${frac}` : spaced
}

type Props = {
  to: number
  from?: number
  decimals?: number
  duration?: number
  delay?: number
  className?: string
}

/**
 * Raqamni sanab ko'taradi.
 *
 * Slayd almashganda komponent qayta montaj qilinadi, shuning uchun
 * sanash har safar yangidan boshlanadi — taqdimotchi orqaga qaytsa ham
 * effekt ishlaydi.
 */
export function Counter({ to, from = 0, decimals = 0, duration = 1.4, delay = 0, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced) {
      node.textContent = formatNumber(to, decimals)
      return
    }

    const controls = animate(from, to, {
      duration,
      delay,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        node.textContent = formatNumber(v, decimals)
      },
    })

    return () => controls.stop()
  }, [from, to, decimals, duration, delay, reduced])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {formatNumber(reduced ? to : from, decimals)}
    </span>
  )
}
