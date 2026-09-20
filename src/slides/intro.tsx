import { motion } from 'motion/react'

import logoSrc from '@/assets/logo.png'
import { SlideShell } from '@/components/chrome/slide-shell'
import { IMAGES } from '@/data/images.generated'
import { COMPANY, PAGES, QUOTE } from '@/data/site'
import { EASE_OUT_EXPO } from '@/lib/motion'

/**
 * 01 — Kirish slaydi (taqdimotning ochilish kadri).
 *
 * Boshqa slaydlardan ataylab keskin farq qiladi: to'q yashil fon,
 * butun ekranni egallagan rasm va uning ustida katta iqtibos.
 * Shu kontrast tomoshabinga "taqdimot boshlandi" degan signal beradi.
 *
 * Rasm o'ng tomonda, chapga qarab yashil rangga singib ketadi —
 * shuning uchun matn har doim o'qiladi, qattiq chegara ko'rinmaydi.
 */
export function IntroSlide() {
  const words = QUOTE.text.split(' ')
  const asset = IMAGES['president-tall']

  return (
    <SlideShell tone="brand">
      {/* --- Fon: rasm o'ngda, chapga qarab yashilga singiydi --- */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE_OUT_EXPO }}
        className="absolute inset-0"
      >
        {/* Rasm o'ng tomonda; chapda yashil fon ochiq qoladi */}
        <img
          src={asset.src}
          alt={`${QUOTE.author} — ${QUOTE.role}`}
          width={asset.width}
          height={asset.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-y-0 right-0 h-full w-[72%] object-cover object-top lg:w-[62%]"
        />

        {/*
          Gradient butun ekran bo'ylab cho'ziladi — shuning uchun rasm
          chekkasida tik chegara ko'rinmaydi, yashilga yumshoq singiydi.
        */}
        <div className="absolute inset-0 bg-linear-to-r from-brand-700 from-30% via-brand-700/80 via-55% to-brand-700/5" />
        {/* Pastdan yengil qoraytirish — navigatsiya bilan tutashsin */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-brand-800/55 to-transparent" />
      </motion.div>

      {/* --- Old qatlam: matn --- */}
      <div className="relative flex min-h-0 flex-1 flex-col px-[clamp(1.25rem,4.5vw,6rem)] py-[clamp(1.1rem,3vh,2.75rem)]">
        {/* Logotip */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="flex shrink-0 items-center gap-[clamp(0.7rem,1.5vw,1.35rem)]"
        >
          {/*
            To'q yashil fonda oltin logotip xira ko'rinadi, oq quti esa
            qo'pol. Shuning uchun logotip yorug'lantirilib, kontrasti
            oshiriladi — shakli saqlanadi, fonda aniq o'qiladi.
          */}
          <img
            src={logoSrc}
            alt=""
            width={600}
            height={350}
            className="h-[clamp(1.5rem,2.6vw,2.85rem)] w-auto object-contain brightness-[1.35] saturate-[1.15]"
          />
          <span className="h-[clamp(1.1rem,2vw,2.25rem)] w-px bg-white/30" />
          <span className="font-mono text-[clamp(0.5rem,0.74vw,0.75rem)] tracking-[0.22em] text-white/70 uppercase">
            {COMPANY.name}
          </span>
        </motion.div>

        {/* Iqtibos — vertikal markazda, ekranning katta qismini egallaydi */}
        <figure className="flex min-h-0 flex-1 flex-col justify-center py-[clamp(1rem,3vh,2.5rem)]">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_OUT_EXPO }}
            aria-hidden
            className="mb-[clamp(0.5rem,1.6vh,1.35rem)] block font-display text-[clamp(2.25rem,5vw,5rem)] leading-[0.4] text-gold-400"
          >
            &ldquo;
          </motion.span>

          <motion.blockquote
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.032, delayChildren: 0.42 }}
            className="max-w-[min(20ch,92%)] font-display text-[clamp(1.3rem,3.4vw,3.9rem)] leading-[1.16] tracking-[-0.025em] text-balance text-white"
          >
            {words.map((w, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
                className="inline-block"
              >
                {w}
                {i < words.length - 1 && ' '}
              </motion.span>
            ))}
          </motion.blockquote>

          <motion.figcaption
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: EASE_OUT_EXPO }}
            className="mt-[clamp(1.25rem,3.6vh,3rem)] flex items-center gap-[clamp(0.75rem,1.5vw,1.5rem)]"
          >
            <span className="h-px w-[clamp(2rem,4vw,4.5rem)] shrink-0 bg-gold-400/80" />
            <span className="min-w-0">
              <span className="block text-[clamp(0.8rem,1.15vw,1.125rem)] font-medium text-white">
                {QUOTE.author}
              </span>
              <span className="mt-[0.2em] block font-mono text-[clamp(0.48rem,0.72vw,0.6875rem)] tracking-[0.16em] text-brand-100/80 uppercase">
                {QUOTE.role}
              </span>
            </span>
          </motion.figcaption>
        </figure>

        {/* Pastki qator: korxona yo'nalishi + slayd raqami */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.45 }}
          className="flex shrink-0 items-center justify-between gap-6 border-t border-white/25 pt-[clamp(0.6rem,1.4vh,1.1rem)] font-mono text-[clamp(0.48rem,0.7vw,0.6875rem)] tracking-[0.2em] uppercase"
        >
          <span className="text-white/75">{COMPANY.tagline}</span>
          <span className="text-white/75 tabular-nums">
            {PAGES[0].index}{' '}
            <span className="text-white/45">/ {String(PAGES.length).padStart(2, '0')}</span>
          </span>
        </motion.div>
      </div>
    </SlideShell>
  )
}
