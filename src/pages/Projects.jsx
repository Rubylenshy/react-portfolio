import { ArrowLeft, Github, ArrowUpRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import projects from '../assets/data/projects.json'
import Footer from '../components/Footer'

const Projects = () => {
  return (
    <>
      <main className="min-h-screen bg-[#030303] text-white px-6 pt-16 pb-20 md:pt-20 md:pb-24">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-white border border-white/10 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back Home
            </Link>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">
              All Projects
            </div>
          </div>

          <div className="space-y-24">
            {projects.map((project, idx) => (
              <article
                key={`${project.title}-${idx}`}
                className="flex flex-col gap-6"
              >
                <div className="w-full overflow-hidden rounded-sm bg-[#111] border border-white/5">
                  <img
                    src={project.mockup}
                    alt={project.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-white/60 flex-wrap">
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
                    {project.code_link && (
                      <a
                        href={project.code_link}
                        className="inline-flex items-center gap-2 text-xs py-3 pr-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
                      >
                        View Codebase <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
                      >
                        View Live Demo <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                    {project.case_study && (
                      <a
                        href={project.case_study}
                        className="inline-flex items-center gap-2 text-xs py-3 px-2 font-mono uppercase tracking-widest text-white hover:text-gray-300 transition-colors magnetic-btn"
                      >
                        Read Case Study <FileText className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Projects

