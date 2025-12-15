import BackHomeButton from '../components/BackHomeButton'

const Blogs = () => {
  const codeSnippets = [
    'const blogStatus = "compiling..."',
    'function launchSoon() {',
    '  return "devlog, breakdowns, snippets";',
    '}',
    '/* shipping shortly */',
  ]

  return (
    <main
      className="min-h-screen bg-[#030303] text-white px-6 pt-20 pb-20 flex items-center justify-center relative overflow-hidden"
      data-scroll-animate
    >
      {/* Code rain background */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="code-rain-grid">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="code-rain-char">
              {'</>'}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center space-y-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-gray-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Blog is compiling</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter uppercase">
            <span className="gradient-text">Dev Logs</span>
            <br />
            <span className="text-gray-500">Coming Soon</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed font-light">
            Long-form breakdowns of WordPress plugins, system design notes, and front-end deep dives.
            I&apos;m wiring up drafts, diagrams and code examples — they&apos;ll be live here shortly.
          </p>
        </div>

        <div className="mx-auto max-w-xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-left shadow-2xl shadow-black/40">
          <div className="flex items-center gap-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-amber-400/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
            <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-500">
              /blog/coming-soon.tsx
            </span>
          </div>

          <div className="space-y-1 font-mono text-xs md:text-sm leading-relaxed text-emerald-200/90 code-typing-block">
            {codeSnippets.map((line, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-[10px] text-emerald-500/60 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="whitespace-pre-wrap">{line}</span>
              </div>
            ))}
            <div className="flex gap-3">
              <span className="text-[10px] text-emerald-500/60 select-none">
                {'>'}
              </span>
              <span className="code-cursor text-emerald-300">npm run blog:ship</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-gray-500">
          Meanwhile — explore the projects, plugins and design systems already live.
        </p>

        <BackHomeButton className="text-xs md:text-sm" />
      </div>
    </main>
  )
}

export default Blogs


