import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, List as ListIcon, X } from 'lucide-react'
import projects from '../../shared/data/projects.json'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import Contact from '../../shared/components/Contact'
import SEOHead from '../../shared/components/SEOHead'
import Eyebrow from '../../shared/components/Eyebrow'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'design', label: 'Design' },
  { value: 'plugin', label: 'Plugin' },
]

const PAGE_SIZE = 6

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [expandedImage, setExpandedImage] = useState(null)
  const [view, setView] = useState('grid')
  const [activeIndex, setActiveIndex] = useState(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const detailRefs = useRef([])
  const typeFromUrl = searchParams.get('type') || 'all'
  const validTypes = ['frontend', 'design', 'plugin']
  const activeType = validTypes.includes(typeFromUrl) ? typeFromUrl : 'all'

  const handleFilterChange = (type) => {
    setActiveIndex(null)
    setVisible(PAGE_SIZE)
    if (type === 'all') {
      searchParams.delete('type')
      setSearchParams(searchParams, { replace: true })
    } else {
      const next = new URLSearchParams(searchParams.toString())
      next.set('type', type)
      setSearchParams(next, { replace: true })
    }
  }

  const filteredProjects =
    activeType === 'all' ? projects : projects.filter((project) => project.type === activeType)

  const handleViewChange = (nextView) => {
    setView(nextView)
    if (nextView === 'grid') setActiveIndex(null)
  }

  const handleCardClick = (idx) => {
    setActiveIndex(idx)
    setView('detail')
  }

  useEffect(() => {
    if (view !== 'detail' || activeIndex === null) return
    const node = detailRefs.current[activeIndex]
    if (!node) return
    if (window.lenis) window.lenis.scrollTo(node, { offset: -120 })
    else node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [view, activeIndex])

  useEffect(() => {
    if (!expandedImage) return
    const onEscape = (e) => e.key === 'Escape' && setExpandedImage(null)
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    window.lenis?.stop()
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
      window.lenis?.start()
    }
  }, [expandedImage])

  const viewButtonClass = (active) =>
    `w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
      active
        ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
        : 'text-muted hover:text-primary hover:bg-[var(--color-surface-raised)]'
    }`

  return (
    <>
      <SEOHead
        title="Projects"
        description="Explore Reuben Oluwafemi's frontend, design, and WordPress plugin projects — from URL shorteners and link managers to full-featured productivity tools."
        canonical="https://www.usereuben.com/projects"
      />
      {/* Image expand modal */}
      {expandedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded image"
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div className="absolute inset-0 bg-[var(--color-scrim)] backdrop-blur-md" aria-hidden="true" />
          <div
            className="relative z-10 flex flex-col items-end gap-4 max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="icon-btn bg-[var(--color-surface)]"
              aria-label="Close"
              autoFocus
            >
              <X className="w-4 h-4" />
            </button>
            <div className="media modal-zoom-in">
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <Navigation />

      <main
        id="main"
        className="text-primary px-4 md:px-10 pt-32 md:pt-44 pb-20 md:pb-28 max-w-[1400px] mx-auto grid-frame"
      >
        {/* Header */}
        <header className="mb-12 md:mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end" data-reveal-group>
          <div className="md:col-span-7">
            <Eyebrow num="01" label="All Projects" />
            <h1 className="mt-6 font-semibold tracking-display leading-[0.9] text-[clamp(56px,11vw,160px)]">
              Projects
            </h1>
          </div>
          <p className="md:col-span-5 text-base text-muted leading-relaxed md:text-right">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'build' : 'builds'} ·{' '}
            {activeType === 'all' ? 'every discipline' : activeType}
          </p>
        </header>

        {/* Filter bar */}
        <div
          className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-[28px] md:rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-2 md:pl-6"
          data-reveal
        >
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted px-3 pt-2 md:p-0">
            Filter by Project Type
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Project type">
              {FILTERS.map((filter) => {
                const isActive = activeType === filter.value
                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => handleFilterChange(filter.value)}
                    aria-pressed={isActive}
                    className={`pill pill-sm ${isActive ? 'pill-active' : 'pill-ghost !border-transparent'}`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>

            <div className="flex gap-1 rounded-full border border-[var(--color-border)] p-1">
              <button
                type="button"
                onClick={() => handleViewChange('grid')}
                aria-label="Grid view"
                aria-pressed={view === 'grid'}
                title="Grid view"
                className={viewButtonClass(view === 'grid')}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleViewChange('detail')}
                aria-label="List view"
                aria-pressed={view === 'detail'}
                title="List view"
                className={viewButtonClass(view === 'detail')}
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="card !border-dashed px-6 py-16 text-center">
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-secondary mb-3">
              No projects found for “{activeType}”
            </p>
            <p className="text-sm text-muted max-w-md mx-auto">
              This category doesn&apos;t have any case studies yet. Check back soon — new builds ship regularly.
            </p>
          </div>
        ) : view === 'grid' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-reveal-group key={activeType}>
              {filteredProjects.slice(0, visible).map((project, idx) => (
                <button
                  key={`${project.title}-${idx}`}
                  type="button"
                  onClick={() => handleCardClick(idx)}
                  className="group card card-hover p-2 flex flex-col text-left"
                >
                  <span className="media media-hover relative block aspect-[4/3] w-full !rounded-[16px]">
                    <img
                      src={project.mockup}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {idx === 0 && activeType === 'all' && (
                      <span className="tag tag-signal absolute top-4 left-4">Featured</span>
                    )}
                  </span>
                  <span className="flex flex-col flex-1 gap-2 px-4 pt-5 pb-4 w-full">
                    <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                      {project.subtitle}
                    </span>
                    <span className="text-2xl font-semibold tracking-display text-primary">{project.title}</span>
                    <span className="text-sm text-muted leading-relaxed line-clamp-2">{project.description}</span>
                    <span className="mt-auto pt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)]">
                      <span className="tag">{project.type}</span>
                      <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                        {project.stack_icons?.slice(0, 3).join(' · ')}
                      </span>
                    </span>
                  </span>
                </button>
              ))}
            </div>

            {visible < filteredProjects.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="pill pill-ghost magnetic-btn"
                >
                  Load more · {filteredProjects.length - visible} left
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleViewChange('grid')}
              className="pill pill-ghost pill-sm"
            >
              <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" /> Back to grid
            </button>
            {filteredProjects.map((project, idx) => (
              <article
                key={`${project.title}-${idx}`}
                ref={(el) => (detailRefs.current[idx] = el)}
                className="card p-2 md:p-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 scroll-mt-32"
              >
                <div className="lg:col-span-7">
                  <button
                    type="button"
                    onClick={() => setExpandedImage({ src: project.mockup, alt: project.title })}
                    aria-label={`Expand image — ${project.title}`}
                    className="media media-hover block w-full cursor-zoom-in !rounded-[16px]"
                  >
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                  </button>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-5 px-4 pb-5 lg:py-5 lg:pr-6">
                  <ul className="flex items-center gap-1.5 flex-wrap" aria-label="Tags">
                    {project.type && <li className="tag tag-signal">{project.type}</li>}
                    {project.stack_icons?.map((badge) => (
                      <li key={badge} className="tag">{badge}</li>
                    ))}
                  </ul>

                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-2">
                      {project.subtitle}
                    </p>
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-display text-primary">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-[15px] text-muted leading-relaxed">
                    {project.description}
                  </p>

                  {project.bullet_points && (
                    <ul className="space-y-2">
                      {project.bullet_points.map((point, i) => (
                        <li key={i} className="flex gap-3 text-sm text-secondary">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-signal-text)] shrink-0" aria-hidden="true" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-2 flex items-center gap-2 flex-wrap">
                    {project.code_link && project.code_link !== '#' && (
                      <a
                        href={project.code_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill pill-ghost pill-sm magnetic-btn"
                      >
                        View Codebase <i className="fa-brands fa-github text-[0.9rem]" aria-hidden="true" />
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pill pill-invert pill-sm magnetic-btn"
                      >
                        View Live Demo <i className="fa-solid fa-arrow-up-right-from-square text-[0.8rem]" aria-hidden="true" />
                      </a>
                    )}
                    {project.case_study && (
                      <a
                        href={project.case_study}
                        className="pill pill-ghost pill-sm magnetic-btn"
                      >
                        Read Case Study <i className="fa-regular fa-file-lines text-[0.9rem]" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <section className="max-w-[1400px] mx-auto px-4 md:px-10 py-20 md:py-28 text-center grid-frame">
        <p className="text-2xl md:text-4xl font-medium tracking-tight leading-snug text-primary max-w-4xl mx-auto">
          I'm naturally curious about how things work — a codebase, a game mechanic, a football formation. That curiosity is what drives the plugins and web apps above, each built to move a real number.
        </p>
      </section>

      <Contact num="02" />
      <Footer />
    </>
  )
}

export default Projects
