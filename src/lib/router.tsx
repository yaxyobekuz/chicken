import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { PAGES, type PageId } from '@/data/site'

/**
 * Minimal history-router.
 *
 * Maqsad — URL o'zgarsa ham sahifa qayta yuklanmasin, shunda sahifalar
 * orasidagi animatsiyali o'tishni boshqarish mumkin bo'ladi. Loyihada
 * atigi 4 ta statik yo'l bor, shuning uchun to'liq router kutubxonasi
 * ortiqcha.
 */

type RouterValue = {
  page: PageId
  index: number
  navigate: (to: PageId) => void
  /** Oldingi/keyingi sahifa — pastki navigatsiya uchun. */
  prev: (typeof PAGES)[number] | null
  next: (typeof PAGES)[number] | null
  /** O'tish yo'nalishi: 1 — oldinga, -1 — orqaga. */
  direction: number
}

const RouterContext = createContext<RouterValue | null>(null)

export function useRouter() {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter faqat <RouterProvider> ichida ishlaydi')
  return ctx
}

/** Joriy manzilni sahifa id'siga aylantiradi. Noma'lum yo'l -> birinchi sahifa. */
function pageFromPath(pathname: string): PageId {
  const found = PAGES.find((p) => p.path === pathname)
  return found ? found.id : PAGES[0].id
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<PageId>(() => pageFromPath(window.location.pathname))
  const [direction, setDirection] = useState(1)

  /*
   * Joriy sahifani ref'da ham saqlaymiz.
   *
   * Yo'nalishni hisoblash va history'ni yangilash — nojo'ya ta'sirlar,
   * shuning uchun ular `setPage` updater'i ichida bajarilmaydi: React
   * updater'ni ikki marta chaqirishi mumkin va bunda history buziladi.
   */
  const pageRef = useRef(page)
  useEffect(() => {
    pageRef.current = page
  }, [page])

  const goTo = useCallback((to: PageId, push: boolean) => {
    const current = pageRef.current
    if (current === to) return

    const a = PAGES.findIndex((p) => p.id === current)
    const b = PAGES.findIndex((p) => p.id === to)

    pageRef.current = to
    setDirection(b > a ? 1 : -1)
    setPage(to)

    if (push) {
      const target = PAGES.find((p) => p.id === to)
      if (target) window.history.pushState({}, '', target.path)
    }
  }, [])

  // Brauzerning orqaga/oldinga tugmalari — URL allaqachon o'zgargan,
  // shuning uchun pushState chaqirilmaydi.
  useEffect(() => {
    const onPop = () => goTo(pageFromPath(window.location.pathname), false)

    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [goTo])

  const navigate = useCallback((to: PageId) => goTo(to, true), [goTo])

  const value = useMemo<RouterValue>(() => {
    const index = PAGES.findIndex((p) => p.id === page)
    return {
      page,
      index,
      navigate,
      direction,
      prev: index > 0 ? PAGES[index - 1] : null,
      next: index < PAGES.length - 1 ? PAGES[index + 1] : null,
    }
  }, [page, navigate, direction])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}
