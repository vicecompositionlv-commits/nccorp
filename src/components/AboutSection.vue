<script setup>
import { inject } from 'vue'
import mark from '../assets/mark-nc-light.svg'
import iconLeaf from '../assets/icon-leaf.svg'
import iconShield from '../assets/icon-shield.svg'
import iconChart from '../assets/icon-chart.svg'

const t = inject('t')
// Desktop mockup coordinates per feature: caption x, icon x/y (used only at >= 1440px via CSS vars).
const features = [
  { src: iconLeaf, w: 42, h: 53, x: 731, ix: 733, iy: 500 },
  { src: iconShield, w: 42, h: 49, x: 945, ix: 945, iy: 500 },
  { src: iconChart, w: 43, h: 48, x: 1193, ix: 1193, iy: 494 },
]
</script>

<template>
  <section id="about" class="about">
    <div class="inner">
      <img class="about__mark" :src="mark" alt="" width="355" height="219" />

      <div class="col col--about">
        <span class="label about__label">{{ t.about.label }}</span>
        <h2 class="about__title">{{ t.about.title }}</h2>
        <p class="about__text">{{ t.about.text }}</p>
        <span class="about__divider"></span>
        <p class="about__caption">{{ t.about.caption }}</p>
      </div>

      <div class="col col--mission">
        <span class="label mission__label">{{ t.mission.label }}</span>
        <h2 class="mission__title">{{ t.mission.title }}</h2>
        <p class="mission__text">{{ t.mission.text }}</p>
        <ul class="features">
          <li
            v-for="(f, n) in features"
            :key="n"
            class="feature"
            :style="{ '--x': f.x + 'px', '--ix': f.ix + 'px', '--iy': f.iy + 'px' }"
          >
            <img class="feature__icon" :src="f.src" alt="" :width="f.w" :height="f.h" />
            <p class="feature__caption">{{ t.mission.features[n] }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- phone (Figma 390): one column ---------- */
.about {
  position: relative;
  background: #fff;
  padding: 51px 0 50px;
}
.about__mark {
  position: absolute;
  left: 134px;
  top: 23px;
  width: 242px;
  height: 149px;
  z-index: 0;
}
.col {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.col--mission {
  margin-top: 40px;
}
h2 {
  margin-top: 30px;
  font: 700 min(45px, 11.5vw) / 48px var(--f-head);
}
.col--mission h2 {
  margin-top: 27px;
}
.about__text,
.mission__text {
  margin-top: 17px;
  font: 500 15px/24px var(--f-body);
}
.mission__text {
  margin-top: 20px;
}
.about__divider {
  display: block;
  width: 31px;
  height: 1px;
  margin-top: 16px;
  background: var(--c-muted);
}
.about__caption {
  margin-top: 23px;
  opacity: 0.5;
}
.features {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 36px;
}
.feature {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}
.feature__icon {
  width: auto;
  height: 45px;
  object-fit: contain;
  object-position: left top;
}
.about__caption,
.feature__caption {
  font: 400 13px/19px var(--f-body);
  text-transform: uppercase;
  white-space: pre-line;
}

/* ---------- tablet (Figma 768): one column, larger type ---------- */
@media (min-width: 768px) {
  .about {
    padding: 72px 0 64px;
  }
  .about__mark {
    left: 374px;
    top: 54px;
    width: 355px;
    height: 219px;
  }
  .col--mission {
    margin-top: 80px;
  }
  h2 {
    margin-top: 35px;
    font: 700 50px/54px var(--f-head);
  }
  .col--mission h2 {
    margin-top: 31px;
  }
  .about__text,
  .mission__text {
    margin-top: 24px;
    max-width: 688px;
    font: 500 20px/34px var(--f-body);
  }
  .mission__text {
    margin-top: 19px;
  }
  .about__divider {
    width: 35px;
  }
  .about__caption {
    margin-top: 26px;
  }
  .features {
    margin-top: 20px;
    gap: 40px;
  }
  .feature {
    gap: 17px;
  }
  .feature__icon {
    height: 53px;
  }
  .about__caption,
  .feature__caption {
    font: 400 15px/23px var(--f-body);
  }
}

/* ---------- desktop (Figma 1440, scaled down between 1024 and 1439px): exact coordinates ---------- */
@media (min-width: 1024px) {
  /* Header (195px) + this section fill the viewport; never shorter than the 705px mockup frame. */
  .about {
    height: max(705px, calc(var(--vh) - 195px));
    padding: 0;
  }
  /* Keep the 705px mockup frame vertically centred when the section is taller. */
  .inner {
    height: 705px;
    top: 50%;
    transform: translateY(-50%);
  }
  /* Columns cover the whole frame so their absolute children keep .inner coordinates; feature wrappers vanish. */
  .col {
    position: absolute;
    inset: 0;
    display: block;
    margin: 0;
    z-index: auto;
  }
  .features,
  .feature {
    display: contents;
  }
  .about__mark {
    left: 238px;
    top: 126px;
    z-index: auto;
  }
  .about__label {
    position: absolute;
    left: 62px;
    top: 77px;
  }
  .mission__label {
    position: absolute;
    left: 730px;
    top: 77px;
  }
  h2,
  .col--mission h2 {
    position: absolute;
    top: 160px;
    margin: 0;
    font: 700 50px/54px var(--f-head);
    white-space: pre;
  }
  .about__title {
    left: 62px;
  }
  .mission__title {
    left: 729px;
  }
  .about__text,
  .mission__text {
    position: absolute;
    top: 286px;
    margin: 0;
    max-width: none;
    font: 500 20px/34px var(--f-body);
  }
  .about__text {
    left: 62px;
    width: 524px;
  }
  .mission__text {
    left: 731px;
    width: 662px;
  }
  .about__divider {
    position: absolute;
    left: 64px;
    top: 527px;
    margin: 0;
  }
  .about__caption {
    position: absolute;
    left: 62px;
    top: 565px;
    margin: 0;
    opacity: 1;
  }
  .feature__icon {
    position: absolute;
    left: var(--ix);
    top: var(--iy);
    width: auto;
    height: auto;
  }
  .feature__caption {
    position: absolute;
    left: var(--x);
    top: 571px;
  }
}
</style>
