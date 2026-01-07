import { Monitor, Sun, Moon } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-6 px-8 border-t border-white/5 text-center md:text-left mb-12 md:mb-0">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 md:gap-0">
                <p className="font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                    © 2025 Reuben Oluwafemi. Engineered with Precision.
                </p>

                <div className="flex items-center gap-1 bg-gray-100/10 rounded-full p-1">
                    <button
                        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        aria-label="System theme"
                    >
                        <Monitor className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        aria-label="Light theme"
                    >
                        <Sun className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                        className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
                        aria-label="Dark theme"
                    >
                        <Moon className="w-4 h-4 text-gray-400" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
