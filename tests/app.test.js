import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState({}, '', '/')
})

async function switchLang(w) {
  await w.find('button.lang').trigger('click')
  await w.find('.lang-menu button').trigger('click')
}

describe('App', () => {
  it('renders Ukrainian by default', () => {
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Технології')
    expect(w.find('nav').text()).toContain('Про нас')
    expect(document.documentElement.lang).toBe('uk')
  })

  it('switches to English and persists it', async () => {
    const w = mount(App)
    await switchLang(w)
    expect(w.find('h1').text()).toContain('Engineering')
    expect(w.find('nav').text()).toContain('About us')
    expect(localStorage.getItem('ensi-lang')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('honours ?lang=en over stored value', () => {
    localStorage.setItem('ensi-lang', 'ua')
    window.history.replaceState({}, '', '/?lang=en')
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Engineering')
  })
})
