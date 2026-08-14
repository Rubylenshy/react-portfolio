import { Link } from 'react-router-dom'

const ITEMS = [
    {
        title: 'Shortly',
        phrase: 'Fast & Functional',
        img: 'https://lh3.googleusercontent.com/u/0/d/1vci4v7JydDkBiXX-_mAT89ww69GyskLa',
        rotate: '-6deg',
        textSide: 'left',
        emphasis: 'primary',
    },
    {
        title: 'Linksy',
        phrase: 'AI-Powered Workflows',
        img: 'https://lh3.googleusercontent.com/u/0/d/1QfUd_nxxxWB8FR_GJQMn497xnYAP3oEy',
        rotate: '4deg',
        textSide: 'right',
        emphasis: 'secondary',
    },
    {
        title: 'Nestlify',
        phrase: 'Clean SaaS Design',
        img: 'https://lh3.googleusercontent.com/u/0/d/1n0FOR1dS-BmOGvVat8vlg6oaBRdfaRmo',
        rotate: '-3deg',
        textSide: 'left',
        emphasis: 'secondary',
    },
    {
        title: 'Datey AI',
        phrase: 'Smart Automation',
        img: 'https://lh3.googleusercontent.com/u/0/d/1HsjrD8C48cpDOnYAPuwy32y9bdsJKlxT',
        rotate: '5deg',
        textSide: 'right',
        emphasis: 'primary',
    },
]

const ProjectCollage = () => {
    return (
        <section className="max-w-[1400px] mx-auto grid-frame bg-[var(--color-bg)] border-t border-[var(--color-border)]">
        <div className="max-w-5xl mx-auto px-6 md:px-14 py-16">
            <div className="relative">
                <span className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-[var(--color-border-strong)]" />
                <span className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[var(--color-border-strong)]" />
                <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[var(--color-border-strong)]" />
                <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-[var(--color-border-strong)]" />

                <div className="border border-[var(--color-border)] rounded-sm bg-[var(--color-bg)] px-6 py-14 md:py-20">
                    <div className="flex flex-col gap-8 md:gap-10 max-w-2xl mx-auto">
                        {ITEMS.map((item) => (
                            <Link
                                key={item.title}
                                to="/projects"
                                className={`flex items-center gap-5 ${
                                    item.textSide === 'right' ? 'flex-row-reverse' : ''
                                }`}
                            >
                                <span
                                    className="shrink-0 w-16 sm:w-20 aspect-[3/4] rounded-lg overflow-hidden border border-[var(--color-border-strong)] shadow-lg"
                                    style={{ transform: `rotate(${item.rotate})` }}
                                >
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </span>
                                <span
                                    className={`text-xl md:text-3xl font-semibold tracking-tight ${
                                        item.emphasis === 'primary' ? 'text-primary' : 'text-secondary'
                                    }`}
                                >
                                    {item.phrase}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </section>
    )
}

export default ProjectCollage
