import { DoIcon, FluentIcon, ExpectIcon } from './SkillIcons'

const COLUMNS = [
    {
        icon: DoIcon,
        title: 'What I Can Do For You',
        description: "Faster, better products that your users love. Here's all the services I provide:",
        items: [
            'Custom WordPress Plugins',
            'Frontend Engineering (React/Vue/Next.js)',
            'API Integration & Automation',
            'Performance Optimization',
        ],
    },
    {
        icon: FluentIcon,
        title: "Tools I'm Fluent In",
        description: "Every engineer needs the right tools to do the job well. Thankfully, I'm multilingual.",
        items: ['Figma', 'Vercel', 'Notion', 'Git/GitHub'],
    },
    {
        icon: ExpectIcon,
        title: 'What You Can Expect',
        description: 'I build products that are more than functional. I make them shippable and maintainable.',
        items: [
            'Clean and scalable code',
            'Fast and accessible',
            'Well documented and maintainable',
        ],
    },
]

const SkillsChart = () => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="max-w-6xl mx-auto px-6 md:px-14 py-16 md:py-24">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted mb-10 md:mb-14">
                    My Skills
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                    {COLUMNS.map(({ icon: Icon, title, description, items }) => (
                        <div key={title}>
                            <Icon className="w-11 h-11 text-primary mb-6" />
                            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary mb-3">
                                {title}
                            </h3>
                            <p className="text-sm text-secondary leading-relaxed mb-6">
                                {description}
                            </p>
                            <ul className="space-y-2.5">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-baseline gap-2.5 text-sm font-semibold text-primary"
                                    >
                                        <span className="w-1 h-1 rounded-full bg-primary shrink-0 self-center" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsChart
