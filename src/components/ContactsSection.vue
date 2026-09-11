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
    <div class="inner">
      <img class="contacts__mark" :src="mark" alt="" width="859" height="543" />
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
/* ---------- phone / tablet ---------- */
.contacts {
  position: relative;
  overflow: hidden;
  color: #fff;
  min-height: 60vh;
  padding: 72px 0;
  display: flex;
  align-items: center;
}
.contacts__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 70%;
}
/* Darken the photo a little so the white text stays readable in any crop. */
.contacts::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}
.contacts__mark {
  display: none;
}
.contacts__company {
  margin-top: 48px;
  font: 700 20px/1.4 var(--f-head);
}
.contacts__row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}
.contacts__line {
  font: 700 18px/1.4 var(--f-head);
}
.contacts__line:hover {
  text-decoration: underline;
}
@media (min-width: 768px) {
  .contacts {
    padding: 96px 0;
  }
  .contacts__line {
    font-size: 20px;
  }
}

/* ---------- desktop: exact mockup coordinates ---------- */
@media (min-width: 1440px) {
  /* Header (195px) + this section fill the viewport; never shorter than the 705px mockup frame. */
  .contacts {
    display: block;
    min-height: 0;
    height: max(705px, calc(100vh - 195px));
    padding: 0;
  }
  .contacts::before {
    display: none;
  }
  /* Mockup crop: photo 2475px wide shifted 185px left, 13px up. Wider screens scale it to fill. */
  .contacts__photo {
    inset: auto;
    left: -185px;
    top: 0;
    width: max(calc(100% + 185px), 2475px);
    height: 100%;
    object-position: 50% 2.4%;
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
  .contacts__mark {
    display: block;
    position: absolute;
    left: 501px;
    top: 69px;
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
  .contacts__company,
  .contacts__line {
    font: 700 20px/54px var(--f-head);
  }
  .contacts__icon {
    position: absolute;
    left: 64px;
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
  }
  .contacts__line--phone {
    top: 307px;
  }
  .contacts__line--mail {
    top: 347px;
  }
}
</style>
