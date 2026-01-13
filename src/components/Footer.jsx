import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
    const { theme, setTheme, themes } = useTheme();

    return (
        <footer className="py-6 px-8 border-t border-divider text-center md:text-left mb-12 md:mb-0">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-0">
                <p className="font-mono text-[10px] text-text-secondary uppercase tracking-widest">
                    © 2025 Reuben Oluwafemi. Engineered with Precision.
                </p>

                <div className="flex items-center gap-1 bg-glass-bg backdrop-blur-md rounded-full p-1 border border-glass-border">
                    <button
                        onClick={() => setTheme(themes.SYSTEM)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            theme === themes.SYSTEM
                                ? "bg-interactive-active text-icon-primary"
                                : "hover:bg-interactive-hover text-icon-secondary"
                        }`}
                        aria-label="System theme"
                        aria-pressed={theme === themes.SYSTEM}
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme(themes.LIGHT)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            theme === themes.LIGHT
                                ? "bg-interactive-active text-icon-primary"
                                : "hover:bg-interactive-hover text-icon-secondary"
                        }`}
                        aria-label="Light theme"
                        aria-pressed={theme === themes.LIGHT}
                    >
                        <Sun className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setTheme(themes.DARK)}
                        className={`p-2 rounded-full transition-all duration-200 ${
                            theme === themes.DARK
                                ? "bg-interactive-active text-icon-primary"
                                : "hover:bg-interactive-hover text-icon-secondary"
                        }`}
                        aria-label="Dark theme"
                        aria-pressed={theme === themes.DARK}
                    >
                        <Moon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
