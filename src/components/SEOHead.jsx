import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Reuben Oluwafemi'
const SITE_URL = 'https://www.usereuben.com'
const DEFAULT_IMAGE = `${SITE_URL}/og-cover.png`
const DEFAULT_DESCRIPTION =
  'Reuben Oluwafemi is a Design & Frontend Engineer specializing in crafting intuitive user interfaces and developing innovative WordPress plugins.'

/**
 * SEOHead — drop into any page to set <title>, meta, OG, Twitter Card,
 * canonical, and optional JSON-LD schema.
 *
 * @param {string}  title        - Page title (appended with " — Reuben Oluwafemi")
 * @param {string}  description  - Meta description (150–160 chars ideal)
 * @param {string}  canonical    - Full canonical URL for this page
 * @param {string}  image        - Absolute URL of OG image (1200×630)
 * @param {string}  type         - OG type: "website" | "article"
 * @param {object}  schema       - JSON-LD schema object (or array)
 */
const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  schema = null,
}) => {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Design & Plugin Engineer`

  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical || SITE_URL} />
      <meta property="og:type" content={type} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@tomoloj_" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* ── JSON-LD Schema ── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}

export default SEOHead
