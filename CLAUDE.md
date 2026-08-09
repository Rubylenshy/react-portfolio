# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Personal portfolio site for Reuben Oluwafemi (usereuben.com) — a React SPA with a projects showcase, a blog, and a proposal page. Static content (projects, blog metadata) is stored as JSON; no backend/CMS.

## Tech stack

- **React 18.2** + **Vite 5** (`@vitejs/plugin-react`), JSX only — **no TypeScript**.
- **react-router-dom v6** for routing.
- **Tailwind CSS** for utility classes, plus one large hand-written global stylesheet (`src/assets/css/index.css`) that defines theme tokens as CSS custom properties. No CSS modules, no styled-components.
- **GSAP** (+ `ScrollTrigger`) and **Lenis** for animation and smooth scrolling.
- **lucide-react** for icons.
- **@emailjs/browser** for the contact form (needs `VITE_EMAILJS_PUBLIC_KEY`, `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID` env vars — see `.env.example`).
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
                        also where the global hooks (useLenis, useCursor, useMagneticButtons,
                        useAnimations) are invoked once for the whole app.
  main.jsx             ReactDOM root, imports global CSS.
  pages/               Route-level components: Home, Projects, Blogs, BlogPost,
                        SampleProposal, NotFound.
  components/          Flat list of reusable/section components (Hero, About, Work, Stack,
                        Contact, ContactModal, Footer, Navigation, BlogNavigation,
                        Breadcrumb, Cursor, Loader, SEOHead, GlassyBubbles, Clients, ...).
                        No per-component folders, no co-located CSS/tests.
    icons/             Icon components.
  context/
    ThemeContext.jsx   Only context in the app; persists dark/light theme to localStorage
                        (defaults to 'dark'), sets data-theme attribute on <html>.
  hooks/               camelCase use*.js hooks, mostly GSAP/scroll side effects:
                        useLenis, useCursor, useMagneticButtons, useAnimations.
  assets/
    data/
      blogs.json       Blog post metadata (array, newest first) — see Blog system below.
      projects.json    Project entries driving the Projects/Work section (title, subtitle,
                        type frontend|plugin, description, mockup image, bullet_points,
                        stack_icons, live_link, code_link, direction for alternating layout).
    css/
      index.css        Global styles + theme tokens (CSS custom properties).
      clients.css       Client-logo section styles.
    images/

public/
  blogs/*.md           Raw blog post markdown, fetched at runtime by BlogPost.jsx.
  robots.txt, sitemap.xml, llms.txt   Explicitly rewritten in vercel.json ahead of the SPA
                        catch-all so they're served correctly on Vercel.
  images/               Static images (profile photo, client logos).
```

## Key patterns

- **Routing** is declared centrally in `src/App.jsx`: `/`, `/projects`, `/blogs`, `/blogs/:slug`, `/proposal`, and a `*` catch-all → `NotFound`.
- **Global hooks run once**, in `App.jsx`, not per-page. `useAnimations` guards against replaying the loader/hero intro animation on route changes using `window.__loaderPlayed` / `window.__homeVisited` globals — be careful when touching this logic, it's stateful across route navigations, not component mounts.
- **Components are flat** — one `.jsx` file per component directly under `src/components/`, default-exported, matching the filename in PascalCase. Styling is Tailwind utility classes plus the global CSS files; there's no per-component stylesheet convention to follow.
- **Data is static JSON**, imported directly into pages (e.g. `import blogsData from '../assets/data/blogs.json'`). There is no API layer.

## Blog system

Two artifacts must be kept in sync when adding a post (see `.claude/skills/add-blog-post/` if present — it automates this):

1. **`public/blogs/<slug>.md`** — pure Markdown, no frontmatter. Convention: single `#` title, a `>` blockquote lede, `##`/`###` sections (auto-extracted into a sticky table of contents), fenced code blocks with language tags, a closing `## Takeaway` section, italic CTA footer.
2. **`src/assets/data/blogs.json`** — array of metadata, **prepend new entries (newest first)**: `{ slug, title, excerpt, date, author, authorAvatar, tags[], thumbnail, readingTime }`. `thumbnail` is a **Google Drive file ID**, not a URL — it's converted to a `lh3.googleusercontent.com` URL at render time by `getThumbnailSrc()` in `src/pages/BlogPost.jsx`.

`src/pages/BlogPost.jsx` renders posts: reads `slug` from the route, looks up metadata in `blogs.json`, `fetch()`s the matching `.md` from `/blogs/<slug>.md`, and renders it with `ReactMarkdown` (code blocks via `react-syntax-highlighter`, vscDarkPlus theme). It also builds `Article` JSON-LD for SEO and drives an `IntersectionObserver`-based active-heading TOC. `src/pages/Blogs.jsx` is the listing page.

## SEO

- `src/components/SEOHead.jsx` is the reusable `<Helmet>` wrapper — sets title, meta description, canonical link, Open Graph tags, Twitter Card, and an optional JSON-LD `schema` prop. `SITE_URL` (`https://www.usereuben.com`) and `SITE_NAME` constants live here. Use this component on every page rather than hand-rolling `<Helmet>` calls.
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` are static files, explicitly rewritten in `vercel.json` ahead of the SPA fallback rewrite.
- **Known gap:** `sitemap.xml` only lists 3 static URLs (`/`, `/blogs`, `/projects`) — it does not include individual blog post URLs. Keep this in mind if asked to add/fix sitemap coverage.

## Conventions

- Components/pages: PascalCase `.jsx`, default export matching the filename.
- Hooks: camelCase `use*.js` in `src/hooks/`, one named export each.
- Data files: lowercase plural `.json` (`blogs.json`, `projects.json`).
- CSS theme tokens: kebab-case custom properties (`--color-text-primary`, etc.), switched via `html[data-theme="dark"|"light"]`.
- Blog slugs: kebab-case, matching the `.md` filename exactly.

## Deploy

Hosted on **Vercel**. `vercel.json` handles SPA rewrites (all routes → `index.html`, except `robots.txt`/`sitemap.xml`/`llms.txt` which are served directly) and sets long-lived cache headers (`max-age=31536000, immutable`) for `/assets/*` and `*.webp`. Required env vars for the contact form are the three `VITE_EMAILJS_*` keys.
