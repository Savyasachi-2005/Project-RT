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
  const filterId = React.useId().replace(/:/g, '')
  const completedRef = React.useRef(false)
  const longestText = texts.reduce((a, b) => (a.length > b.length ? a : b), '')

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
    <div className={cn('relative mx-auto w-full', className)}>
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

      {/* Sizer — prevents collapsed layout when spans are absolute */}
      <span
        aria-hidden
        className={cn(
          'invisible block text-center text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem]',
          'font-display font-bold uppercase tracking-tight',
          textClassName,
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
            'absolute inset-x-0 text-center text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem]',
            'select-none text-foreground',
            'font-display font-bold uppercase tracking-tight headline-tight',
            textClassName,
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            'absolute inset-x-0 text-center text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.5rem]',
            'select-none text-foreground',
            'font-display font-bold uppercase tracking-tight headline-tight',
            textClassName,
          )}
        />
      </div>
    </div>
  )
}
