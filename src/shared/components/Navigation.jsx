import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { FileText, ArrowUpRight } from 'lucide-react'
import Pill from './Pill'
import logoMark from '../images/logo-mark.webp'

const PAGE_LINKS = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/services", label: "Services" },
    { to: "/blogs", label: "Blogs" },
];

const RESUME_LINK =
    "https://drive.google.com/file/d/1AHhSlbWkMrOxUsWm0TBRxScXkZNG78b_/view?usp=sharing";

const linkClass = ({ isActive }) =>
    `px-2.5 lg:px-3 xl:px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-eyebrow transition-colors ${
        isActive ? "text-primary" : "text-muted hover:text-primary"
    }`;

const scrollHomeToTop = (e) => {
    e.preventDefault();
    if (window.lenis) window.lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
};

const Brand = ({ isHome }) => {
    const content = (
        <>
            <span className="flex flex-col leading-tight">
                <span className="font-sans text-sm font-semibold tracking-tight text-primary">
                    Reuben Oluwafemi
                </span>
                {/* Full role from lg up; shorter below so the tablet nav stays on one line */}
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-muted hidden sm:block whitespace-nowrap">
                    <span className="hidden lg:inline">WordPress Plugin & Frontend Developer</span>
                    <span className="lg:hidden">Plugin & Frontend Dev</span>
                </span>
            </span>
        </>
    );

    const className = "flex items-center gap-2.5 group";

    return isHome ? (
        <a href="#" className={className} aria-label="Reuben Oluwafemi — back to top" onClick={scrollHomeToTop}>
            {content}
        </a>
    ) : (
        <Link to="/" className={className} aria-label="Reuben Oluwafemi — home">
            {content}
        </Link>
    );
};

// White capsule cap holding the logo mark (desktop nav)
const BrandCap = ({ isHome }) => {
    const className = "nav-cap flex items-center justify-center h-12 w-[68px]";
    const logo = <img src={logoMark} alt="" width="21" height="24" className="h-6 w-auto" />;

    return isHome ? (
        <a href="#" className={className} aria-label="Reuben Oluwafemi — back to top" onClick={scrollHomeToTop}>
            {logo}
        </a>
    ) : (
        <Link to="/" className={className} aria-label="Reuben Oluwafemi — home">
            {logo}
        </Link>
    );
};

// Concave bridge between the cap and the link pill; both ends tuck under their neighbours
const CapsuleNeck = () => (
    <svg className="nav-neck" width="18" height="48" viewBox="0 0 18 48" aria-hidden="true">
        <path
            className="nav-neck-fill"
            d="M0 12C6 12 6 19 9 19C12 19 12 12 18 12V36C12 36 12 29 9 29C6 29 6 36 0 36Z"
        />
        <path className="nav-neck-edge" d="M0 12C6 12 6 19 9 19C12 19 12 12 18 12M0 36C6 36 6 29 9 29C12 29 12 36 18 36" />
    </svg>
);

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
            <header className={`fixed top-3 md:top-6 inset-x-3 md:inset-x-6 z-50 ${hasScrolled ? "is-scrolled" : ""}`}>
                {/* Desktop — three floating pills: availability, brand + links, actions */}
                <div className="hidden md:grid max-w-[1352px] mx-auto grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center gap-3 lg:gap-4">
                    <div>
                        <Link
                            to="/start-a-project"
                            className="nav-pill inline-flex items-center gap-2.5 h-12 px-4 lg:px-5 whitespace-nowrap font-mono text-[11px] uppercase tracking-eyebrow text-secondary hover:text-primary"
                        >
                            <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
                            <span className="lg:hidden">Available</span>
                            <span className="hidden lg:inline">Available for Hire</span>
                        </Link>
                    </div>

                    {/* Capsule: the logo is the cap, joined to the link pill by a curved neck */}
                    <nav aria-label="Primary" className="flex items-center">
                        <BrandCap isHome={isHome} />
                        <CapsuleNeck />
                        <div className="nav-pill flex items-center gap-0.5 h-12 px-1.5">
                            {PAGE_LINKS.map((link) => (
                                <NavLink key={link.to} to={link.to} className={linkClass}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    <div className="flex justify-end">
                        <div className="nav-pill nav-pill-plain flex items-center gap-1.5 h-12 px-1">
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
                            <Pill variant="invert" size="sm" to="/start-a-project" magnetic={false} aria-label="Start a project">
                                <ArrowUpRight className="w-4 h-4" />
                            </Pill>
                        </div>
                    </div>
                </div>

                {/* Mobile — brand + actions (links live in the bottom dock) */}
                <div
                    className={`md:hidden rounded-full border backdrop-blur-xl transition-all duration-500 ease-out-expo pl-4 pr-2 py-2 flex items-center justify-between gap-4 ${
                        hasScrolled
                            ? "border-[var(--color-border-strong)] bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.5)]"
                            : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)]"
                    }`}
                >
                    <Brand isHome={isHome} />
                    <div className="flex items-center gap-2">
                        <a
                            href={RESUME_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View Resume"
                            title="View Resume"
                            className="icon-btn !w-10 !h-10"
                        >
                            <FileText className="w-4 h-4" />
                        </a>
                        <Pill variant="invert" size="sm" to="/start-a-project" magnetic={false} aria-label="Start a project">
                            <ArrowUpRight className="w-4 h-4" />
                        </Pill>
                    </div>
                </div>
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
