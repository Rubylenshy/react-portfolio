// Hand-drawn duotone glyphs: a gradient shape sits behind a solid shape,
// offset so a sliver of colour peeks out — matching the reference screenshot's icon style.

export const DoIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="do-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <rect x="21" y="9" width="11" height="46" rx="5.5" fill="url(#do-grad)" />
        <path
            d="M28 16 C14 16 6 23 6 32 C6 41 14 48 28 48 C20 44 16 39 16 32 C16 25 20 20 28 16 Z"
            fill="currentColor"
        />
        <path
            d="M45 20 C38 20 33 25 33 32 C33 39 38 44 45 44 C41 41 39 37 39 32 C39 27 41 23 45 20 Z"
            fill="currentColor"
        />
    </svg>
);

export const FluentIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(4,4)">
            <path d="M12 15 L12 49 L38 32 Z" fill="var(--color-signal-text)" />
            <path d="M52 15 L52 49 L26 32 Z" fill="var(--color-signal-text)" />
        </g>
        <path d="M10 13 L10 47 L36 30 Z" fill="currentColor" />
        <path d="M50 13 L50 47 L24 30 Z" fill="currentColor" />
    </svg>
);

export const ExpectIcon = ({ className }) => (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="expect-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--color-signal)' }} />
                <stop offset="1" style={{ stopColor: 'var(--color-signal-text)' }} />
            </linearGradient>
        </defs>
        <g transform="translate(5,5)">
            <circle cx="30" cy="12" r="9" fill="url(#expect-grad)" />
            <path d="M8 36 C8 26 18 20 30 20 C42 20 52 26 52 36 L52 42 L8 42 Z" fill="url(#expect-grad)" />
        </g>
        <circle cx="30" cy="12" r="9" fill="currentColor" />
        <path d="M8 36 C8 26 18 20 30 20 C42 20 52 26 52 36 L52 42 L8 42 Z" fill="currentColor" />
    </svg>
);
