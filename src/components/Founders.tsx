import { siteContent } from '../content/siteContent'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Section } from './ui/Section'

export function Founders() {
  const { founders } = siteContent

  return (
    <Section id="founders">
      <div className="section-glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <SectionHeader eyebrow={founders.eyebrow} title={founders.title} />

        <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 md:grid-cols-3">
          {founders.members.map((member, i) => (
            <ScrollReveal
              key={member.name + i}
              delay={0.09 * i}
              className="cell-panel flex h-full flex-col p-7 transition-all duration-500"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center border border-accent-bright/70 font-mono text-base font-semibold text-accent-bright transition-colors duration-500 hover:border-accent-bright">
                {member.initial}
              </div>
              <h3 className="font-display text-lg font-semibold text-primary">{member.name}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-secondary">{member.role}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
