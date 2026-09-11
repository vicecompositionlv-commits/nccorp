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

    <img
      v-for="(i, n) in icons"
      :key="n"
      class="feature__icon"
      :src="i.src"
      alt=""
      :width="i.w"
      :height="i.h"
      :style="{ left: i.x + 'px', top: i.y + 'px' }"
    />
    <p
      v-for="(f, n) in t.mission.features"
      :key="f"
      class="feature__caption"
      :style="{ left: captionX[n] + 'px' }"
    >
      {{ f }}
    </p>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  height: 705px;
  background: #fff;
}
.about > * {
  position: absolute;
}
.about__mark {
  left: 238px;
  top: 126px;
}
.about__label {
  left: 62px;
  top: 77px;
}
.mission__label {
  left: 730px;
  top: 77px;
}
.about__title {
  left: 62px;
  top: 160px;
  width: 293px;
}
.mission__title {
  left: 729px;
  top: 160px;
  width: 544px;
}
h2 {
  font: 700 50px/54px var(--f-head);
  white-space: pre-line;
}
.about__text {
  left: 62px;
  top: 286px;
  width: 524px;
}
.mission__text {
  left: 731px;
  top: 286px;
  width: 662px;
}
.about__text,
.mission__text {
  font: 500 20px/34px var(--f-body);
}
.about__divider {
  left: 64px;
  top: 527px;
  width: 35px;
  height: 1px;
  background: var(--c-muted);
}
.about__caption {
  left: 62px;
  top: 565px;
}
.feature__caption {
  top: 571px;
}
.about__caption,
.feature__caption {
  font: 400 15px/23px var(--f-body);
  text-transform: uppercase;
  white-space: pre-line;
}
.mission-anchor {
  left: 0;
  top: 0;
  width: 0;
  height: 0;
}
</style>
