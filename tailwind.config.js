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
        // Semantic theme tokens using CSS variables
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          disabled: 'var(--color-text-disabled)',
          inverse: 'var(--color-text-inverse)',
          link: 'var(--color-text-link)',
          'link-hover': 'var(--color-text-link-hover)',
        },
        bg: {
          base: 'var(--color-bg-base)',
          surface: 'var(--color-bg-surface)',
          elevated: 'var(--color-bg-elevated)',
          overlay: 'var(--color-bg-overlay)',
          backdrop: 'var(--color-bg-backdrop)',
        },
        surface: {
          base: 'var(--color-surface-base)',
          elevated: 'var(--color-surface-elevated)',
          hover: 'var(--color-surface-hover)',
          active: 'var(--color-surface-active)',
          disabled: 'var(--color-surface-disabled)',
        },
        border: {
          base: 'var(--color-border-base)',
          strong: 'var(--color-border-strong)',
          subtle: 'var(--color-border-subtle)',
        },
        divider: 'var(--color-divider)',
        icon: {
          primary: 'var(--color-icon-primary)',
          secondary: 'var(--color-icon-secondary)',
          tertiary: 'var(--color-icon-tertiary)',
          disabled: 'var(--color-icon-disabled)',
          inverse: 'var(--color-icon-inverse)',
        },
        interactive: {
          hover: 'var(--color-interactive-hover)',
          active: 'var(--color-interactive-active)',
          'focus-ring': 'var(--color-interactive-focus-ring)',
          disabled: 'var(--color-interactive-disabled)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
          text: 'var(--color-success-text)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          bg: 'var(--color-error-bg)',
          text: 'var(--color-error-text)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          bg: 'var(--color-warning-bg)',
          text: 'var(--color-warning-text)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          bg: 'var(--color-info-bg)',
          text: 'var(--color-info-text)',
        },
        accent: {
          cyan: 'var(--color-accent-cyan)',
          purple: 'var(--color-accent-purple)',
          amber: 'var(--color-accent-amber)',
          green: 'var(--color-accent-green)',
        },
        glass: {
          bg: 'var(--color-glass-bg)',
          border: 'var(--color-glass-border)',
          hover: 'var(--color-glass-hover)',
        },
        // Legacy support (deprecated, use semantic tokens above)
        background: 'var(--color-bg-base)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        accent: 'var(--color-info)',
        line: 'var(--color-border-base)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        base: 'var(--shadow-base)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
        inner: 'var(--shadow-inner)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}

