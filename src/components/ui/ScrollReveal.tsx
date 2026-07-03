import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

type ScrollRevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px', amount: 0.2 }}
      transition={{ duration: 0.85, ease, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
}

export function StaggerGroup({ children, className, stagger = 0.1 }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.8, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
