import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import { createRequire } from 'module'
import path from 'path'
import postcss from 'postcss'
import { compile } from 'tailwindcss'
import tailwindcssPostcss from '@tailwindcss/postcss'
import qPlugin from '../src/tailwind-plugin'

const requireCjs = createRequire(__filename)
const repoRoot = path.join(__dirname, '..')
const distPlugin = path.join(repoRoot, 'dist/tailwind-plugin.js')

const loadQuantumPlugin = async () => ({
  path: path.join(repoRoot, 'src/tailwind-plugin.ts'),
  base: repoRoot,
  module: qPlugin
})

/**
 * The base rule from `src/tailwind-base.ts`, as it survives a compile.
 *
 * A pattern rather than a literal because the two callers below see it
 * differently: the built stylesheet has been through Lightning CSS, which drops
 * the quotes in the attribute selector, and neither output's whitespace is a
 * contract worth asserting on.
 */
const BASE_CURSOR_RULE =
  /button:not\(:disabled\),\s*\[role="?button"?\]:not\(:disabled\)\s*\{\s*cursor:\s*pointer;?\s*\}/

/**
 * The contents of every `@layer base { … }` block in a stylesheet, joined.
 *
 * Asserting on the whole file is not enough. `button:not(:disabled)` is
 * specificity (0,1,1) and `.cursor-default` is (0,1,0), so the only reason
 * Accordion's trigger keeps its arrow is that base is an earlier cascade layer.
 * The same rule emitted unlayered — trivial to do by accident, since an
 * `@layer base` block written straight into src/global.css does exactly that —
 * outranks every layer and silently breaks it, while a whole-file match stays
 * green.
 */
const baseLayerOf = (css: string) => {
  const marker = '@layer base'
  let out = ''

  for (let i = css.indexOf(marker); i !== -1; i = css.indexOf(marker, i + 1)) {
    const open = css.indexOf('{', i)
    // `@layer theme, base, …;` is a declaration, not a block — skip it.
    if (open === -1 || css.slice(i + marker.length, open).includes(';'))
      continue

    let depth = 0
    for (let j = open; j < css.length; j++) {
      if (css[j] === '{') depth++
      else if (css[j] === '}' && --depth === 0) {
        out += css.slice(open + 1, j)
        i = j
        break
      }
    }
  }

  return out
}

// A fresh global copy each call: a shared /g regex would carry `lastIndex`
// between `.test()` calls and start returning false on alternate invocations.
const countRule = (css: string) =>
  css.match(new RegExp(BASE_CURSOR_RULE.source, 'g'))?.length ?? 0

/**
 * A representative class per theme key the plugin contributes, mapped to the
 * declaration only the Quantum config can produce.
 *
 * The declaration, not the selector, is the assertion that means something.
 * Core Tailwind 4 emits `.stroke-2` unaided through bare-value support, so a
 * selector-only check stays green with `theme.strokeWidth` deleted while every
 * stroke silently loses its unit (`2px` -> `2`). The same trap applies to any
 * candidate core can emit without help.
 */
const CANDIDATES = {
  'bg-brandGreen-100': {
    themeKey: 'colors',
    declaration: 'background-color: #03e5a4'
  },
  'text-primary-80': { themeKey: 'colors', declaration: 'color: #0c3d60' },
  'border-brandGreen-30': {
    themeKey: 'colors',
    declaration: 'border-color: #b2f7e1'
  },
  'shadow-brandGreen': {
    themeKey: 'boxShadow',
    declaration: '--tw-shadow: 0px 0px 0px 4px var(--tw-shadow-color, #03e5a4)'
  },
  'font-sans': { themeKey: 'fontFamily', declaration: "font-family: 'Inter'," },
  'stroke-1': { themeKey: 'strokeWidth', declaration: 'stroke-width: 1px' },
  'stroke-2': { themeKey: 'strokeWidth', declaration: 'stroke-width: 2px' },
  'animate-slideDown': {
    themeKey: 'animation',
    declaration: 'animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)'
  }
} as const

describe('tailwind plugin supplies the Quantum theme', () => {
  it('emits the configured declaration for every theme key it contributes', async () => {
    const compiler = await compile('@plugin "quantum";\n@tailwind utilities;', {
      base: repoRoot,
      loadModule: loadQuantumPlugin
    })

    // One build call for all candidates: the compiler accumulates across calls.
    const css = compiler.build(Object.keys(CANDIDATES))

    for (const [candidate, { themeKey, declaration }] of Object.entries(
      CANDIDATES
    )) {
      expect(`${themeKey} (${candidate}): ${css.includes(declaration)}`).toBe(
        `${themeKey} (${candidate}): true`
      )
    }
  })

  /**
   * v3's preflight set `cursor: pointer` on buttons and v4's does not, so
   * without this rule every button in the library turns into an arrow on
   * upgrade. It has to come from the plugin: a consumer on any of the README's
   * Tailwind routes loads `@plugin`/`plugins: [quantumPlugin]` and never
   * imports `dist/global.css`, so a `@layer base` block in `src/global.css`
   * would not reach them.
   */
  it('restores the pointer cursor v4 preflight drops', async () => {
    const compiler = await compile('@plugin "quantum";\n@tailwind base;', {
      base: repoRoot,
      loadModule: loadQuantumPlugin
    })

    const css = compiler.build([])

    expect(`base cursor rule: ${BASE_CURSOR_RULE.test(css)}`).toBe(
      'base cursor rule: true'
    )
  })

  it('does not mutate the consumer content config', () => {
    // Tailwind v4 replaced `content` with source detection. The plugin used to
    // push Quantum's own path into `content`, which breaks a v4 compile.
    const seen: unknown[] = []
    qPlugin.handler({
      config: (...args: unknown[]) => {
        seen.push(args)
        return undefined
      },
      // Not optional padding: the handler calls `addBase`, and the container
      // cast below would let a missing key through to a runtime TypeError.
      addBase: () => undefined
    } as unknown as Parameters<typeof qPlugin.handler>[0])

    expect(seen).toEqual([])
  })
})

/**
 * The bugs this guards against only appear in the *published* artifact: Tailwind
 * loads `dist/tailwind-plugin.js` through its own resolver, and a CJS
 * `exports.default` build fails there while passing every source-level test.
 *
 * `npm run build` runs before `npm test` in CI, so this always runs there. It is
 * skipped for anyone running `npm test` against a clean tree.
 */
const describeBuilt = fs.existsSync(distPlugin) ? describe : describe.skip

if (!fs.existsSync(distPlugin)) {
  console.warn(
    '[plugin.test] dist/ not found — skipping published-artifact tests. Run `npm run build` first.'
  )
}

const pkg = JSON.parse(
  fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
)

/**
 * A Tailwind candidate that appears nowhere in this repo except this file, used
 * to prove `src/global.css` is not scanning `__tests__/`. Keep it meaningless
 * and keep it here: if it ever becomes a class a component might plausibly use,
 * it stops being a canary. See the scope test at the bottom of this file.
 */
const SCOPE_SENTINEL = 'bg-[#c0ffee]'

describeBuilt('published artifact loads in a real Tailwind build', () => {
  const exported = pkg.exports['./tailwind-plugin']

  it('exposes both an ESM and a CJS entry point', () => {
    expect(exported).toEqual({
      import: './dist/tailwind-plugin.mjs',
      require: './dist/tailwind-plugin.js'
    })
    expect(fs.existsSync(path.join(repoRoot, exported.import))).toBe(true)
    expect(fs.existsSync(path.join(repoRoot, exported.require))).toBe(true)
  })

  // Tailwind resolves `@plugin` through the `import` condition. A CJS build
  // using `exports.default` fails here with "x is not a function" while passing
  // every source-level test, so this must run against the real ESM artifact.
  it('is loadable via @plugin and emits Quantum utilities', async () => {
    const result = await postcss([tailwindcssPostcss()]).process(
      `@plugin "${exported.import}";\n@tailwind base;\n@tailwind utilities;`,
      { from: path.join(repoRoot, 'fixture.test.css') }
    )

    expect(result.css).toContain('.bg-brandGreen-100')
    expect(result.css).toContain('#03e5a4')

    // The base rule has to be asserted here and not only at source level: the
    // source-level suite loads `src/tailwind-plugin.ts` directly, so a plugin
    // published without the `addBase` call would ship green on that alone.
    // This is the artifact a consumer's `@plugin` actually resolves.
    expect(
      `published base cursor rule: ${BASE_CURSOR_RULE.test(result.css)}`
    ).toBe('published base cursor rule: true')
  })

  // The `@config` route loads the CJS build through `require` in a JS config.
  it('is requireable from CJS and carries the full theme', () => {
    const required = requireCjs(path.join(repoRoot, exported.require))
    const plugin = required.default ?? required

    expect(typeof plugin.handler).toBe('function')
    expect(Object.keys(plugin.config.theme).sort()).toEqual([
      'boxShadow',
      'colors',
      'extend',
      'fontFamily',
      'strokeWidth'
    ])
  })

  it('does not bundle Tailwind into the plugin', () => {
    const source = fs.readFileSync(distPlugin, 'utf8')
    expect(source).not.toContain('node_modules/tailwindcss/dist')
  })

  // `tailwindcss` is marked external in tsup.config.ts, so the published plugin
  // resolves `tailwindcss/plugin` from the *consumer's* tree. npm hoists, which
  // is why a tarball smoke test passes either way; pnpm and Yarn PnP do not, and
  // the plugin dies there with "Cannot find module 'tailwindcss/defaultTheme'"
  // unless the dependency is declared.
  it('declares the externalised Tailwind as a peer dependency', () => {
    expect(pkg.peerDependencies.tailwindcss).toBeDefined()
    // Optional: the Tailwind-free `dist/global.css` route needs no Tailwind.
    expect(pkg.peerDependenciesMeta.tailwindcss.optional).toBe(true)
  })
})

/**
 * `src/global.css` is a tsup entry, so it ships as `dist/global.css` — the
 * stylesheet the README's Tailwind-free route imports.
 *
 * Under v4 a JS config is loaded only when a CSS entrypoint asks for it, so
 * without an `@config` this file still compiles to preflight plus the default
 * theme and every Quantum token silently vanishes. It is not empty and it does
 * not error, so neither `npm run build` nor a file-exists check notices.
 */
describeBuilt('published global.css carries the Quantum theme', () => {
  const globalCss = () =>
    fs.readFileSync(path.join(repoRoot, 'dist/global.css'), 'utf8')

  /**
   * One declaration per theme key, as it appears in the *built* stylesheet.
   *
   * Separate from `CANDIDATES` above on purpose. These must be classes `src/`
   * genuinely uses, and `src/` uses most of them only in variant form
   * (`focus-within:shadow-brandGreen`, `data-[state=open]:animate-slideDown`),
   * so the selector text belongs to the component while the declaration is what
   * the config contributes. The built file also goes through Lightning CSS,
   * which normalises `'Inter'` to `"Inter"` — hence its own expectations rather
   * than reusing the plugin-level ones.
   *
   * Each of these is absent when the `@config` is removed from src/global.css.
   */
  const THEME_DECLARATIONS = {
    colors: 'color: #f4f8fa',
    boxShadow: '--tw-shadow: 0px 0px 0px 4px var(--tw-shadow-color, #03e5a4)',
    fontFamily: '"Inter",',
    strokeWidth: 'stroke-width: 1px',
    animation: 'animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)'
  } as const

  it('emits the configured declaration for every theme key', () => {
    const css = globalCss()

    for (const [themeKey, declaration] of Object.entries(THEME_DECLARATIONS)) {
      expect(`${themeKey}: ${css.includes(declaration)}`).toBe(
        `${themeKey}: true`
      )
    }
  })

  // `darkMode: 'class'` lives in tailwind.config.ts, so a class-based `dark:`
  // is second proof the config was actually loaded — v4 defaults to a
  // `prefers-color-scheme` media query, which would make the components' dark
  // mode operating-system dependent.
  it('drives dark mode from the .dark class, not the OS', () => {
    const css = globalCss()

    expect(css).toContain(':is(.dark')
    expect(css).not.toContain('prefers-color-scheme: dark')
  })

  /**
   * `src/global.css` uses `source(none)` plus an explicit `@source '../src'`, so
   * `src/` is the exhaustive source list as it was under v3's `content`.
   *
   * Without that, v4's automatic source detection scans the whole repo and the
   * published stylesheet picks up classes from `stories/` and from this very
   * file — `.text-primary-80` and `.stroke-2` shipped to consumers that way.
   *
   * The canary is a sentinel that exists nowhere else in the repo rather than a
   * real utility. Probing with a real one would be self-defeating: it only works
   * while no component happens to use it, so the day someone writes
   * `text-primary-80` in `src/` the assertion has to be deleted and the
   * regression it guards goes unnoticed. The arbitrary colour can never be
   * legitimately used, and the first assertion keeps the second from quietly
   * becoming vacuous if the sentinel is ever edited out.
   */
  it('scans only src/, so stories and tests cannot reach consumers', () => {
    expect(fs.readFileSync(__filename, 'utf8')).toContain(SCOPE_SENTINEL)

    // Matches the emitted value, so a variant form (`hover:bg-[#c0ffee]`) is
    // caught too — its selector would not contain the bare candidate.
    expect(globalCss()).not.toContain('c0ffee')
  })

  /**
   * The other half of the base-layer check in the plugin suite above, and a
   * genuinely separate route: that one covers consumers who load the plugin,
   * this one covers the consumer who imports this stylesheet instead and never
   * touches the plugin. They arrive by different paths — `@plugin` there, the
   * `@config` in src/global.css here — so removing either registration leaves
   * the other test green.
   */
  it('carries the pointer-cursor base rule for the Tailwind-free route', () => {
    const inBaseLayer = BASE_CURSOR_RULE.test(baseLayerOf(globalCss()))

    expect(`base cursor rule in @layer base: ${inBaseLayer}`).toBe(
      'base cursor rule in @layer base: true'
    )
  })

  /**
   * Accordion's trigger sets `cursor-default` on purpose and has to keep it.
   *
   * That works only because the rule is layered. `button:not(:disabled)` is
   * specificity (0,1,1) against `.cursor-default`'s (0,1,0), so an unlayered
   * copy would outrank the utility and turn the trigger into a pointer — with
   * every other assertion in this file still green, since the rule would still
   * be present and the layer statement would still read the same.
   *
   * Hence counting: every occurrence in the file must be inside `@layer base`,
   * and base must precede utilities in the order statement Tailwind emits.
   */
  it('layers that rule below utilities, so cursor-default still wins', () => {
    const css = globalCss()

    expect(
      `unlayered copies: ${countRule(css) - countRule(baseLayerOf(css))}`
    ).toBe('unlayered copies: 0')

    // The statement that names `utilities`, not simply the first one — the file
    // opens with a standalone `@layer properties;`.
    const order = [...css.matchAll(/@layer ([^;{]+);/g)]
      .map(([, names]) => names.split(', '))
      .find(names => names.includes('utilities'))

    expect(order).toBeDefined()
    expect(order!.indexOf('base')).toBeGreaterThan(-1)
    expect(order!.indexOf('base')).toBeLessThan(order!.indexOf('utilities'))
    expect(css).toContain('.cursor-default {')
  })

  it('is resolvable through the exports map', () => {
    expect(pkg.exports['./dist/global.css']).toBe('./dist/global.css')
  })
})
