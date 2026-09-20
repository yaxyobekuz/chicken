import { cn } from '@/lib/utils'

import logoPng from "../../assets/logo.png"

/**
 * Korxonaning original logotipi.
 *
 * Fayl to'g'ridan-to'g'ri import qilinadi — Vite uni bundle'ga qo'shib,
 * hash bilan nomlaydi. Fon shaffof, shuning uchun oq va yashil fonlarda
 * bir xil ishlaydi.
 *
 * Balandlik `className` orqali beriladi, kenglik nisbatga qarab
 * o'zi hisoblanadi.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src={logoPng}
      alt="Sokin Savdo Servis"
      width={600}
      height={350}
      decoding="async"
      className={cn('h-7 w-auto object-contain', className)}
    />
  )
}

/** Logotip + korxona nomi. */
export function Logo({
  className,
  markClassName,
  showName = true,
}: {
  className?: string
  markClassName?: string
  showName?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-2.5', className)}>
      <LogoMark className={cn('h-5', markClassName)} />
      {showName && (
        <span className="text-[0.8125rem] font-medium tracking-[0.02em] whitespace-nowrap">
          Sokin Savdo Servis
        </span>
      )}
    </span>
  )
}
