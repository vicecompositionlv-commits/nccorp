export const LANGS = ['ua', 'en']
const KEY = 'ensi-lang'

export const messages = {
  ua: {
    langLabel: 'UA',
    nav: { about: 'Про нас', mission: 'Наша місія', contacts: 'Контакти' },
    hero: {
      title: 'Технології\nдля кращого\nзавтра',
      text: 'Корпорація ЕНСІ — технологічна та інженерна компанія, що розробляє та впроваджує сучасні автоматизовані рішення, допомагаючи бізнесу працювати ефективніше,\nбезпечніше та стабільніше',
    },
    about: {
      label: 'Про нас',
      title: 'Технології зі\nзмістом',
      text: 'Ми поєднуємо інженерну експертизу, електроніку та інтелектуальні технології, щоб створювати нове покоління сучасних автоматизованих систем. Наші рішення допомагають бізнесу вирішувати складні завдання та досягати кращих результатів завдяки продуманій інженерії та автоматизації',
      caption: 'Реальні рішення для\nреальних викликів',
    },
    mission: {
      label: 'Наша місія',
      title: 'Менше важкої роботи.\nБільше можливостей',
      text: 'Наша мета — зменшити потребу людей у виконанні фізично важкої, повторюваної або потенційно небезпечної роботи. Завдяки автоматизації ми прагнемо підвищувати ефективність, оптимізувати операційні витрати та допомагати бізнесу досягати більшого з меншими ресурсами',
      features: ['Вища\nефективність', 'Безпечніше\nсередовище', 'Сталіше\nмайбутнє'],
    },
    contacts: {
      label: 'Контакти',
      company: 'Корпорація «ЕНСІ»',
      phone: '+38 094 710-10-25',
      email: 'office.nccorp@gmail.com',
    },
  },
  en: {
    langLabel: 'ENG',
    nav: { about: 'About us', mission: 'Our mission', contacts: 'Contacts' },
    hero: {
      title: 'Engineering\na brighter\ntomorrow',
      text: 'NC Corporation is a technology and engineering company that develops and implements modern automated solutions, helping businesses operate more efficiently, safely and sustainably',
    },
    about: {
      label: 'About us',
      title: 'Technology\nwith purpose',
      text: 'We combine engineering expertise, electronics and intelligent technologies to create a new generation of advanced automated systems. Our solutions help businesses solve complex challenges and achieve better results through thoughtful engineering and automation',
      caption: 'Real solutions\nfor real challenges',
    },
    mission: {
      label: 'Our mission',
      title: 'Less manual work.\nA more efficient future',
      text: 'Our goal is to reduce the need for people to perform physically demanding, repetitive or potentially hazardous tasks. Through automation, we aim to improve efficiency, optimize operating costs and help businesses achieve more with fewer resources',
      features: ['Higher\nefficiency', 'Safer\nenvironments', 'A more\nsustainable\ntomorrow'],
    },
    contacts: {
      label: 'Contacts',
      company: 'LLC «NC Corporation»',
      phone: '+38 094 710-10-25',
      email: 'office.nccorp@gmail.com',
    },
  },
}

export function loadLang(storage = globalThis.localStorage) {
  try {
    const v = storage.getItem(KEY)
    return LANGS.includes(v) ? v : 'ua'
  } catch {
    return 'ua'
  }
}

export function saveLang(lang, storage = globalThis.localStorage) {
  try {
    storage.setItem(KEY, lang)
  } catch {
    /* storage unavailable (private mode, blocked) — language just won't persist */
  }
}
