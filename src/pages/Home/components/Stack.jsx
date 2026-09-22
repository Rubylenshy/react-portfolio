import capabilities from "../../../shared/data/capabilities.json";
import { CAPABILITY_ICONS } from "../../../shared/components/CapabilityIcons";
import Eyebrow from "../../../shared/components/Eyebrow";
import Pill from "../../../shared/components/Pill";

// Tools row 1 — using devicon colored classes (grayscale until hovered)
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

const renderMarqueeItems = (items) =>
    [...items, ...items].map((item, idx) => (
        <span
            key={`${item.label}-${idx}`}
            className="marquee-icon mx-7 inline-flex items-center gap-2.5 shrink-0"
            aria-hidden={idx >= items.length ? "true" : undefined}
        >
            <i className={`${item.devicon} text-2xl`} style={{ lineHeight: 1 }} aria-hidden="true" />
            <span className="font-mono text-xs text-muted uppercase tracking-eyebrow">{item.label}</span>
        </span>
    ));

const Stack = () => {
    return (
        <section id="stack" className="max-w-[1400px] mx-auto grid-frame px-4 md:px-10 py-20 md:py-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16" data-reveal-group>
                <div>
                    <Eyebrow num="03" label="Stack" />
                    <h2 className="mt-6 text-5xl md:text-6xl font-semibold tracking-display leading-[0.95] text-primary">
                        Core Capabilities
                    </h2>
                </div>
                <div>
                    <Pill variant="ghost" to="/services" arrow>
                        All Services
                    </Pill>
                </div>
            </div>

            {/* Capability cards — tall, category label over role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" data-reveal-group>
                {capabilities.map((item, i) => {
                    const Icon = CAPABILITY_ICONS[item.icon];
                    return (
                        <article
                            key={item.id}
                            className="card card-hover group relative flex flex-col p-6 md:p-7 lg:aspect-[4/5] overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-10">
                                <Icon className="w-11 h-11 text-primary" />
                                <span className="font-mono text-[11px] tracking-eyebrow text-signal-text">
                                    0{i + 1}
                                </span>
                            </div>
                            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-muted mb-2">
                                Category
                            </p>
                            <h3 className="text-2xl font-semibold tracking-tight text-primary mb-3">
                                {item.role}
                            </h3>
                            <p className="text-sm text-muted leading-relaxed mb-6">{item.description}</p>
                            <ul className="mt-auto flex flex-wrap gap-1.5">
                                {item.pills.map((pill) => (
                                    <li key={pill} className="tag">{pill}</li>
                                ))}
                            </ul>
                        </article>
                    );
                })}
            </div>

            {/* Tool marquee */}
            <div
                className="mt-4 card py-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                data-reveal
            >
                <div className="space-y-6">
                    <div className="marquee-track">{renderMarqueeItems(tools)}</div>
                    <div className="marquee-track" style={{ animationDirection: "reverse" }}>
                        {renderMarqueeItems(frontendStack)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stack;
