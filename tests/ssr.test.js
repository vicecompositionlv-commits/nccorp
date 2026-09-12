import { describe, it, expect } from 'vitest'
import { render } from '../src/entry-server.js'

describe('prerender (entry-server)', () => {
  it('renders the Ukrainian page with all sections and meta', async () => {
    const { html, meta } = await render('ua')
    expect(html).toContain('Технології')
    expect(html).toContain('id="about"')
    expect(html).toContain('id="contacts"')
    expect(html).toContain('href="tel:+380947101025"')
    expect(meta.title).toContain('ЕНСІ')
    expect(meta.description.length).toBeGreaterThan(50)
  })

  it('renders the English page', async () => {
    const { html, meta } = await render('en')
    expect(html).toContain('Engineering')
    expect(html).toContain('NC Corporation')
    expect(meta.title).toContain('NC Corporation')
  })
})
