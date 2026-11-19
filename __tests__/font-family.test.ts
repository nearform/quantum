import { describe, expect, it } from '@jest/globals'
import theme from '../src/theme'

/**
 * We name Inter but do not ship it, so the family names in the stack are what
 * decide whether a consumer's copy of the font is picked up. A self-hosted
 * `@fontsource-variable/inter` registers `'Inter Variable'`, not `'Inter'`: with
 * only `'Inter'` in the stack a consumer who loads it still gets the system font.
 */
describe('the sans font stack', () => {
  const sans = theme.fontFamily.sans

  it("leads with Inter, under both the static and the variable font's names", () => {
    expect(sans.slice(0, 2)).toEqual(["'Inter'", "'Inter Variable'"])
  })

  it('falls back to a system sans-serif', () => {
    expect(sans).toContain('sans-serif')
  })
})
