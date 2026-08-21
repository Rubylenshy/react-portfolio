const STATS = [
    { value: '4+', label: 'Years Experience' },
    { value: '8+', label: 'WordPress plugins delivered' },
    { value: '10+', label: 'Live Projects' },
    { value: '6+', label: 'Happy Clients' },
]

const AboutIntro = () => {
    const scrollToContact = (e) => {
        e.preventDefault()
        const el = document.getElementById('contact')
        if (el && window.lenis) window.lenis.scrollTo(el, { offset: -80 })
    }

    return (
        <section
            id="about"
            className="max-w-[1400px] mx-auto border-t border-[var(--color-border)] bg-[var(--color-bg)] grid-frame"
        >
            <div className="max-w-5xl mx-auto px-6 pt-16 md:pt-20">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-secondary text-center mb-10 md:mb-14">
                    The Developer Story
                </h2>
            </div>

            <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="magnetic-btn overflow-hidden rounded-sm border border-[var(--color-border)]">
                    <img
                        src="/images/headshot.jfif"
                        alt="Reuben Oluwafemi"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col justify-center h-full">
                    <span className="block text-xs font-mono uppercase tracking-[0.2em] text-secondary mb-4">
                        Frontend & WordPress Engineer
                    </span>
                    <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
                        <span className="text-primary">Engineering</span>
                        <br />
                        <span className="text-secondary">for real users</span>
                    </h3>
                    <p className="text-sm md:text-base text-secondary leading-7 md:leading-8 font-light mb-8">
                        I'm a{' '}
                        <span className="highlight-cyan">frontend-focused engineer</span>{' '}
                        who thinks in{' '}
                        <span className="highlight-purple">systems, not just screens</span>.
                        With a strong foundation in WordPress plugin development and{' '}
                        <span className="highlight-cyan">modern frontend engineering</span>,
                        I build interfaces that feel{' '}
                        <span className="highlight-green">intuitive</span> and codebases
                        that stay <span className="highlight-green">maintainable</span> long
                        after launch. I'm currently working on a number of exciting
                        projects, each one pushing{' '}
                        <span className="highlight-amber">
                            performance, clarity, and user experience
                        </span>{' '}
                        a little further.
                    </p>
                    <a
                        href="#contact"
                        onClick={scrollToContact}
                        className="self-start px-6 py-3.5 rounded-sm bg-[var(--color-accent)] text-[var(--color-accent-inverse)] font-mono text-xs uppercase font-bold tracking-widest hover:opacity-80 transition-opacity magnetic-btn"
                    >
                        Let's Connect
                    </a>
                </div>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 border-t border-[var(--color-border)]">
                {STATS.map((stat, i) => (
                    <div
                        key={stat.label}
                        className={`px-6 py-10 text-center ${
                            (i + 1) % 2 !== 0 ? 'border-r' : ''
                        } ${i < STATS.length - 2 ? 'border-b md:border-b-0' : ''} ${
                            i !== STATS.length - 1 ? 'md:border-r' : ''
                        } border-[var(--color-border)]`}
                    >
                        <span className="block text-3xl md:text-4xl font-semibold text-primary mb-2">
                            {stat.value}
                        </span>
                        <span className="text-xs md:text-sm text-secondary">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default AboutIntro

