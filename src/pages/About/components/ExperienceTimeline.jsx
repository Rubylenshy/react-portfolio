const ROLES = [
    {
        company: 'SeamlessTechnologies',
        note: 'formerly SeamlessHR',
        title: 'Frontend Developer',
        dates: 'April 2026 — Present',
        description: 'Delivering scalable HR solutions to African businesses.',
    },
    {
        company: 'Plugli LLC',
        title: 'CMS Plugin Developer',
        dates: 'August 2023 — April 2026',
        description:
            'Refactored custom plugins with new frameworks, leading to a 30% reduction in save/load times and a 20% increase in runtime processes. Created SEO-enhancing add-ons driving revenue growth.',
    },
    {
        company: 'SideHustle Nigeria',
        title: 'Frontend Intern',
        dates: 'August 2022 — October 2022',
        description:
            'Built React-based web apps, reducing checkout steps by 40% and streamlining team Git workflows to reduce merge conflicts by 50%.',
    },
    {
        company: 'NISER',
        title: 'IT Intern',
        dates: 'January 2022 — July 2022',
        description:
            'Appointed Head of Interns, leading a team of 8 to achieve a 20% reduction in project timelines.',
    },
]

const ExperienceTimeline = () => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="max-w-5xl mx-auto px-6 md:px-14 py-16 md:py-20">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted mb-2">
                    Career Path
                </p>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-primary mb-14 md:mb-20">
                    Experience
                </h2>

                <div className="relative pl-10 md:pl-0">
                    <div className="absolute top-0 bottom-0 left-[7px] md:left-1/2 md:-translate-x-1/2 w-px bg-[var(--color-accent-tint)] opacity-40" />

                    <div className="flex flex-col gap-14 md:gap-16">
                        {ROLES.map((role, i) => (
                            <div
                                key={role.company}
                                className={`relative md:flex md:items-start md:gap-16 ${
                                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                            >
                                <span className="absolute top-1 left-[-34px] md:left-1/2 md:-translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-accent-tint)] bg-[var(--color-bg)]" />

                                <div className={`md:w-1/2 ${i % 2 === 1 ? 'md:text-left' : 'md:text-right'}`}>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">
                                        {role.dates}
                                    </p>
                                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-1">
                                        {role.title} · {role.company}
                                    </h3>
                                    {role.note && (
                                        <p className="text-xs text-muted mb-3">{role.note}</p>
                                    )}
                                    <p className="text-sm text-secondary leading-relaxed">
                                        {role.description}
                                    </p>
                                </div>

                                <div className="hidden md:block md:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ExperienceTimeline
