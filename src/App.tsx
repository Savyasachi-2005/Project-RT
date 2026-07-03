import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { HeroSection } from '@/components/ui/hero-section-1'
import { LoadingScreen } from './components/LoadingScreen'
import { About } from './components/About'
import { ProjectIndus } from './components/ProjectIndus'
import { Product } from './components/Product'
import { Founders } from './components/Founders'
import { Contact } from './components/Contact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          className="grain min-h-screen bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroSection />
          <About />
          <ProjectIndus />
          <Product />
          <Founders />
          <Contact />
        </motion.div>
      )}
      <Analytics />
    </>
  )
}
