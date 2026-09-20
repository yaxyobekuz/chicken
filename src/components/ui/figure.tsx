import { useState } from 'react'

import { IMAGES, type ImageId } from '@/data/images.generated'
import { cn } from '@/lib/utils'

type Props = {
  id: ImageId
  alt: string
  className?: string
  /** Birinchi ko'rinadigan slayddagi rasm — darhol yuklanadi. */
  priority?: boolean
  /** Ramka tomonlar nisbati. Berilmasa — konteyner o'lchami belgilaydi. */
  ratio?: string
  /** Rasm ustidagi yengil qoraytirish (ustiga matn tushsa). */
  overlay?: boolean
  sizes?: string
}

/**
 * Slaydlardagi yagona rasm ramkasi: bir xil radius, `cover` kesish va
 * blur-up placeholder (rasm yuklanguncha bo'sh oq joy qolmasin).
 */
export function Figure({
  id,
  alt,
  className,
  priority = false,
  ratio,
  overlay = false,
  sizes = '100vw',
}: Props) {
  const asset = IMAGES[id]
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('frame', className)} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        src={asset.lqip}
        alt=""
        aria-hidden
        className={cn(
          'absolute inset-0 size-full scale-110 object-cover blur-xl transition-opacity duration-500',
          loaded ? 'opacity-0' : 'opacity-100',
        )}
      />

      <img
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />

      {overlay && (
        <div className="absolute inset-0 bg-linear-to-t from-brand-950/65 via-brand-950/10 to-transparent" />
      )}
    </div>
  )
}
