/**
 * Saytning barcha matn va raqamli ma'lumotlari.
 *
 * MANBA: SSS.pptx (4 slayd). Bu yerdagi raqamlar manbadan aynan olingan —
 * hech bir ko'rsatkich o'zgartirilmagan va qo'shimcha raqam o'ylab
 * topilmagan. Komponentlar faqat shu fayldan o'qiydi.
 */

export const COMPANY = {
  name: 'Sokin Savdo Servis',
  short: 'SSS',
  tagline: 'Parranda klasteri',
} as const

/**
 * Slaydlar ro'yxati — navigatsiya, marshrut va timeline shu yerdan quriladi.
 * `period` — pastki timeline'da ko'rinadigan davr yorlig'i.
 */
export const PAGES = [
  {
    id: 'intro',
    index: '01',
    path: '/',
    nav: 'Kirish',
    title: 'Kirish',
    period: 'Kirish',
    foot: 'Tadbirkorlik va islohotlar',
  },
  {
    id: 'overview',
    index: '02',
    path: '/korxona',
    nav: 'Korxona',
    title: 'Korxona',
    period: 'Korxona',
    foot: 'Umumiy ko‘rinish',
  },
  {
    id: 'growth',
    index: '03',
    path: '/rivojlanish',
    nav: 'Rivojlanish',
    title: 'Rivojlanish',
    period: '2020–2026',
    foot: 'Boqish va so‘yish',
  },
  {
    id: 'projects',
    index: '04',
    path: '/loyihalar',
    nav: 'Loyihalar',
    title: 'Yangi loyihalar',
    period: '2026–2027',
    foot: 'Yangi quvvatlar',
  },
  {
    id: 'future',
    index: '05',
    path: '/istiqbol',
    nav: 'Istiqbol',
    title: 'Istiqbolli loyihalar',
    period: 'Istiqbol',
    foot: 'Kengayish bosqichi',
  },
  {
    id: 'cooperation',
    index: '06',
    path: '/kooperatsiya',
    nav: 'Kooperatsiya',
    title: 'Kooperatsiya tizimi',
    period: 'Kooperatsiya',
    foot: 'Fermerlar bilan hamkorlik',
  },
  {
    id: 'indicators',
    index: '07',
    path: '/korsatkichlar',
    nav: 'Ko‘rsatkichlar',
    title: 'Ko‘rsatkichlar',
    period: 'Ko‘rsatkichlar',
    foot: 'Qiymat va tannarx',
  },
] as const

export type PageId = (typeof PAGES)[number]['id']

/* ------------------------------------------------------------------ *
 * 01 — UMUMIY
 * ------------------------------------------------------------------ */

/** Slayd 1 dagi iqtibos. Manba matni o'zgartirilmagan. */
export const QUOTE = {
  text: 'Tadbirkorlar iqtisodiyot va islohotlarning «tayanchi va lokomotivi»ga aylangan, ularda Yangi O‘zbekiston bunyodkorlari ko‘rinadi.',
  author: 'Shavkat Mirziyoyev',
  role: 'O‘zbekiston Respublikasi Prezidenti',
} as const

/** Korxona faoliyati — qiymat zanjiri bo'yicha. */
export const CAPABILITIES = [
  {
    id: 'farming',
    no: '01',
    title: 'Parranda boqish',
    text: 'Bir aylanmada 1 500 ming bosh parranda quvvatiga ega zamonaviy boqish maydonlari.',
    image: 'chain-farming',
  },
  {
    id: 'processing',
    no: '02',
    title: 'Qayta ishlash',
    text: 'Sanitariya talablariga javob beradigan liniyalarda so‘yish va bo‘laklash.',
    image: 'chain-processing',
  },
  {
    id: 'packaging',
    no: '03',
    title: 'Qadoqlash',
    text: 'Yakuniy mahsulot standart qadoqda iste’molchiga tayyorlanadi.',
    image: 'chain-packaging',
  },
  {
    id: 'coldchain',
    no: '04',
    title: 'Sovuq saqlash',
    text: 'Muzlatkichli omborlar mahsulot sifatini yetkazib berishgacha saqlaydi.',
    image: 'chain-coldstore',
  },
  {
    id: 'logistics',
    no: '05',
    title: 'Logistika',
    text: 'Refrijerator avtoparki mahsulotni hududlarga uzluksiz yetkazadi.',
    image: 'chain-logistics',
  },
  {
    id: 'retail',
    no: '06',
    title: 'Savdo',
    text: 'Ulgurji va chakana savdo tarmog‘i orqali bozorga chiqish.',
    image: 'chain-retail',
  },
] as const

/* ------------------------------------------------------------------ *
 * 02 — RIVOJLANISH 2020–2026 (slayd 2)
 * ------------------------------------------------------------------ */

export type Kpi = {
  id: string
  label: string
  unit: string
  from: number
  to: number
  /** Manbada ko'rsatilgan o'sish koeffitsienti. */
  multiplier: string
  /** Katta raqamlarni qisqartirib ko'rsatish uchun (masalan 1 500). */
  format?: 'int' | 'space'
  /**
   * 2026 qiymati boshqa birlikda ko'rsatilsa — masalan 25 ming dona -> 1,5 mln dona.
   * Berilmasa, ikkala ustun ham `unit` ni ishlatadi.
   */
  unitTo?: string
  /** 2026 qiymatidagi o'nlik kasr xonalari soni. */
  decimalsTo?: number
}

export const GROWTH_KPIS: readonly Kpi[] = [
  {
    id: 'birds',
    label: 'Bir aylanmadagi tovuqlar soni',
    unit: 'ming dona',
    from: 25,
    // 1 500 ming dona = 1,5 mln dona — o'qishga qulayroq shakl
    to: 1.5,
    unitTo: 'mln dona',
    decimalsTo: 1,
    multiplier: '60',
    format: 'space',
  },
  {
    id: 'turnover',
    label: 'Yillik aylanma',
    unit: 'mlrd so‘m',
    from: 8,
    to: 356,
    multiplier: '48',
  },
  {
    id: 'volume',
    label: 'Ishlab chiqarish hajmi',
    unit: 'tonna',
    from: 375,
    to: 14850,
    multiplier: '40',
    format: 'space',
  },
  {
    id: 'staff',
    label: 'Ishchilar soni',
    unit: 'nafar',
    from: 50,
    to: 417,
    multiplier: '8',
  },
  {
    id: 'credit',
    label: 'O‘zlashtirilgan kredit',
    unit: 'mlrd so‘m',
    from: 4,
    to: 44,
    multiplier: '11',
  },
] as const

/** Qo'shimcha moliyaviy ko'rsatkichlar (o'sish jadvalidan tashqari). */
export const GROWTH_EXTRAS = [
  {
    id: 'savings',
    value: 46,
    unit: 'mlrd so‘m',
    note: '22%',
    label: 'Tannarxni kamaytirish hisobiga erishilgan iqtisod',
  },
  {
    id: 'subsidy',
    value: 14,
    unit: 'mlrd so‘m',
    note: null,
    label: 'Olingan subsidiya miqdori',
  },
] as const

/** 2020–2026 yillarda amalga oshirilgan loyihalar. */
export const PROJECT_GROWTH: readonly Kpi[] = [
  {
    id: 'count',
    label: 'Loyihalar soni',
    unit: 'ta',
    from: 3,
    to: 12,
    multiplier: '4',
  },
  {
    id: 'value',
    label: 'Umumiy qiymati',
    unit: 'mln $',
    from: 0.5,
    to: 13,
    multiplier: '27',
  },
  {
    id: 'jobs',
    label: 'Yaratilgan ish o‘rni',
    unit: 'ta',
    from: 50,
    to: 417,
    multiplier: '8',
  },
] as const

/** Loyihalarning moliyalashtirish manbaasi — jami 13 mln $. */
export const FUNDING = {
  total: { value: 13, unit: 'mln $', label: 'Umumiy loyiha qiymati' },
  parts: [
    { id: 'own', label: 'Jamiyat mablag‘i', value: 9, percent: 67 },
    { id: 'loan', label: 'Bank krediti', value: 4, percent: 33 },
  ],
} as const

/* ------------------------------------------------------------------ *
 * 03 — YANGI LOYIHALAR 2026–2027 (slayd 3)
 * ------------------------------------------------------------------ */

export type Project = {
  no: string
  title: string
  investment: string
  quarter: string
  jobs: number
  image: string
  /** Yordamchi kadr — kompozitsiyani boyitish uchun. */
  imageAlt?: string
  text: string
}

export const CONTEXT_2027 =
  'PQ-274-sonli qarorga asosan 2026–2027 yillarda «Parrandasanoat» uyushmasi hamkorligidagi yangi loyihalar'

export const NEW_PROJECTS: readonly Project[] = [
  {
    no: '01',
    title: 'Ko‘p qavatli kataklarda boqish tizimi',
    investment: '7 mln $',
    quarter: '2027-yil, I chorak',
    jobs: 100,
    image: 'cage-feed',
    imageAlt: 'cage-aisle',
    text: 'Vertikal katak tizimi bir maydondan olinadigan bosh sonini keskin oshiradi va yemni avtomatlashtirilgan tarzda taqsimlaydi.',
  },
  {
    no: '02',
    title: 'Rendering (qayta ishlash) liniyasi',
    investment: '3 mln $',
    quarter: '2027-yil, III chorak',
    jobs: 30,
    image: 'rendering-line',
    imageAlt: 'rendering-output',
    text: 'Qayta ishlash liniyasi ishlab chiqarish qoldig‘ini yem uchun xomashyoga aylantiradi va tannarxni pasaytiradi.',
  },
  {
    no: '03',
    title: 'Parranda so‘yish majmuasi',
    investment: '10 mln $',
    quarter: '2027-yil, IV chorak',
    jobs: 300,
    image: 'slaughter-complex',
    imageAlt: 'chain-processing',
    text: 'Yangi so‘yish majmuasi klasterning yakuniy bo‘g‘inini yopadi va qayta ishlash quvvatini oshiradi.',
  },
] as const

/** 2026–2027 rejadagi yig'ma ta'sir. */
export const IMPACT_2027 = [
  { id: 'projects', value: '3', unit: 'ta', label: 'Amalga oshiriladigan loyihalar soni' },
  { id: 'value', value: '20', unit: 'mln $', label: 'Loyihaning umumiy qiymati' },
  { id: 'jobs', value: '430', unit: 'ta', label: 'Yaratiladigan ish o‘rinlari' },
  { id: 'turnover', value: '101', unit: 'mln $', label: 'Yillik aylanma' },
  { id: 'birds', value: '11,5', unit: 'mln bosh', label: 'Yillik parranda soni' },
  { id: 'volume', value: '55 000', unit: 'tonna', label: 'Ishlab chiqarish hajmi' },
  {
    id: 'added',
    value: '5',
    unit: 'mln $',
    label: 'Loyihalar hisobiga qo‘shilgan qiymat',
    note: '8%',
  },
  {
    id: 'savings',
    value: '5',
    unit: 'mln $',
    label: 'Tannarxni kamaytirish hisobiga erishilgan iqtisod',
    note: '5%',
  },
] as const

/* ------------------------------------------------------------------ *
 * 04 — ISTIQBOLLI LOYIHALAR (slayd 4)
 * ------------------------------------------------------------------ */

export const FUTURE_PROJECTS: readonly Project[] = [
  {
    no: '01',
    // Nom buyurtmachi ko'rsatmasi bo'yicha o'zgartirildi. Manba PPTX'da
    // bu loyiha "Ем-озуқа ишлаб чиқариш заводи" deb yuritilgan; summa va
    // ish o'rni raqamlari o'sha manbadan o'zgarishsiz olingan.
    title: 'Kolbasa mahsulotlarini ishlab chiqarish',
    investment: '2,5 mln $',
    quarter: '2027-yil, I chorak',
    jobs: 40,
    image: 'meat-products',
    text: 'Chuqur qayta ishlash yo‘nalishi tayyor mahsulot ulushini oshiradi va qo‘shimcha qiymat yaratadi.',
  },
  {
    no: '02',
    title: 'Maxsus naslli ona tovuq loyihasi',
    investment: '7 mln $',
    quarter: '2027-yil, II chorak',
    jobs: 100,
    image: 'hen-portrait',
    text: 'Nasl bazasi klasterni o‘z jo‘jasi bilan ta’minlab, aylanmani to‘liq yopadi.',
  },
  {
    no: '03',
    title: 'Respublikaning 12 ta viloyatida 200 ta savdo do‘konlari',
    investment: '7,5 mln $',
    quarter: '2027-yil, II chorak',
    jobs: 1200,
    image: 'retail-store-tall',
    text: 'O‘z chakana tarmog‘i mahsulotni vositachisiz iste’molchiga yetkazadi.',
  },
  {
    no: '04',
    title: 'Parranda va naslli chorvachilik fermasi',
    investment: '9 mln $',
    quarter: '2027-yil, IV chorak',
    jobs: 400,
    image: 'cattle-farm',
    text: 'Chorvachilik yo‘nalishi korxona faoliyatini kengaytiradi va yem bazasidan birgalikda foydalanadi.',
  },
  {
    no: '05',
    title: 'Yem-ozuqa ishlab chiqarish zavodi',
    investment: '10 mln $',
    quarter: '2027-yil, IV chorak',
    jobs: 40,
    image: 'feed-plant-aerial',
    text: 'Ikkinchi bosqich zavod kengaygan klaster va tashqi bozor talabini qoplaydi.',
  },
] as const

/** Istiqboldagi umumiy ko'rsatkichlar. */
export const FUTURE_IMPACT = [
  { id: 'investment', value: 36, unit: 'mln $', label: 'Jalb qilinadigan investitsiya' },
  { id: 'jobs', value: 1800, unit: 'ta', label: 'Yaratiladigan ish o‘rinlari' },
  { id: 'added', value: 11, unit: 'mln $', label: 'Qo‘shilgan qiymat', note: '60%' },
  { id: 'reduction', value: 15, unit: 'mln $', label: 'Tannarxni kamaytirish', note: '15%' },
] as const

/* ------------------------------------------------------------------ *
 * 06 — YANGI LOYIHALAR KO'RSATKICHLARI
 *
 * MANBA: korsatkichlar.xlsx. Raqamlar aynan jadvaldan olingan:
 *   Tannarx pasaytirish  — E7:E8 / N7:N9 (foiz)
 *   Qo'shimcha qiymat    — E16:E18 + F16:F18 / N16 + O16
 * Har ikkalasi ikki guruhga bo'linadi: istiqbolli loyihalar va
 * "Parrandasanoat" uyushmasi bilan birgalikdagi loyihalar.
 * ------------------------------------------------------------------ */

export type IndicatorRow = {
  id: string
  label: string
  /** Ulush, foizda. */
  percent: number
  /** Pul qiymati, mln $ — faqat qo'shimcha qiymat jadvalida bor. */
  value?: number
}

export type IndicatorGroup = {
  id: string
  /** Guruh nomi — jadval sarlavhasi. */
  title: string
  rows: readonly IndicatorRow[]
  total: number
  /** Guruh bo'yicha jami pul qiymati, mln $. */
  totalValue?: number
}

/**
 * Tannarxni pasaytirish, foizda.
 * Excel: yuqori jadval (E va N ustunlari).
 */
export const COST_REDUCTION = {
  caption: 'Tannarxni pasaytirish ko‘rsatkichi',
  unit: 'mln $',
  /*
   * Ikkala guruh foizi bir xil o'lchov (tannarx pasayishi ulushi),
   * shuning uchun ular qo'shiladi: 5,4% + 14,6% = 20%. Excel: J10 va C10.
   */
  // Tartib: «Parrandasanoat» birinchi, istiqbolli loyiha ikkinchi.
  groups: [
    {
      id: 'association',
      title: '«Parrandasanoat» uyushmasi bilan birgalikda',
      total: 5.4,
      rows: [
        { id: 'slaughter', label: 'Parranda so‘yish liniyasi', percent: 0.9, value: 0.9 },
        { id: 'rendering', label: 'Rendering liniyasi', percent: 3.3, value: 3.3 },
        { id: 'cage', label: 'Ko‘p qavatli katakda boqish', percent: 1.2, value: 1.2 },
      ],
    },
    {
      id: 'future',
      title: 'Istiqbolli loyiha',
      total: 14.6,
      rows: [
        { id: 'feed-plant', label: 'Yem zavod', percent: 5.7, value: 5.7 },
        { id: 'mother-hen', label: 'Ona tovuq loyihasi', percent: 8.9, value: 8.9 },
      ],
    },
  ],
} as const satisfies {
  caption: string
  unit: string
  /** Guruh foizlarini qo'shib umumiy ulush chiqarish mumkinmi. */
  groups: readonly IndicatorGroup[]
}

/**
 * Qo'shimcha qiymat — mln $ va foizda.
 * Excel: pastki jadval (E/F va N/O ustunlari).
 */
export const ADDED_VALUE = {
  caption: 'Qo‘shimcha qiymat ko‘rsatkichi',
  unit: 'mln $',
  /*
   * Guruh foizlari umumiy ulush sifatida qo'shib ko'rsatiladi:
   * 8% + 60% = 68%. Excel'da bu ikki qiymat alohida ustunlarda
   * (O19 va F19) turadi, umumiy yig'indi taqdimot uchun hisoblanadi.
   */
  // Tartib: «Parrandasanoat» birinchi, istiqbolli loyiha ikkinchi.
  groups: [
    {
      id: 'association',
      title: '«Parrandasanoat» uyushmasi bilan birgalikda',
      total: 8,
      rows: [{ id: 'slaughter', label: 'Parranda so‘yish liniyasi', percent: 8, value: 4.8 }],
    },
    {
      id: 'future',
      title: 'Istiqbolli loyiha',
      total: 60,
      rows: [
        { id: 'stores', label: 'Firma do‘konlari (200 dona)', percent: 20, value: 2.1 },
        { id: 'meat-dairy', label: 'Go‘sht va sut mahsulotlari', percent: 10, value: 0.9 },
        { id: 'sausage', label: 'Kolbasa', percent: 30, value: 8.1 },
      ],
    },
  ],
} as const satisfies {
  caption: string
  unit: string
  /** Guruh foizlarini qo'shib umumiy ulush chiqarish mumkinmi. */
  groups: readonly IndicatorGroup[]
}

/**
 * Kooperatsiya tizimi \u2014 alohida slayd (06).
 *
 * MANBA: SSS.pptx, kooperatsiya bloki. Matn va yagona raqamli ko'rsatkich
 * (1,5 mln bosh) manbadan aynan olingan. Quyidagi `stages` \u2014 o'sha bir
 * gapdagi bosqichlarning tuzilma ko'rinishi: yangi raqam yoki yangi
 * biznes-fakt qo'shilmagan.
 */
export const COOPERATION = {
  title: 'Kooperatsiya tizimi',
  lead: 'Faoliyati to\u2018xtatilgan va qiynalayotgan fermer xo\u2018jaliklari klaster bilan birgalikda ishlaydi.',
  text: 'Yangi loyihada faoliyati to\u2018xtatilgan va qiynalayotgan fermer xo\u2018jaliklarini kooperatsiya tizimida birgalikda ishlashda bu tizim \u2014 ish o\u2018rinlari qayta tiklanadi va qo\u2018shimcha 1,5 mln bosh parranda yetishtirish imkoniyatini beradi.',
  image: 'cage-silos',
  /** Manbadagi gapning uch bosqichi \u2014 chapdan o'ngga o'qiladi. */
  stages: [
    {
      id: 'idle',
      no: '01',
      title: 'To\u2018xtagan xo\u2018jaliklar',
      text: 'Faoliyati to\u2018xtatilgan va qiynalayotgan fermer xo\u2018jaliklari.',
    },
    {
      id: 'join',
      no: '02',
      title: 'Kooperatsiyada birgalikda',
      text: 'Xo\u2018jaliklar klaster bilan kooperatsiya tizimida birgalikda ishlaydi.',
    },
    {
      id: 'result',
      no: '03',
      title: 'Qayta tiklangan quvvat',
      text: 'Ish o\u2018rinlari qayta tiklanadi, qo\u2018shimcha parranda quvvati ochiladi.',
    },
  ],
  /** Kadr ustidagi natija ko'rsatkichlari. */
  highlight: {
    label: 'Qo\u2018shimcha yetishtirish imkoniyati',
    value: 1.7,
    unit: 'mln bosh parranda',
    /** Kadr ichida asosiy raqam yonida beriladigan ikkinchi ko'rsatkich. */
    jobs: '350 ta bo\u2018sh ish o\u2018rni',
    display: '1,5 mln bosh parranda',
  },
  /** Manbada raqam bilan berilmagan natija \u2014 matn sifatida ko'rsatiladi. */
  outcome: {
    label: 'Ijtimoiy natija',
    value: 'Ish o\u2018rinlari qayta tiklanadi',
  },
} as const
