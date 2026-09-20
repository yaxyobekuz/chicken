import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Bitta slayd = bitta to'liq ekran.
 *
 * Scroll yo'q: kontent har doim `100dvh` ichiga sig'adi. Shuning uchun
 * barcha o'lchamlar `clamp()` va viewport birliklariga (vh/vw) tayanadi —
 * katta monitorda ham, noutbukda ham kompozitsiya bir xil ko'rinadi.
 *
 * Tuzilma (rasmdagi kabi):
 *   ┌──────────────────────────────┐
 *   │ eyebrow            logotip   │  ← yuqori qator
 *   │ SARLAVHA                     │
 *   │ ┌──────────┐  ┌───────────┐  │  ← asosiy maydon (children)
 *   │ │  rasm    │  │  jadval   │  │
 *   │ └──────────┘  └───────────┘  │
 *   │ pastki izoh                  │
 *   └──────────────────────────────┘
 *   timeline navigatsiya alohida, App darajasida
 */
export function SlideShell({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'brand' | 'dark'
}) {
  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden',
        tone === 'light' && 'bg-white text-ink-950',
        tone === 'brand' && 'bg-brand-600 text-white',
        tone === 'dark' && 'bg-ink-950 text-white',
        className,
      )}
    >
      {children}
    </div>
  )
}

/**
 * Slayd ichidagi gorizontal chekka.
 * Full-screen taqdimot uchun konteyner keng — max-width qo'yilmaydi.
 */
export function SlidePad({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'w-full px-[clamp(1.25rem,3.6vw,4.5rem)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
