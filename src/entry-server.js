import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'
import { messages } from './i18n.js'

/** Renders the whole page for one language. Used by scripts/prerender.mjs after `vite build`. */
export async function render(lang) {
  const html = await renderToString(createSSRApp(App, { initialLang: lang }))
  return { html, meta: messages[lang].meta }
}
