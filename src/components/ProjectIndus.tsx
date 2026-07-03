import { siteContent } from '../content/siteContent'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionEyebrow } from './ui/SectionEyebrow'
import { Section } from './ui/Section'

export function ProjectIndus() {
  const { projectIndus } = siteContent

  return (
    <Section id="project-indus">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-muted/30 p-8 backdrop-blur-sm transition-all duration-700 hover:border-border/80 sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 grid-bg-dense opacity-30" />

          <div className="relative">
            <ScrollReveal>
              <div className="flex items-start gap-4">
                <div className="mt-1 h-12 w-px shrink-0 bg-accent-bright/60" aria-hidden />
                <div>
                  <SectionEyebrow>{projectIndus.eyebrow}</SectionEyebrow>
                  <h2 className="mt-4 font-display text-4xl font-bold headline-tight text-primary sm:text-5xl lg:text-6xl">
                    {projectIndus.title}
                  </h2>
                  <p className="mt-4 font-mono text-[11px] uppercase tracking-eyebrow text-secondary">
                    {projectIndus.tagline}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="mt-8 max-w-3xl text-base leading-[1.75] text-secondary sm:text-[17px]">
                {projectIndus.body}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <div className="mt-12 rounded-xl bg-background/60 p-4 transition-all duration-500 sm:p-6 lg:p-8">
                <ArchitectureDiagram />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
