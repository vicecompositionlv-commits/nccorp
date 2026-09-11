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

// Phone menu (burger). Closes after a link is chosen.
const open = ref(false)
function close() {
  open.value = false
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
  <header class="header" :class="{ 'header--scrolled': scrolled, 'header--open': open }">
    <div class="inner">
      <a class="logo" href="#top" @click="close">
        <img :src="logo.src" :alt="logo.alt" :width="logo.width" height="46" />
      </a>
      <button class="burger" type="button" :aria-expanded="open" aria-label="Меню" @click="open = !open">
        <span></span><span></span><span></span>
      </button>
      <nav class="nav" :class="{ 'nav--open': open }">
        <a href="#about" @click="close">{{ t.nav.about }}</a>
        <a href="#about" @click="close">{{ t.nav.mission }}</a>
        <a href="#contacts" @click="close">{{ t.nav.contacts }}</a>
        <button class="lang" type="button" @click="toggleLang">
          {{ t.langLabel }} <img :src="chevron" alt="" width="11" height="7" />
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* ---------- phone (default) ---------- */
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
.header--scrolled,
.header--open {
  background: rgba(255, 255, 255, 0.9);
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
.logo {
  display: block;
  line-height: 0;
}
.logo img {
  width: auto;
  height: 30px;
}
.burger {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  margin-right: -10px;
}
.burger span {
  width: 22px;
  height: 2px;
  background: var(--c-text);
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.burger[aria-expanded='true'] span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.burger[aria-expanded='true'] span:nth-child(2) { opacity: 0; }
.burger[aria-expanded='true'] span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.nav {
  position: fixed;
  top: var(--header-h);
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  flex-direction: column;
  gap: 28px;
  padding: 40px var(--pad-x);
  background: #fff;
  font: 400 18px/1.4 var(--f-body);
  text-transform: uppercase;
}
.nav--open {
  display: flex;
}
.lang {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  text-transform: uppercase;
}

/* ---------- tablet ---------- */
@media (min-width: 768px) {
  .logo img {
    height: 38px;
  }
  .burger {
    display: none;
  }
  .nav {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 36px;
    padding: 0;
    background: transparent;
    font-size: 14px;
  }
  .lang {
    margin: 0 0 0 8px;
  }
}

/* ---------- desktop: exact mockup coordinates ---------- */
@media (min-width: 1440px) {
  .inner {
    display: block;
  }
  .logo {
    position: absolute;
    left: 64px;
    top: 74px;
  }
  .logo img {
    height: 46px;
  }
  .nav {
    position: absolute;
    left: auto;
    bottom: auto;
    right: 64px;
    top: 82px;
    align-items: flex-start;
    gap: 68px;
    font: 400 15px/27px var(--f-body);
  }
  .lang {
    margin-left: 7px;
    line-height: 27px;
  }
}
</style>
