// Runs after the client and SSR builds: injects the rendered markup into dist/index.html (Ukrainian)
// and dist/en/index.html (English), with per-language <title>, description, canonical and og tags.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = resolve('dist')
const { render } = await import(pathToFileURL(resolve(dist, '.server/entry-server.js')).href)
const template = readFileSync(resolve(dist, 'index.html'), 'utf8')
const site = template.match(/rel="canonical" href="([^"]*)"/)?.[1] ?? '/'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const pages = [
  { lang: 'ua', dir: '', htmlLang: 'uk', locale: 'uk_UA' },
  { lang: 'en', dir: 'en/', htmlLang: 'en', locale: 'en_US' },
]

for (const { lang, dir, htmlLang, locale } of pages) {
  const { html, meta } = await render(lang)
  const url = site + dir
  const out = template
    .replace('<div id="app"></div>', `<div id="app">${html}</div>`)
    .replace(/<html lang="[^"]*">/, `<html lang="${htmlLang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(name="description" content=")[^"]*/, `$1${esc(meta.description)}`)
    .replace(/(property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`)
    .replace(/(property="og:description" content=")[^"]*/, `$1${esc(meta.description)}`)
    .replace(/(property="og:url" content=")[^"]*/, `$1${url}`)
    .replace(/(property="og:locale" content=")[^"]*/, `$1${locale}`)
    .replace(/(rel="canonical" href=")[^"]*/, `$1${url}`)
  mkdirSync(resolve(dist, dir || '.'), { recursive: true })
  writeFileSync(resolve(dist, dir, 'index.html'), out)
  console.log(`prerendered ${dir || '/'} (${lang})`)
}

rmSync(resolve(dist, '.server'), { recursive: true, force: true })
