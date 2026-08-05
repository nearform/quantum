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
 * A representative class per theme key the plugin contributes, so a dropped or
 * renamed key fails loudly rather than silently emitting nothing.
 */
const CANDIDATES = {
  'bg-brandGreen-100': 'colors',
  'text-primary-80': 'colors',
  'border-brandGreen-30': 'colors',
  'shadow-brandGreen': 'boxShadow',
  'stroke-2': 'strokeWidth',
  'animate-slideDown': 'animation'
} as const

describe('tailwind plugin supplies the Quantum theme', () => {
  it('emits a utility for every theme key it contributes', async () => {
    const compiler = await compile('@plugin "quantum";\n@tailwind utilities;', {
      base: repoRoot,
      loadModule: loadQuantumPlugin
    })

    const css = compiler.build(Object.keys(CANDIDATES))

    for (const [candidate, themeKey] of Object.entries(CANDIDATES)) {
      expect(`${themeKey}: ${css.includes(`.${candidate}`)}`).toBe(
        `${themeKey}: true`
      )
    }
  })

  it('resolves brand colours to their configured values', async () => {
    const compiler = await compile('@plugin "quantum";\n@tailwind utilities;', {
      base: repoRoot,
      loadModule: loadQuantumPlugin
    })

    expect(compiler.build(['bg-brandGreen-100'])).toContain('#03e5a4')
  })

  it('does not mutate the consumer content config', () => {
    // Tailwind v4 replaced `content` with source detection. The plugin used to
    // push Quantum's own path into `content`, which breaks a v4 compile.
    const seen: unknown[] = []
    qPlugin.handler({
      config: (...args: unknown[]) => {
        seen.push(args)
        return undefined
      }
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

describeBuilt('published artifact loads in a real Tailwind build', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
  )
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
      `@plugin "${exported.import}";\n@tailwind utilities;`,
      { from: path.join(repoRoot, 'fixture.test.css') }
    )

    expect(result.css).toContain('.bg-brandGreen-100')
    expect(result.css).toContain('#03e5a4')
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
})
