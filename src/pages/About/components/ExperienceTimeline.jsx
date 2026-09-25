import Eyebrow from '../../../shared/components/Eyebrow'

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

const ExperienceTimeline = ({ num = '04' }) => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-32" data-reveal-group>
                        <Eyebrow num={num} label="Career Path" />
                        <h2 className="mt-6 text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
                            Experience
                        </h2>
                    </div>
                </div>

                <ol className="lg:col-span-8 relative flex flex-col gap-4" data-reveal-group>
                    {ROLES.map((role, i) => (
                        <li key={role.company} className="card card-hover p-7 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-10">
                            <div className="flex md:flex-col items-center md:items-start gap-3">
                                <span
                                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                                        i === 0 ? 'signal-dot signal-dot-pulse' : 'border border-[var(--color-signal-text)]'
                                    }`}
                                    aria-hidden="true"
                                />
                                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-signal-text">
                                    {role.dates}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-semibold text-primary mb-1">
                                    {role.title} · {role.company}
                                </h3>
                                {role.note && (
                                    <p className="text-xs text-muted mb-3">{role.note}</p>
                                )}
                                <p className="text-[15px] text-muted leading-relaxed">
                                    {role.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default ExperienceTimeline
