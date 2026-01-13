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
      className="min-h-screen bg-bg-base text-text-primary px-6 pt-20 pb-20 flex items-center justify-center relative overflow-hidden"
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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass-bg border border-glass-border backdrop-blur-md text-xs font-mono uppercase tracking-[0.25em] text-text-secondary">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span>Blog is compiling</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter uppercase">
            <span className="gradient-text">Dev Logs</span>
            <br />
            <span className="text-text-tertiary">Coming Soon</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base text-text-secondary leading-relaxed font-light">
            Long-form breakdowns of WordPress plugins, system design notes, and front-end deep dives.
            I&apos;m wiring up drafts, diagrams and code examples — they&apos;ll be live here shortly.
          </p>
        </div>

        <div className="mx-auto max-w-xl rounded-xl border border-border-base bg-surface-elevated backdrop-blur-xl p-5 text-left shadow-2xl">
          <div className="flex items-center gap-1 mb-4">
            <span className="w-2 h-2 rounded-full bg-error/80" />
            <span className="w-2 h-2 rounded-full bg-warning/80" />
            <span className="w-2 h-2 rounded-full bg-success/80" />
            <span className="ml-3 text-[10px] font-mono uppercase tracking-[0.2em] text-text-tertiary">
              /blog/coming-soon.tsx
            </span>
          </div>

          <div className="space-y-1 font-mono text-xs md:text-sm leading-relaxed text-success-text code-typing-block">
            {codeSnippets.map((line, idx) => (
              <div key={idx} className="flex gap-3">
                <span className="text-[10px] text-success/60 select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className="whitespace-pre-wrap">{line}</span>
              </div>
            ))}
            <div className="flex gap-3">
              <span className="text-[10px] text-success/60 select-none">
                {'>'}
              </span>
              <span className="code-cursor text-success">npm run blog:ship</span>
            </div>
          </div>
        </div>

        <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.28em] text-text-tertiary">
          Meanwhile — explore the projects, plugins and design systems already live.
        </p>

        <BackHomeButton className="text-xs md:text-sm" />
      </div>
    </main>
  )
}
export default Blogs


