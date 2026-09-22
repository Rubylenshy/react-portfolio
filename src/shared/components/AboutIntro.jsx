import Eyebrow from './Eyebrow'

const STATS = [
    { value: '4+', label: 'Years Experience' },
    { value: '8+', label: 'WordPress plugins delivered' },
    { value: '10+', label: 'Live Projects' },
    { value: '6+', label: 'Happy Clients' },
]

const AboutIntro = ({ num = '01' }) => {
    const scrollToContact = (e) => {
        e.preventDefault()
        const el = document.getElementById('contact')
        if (!el) return
        if (window.lenis) window.lenis.scrollTo(el, { offset: -80 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return (
        <section
            id="about"
            className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32"
        >
            <Eyebrow num={num} label="The Developer Story" className="mb-12 md:mb-16" data-reveal />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-5 media media-hover aspect-[4/5]" data-reveal>
                    <img
                        src="/images/headshot.jfif"
                        alt="Reuben Oluwafemi"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="lg:col-span-7 flex flex-col" data-reveal-group>
                    <span className="block font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-5">
                        Frontend & WordPress Engineer
                    </span>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-display leading-[0.95] mb-8">
                        <span className="text-primary">Engineering</span>
                        <br />
                        <span className="text-muted">for real users</span>
                    </h2>
                    <p className="text-[15px] md:text-base text-muted leading-[1.75] max-w-xl mb-10">
                        I'm a{' '}
                        <span className="highlight">frontend-focused engineer</span>{' '}
                        who thinks in{' '}
                        <span className="highlight">systems, not just screens</span>.
                        With a strong foundation in WordPress plugin development and{' '}
                        <span className="highlight">modern frontend engineering</span>,
                        I build interfaces that feel{' '}
                        <span className="highlight">intuitive</span> and codebases
                        that stay <span className="highlight">maintainable</span> long
                        after launch. I'm currently working on a number of exciting
                        projects, each one pushing{' '}
                        <span className="highlight">
                            performance, clarity, and user experience
                        </span>{' '}
                        a little further.
                    </p>
                    <div>
                        <a
                            href="#contact"
                            onClick={scrollToContact}
                            className="pill pill-invert magnetic-btn"
                        >
                            Let's Connect
                        </a>
                    </div>
                </div>
            </div>

            <dl className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3" data-reveal-group>
                {STATS.map((stat) => (
                    <div key={stat.label} className="card px-6 py-8 md:py-10 flex flex-col-reverse gap-2">
                        <dt className="text-xs md:text-sm text-muted">{stat.label}</dt>
                        <dd className="text-4xl md:text-5xl font-semibold tracking-display text-signal-text">
                            {stat.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    )
}

export default AboutIntro
