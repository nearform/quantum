import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { themeCss } from '../scripts/theme-css'

const GENERATED = path.join(__dirname, '../src/quantum.css')

/**
 * `npm run build:theme` sets this and regenerates the committed stylesheet.
 *
 * Regeneration is driven from the test suite rather than a standalone script
 * because the renderer is TypeScript that imports `src/` through extensionless
 * specifiers: Node cannot load that on its own, and every TS runner available
 * here (jiti, esbuild) is a transitive dependency we do not declare. ts-jest is
 * a direct devDependency and already configured, so this is the one loader the
 * repo actually owns. It is the same write-then-assert shape as `jest -u`.
 */
if (process.env.QUANTUM_WRITE_THEME_CSS === '1') {
  fs.writeFileSync(GENERATED, themeCss())
}

describe('the generated Tailwind stylesheet', () => {
  /**
   * `src/quantum.css` is the only theme Tailwind sees — there is no JS config
   * and no `@config` — while `src/theme.ts` is what `src/tailwind-plugin.ts`
   * hands to consumers on the JS routes. Nothing else keeps the two in step, so
   * a token added to one and not the other would reach half our consumers.
   */
  it('is in sync with src/theme.ts and src/tailwind-base.ts', () => {
    expect(fs.readFileSync(GENERATED, 'utf8')).toBe(themeCss())
  })

  /**
   * The four theme keys outside `extend` in `src/theme.ts` replace Tailwind's
   * defaults; `@theme` merges unless told otherwise. Losing a reset does not
   * error — it silently republishes the whole default palette into
   * `dist/global.css`. Asserted on the renderer, not the file, so it survives a
   * regeneration.
   */
  it('resets every namespace that replaces rather than extends', () => {
    const css = themeCss()

    for (const namespace of ['color', 'shadow', 'font', 'stroke-width']) {
      expect(
        `${namespace}: ${css.includes(`--${namespace}-*: initial;`)}`
      ).toBe(`${namespace}: true`)
    }

    // `keyframes`/`animation` are inside `extend`, so resetting `--animate-*`
    // would be wrong — and would drop Tailwind's own `animate-spin` et al.
    expect(css).not.toContain('--animate-*: initial;')
  })

  /**
   * `brandGreen`, `brandMidnight` and the `slideDown`/`slideUp` animations are
   * camelCase, and that spelling is public API: renaming them to the idiomatic
   * `--color-brand-green` would rename the utility to `bg-brand-green` across
   * every consumer. The decision on record is to keep the camelCase names, which
   * is why package.json floors `tailwindcss` at `4.1.18` — `4.0.0`–`4.1.17` drop
   * theme keys containing an uppercase letter (tailwindlabs/tailwindcss#18114).
   */
  it('keeps the camelCase token names that are public API', () => {
    const css = themeCss()

    for (const variable of [
      '--color-brandGreen-100',
      '--color-primary-80',
      '--shadow-brandGreen',
      '--animate-slideDown',
      '--animate-slideUp'
    ]) {
      expect(`${variable}: ${css.includes(`${variable}:`)}`).toBe(
        `${variable}: true`
      )
    }
  })
})
