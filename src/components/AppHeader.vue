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

// Scroll to a section without putting #anchors into the address bar (scroll-margin-top keeps it under the header).
function go(event, id) {
  event.preventDefault()
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
}

function toggleLang() {
  setLang(lang.value === 'ua' ? 'en' : 'ua')
}

// The header is transparent at the very top and gets its white background on scroll.
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
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="inner">
      <a class="logo" href="#top" @click="go($event, 'top')">
        <img :src="logo.src" :alt="logo.alt" :width="logo.width" height="46" />
      </a>
      <nav class="nav">
        <a class="nav__about" href="#about" @click="go($event, 'about')">{{ t.nav.about }}</a>
        <a class="nav__mission" href="#about" @click="go($event, 'about')">{{ t.nav.mission }}</a>
        <a class="nav__contacts" href="#contacts" @click="go($event, 'contacts')">{{ t.nav.contacts }}</a>
        <button class="lang" type="button" @click="toggleLang">
          {{ t.langLabel }} <img :src="chevron" alt="" width="11" height="7" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* ---------- phone (Figma 390): logo + language only ---------- */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-h);
  z-index: 10;
  background: transparent;
  transition: background-color 0.3s ease;
}
.header--scrolled {
  background: rgba(255, 255, 255, 0.9);
}
.inner {
  height: 100%;
}
.logo {
  position: absolute;
  left: var(--pad-x);
  top: 31px;
  display: block;
  line-height: 0;
}
.logo img {
  width: auto;
  height: 33px;
}
.nav {
  position: absolute;
  right: var(--pad-x);
  top: 34px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  font: 400 15px/27px var(--f-body);
  text-transform: uppercase;
}
.nav a {
  display: none;
}
.lang {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  line-height: 27px;
  text-transform: uppercase;
}

/* ---------- tablet (Figma 768): about + contacts + language ---------- */
@media (min-width: 768px) {
  .logo {
    top: 74px;
  }
  .logo img {
    height: 46px;
  }
  .nav {
    top: 82px;
  }
  .nav .nav__about,
  .nav .nav__contacts {
    display: block;
  }
}

/* ---------- desktop (Figma 1440): full menu ---------- */
@media (min-width: 1440px) {
  .logo {
    left: 64px;
  }
  .nav {
    right: 64px;
    gap: 68px;
  }
  .nav .nav__mission {
    display: block;
  }
  .lang {
    margin-left: 7px;
  }
}
</style>
