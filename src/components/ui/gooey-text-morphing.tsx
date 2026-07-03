import * as React from 'react'
import { cn } from '@/lib/utils'

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  loop?: boolean
  className?: string
  textClassName?: string
  onSequenceComplete?: () => void
}

const FILTER_PAD = 12

export function GooeyText({
  texts,
  morphTime = 0.5,
  cooldownTime = 0.25,
  loop = true,
  className,
  textClassName,
  onSequenceComplete,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const sizerRef = React.useRef<HTMLSpanElement>(null)
  const filterId = React.useId().replace(/:/g, '')
  const completedRef = React.useRef(false)
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b), '')

  const textSizeClass = cn(
    'text-[clamp(1.125rem,5.5vw+0.5rem,7.5rem)] leading-[0.95] tracking-[-0.03em]',
    'sm:text-[clamp(1.5rem,6.5vw+0.5rem,7.5rem)] sm:leading-[1] sm:tracking-tight',
    'md:text-[clamp(2.25rem,7.5vw,7.5rem)]',
    textClassName,
  )

  const applyFontSize = React.useCallback((sizePx: number | null) => {
    const size = sizePx === null ? '' : `${sizePx}px`
    for (const el of [sizerRef.current, text1Ref.current, text2Ref.current]) {
      if (el) el.style.fontSize = size
    }
  }, [])

  React.useEffect(() => {
    const container = containerRef.current
    const sizer = sizerRef.current
    if (!container || !sizer) return

    const fit = () => {
      applyFontSize(null)

      const available = container.clientWidth - FILTER_PAD * 2
      let size = parseFloat(getComputedStyle(sizer).fontSize)
      const minSize = 14

      applyFontSize(size)
      while (sizer.scrollWidth > available && size > minSize) {
        size -= 1
        applyFontSize(size)
      }
    }

    const ro = new ResizeObserver(fit)
    ro.observe(container)
    fit()

    document.fonts?.ready.then(fit).catch(() => undefined)

    return () => ro.disconnect()
  }, [longestText, textClassName, applyFontSize])

  React.useEffect(() => {
    if (texts.length === 0) return

    completedRef.current = false
    let textIndex = texts.length - 1
    let time = new Date()
    let morph = 0
    let cooldown = cooldownTime
    let frameId = 0

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return

      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      fraction = 1 - fraction
      text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
    }

    const doCooldown = () => {
      morph = 0
      if (!text1Ref.current || !text2Ref.current) return

      text2Ref.current.style.filter = ''
      text2Ref.current.style.opacity = '100%'
      text1Ref.current.style.filter = ''
      text1Ref.current.style.opacity = '0%'
    }

    const doMorph = () => {
      morph -= cooldown
      cooldown = 0
      let fraction = morph / morphTime

      if (fraction > 1) {
        cooldown = cooldownTime
        fraction = 1
      }

      setMorph(fraction)
    }

    const initTexts = () => {
      if (!text1Ref.current || !text2Ref.current) return
      text1Ref.current.textContent = texts[textIndex % texts.length]
      text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
      doCooldown()
    }

    initTexts()

    function animate() {
      frameId = requestAnimationFrame(animate)
      const newTime = new Date()
      const shouldIncrementIndex = cooldown > 0
      const dt = (newTime.getTime() - time.getTime()) / 1000
      time = newTime

      cooldown -= dt

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          if (!loop && textIndex === texts.length - 2) {
            if (!completedRef.current) {
              completedRef.current = true
              onSequenceComplete?.()
            }
            cancelAnimationFrame(frameId)
            return
          }

          const nextIndex = (textIndex + 1) % texts.length
          textIndex = nextIndex
          if (text1Ref.current && text2Ref.current) {
            text1Ref.current.textContent = texts[textIndex % texts.length]
            text2Ref.current.textContent = texts[(textIndex + 1) % texts.length]
          }
        }
        doMorph()
      } else {
        doCooldown()
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [texts, morphTime, cooldownTime, loop, onSequenceComplete])

  return (
    <div
      ref={containerRef}
      className={cn('relative mx-auto w-full min-w-0 max-w-full', className)}
      style={{ paddingLeft: FILTER_PAD, paddingRight: FILTER_PAD }}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div className="relative mx-auto w-fit max-w-full">
        {/* Sizer — prevents collapsed layout when spans are absolute */}
        <span
          ref={sizerRef}
          aria-hidden
          className={cn(
            'invisible block text-center whitespace-nowrap',
            'font-display font-bold uppercase headline-tight',
            textSizeClass,
          )}
        >
          {longestText}
        </span>

        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: `url(#${filterId})` }}
        >
          <span
            ref={text1Ref}
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap',
              'select-none text-foreground',
              'font-display font-bold uppercase headline-tight',
              textSizeClass,
            )}
          />
          <span
            ref={text2Ref}
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap',
              'select-none text-foreground',
              'font-display font-bold uppercase headline-tight',
              textSizeClass,
            )}
          />
        </div>
      </div>
    </div>
  )
}
