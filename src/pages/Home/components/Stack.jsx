import Showreel from "../../../shared/components/Showreel";

// ── Component ──────────────────────────────────────────────────────────────
const Stack = () => {
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

    const renderMarqueeItems = (items) =>
        [...items, ...items].map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="mx-8 inline-flex items-center gap-2.5 shrink-0">
                <i className={`${item.devicon} text-2xl`} style={{ lineHeight: 1 }} />
                <span className="font-mono text-sm text-muted uppercase tracking-widest">{item.label}</span>
            </span>
        ));

    return (
        <>
            {/* ── Marquee section ── */}
            <section
                id="stack"
                className="py-12 border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden mt-12"
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

            {/* ── Role Grid ── */}
            <section className="bg-[var(--color-bg-secondary)] max-w-[1400px] mx-auto grid-frame">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2">
                    {roles.map((item, i) => {
                        const isLastInRow = (i + 1) % 2 === 0;
                        const isLastRow = i >= roles.length - (roles.length % 2 === 0 ? 2 : 1);
                        return (
                            <div
                                key={item.role}
                                className={`p-10 md:p-14 ${!isLastInRow ? "md:border-r" : ""} ${!isLastRow ? "border-b border-dashed" : ""} border-[var(--color-border)]`}
                            >
                                <i className={`${item.icon} text-2xl text-primary mb-8 block`} />
                                <h4 className="text-lg font-semibold text-primary mb-3">{item.role}</h4>
                                <p className="text-sm text-secondary leading-relaxed mb-5">{item.description}</p>
                                <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                                    {item.pills.map((pill) => (
                                        <span key={pill} className="text-[11px] font-mono uppercase tracking-widest text-muted">
                                            {pill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <Showreel src="/videos/usereuben_showcase.mp4" />
        </>
    );
};

export default Stack;
