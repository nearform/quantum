import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import { Button } from '../src/components/Button'
import { IconButton } from '../src/components/IconButton'
import { button } from '../src/colors/button'
import { foreground } from '../src/colors/foreground'
import { classesOf } from './helpers/markup'

/**
 * #86 was filed against the tertiary button's text colour in dark mode, and
 * the text was the symptom rather than the cause: the variant set its hover,
 * focus and active backgrounds with light-mode-only classes, so dark mode
 * painted `grey-50` and white underneath, and the text was darkened on hover
 * to compensate. Focus was not compensated at all and rendered white on white.
 *
 * So the contract is a pairing rather than a colour: a tertiary button that
 * changes its background in a given state must say what that background is in
 * dark mode too. There is no DOM and no compiled CSS here -- the utility
 * classes are the only place the pairing exists -- so the classes are what is
 * asserted, the same way `input-dimensions.test.tsx` asserts its sizes.
 */
/**
 * The state prefixes of the backgrounds a class list paints in light mode:
 * `hover:bg-x` -> `'hover:'`, `bg-x` -> `''`, `dark:hover:bg-x` -> skipped.
 *
 * `bg-transparent` is skipped with them. It is the resting background, and it
 * is the one value that means the same thing in both modes -- a `dark:`
 * counterpart for it would be the same class written twice.
 */
const lightBackgroundStates = (classNames: string[]) =>
  classNames
    .filter(
      name =>
        !name.startsWith('dark:') &&
        /(^|:)bg-/.test(name) &&
        !name.endsWith('bg-transparent')
    )
    .map(name => name.slice(0, name.lastIndexOf('bg-')))

const tertiary = classesOf(<Button variant="tertiary">Cancel</Button>)

describe('tertiary Button in dark mode', () => {
  it.each([
    ['hover', 'dark:hover:bg-button-tertiary-hover-dark'],
    ['focus', 'dark:focus:bg-button-tertiary-focus-dark'],
    ['active', 'dark:active:bg-button-tertiary-hover-dark']
  ])('gives its %s state a dark background', (_state, className) => {
    expect(tertiary).toContain(className)
  })

  it('takes its text from the foreground token rather than a bare white', () => {
    expect(tertiary).toContain('dark:text-foreground-dark')
  })

  // The regression itself: a background token read as a text colour, to hold
  // the text off a surface that should not have been light in the first place.
  it('never uses a button background token as a text colour', () => {
    expect(tertiary.filter(name => /text-button-/.test(name))).toEqual([])
  })

  it('pairs every background it sets with a dark counterpart', () => {
    const unpaired = lightBackgroundStates(tertiary).filter(
      state => !tertiary.some(name => name.startsWith(`dark:${state}bg-`))
    )

    expect(unpaired).toEqual([])
  })

  // An IconButton is a Button with the label taken out and borrows
  // `buttonVariants` wholesale, so the two sit in a toolbar together and a fix
  // applied to one has to reach the other.
  it('reaches IconButton, which borrows the same variant', () => {
    expect(
      classesOf(<IconButton variant="tertiary" icon={<svg />} label="Close" />)
    ).toContain('dark:hover:bg-button-tertiary-hover-dark')
  })
})

const AA_TEXT = 4.5

/**
 * WCAG 2.x contrast, as `contrast.test.ts` computes it. Repeated rather than
 * shared because that suite checks the palette at the source and this one
 * checks a component's own pairings; the two have no reason to move together.
 */
const luminance = (hex: string) => {
  const value = hex.replace('#', '')
  const full =
    value.length === 3
      ? value
          .split('')
          .map(c => c + c)
          .join('')
      : value

  const [r, g, b] = [0, 2, 4]
    .map(i => parseInt(full.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** Rounded the way a report states a ratio, as `contrast.test.ts` rounds it. */
const ratioOf = (fg: string, bg: string) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100
}

describe('tertiary Button text against its dark surfaces', () => {
  /**
   * 4.5:1 is the contract -- it is what 1.4.3 asks of the text and what a
   * substituted palette would still owe.
   */
  it.each([
    ['hover and active', button.tertiary.hover.dark],
    ['focus', button.tertiary.focus.dark]
  ])('clears AA on %s', (_state, surface) => {
    expect(ratioOf(foreground.dark, surface)).toBeGreaterThanOrEqual(AA_TEXT)
  })

  /**
   * ...and these are the ratios the pairing actually has, which is a separate
   * thing worth holding. The figures are quoted in `Button`'s own comment and
   * in #86, and nothing above stops a later palette edit from halving them and
   * leaving both readings stale while the suite stays green -- there is a lot
   * of room between here and the floor.
   *
   * Recorded rather than bounded, the way `contrast.test.ts` records which
   * ramps fail at `-600` on `-100`: a number that moves should fail, and the
   * failure should say what it moved to, so the comment and the test are
   * updated in the same edit as the colour. Loosening this to a bound is
   * always available and is a decision rather than a detail.
   */
  it('has the ratios the component comment quotes', () => {
    expect({
      hover: ratioOf(foreground.dark, button.tertiary.hover.dark),
      focus: ratioOf(foreground.dark, button.tertiary.focus.dark)
    }).toEqual({ hover: 14.54, focus: 18.75 })
  })
})
