import { Github } from 'lucide-react'
import Eyebrow from './Eyebrow'
import Pill from './Pill'

// Closing CTA band — rendered near the bottom of every page, just above the Footer.
const Contact = ({ num = '04' }) => {
    return (
        <section
            id="contact"
            className="px-4 md:px-6 py-20 md:py-32 max-w-[1400px] mx-auto"
        >
            <div
                className="card relative overflow-hidden px-6 py-16 md:px-16 md:py-24 text-center bg-[var(--color-surface)]"
                data-reveal-group
            >
                {/* Soft signal glow */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full blur-3xl bg-[var(--color-signal-tint)]"
                />

                <Eyebrow num={num} label="Ready to Collaborate?" className="relative justify-center" />

                <h2 className="relative mt-8 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-display leading-[0.95] uppercase text-primary">
                    Let's Build
                    <br />
                    Something <span className="text-muted">Iconic</span>
                </h2>

                <div className="relative mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Pill variant="invert" size="lg" to="/start-a-project" arrow>
                        hello@reuben.dev
                    </Pill>
                    <Pill variant="ghost" size="lg" href="https://github.com/Rubylenshy">
                        <Github className="w-4 h-4" aria-hidden="true" />
                        GitHub
                    </Pill>
                </div>

                <p className="relative mt-8 font-mono text-[11px] uppercase tracking-eyebrow text-muted">
                    Brief form · 48h response
                </p>
            </div>
        </section>
    );
};

export default Contact;
