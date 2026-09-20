import { motion } from 'motion/react'

import { SlidePad } from '@/components/chrome/slide-shell'
import { LogoMark } from '@/components/ui/logo'
import { COMPANY } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Slayd sarlavhasi — referens slayddagi tuzilma:
 *   kichik korxona nomi (chapda)        logotip (o'ngda)
 *   YIL / DAVR            ← yashil, qalin
 *   Tushuntiruvchi sarlavha
 */
export function SlideHead({
  period,
  title,
  tone = 'light',
}: {
  period: string
  title: string
  tone?: 'light' | 'brand' | 'dark'
}) {
  const dark = tone !== 'light'

  return (
    <SlidePad className="shrink-0 pt-[clamp(1.1rem,2.6vh,2.25rem)]">
      {/* Yuqori qator */}
      <div className="flex items-start justify-between gap-6">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          className={cn(
            'font-mono text-[clamp(0.5rem,0.72vw,0.6875rem)] tracking-[0.22em] uppercase',
            dark ? 'text-white/55' : 'text-ink-400',
          )}
        >
          {COMPANY.name}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.06, ease: EASE_OUT_EXPO }}
        >
          <LogoMark className="h-[clamp(1.45rem,2.3vw,3rem)]" />
        </motion.div>
      </div>

      {/* Davr + sarlavha. Har bir slaydda bitta h1 bo'ladi. */}
      <h1 className="mt-[clamp(0.5rem,1.6vh,1.25rem)]">
        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: '106%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.85, delay: 0.1, ease: EASE_OUT_EXPO }}
            className={cn(
              'block font-display text-[clamp(1.75rem,3.5vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.025em]',
              dark ? 'text-gold-400' : 'text-brand-600',
            )}
          >
            {period}
          </motion.span>
        </span>

        <span className="block overflow-hidden pb-[0.08em]">
          <motion.span
            initial={{ y: '106%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.9, delay: 0.19, ease: EASE_OUT_EXPO }}
            className={cn(
              'block max-w-[min(58ch,86%)] font-display text-[clamp(1.05rem,2.15vw,2.125rem)] leading-[1.18] font-normal tracking-[-0.018em] text-balance',
              dark ? 'text-white' : 'text-ink-900',
            )}
          >
            {title}
          </motion.span>
        </span>
      </h1>
    </SlidePad>
  )
}
