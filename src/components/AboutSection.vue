<script setup>
import { inject } from 'vue'
import mark from '../assets/mark-nc-light.svg'
import iconLeaf from '../assets/icon-leaf.svg'
import iconShield from '../assets/icon-shield.svg'
import iconChart from '../assets/icon-chart.svg'

const t = inject('t')
// Desktop mockup coordinates per feature: caption x, icon x/y (only used at >= 1440px via CSS vars).
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

      <div class="col">
        <span class="label about__label">{{ t.about.label }}</span>
        <h2 class="about__title">{{ t.about.title }}</h2>
        <p class="about__text">{{ t.about.text }}</p>
        <span class="about__divider"></span>
        <p class="about__caption">{{ t.about.caption }}</p>
      </div>

      <div id="mission" class="col">
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
/* ---------- phone (default): one column ---------- */
.about {
  position: relative;
  background: #fff;
  padding: 64px 0;
}
.about__mark {
  display: none;
}
.inner {
  display: grid;
  gap: 48px;
}
.col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
/* The mission column is its own anchor on phone/tablet; on desktop it coincides with the section top. */
#mission {
  scroll-margin-top: calc(var(--header-h) + 24px);
}
h2 {
  margin-top: 20px;
  font: 700 clamp(28px, 4.5vw, 44px) / 1.15 var(--f-head);
  white-space: pre-line;
}
.about__text,
.mission__text {
  margin-top: 20px;
  font: 500 17px/1.6 var(--f-body);
}
.about__divider {
  display: block;
  width: 35px;
  height: 1px;
  margin-top: 32px;
  background: var(--c-muted);
}
.about__caption {
  margin-top: 24px;
}
.features {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  gap: 20px;
  width: 100%;
}
.feature {
  display: flex;
  align-items: center;
  gap: 16px;
}
.feature__icon {
  flex: none;
  width: auto;
  height: 40px;
}
.about__caption,
.feature__caption {
  font: 400 14px/1.5 var(--f-body);
  text-transform: uppercase;
  white-space: pre-line;
}

/* ---------- tablet: two columns ---------- */
@media (min-width: 768px) {
  .about {
    padding: 80px 0;
  }
  .inner {
    grid-template-columns: 1fr 1.2fr;
    gap: 48px;
  }
  .about__text,
  .mission__text {
    font-size: 18px;
  }
  .features {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .feature {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  .feature__icon {
    height: 48px;
  }
}

/* ---------- desktop: exact mockup coordinates ---------- */
@media (min-width: 1440px) {
  /* Header (195px) + this section fill the viewport; never shorter than the 705px mockup frame. */
  .about {
    height: max(705px, calc(100vh - 195px));
    padding: 0;
  }
  /* Keep the 705px mockup frame vertically centred when the section is taller. */
  .inner {
    display: block;
    height: 705px;
    top: 50%;
    transform: translateY(-50%);
  }
  /* Columns cover the whole frame so their absolute children keep .inner coordinates; feature wrappers vanish. */
  .col {
    position: absolute;
    inset: 0;
    display: block;
  }
  /* Header + the vertical centring offset of the 705px frame, so #mission lands exactly where #about does. */
  #mission {
    scroll-margin-top: calc(195px + max(0px, (100vh - 900px) / 2));
  }
  .features,
  .feature {
    display: contents;
  }
  .about__mark {
    display: block;
    position: absolute;
    left: 238px;
    top: 126px;
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
  h2 {
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
  .about__caption,
  .feature__caption {
    font: 400 15px/23px var(--f-body);
  }
}
</style>
