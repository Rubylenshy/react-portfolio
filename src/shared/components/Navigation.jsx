import { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom";

const SECTION_LINKS = [
    { id: "stack", label: "Stack" },
];

const NAV_LINK_CLASS =
    "px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest hover:bg-[var(--color-surface-strong)] transition-colors";

const Navigation = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";
    const resumeLink =
        "https://drive.google.com/file/d/1AHhSlbWkMrOxUsWm0TBRxScXkZNG78b_/view?usp=sharing";
    const githubLink = "https://github.com/Rubylenshy";

    useEffect(() => {
        const handleScroll = () => {
            const scrollY =
                window.lenis?.scroll ||
                window.scrollY ||
                document.documentElement.scrollTop ||
                0;
            setHasScrolled(scrollY > 80);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        let lenisScrollHandler = null;
        if (window.lenis) {
            lenisScrollHandler = () => {
                const scrollY = window.lenis.scroll || 0;
                setHasScrolled(scrollY > 80);
            };
            window.lenis.on("scroll", lenisScrollHandler);
        }

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (window.lenis && lenisScrollHandler) {
                window.lenis.off("scroll", lenisScrollHandler);
            }
        };
    }, []);

    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        const element = document.getElementById(sectionId);
        if (element && window.lenis) {
            window.lenis.scrollTo(element, { offset: -80 });
        }
    };

    const SectionLink = ({ id, label }) =>
        isHome ? (
            <a href={`#${id}`} className={NAV_LINK_CLASS} onClick={(e) => scrollToSection(e, id)}>
                {label}
            </a>
        ) : (
            <Link to={`/#${id}`} className={NAV_LINK_CLASS}>
                {label}
            </Link>
        );

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 pointer-events-none transition-all duration-500 ease-out ${
                    hasScrolled
                        ? "py-4 bg-[var(--color-surface-strong)] backdrop-blur-xl border-b border-[var(--color-border)] text-primary mix-blend-normal shadow-lg"
                        : "py-6 text-white mix-blend-difference"
                }`}
            >
                <div className="max-w-[1400px] mx-auto grid-frame px-6 flex justify-between items-center">
                    {isHome ? (
                        <a
                            href="#"
                            className="flex flex-col pointer-events-auto group magnetic-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                if (window.lenis) window.lenis.scrollTo(0);
                            }}
                        >
                            <span className="font-sans text-sm font-semibold tracking-tight group-hover:opacity-70 transition-opacity">
                                Reuben Oluwafemi
                            </span>
                            <span className="font-mono text-[10px] opacity-70 uppercase tracking-widest">
                                Engineer & Designer
                            </span>
                        </a>
                    ) : (
                        <Link
                            to="/"
                            className="flex flex-col pointer-events-auto group magnetic-btn"
                        >
                            <span className="font-sans text-sm font-semibold tracking-tight group-hover:opacity-70 transition-opacity">
                                Reuben Oluwafemi
                            </span>
                            <span className="font-mono text-[10px] opacity-70 uppercase tracking-widest">
                                Engineer & Designer
                            </span>
                        </Link>
                    )}

                    <div className="hidden md:flex items-center gap-1 pointer-events-auto bg-[var(--color-surface)] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-[var(--color-border)]">
                        <Link to="/about" className={NAV_LINK_CLASS}>
                            About
                        </Link>
                        <Link to="/projects" className={NAV_LINK_CLASS}>
                            Projects
                        </Link>
                        {SECTION_LINKS.map((link) => (
                            <SectionLink key={link.id} {...link} />
                        ))}
                        <Link to="/blogs" className={NAV_LINK_CLASS}>
                            Blogs
                        </Link>
                    </div>

                    <a
                        href={resumeLink}
                        title="Resume"
                        aria-label="View Resume"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-wrapper magnetic-btn !p-0 pointer-events-auto"
                    >
                        {/* Button Content */}
                        <button className="!text-xs btn md:!text-sm !px-2 md:!px-4 transition-colors" style={ { color: "inherit" } }>
                            <i className="far fa-file-pdf mr-2"></i>
                            <span>View Resume</span>
                        </button>
                    </a>
                </div>
            </nav>

            {/* --- Mobile Bottom Nav (separate layer to prevent scroll jumps) --- */}
            <div className="flex md:hidden items-center gap-1 pointer-events-auto fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-[var(--color-surface)] backdrop-blur-md px-1.5 py-1.5 rounded-full border border-[var(--color-border)]">
                <Link to="/about" className={NAV_LINK_CLASS}>
                    About
                </Link>
                <Link to="/projects" className={NAV_LINK_CLASS}>
                    Projects
                </Link>
                {SECTION_LINKS.map((link) => (
                    <SectionLink key={link.id} {...link} />
                ))}
                <Link to="/blogs" className={NAV_LINK_CLASS}>
                    Blogs
                </Link>
            </div>
        </>
    );
};

export default Navigation

