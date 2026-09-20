import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import { SlideFoot } from '@/components/chrome/slide-foot'
import { TimelineNav } from '@/components/chrome/timeline-nav'
import { PAGES } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'
import { RouterProvider, useRouter } from '@/lib/router'
import { usePrefersReducedMotion } from '@/lib/use-reduced-motion'
import { FutureSlide } from '@/slides/future'
import { GrowthSlide } from '@/slides/growth'
import { IndicatorsSlide } from '@/slides/indicators'
import { IntroSlide } from '@/slides/intro'
import { OverviewSlide } from '@/slides/overview'
import { ProjectsSlide } from '@/slides/projects'

const SLIDES = {
  intro: IntroSlide,
  overview: OverviewSlide,
  growth: GrowthSlide,
  projects: ProjectsSlide,
  indicators: IndicatorsSlide,
  future: FutureSlide,
} as const

function Deck() {
  const { page, navigate, prev, next, direction } = useRouter()
  const reduced = usePrefersReducedMotion()
  const [isFullscreen, setFullscreen] = useState(false)

  const Slide = SLIDES[page]
  const meta = PAGES.find((p) => p.id === page)!

  // --- To'liq ekran ---
  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    else document.documentElement.requestFullscreen().catch(() => {})
  }, [])

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  // --- Klaviatura: taqdimot uchun asosiy boshqaruv ---
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ':
          if (next) {
            e.preventDefault()
            navigate(next.id)
          }
          break
        case 'ArrowLeft':
        case 'PageUp':
          if (prev) {
            e.preventDefault()
            navigate(prev.id)
          }
          break
        case 'Home':
          e.preventDefault()
          navigate(PAGES[0].id)
          break
        case 'End':
          e.preventDefault()
          navigate(PAGES[PAGES.length - 1].id)
          break
        case 'f':
        case 'F':
          e.preventDefault()
          toggleFullscreen()
          break
        default:
          // Raqam tugmalari bilan to'g'ridan-to'g'ri o'tish
          if (/^[1-9]$/.test(e.key)) {
            const target = PAGES[Number(e.key) - 1]
            if (target) {
              e.preventDefault()
              navigate(target.id)
            }
          }
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate, next, prev, toggleFullscreen])

  // Slayd o'tish animatsiyasi — yo'nalishga qarab
  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir > 0 ? '4%' : '-4%',
    }),
    center: { opacity: 1, x: '0%' },
    exit: (dir: number) => ({
      opacity: 0,
      x: reduced ? 0 : dir > 0 ? '-4%' : '4%',
    }),
  }

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden bg-white">
      {/* Slayd maydoni */}
      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduced ? 0.15 : 0.55, ease: EASE_OUT_EXPO }}
            className="absolute inset-0"
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/*
        Kirish slaydida bu yorliq ko'rsatilmaydi: u yerda rasm ekran
        chetigacha chiqadi va ochilish kadri toza qolishi kerak.
      */}
      {page !== 'intro' && <SlideFoot foot={meta.foot} index={meta.index} />}

      <TimelineNav onFullscreen={toggleFullscreen} isFullscreen={isFullscreen} />
    </div>
  )
}

export default function App() {
  return (
    <RouterProvider>
      <Deck />
    </RouterProvider>
  )
}
