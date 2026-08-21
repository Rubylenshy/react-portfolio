const SKILLS = [
    { label: 'WordPress Plugin Architecture', value: 92 },
    { label: 'Frontend Engineering (React/Vue/NextJS)', value: 90 },
    { label: 'API Integration & Automation', value: 85 },
    { label: 'Performance Optimization', value: 88 },
    { label: 'Design Systems', value: 80 },
]

const SkillsChart = () => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="max-w-5xl mx-auto px-6 md:px-14 py-16 md:py-20">
                <div className="flex items-center justify-between mb-10 md:mb-14">
                    <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
                        Self-Assessed
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                        My Skills
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <div className="grid grid-cols-5 gap-3 md:gap-4 items-end h-[280px] md:h-[340px] border-b border-[var(--color-border)] min-w-[420px] md:min-w-0">
                        {SKILLS.map((skill) => (
                            <div key={skill.label} className="flex flex-col items-center h-full justify-end">
                                <div
                                    className="w-full rounded-t-sm bg-[var(--color-surface-strong)] border border-b-0 border-[var(--color-border-strong)] flex items-start justify-center pt-3"
                                    style={{ height: `${skill.value}%` }}
                                >
                                    <span className="font-mono text-sm md:text-base font-bold text-primary">
                                        {skill.value}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-5 gap-3 md:gap-4 mt-4 min-w-[420px] md:min-w-0">
                        {SKILLS.map((skill) => (
                            <p
                                key={skill.label}
                                className="text-center text-[11px] md:text-xs font-mono uppercase tracking-widest text-secondary leading-relaxed"
                            >
                                {skill.label}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillsChart
