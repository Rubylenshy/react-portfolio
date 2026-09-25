import { Check, X } from 'lucide-react'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import SEOHead from '../../shared/components/SEOHead'
import Eyebrow from '../../shared/components/Eyebrow'
import Pill from '../../shared/components/Pill'
import { CAPABILITY_ICONS } from '../../shared/components/CapabilityIcons'
import capabilities from '../../shared/data/capabilities.json'
import services from './data/services.json'

const { hero, engagements, operations, scope, fit, steps } = services

const EngagementCard = ({ item }) => (
  <article
    className={`card relative flex flex-col p-7 md:p-8 overflow-hidden ${
      item.featured ? '!border-[var(--color-border-strong)]' : ''
    }`}
  >
    {item.featured && (
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-[var(--color-signal)]" />
    )}

    <div className="flex items-center justify-between mb-10">
      <span
        className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs ${
          item.featured
            ? 'bg-[var(--color-signal)] text-[var(--color-signal-ink)]'
            : 'border border-[var(--color-border-strong)] text-muted'
        }`}
      >
        {item.num}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">{item.duration}</span>
    </div>

    {item.featured && <span className="tag tag-signal self-start mb-4">Most requested</span>}
    <h3 className="text-3xl font-semibold tracking-display text-primary mb-4">{item.name}</h3>
    <p className="text-[15px] text-muted leading-relaxed mb-8">{item.description}</p>

    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-4">Includes</p>
    <ul className="space-y-3 mb-10">
      {item.includes.map((line) => (
        <li key={line} className="flex items-start gap-3 text-sm text-secondary">
          <Check className="w-4 h-4 mt-0.5 shrink-0 text-signal-text" aria-hidden="true" />
          {line}
        </li>
      ))}
    </ul>

    <p className="mt-auto pt-6 border-t border-[var(--color-border)] text-sm font-medium text-primary">
      {item.closing}
    </p>
  </article>
)

const Services = () => {
  return (
    <>
      <SEOHead
        title="Services"
        description="Custom WordPress plugins, production React interfaces, API integrations and performance optimization — engagement models, process and fit for working with Reuben Oluwafemi."
        canonical="https://www.usereuben.com/services"
      />
      <Navigation />

      {/* Hero */}
      <section
        id="main"
        data-hero
        className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 pt-36 md:pt-48 pb-20 md:pb-28"
      >
        <Eyebrow label="What I do" className="mb-6" />
        <h1 className="font-semibold tracking-display leading-[0.9] text-primary text-[clamp(64px,15vw,200px)]">
          {hero.title}
        </h1>
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-12">
          <p className="md:col-start-7 md:col-span-6 text-base md:text-lg text-muted leading-relaxed" data-reveal>
            {hero.positioning}
          </p>
        </div>
      </section>

      {/* 01 — Engagement models */}
      <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
        <div className="mb-12 md:mb-16" data-reveal-group>
          <Eyebrow num="01" label="Engagement Models" />
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
            How we work together
          </h2>
        </div>

        <div className="relative isolate">
          <div className="aurora" aria-hidden="true" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4" data-reveal-group>
            {engagements.map((item) => (
              <EngagementCard key={item.num} item={item} />
            ))}
          </div>
        </div>

        {/* Capability strip — the four Stack roles */}
        <div className="mt-4 card overflow-hidden" data-reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
          {capabilities.map((item) => {
            const Icon = CAPABILITY_ICONS[item.icon]
            return (
              <div key={item.id} className="p-6 md:p-7 bg-[var(--color-surface)]">
                <Icon className="w-9 h-9 text-primary mb-5" />
                <h3 className="text-lg font-semibold tracking-tight text-primary mb-2">{item.role}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{item.description}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {item.pills.map((pill) => (
                    <li key={pill} className="tag">{pill}</li>
                  ))}
                </ul>
              </div>
            )
          })}
          </div>
        </div>
      </section>

      {/* 02 — Operations */}
      <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5" data-reveal-group>
            <Eyebrow num="02" label="Operations" />
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
              Collaboration, not hand-offs
            </h2>
            <p className="mt-6 text-base text-muted leading-relaxed max-w-md">
              You work with the person writing the code — from the first call to the day it ships.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal-group>
            <div className="card p-7">
              <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-primary mb-6">
                <span className="signal-dot" aria-hidden="true" />
                What to expect
              </p>
              <ul className="space-y-4">
                {operations.expect.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] text-secondary leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-signal-text)] shrink-0" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7 opacity-75">
              <p className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]" aria-hidden="true" />
                What I avoid
              </p>
              <ul className="space-y-4">
                {operations.avoid.map((line) => (
                  <li key={line} className="flex gap-3 text-[15px] text-secondary leading-relaxed">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scope statement */}
        <div className="mt-24 md:mt-32 text-center max-w-4xl mx-auto" data-reveal-group>
          <p className="text-3xl md:text-5xl font-semibold tracking-display leading-[1.1] text-primary">
            {scope.statement[0]}
            <span className="text-signal-text">{scope.statement[1]}</span>
            {scope.statement[2]}
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-eyebrow text-muted">{scope.caveat}</p>
        </div>
      </section>

      {/* Fit */}
      <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
        <div className="mb-12 md:mb-16" data-reveal-group>
          <Eyebrow label="Fit" />
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
            Who I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal-group>
          <div className="card p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--color-signal)] text-[var(--color-signal-ink)]">
                <Check className="w-4 h-4" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-primary">Good Fit</h3>
            </div>
            <ul className="space-y-4">
              {fit.good.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-secondary leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-signal-text)] shrink-0" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-8 md:p-10 opacity-75">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--color-border-strong)] text-muted">
                <X className="w-4 h-4" aria-hidden="true" />
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-primary">Not a Fit</h3>
            </div>
            <ul className="space-y-4">
              {fit.notFit.map((line) => (
                <li key={line} className="flex gap-3 text-[15px] text-secondary leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] shrink-0" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 03 — Next steps */}
      <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-28 text-center">
        <div data-reveal-group>
          <Eyebrow num="03" label="Next Steps" className="justify-center" />
          <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
            Ready to start?
          </h2>
        </div>

        <ol className="mt-14 relative grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-5xl mx-auto" data-reveal-group>
          <span aria-hidden="true" className="hidden md:block absolute top-6 left-[16.66%] right-[16.66%] h-px bg-[var(--color-border-strong)]" />
          {steps.map((step) => (
            <li key={step.num} className="relative flex flex-col items-center">
              <span className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg)] border border-[var(--color-border-strong)] font-mono text-xs text-signal-text">
                {step.num}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-muted max-w-[16rem]">{step.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-3" data-reveal>
          <Pill variant="signal" size="lg" to="/start-a-project" arrow>
            Start a Project
          </Pill>
          <Pill variant="ghost" size="lg" to="/projects">
            See all projects
          </Pill>
        </div>
      </section>

      <Contact num="04" />
      <Footer />
    </>
  )
}

export default Services
