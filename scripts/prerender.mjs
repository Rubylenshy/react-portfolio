// Build-time prerender: renders every route with React on the server and writes one HTML file
// per route into dist/, so crawlers (and first paint) get real content instead of an empty
// <div id="root">. Runs after `vite build` (client) and `vite build --ssr` (dist-ssr/).
//
// Files are written as dist/<route>.html; vercel.json's cleanUrls serves /about from
// about.html, and dist/404.html is served with a real 404 status for unknown paths.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const dist = path.join(root, 'dist')
const posts = JSON.parse(fs.readFileSync(path.join(root, 'src/pages/Blog/data/blogs.json'), 'utf8'))

const STATIC_ROUTES = [
  '/',
  '/about',
  '/projects',
  '/services',
  '/start-a-project',
  '/blogs',
  '/proposal',
  '/protected-task-board',
]

const { render } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
// dist/index.html gets overwritten with the prerendered homepage, so keep the pristine Vite
// output aside; re-running this script without a fresh `vite build` then still works.
const templateCopy = path.join(root, 'dist-ssr/index.template.html')
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (template.includes('<div id="root"></div>')) fs.writeFileSync(templateCopy, template)
else template = fs.readFileSync(templateCopy, 'utf8')

// Default title/description/OG tags in index.html carry data-rh="true"; drop them and let each
// route's Helmet output take their place.
const baseTemplate = template
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<meta\b[^>]*\bdata-rh="true"[^>]*>\s*/g, '')

// JSON inside <script> must not be able to close the tag
const safeJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c')

async function renderPage(url, prerenderData) {
  const { html, head } = await render(url, prerenderData)
  if (!html.includes('<h1')) throw new Error(`Prerender of ${url} produced no <h1> — page content missing?`)
  const dataScript = prerenderData
    ? `<script id="__PRERENDER_DATA__" type="application/json">${safeJson(prerenderData)}</script>\n  `
    : ''
  return baseTemplate
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>\n    ${dataScript}`)
}

function write(file, contents) {
  const out = path.join(dist, file)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, contents)
  console.log(`  prerendered ${file} (${(contents.length / 1024).toFixed(1)} kB)`)
}

const fileFor = (url) => (url === '/' ? 'index.html' : `${url.slice(1)}.html`)

for (const url of STATIC_ROUTES) write(fileFor(url), await renderPage(url))

for (const { slug } of posts) {
  const markdown = fs.readFileSync(path.join(root, 'public/blogs', `${slug}.md`), 'utf8')
  const url = `/blogs/${slug}`
  write(fileFor(url), await renderPage(url, { blogMarkdown: { [slug]: markdown } }))
}

// Any unmatched path renders NotFound (noindex); Vercel serves this with a 404 status
write('404.html', await renderPage('/__not-found__'))
