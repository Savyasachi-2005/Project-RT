import { motion } from 'framer-motion'
import { siteContent } from '../content/siteContent'
import { StaggerGroup, StaggerItem } from './ui/ScrollReveal'
import { SectionEyebrow } from './ui/SectionEyebrow'

function NetworkDiagram() {
  const nodes = [
    { x: 80, y: 60 },
    { x: 200, y: 40 },
    { x: 320, y: 80 },
    { x: 140, y: 140 },
    { x: 260, y: 160 },
    { x: 380, y: 120 },
  ]

  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
  ]

  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 480 200"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.14 }}
      transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#3B82F6"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="2"
          fill="#2563EB"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.svg>
  )
}

export function Hero() {
  const { hero } = siteContent

  return (
    <section className="relative overflow-hidden hairline-b section-glow">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            'radial-gradient(circle at center, rgb(37 99 235 / 0.22) 0%, transparent 68%)',
        }}
      />
      <NetworkDiagram />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <StaggerGroup stagger={0.12}>
          <StaggerItem>
            <SectionEyebrow className="mb-8">{hero.eyebrow}</SectionEyebrow>
          </StaggerItem>

          <StaggerItem>
            <h1 className="max-w-[18ch] font-display text-[2rem] font-bold leading-[1.06] headline-tight text-primary sm:max-w-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {hero.headline}
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="mt-8 max-w-xl text-base leading-[1.75] text-secondary sm:text-lg">
              {hero.subheadline}
            </p>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <a
                href={hero.primaryCtaHref}
                className="btn-primary px-7 py-3.5 text-center font-mono text-[11px] font-medium uppercase tracking-eyebrow"
              >
                {hero.primaryCta}
              </a>
              <a
                href={hero.secondaryCtaHref}
                className="btn-outline px-7 py-3.5 text-center font-mono text-[11px] font-medium uppercase tracking-eyebrow"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  )
}
