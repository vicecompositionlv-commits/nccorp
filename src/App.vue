<script setup>
import { ref, computed, provide, watchEffect } from 'vue'
import { messages, LANGS, loadLang, saveLang } from './i18n.js'
import AppHeader from './components/AppHeader.vue'

function initialLang() {
  const q = new URLSearchParams(window.location.search).get('lang')
  return LANGS.includes(q) ? q : loadLang()
}

const lang = ref(initialLang())
const t = computed(() => messages[lang.value])
function setLang(code) {
  lang.value = code
  saveLang(code)
}
watchEffect(() => {
  document.documentElement.lang = lang.value === 'ua' ? 'uk' : 'en'
})

provide('t', t)
provide('lang', lang)
provide('setLang', setLang)
</script>

<template>
  <div class="canvas">
    <AppHeader />
    <main>
      <h1 style="white-space: pre-line; padding-top: 240px">{{ t.hero.title }}</h1>
    </main>
  </div>
</template>
