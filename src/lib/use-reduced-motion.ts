import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Foydalanuvchi animatsiyani kamaytirishni so'raganini kuzatadi.
 *
 * Boshlang'ich qiymat darhol o'qiladi — shuning uchun birinchi render
 * ham to'g'ri bo'ladi va ortiqcha qayta render bo'lmaydi.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)

    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
