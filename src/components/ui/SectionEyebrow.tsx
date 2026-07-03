type SectionEyebrowProps = {
  children: string
  className?: string
}

export function SectionEyebrow({ children, className = '' }: SectionEyebrowProps) {
  return (
    <p
      className={`font-mono text-[10px] font-medium uppercase tracking-eyebrow text-accent-bright sm:text-[11px] ${className}`}
    >
      {children}
    </p>
  )
}
