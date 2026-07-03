import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GooeyText } from '@/components/ui/gooey-text-morphing'
import { SiteAtmosphere } from '@/components/ui/site-atmosphere'
import { siteContent } from '@/content/siteContent'

type LoadingScreenProps = {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { loading } = siteContent
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = loading.durationMs

    let frameId = 0
    const tick = (now: number) => {
      const elapsed = now - start
      setProgress(Math.min((elapsed / duration) * 100, 100))
      if (elapsed < duration) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [loading.durationMs])

  const handleSequenceComplete = useCallback(() => {
    window.setTimeout(onComplete, loading.holdAfterMs)
  }, [onComplete, loading.holdAfterMs])

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
        className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <GooeyText
          texts={[...loading.words]}
          morphTime={loading.morphTime}
          cooldownTime={loading.cooldownTime}
          loop={false}
          onSequenceComplete={handleSequenceComplete}
          className="max-w-3xl"
        />

        <motion.p
          className="mt-12 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          {loading.tagline}
        </motion.p>

        <div className="mt-10 h-px w-32 overflow-hidden rounded-full bg-border/50">
          <div
            className="h-full bg-accent-bright transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
