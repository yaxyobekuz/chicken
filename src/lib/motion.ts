import type { Transition, Variants } from 'motion/react'

/**
 * Umumiy harakat qoidalari.
 *
 * Maqsad — sezilarli, lekin bezovta qilmaydigan harakat. Barcha
 * komponentlar shu yerdagi qiymatlarga tayanadi, shunda sayt bir butun
 * bo'lib his qilinadi.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
export const EASE_SMOOTH = [0.65, 0, 0.35, 1] as const

export const TRANSITION: Transition = {
  duration: 0.85,
  ease: EASE_OUT_EXPO,
}

/** Element pastdan ko'tarilib paydo bo'ladi. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: TRANSITION },
}

/** Faqat xiralikdan chiqish — katta rasmlar uchun. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: EASE_OUT_EXPO } },
}

/** Ichki elementlarni ketma-ket (stagger) ishga tushiradi. */
export function stagger(each = 0.08, delay = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: each, delayChildren: delay } },
  }
}

/** Matn satri pastdan "ochiladi" — ota elementda overflow-hidden bo'lishi kerak. */
export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.95, ease: EASE_OUT_EXPO } },
}

/** Ko'rish maydoniga kirganda bir marta ishga tushadigan standart sozlama. */
export const VIEWPORT = { once: true, amount: 0.25 } as const

/** Balandroq bloklar uchun — 25% juda kech bo'lib qoladi. */
export const VIEWPORT_TALL = { once: true, amount: 0.15 } as const
