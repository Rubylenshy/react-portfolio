import { useState } from "react";
import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// True only on mount when no theme was ever explicitly chosen
function hadNoStoredTheme() {
  try {
    return !localStorage.getItem("theme");
  } catch {
    return false;
  }
}

const ACTIVE = "p-2 rounded-full transition-all duration-200 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] shadow-sm";
const INACTIVE = "p-2 rounded-full transition-all duration-200 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]";

const Footer = () => {
  const { toggleTheme } = useTheme();

  // 'system' | 'light' | 'dark'
  const [active, setActive] = useState(() =>
    hadNoStoredTheme() ? "system" : (localStorage.getItem("theme") ?? "dark")
  );

  const pick = (mode) => {
    toggleTheme(mode);
    setActive(mode);
  };

  return (
    <footer className="py-6 px-8 border-t border-[var(--color-border)] mb-12 md:mb-0">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 max-w-6xl mx-auto">
        <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest text-center md:text-left">
          © MMXXVI - Reuben Oluwafemi. Engineered with Precision.
        </p>

        <div className="flex items-center gap-1 rounded-full p-1 border border-[var(--color-border)] bg-[var(--color-surface)]">
          {/* System / auto — active only on initial mount when no preference was stored */}
          <button
            id="theme-system-btn"
            onClick={() => pick("dark")}
            className={active === "system" ? ACTIVE : INACTIVE}
            aria-label="System default"
            title="System default"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Light */}
          <button
            id="theme-light-btn"
            onClick={() => pick("light")}
            className={active === "light" ? ACTIVE : INACTIVE}
            aria-label="Light theme"
            title="Light theme"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Dark */}
          <button
            id="theme-dark-btn"
            onClick={() => pick("dark")}
            className={active === "dark" ? ACTIVE : INACTIVE}
            aria-label="Dark theme"
            title="Dark theme"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
