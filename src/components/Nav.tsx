import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteContent } from '../content/siteContent'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { useScrolled } from '../hooks/useScrolled'

const sectionIds = ['about', 'project-indus', 'product', 'founders', 'contact']

export function Nav() {
  const [open, setOpen] = useState(false)
  const { company, nav } = siteContent
  const activeId = useScrollSpy(sectionIds)
  const scrolled = useScrolled()

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-base/90 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md'
          : 'bg-base/70 backdrop-blur-sm'
      } hairline-b`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <a
          href="#"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary transition-opacity hover:opacity-80 sm:text-xs"
        >
          {company.name}
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {nav.links.map((link) => {
            const id = link.href.replace('#', '')
            const isActive = activeId === id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link font-mono text-[10px] uppercase tracking-eyebrow ${isActive ? 'is-active' : ''}`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href="#contact"
            className="btn-primary px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-eyebrow"
          >
            {nav.cta}
          </a>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-px w-5 bg-primary transition-all duration-400 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-5 bg-primary transition-all duration-400 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-5 bg-primary transition-all duration-400 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden hairline-t bg-base md:hidden"
          >
            <ul className="flex flex-col gap-5 px-4 py-5">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-eyebrow text-secondary"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="btn-outline inline-block px-4 py-2.5 font-mono text-xs uppercase tracking-eyebrow"
                  onClick={() => setOpen(false)}
                >
                  {nav.cta}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
