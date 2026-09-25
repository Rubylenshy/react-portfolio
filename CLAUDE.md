# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Personal portfolio site for Reuben Oluwafemi (usereuben.com) — a React SPA with a projects archive, a services page, a blog, a start-a-project intake form, and a proposal page. Static content (projects, capabilities, services copy, blog metadata) is stored as JSON; no backend/CMS.

## Tech stack

- **React 18.2** + **Vite 5** (`@vitejs/plugin-react`), JSX only — **no TypeScript**.
- **react-router-dom v6** for routing.
- **Tailwind CSS 3.4** for utility classes, plus one large hand-written global stylesheet (`src/shared/css/index.css`) that defines theme tokens as CSS custom properties. No CSS modules, no styled-components.
- **GSAP** (+ `ScrollTrigger`) and **Lenis** for animation and smooth scrolling.
- **lucide-react** for icons (Font Awesome + Devicon via CDN for brand/tech logos).
- **@emailjs/browser** for the start-a-project form (needs `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` env vars — see `.env.example`).
- **react-helmet-async** for `<head>`/SEO tag management.
- **react-markdown** + `remark-gfm` + `rehype-slug` + `rehype-autolink-headings` + `react-syntax-highlighter` for rendering blog posts.
- **No test framework, no ESLint config, no Prettier config** are set up in this repo. Don't assume `npm run lint` or `npm test` exist — they don't.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # production build
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  App.jsx              Central route table; wraps app in HelmetProvider > ThemeProvider;
                        renders the skip link, the Backdrop (ShockwaveField + grain, skipped on
                        /proposal), Loader and Cursor; invokes the
                        global hooks (useLenis, useCursor, useMagneticButtons, useAnimations) once.
  main.jsx             ReactDOM root, imports global CSS.
  pages/<Page>/        One folder per route: <Page>.jsx plus page-only components/, data/, css/.
    Home/              Home.jsx; components/ Hero, Work, Stack.
    About/             About.jsx; components/ SkillsChart, ExperienceTimeline, SkillIcons,
                        BirthdayConfetti, WishesFab, WishesModal.
    Services/          Services.jsx + data/services.json (engagement models, operations,
                        scope statement, fit, next steps).
    StartProject/      StartProject.jsx — the /start-a-project intake form (EmailJS).
    Projects/, Blog/ (Blogs, BlogPost, components/Breadcrumb, data/blogs.json),
    SampleProposal/, TaskBoard/, NotFound/
  shared/
    components/        Cross-page components: Navigation, Footer, Contact (closing CTA band),
                        AboutIntro, Showreel, ShockwaveField (active background),
                        BeamField (previous background, kept but not mounted), Loader, Cursor, SEOHead,
                        Eyebrow ("01 — LABEL" marker), Pill (every button),
                        CapabilityIcons (+ CAPABILITY_ICONS lookup).
    context/
      ThemeContext.jsx Only context. Mode 'light' | 'dark' | 'system' persisted to
                        localStorage (default 'dark'); exposes { theme, mode, toggleTheme };
                        sets data-theme on <html> and updates meta theme-color. An inline
                        script in index.html applies the saved theme before first paint.
    hooks/             useLenis, useCursor, useMagneticButtons, useAnimations,
                        useLocalStorageState.
    data/
      projects.json    Project entries driving Work + Projects (title, subtitle, type,
                        description, mockup, bullet_points, stack_icons, live_link, code_link).
      capabilities.json The four roles (Plugin Developer, Frontend Engineer, API Integration
                        Specialist, Performance Optimizer) used by Stack, Services and the
                        StartProject "Where can I help?" cards.
    css/index.css      Theme tokens + global component classes.

public/
  blogs/*.md           Raw blog post markdown, fetched at runtime by BlogPost.jsx.
  robots.txt, sitemap.xml, llms.txt   Explicitly rewritten in vercel.json ahead of the SPA
                        catch-all so they're served correctly on Vercel.
  images/, videos/     Static images (headshot, client logos) and the showreel video.
```

## Design system

Dark, minimal "creative studio" look: near-black canvas, hairline borders, huge tight
display type, and a single acid-lime signal color used sparingly.

- **Tokens** live in `src/shared/css/index.css` under `html[data-theme="dark"|"light"]` and are
  mirrored in `tailwind.config.js` (`text-primary`, `text-muted`, `bg-surface-raised`,
  `text-signal-text`, `rounded-card`, `rounded-media`, `tracking-display`, `tracking-eyebrow`,
  `ease-out-expo`). Never hardcode hex colors in JSX; SampleProposal's scoped cream/gold
  palette and TaskBoard's label colors are the deliberate exceptions. Legacy names
  (`--color-surface-strong`, `--color-accent-tint`) are kept as aliases for TaskBoard/WishesModal.
  TaskBoard's shared classes (`BTN_*`, `CARD_CLASS` in `kanbanConstants.js`) map onto `.pill` /
  `.card` (`.pill-danger` exists for destructive actions); its user-picked group/category colors
  are the only raw hexes, and `badgeStyle()` mixes label text toward the primary text color for contrast.
- `--color-accent` is the **invert pill** (white on dark, black on light). `--color-signal`
  is the **lime**, used as a *fill* only (with `--color-signal-ink` text). When lime is used
  as *text*, use `--color-signal-text` / `text-signal-text`, which darkens to olive in light
  mode to keep AA contrast.
- **Selection** uses `--color-selection-bg/-ink` (lime on dark, ink on light). Don't add
  Tailwind `selection:` utilities.
- **Background:** `ShockwaveField` is a fixed `z-index:-1` WebGL canvas: a noise-distorted
  halftone ring expanding from the center on a fixed 16px dot grid, 13s loop. Knobs: `pitch`
  (dot spacing, CSS px) and `noiseAmp` (ring deviation as a fraction of radius), set in `App.jsx`.
  Its palettes (dark: #000108 → #0BD1FF ramp; light: blues on off-white) live in the component's
  `PALETTES`, not CSS tokens. The ring's outline and hot nodes are computed on the CPU into a
  512×1 angle texture per frame; timeline tuning is in `waveState()`. It caps at 60fps, pauses
  when hidden, and renders one static frame under reduced motion. Sections must NOT set an opaque
  page background (`bg-[var(--color-bg)]`) or they hide it — cards supply surfaces. The older
  `BeamField` (CSS beams, `--beam-*` tokens) is kept and can be swapped back in `App.jsx`.
- **Component classes** (global CSS): `.pill` + `.pill-invert|signal|ghost|active` (+ `.pill-sm`,
  `.pill-lg`, `.pill-arrow`), `.icon-btn`, `.tag` / `.tag-signal`, `.card` / `.card-hover`,
  `.media` / `.media-hover` (rounded media frame with 1.02 hover zoom), `.eyebrow`,
  `.signal-dot` (+ `.signal-dot-pulse`), `.highlight`, `.field` / `.field-label` / `.field-error`
  (underline inputs), `.aurora` and `.grain` backgrounds, `.ghost-text` watermark,
  `.display-ghost` (outlined ghost line of a display lockup). These sit **after** Tailwind's
  utilities, so they win over conflicting utilities — use `!` utilities to override (e.g.
  `!hidden` on a pill, `!rounded-[16px]` on a `.media`), and don't put layout properties
  (e.g. `position`) on them that a utility needs to override.
- **Section numbering:** every major section gets an `<Eyebrow num="0N">` with its existing
  label; numbering restarts per page. `Contact` takes a `num` prop (default `'04'`).
- **Fonts stay Inter + JetBrains Mono.** Minimum UI text size is 11px.
- **Dimmed cards** ("Not a Fit", "What I avoid") use `opacity-75`, not lower — lower drops body
  text below AA.
- **Mobile nav** is the bottom dock in `Navigation.jsx` (kept by choice); the top bar is a
  floating pill inset from the viewport.

## Motion & accessibility

- **Scroll reveals** (`useAnimations`): mark elements with `data-reveal`, or put
  `data-reveal-group` on a parent to reveal its direct children with a 60ms stagger
  (opacity, 8px blur, +24px y, 600ms `expo.out`). Reveals animate back to the element's own
  computed opacity. Unannotated `section`s (not `data-hero`) fall back to revealing their
  `h1, h2, h3, p`. `data-parallax="N"` adds slow parallax. A MutationObserver picks up content
  added by later routes, prunes detached triggers and debounces `ScrollTrigger.refresh()`.
- **`prefers-reduced-motion`** is respected everywhere: no Lenis (native scroll; callers must
  fall back when `window.lenis` is undefined), no reveals/parallax/loader/beams, no magnetic
  pull, CSS animations stopped, showreel doesn't autoplay.
- Global `:focus-visible` ring, "Skip to content" link targeting `#main` (each page puts
  `id="main"` on its first content element), `aria-current` on nav links. Keep decorative
  images `alt=""` and give icon-only links an `aria-label`.
- Cursor and magnetic buttons use **delegated** document listeners, so elements rendered by
  later routes work without re-binding.

## Key patterns

- **Routing** is declared centrally in `src/App.jsx`: `/`, `/about`, `/projects`, `/services`, `/start-a-project`, `/blogs`, `/blogs/:slug`, `/proposal`, `/protected-task-board`, and a `*` catch-all → `NotFound`.
- **Global hooks run once**, in `App.jsx`, not per-page. The loader timeline in `useAnimations` plays the hero intro only on the very first load (`window.__loaderPlayed`); `Home.jsx` plays a short intro itself on any later arrival at Home. Be careful touching this — it's stateful across route navigations, not component mounts.
- **Components** — one default-exported `.jsx` per component, PascalCase filename. Page-only components live in `src/pages/<Page>/components/`; anything used by more than one page lives in `src/shared/components/`. Styling is Tailwind utilities plus the global component classes (see Design system).
- **Data is static JSON**, imported directly into pages (e.g. `import services from './data/services.json'`). There is no API layer.
- **Start a project form** sends via `emailjs.send` with params `from_name, email, company, project_type` (selected capabilities, comma-joined), `budget, timeline, message` (budget/timeline are also appended to `message` so older EmailJS templates still show them).

## Blog system

Two artifacts must be kept in sync when adding a post (see `.claude/skills/add-blog-post/` if present — it automates this):

1. **`public/blogs/<slug>.md`** — pure Markdown, no frontmatter. Convention: single `#` title, a `>` blockquote lede, `##`/`###` sections (auto-extracted into a sticky table of contents), fenced code blocks with language tags, a closing `## Takeaway` section, italic CTA footer.
2. **`src/pages/Blog/data/blogs.json`** — array of metadata, **prepend new entries (newest first)**: `{ slug, title, excerpt, date, author, authorAvatar, tags[], thumbnail, readingTime }`. `thumbnail` is a **Google Drive file ID**, not a URL — it's converted to a `lh3.googleusercontent.com` URL at render time by `getThumbnailSrc()` in `src/pages/Blog/BlogPost.jsx` and `Blogs.jsx`.

`src/pages/Blog/BlogPost.jsx` renders posts: reads `slug` from the route, looks up metadata in `blogs.json`, `fetch()`s the matching `.md` from `/blogs/<slug>.md`, and renders it with `ReactMarkdown` (code blocks via `react-syntax-highlighter` — vscDarkPlus in dark, oneLight in light). It also builds `Article` JSON-LD for SEO and drives an `IntersectionObserver`-based active-heading TOC. `src/pages/Blog/Blogs.jsx` is the listing page: newest post as a featured card (while no tag/search filter is active), a tag filter row built from `tags`, and search.

## SEO

- `src/shared/components/SEOHead.jsx` is the reusable `<Helmet>` wrapper — sets title, meta description, canonical link, Open Graph tags, Twitter Card, and an optional JSON-LD `schema` prop. `SITE_URL` (`https://www.usereuben.com`) and `SITE_NAME` constants live here. Use this component on every page rather than hand-rolling `<Helmet>` calls.
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` are static files, explicitly rewritten in `vercel.json` ahead of the SPA fallback rewrite.
- **Known gap:** `sitemap.xml` only lists 3 static URLs (`/`, `/blogs`, `/projects`) — it does not include `/about`, `/services`, `/start-a-project` or individual blog post URLs. Keep this in mind if asked to add/fix sitemap coverage.

## Conventions

- Components/pages: PascalCase `.jsx`, default export matching the filename.
- Hooks: camelCase `use*.js` in `src/shared/hooks/`, one named export each.
- Data files: lowercase plural `.json` (`blogs.json`, `projects.json`, `capabilities.json`).
- CSS theme tokens: kebab-case custom properties (`--color-text-primary`, etc.), switched via `html[data-theme="dark"|"light"]`.
- Blog slugs: kebab-case, matching the `.md` filename exactly.

## Deploy

Hosted on **Vercel**. `vercel.json` handles SPA rewrites (all routes → `index.html`, except `robots.txt`/`sitemap.xml`/`llms.txt` which are served directly) and sets long-lived cache headers (`max-age=31536000, immutable`) for `/assets/*` and `*.webp`. Required env vars for the start-a-project form are the three `VITE_EMAILJS_*` keys.
