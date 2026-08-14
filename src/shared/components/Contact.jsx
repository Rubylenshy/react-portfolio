import { useState } from 'react'
import ContactModal from './ContactModal'

const Contact = () => {
    const [showRequestModal, setShowRequestModal] = useState(false)
    const socialLinks = [
        {
            icon: "fa-brands fa-x-twitter",
            href: "https://twitter.com/tomoloj_",
            label: "X / Twitter",
        },
        {
            icon: "fa-brands fa-instagram",
            href: "https://www.instagram.com/reuben.ig_",
            label: "Instagram",
        },
        {
            icon: "fa-brands fa-github",
            href: "https://github.com/Rubylenshy",
            label: "GitHub",
        },
        {
            icon: "fa-brands fa-linkedin-in",
            href: "https://www.linkedin.com/in/reuben-tomoloju/",
            label: "LinkedIn",
        },
        {
            icon: "fa-brands fa-wordpress",
            href: "https://profiles.wordpress.org/reztomoloju/",
            label: "WordPress.org",
        },
        {
            icon: "fa-solid fa-envelope",
            href: "mailto:reztomoloju@gmail.com",
            label: "Email",
        },
        // Frontend Mentor icon isn't available in Font Awesome; using code icon as a placeholder
        {
            icon: "fa-solid fa-code",
            href: "https://www.frontendmentor.io/profile/Rubylenshy",
            label: "Frontend Mentor",
        },
    ];

    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0);
        }
    };

    return (
        <section
            id="contact"
            className="px-6 pt-24 pb-12 md:py-40 md:py-20 bg-[var(--color-bg)] relative overflow-hidden max-w-[1400px] mx-auto grid-frame"
        >
            {/* Abstract Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted mb-8">
                    Ready to Collaborate?
                </p>

                <h2 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tighter uppercase text-primary mb-12">
                    Let's Build
                    <br />
                    Something <span className="text-muted">Iconic</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button
                        type="button"
                        onClick={() => setShowRequestModal(true)}
                        className="px-8 py-4 border border-[var(--color-border)] text-[var(--color-accent-inverse)] bg-[var(--color-accent)] rounded-sm font-mono text-xs uppercase font-bold tracking-widest hover:opacity-80 transition-opacity magnetic-btn"
                    >
                        <span className="">hello@reuben.dev</span>
                    </button>
                    <ContactModal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} />

                    <a
                        href="https://github.com/Rubylenshy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-sm text-primary rounded-sm font-mono text-xs uppercase font-bold tracking-widest hover:bg-[var(--color-surface-strong)] transition-colors magnetic-btn"
                    >
                        GitHub
                    </a>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 text-left border-t border-[var(--color-border)] pt-12">
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-muted mb-4">
                            Location
                        </h4>
                        <p className="text-sm font-medium text-primary">
                            Nigeria
                        </p>
                        <p className="text-sm text-secondary">
                            Remote Worldwide
                        </p>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-muted mb-4">
                            Focus
                        </h4>
                        <p className="text-sm font-medium text-primary">
                            Backend Development
                        </p>
                        <p className="text-sm text-secondary">Design Systems</p>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-muted mb-4">
                            Socials
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((item) => (
                                <a
                                    key={item.href + item.icon}
                                    href={item.href}
                                    target={
                                        item.href.startsWith("http")
                                            ? "_blank"
                                            : undefined
                                    }
                                    rel={
                                        item.href.startsWith("http")
                                            ? "noopener noreferrer"
                                            : undefined
                                    }
                                    aria-label={item.label}
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] backdrop-blur-sm text-secondary hover:text-primary hover:border-[var(--color-border-strong)] transition-colors"
                                >
                                    <i className={item.icon}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
