import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function pagesBase() {
  const repo = process.env.GITHUB_REPOSITORY // "owner/name" in GitHub Actions
  if (!repo) return '/'
  const name = repo.split('/')[1]
  return name.endsWith('.github.io') ? '/' : `/${name}/`
}

/** Emits robots.txt and sitemap.xml (with uk/en alternates) into the client build. */
function seoFiles() {
  let ssr = false
  let site = '/'
  return {
    name: 'ensi-seo-files',
    apply: 'build',
    configResolved(config) {
      ssr = !!config.build.ssr
      site = config.env.VITE_SITE_URL || '/'
    },
    generateBundle() {
      if (ssr) return
      const alternates = `
    <xhtml:link rel="alternate" hreflang="uk" href="${site}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site}en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site}"/>`
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${site}</loc>${alternates}
  </url>
  <url>
    <loc>${site}en/</loc>${alternates}
  </url>
</urlset>
`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${site}sitemap.xml\n` })
    },
  }
}

export default defineConfig({
  plugins: [vue(), seoFiles()],
  base: pagesBase(),
  test: {
    environment: 'jsdom',
  },
})
