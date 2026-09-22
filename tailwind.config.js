/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: 'var(--color-bg)',
        'background-secondary': 'var(--color-bg-secondary)',
        surface: 'var(--color-surface)',
        'surface-strong': 'var(--color-surface-strong)',
        'surface-raised': 'var(--color-surface-raised)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        ghost: 'var(--color-ghost)',
        accent: 'var(--color-accent)',
        'accent-inverse': 'var(--color-accent-inverse)',
        signal: 'var(--color-signal)',
        'signal-ink': 'var(--color-signal-ink)',
        'signal-text': 'var(--color-signal-text)',
        'signal-tint': 'var(--color-signal-tint)',
        line: 'var(--color-border)',
        'line-strong': 'var(--color-border-strong)',
      },
      borderRadius: {
        card: '20px',
        media: '24px',
      },
      letterSpacing: {
        display: '-0.03em',
        tighter: '-0.04em',
        tight: '-0.02em',
        eyebrow: '0.12em',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
