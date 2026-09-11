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
.hero {
  position: relative;
  height: 900px;
  overflow: hidden;
}
.hero__photo {
  position: absolute;
  left: -16px;
  top: -109px;
  display: block;
}
.hero__overlay {
  position: absolute;
  left: -206px;
  top: 74px;
  display: block;
  pointer-events: none;
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
  font: 500 20px/34px var(--f-body);
  color: #000;
  white-space: pre-line;
}
</style>
