import { siteContent } from '../content/siteContent'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Section } from './ui/Section'

export function Contact() {
  const { contact, company } = siteContent

  return (
    <Section id="contact">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <SectionHeader eyebrow={contact.eyebrow} title={contact.title} />

        <ScrollReveal delay={0.1}>
          <a
            href={`mailto:${contact.email}`}
            className="mt-10 inline-block font-mono text-base text-accent-bright underline decoration-accent-bright/40 underline-offset-[6px] transition-all duration-500 hover:text-primary hover:decoration-accent-bright"
          >
            {contact.email}
          </a>
        </ScrollReveal>

        <ScrollReveal delay={0.14}>
          <div className="mt-8 flex flex-wrap gap-8">
            {contact.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link font-mono text-[10px] uppercase tracking-eyebrow"
              >
                {link.label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <footer className="mt-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
            {company.copyright}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary">
            {company.footerTagline}
          </p>
        </div>
      </footer>
    </Section>
  )
}
