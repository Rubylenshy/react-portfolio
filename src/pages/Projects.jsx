import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import projects from '../assets/data/projects.json'
import Footer from '../components/Footer'
import BackHomeButton from '../components/BackHomeButton'

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [expandedImage, setExpandedImage] = useState(null)
  const typeFromUrl = searchParams.get('type') || 'all'
  const validTypes = ['frontend', 'design', 'plugin']
  const activeType = validTypes.includes(typeFromUrl) ? typeFromUrl : 'all'

  const handleFilterChange = (type) => {
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
              className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
              aria-label="Close"
            >
              <i className="fa-solid fa-times text-lg" />
            </button>
            <div className="overflow-auto rounded-sm border border-white/10 bg-[#111] shadow-2xl modal-zoom-in">
              <img
                src={expandedImage.src}
                alt={expandedImage.alt}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <main
        className="min-h-screen bg-[#030303] text-white px-6 pt-16 pb-20 md:pt-20 md:pb-24"
        data-scroll-animate
      >
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-10">
            <BackHomeButton />
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
              All Projects
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
              Filter by Project Type
            </p>
            <div className="inline-flex flex-wrap gap-2 rounded-full bg-white/5 border border-white/10 px-2 py-1.5 backdrop-blur-md">
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
                        ? 'bg-white text-black'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="mt-16 rounded-md border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gray-400 mb-2">
                No projects found for “{activeType}”
              </p>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                This category doesn&apos;t have any case studies yet. Check back soon — new builds ship regularly.
              </p>
            </div>
          ) : (
            <div className="space-y-24">
              {filteredProjects.map((project, idx) => (
                <article
                  key={`${project.title}-${idx}`}
                  className="flex flex-col gap-6"
                >
                <div className="w-full overflow-hidden rounded-sm bg-[#111] border border-white/5">
                  <button
                    type="button"
                    onClick={() => setExpandedImage({ src: project.mockup, alt: project.title })}
                    className="w-full h-auto block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#030303] rounded-sm"
                  >
                    <img
                      src={project.mockup}
                      alt={project.title}
                      className="w-full h-auto object-cover"
                    />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/60 flex-wrap">
                    {project.type && (
                      <span className="px-3 py-1 border border-white/10 rounded-full bg-white/5 text-[9px] tracking-[0.2em] text-gray-200">
                        {project.type}
                      </span>
                    )}
                    {project.stack_icons?.map((badge) => (
                      <span key={badge} className="px-2 py-1 border border-white/10 rounded bg-white/5">
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                      {project.subtitle}
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-white">
                      {project.title}
                    </h1>
                  </div>

                  <p className="text-secondary text-base leading-relaxed font-light">
                    {project.description}
                  </p>

                  {project.bullet_points && (
                    <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
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
                        className="inline-flex items-center gap-2 text-xs py-3 pr-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
                      >
                        View Codebase <i className="fa-brands fa-github text-[0.9rem]" />
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
                      >
                        View Live Demo <i className="fa-solid fa-arrow-up-right-from-square text-[0.85rem]" />
                      </a>
                    )}
                    {project.case_study && (
                      <a
                        href={project.case_study}
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
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

      <Footer />
    </>
  )
}

export default Projects

