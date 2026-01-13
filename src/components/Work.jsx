import { Github, ArrowUpRight, FileText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import projects from '../assets/data/projects.json'

const badgeLabels = {
  react: 'React',
  next: 'Next.js',
  tailwind: 'Tailwind',
  supabase: 'Supabase',
  postgresql: 'PostgreSQL',
  typescript: 'TypeScript',
  vite: 'Vite',
  wordpress: 'WordPress',
  php: 'PHP',
  woocommerce: 'WooCommerce',
  stripe: 'Stripe API',
}

const Work = () => {
  const navigate = useNavigate()

  const getBadges = (stackIcons = []) =>
    stackIcons.map((item) => badgeLabels[item] || item).slice(0, 4)

  const handleSeeAll = (e) => {
    e.preventDefault()
    if (window.lenis) {
      window.lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t) => 1 - Math.pow(1 - t, 3)
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    navigate('/projects')
  }

  return (
    <section id="work" className="px-6 py-24 md:py-32 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-divider pb-6">
        <h2 className="text-4xl md:text-7xl font-semibold tracking-tighter uppercase text-text-primary">
          Selected<br />
          Work
        </h2>
        <div className="mt-4 md:mt-0 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-text-primary animate-pulse"></span>
          <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">
            Show, Don't Tell
          </span>
        </div>
      </div>

      <div className="space-y-32">
        {projects.slice(0, 3).map((project, idx) => {
          const isRight = project.direction === 'right'
          const badges = getBadges(project.stack_icons)

          return (
            <div
              key={`${project.title}-${idx}`}
              className="group project-card grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
            >
              <div
                className={`lg:col-span-7 overflow-hidden rounded-sm bg-surface-elevated aspect-[16/10] relative cursor-pointer border border-border-base ${
                  isRight ? 'order-1 lg:order-2' : ''
                }`}
              >
                <div className="absolute inset-0 bg-bg-overlay z-10 project-overlay transition-opacity duration-500"></div>
                <img
                  src={project.mockup}
                  alt={project.title}
                  className="w-full h-full object-contain opacity-80 group-hover:opacity-100"
                />
              </div>

              <div
                className={`lg:col-span-5 flex flex-col gap-6 ${isRight ? 'order-2 lg:order-1' : ''}`}
              >
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-text-tertiary flex-wrap">
                  {badges.map((badge) => (
                    <span key={badge} className="px-2 py-1 border border-border-base rounded bg-surface-elevated">
                      {badge}
                    </span>
                  ))}
                </div>

                <h3 className="text-3xl md:text-5xl font-semibold tracking-tighter text-text-primary">
                  {project.title}
                </h3>

                <p className="text-text-secondary text-base leading-relaxed font-light">
                  {project.description}
                </p>

                <div className="flex items-center gap-5 mt-2 flex-wrap">
                  {project.code_link && project.code_link !== '#' && (
                    <a
                      href={project.code_link}
                      target="_blank"
                      className="inline-flex items-center gap-2 p-1 text-xs border border-border-base font-mono uppercase tracking-widest text-text-primary hover:text-text-secondary transition-colors magnetic-btn"
                    >
                      View Codebase <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_link && (
                    <a
                      href={project.live_link}
                      target="_blank"
                      title="Live"
                      className="inline-flex items-center gap-2 p-0.5 text-xs border border-border-base font-mono uppercase tracking-widest text-text-primary hover:text-text-inverse hover:bg-text-primary transition-colors magnetic-btn"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {!project.live_link && project.case_study && (
                    <a
                      href={project.case_study}
                      target="_blank"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-primary hover:text-text-secondary transition-colors magnetic-btn"
                    >
                      Read Case Study <FileText className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          onClick={handleSeeAll}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-primary border border-border-base px-6 py-3 rounded-sm hover:bg-interactive-hover transition-colors magnetic-btn"
        >
          See all projects
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

export default Work

