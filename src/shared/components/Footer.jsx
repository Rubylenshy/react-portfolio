import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Monitor, Sun, Moon, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const THEME_OPTIONS = [
  { mode: "light", label: "Light", icon: Sun },
  { mode: "dark", label: "Dark", icon: Moon },
  { mode: "system", label: "System", icon: Monitor },
];

const TRIGGER_META = {
  light: { label: "Light Theme", icon: Sun },
  dark: { label: "Dark Theme", icon: Moon },
  system: { label: "System Theme", icon: Monitor },
};

const SITEMAP = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/services", label: "Services" },
  { to: "/#stack", label: "Stack" },
  { to: "/blogs", label: "Blogs" },
  { to: "/start-a-project", label: "Start a Project" },
];

const SOCIAL_LINKS = [
  { icon: "fa-brands fa-x-twitter", href: "https://twitter.com/tomoloj_", label: "X / Twitter" },
  { icon: "fa-brands fa-instagram", href: "https://www.instagram.com/reuben.ig_", label: "Instagram" },
  { icon: "fa-brands fa-github", href: "https://github.com/Rubylenshy", label: "GitHub" },
  { icon: "fa-brands fa-linkedin-in", href: "https://www.linkedin.com/in/reuben-tomoloju/", label: "LinkedIn" },
  { icon: "fa-brands fa-wordpress", href: "https://profiles.wordpress.org/reztomoloju/", label: "WordPress.org" },
  // Frontend Mentor icon isn't available in Font Awesome; using code icon as a placeholder
  { icon: "fa-solid fa-code", href: "https://www.frontendmentor.io/profile/Rubylenshy", label: "Frontend Mentor" },
];

const GO_TOS = [
  { label: "Apostle Segun Obadje", href: "https://www.youtube.com/@ApostleSegunObadje" },
  { label: "Netflix", href: "https://www.netflix.com" },
  { label: "Claude Code for Real Engineers", href: "https://www.aihero.dev/cohorts/claude-code-for-real-engineers-2026-04" },
  { label: "AI Skills for Engineers", href: "https://www.aihero.dev/skills" },
];

const EMAIL = "reztomoloju@gmail.com";

const ColumnTitle = ({ children }) => (
  <h2 className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-5">{children}</h2>
);

const listLinkClass =
  "text-sm text-secondary hover:text-primary transition-colors underline decoration-transparent underline-offset-4 hover:decoration-[var(--color-signal-text)]";

const ThemeMenu = () => {
  const { mode, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const onEscape = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  const pick = (next) => {
    toggleTheme(next);
    setOpen(false);
  };

  const Trigger = TRIGGER_META[mode]?.icon ?? Moon;

  return (
    <div className="relative" ref={menuRef}>
      {open && (
        <div
          role="menu"
          className="absolute bottom-full right-0 mb-2 w-44 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] shadow-lg p-1.5 z-10"
        >
          <p className="px-3 py-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-muted">Theme</p>
          {THEME_OPTIONS.map(({ mode: option, label, icon: Icon }) => (
            <button
              key={option}
              type="button"
              role="menuitemradio"
              aria-checked={mode === option}
              onClick={() => pick(option)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-primary hover:bg-[var(--color-surface-raised)] transition-colors"
            >
              <Icon className="w-4 h-4 text-muted" aria-hidden="true" />
              <span className="flex-1 text-left">{label}</span>
              {mode === option && <Check className="w-3.5 h-3.5 text-signal-text" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="pill pill-ghost pill-sm"
      >
        <Trigger className="w-3.5 h-3.5" aria-hidden="true" />
        {TRIGGER_META[mode]?.label ?? "Theme"}
      </button>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative w-full max-w-[1400px] mx-auto grid-frame px-6 md:px-10 pt-16 md:pt-24 pb-28 md:pb-10 overflow-hidden">
      {/* Oversized ghost watermark */}
      <p
        aria-hidden="true"
        className="ghost-text uppercase text-[10.5vw] xl:text-[136px] text-center pb-4"
      >
        Engineered with Precision
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1.4fr] gap-12 lg:gap-10 pt-12 border-t border-[var(--color-border)]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <span className="signal-dot" aria-hidden="true" />
            <span className="font-semibold tracking-tight text-primary">Reuben Oluwafemi</span>
          </div>
          <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
            Bridging the gap between engineering logic and creative design.
          </p>
          <ul className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="icon-btn"
                >
                  <i className={item.icon} aria-hidden="true"></i>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sitemap */}
        <nav aria-label="Sitemap">
          <ColumnTitle>Sitemap</ColumnTitle>
          <ul className="space-y-2.5">
            {SITEMAP.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={listLinkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Go-tos */}
        <div>
          <ColumnTitle>Few Go-Tos</ColumnTitle>
          <ul className="space-y-2.5">
            {GO_TOS.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={listLinkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* New business */}
        <div>
          <ColumnTitle>Location</ColumnTitle>
          <p className="text-sm font-medium text-primary">Nigeria</p>
          <p className="text-sm text-muted mb-6">Remote Worldwide</p>
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-eyebrow text-secondary mb-3">
            <span className="signal-dot signal-dot-pulse" aria-hidden="true" />
            Available for Hire
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="block break-all text-2xl xl:text-[28px] font-medium tracking-tight text-primary hover:text-signal-text transition-colors"
          >
            {EMAIL}
          </a>
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[11px] text-muted uppercase tracking-eyebrow text-center md:text-left">
          © MMXXVI - Reuben Oluwafemi. Engineered with Precision.
        </p>
        <ThemeMenu />
      </div>
    </footer>
  );
};

export default Footer;
