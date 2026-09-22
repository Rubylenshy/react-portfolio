import Showreel from '../../../shared/components/Showreel'

const ROLES = ['Frontend Dev', 'Designer', 'CMS Plugin Dev']

const Hero = () => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (!element) return
    if (window.lenis) window.lenis.scrollTo(element, { offset: -80 })
    else element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="main"
      data-hero
      className="relative max-w-[1400px] mx-auto grid-frame px-4 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24"
    >
      <div className="hero-fade-in opacity-0 flex justify-center md:justify-start mb-8 md:mb-10">
        <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]">
          <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary">
            Available for Hire
          </span>
        </span>
      </div>

      {/* Stacked display lockup — solid over ghost */}
      <h1 className="text-center md:text-left font-semibold uppercase tracking-display leading-[0.92] text-[clamp(44px,13vw,196px)]">
        <span className="block overflow-hidden">
          <span className="hero-char text-primary">Reuben</span>
        </span>
        <span className="block overflow-hidden -mt-[0.04em]">
          <span className="hero-char display-ghost">Oluwafemi</span>
        </span>
      </h1>

      {/* Flanking micro-paragraphs */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <p className="hero-fade-in opacity-0 max-w-md text-center md:text-left mx-auto md:mx-0 text-[15px] md:text-base text-muted leading-relaxed">
          Bridging the gap between{' '}
          <span className="text-primary font-medium">engineering logic</span> and{' '}
          <span className="text-primary font-medium">creative design</span>. Specializing in
          high-performance WordPress Plugin architecture and top-value digital experiences.
        </p>

        <div className="hero-fade-in opacity-0 flex flex-col items-center md:items-end gap-5">
          <ul className="flex md:flex-col flex-wrap justify-center md:items-end gap-x-4 gap-y-1.5">
            {ROLES.map((role) => (
              <li key={role} className="font-mono text-[11px] md:text-xs uppercase tracking-eyebrow text-secondary">
                {role}
              </li>
            ))}
          </ul>
          <a
            href="#work"
            onClick={(e) => scrollToSection(e, 'work')}
            className="pill pill-invert pill-arrow magnetic-btn"
          >
            View Expertise
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Full-width rounded media panel */}
      <div className="hero-fade-in opacity-0 mt-14 md:mt-20">
        <Showreel src="/videos/usereuben_showcase.mp4" parallax />
      </div>
    </section>
  )
}

export default Hero
