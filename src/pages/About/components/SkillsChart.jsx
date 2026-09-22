import { DoIcon, FluentIcon, ExpectIcon } from './SkillIcons'
import Eyebrow from '../../../shared/components/Eyebrow'

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

const SkillsChart = ({ num = '03' }) => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
            <Eyebrow num={num} label="My Skills" className="mb-12 md:mb-16" data-reveal />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-reveal-group>
                {COLUMNS.map(({ icon: Icon, title, description, items }) => (
                    <article key={title} className="card card-hover p-7 md:p-8 flex flex-col">
                        <Icon className="w-11 h-11 text-primary mb-8" />
                        <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-primary mb-3">
                            {title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed mb-8">
                            {description}
                        </p>
                        <ul className="mt-auto space-y-3 pt-6 border-t border-[var(--color-border)]">
                            {items.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-sm font-medium text-primary"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-signal-text)] shrink-0" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default SkillsChart
