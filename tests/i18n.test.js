import { describe, it, expect } from 'vitest'
import { messages, LANGS, loadLang, saveLang } from '../src/i18n.js'

function keysOf(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keysOf(v, `${prefix}${k}.`) : [`${prefix}${k}`])
}
function memStorage(init = {}) {
  const m = { ...init }
  return { getItem: k => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v) } }
}

describe('i18n dictionaries', () => {
  it('ua and en expose the same keys', () => {
    expect(keysOf(messages.en).sort()).toEqual(keysOf(messages.ua).sort())
  })
  it('has three mission features in each language', () => {
    for (const l of LANGS) expect(messages[l].mission.features).toHaveLength(3)
  })
  it('contains the mockup copy', () => {
    expect(messages.ua.hero.title).toBe('Технології\nдля кращого\nзавтра')
    expect(messages.en.hero.title).toBe('Engineering\na brighter\ntomorrow')
    expect(messages.ua.contacts.phone).toBe('+38 094 710-10-25')
  })
})

describe('language persistence', () => {
  it('defaults to ua', () => expect(loadLang(memStorage())).toBe('ua'))
  it('reads a stored en', () => expect(loadLang(memStorage({ 'ensi-lang': 'en' }))).toBe('en'))
  it('ignores garbage', () => expect(loadLang(memStorage({ 'ensi-lang': 'xx' }))).toBe('ua'))
  it('survives a throwing storage', () => {
    expect(loadLang({ getItem() { throw new Error('blocked') } })).toBe('ua')
  })
  it('saves and reloads', () => {
    const s = memStorage(); saveLang('en', s); expect(loadLang(s)).toBe('en')
  })
})
