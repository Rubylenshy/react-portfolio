import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ── Inline SVG logos for AI tools (real brand icons) ──────────────────────
const AnthropicIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017L3.674 20H0L6.57 3.52zm-.935 10.137h3.992L9.614 7.388l-3.98 6.27z" fill="#D4A574"/>
  </svg>
);

const CopilotIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2c4.418 0 8 3.582 8 8a7.99 7.99 0 01-2.088 5.338C17.25 16.08 15.72 15 14 15h-4c-1.72 0-3.25 1.08-3.912 2.338A7.99 7.99 0 014 12c0-4.418 3.582-8 8-8zm0 2a4 4 0 100 8 4 4 0 000-8z" fill="#6EE7B7"/>
    <circle cx="12" cy="10" r="3" fill="#6EE7B7" opacity="0.5"/>
  </svg>
);

const CursorIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2l16 9-7 2-4 7L4 2z" fill="#A78BFA" stroke="#A78BFA" strokeWidth="0.5"/>
    <path d="M13 13l5 5" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const V0Icon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="none"/>
    <text x="2" y="17" fontFamily="monospace" fontWeight="700" fontSize="13" fill="#FFFFFF">v0</text>
  </svg>
);

const WindsurfIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C3 12 6 4 12 4C18 4 20 9 20 9" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
    <path d="M3 16C3 16 7 10 14 10C19 10 21 14 21 14" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
    <path d="M3 20C3 20 8 16 15 16C19 16 21 18 21 18" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
  </svg>
);

const JetbrainsIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#FCD34D" opacity="0.15"/>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#FCD34D" strokeWidth="1.5"/>
    <path d="M7 8h10M7 12h7M7 16h5" stroke="#FCD34D" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BoltIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L4 14h7l-1 8 9-12h-7l2-8z" fill="#F97316" stroke="#F97316" strokeWidth="0.5" strokeLinejoin="round"/>
  </svg>
);

const OpenRouterIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="#34D399" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="#34D399" strokeWidth="1.5"/>
    <line x1="12" y1="3" x2="12" y2="8" stroke="#34D399" strokeWidth="1.5"/>
    <line x1="12" y1="16" x2="12" y2="21" stroke="#34D399" strokeWidth="1.5"/>
    <line x1="3" y1="12" x2="8" y2="12" stroke="#34D399" strokeWidth="1.5"/>
    <line x1="16" y1="12" x2="21" y2="12" stroke="#34D399" strokeWidth="1.5"/>
  </svg>
);

const PerplexityIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 2v20M2 7l10 5 10-5" stroke="#22D3EE" strokeWidth="1.5" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const ZedIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="none"/>
    <path d="M5 7h14L5 17h14" stroke="#E879F9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GeminiIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C12 2 14 8 14 12C14 16 12 22 12 22C12 22 10 16 10 12C10 8 12 2 12 2Z" fill="#A5B4FC"/>
    <path d="M2 12C2 12 8 10 12 10C16 10 22 12 22 12C22 12 16 14 12 14C8 14 2 12 2 12Z" fill="#A5B4FC"/>
  </svg>
);

const CoderIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="8,6 2,12 8,18" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16,6 22,12 16,18" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="14" y1="4" x2="10" y2="20" stroke="#FB7185" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const LangchainIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="12" r="2.5" fill="#86EFAC"/>
    <circle cx="18" cy="12" r="2.5" fill="#86EFAC"/>
    <circle cx="12" cy="6" r="2.5" fill="#86EFAC"/>
    <circle cx="12" cy="18" r="2.5" fill="#86EFAC"/>
    <line x1="8.5" y1="12" x2="15.5" y2="12" stroke="#86EFAC" strokeWidth="1.5"/>
    <line x1="12" y1="8.5" x2="12" y2="15.5" stroke="#86EFAC" strokeWidth="1.5"/>
  </svg>
);

const CodeRabbitIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3C8 3 7 5 7 7C5.5 7.5 4 9 4 11C4 14 6 16 8 16.5V19H10V17H14V19H16V16.5C18 16 20 14 20 11C20 9 18.5 7.5 17 7C17 5 16 3 16 3C16 3 15 5.5 14 6C13.5 6 12.5 6 12 6C11.5 6 10.5 6 10 6C9 5.5 8 3 8 3Z" fill="none" stroke="#F87171" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="10" cy="11" r="1" fill="#F87171"/>
    <circle cx="14" cy="11" r="1" fill="#F87171"/>
  </svg>
);

const GitpodIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L20 7V12C20 16.4 16.4 20.5 12 22C7.6 20.5 4 16.4 4 12V7L12 2Z" stroke="#FDBA74" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="#FDBA74" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Component ──────────────────────────────────────────────────────────────
const Stack = () => {
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const card4Ref = useRef(null);

    // Tools row 1 — using devicon colored classes
    const tools = [
        { label: "VS Code",           devicon: "devicon-vscode-plain colored" },
        { label: "CodeSandbox",       devicon: "devicon-github-original colored" }, // closest match
        { label: "WordPress",         devicon: "devicon-wordpress-plain colored" },
        { label: "Vercel",            devicon: "devicon-vercel-original colored" },
        { label: "Bitbucket",         devicon: "devicon-bitbucket-original colored" },
        { label: "Figma",             devicon: "devicon-figma-plain colored" },
        { label: "Notion",            devicon: "devicon-notion-plain colored" },
        { label: "Trello",            devicon: "devicon-trello-plain colored" },
        { label: "Canva",             devicon: "devicon-canva-original colored" },
        { label: "Adobe Photoshop",   devicon: "devicon-photoshop-plain colored" },
    ];

    // Frontend stack row 2 — devicon colored
    const frontendStack = [
        { label: "VueJS",             devicon: "devicon-vuejs-plain colored" },
        { label: "ReactJS",           devicon: "devicon-react-original colored" },
        { label: "Next.js",           devicon: "devicon-nextjs-original colored" },
        { label: "JavaScript (ES6+)", devicon: "devicon-javascript-plain colored" },
        { label: "PHP",               devicon: "devicon-php-plain colored" },
        { label: "DevTools",          devicon: "devicon-chrome-plain colored" },
        { label: "Bootstrap",         devicon: "devicon-bootstrap-plain colored" },
        { label: "SCSS",              devicon: "devicon-sass-original colored" },
        { label: "HTML5",             devicon: "devicon-html5-plain colored" },
        { label: "MySQL",             devicon: "devicon-mysql-plain colored" },
        { label: "Git/GitHub",        devicon: "devicon-git-plain colored" },
    ];

    // AI tools — all rendered at uniform md size
    const aiTools = [
        { label: "Claude",       Icon: AnthropicIcon,  color: "#D4A574" },
        { label: "Copilot",      Icon: CopilotIcon,    color: "#6EE7B7" },
        { label: "Cursor",       Icon: CursorIcon,     color: "#A78BFA" },
        { label: "v0",           Icon: V0Icon,          color: "#FFFFFF" },
        { label: "Windsurf",     Icon: WindsurfIcon,   color: "#60A5FA" },
        { label: "Bolt",         Icon: BoltIcon,       color: "#F97316" },
        { label: "Gemini",       Icon: GeminiIcon,     color: "#A5B4FC" },
        { label: "Coder",        Icon: CoderIcon,      color: "#FB7185" },
    ];

    // Role cards
    const roles = [
        {
            role: "Plugin Developer",
            icon: "fa-solid fa-puzzle-piece",
            description: "Custom WordPress plugins built for performance, security, and scalability.",
            pills: ["Custom WordPress Plugins", "WooCommerce Feat.", "SEO & Automation"],
        },
        {
            role: "Frontend Engineer",
            icon: "fa-solid fa-layer-group",
            description: "Translating designs into production-ready React interfaces with modern frontend techniques.",
            pills: ["Web App UI", "E-commerce", "AI-Driven UI"],
        },
        {
            role: "API Integration Specialist",
            icon: "fa-solid fa-microchip",
            description: "Seamless third-party integrations creating automated workflows and data flows.",
            pills: ["CRM & Marketing API", "App-to-App Automation", "HubSpot"],
        },
        {
            role: "Performance Optimizer",
            icon: "fa-solid fa-gauge-high",
            description: "Code audits and refactoring targeting 90+ Lighthouse scores and Core Web Vitals.",
            pills: ["Core Web Vitals Fix", "Website Performance", "Site Optimization"],
        },
    ];

    // Card 3D tilt effect
    useEffect(() => {
        const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
        const cleanups = [];

        cards.forEach((card) => {
            if (!card) return;
            const onEnter = () => gsap.to(card, { backdropFilter: "blur(20px)", backgroundColor: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.25)", scale: 1.02, boxShadow: "0 8px 32px rgba(0,0,0,0.4)", duration: 0.4, ease: "power2.out" });
            const onMove = (e) => {
                const r = card.getBoundingClientRect();
                gsap.to(card, { rotationX: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -5, rotationY: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 5, transformPerspective: 1000, duration: 0.3, ease: "power2.out" });
            };
            const onLeave = () => gsap.to(card, { backdropFilter: "blur(0px)", backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", scale: 1, rotationX: 0, rotationY: 0, boxShadow: "0 0 0 1px rgba(255,255,255,0.04)", duration: 0.4, ease: "power2.out" });
            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            cleanups.push(() => { card.removeEventListener("mouseenter", onEnter); card.removeEventListener("mousemove", onMove); card.removeEventListener("mouseleave", onLeave); });
        });
        return () => cleanups.forEach((c) => c());
    }, []);

    // GSAP float animation on AI bubbles
    useEffect(() => {
        const bubbles = document.querySelectorAll(".ai-bubble");
        bubbles.forEach((bubble, i) => {
            gsap.to(bubble, {
                y: `+=${8 + (i % 3) * 4}`,
                x: `+=${3 + (i % 4) * 2}`,
                duration: 5 + (i % 5) * 1.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: -(i * 0.6),
            });
        });
    }, []);

    const renderMarqueeItems = (items) =>
        [...items, ...items].map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="mx-8 inline-flex items-center gap-2.5 shrink-0">
                <i className={`${item.devicon} text-2xl`} style={{ lineHeight: 1 }} />
                <span className="font-mono text-sm text-gray-500 uppercase tracking-widest">{item.label}</span>
            </span>
        ));

    // All bubbles md-sized
    const BOX = 52;
    const ICON_SIZE = 26;

    // 3 rows × 5 cols grid with organic scatter
    // xPct: base % across container width, yPct: base % of container height
    // scatter: [dx, dy] pixel nudge for organic feel
    const ROWS = [
        // row 0 — top
        [
            { i: 0,  xPct: 8,  yPct: 12, dx:  0,  dy:  0 },
            { i: 1,  xPct: 26, yPct: 8,  dx:  8,  dy:  6 },
            { i: 2,  xPct: 48, yPct: 14, dx: -6,  dy: -4 },
            { i: 3,  xPct: 70, yPct: 7,  dx:  4,  dy:  8 },
        ],
        // row 1 — middle
        [
            { i: 5,  xPct: 14, yPct: 45, dx: -4,  dy:  6 },
            { i: 6,  xPct: 34, yPct: 40, dx:  6,  dy: -6 },
            { i: 7,  xPct: 52, yPct: 48, dx: -2,  dy:  4 },
            { i: 8,  xPct: 72, yPct: 42, dx:  8,  dy: -4 },
        ],
    ];

    const CONTAINER_W = 650;
    const CONTAINER_H = 250;

    return (
        <>
            {/* ── Marquee section ── */}
            <section
                id="stack"
                className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden mt-12"
            >
                <div className="space-y-6">
                    <div className="marquee-track">
                        {renderMarqueeItems(tools)}
                    </div>
                    <div className="marquee-track" style={{ animationDirection: "reverse" }}>
                        {renderMarqueeItems(frontendStack)}
                    </div>
                </div>
            </section>

            {/* ── AI Coding Tools — 3-row scattered float ── */}
            <section className="py-12 border-b border-white/5 bg-black/30 overflow-hidden">
                <div className="mb-8 flex justify-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
                        AI Coding Tools
                    </span>
                </div>

                {/* Horizontally scrollable, never wraps */}
                <div
                    className="overflow-x-auto overflow-y-hidden"
                    style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    <style>{`.ai-scroll-wrap::-webkit-scrollbar { display: none; }`}</style>
                    <div
                        className="ai-scroll-wrap relative mx-auto flex-shrink-0"
                        style={{ width: `${CONTAINER_W}px`, height: `${CONTAINER_H}px` }}
                    >
                        {/* Subtle dot-grid bg */}
                        <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)",
                                backgroundSize: "48px 48px",
                            }}
                        />

                        {/* Render all tools from ROWS grid */}
                        {ROWS.flat().map(({ i, xPct, yPct, dx, dy }) => {
                            const tool = aiTools[i];
                            if (!tool) return null;
                            const { Icon } = tool;
                            const left = (xPct / 100) * CONTAINER_W + dx;
                            const top  = (yPct / 100) * CONTAINER_H + dy;
                            return (
                                <div
                                    key={tool.label}
                                    className="ai-bubble absolute flex flex-col items-center gap-1.5 cursor-default select-none group"
                                    style={{
                                        left: `${left}px`,
                                        top:  `${top}px`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${BOX}px`,
                                            height: `${BOX}px`,
                                            borderRadius: "14px",
                                            background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.11), rgba(255,255,255,0.03))",
                                            border: `1px solid ${tool.color}38`,
                                            boxShadow: `0 4px 24px ${tool.color}1a, inset 0 1px 0 rgba(255,255,255,0.07)`,
                                            backdropFilter: "blur(10px)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = "scale(1.18)";
                                            e.currentTarget.style.boxShadow = `0 6px 32px ${tool.color}50`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = `0 4px 24px ${tool.color}1a, inset 0 1px 0 rgba(255,255,255,0.07)`;
                                        }}
                                    >
                                        <Icon size={ICON_SIZE} />
                                    </div>
                                    <span
                                        className="font-mono uppercase tracking-wider text-gray-500 whitespace-nowrap transition-opacity duration-200"
                                        style={{ fontSize: "8px" }}
                                    >
                                        {tool.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── Role Cards ── */}
            <section className="py-12">
                <div className="flex items-center lg:items-start justify-center mx-auto max-w-5xl px-6">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[card1Ref, card2Ref, card3Ref, card4Ref].map((ref, i) => (
                            <div
                                key={roles[i].role}
                                ref={ref}
                                className="stack-card p-8 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.04)] cursor-pointer"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                    <i className={`${roles[i].icon} text-sm`} />
                                </div>
                                <h4 className="text-lg font-semibold text-white mb-3">{roles[i].role}</h4>
                                <p className="text-sm text-white leading-relaxed mb-4">{roles[i].description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {roles[i].pills.map((pill, idx) => (
                                        <span key={idx} className="px-4 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-medium tracking-widest text-white uppercase">
                                            {pill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Stack;
