import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Stack = () => {
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const card4Ref = useRef(null);

    const tools = [
        { label: "VS Code", iconClass: "fa-solid fa-code" },
        { label: "CodeSandbox", iconClass: "fa-solid fa-boxes-stacked" },
        { label: "WordPress", iconClass: "fa-brands fa-wordpress" },
        { label: "Vercel", iconClass: "fa-solid fa-play" },
        { label: "Bitbucket", iconClass: "fa-brands fa-bitbucket" },
        { label: "Figma", iconClass: "fa-brands fa-figma" },
        { label: "Notion", iconClass: "fa-brands fa-notion" },
        { label: "Trello", iconClass: "fa-brands fa-trello" },
        { label: "Canva", iconClass: "fa-solid fa-wand-magic-sparkles" },
        { label: "Adobe Photoshop", iconClass: "fa-solid fa-image" },
    ];

    const frontendStack = [
        { label: "VueJS", iconClass: "fa-brands fa-vuejs" },
        { label: "ReactJS", iconClass: "fa-brands fa-react" },
        { label: "Next.js", iconClass: "fa-solid fa-circle-dot" },
        { label: "JavaScript (ES6+)", iconClass: "fa-brands fa-js" },
        { label: "PHP", iconClass: "fa-brands fa-php" },
        { label: "DevTools", iconClass: "fa-solid fa-screwdriver-wrench" },
        { label: "Bootstrap", iconClass: "fa-brands fa-bootstrap" },
        { label: "SCSS", iconClass: "fa-brands fa-sass" },
        { label: "HTML5", iconClass: "fa-brands fa-html5" },
        { label: "MySQL", iconClass: "fa-solid fa-database" },
        { label: "Git/GitHub", iconClass: "fa-brands fa-git-alt" },
    ];

    const roles = [
        {
            role: "Plugin Developer",
            icon: "fa-solid fa-puzzle-piece",
            description:
                "Custom WordPress plugins built for performance, security, and scalability.",
            pills: ["Custom WordPress Plugins", "WooCommerce Feat.", "SEO & Automation"],
        },
        {
            role: "Frontend Engineer",
            icon: "fa-solid fa-layer-group",
            description:
                "Translating designs into production-ready React interfaces with modern frontend techniques.",
            pills: ["Web App UI", "E-commerce", "AI-Driven UI"],
        },
        {
            role: "API Integration Specialist",
            icon: "fa-solid fa-microchip",
            description:
                "Seamless third-party integrations creating automated workflows and data flows.",
            pills: ["CRM & Marketing API", "App-to-App Automation", "HubSpot"],
        },
        {
            role: "Performance Optimizer",
            icon: "fa-solid fa-gauge-high",
            description:
                "Code audits and refactoring targeting 90+ Lighthouse scores and Core Web Vitals.",
            pills: ["Core Web Vitals Fix", "Website Performance", "Site Optimization"],
        },
    ];

    useEffect(() => {
        const cards = [
            card1Ref.current,
            card2Ref.current,
            card3Ref.current,
            card4Ref.current,
        ];
        const cleanupFunctions = [];

        cards.forEach((card) => {
            if (!card) return;

            const handleMouseEnter = () => {
                gsap.to(card, {
                    backdropFilter: "blur(20px)",
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.25)",
                    scale: 1.02,
                    boxShadow:
                        "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                gsap.to(card, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power2.out",
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    backdropFilter: "blur(0px)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    scale: 1,
                    rotationX: 0,
                    rotationY: 0,
                    boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.04)",
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            card.addEventListener("mouseenter", handleMouseEnter);
            card.addEventListener("mousemove", handleMouseMove);
            card.addEventListener("mouseleave", handleMouseLeave);

            cleanupFunctions.push(() => {
                card.removeEventListener("mouseenter", handleMouseEnter);
                card.removeEventListener("mousemove", handleMouseMove);
                card.removeEventListener("mouseleave", handleMouseLeave);
            });
        });

        return () => {
            cleanupFunctions.forEach((cleanup) => cleanup());
        };
    }, []);

    const renderItems = (items) => {
        return [...items, ...items].map((item, idx) => {
            return (
                <span
                    key={`${item.label}-${idx}`}
                    className="mx-8 inline-flex items-center gap-2"
                >
                    {item.iconClass ? (
                        <i
                            className={`${item.iconClass} text-white/80 text-sm`}
                        ></i>
                    ) : (
                        <i className="fa-solid fa-circle text-white/80 text-[0.6rem]"></i>
                    )}
                    <span>{item.label}</span>
                </span>
            );
        });
    };

    return (
        <>
            <section
                id="stack"
                className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden mt-12"
            >
                <div className="space-y-6">
                    <div className="marquee-track font-mono text-sm md:text-base text-gray-500 uppercase tracking-widest">
                        {renderItems(tools)}
                    </div>
                    <div
                        className="marquee-track font-mono text-sm md:text-base text-gray-500 uppercase tracking-widest"
                        style={{ animationDirection: "reverse" }}
                    >
                        {renderItems(frontendStack)}
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="flex items-center lg:items-start justify-center mx-auto max-w-5xl px-6">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Card 1 */}
                        <div
                            ref={card1Ref}
                            className="stack-card p-8 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.04)] cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <i className={`${roles[0].icon} text-sm`} />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                                {roles[0].role}
                            </h4>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                {roles[0].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {roles[0].pills.map((pill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-medium tracking-widest text-white uppercase"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div
                            ref={card2Ref}
                            className="stack-card p-8 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.04)] cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <i className={`${roles[1].icon} text-sm`} />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                                {roles[1].role}
                            </h4>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                {roles[1].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {roles[1].pills.map((pill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-medium tracking-widest text-white uppercase"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div
                            ref={card3Ref}
                            className="stack-card p-8 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.04)] cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <i className={`${roles[2].icon} text-sm`} />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                                {roles[2].role}
                            </h4>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                {roles[2].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {roles[2].pills.map((pill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-medium tracking-widest text-white uppercase"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div
                            ref={card4Ref}
                            className="stack-card p-8 bg-white/5 border border-white/10 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.04)] cursor-pointer"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="w-10 h-10 bg-black border border-white/10 rounded-full flex items-center justify-center mb-6 text-white">
                                <i className={`${roles[3].icon} text-sm`} />
                            </div>
                            <h4 className="text-lg font-semibold text-white mb-3">
                                {roles[3].role}
                            </h4>
                            <p className="text-sm text-white leading-relaxed mb-4">
                                {roles[3].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {roles[3].pills.map((pill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-1.5 rounded-full border border-white/15 bg-black/40 text-xs font-medium tracking-widest text-white uppercase"
                                    >
                                        {pill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Stack;
