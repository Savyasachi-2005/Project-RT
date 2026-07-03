import { siteContent } from '../content/siteContent'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Section } from './ui/Section'

export function About() {
  const { about } = siteContent

  return (
    <Section id="about">
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <SectionHeader eyebrow={about.eyebrow} title={about.title} body={about.body} />

        <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 sm:grid-cols-2 lg:grid-cols-4">
          {about.beliefs.map((belief, i) => (
            <ScrollReveal
              key={belief.title}
              delay={0.07 * i}
              className="cell-panel p-7 transition-all duration-500"
            >
              <span className="font-mono text-[10px] font-medium text-accent-bright/80">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug text-primary">
                {belief.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-secondary">
                {belief.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
