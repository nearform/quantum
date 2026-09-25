import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { themeCss } from '../scripts/theme-css'
import colors from '../src/colors'

const GENERATED = path.join(__dirname, '../src/quantum.css')
const SRC = path.join(__dirname, '../src')

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

const COLOUR_UTILITY =
  /^(bg|text|border|ring|fill|stroke|outline|divide|accent|caret|placeholder|decoration|from|via|to)-(.+)$/

/** The utility a candidate ends in, with its variants, `!` and `/opacity` off. */
const utilityOf = (candidate: string) => {
  let depth = 0
  let start = 0

  for (let i = 0; i < candidate.length; i++) {
    const c = candidate[i]
    if (c === '[') depth++
    else if (c === ']') depth--
    // `[&>*:focus]:bg-accent` splits on the second colon, not the first.
    else if (c === ':' && depth === 0) start = i + 1
  }

  return candidate.slice(start).replace(/!$/, '').replace(/\/.*$/, '')
}

const sourceFiles = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return sourceFiles(full)
    return /\.tsx?$/.test(entry.name) ? [full] : []
  })

/** Every `x-<token>` in src/ whose `<token>` starts with a Quantum colour group. */
const colourClassesInSource = () => {
  const groups = new Set(Object.keys(colors))
  const found = new Map<string, string>()

  for (const file of sourceFiles(SRC)) {
    const source = fs.readFileSync(file, 'utf8')

    for (const literal of source.matchAll(/'([^'\n]*)'|"([^"\n]*)"/g)) {
      for (const candidate of (literal[1] ?? literal[2] ?? '').split(/\s+/)) {
        const parts = COLOUR_UTILITY.exec(utilityOf(candidate))
        if (!parts) continue

        const token = parts[2]
        if (groups.has(token.split('-')[0])) found.set(candidate, token)
      }
    }
  }

  return found
}

describe('colour classes in src/ against the generated stylesheet', () => {
  const declared = new Set(
    [
      ...fs
        .readFileSync(GENERATED, 'utf8')
        .matchAll(/--color-([A-Za-z0-9-]+):/g)
    ].map(match => match[1])
  )

  const unresolved = [...colourClassesInSource()]
    .filter(([, token]) => !declared.has(token))
    .map(([candidate]) => candidate)
    .sort()

  it('finds the classes to check', () => {
    expect(colourClassesInSource().size).toBeGreaterThan(100)
  })

  /**
   * Tailwind drops a utility whose theme variable is absent, silently and
   * without a build error, so a token deleted from `src/theme.ts` takes the
   * styling with it while the sync test above stays green.
   *
   * The three below already resolve to nothing and are recorded rather than
   * fixed: `foreground-selected` and `primary-foreground` are not tokens, and
   * `primary` is a ramp with no `DEFAULT`. What this holds is that the set does
   * not grow.
   */
  it('resolves every colour class but the three already dead', () => {
    expect(unresolved).toEqual([
      'bg-primary',
      'selected:text-foreground-selected',
      'text-primary-foreground'
    ])
  })
})
