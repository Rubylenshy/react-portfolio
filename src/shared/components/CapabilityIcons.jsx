// Hand-drawn duotone glyphs matching the style in SkillIcons.jsx —
// a gradient shape behind a solid shape, offset so a sliver of colour peeks out.

export const PluginIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="plugin-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <path
            transform="translate(5,5)"
            d="M14 14 H26 A6 6 0 0 1 38 14 H50 V26 A6 6 0 0 0 50 38 V50 H14 Z"
            fill="url(#plugin-grad)"
        />
        <path d="M14 14 H26 A6 6 0 0 1 38 14 H50 V26 A6 6 0 0 0 50 38 V50 H14 Z" fill="currentColor" />
    </svg>
);

export const LayersIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="layers-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <g transform="translate(5,5)">
            <rect x="10" y="12" width="34" height="9" rx="4.5" fill="url(#layers-grad)" />
            <rect x="15" y="25" width="34" height="9" rx="4.5" fill="url(#layers-grad)" />
            <rect x="20" y="38" width="34" height="9" rx="4.5" fill="url(#layers-grad)" />
        </g>
        <rect x="10" y="12" width="34" height="9" rx="4.5" fill="currentColor" />
        <rect x="15" y="25" width="34" height="9" rx="4.5" fill="currentColor" />
        <rect x="20" y="38" width="34" height="9" rx="4.5" fill="currentColor" />
    </svg>
);

export const ApiIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="api-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <g transform="translate(5,5)">
            <rect x="18" y="18" width="20" height="20" rx="4" fill="url(#api-grad)" />
            <g stroke="url(#api-grad)" strokeWidth="4" strokeLinecap="round">
                <path d="M24 18 V10" /><path d="M32 18 V10" />
                <path d="M24 38 V46" /><path d="M32 38 V46" />
                <path d="M18 24 H10" /><path d="M18 32 H10" />
                <path d="M38 24 H46" /><path d="M38 32 H46" />
            </g>
        </g>
        <rect x="18" y="18" width="20" height="20" rx="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <path d="M24 18 V10" /><path d="M32 18 V10" />
            <path d="M24 38 V46" /><path d="M32 38 V46" />
            <path d="M18 24 H10" /><path d="M18 32 H10" />
            <path d="M38 24 H46" /><path d="M38 32 H46" />
        </g>
    </svg>
);

export const GaugeIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <g transform="translate(5,5)">
            <path d="M8 42 A24 24 0 0 1 56 42" stroke="url(#gauge-grad)" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M32 42 L46 24" stroke="url(#gauge-grad)" strokeWidth="5" strokeLinecap="round" />
            <circle cx="32" cy="42" r="5" fill="url(#gauge-grad)" />
        </g>
        <path d="M8 42 A24 24 0 0 1 56 42" stroke="currentColor" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M32 42 L46 24" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle cx="32" cy="42" r="5" fill="currentColor" />
    </svg>
);

// Maps the `icon` key in shared/data/capabilities.json to its glyph
export const CAPABILITY_ICONS = {
    plugin: PluginIcon,
    layers: LayersIcon,
    api: ApiIcon,
    gauge: GaugeIcon,
};
