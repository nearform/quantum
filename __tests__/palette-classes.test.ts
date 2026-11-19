import { describe, expect, it } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import tailwindColors from 'tailwindcss/colors'

import colors from '../src/colors'
import theme from '../src/theme'

/**
 * Two kinds of colour class compile without an error and emit no CSS at all,
 * so the element quietly keeps whatever colour it inherits:
 *
 * - A Tailwind hue we do not have. Our palette *replaces* Tailwind's (see
 *   `src/theme.ts`), so `text-gray-800` is nothing: ours is spelt `grey`, and
 *   there is no `amber`, `slate`, `cyan` and so on. Accordion's chevron carried
 *   `text-gray-800` for this reason, unnoticed.
 * - One of our ramps with no shade. `brandGreen`, `grey`, `red` and most others
 *   have no `DEFAULT`, so `bg-brandGreen` is nothing; it needs a shade, as in
 *   `bg-brandGreen-100`. A few names are also shadows, such as
 *   `shadow-brandGreen`, and those are fine.
 *
 * Both names are read from the palettes rather than listed here, so a hue
 * added to either side is checked without touching this file.
 */
const UTILITY =
  '(bg|text|border(?:-[trblxy])?|ring|outline|fill|stroke|from|via|to|divide|decoration|accent|caret|placeholder|shadow)'

const isRamp = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' && value !== null

const MISSING_HUES = Object.entries(tailwindColors)
  .filter(([name, value]) => isRamp(value) && !(name in colors))
  .map(([name]) => name)

const UNSHADED_RAMPS = Object.entries(colors)
  .filter(([, value]) => isRamp(value) && !('DEFAULT' in value))
  .map(([name]) => name)

const NAMED_SHADOWS = Object.keys(theme.boxShadow)

const missingHueClass = new RegExp(
  `(?<![-\\w])${UTILITY}-(?:${MISSING_HUES.join('|')})-\\d{2,3}(?![-\\w])`,
  'g'
)
const unshadedRampClass = new RegExp(
  `(?<![-\\w])${UTILITY}-(${UNSHADED_RAMPS.join('|')})(?![-\\w])`,
  'g'
)

const SRC = path.join(__dirname, '../src')
const sourceFiles = (fs.readdirSync(SRC, { recursive: true }) as string[])
  .filter(file => /\.tsx?$/.test(file))
  .map(file => [file, fs.readFileSync(path.join(SRC, file), 'utf8')] as const)

describe('colour classes in src/', () => {
  it('reads the names to look for from the palettes', () => {
    expect(MISSING_HUES).toEqual(expect.arrayContaining(['gray', 'amber']))
    expect(MISSING_HUES).not.toContain('grey')
    expect(UNSHADED_RAMPS).toEqual(
      expect.arrayContaining(['brandGreen', 'grey', 'red'])
    )
    expect(UNSHADED_RAMPS).not.toContain('foreground')
    expect(sourceFiles.length).toBeGreaterThan(50)
  })

  it.each(sourceFiles)('%s uses only hues in our palette', (_file, source) => {
    expect(source.match(missingHueClass) ?? []).toEqual([])
  })

  it.each(sourceFiles)('%s gives every ramp a shade', (_file, source) => {
    const unshaded = [...source.matchAll(unshadedRampClass)]
      .filter(
        ([, utility, name]) =>
          !(utility === 'shadow' && NAMED_SHADOWS.includes(name))
      )
      .map(([match]) => match)
    expect(unshaded).toEqual([])
  })

  // The patterns themselves, so a typo in one cannot pass everything
  it.each([
    ['text-gray-800', true],
    ['hover:bg-amber-50', true],
    ['text-grey-800', false],
    ['bg-brandGreen-100', false]
  ])('flags %s as a missing hue: %p', (cls, flagged) => {
    expect(new RegExp(missingHueClass.source).test(cls)).toBe(flagged)
  })

  it.each([
    ['bg-brandGreen', true],
    ['dark:border-grey', true],
    ['bg-brandGreen-100', false],
    ['text-foreground', false]
  ])('flags %s as an unshaded ramp: %p', (cls, flagged) => {
    expect(new RegExp(unshadedRampClass.source).test(cls)).toBe(flagged)
  })
})
