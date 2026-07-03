import React from 'react'
import { ArrowRight, ChevronRight, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { cn } from '@/lib/utils'
import { siteContent } from '@/content/siteContent'
import { SiteAtmosphere } from '@/components/ui/site-atmosphere'

const { company, nav, hero, images } = siteContent

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring' as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
}

const industries = [
  'TeaOS',
  'BakeryOS',
  'ClinicOS',
  'PharmacyOS',
  'RetailOS',
  'RestaurantOS',
  'KiranaOS',
  'FieldOS',
]

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="relative overflow-hidden bg-background text-foreground">
        <SiteAtmosphere />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-background"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 isolate z-[1] hidden opacity-40 lg:block"
        >
          <div className="absolute left-0 top-0 h-[80rem] w-[35rem] -translate-y-[350px] -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(220,80%,60%,.1)_0,hsla(220,60%,40%,.03)_50%,transparent_80%)]" />
        </div>

        <section className="relative z-[2]">
          <div className="relative pt-24 md:pt-36">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <a
                    href="#project-indus"
                    className="group mx-auto flex w-fit items-center gap-4 rounded-full border border-border bg-muted p-1 pl-4 shadow-md shadow-black/20 transition-all duration-300"
                  >
                    <span className="text-sm text-foreground">{hero.eyebrow}</span>
                    <span className="block h-4 w-0.5 border-l border-border bg-muted" />
                    <div className="size-6 overflow-hidden rounded-full bg-background duration-500 group-hover:bg-muted">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </a>

                  <h1 className="mx-auto mt-8 max-w-4xl text-balance font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:mt-16 lg:text-7xl">
                    {hero.headline}
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                    {hero.subheadline}
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.5,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-3 md:flex-row"
                >
                  <div className="rounded-[14px] border border-border bg-foreground/5 p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-6 text-base">
                      <a href={hero.primaryCtaHref}>
                        <span className="text-nowrap">{hero.primaryCta}</span>
                      </a>
                    </Button>
                  </div>
                  <Button asChild size="lg" variant="ghost" className="h-11 rounded-xl px-6">
                    <a href={hero.secondaryCtaHref}>
                      <span className="text-nowrap">{hero.secondaryCta}</span>
                    </a>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.6,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative mt-10 px-2 sm:mt-14 md:mt-20">
                {/* Overlapping glow — ties frame into the same atmosphere */}
                <img
                  src={images.hero}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[88%] w-[94%] -translate-x-1/2 -translate-y-[42%] rounded-3xl object-cover object-center opacity-30 blur-2xl sm:opacity-35"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-transparent from-[20%] via-background/10 to-background/90"
                />
                <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border/80 bg-background/40 p-2 shadow-2xl shadow-black/50 ring-1 ring-border/60 backdrop-blur-sm sm:p-3">
                  <img
                    className="relative w-full rounded-xl object-cover object-center"
                    src={images.hero}
                    alt="ForRaise operating system dashboard on laptop"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        <section className="relative z-[2] pb-16 pt-12 md:pb-28 md:pt-16">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <a
                href="#product"
                className="block text-sm text-muted-foreground duration-150 hover:text-foreground"
              >
                <span>Explore what we build</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </a>
            </div>
            <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 transition-all duration-500 group-hover:opacity-50 sm:grid-cols-4 sm:gap-x-12 sm:gap-y-10">
              {industries.map((name) => (
                <div key={name} className="flex items-center justify-center">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

function HeroHeader() {
  const [menuState, setMenuState] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header>
      <nav
        data-state={menuState ? 'active' : undefined}
        className="group fixed z-50 w-full px-2"
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'max-w-4xl rounded-2xl border border-border bg-background/80 backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <a href="#" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </a>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="m-auto size-6 duration-200 group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {nav.links.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block text-muted-foreground duration-150 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-border bg-background p-6 shadow-2xl shadow-black/20 group-data-[state=active]:block md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {nav.links.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-foreground"
                        onClick={() => setMenuState(false)}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button
                  asChild
                  size="sm"
                  className={cn(!isScrolled && 'lg:inline-flex', isScrolled && 'lg:inline-flex')}
                >
                  <a href="#contact" onClick={() => setMenuState(false)}>
                    {nav.cta}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-mono text-xs font-semibold uppercase tracking-[0.12em] text-foreground sm:text-sm',
        className,
      )}
    >
      {company.name}
    </span>
  )
}
