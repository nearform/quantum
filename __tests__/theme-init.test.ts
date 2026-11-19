/**
 * @jest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { execFileSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import { themeInitScript } from '../src/theme-init'
import * as ThemeToggleModule from '../src/components/ThemeToggle'
import * as entryPoint from '../src/index'

const html = document.documentElement
const repoRoot = path.join(__dirname, '..')

const withSystemDark = (matches: boolean | null) => {
  if (matches === null) {
    // @ts-expect-error jsdom has none; this removes the one a test installed
    delete window.matchMedia
    return
  }
  window.matchMedia = ((query: string) => ({
    matches: query === '(prefers-color-scheme: dark)' && matches
  })) as unknown as typeof window.matchMedia
}

const runScript = () => new Function(themeInitScript)()

beforeEach(() => {
  html.classList.remove('dark')
  localStorage.clear()
})

afterEach(() => withSystemDark(null))

describe('themeInitScript', () => {
  it('opens dark when dark was chosen, whatever the system prefers', () => {
    localStorage.setItem('theme', 'dark')
    withSystemDark(false)
    runScript()
    expect(html.classList.contains('dark')).toBe(true)
  })

  it('opens light when light was chosen, whatever the system prefers', () => {
    html.classList.add('dark')
    localStorage.setItem('theme', 'light')
    withSystemDark(true)
    runScript()
    expect(html.classList.contains('dark')).toBe(false)
  })

  it.each([true, false])(
    'follows the system when nothing was chosen (system dark: %p)',
    systemDark => {
      withSystemDark(systemDark)
      runScript()
      expect(html.classList.contains('dark')).toBe(systemDark)
    }
  )

  it('opens light rather than throwing where there is no matchMedia', () => {
    withSystemDark(null)
    expect(runScript).not.toThrow()
    expect(html.classList.contains('dark')).toBe(false)
  })

  it('is the same script ThemeToggle and the package root export', () => {
    expect(ThemeToggleModule.themeInitScript).toBe(themeInitScript)
    expect(entryPoint.themeInitScript).toBe(themeInitScript)
  })

  // The point of the module: a build config can load it without React
  it('imports nothing, so it can be loaded on its own', () => {
    const source = fs.readFileSync(
      path.join(repoRoot, 'src/theme-init.ts'),
      'utf8'
    )
    expect(source).not.toMatch(/^\s*import\s/m)
    expect(source).not.toMatch(/\brequire\(/)
  })
})

/**
 * `npm run build` runs before `npm test` in CI, so this always runs there. It is
 * skipped for anyone running `npm test` against a clean tree.
 */
const distEntry = path.join(repoRoot, 'dist/theme-init.js')
const describeBuilt = fs.existsSync(distEntry) ? describe : describe.skip

describeBuilt('the published @nearform/quantum/theme-init entry', () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')
  )
  const exported = pkg.exports['./theme-init']

  // Loads the entry in a separate Node process, the way a build config would,
  // and reports the script's length and whether React came along with it
  const load = (code: string) =>
    JSON.parse(
      execFileSync(process.execPath, ['--input-type=module', '-e', code], {
        cwd: repoRoot,
        encoding: 'utf8'
      })
    )

  it.each([
    ['import', exported.import.default],
    ['require', exported.require.default]
  ])('ships the %s entry and its types', (_how, file) => {
    expect(fs.existsSync(path.join(repoRoot, file))).toBe(true)
    expect(
      fs.existsSync(path.join(repoRoot, file.replace(/\.js$/, '.d.ts')))
    ).toBe(true)
  })

  it('loads through ESM and CJS without loading React', () => {
    const result = load(`
      import { createRequire } from 'node:module'
      const require = createRequire(${JSON.stringify(distEntry)})
      const cjs = require(${JSON.stringify(distEntry)})
      const esm = await import(${JSON.stringify(
        path.join(repoRoot, exported.import.default)
      )})
      process.stdout.write(JSON.stringify({
        same: cjs.themeInitScript === esm.themeInitScript,
        length: esm.themeInitScript.length,
        react: Object.keys(require.cache).some(k => k.includes('/node_modules/react/'))
      }))
    `)
    expect(result).toEqual({
      same: true,
      length: themeInitScript.length,
      react: false
    })
  })
})
