<script setup>
import { inject } from 'vue'
import photo from '../assets/hero.png'
import overlay from '../assets/hero-overlay.svg'

const t = inject('t')
</script>

<template>
  <section id="top" class="hero">
    <img class="hero__photo" :src="photo" alt="" width="1706" height="1280" />
    <div class="inner">
      <div class="hero__content">
        <img class="hero__overlay" :src="overlay" alt="" width="1294" height="1069" />
        <h1 class="hero__title">{{ t.hero.title }}</h1>
        <p class="hero__text">{{ t.hero.text }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- phone (Figma 390x844) ---------- */
.hero {
  position: relative;
  min-height: 844px;
  min-height: max(844px, 100svh);
  overflow: hidden;
}
/* The same 1706x1280 photo as in Figma, at natural size, offset exactly like the frame
   (x -727 for a 390 frame => centre - 922). If the section grows taller it zooms from the top. */
.hero__photo {
  position: absolute;
  top: -109px;
  left: 50%;
  margin-left: -922px;
  width: 1706px;
  height: calc(100% + 109px);
  object-fit: cover;
  object-position: 50% 0;
}
.inner {
  padding-top: 259px;
}
/* The blurred white shape is sized from the text block so it always covers the title and paragraph,
   whatever the phone width. Own stacking context keeps it behind the text. */
.hero__content {
  position: relative;
  z-index: 0;
}
.hero__overlay {
  position: absolute;
  left: -25%;
  top: -30%;
  width: 150%;
  height: 160%;
  object-fit: fill;
  pointer-events: none;
  z-index: -1;
}
.hero__title {
  font: 700 min(57px, 13vw) / 1 var(--f-head);
  white-space: pre-line;
}
.hero__text {
  margin-top: 26px;
  max-width: 317px;
  padding-bottom: 48px;
  font: 500 15px/24px var(--f-body);
  color: #000;
}

/* ---------- tablet (Figma 768x1024) ---------- */
@media (min-width: 768px) {
  .hero {
    min-height: 1024px;
    min-height: max(1024px, 100vh);
  }
  .hero__photo {
    margin-left: -777px;
  }
  .inner {
    padding-top: 269px;
  }
  .hero__title {
    font: 700 100px/101px var(--f-head);
  }
  .hero__text {
    margin-top: 32px;
    max-width: 600px;
    font: 500 20px/34px var(--f-body);
  }
}

/* ---------- desktop (Figma 1440x900, scaled down between 1024 and 1439px): exact coordinates ---------- */
@media (min-width: 1024px) {
  .hero {
    min-height: 0;
    height: max(900px, var(--vh));
  }
  .hero__photo {
    left: 0;
    top: 0;
    margin-left: 0;
    width: max(100%, 1706px);
    height: 100%;
    object-position: 50% 28.7%;
  }
  .inner {
    padding: 0;
  }
  .hero__content {
    position: static;
  }
  .hero__overlay {
    left: -206px;
    top: 74px;
    width: 1294px;
    height: 1069px;
    z-index: auto;
  }
  .hero__title {
    position: absolute;
    left: 62px;
    top: 245px;
    font: 700 116px/118px var(--f-head);
    white-space: pre;
  }
  .hero__text {
    position: absolute;
    left: 62px;
    top: 626px;
    width: 644px;
    max-width: none;
    margin: 0;
    padding: 0;
    font: 500 20px/34px var(--f-body);
    white-space: pre-line;
  }
}
</style>
