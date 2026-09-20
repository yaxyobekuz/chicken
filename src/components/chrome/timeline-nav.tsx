import { motion } from 'motion/react'
import type { CSSProperties } from 'react'

import { SlidePad } from '@/components/chrome/slide-shell'
import { PAGES, type PageId } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { useRouter } from '@/lib/router'
import { cn } from '@/lib/utils'

/**
 * To'q fonli slaydlar — navigatsiya ham shu slaydlarda to'q bo'ladi,
 * shunda slayd bilan panel orasida keskin oq chiziq paydo bo'lmaydi.
 * Hozir barcha slaydlar oq mavzuda; ro'yxat kelajak uchun qoldirilgan.
 */
const DARK_PAGES = new Set<PageId>()

function Chevron({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn('size-[1.1em]', dir === 'prev' && 'rotate-180')}
    >
      <path
        d="M6 3.5 10.5 8 6 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * Pastki navigatsiya — step bar ko'rinishida.
 *
 * Chip'lar orasidan gorizontal chiziq o'tadi: o'tilgan qism yashil,
 * qolgani kulrang. Matn chip ichida turadi.
 *
 *   (KORXONA)━━━━(2020–2026)────(2026–2027)────(ISTIQBOL)
 */
export function TimelineNav({
  onFullscreen,
  isFullscreen,
  shownPage,
}: {
  onFullscreen: () => void
  isFullscreen: boolean
  /**
   * Ekranda ko'rinayotgan slayd (joriy `page` emas). Mavzu shu qiymatga
   * tayanadi, shuning uchun panel slayd bilan bir vaqtda o'zgaradi.
   */
  shownPage: PageId
}) {
  const { page, index, navigate, prev, next } = useRouter()

  /*
   * Navigatsiya joriy slayd mavzusiga moslashadi: to'q slaydda (masalan
   * kooperatsiya) pastki panel ham to'q bo'ladi, shunda slayd bilan
   * navigatsiya orasida keskin oq chiziq paydo bo'lmaydi.
   */
  const dark = DARK_PAGES.has(shownPage)

  // Chiziqning to'ldirilgan ulushi: birinchi va oxirgi nuqta markazlari orasi
  const progress = PAGES.length > 1 ? index / (PAGES.length - 1) : 0

  // Boshqaruv tugmalari uchun umumiy sinflar — uch joyda takrorlanmasin
  const ctrl = 'grid size-[2em] place-items-center rounded-full transition-colors duration-250'
  const ctrlOn = dark
    ? 'text-ink-300 hover:bg-white/10 hover:text-white'
    : 'text-ink-600 hover:bg-ink-100 hover:text-ink-950'
  const ctrlOff = cn('cursor-default', dark ? 'text-ink-600' : 'text-ink-300')

  return (
    <div
      className={cn(
        'relative z-40 shrink-0 border-t transition-colors duration-[550ms]',
        dark ? 'border-white/12 bg-ink-950' : 'border-ink-200 bg-white',
      )}
    >
      <SlidePad>
        <div className="flex h-[clamp(3.1rem,6.4vh,4.5rem)] items-center gap-[clamp(0.75rem,2.5vw,3rem)]">
          {/* Step bar */}
          <nav
            aria-label="Slaydlar"
            className="relative min-w-0 flex-1"
          >
            {/* Chiziq — chip'lar markazlari orasida, ular ostidan o'tadi */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-1/2 right-0 left-0 mx-[calc(100%/var(--steps)/2)] h-px -translate-y-1/2 transition-colors duration-[550ms]',
                dark ? 'bg-white/20' : 'bg-ink-200',
              )}
              style={{ '--steps': PAGES.length } as CSSProperties}
            >
              {/* O'tilgan qism */}
              <motion.span
                className={cn(
                  'absolute inset-y-0 left-0 block',
                  dark ? 'bg-brand-400' : 'bg-brand-600',
                )}
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              />
            </span>

            <ol
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${PAGES.length}, minmax(0, 1fr))` }}
            >
              {PAGES.map((p, i) => {
                const active = p.id === page
                const done = i < index

                return (
                  <li key={p.id} className="flex min-w-0 justify-center">
                    <button
                      type="button"
                      onClick={() => navigate(p.id)}
                      aria-current={active ? 'step' : undefined}
                      className={cn(
                        // fon rangi — chiziq chip ostidan ko'rinmasligi uchun
                        'group relative max-w-full rounded-full px-[clamp(0.55rem,1.1vw,1.25rem)] py-[0.45em] font-mono text-[clamp(0.5rem,0.76vw,0.75rem)] tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-[550ms]',
                        dark ? 'bg-ink-950' : 'bg-white',
                        active
                          ? 'text-white'
                          : done
                            ? dark
                              ? 'text-ink-300 hover:text-white'
                              : 'text-ink-600 hover:text-ink-950'
                            : dark
                              ? 'text-ink-500 hover:text-ink-200'
                              : 'text-ink-400 hover:text-ink-900',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="step-pill"
                          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                          className={cn(
                            'absolute inset-0 rounded-full',
                            dark ? 'bg-brand-500' : 'bg-brand-600',
                          )}
                        />
                      )}
                      {/* Faol bo'lmagan chip'lar chegarasi: o'tilgani yashilroq */}
                      {!active && (
                        <span
                          className={cn(
                            'absolute inset-0 rounded-full ring-1 transition-colors duration-300',
                            done
                              ? dark
                                ? 'ring-brand-400/45'
                                : 'ring-brand-600/35'
                              : dark
                                ? 'ring-white/15 group-hover:ring-white/30'
                                : 'ring-ink-200 group-hover:ring-ink-300',
                          )}
                        />
                      )}
                      <span className="relative block truncate">{p.period}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          {/* Boshqaruv */}
          <div className="flex shrink-0 items-center gap-[clamp(0.35rem,0.8vw,0.75rem)] text-[clamp(0.75rem,1vw,1rem)]">
            <button
              type="button"
              onClick={() => prev && navigate(prev.id)}
              disabled={!prev}
              aria-label="Oldingi slayd"
              className={cn(ctrl, prev ? ctrlOn : ctrlOff)}
            >
              <Chevron dir="prev" />
            </button>

            <button
              type="button"
              onClick={() => next && navigate(next.id)}
              disabled={!next}
              aria-label="Keyingi slayd"
              className={cn(ctrl, next ? ctrlOn : ctrlOff)}
            >
              <Chevron dir="next" />
            </button>

            <span
              className={cn(
                'mx-[0.15em] h-[1.4em] w-px transition-colors duration-[550ms]',
                dark ? 'bg-white/20' : 'bg-ink-200',
              )}
            />

            <button
              type="button"
              onClick={onFullscreen}
              aria-label={isFullscreen ? 'To‘liq ekrandan chiqish' : 'To‘liq ekran'}
              className={cn(ctrl, ctrlOn)}
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-[1.05em]">
                {isFullscreen ? (
                  <path
                    d="M6.5 2v3a1.5 1.5 0 0 1-1.5 1.5H2M9.5 2v3A1.5 1.5 0 0 0 11 6.5h3M6.5 14v-3A1.5 1.5 0 0 0 5 9.5H2M9.5 14v-3A1.5 1.5 0 0 1 11 9.5h3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M2 6V3.5A1.5 1.5 0 0 1 3.5 2H6M10 2h2.5A1.5 1.5 0 0 1 14 3.5V6M14 10v2.5a1.5 1.5 0 0 1-1.5 1.5H10M6 14H3.5A1.5 1.5 0 0 1 2 12.5V10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </SlidePad>
    </div>
  )
}
