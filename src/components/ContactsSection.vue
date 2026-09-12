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
    <div class="inner">
      <span class="label contacts__label">{{ t.contacts.label }}</span>
      <p class="contacts__company">{{ t.contacts.company }}</p>
      <div class="contacts__row">
        <img class="contacts__icon contacts__icon--phone" :src="iconPhone" alt="" width="23" height="25" />
        <a class="contacts__line contacts__line--phone" :href="telHref">{{ t.contacts.phone }}</a>
      </div>
      <div class="contacts__row">
        <img class="contacts__icon contacts__icon--mail" :src="iconMail" alt="" width="23" height="24" />
        <a class="contacts__line contacts__line--mail" :href="'mailto:' + t.contacts.email">{{ t.contacts.email }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------- phone (Figma 390x844) ---------- */
.contacts {
  position: relative;
  min-height: 844px;
  padding-top: 57px;
  overflow: hidden;
  color: #fff;
}
/* Same 2475x1237 photo as in Figma at natural size, offset like the frame (x -654 => centre - 849). */
.contacts__photo {
  position: absolute;
  top: -146px;
  left: 50%;
  margin-left: -849px;
  width: 2475px;
  height: calc(100% + 146px);
  object-fit: cover;
  object-position: 50% 0;
}
.contacts__mark {
  position: absolute;
  left: 20px;
  bottom: 0;
  width: 350px;
  height: 221px;
}
.inner {
  z-index: 1;
}
.contacts__company {
  margin-top: 226px;
  font: 700 20px/54px var(--f-head);
}
.contacts__row {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 40px;
}
.contacts__company + .contacts__row {
  margin-top: 17px;
}
.contacts__icon {
  width: 24px;
  height: 24px;
}
.contacts__line {
  font: 700 20px/40px var(--f-head);
}
.contacts__line:hover {
  text-decoration: underline;
}

/* ---------- tablet (Figma 768x705) ---------- */
@media (min-width: 768px) {
  .contacts {
    min-height: 705px;
    padding-top: 77px;
  }
  .contacts__photo {
    top: -13px;
    margin-left: -569px;
    height: calc(100% + 13px);
  }
  .contacts__mark {
    left: auto;
    right: calc(50% - 344px);
    bottom: auto;
    top: 171px;
    width: 423px;
    height: 268px;
  }
  .contacts__company {
    margin-top: 130px;
  }
  .contacts__row {
    gap: 17px;
  }
}

/* ---------- desktop (Figma 1440x705, scaled down between 1024 and 1439px): exact coordinates ---------- */
@media (min-width: 1024px) {
  /* Header (195px) + this section fill the viewport; never shorter than the 705px mockup frame. */
  .contacts {
    min-height: 0;
    height: max(705px, calc(var(--vh) - 195px));
    padding: 0;
  }
  /* Mockup crop: photo 2475px wide shifted 185px left, 13px up. Wider screens scale it to fill. */
  .contacts__photo {
    left: -185px;
    top: 0;
    margin-left: 0;
    width: max(calc(100% + 185px), 2475px);
    height: 100%;
    object-position: 50% 2.4%;
  }
  /* 501,69 inside the 1440x705 frame, which is centred both ways. */
  .contacts__mark {
    left: calc(50% - 219px);
    top: calc(50% - 283.5px);
    right: auto;
    width: 859px;
    height: 543px;
  }
  /* Keep the 705px mockup frame vertically centred when the section is taller. */
  .inner {
    height: 705px;
    top: 50%;
    transform: translateY(-50%);
  }
  .contacts__row {
    display: contents;
  }
  .contacts__label {
    position: absolute;
    left: 62px;
    top: 77px;
  }
  .contacts__company {
    position: absolute;
    left: 62px;
    top: 234px;
    margin: 0;
  }
  .contacts__icon {
    position: absolute;
    left: 64px;
    width: auto;
    height: auto;
  }
  .contacts__icon--phone {
    top: 321px;
  }
  .contacts__icon--mail {
    top: 362px;
  }
  .contacts__line {
    position: absolute;
    left: 99px;
    line-height: 54px;
  }
  .contacts__line--phone {
    top: 307px;
  }
  .contacts__line--mail {
    top: 347px;
  }
}
</style>
