<script setup>
import { ref, inject, computed, onMounted, onBeforeUnmount } from 'vue'
import logoUa from '../assets/logo-ua.svg'
import logoEn from '../assets/logo-en.svg'
import chevron from '../assets/chevron.svg'

const t = inject('t')
const lang = inject('lang')
const setLang = inject('setLang')

const logo = computed(() =>
  lang.value === 'ua'
    ? { src: logoUa, width: 275, alt: 'NC Корпорація ЕНСІ' }
    : { src: logoEn, width: 311, alt: 'NC Corporation' },
)

function toggleLang() {
  setLang(lang.value === 'ua' ? 'en' : 'ua')
}

// The header is hidden while the page is at the very top and slides in on scroll.
const scrolled = ref(false)
function onScroll() {
  scrolled.value = window.scrollY > 0
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ 'header--visible': scrolled }">
    <a class="logo" href="#top">
      <img :src="logo.src" :alt="logo.alt" :width="logo.width" height="46" />
    </a>
    <nav class="nav">
      <a href="#about">{{ t.nav.about }}</a>
      <a href="#about">{{ t.nav.mission }}</a>
      <a href="#contacts">{{ t.nav.contacts }}</a>
      <button class="lang" type="button" @click="toggleLang">
        {{ t.langLabel }} <img :src="chevron" alt="" width="11" height="7" />
      </button>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 50%;
  width: 1440px;
  height: 195px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -100%);
  transition: transform 0.3s ease;
}
.header--visible {
  transform: translate(-50%, 0);
}
.logo {
  position: absolute;
  left: 64px;
  top: 74px;
  display: block;
  line-height: 0;
}
.nav {
  position: absolute;
  right: 64px;
  top: 82px;
  display: flex;
  align-items: flex-start;
  gap: 68px;
  font: 400 15px/27px var(--f-body);
  text-transform: uppercase;
}
.lang {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 7px;
  line-height: 27px;
  text-transform: uppercase;
}
</style>
