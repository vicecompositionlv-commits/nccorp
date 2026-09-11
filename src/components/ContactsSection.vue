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
      <img class="contacts__icon contacts__icon--phone" :src="iconPhone" alt="" width="23" height="25" />
      <a class="contacts__line contacts__line--phone" :href="telHref">{{ t.contacts.phone }}</a>
      <img class="contacts__icon contacts__icon--mail" :src="iconMail" alt="" width="23" height="24" />
      <a class="contacts__line contacts__line--mail" :href="'mailto:' + t.contacts.email">{{ t.contacts.email }}</a>
    </div>
  </section>
</template>

<style scoped>
/* Header (195px) + this section fill the viewport; never shorter than the 705px mockup frame. */
.contacts {
  position: relative;
  height: max(705px, calc(100vh - 195px));
  overflow: hidden;
  color: #fff;
}
/* Mockup crop: photo 2475px wide shifted 185px left, 13px up. Wider screens scale it to fill. */
.contacts__photo {
  position: absolute;
  left: -185px;
  top: 0;
  width: max(calc(100% + 185px), 2475px);
  height: 100%;
  object-fit: cover;
  object-position: 50% 2.4%;
}
/* Keep the 705px mockup frame vertically centred when the section is taller. */
.inner {
  height: 705px;
  top: 50%;
  transform: translateY(-50%);
}
.inner > * {
  position: absolute;
}
.contacts__mark {
  left: 501px;
  top: 69px;
}
.contacts__label {
  left: 62px;
  top: 77px;
}
.contacts__company {
  left: 62px;
  top: 234px;
}
.contacts__company,
.contacts__line {
  font: 700 20px/54px var(--f-head);
}
.contacts__icon--phone {
  left: 64px;
  top: 321px;
}
.contacts__line--phone {
  left: 99px;
  top: 307px;
}
.contacts__icon--mail {
  left: 64px;
  top: 362px;
}
.contacts__line--mail {
  left: 99px;
  top: 347px;
}
.contacts__line:hover {
  text-decoration: underline;
}
</style>
