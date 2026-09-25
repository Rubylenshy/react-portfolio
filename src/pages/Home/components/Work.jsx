import { Github, ArrowUpRight, FileText } from 'lucide-react'
import projects from '../../../shared/data/projects.json'
import Eyebrow from '../../../shared/components/Eyebrow'
import Pill from '../../../shared/components/Pill'

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

const getBadges = (stackIcons = []) =>
  stackIcons.map((item) => badgeLabels[item] || item).slice(0, 3)

const WorkCard = ({ project, featured }) => (
  <article
    className={`group card card-hover flex flex-col overflow-hidden p-2 ${featured ? 'md:col-span-2' : ''}`}
  >
    <div className={`media media-hover relative ${featured ? 'aspect-[16/9]' : 'aspect-[4/3]'} !rounded-[16px]`}>
      <img
        src={project.mockup}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {featured && <span className="tag tag-signal absolute top-4 left-4">Featured</span>}
    </div>

    <div className="flex flex-col flex-1 gap-3 px-4 pt-5 pb-4">
      <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted">
        {project.type} / {project.subtitle}
      </p>
      <h3 className="text-2xl md:text-3xl font-semibold tracking-display text-primary">
        {project.title}
      </h3>
      <p className="text-[15px] text-muted leading-relaxed">{project.description}</p>

      <div className="mt-auto pt-5 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
          {getBadges(project.stack_icons).map((badge) => (
            <li key={badge} className="tag">{badge}</li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {project.code_link && project.code_link !== '#' && (
            <a
              href={project.code_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Codebase — ${project.title}`}
              title="View Codebase"
              className="icon-btn magnetic-btn"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live — ${project.title}`}
              title="Live"
              className="icon-btn magnetic-btn"
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
          {!project.live_link && project.case_study && (
            <a
              href={project.case_study}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-ghost pill-sm magnetic-btn"
            >
              Read Case Study <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  </article>
)

const Work = () => {
  return (
    <section id="work" className="px-4 md:px-10 py-20 md:py-32 max-w-[1400px] mx-auto grid-frame">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Sticky intro column */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32" data-reveal-group>
            <Eyebrow num="02" label="Show, Don't Tell" />
            <h2 className="mt-6 text-5xl md:text-6xl font-semibold tracking-display leading-[0.95] uppercase text-primary">
              Selected
              <br />
              Work
            </h2>
            <div className="mt-10">
              <Pill variant="ghost" to="/projects" arrow>
                See all projects
              </Pill>
            </div>
          </div>
        </div>

        {/* Case-study cards */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal-group>
          {projects.slice(0, 3).map((project, idx) => (
            <WorkCard key={`${project.title}-${idx}`} project={project} featured={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Work
