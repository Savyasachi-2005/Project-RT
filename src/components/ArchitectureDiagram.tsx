import { siteContent } from '../content/siteContent'

export function ArchitectureDiagram() {
  const { projectIndus } = siteContent
  const { modules, outputLabel } = projectIndus

  return (
    <div
      className="w-full"
      role="img"
      aria-label={`Architecture: ${modules.join(', ')} power ${outputLabel}`}
    >
      {/* Customer-facing output */}
      <div className="flex flex-col items-center">
        <div className="w-full rounded-lg border border-border/50 bg-base-panel/80 px-4 py-4 text-center sm:py-5">
          <span className="font-mono text-[10px] font-medium uppercase tracking-eyebrow text-primary sm:text-[11px]">
            {outputLabel}
          </span>
        </div>

        <div className="flex flex-col items-center" aria-hidden>
          <div className="h-5 w-px bg-border sm:h-6" />
          <div className="h-2 w-2 bg-accent-bright" />
          <div className="h-4 w-px bg-border sm:h-5" />
        </div>

        <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.22em] text-accent-bright/75 sm:text-[10px]">
          Project Indus — Internal Platform
        </p>
      </div>

      {/* Module grid: 2 cols mobile, 3 cols desktop — fits viewport, no scroll */}
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-x-[10%] top-0 hidden h-px bg-border lg:block"
          aria-hidden
        />

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border/40 lg:grid-cols-3">
          {modules.map((mod, i) => (
            <div
              key={mod}
              className="group relative bg-base-panel p-3.5 transition-colors duration-500 hover:bg-base-surface sm:p-5"
            >
              <div
                className="pointer-events-none absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block"
                aria-hidden
              >
                <div className="h-4 w-px -translate-y-full bg-border" />
                <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-[calc(100%+14px)] bg-accent-bright" />
              </div>

              <span className="font-mono text-[9px] font-medium text-accent-bright/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="mt-1.5 font-mono text-[9px] uppercase leading-[1.45] tracking-wide text-secondary transition-colors duration-500 group-hover:text-primary sm:mt-2 sm:text-[10px]">
                {mod}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-tertiary lg:hidden">
        Modules compose into your operating system
      </p>
    </div>
  )
}
