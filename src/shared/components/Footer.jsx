import { useState, useRef, useEffect } from "react";
import { Monitor, Sun, Moon, Check } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// True only on mount when no theme was ever explicitly chosen
function hadNoStoredTheme() {
  try {
    return !localStorage.getItem("theme");
  } catch {
    return false;
  }
}

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

const Footer = () => {
  const { toggleTheme } = useTheme();

  // 'system' | 'light' | 'dark'
  const [active, setActive] = useState(() =>
    hadNoStoredTheme() ? "system" : (localStorage.getItem("theme") ?? "dark")
  );
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

  // System has no real OS-preference detection — selecting it just resets to dark,
  // same as the previous segmented control's behavior.
  const pick = (mode) => {
    toggleTheme(mode === "system" ? "dark" : mode);
    setActive(mode === "system" ? "dark" : mode);
    setOpen(false);
  };

  const Trigger = TRIGGER_META[active]?.icon ?? Moon;

  return (
    <footer className="w-full py-6 px-8 border-t border-[var(--color-border)] mb-12 md:mb-0 max-w-[1400px] mx-auto grid-frame">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 max-w-6xl mx-auto">
        <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest text-center md:text-left">
          © MMXXVI - Reuben Oluwafemi. Engineered with Precision.
        </p>

        <div className="relative" ref={menuRef}>
          {open && (
            <div
              role="menu"
              className="absolute bottom-full right-0 mb-2 w-40 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-lg py-1.5 overflow-hidden z-10"
            >
              <p className="px-3 py-1.5 text-[11px] font-semibold text-[var(--color-text-primary)]">
                Theme
              </p>
              {THEME_OPTIONS.map(({ mode, label, icon: Icon }) => (
                <button
                  key={mode}
                  type="button"
                  role="menuitemradio"
                  aria-checked={active === mode}
                  onClick={() => pick(mode)}
                  className="w-full flex items-center gap-2.5 px-3 py-1.5 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-strong)] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[var(--color-text-secondary)]" />
                  <span className="flex-1 text-left">{label}</span>
                  {active === mode && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={open}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)] transition-colors text-xs font-mono uppercase tracking-widest"
          >
            <Trigger className="w-4 h-4" />
            {TRIGGER_META[active]?.label ?? "Theme"}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
