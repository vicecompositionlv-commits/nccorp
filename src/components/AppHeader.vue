<script setup>
import { ref, inject } from 'vue'
import { LANGS } from '../i18n.js'
import logo from '../assets/logo.svg'
import chevron from '../assets/chevron.svg'

const t = inject('t')
const lang = inject('lang')
const setLang = inject('setLang')
const open = ref(false)
const labels = { ua: 'UA', en: 'ENG' }

function choose(code) {
  setLang(code)
  open.value = false
}
</script>

<template>
  <header class="header">
    <a class="logo" href="#top">
      <img :src="logo" alt="NC Корпорація ЕНСІ" width="275" height="46" />
    </a>
    <nav class="nav">
      <a href="#about">{{ t.nav.about }}</a>
      <a href="#mission">{{ t.nav.mission }}</a>
      <a href="#contacts">{{ t.nav.contacts }}</a>
      <div class="lang-wrap">
        <button class="lang" type="button" :aria-expanded="open" @click="open = !open">
          {{ t.langLabel }} <img :src="chevron" alt="" width="11" height="7" />
        </button>
        <ul v-if="open" class="lang-menu">
          <li v-for="code in LANGS.filter((c) => c !== lang)" :key="code">
            <button type="button" @click="choose(code)">{{ labels[code] }}</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1440px;
  height: 195px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.9);
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
.lang-wrap {
  position: relative;
  margin-left: 7px;
}
.lang {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  line-height: 27px;
  text-transform: uppercase;
}
.lang-menu {
  position: absolute;
  right: 0;
  top: 32px;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  min-width: 72px;
}
.lang-menu button {
  display: block;
  width: 100%;
  padding: 6px 14px;
  text-align: left;
  text-transform: uppercase;
}
.lang-menu button:hover {
  background: #f3f3f3;
}
</style>
