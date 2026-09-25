import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import { createRequire } from 'module'
import path from 'path'

import * as entryPoint from '../src/index'

// `require` rather than a dynamic import: the path is computed per component,
// so it cannot be a static import, and ts-jest emits CommonJS here anyway.
const requireCjs = createRequire(__filename)
const componentsDir = path.join(__dirname, '../src/components')

/**
 * Every directory under `src/components/` is a component that belongs in the
 * public API, so the entry point is checked against the directory listing
 * rather than against a hand-kept list that could drift the same way.
 *
 * `StepsIndicator` was missing from the barrel file for several releases
 * (#917) with nothing to catch it: its story imported it through a deep
 * `@/components/...` path, so Storybook rendered it while consumers of the
 * published package could not import it at all.
 */
const componentNames = fs
  .readdirSync(componentsDir, { withFileTypes: true })
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

describe('package entry point', () => {
  it('finds the component directories to check against', () => {
    expect(componentNames.length).toBeGreaterThan(0)
  })

  it.each(componentNames)('re-exports every symbol of %s', name => {
    const component = requireCjs(path.join(componentsDir, name)) as Record<
      string,
      unknown
    >
    const symbols = Object.keys(component).filter(key => key !== 'default')

    expect(symbols.length).toBeGreaterThan(0)
    expect(Object.keys(entryPoint)).toEqual(expect.arrayContaining(symbols))
  })
})
