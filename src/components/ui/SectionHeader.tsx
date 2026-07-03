import { ScrollReveal } from './ScrollReveal'
import { SectionEyebrow } from './SectionEyebrow'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  body?: string
  titleClassName?: string
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  titleClassName = '',
}: SectionHeaderProps) {
  return (
    <div className="max-w-3xl">
      <ScrollReveal>
        <div className="flex items-start gap-4">
          <div className="mt-1 h-12 w-px shrink-0 bg-accent-bright/60" aria-hidden />
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2
              className={`mt-4 font-display text-2xl font-semibold leading-[1.15] headline-tight text-primary sm:text-3xl lg:text-4xl ${titleClassName}`}
            >
              {title}
            </h2>
          </div>
        </div>
      </ScrollReveal>

      {body && (
        <ScrollReveal delay={0.08}>
          <p className="mt-8 pl-5 text-base leading-[1.75] text-secondary sm:text-[17px]">
            {body}
          </p>
        </ScrollReveal>
      )}
    </div>
  )
}
