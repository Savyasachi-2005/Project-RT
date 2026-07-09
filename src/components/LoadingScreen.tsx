import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { GooeyText, type GooeySyncState } from '@/components/ui/gooey-text-morphing'
import { SiteAtmosphere } from '@/components/ui/site-atmosphere'
import { siteContent } from '@/content/siteContent'

type LoadingScreenProps = {
  onComplete: () => void
}

export function getLoadingSyncState(
  elapsedMs: number,
  wordCount: number,
  sequenceMs: number,
  morphMs: number,
): GooeySyncState {
  const lastIndex = Math.max(wordCount - 1, 0)
  const displayMs =
    (sequenceMs - morphMs * Math.max(wordCount - 1, 0)) / Math.max(wordCount, 1)

  if (elapsedMs >= sequenceMs) {
    return { currentIndex: lastIndex, nextIndex: lastIndex, morphFraction: 0 }
  }

  let cursor = 0

  for (let i = 0; i < wordCount; i++) {
    if (elapsedMs < cursor + displayMs) {
      return { currentIndex: i, nextIndex: i, morphFraction: 0 }
    }
    cursor += displayMs

    if (i < lastIndex) {
      if (elapsedMs < cursor + morphMs) {
        return {
          currentIndex: i,
          nextIndex: i + 1,
          morphFraction: (elapsedMs - cursor) / morphMs,
        }
      }
      cursor += morphMs
    }
  }

  return { currentIndex: lastIndex, nextIndex: lastIndex, morphFraction: 0 }
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { loading } = siteContent
  const [elapsedMs, setElapsedMs] = useState(0)

  const totalMs = loading.durationMs + loading.holdAfterMs

  const sync = useMemo(
    () =>
      getLoadingSyncState(
        elapsedMs,
        loading.words.length,
        loading.durationMs,
        loading.morphMs,
      ),
    [elapsedMs, loading.words.length, loading.durationMs, loading.morphMs],
  )

  useEffect(() => {
    const start = performance.now()
    let frameId = 0

    const tick = (now: number) => {
      const elapsed = now - start
      setElapsedMs(elapsed)

      if (elapsed < totalMs) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    const done = window.setTimeout(onComplete, totalMs)

    return () => {
      cancelAnimationFrame(frameId)
      window.clearTimeout(done)
    }
  }, [totalMs, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-background text-foreground"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: 'blur(8px)',
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <SiteAtmosphere />

      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-0 top-0 h-[50rem] w-[28rem] -translate-y-48 -rotate-45 rounded-full bg-[radial-gradient(68%_68%_at_55%_31%,hsla(220,80%,60%,.12)_0%,transparent_75%)]" />
      </div>

      <motion.div
        className="relative z-10 flex w-full min-w-0 max-w-4xl flex-col items-center px-4 sm:px-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <GooeyText
          texts={[...loading.words]}
          sync={sync}
          className="w-full max-w-[min(100%,42rem)]"
        />

        <motion.p
          className="mt-8 max-w-[18rem] text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground sm:mt-12 sm:max-w-md sm:text-[10px] sm:tracking-[0.22em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          {loading.tagline}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
