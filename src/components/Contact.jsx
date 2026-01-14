const Contact = () => {
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
            className="px-6 pt-24 pb-12 md:py-40 md:py-20 bg-[#030303] relative overflow-hidden"
        >
            {/* Abstract Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-500 mb-8">
                    Ready to Collaborate?
                </p>

                <h2 className="text-4xl md:text-7xl lg:text-8xl font-semibold tracking-tighter uppercase text-white mb-12">
                    Let's Build
                    <br />
                    Something <span className="text-gray-600">Iconic</span>
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <a
                        href="mailto:reztomoloju@gmail.com"
                        className="px-8 py-4 border border-white/20 text-gray-800 bg-white rounded-sm font-mono text-xs uppercase font-bold tracking-widest hover:bg-white/80 transition-colors magnetic-btn"
                    >
                        <span className="">hello@reuben.dev</span>
                    </a>

                    <a
                        href="https://github.com/Rubylenshy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 border border-white/20 text-white rounded-sm font-mono text-xs uppercase font-bold tracking-widest hover:bg-white/5 transition-colors magnetic-btn"
                    >
                        GitHub
                    </a>
                </div>

                <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8 text-left border-t border-white/10 pt-12">
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-4">
                            Location
                        </h4>
                        <p className="text-sm font-medium text-white">
                            Ibadan, Nigeria
                        </p>
                        <p className="text-sm text-gray-400">
                            Remote Worldwide
                        </p>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-4">
                            Focus
                        </h4>
                        <p className="text-sm font-medium text-white">
                            Backend Development
                        </p>
                        <p className="text-sm text-gray-400">Design Systems</p>
                    </div>
                    <div>
                        <h4 className="font-mono text-[10px] uppercase text-gray-500 mb-4">
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
                                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
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
