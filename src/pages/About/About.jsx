import { ArrowDown } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import AboutIntro from '../../shared/components/AboutIntro'
import SEOHead from '../../shared/components/SEOHead'
import Showreel from '../../shared/components/Showreel'
import Eyebrow from '../../shared/components/Eyebrow'
import SkillsChart from './components/SkillsChart'
import ExperienceTimeline from './components/ExperienceTimeline'
import BirthdayConfetti from './components/BirthdayConfetti'
import WishesFab from './components/WishesFab'

const BADGE_TEXT = 'Frontend Dev · Designer · CMS Plugin Dev · '

// Slowly rotating circular badge with a down arrow in the middle
const RotatingBadge = () => {
    const scrollDown = (e) => {
        e.preventDefault()
        const el = document.getElementById('about')
        if (!el) return
        if (window.lenis) window.lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <a
            href="#about"
            onClick={scrollDown}
            aria-label="Scroll to the developer story"
            className="relative w-32 h-32 md:w-36 md:h-36 shrink-0 flex items-center justify-center rounded-full magnetic-btn"
        >
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-slow" aria-hidden="true">
                <defs>
                    <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text
                    className="fill-[var(--color-text-secondary)] font-mono uppercase"
                    style={{ fontSize: '7.4px', letterSpacing: '0.18em' }}
                >
                    <textPath href="#badge-circle">{BADGE_TEXT}</textPath>
                </text>
            </svg>
            <span className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-signal)] text-[var(--color-signal-ink)]">
                <ArrowDown className="w-5 h-5" aria-hidden="true" />
            </span>
        </a>
    )
}

const About = () => {
    return (
        <>
            <BirthdayConfetti />
            <WishesFab />
            <SEOHead
                title="About"
                description="Reuben Oluwafemi is a Design & Frontend Engineer specializing in WordPress plugin architecture and modern frontend engineering. Learn about his background, skills, and experience."
                canonical="https://www.usereuben.com/about"
            />
            <Navigation />

            {/* Hero */}
            <section
                id="main"
                data-hero
                className="relative max-w-[1400px] mx-auto grid-frame px-4 md:px-10 pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden"
            >
                {/* Giant ghost wordmark with a lime counterform dot */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-24 md:top-28 flex justify-center">
                    <span className="relative ghost-text uppercase text-[26vw] xl:text-[340px]">
                        About
                        <span className="absolute right-[3%] top-[18%] w-[0.09em] h-[0.09em] rounded-full bg-[var(--color-signal)] opacity-80" />
                    </span>
                </div>

                <div className="relative">
                    <div className="flex flex-wrap items-center justify-between gap-6 mb-10 md:mb-14" data-reveal-group>
                        <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]">
                            <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
                            <span className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary">
                                Available for Hire
                            </span>
                        </span>
                        <RotatingBadge />
                    </div>

                    <h1
                        className="max-w-5xl text-5xl md:text-7xl lg:text-8xl font-semibold tracking-display leading-[0.95] text-primary"
                        data-reveal
                    >
                        A bit about <span className="text-signal-text">Reuben</span> Oluwafemi
                    </h1>

                    <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12" data-reveal>
                        <p className="md:col-start-7 md:col-span-6 text-base md:text-xl text-muted leading-relaxed">
                            Lately I'm most curious about using AI to turn ten keystrokes into one — automating the small friction out of everyday work.
                        </p>
                    </div>
                </div>
            </section>

            <AboutIntro num="01" />

            <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-16 md:py-24">
                <Eyebrow num="02" label="Showreel" className="mb-10" data-reveal />
                <div data-reveal>
                    <Showreel src="/videos/usereuben_showcase.mp4" />
                </div>
            </section>

            <SkillsChart num="03" />
            <ExperienceTimeline num="04" />
            <Contact num="05" />
            <Footer />
        </>
    )
}

export default About
