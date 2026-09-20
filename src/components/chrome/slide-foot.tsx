import { AnimatePresence, motion } from 'motion/react'

import { SlidePad } from '@/components/chrome/slide-shell'
import { COMPANY, PAGES } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * Slayd ostidagi yorliqlar qatori (referensdagi kabi):
 * chapda — korxona yo'nalishi, o'ngda — slayd raqami.
 */
export function SlideFoot({ foot, index }: { foot: string; index: string }) {
  return (
    <SlidePad className="shrink-0 bg-white pb-[clamp(0.5rem,1.2vh,1rem)]">
      <div className="flex items-center justify-between gap-6 font-mono text-[clamp(0.5rem,0.72vw,0.6875rem)] tracking-[0.2em] uppercase">
        <div className="flex min-w-0 items-center gap-[clamp(0.5rem,1.2vw,1.1rem)]">
          <span className="truncate text-ink-400">{COMPANY.tagline}</span>
          <span className="h-px w-[clamp(1rem,2vw,2rem)] shrink-0 bg-ink-300" />
          <div className="relative h-[1.4em] min-w-0 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={foot}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-110%', opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                className="block truncate font-medium text-brand-600"
              >
                {foot}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <span className="shrink-0 text-ink-400 tabular-nums">
          {index}{' '}
          <span className="text-ink-300">
            / {String(PAGES.length).padStart(2, '0')}
          </span>
        </span>
      </div>
    </SlidePad>
  )
}
