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
/* ---------- phone / tablet: fluid, fills the screen ---------- */
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  object-fit: cover;
  object-position: 72% 50%; /* keep the sun on the right */
}
/* The mockup's blurred white shape sits behind the text block and stretches with it. */
.hero__content {
  position: relative;
  z-index: 0; /* own stacking context so the overlay can sit behind the text */
}
.hero__overlay {
  position: absolute;
  left: -30%;
  top: -35%;
  width: 160%;
  height: 165%;
  max-width: none;
  object-fit: fill;
  pointer-events: none;
  z-index: -1;
}
.inner {
  padding-top: calc(var(--header-h) + 24px);
  padding-bottom: 48px;
}
.hero__title {
  font: 700 clamp(40px, 10vw, 96px) / 1.05 var(--f-head);
  white-space: pre-line;
}
.hero__text {
  margin-top: 24px;
  max-width: 560px;
  font: 500 17px/1.6 var(--f-body);
  color: #000;
  white-space: pre-line;
}
@media (min-width: 768px) {
  .hero__text {
    font-size: 19px;
  }
}

/* ---------- desktop: exact mockup coordinates ---------- */
@media (min-width: 1440px) {
  /* Fills the viewport; never shorter than the 900px mockup frame. */
  .hero {
    display: block;
    min-height: 0;
    height: max(900px, 100vh);
  }
  .hero__content {
    position: static;
  }
  /* At 1440 the photo is shown at its natural 1706px width, cropped exactly like the mockup;
     on wider screens it scales up to fill the viewport. */
  .hero__photo {
    inset: auto;
    left: 0;
    top: 0;
    width: max(100%, 1706px);
    height: 100%;
    object-position: 50% 28.7%;
  }
  .hero__overlay {
    left: -206px;
    top: 74px;
    width: 1294px;
    height: 1069px;
    z-index: auto; /* .hero__content is static here; DOM order keeps it under the text */
  }
  .inner {
    padding: 0;
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
    font: 500 20px/34px var(--f-body);
  }
}
</style>
