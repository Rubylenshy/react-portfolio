import { Monitor, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <footer className="py-6 px-8 border-t border-white/5 mb-12 md:mb-0">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 max-w-6xl mx-auto">
                <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest text-center md:text-left">
                    © MMXXVI - Reuben Oluwafemi. Engineered with Precision.
                </p>
                <div className="flex items-center gap-1 bg-gray-100/10 rounded-full p-1">
                    <button
                        id="theme-system-btn"
                        onClick={() => toggleTheme('dark')}
                        className={`p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                        aria-label="Dark theme"
                        title="Dark theme"
                    >
                        <Monitor className="w-4 h-4" />
                    </button>
                    <button
                        id="theme-light-btn"
                        onClick={() => toggleTheme('light')}
                        className={`p-2 rounded-full transition-colors duration-200 ${theme === 'light' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                        aria-label="Light theme"
                        title="Light theme"
                    >
                        <Sun className="w-4 h-4" />
                    </button>
                    <button
                        id="theme-dark-btn"
                        onClick={() => toggleTheme('dark')}
                        className={`p-2 rounded-full transition-colors duration-200 ${theme === 'dark' ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-gray-400'}`}
                        aria-label="Dark mode"
                        title="Dark mode"
                    >
                        <Moon className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
