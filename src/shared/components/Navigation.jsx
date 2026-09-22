import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { FileText, ArrowUpRight } from 'lucide-react'
import Pill from './Pill'

const PAGE_LINKS = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/services", label: "Services" },
    { to: "/blogs", label: "Blogs" },
];

const RESUME_LINK =
    "https://drive.google.com/file/d/1AHhSlbWkMrOxUsWm0TBRxScXkZNG78b_/view?usp=sharing";

const linkClass = ({ isActive }) =>
    `px-3 xl:px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-eyebrow transition-colors ${
        isActive ? "text-primary" : "text-muted hover:text-primary"
    }`;

const Brand = ({ isHome }) => {
    const content = (
        <>
            <span className="flex flex-col leading-tight">
                <span className="font-sans text-sm font-semibold tracking-tight text-primary">
                    Reuben Oluwafemi
                </span>
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted hidden sm:block">
                    Engineer & Designer
                </span>
            </span>
        </>
    );

    const className = "flex items-center gap-2.5 group";

    return isHome ? (
        <a
            href="#"
            className={className}
            aria-label="Reuben Oluwafemi — back to top"
            onClick={(e) => {
                e.preventDefault();
                if (window.lenis) window.lenis.scrollTo(0);
                else window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        >
            {content}
        </a>
    ) : (
        <Link to="/" className={className} aria-label="Reuben Oluwafemi — home">
            {content}
        </Link>
    );
};

const Navigation = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const scrollY =
                window.lenis?.scroll ||
                window.scrollY ||
                document.documentElement.scrollTop ||
                0;
            setHasScrolled(scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        let lenisScrollHandler = null;
        if (window.lenis) {
            lenisScrollHandler = () => {
                const scrollY = window.lenis.scroll || 0;
                setHasScrolled(scrollY > 40);
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

    return (
        <>
            <header className="fixed top-3 md:top-6 inset-x-3 md:inset-x-6 z-50">
                <nav
                    aria-label="Primary"
                    className={`max-w-[1352px] mx-auto rounded-full border backdrop-blur-xl transition-all duration-500 ease-out-expo pl-4 pr-2 py-2 md:pl-5 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 ${
                        hasScrolled
                            ? "border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]"
                            : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)]"
                    }`}
                >
                    {/* Left — page links (desktop) / brand (mobile) */}
                    <div>
                        <Brand isHome={isHome} />
                    </div>

                    {/* Center — brand (desktop) */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {PAGE_LINKS.map((link) => (
                            <NavLink key={link.to} to={link.to} className={linkClass}>
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right — actions */}
                    <div className="flex items-center justify-end gap-2">
                        <a
                            href={RESUME_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Resume"
                            title="View Resume"
                            className="icon-btn !w-10 !h-10 xl:!hidden"
                        >
                            <FileText className="w-4 h-4" />
                        </a>
                        <Pill
                            variant="ghost"
                            size="sm"
                            href={RESUME_LINK}
                            className="!hidden xl:!inline-flex"
                        >
                            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                            View Resume
                        </Pill>
                        <Pill variant="invert" size="sm" to="/start-a-project" magnetic={false}>
                            <ArrowUpRight className="w-4 h-4" />
                        </Pill>
                    </div>
                </nav>
            </header>

            {/* --- Mobile Bottom Dock (separate layer to prevent scroll jumps) --- */}
            <nav
                aria-label="Primary mobile"
                className="flex md:hidden items-center gap-0.5 fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[color-mix(in_srgb,var(--color-bg)_80%,transparent)] backdrop-blur-xl px-1.5 py-1.5 rounded-full border border-[var(--color-border-strong)] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.6)]"
            >
                {PAGE_LINKS.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            `px-3.5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-eyebrow transition-colors ${
                                isActive
                                    ? "bg-[var(--color-accent)] text-[var(--color-accent-inverse)]"
                                    : "text-muted hover:text-primary"
                            }`
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>
        </>
    );
};

export default Navigation
