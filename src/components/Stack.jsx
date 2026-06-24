import { useRef, useEffect } from "react";
import { gsap } from "gsap";

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

    const renderMarqueeItems = (items) =>
        [...items, ...items].map((item, idx) => (
            <span key={`${item.label}-${idx}`} className="mx-8 inline-flex items-center gap-2.5 shrink-0">
                <i className={`${item.devicon} text-2xl`} style={{ lineHeight: 1 }} />
                <span className="font-mono text-sm text-gray-500 uppercase tracking-widest">{item.label}</span>
            </span>
        ));

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
