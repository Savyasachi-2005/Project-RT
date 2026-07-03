import { siteContent } from '../content/siteContent'
import { ScrollReveal } from './ui/ScrollReveal'
import { SectionHeader } from './ui/SectionHeader'
import { Section } from './ui/Section'

export function Product() {
  const { product } = siteContent

  return (
    <Section id="product">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <SectionHeader eyebrow={product.eyebrow} title={product.title} body={product.body} />

        <div className="mt-16 grid grid-cols-1 gap-px bg-border/40 sm:grid-cols-2">
          {product.capabilities.map((cap, i) => (
            <ScrollReveal
              key={cap.number}
              delay={0.07 * i}
              className="cell-panel flex h-full gap-6 p-7 transition-all duration-500"
            >
              <span className="font-mono text-sm font-medium text-accent-bright">
                {cap.number}
              </span>
              <div>
                <h3 className="font-display text-[15px] font-semibold text-primary">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-secondary">
                  {cap.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
