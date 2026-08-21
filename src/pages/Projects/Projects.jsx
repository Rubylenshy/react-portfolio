import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, List as ListIcon } from 'lucide-react'
import projects from '../../shared/data/projects.json'
import Navigation from '../../shared/components/Navigation'
import Footer from '../../shared/components/Footer'
import SEOHead from '../../shared/components/SEOHead'

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [expandedImage, setExpandedImage] = useState(null)
  const [view, setView] = useState('grid')
  const [activeIndex, setActiveIndex] = useState(null)
  const detailRefs = useRef([])
  const typeFromUrl = searchParams.get('type') || 'all'
  const validTypes = ['frontend', 'design', 'plugin']
  const activeType = validTypes.includes(typeFromUrl) ? typeFromUrl : 'all'

  const handleFilterChange = (type) => {
    setActiveIndex(null)
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
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [view, activeIndex])

  useEffect(() => {
    if (!expandedImage) return
    const onEscape = (e) => e.key === 'Escape' && setExpandedImage(null)
    document.addEventListener('keydown', onEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onEscape)
      document.body.style.overflow = ''
    }
  }, [expandedImage])

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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            aria-hidden="true"
          />
          <div
            className="relative z-10 flex flex-col items-end gap-4 max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center bg-[var(--color-surface)] hover:bg-[var(--color-surface-strong)] border border-[var(--color-border)] text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-border-strong)]"
              aria-label="Close"
            >
              <i className="fa-solid fa-times text-lg" />
            </button>
            <div className="overflow-auto rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-2xl modal-zoom-in">
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
        className="min-h-screen bg-[var(--color-bg)] text-primary px-6 pt-28 pb-20 md:pt-32 md:pb-24 max-w-[1400px] mx-auto grid-frame"
        data-scroll-animate
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-end mb-10">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-muted">
              All Projects
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted">
              Filter by Project Type
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex flex-wrap gap-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-2 py-1.5 backdrop-blur-md">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'frontend', label: 'Frontend' },
                  { value: 'design', label: 'Design' },
                  { value: 'plugin', label: 'Plugin' },
                ].map((filter) => {
                  const isActive = activeType === filter.value
                  return (
                    <button
                      key={filter.value}
                      type="button"
                      onClick={() => handleFilterChange(filter.value)}
                      className={`px-2 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                          : 'text-secondary hover:bg-[var(--color-surface-strong)]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  )
                })}
              </div>

              <div className="inline-flex gap-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-1.5 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => handleViewChange('grid')}
                  aria-label="Grid view"
                  aria-pressed={view === 'grid'}
                  title="Grid view"
                  className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                    view === 'grid'
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                      : 'text-secondary hover:bg-[var(--color-surface-strong)]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleViewChange('detail')}
                  aria-label="List view"
                  aria-pressed={view === 'detail'}
                  title="List view"
                  className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                    view === 'detail'
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-inverse)]'
                      : 'text-secondary hover:bg-[var(--color-surface-strong)]'
                  }`}
                >
                  <ListIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="mt-16 rounded-md border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-secondary mb-2">
                No projects found for “{activeType}”
              </p>
              <p className="text-sm text-secondary max-w-md mx-auto">
                This category doesn&apos;t have any case studies yet. Check back soon — new builds ship regularly.
              </p>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, idx) => (
                <button
                  key={`${project.title}-${idx}`}
                  type="button"
                  onClick={() => handleCardClick(idx)}
                  className="group relative aspect-[4/3] md:aspect-[16/11] overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]"
                >
                  <img
                    src={project.mockup}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover:from-black/90 transition-colors duration-500" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-7">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tighter text-white">
                      {project.title}
                    </h3>
                    {project.type && (
                      <span className="mt-3 inline-block w-fit px-3 py-1 border border-white/30 rounded-full bg-white/10 backdrop-blur-sm text-[9px] font-mono uppercase tracking-[0.2em] text-white/90">
                        {project.type}
                      </span>
                    )}
                    <p className="mt-4 text-sm text-white/80 font-light leading-relaxed max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 overflow-hidden transition-all duration-500">
                      {project.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-24">
              <button
                type="button"
                onClick={() => handleViewChange('grid')}
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-secondary hover:text-primary transition-colors"
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Back to grid
              </button>
              {filteredProjects.map((project, idx) => (
                <article
                  key={`${project.title}-${idx}`}
                  ref={(el) => (detailRefs.current[idx] = el)}
                  className="flex flex-col gap-6 scroll-mt-28"
                >
                <div className="w-full overflow-hidden rounded-sm bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
                  <button
                    type="button"
                    onClick={() => setExpandedImage({ src: project.mockup, alt: project.title })}
                    className="w-full h-auto block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-[var(--color-border-strong)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg)] rounded-sm"
                  >
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-secondary flex-wrap">
                    {project.type && (
                      <span className="px-3 py-1 border border-[var(--color-border)] rounded-full bg-[var(--color-surface)] text-[9px] tracking-[0.2em] text-secondary">
                        {project.type}
                      </span>
                    )}
                    {project.stack_icons?.map((badge) => (
                      <span key={badge} className="px-2 py-1 border border-[var(--color-border)] rounded bg-[var(--color-surface)]">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted mb-2">
                      {project.subtitle}
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-primary">
                      {project.title}
                    </h1>
                  </div>

                  <p className="text-secondary text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {project.bullet_points && (
                    <ul className="list-disc list-inside text-sm text-secondary space-y-1">
                      {project.bullet_points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center gap-5 mt-5 flex-wrap">
                    {project.code_link && project.code_link !== '#' && (
                      <a
                        href={project.code_link}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs py-3 pr-2 font-mono uppercase tracking-widest text-primary hover:text-secondary transition-colors magnetic-btn"
                      >
                        View Codebase <i className="fa-brands fa-github text-[0.9rem]" />
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-primary hover:text-secondary transition-colors magnetic-btn"
                      >
                        View Live Demo <i className="fa-solid fa-arrow-up-right-from-square text-[0.85rem]" />
                      </a>
                    )}
                    {project.case_study && (
                      <a
                        href={project.case_study}
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-primary hover:text-secondary transition-colors magnetic-btn"
                      >
                        Read Case Study <i className="fa-regular fa-file-lines text-[0.9rem]" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
            </div>
          )}
        </div>
      </main>

      <section className="max-w-[1400px] mx-auto px-6 py-16 border-t border-[var(--color-border)] text-center grid-frame">
        <p className="w-full text-lg md:text-2xl text-secondary max-w-2xl mx-auto">
          I'm naturally curious about how things work — a codebase, a game mechanic, a football formation. That curiosity is what drives the plugins and web apps above, each built to move a real number.
        </p>
      </section>

      <Footer />
    </>
  )
}

export default Projects

