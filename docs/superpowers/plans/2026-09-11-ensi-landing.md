# ENSI Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ENSI Corporation one-page landing from the Figma mockup as a Vue 3 + Vite site with UA/EN switching, deployed to GitHub Pages.

**Architecture:** Single page composed of four presentational components (header, hero, about+mission, contacts). A tiny i18n module holds both language dictionaries and persists the choice; `App.vue` owns the current language and provides the active dictionary to children. All layout is absolute-positioned to mockup coordinates inside a fixed 1440px-wide canvas.

**Tech Stack:** Vue 3.5, Vite 6, Vitest 3 + @vue/test-utils + jsdom for tests, Google Fonts (Onest, Inter), GitHub Actions for deploy.

## Global Constraints

- Desktop only. Page canvas is exactly 1440px wide, centered; no media queries.
- Heading font: `Onest` 700 (replaces Nekst). Body font: `Inter`. Both from Google Fonts with `display=swap`.
- Colors: text `#142218`, hero paragraph `#000`, accent line `#fece85`, muted line `rgba(48,44,44,.5)`, header bg `rgba(255,255,255,.9)`.
- Section heights: header 195, hero 900, about 705, contacts 705. Header is `position: fixed` and overlays the hero.
- Text content comes only from `src/i18n.js`. No hardcoded copy in components.
- Language persisted in `localStorage` key `ensi-lang`, default `ua`.
- Commit after every task with Conventional Commit messages, ending with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Mockup coordinates (frame origin = page top-left, px)

Header (fixed, 1440×195): logo 64,74 (275×46); nav top y=82: "about" x=888, "mission" x=1025, "contacts" x=1183, language x=1339 (right edge 1376). Nav gap ≈ 68px, language margin-left ≈ 75px.

Hero (1440×900): photo `hero.png` 1706×1280 at −16,−109. Overlay `hero-overlay.svg` (1294×1069, includes blur padding; visible shape 860×635 sits at 11,291 → SVG at −206,74). Title at 62,245 width 727, Onest 700 116/118. Paragraph at 62,626 width 644, Inter 500 20/34, color #000.

About (top 900, 1440×705): watermark `mark-nc-light.svg` 355×219 at 238,126. Left column x=62: label y=77 (Inter 400 15/27 uppercase) + line 35×1 #fece85 12px after label; heading y=160 width 293 (Onest 700 50/54); paragraph y=286 width 524 (Inter 500 20/34); divider 35×1 muted at y=527; caption y=565 (Inter 400 15/23 uppercase). Right column x=731: label y=77; heading y=160 width 544; paragraph y=286 width 662; three features at x=731/945/1193: icon top y=500 (chart icon y=494), caption y=571 (Inter 400 15/23 uppercase).

Contacts (top 1605, 1440×705): photo `contacts.png` 2475×1237 at −185,−13. Watermark `mark-nc-dark.svg` 859×543 at 501,69. Label y=77 white + line #fece85. Company name at 62,234 (Onest 700 20/54 white). Phone: icon 64,321 (23×25), text 99,307. Email: icon 64,362 (23×24), text 99,347.

---

### Task 1: Project scaffold, fonts, assets

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `src/main.js`, `src/App.vue` (placeholder), `src/styles/global.css`
- Create: `src/assets/` — copy all files from `%TEMP%\claude-figma\assets\` (hero.png, contacts.png, logo.svg, mark-nc-light.svg, mark-nc-dark.svg, icon-leaf.svg, icon-shield.svg, icon-chart.svg, icon-phone.svg, icon-mail.svg, chevron.svg, hero-overlay.svg)

**Interfaces:**
- Produces: CSS custom properties `--c-text`, `--c-accent`, `--c-muted`, `--f-head`, `--f-body`; class `.canvas` (1440px centered relative box); class `.label` (uppercase label with accent line after it).

- [ ] **Step 1: package.json**

```json
{
  "name": "ensi-landing",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "vue": "^3.5.13"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.1",
    "@vue/test-utils": "^2.4.6",
    "jsdom": "^26.0.0",
    "vite": "^6.1.0",
    "vitest": "^3.0.5"
  }
}
```

- [ ] **Step 2: vite.config.js** — base derived from the GitHub repo name in CI

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function pagesBase() {
  const repo = process.env.GITHUB_REPOSITORY // "owner/name" in GitHub Actions
  if (!repo) return '/'
  const name = repo.split('/')[1]
  return name.endsWith('.github.io') ? '/' : `/${name}/`
}

export default defineConfig({
  plugins: [vue()],
  base: pagesBase(),
  test: {
    environment: 'jsdom',
  },
})
```

- [ ] **Step 3: index.html**

```html
<!doctype html>
<html lang="uk">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1440" />
    <title>Корпорація ЕНСІ</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Onest:wght@700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 4: src/styles/global.css**

```css
:root {
  --c-text: #142218;
  --c-accent: #fece85;
  --c-muted: rgba(48, 44, 44, 0.5);
  --f-head: 'Onest', sans-serif;
  --f-body: 'Inter', sans-serif;
}
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
html, body { margin: 0; }
body {
  background: #fff;
  color: var(--c-text);
  font-family: var(--f-body);
  min-width: 1440px;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
h1, h2, p { margin: 0; }
section { scroll-margin-top: 195px; }
.canvas { position: relative; width: 1440px; margin: 0 auto; overflow: hidden; }
.label {
  display: inline-flex; align-items: center; gap: 12px;
  font: 400 15px/27px var(--f-body); text-transform: uppercase;
}
.label::after { content: ''; width: 35px; height: 1px; background: var(--c-accent); }
```

- [ ] **Step 5: src/main.js and placeholder App.vue**

```js
import { createApp } from 'vue'
import './styles/global.css'
import App from './App.vue'

createApp(App).mount('#app')
```

```vue
<template>
  <main class="canvas">ENSI</main>
</template>
```

- [ ] **Step 6: .gitignore**

```
node_modules
dist
```

- [ ] **Step 7: Copy assets, install, build**

Run: `cp "$TEMP/claude-figma/assets/"* src/assets/ && npm install && npm run build`
Expected: `dist/index.html` exists, no errors.

- [ ] **Step 8: Commit** `chore: scaffold Vite + Vue project with fonts and Figma assets`

---

### Task 2: i18n module (TDD)

**Files:**
- Create: `src/i18n.js`, `tests/i18n.test.js`

**Interfaces:**
- Produces: `export const messages = { ua: {...}, en: {...} }`; `export const LANGS = ['ua', 'en']`; `export function loadLang(storage = localStorage)` → `'ua'|'en'`; `export function saveLang(lang, storage = localStorage)`.
- Dictionary keys (identical in both languages): `langLabel`, `nav.about`, `nav.mission`, `nav.contacts`, `hero.title` (string with `\n`), `hero.text`, `about.label`, `about.title` (`\n`), `about.text`, `about.caption` (`\n`), `mission.label`, `mission.title` (`\n`), `mission.text`, `mission.features` (array of 3 strings with `\n`), `contacts.label`, `contacts.company`, `contacts.phone`, `contacts.email`.

- [ ] **Step 1: Failing test** `tests/i18n.test.js`

```js
import { describe, it, expect } from 'vitest'
import { messages, LANGS, loadLang, saveLang } from '../src/i18n.js'

function keysOf(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`])
}
function memStorage(init = {}) {
  const m = { ...init }
  return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v) } }
}

describe('i18n dictionaries', () => {
  it('ua and en expose the same keys', () => {
    expect(keysOf(messages.en).sort()).toEqual(keysOf(messages.ua).sort())
  })
  it('has three mission features in each language', () => {
    for (const l of LANGS) expect(messages[l].mission.features).toHaveLength(3)
  })
  it('contains the mockup copy', () => {
    expect(messages.ua.hero.title).toBe('Технології\nдля кращого\nзавтра')
    expect(messages.en.hero.title).toBe('Engineering\na brighter\ntomorrow')
    expect(messages.ua.contacts.phone).toBe('+38 094 710-10-25')
  })
})

describe('language persistence', () => {
  it('defaults to ua', () => expect(loadLang(memStorage())).toBe('ua'))
  it('reads a stored en', () => expect(loadLang(memStorage({ 'ensi-lang': 'en' }))).toBe('en'))
  it('ignores garbage', () => expect(loadLang(memStorage({ 'ensi-lang': 'xx' }))).toBe('ua'))
  it('survives a throwing storage', () => {
    expect(loadLang({ getItem() { throw new Error('blocked') } })).toBe('ua')
  })
  it('saves and reloads', () => {
    const s = memStorage(); saveLang('en', s); expect(loadLang(s)).toBe('en')
  })
})
```

- [ ] **Step 2: Run** `npm test` → FAIL (module not found).

- [ ] **Step 3: Implement src/i18n.js** with the exact copy from the mockup.

UA: nav «ПРО НАС / НАША МІСІЯ / КОНТАКТИ», langLabel `UA`; hero title `Технології\nдля кращого\nзавтра`; hero text «Корпорація ЕНСІ — технологічна та інженерна компанія, що розробляє та впроваджує сучасні автоматизовані рішення, допомагаючи бізнесу працювати ефективніше, безпечніше та стабільніше»; about label «ПРО НАС», title `Технології зі\nзмістом`, text «Ми поєднуємо інженерну експертизу, електроніку та інтелектуальні технології, щоб створювати нове покоління сучасних автоматизованих систем. Наші рішення допомагають бізнесу вирішувати складні завдання та досягати кращих результатів завдяки продуманій інженерії та автоматизації», caption `РЕАЛЬНІ РІШЕННЯ ДЛЯ\nРЕАЛЬНИХ ВИКЛИКІВ`; mission label «НАША МІСІЯ», title `Менше важкої роботи.\nБільше можливостей`, text «Наша мета — зменшити потребу людей у виконанні фізично важкої, повторюваної або потенційно небезпечної роботи. Завдяки автоматизації ми прагнемо підвищувати ефективність, оптимізувати операційні витрати та допомагати бізнесу досягати більшого з меншими ресурсами», features [`ВИЩА\nЕФЕКТИВНІСТЬ`, `БЕЗПЕЧНІШЕ\nСЕРЕДОВИЩЕ`, `СТАЛІШЕ\nМАЙБУТНЄ`]; contacts label «КОНТАКТИ», company «Корпорація «ЕНСІ»», phone `+38 094 710-10-25`, email `office.nccorp@gmail.com`.

EN: nav `ABOUT US / OUR MISSION / CONTACTS`, langLabel `ENG`; hero title `Engineering\na brighter\ntomorrow`; hero text «NC Corporation is a technology and engineering company that develops and implements modern automated solutions, helping businesses operate more efficiently, safely and sustainably»; about label `ABOUT US`, title `Technology\nwith purpose` (the mockup has the typo "purose"; fix it), text «We combine engineering expertise, electronics and intelligent technologies to create a new generation of advanced automated systems. Our solutions help businesses solve complex challenges and achieve better results through thoughtful engineering and automation», caption `REAL SOLUTIONS\nFOR REAL CHALLENGES`; mission label `OUR MISSION`, title `Less manual work.\nA more efficient future`, text «Our goal is to reduce the need for people to perform physically demanding, repetitive or potentially hazardous tasks. Through automation, we aim to improve efficiency, optimize operating costs and help businesses achieve more with fewer resources», features [`HIGHER\nEFFICIENCY`, `SAFER\nENVIRONMENTS`, `A MORE\nSUSTAINABLE\nTOMORROW`]; contacts label `CONTACTS`, company `LLC «NC Corporation»`, phone and email same as UA.

```js
export const LANGS = ['ua', 'en']
const KEY = 'ensi-lang'

export function loadLang(storage = globalThis.localStorage) {
  try {
    const v = storage.getItem(KEY)
    return LANGS.includes(v) ? v : 'ua'
  } catch { return 'ua' }
}
export function saveLang(lang, storage = globalThis.localStorage) {
  try { storage.setItem(KEY, lang) } catch { /* storage unavailable */ }
}
```

- [ ] **Step 4: Run** `npm test` → PASS (8 tests).
- [ ] **Step 5: Commit** `feat: add UA/EN dictionaries and language persistence`

---

### Task 3: App shell + AppHeader with language switch (TDD)

**Files:**
- Create: `src/components/AppHeader.vue`, `tests/app.test.js`
- Modify: `src/App.vue`

**Interfaces:**
- `App.vue` does `provide('t', computed(() => messages[lang.value]))`, `provide('lang', lang)`, `provide('setLang', fn)`. Children do `const t = inject('t')` and read `t.value.hero.title` (in templates: `t.hero.title`).
- Initial language: `?lang=en|ua` query wins over localStorage (handy for sharing links and for screenshots).
- `AppHeader` props: none. Uses injected `lang`, `setLang`, `t`. Nav links `<a href="#about">`, `#mission`, `#contacts`; sections in later tasks carry those ids and rely on `section { scroll-margin-top: 195px }` from global.css.
- Language control: `<button class="lang">` toggles a `<ul class="lang-menu">` listing the other language(s); clicking calls `setLang(code)` and closes.

- [ ] **Step 1: Failing test** `tests/app.test.js`

```js
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState({}, '', '/')
})

async function switchLang(w) {
  await w.find('button.lang').trigger('click')
  await w.find('.lang-menu button').trigger('click')
}

describe('App', () => {
  it('renders Ukrainian by default', () => {
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Технології')
    expect(w.find('nav').text()).toContain('ПРО НАС')
    expect(document.documentElement.lang).toBe('uk')
  })
  it('switches to English and persists it', async () => {
    const w = mount(App)
    await switchLang(w)
    expect(w.find('h1').text()).toContain('Engineering')
    expect(w.find('nav').text()).toContain('ABOUT US')
    expect(localStorage.getItem('ensi-lang')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
  it('honours ?lang=en over stored value', () => {
    localStorage.setItem('ensi-lang', 'ua')
    window.history.replaceState({}, '', '/?lang=en')
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Engineering')
  })
})
```

- [ ] **Step 2: Run** `npm test` → FAIL (no h1 / no button.lang).

- [ ] **Step 3: App.vue**

```vue
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
function setLang(code) { lang.value = code; saveLang(code) }
watchEffect(() => { document.documentElement.lang = lang.value === 'ua' ? 'uk' : 'en' })

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
```
(The temporary `<h1>` is replaced by `HeroSection` in Task 4.)

- [ ] **Step 4: AppHeader.vue**

```vue
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
function choose(code) { setLang(code); open.value = false }
</script>

<template>
  <header class="header">
    <a class="logo" href="#top"><img :src="logo" alt="NC Корпорація ЕНСІ" width="275" height="46" /></a>
    <nav class="nav">
      <a href="#about">{{ t.nav.about }}</a>
      <a href="#mission">{{ t.nav.mission }}</a>
      <a href="#contacts">{{ t.nav.contacts }}</a>
      <div class="lang-wrap">
        <button class="lang" type="button" :aria-expanded="open" @click="open = !open">
          {{ t.langLabel }} <img :src="chevron" alt="" width="11" height="7" />
        </button>
        <ul v-if="open" class="lang-menu">
          <li v-for="code in LANGS.filter(c => c !== lang)" :key="code">
            <button type="button" @click="choose(code)">{{ labels[code] }}</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed; top: 0; left: 50%; transform: translateX(-50%);
  width: 1440px; height: 195px; z-index: 10;
  background: rgba(255, 255, 255, 0.9);
}
.logo { position: absolute; left: 64px; top: 74px; display: block; line-height: 0; }
.nav {
  position: absolute; right: 64px; top: 82px;
  display: flex; align-items: flex-start; gap: 68px;
  font: 400 15px/27px var(--f-body); text-transform: uppercase;
}
.lang-wrap { position: relative; margin-left: 7px; }
.lang { display: inline-flex; align-items: center; gap: 4px; line-height: 27px; text-transform: uppercase; }
.lang-menu {
  position: absolute; right: 0; top: 32px; margin: 0; padding: 6px 0; list-style: none;
  background: #fff; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12); min-width: 72px;
}
.lang-menu button { display: block; width: 100%; padding: 6px 14px; text-align: left; text-transform: uppercase; }
.lang-menu button:hover { background: #f3f3f3; }
</style>
```

- [ ] **Step 5: Run** `npm test` → PASS.
- [ ] **Step 6: Commit** `feat: app shell with fixed header and UA/EN switcher`

---

### Task 4: HeroSection

**Files:**
- Create: `src/components/HeroSection.vue`
- Modify: `src/App.vue` (replace temporary h1 with `<HeroSection />`)

**Interfaces:**
- Consumes: injected `t` (`t.hero.title`, `t.hero.text`).
- Produces: `<section id="top" class="hero">` containing the page's only `<h1>`.

- [ ] **Step 1: Component**

```vue
<script setup>
import { inject } from 'vue'
import photo from '../assets/hero.png'
import overlay from '../assets/hero-overlay.svg'
const t = inject('t')
</script>

<template>
  <section id="top" class="hero">
    <img class="hero__photo" :src="photo" alt="" width="1706" height="1280" />
    <img class="hero__overlay" :src="overlay" alt="" width="1294" height="1069" />
    <h1 class="hero__title">{{ t.hero.title }}</h1>
    <p class="hero__text">{{ t.hero.text }}</p>
  </section>
</template>

<style scoped>
.hero { position: relative; height: 900px; overflow: hidden; }
.hero__photo { position: absolute; left: -16px; top: -109px; display: block; }
.hero__overlay { position: absolute; left: -206px; top: 74px; display: block; pointer-events: none; }
.hero__title {
  position: absolute; left: 62px; top: 245px; width: 727px;
  font: 700 116px/118px var(--f-head); white-space: pre-line;
}
.hero__text {
  position: absolute; left: 62px; top: 626px; width: 644px;
  font: 500 20px/34px var(--f-body); color: #000;
}
</style>
```

- [ ] **Step 2: Wire into App.vue** — import and place `<HeroSection />` inside `<main>`, delete the temporary h1.
- [ ] **Step 3: Run** `npm test` → PASS (the App tests still find `h1`). `npm run build` → OK.
- [ ] **Step 4: Commit** `feat: hero section`

---

### Task 5: AboutSection (about + mission columns)

**Files:**
- Create: `src/components/AboutSection.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `t.about.*`, `t.mission.*` (features array).
- Produces: `<section id="about" class="about">` with an inner zero-size anchor `<div id="mission">` at the section top so the nav "mission" link scrolls to the same place.

- [ ] **Step 1: Component**

```vue
<script setup>
import { inject } from 'vue'
import mark from '../assets/mark-nc-light.svg'
import iconLeaf from '../assets/icon-leaf.svg'
import iconShield from '../assets/icon-shield.svg'
import iconChart from '../assets/icon-chart.svg'
const t = inject('t')
const icons = [
  { src: iconLeaf, x: 733, y: 500, w: 42, h: 53 },
  { src: iconShield, x: 945, y: 500, w: 42, h: 49 },
  { src: iconChart, x: 1193, y: 494, w: 43, h: 48 },
]
const captionX = [731, 945, 1193]
</script>

<template>
  <section id="about" class="about">
    <img class="about__mark" :src="mark" alt="" width="355" height="219" />

    <span class="label about__label">{{ t.about.label }}</span>
    <h2 class="about__title">{{ t.about.title }}</h2>
    <p class="about__text">{{ t.about.text }}</p>
    <span class="about__divider"></span>
    <p class="about__caption">{{ t.about.caption }}</p>

    <div id="mission" class="mission-anchor"></div>
    <span class="label mission__label">{{ t.mission.label }}</span>
    <h2 class="mission__title">{{ t.mission.title }}</h2>
    <p class="mission__text">{{ t.mission.text }}</p>

    <img v-for="(i, n) in icons" :key="n" class="feature__icon" :src="i.src" alt=""
         :width="i.w" :height="i.h" :style="{ left: i.x + 'px', top: i.y + 'px' }" />
    <p v-for="(f, n) in t.mission.features" :key="f" class="feature__caption"
       :style="{ left: captionX[n] + 'px' }">{{ f }}</p>
  </section>
</template>

<style scoped>
.about { position: relative; height: 705px; background: #fff; }
.about > * { position: absolute; }
.about__mark { left: 238px; top: 126px; }
.about__label { left: 62px; top: 77px; }
.mission__label { left: 730px; top: 77px; }
.about__title { left: 62px; top: 160px; width: 293px; }
.mission__title { left: 729px; top: 160px; width: 544px; }
h2 { font: 700 50px/54px var(--f-head); white-space: pre-line; }
.about__text { left: 62px; top: 286px; width: 524px; }
.mission__text { left: 731px; top: 286px; width: 662px; }
.about__text, .mission__text { font: 500 20px/34px var(--f-body); }
.about__divider { left: 64px; top: 527px; width: 35px; height: 1px; background: var(--c-muted); }
.about__caption { left: 62px; top: 565px; }
.feature__caption { top: 571px; }
.about__caption, .feature__caption { font: 400 15px/23px var(--f-body); text-transform: uppercase; white-space: pre-line; }
.mission-anchor { left: 0; top: 0; width: 0; height: 0; }
</style>
```

- [ ] **Step 2: Wire into App.vue** after `<HeroSection />`.
- [ ] **Step 3: Run** `npm test` and `npm run build` → PASS/OK.
- [ ] **Step 4: Commit** `feat: about and mission section`

---

### Task 6: ContactsSection

**Files:**
- Create: `src/components/ContactsSection.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: `t.contacts.*`.
- Produces: `<section id="contacts" class="contacts">`; phone link `href="tel:+380947101025"` (digits from the text, `+` prefix), email link `mailto:`.

- [ ] **Step 1: Component**

```vue
<script setup>
import { inject, computed } from 'vue'
import photo from '../assets/contacts.png'
import mark from '../assets/mark-nc-dark.svg'
import iconPhone from '../assets/icon-phone.svg'
import iconMail from '../assets/icon-mail.svg'
const t = inject('t')
const telHref = computed(() => 'tel:+' + t.value.contacts.phone.replace(/\D/g, ''))
</script>

<template>
  <section id="contacts" class="contacts">
    <img class="contacts__photo" :src="photo" alt="" width="2475" height="1237" />
    <img class="contacts__mark" :src="mark" alt="" width="859" height="543" />
    <span class="label contacts__label">{{ t.contacts.label }}</span>
    <p class="contacts__company">{{ t.contacts.company }}</p>
    <img class="contacts__icon contacts__icon--phone" :src="iconPhone" alt="" width="23" height="25" />
    <a class="contacts__line contacts__line--phone" :href="telHref">{{ t.contacts.phone }}</a>
    <img class="contacts__icon contacts__icon--mail" :src="iconMail" alt="" width="23" height="24" />
    <a class="contacts__line contacts__line--mail" :href="'mailto:' + t.contacts.email">{{ t.contacts.email }}</a>
  </section>
</template>

<style scoped>
.contacts { position: relative; height: 705px; overflow: hidden; color: #fff; }
.contacts > * { position: absolute; }
.contacts__photo { left: -185px; top: -13px; }
.contacts__mark { left: 501px; top: 69px; }
.contacts__label { left: 62px; top: 77px; }
.contacts__company { left: 62px; top: 234px; }
.contacts__company, .contacts__line { font: 700 20px/54px var(--f-head); }
.contacts__icon--phone { left: 64px; top: 321px; }
.contacts__line--phone { left: 99px; top: 307px; }
.contacts__icon--mail { left: 64px; top: 362px; }
.contacts__line--mail { left: 99px; top: 347px; }
.contacts__line:hover { text-decoration: underline; }
</style>
```

- [ ] **Step 2: Wire into App.vue** after `<AboutSection />`.
- [ ] **Step 3: Run** `npm test` and `npm run build` → PASS/OK.
- [ ] **Step 4: Commit** `feat: contacts section`

---

### Task 7: Visual check against the mockup

**Files:** none new (fixes go to the components).

- [ ] **Step 1: Serve the build** — `npm run build && npm run preview -- --port 4173` in background.
- [ ] **Step 2: Screenshot** with Edge headless at 1440×2310 for both languages:
  `msedge --headless --disable-gpu --hide-scrollbars --window-size=1440,2310 --screenshot=<scratch>\site-ua.png http://localhost:4173/` and the same with `http://localhost:4173/?lang=en` → `site-en.png`.
- [ ] **Step 3: Compare** with `%TEMP%\claude-figma\ua.png` / `eng.png`. Adjust coordinates where the rendered page drifts by more than ~4px. Fonts differ (Onest vs Nekst), so heading line breaks must match the mockup's `\n` but glyph widths will differ.
- [ ] **Step 4: Run** `npm test` → PASS. **Commit** `fix: align layout with mockup`

---

### Task 8: GitHub Pages deploy workflow + README

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

- [ ] **Step 1: Workflow**

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: README.md** (Ukrainian): what the project is; `npm install`, `npm run dev`, `npm run build`, `npm test`; exact GitHub steps: create an empty public repo, `git remote add origin ...`, `git push -u origin main`, then Settings → Pages → Source: **GitHub Actions**; mention `?lang=en`.
- [ ] **Step 3: Commit** `ci: deploy to GitHub Pages via Actions`

---

## Self-review

- Spec coverage: header/nav/lang (T3), hero (T4), about+mission+features+watermark (T5), contacts with tel/mailto and watermark (T6), fonts and 1440 canvas (T1), i18n + localStorage (T2), deploy (T8), visual verification (T7). Out-of-scope items untouched.
- No placeholders; every code step has real code.
- Names consistent: `t`, `lang`, `setLang` injections; `LANGS`, `messages`, `loadLang`, `saveLang` exports; ids `top/about/mission/contacts`.
