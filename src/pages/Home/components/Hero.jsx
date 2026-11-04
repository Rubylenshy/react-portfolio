import { useEffect, useLayoutEffect, useRef } from 'react'
import Showreel from '../../../shared/components/Showreel'
import { initHeroMotion } from '../lib/heroMotion'
import LiveClock from './LiveClock'

const FIRST_NAME = 'Reuben'
const LAST_NAME = 'Oluwafemi'
const ROLES = ['Frontend Dev', 'Designer', 'CMS Plugin Dev']

// Runs before paint on the client so letters are hidden before the intro; no-op during prerender
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const Hero = () => {
  const rootRef = useRef(null)

  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('is-live')
      return () => root.classList.remove('is-live')
    }
    // The loader plays on the very first load and signals when the hero should start
    return initHeroMotion(root, { waitForLoader: !window.__loaderPlayed })
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (!element) return
    if (window.lenis) window.lenis.scrollTo(element, { offset: -80 })
    else element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      ref={rootRef}
      id="main"
      data-hero
      className="hero relative max-w-[1400px] mx-auto grid-frame px-4 md:px-10 pt-28 md:pt-40 pb-16 md:pb-24"
    >
      {/* Availability lives in the desktop nav; the badge stays for mobile */}
      <div className="hero-fade-in opacity-0 flex items-center justify-center md:justify-end gap-4 mb-8 md:mb-10">
        <span className="md:hidden inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]">
          <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary">
            Available for Hire
          </span>
        </span>
        <LiveClock className="hidden md:inline-flex" />
      </div>

      {/* Stacked display lockup — solid over ghost, split per letter for the intro */}
      <h1 className="hero-name text-center md:text-left font-semibold uppercase tracking-display leading-[0.92] text-[clamp(44px,13vw,196px)]">
        <span className="hero-line block">
          <span className="hero-word text-primary">
            {[...FIRST_NAME].map((char, i) => (
              <span key={i} className="hero-letter">
                <span className="hero-glyph" data-char={char}>{char}</span>
              </span>
            ))}
          </span>
        </span>{' '}
        <span className="hero-line block">
          <span className="hero-word hero-ghost-word display-ghost" data-text={LAST_NAME}>
            {[...LAST_NAME].map((char, i) => (
              <span key={i} className="hero-ghost-letter">
                <span className="hero-ghost-glyph">{char}</span>
              </span>
            ))}
          </span>
        </span>
        {/* Not shown, but kept in the H1 so the page's main heading still names the service */}
        <span className="sr-only">, WordPress Plugin &amp; Frontend Developer</span>
      </h1>

      {/* Flanking micro-paragraphs */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        <p className="hero-fade-in opacity-0 max-w-md text-center md:text-left mx-auto md:mx-0 text-[15px] md:text-base text-muted leading-relaxed">
          Bridging the gap between{' '}
          <span className="hero-mark text-primary font-medium">engineering logic</span> and{' '}
          <span className="hero-mark text-primary font-medium">creative design</span>. Specializing in
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
        <Showreel src="/videos/usereuben_showcase-v2.mp4" poster="/videos/usereuben_showcase-v2-poster.webp" parallax />
      </div>
    </section>
  )
}

export default Hero
