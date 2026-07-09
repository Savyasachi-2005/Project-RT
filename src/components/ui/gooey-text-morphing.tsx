import * as React from 'react'
import { cn } from '@/lib/utils'

export type GooeySyncState = {
  currentIndex: number
  nextIndex: number
  morphFraction: number
}

interface GooeyTextProps {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  initialCooldown?: number
  loop?: boolean
  className?: string
  textClassName?: string
  onSequenceComplete?: () => void
  sync?: GooeySyncState
}

const FILTER_PAD = 12

function applyMorph(
  text1: HTMLSpanElement,
  text2: HTMLSpanElement,
  fraction: number,
) {
  const f = Math.min(Math.max(fraction, 0.001), 1)
  const inverse = Math.min(Math.max(1 - fraction, 0.001), 1)

  text2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`
  text2.style.opacity = `${Math.pow(f, 0.4) * 100}%`
  text1.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`
  text1.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`
}

function showWord(text1: HTMLSpanElement, text2: HTMLSpanElement, word: string) {
  text1.textContent = word
  text2.textContent = word
  text1.style.filter = ''
  text1.style.opacity = '100%'
  text2.style.filter = ''
  text2.style.opacity = '0%'
}

export function GooeyText({
  texts,
  morphTime = 0.5,
  cooldownTime = 0.25,
  initialCooldown,
  loop = true,
  className,
  textClassName,
  onSequenceComplete,
  sync,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null)
  const text2Ref = React.useRef<HTMLSpanElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const sizerRef = React.useRef<HTMLSpanElement>(null)
  const filterId = React.useId().replace(/:/g, '')
  const completedRef = React.useRef(false)
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b), '')
  const firstHold = initialCooldown ?? cooldownTime

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

  React.useLayoutEffect(() => {
    if (!sync || !text1Ref.current || !text2Ref.current) return

    const text1 = text1Ref.current
    const text2 = text2Ref.current
    const from = texts[sync.currentIndex] ?? ''
    const to = texts[sync.nextIndex] ?? from

    if (sync.currentIndex === sync.nextIndex || sync.morphFraction <= 0) {
      showWord(text1, text2, from)
      return
    }

    text1.textContent = from
    text2.textContent = to
    applyMorph(text1, text2, sync.morphFraction)
  }, [sync, texts])

  React.useEffect(() => {
    if (sync || texts.length === 0) return

    completedRef.current = false
    let currentIndex = 0
    let phase: 'hold' | 'morph' = 'hold'
    let elapsed = 0
    let lastTime = performance.now()
    let frameId = 0

    const assignTexts = (index: number) => {
      if (!text1Ref.current || !text2Ref.current) return

      const nextIndex = loop ? (index + 1) % texts.length : Math.min(index + 1, texts.length - 1)
      text1Ref.current.textContent = texts[index]
      text2Ref.current.textContent = texts[nextIndex]
      showWord(text1Ref.current, text2Ref.current, texts[index])
    }

    const complete = () => {
      if (completedRef.current) return
      completedRef.current = true
      onSequenceComplete?.()
      cancelAnimationFrame(frameId)
    }

    assignTexts(0)

    function animate(now: number) {
      frameId = requestAnimationFrame(animate)
      const dt = (now - lastTime) / 1000
      lastTime = now
      elapsed += dt

      if (!text1Ref.current || !text2Ref.current) return

      if (phase === 'hold') {
        const holdDuration = currentIndex === 0 ? firstHold : cooldownTime
        const isLastWord = !loop && currentIndex === texts.length - 1

        if (elapsed >= holdDuration) {
          if (isLastWord) {
            complete()
            return
          }

          phase = 'morph'
          elapsed = 0
        }
      } else {
        const fraction = Math.min(elapsed / morphTime, 1)
        applyMorph(text1Ref.current, text2Ref.current, fraction)

        if (fraction >= 1) {
          currentIndex += 1

          if (!loop && currentIndex >= texts.length - 1) {
            assignTexts(currentIndex)
            phase = 'hold'
            elapsed = 0
            return
          }

          assignTexts(currentIndex)
          phase = 'hold'
          elapsed = 0
        }
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [sync, texts, morphTime, cooldownTime, firstHold, loop, onSequenceComplete])

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
