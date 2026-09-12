<script setup>
import { ref, computed, provide, watchEffect, onMounted } from 'vue'
import { messages, LANGS, loadLang, saveLang } from './i18n.js'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import ContactsSection from './components/ContactsSection.vue'

// `initialLang` is passed by the prerender script; in the browser the language comes from the URL.
const props = defineProps({ initialLang: { type: String, default: '' } })
const isBrowser = typeof window !== 'undefined'
const EN_PATH = /\/en\/?$/

function langFromUrl() {
  if (props.initialLang) return props.initialLang
  if (!isBrowser) return 'ua'
  const q = new URLSearchParams(window.location.search).get('lang')
  if (LANGS.includes(q)) return q
  return EN_PATH.test(window.location.pathname) ? 'en' : 'ua'
}

const lang = ref(langFromUrl())
const t = computed(() => messages[lang.value])

function setLang(code) {
  lang.value = code
  saveLang(code)
  if (!isBrowser) return
  // Keep the URL in sync so "/" is Ukrainian and "/en/" is English (matches the prerendered pages).
  const path = import.meta.env.BASE_URL + (code === 'en' ? 'en/' : '')
  window.history.replaceState(null, '', path + window.location.hash)
}

// The first client render must match the prerendered HTML, so a stored preference
// is applied only after mount, and only when the URL did not ask for a language.
onMounted(() => {
  const explicit = new URLSearchParams(window.location.search).has('lang') || EN_PATH.test(window.location.pathname)
  const stored = loadLang()
  if (!explicit && stored !== lang.value) setLang(stored)
})

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.lang = lang.value === 'ua' ? 'uk' : 'en'
  document.title = t.value.meta.title
  const description = document.querySelector('meta[name="description"]')
  if (description) description.setAttribute('content', t.value.meta.description)
})

provide('t', t)
provide('lang', lang)
provide('setLang', setLang)
</script>

<template>
  <div class="canvas">
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ContactsSection />
    </main>
  </div>
</template>
