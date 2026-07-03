import { siteContent } from '@/content/siteContent'

export function SiteAtmosphere() {
  const { images } = siteContent

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <img
        src={images.hero}
        alt=""
        className="absolute left-1/2 top-0 h-full w-[130%] min-h-full -translate-x-1/2 object-cover object-[center_20%] opacity-[0.16] blur-[2px] sm:opacity-[0.18]"
      />
      <img
        src={images.hero}
        alt=""
        className="absolute left-1/2 top-[30%] h-[70%] w-[110%] -translate-x-1/2 object-cover object-center opacity-[0.22] blur-[10px] sm:opacity-[0.26] sm:blur-[12px]"
      />
      <div className="absolute inset-0 bg-background/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,hsla(220,70%,50%,0.1)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_20%,hsla(220,80%,55%,0.06)_0%,transparent_50%)]" />
      <div className="grid-bg absolute inset-0 opacity-40" />
    </div>
  )
}
