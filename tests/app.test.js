import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../src/App.vue'

beforeEach(() => {
  localStorage.clear()
  window.history.replaceState({}, '', '/')
})

describe('App', () => {
  it('renders Ukrainian by default', () => {
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Технології')
    expect(w.find('nav').text()).toContain('Про нас')
    expect(w.find('.logo img').attributes('src')).toContain('logo-ua')
    expect(document.documentElement.lang).toBe('uk')
  })

  it('toggles to English on a single click and persists it', async () => {
    const w = mount(App)
    await w.find('button.lang').trigger('click')
    expect(w.find('h1').text()).toContain('Engineering')
    expect(w.find('nav').text()).toContain('About us')
    expect(w.find('.logo img').attributes('src')).toContain('logo-en')
    expect(localStorage.getItem('ensi-lang')).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('toggles back to Ukrainian on the next click', async () => {
    const w = mount(App)
    await w.find('button.lang').trigger('click')
    await w.find('button.lang').trigger('click')
    expect(w.find('h1').text()).toContain('Технології')
    expect(localStorage.getItem('ensi-lang')).toBe('ua')
  })

  it('honours ?lang=en over stored value', () => {
    localStorage.setItem('ensi-lang', 'ua')
    window.history.replaceState({}, '', '/?lang=en')
    const w = mount(App)
    expect(w.find('h1').text()).toContain('Engineering')
  })

  it('points nav links at the about, mission and contacts anchors', () => {
    const w = mount(App)
    const hrefs = w.findAll('nav a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual(['#about', '#mission', '#contacts'])
    expect(w.find('#mission').exists()).toBe(true)
  })

  it('keeps the header transparent at the top and whitens it after scrolling', async () => {
    const w = mount(App, { attachTo: document.body })
    expect(w.find('header').classes()).not.toContain('header--scrolled')
    window.scrollY = 300
    window.dispatchEvent(new Event('scroll'))
    await w.vm.$nextTick()
    expect(w.find('header').classes()).toContain('header--scrolled')
    w.unmount()
  })

  it('opens the mobile menu with the burger and closes it on a link click', async () => {
    const w = mount(App)
    expect(w.find('nav').classes()).not.toContain('nav--open')
    await w.find('button.burger').trigger('click')
    expect(w.find('nav').classes()).toContain('nav--open')
    expect(w.find('header').classes()).toContain('header--open')
    await w.find('nav a').trigger('click')
    expect(w.find('nav').classes()).not.toContain('nav--open')
  })
})
