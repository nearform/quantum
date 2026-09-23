import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import { Button } from '../src/components/Button'
import { ButtonGroup } from '../src/components/ButtonGroup'
import palette from '../src/colors'
import { accent } from '../src/colors/accent'
import { button } from '../src/colors/button'
import { colors } from '../src/colors/base'
import { foreground } from '../src/colors/foreground'
import { classesOf } from './helpers/markup'

/**
 * #162 asked the button group for four colour changes and expected all of them
 * to arrive with the button's tokens. Three had: `accent.hover` left
 * `grey-900`, `accent.focus` left `#000` and `button.primary.dark` left `#FFF`
 * when the brand theme landed in #344. The group painted over them anyway --
 * a brandGreen fill on focus, `shadow-none` over the focus ring, and the
 * *light* halves of the hover and focus tokens under `dark:`.
 *
 * So what is asserted is agreement rather than appearance: the group and the
 * `Button` reach for the same token in the same state, and every surface the
 * group paints in light mode has a dark counterpart. There is no DOM and no
 * compiled CSS here, so the utility classes are the only place that agreement
 * exists -- the same reading `button-dark-mode.test.tsx` takes.
 */
const groupClasses = (variant?: 'primary' | 'secondary') =>
  classesOf(<ButtonGroup variant={variant}>{null}</ButtonGroup>)

const buttonClasses = (variant: 'primary' | 'secondary') =>
  classesOf(<Button variant={variant}>One</Button>)

/**
 * The hex a Tailwind colour suffix names, walked out of the palette the theme
 * is built from: `button-primary-hover-dark` -> `button.primary.hover.dark`,
 * `grey-900` -> `colors.grey[900]`, `white` -> the `DEFAULT` under it. No
 * token name contains a hyphen, so one segment per step resolves it.
 *
 * Comparing the colours rather than the class names is the point of the
 * exercise: `text-white` and `text-foreground-dark` are the same white, and
 * `dark:[&>*:hover]:bg-button-primary-hover` was a *different* navy to the one
 * the Button painted while reading as the same token. Anything that does not
 * resolve is not a colour -- `text-sm`, `text-justify` -- and drops out here.
 */
const hexOf = (suffix: string): string | undefined => {
  let node: unknown = palette
  for (const segment of suffix.split('-')) {
    if (typeof node !== 'object' || node === null) return undefined
    node = (node as Record<string, unknown>)[segment]
  }
  if (typeof node === 'object' && node !== null) {
    node = (node as Record<string, unknown>).DEFAULT
  }
  return typeof node === 'string' ? node.toLowerCase() : undefined
}

/**
 * `dark:[&>*:hover]:bg-x` -> `{ mode: 'dark', state: 'hover', hex }`,
 * `[&>*]:bg-x` -> `{ mode: 'light', state: '', hex }`. The member selector is
 * what distinguishes a colour the group paints on its children from one it
 * paints on itself.
 */
const memberColours = (classNames: string[], property: 'bg' | 'text') =>
  parse(
    classNames,
    new RegExp(`^(dark:)?\\[&>\\*(:([a-z-]+))?\\]:${property}-(.+)$`)
  )

/** The same shape, read off a `Button`: `dark:hover:bg-x`, `bg-x`. */
const buttonColours = (classNames: string[], property: 'bg' | 'text') =>
  parse(classNames, new RegExp(`^(dark:)?(([a-z-]+):)?${property}-(.+)$`))

const parse = (classNames: string[], pattern: RegExp) =>
  classNames.flatMap(name => {
    const match = name.match(pattern)
    const hex = match && hexOf(match[4])
    return hex
      ? [{ mode: match[1] ? 'dark' : 'light', state: match[3] ?? '', hex }]
      : []
  })

const primary = groupClasses('primary')
const secondary = groupClasses('secondary')

describe.each([
  ['primary', primary] as const,
  ['secondary', secondary] as const
])('the %s ButtonGroup and the Button it holds', (variant, group) => {
  const member = buttonClasses(variant)

  it.each(['bg', 'text'] as const)(
    'reaches for the same %s token as the Button in every shared state',
    property => {
      const fromButton = buttonColours(member, property)
      const disagreements = memberColours(group, property).filter(painted =>
        fromButton.some(
          own =>
            own.mode === painted.mode &&
            own.state === painted.state &&
            own.hex !== painted.hex
        )
      )

      expect(disagreements).toEqual([])
    }
  )

  /**
   * The regression itself, generalised: a `dark:` rule is only worth writing
   * if it names a different colour than the light one, and `button-*-hover`
   * under `dark:` names the same colour. Every background the group paints on
   * a member in dark mode therefore has to come from a `-dark` token.
   */
  it('takes its dark surfaces from dark tokens', () => {
    const lightTokensInDarkMode = group
      .filter(name => /^dark:\[&>\*[^\]]*\]:bg-button-/.test(name))
      .map(name => name.slice(name.lastIndexOf('bg-') + 'bg-'.length))
      .filter(token => !token.endsWith('-dark'))

    expect(lightTokensInDarkMode).toEqual([])
  })

  it('pairs every member surface it paints in light mode with a dark one', () => {
    const painted = memberColours(group, 'bg')
    const unpaired = painted
      .filter(({ mode }) => mode === 'light')
      .filter(
        light =>
          !painted.some(
            dark => dark.mode === 'dark' && dark.state === light.state
          )
      )
      .map(({ state }) => state || 'resting')

    expect(unpaired).toEqual([])
  })

  /**
   * The group has no background of its own to pair, and it used to: the
   * secondary variant carried a bare `bg-background`, which is white in both
   * modes, and it only went unseen because `overflow-hidden` kept it behind
   * the members. Without the clip it would ring a dark page in white.
   */
  it('paints nothing on the group box itself', () => {
    expect(group.filter(name => /^(dark:)?bg-/.test(name))).toEqual([])
  })
})

describe('ButtonGroup focus', () => {
  // #162: "Focus changed from black to primary default", and the green that
  // used to fill the member moves to the ring around it.
  it('fills with the primary default rather than a brandGreen wash', () => {
    expect(primary).toContain('[&>*:focus]:bg-button-primary-focus')
    expect(button.primary.focus.DEFAULT).toBe(accent.DEFAULT)
    expect(primary).not.toContain('[&>*:focus]:bg-secondary-100')
  })

  // #162: "Colored dropshadow added to focus state".
  it.each([
    ['primary', primary],
    ['secondary', secondary]
  ])(
    'draws the ring the rest of the library draws on %s',
    (_variant, group) => {
      expect(group).toContain('[&>*:focus]:shadow-brandGreen')
      expect(group).not.toContain('[&>*:focus]:shadow-none')
    }
  )

  /**
   * A 4px ring drawn outside a member is invisible under `overflow-hidden` and
   * half-covered by the neighbour painted after it, so the two things that
   * make it visible are asserted with it rather than left to be tidied away.
   */
  it('gives that ring room to paint', () => {
    expect(primary).not.toContain('overflow-hidden')
    expect(primary).toContain('[&>*:focus]:z-10')
  })
})

describe('ButtonGroup in dark mode', () => {
  // #162: "Primary button group changed from white to light blue."
  it('rests on the brand light blue, not white', () => {
    expect(primary).toContain('dark:[&>*]:bg-button-primary-dark')
    expect(button.primary.dark).toBe(colors.brandMidnight['10'])
    expect(button.primary.dark).not.toBe('#FFF')
  })

  /**
   * Every dark surface the primary group paints is a light one, so the text
   * stays dark across all of them -- the white that used to be swapped in on
   * hover and focus was there to survive the light-mode navy those states were
   * wrongly painting.
   */
  it('keeps one text colour across surfaces that are all light', () => {
    expect(primary).toContain('dark:[&>*]:text-foreground-inverse-dark')
    expect(
      primary.filter(name => /^dark:\[&>\*:[a-z-]+\]:text-/.test(name))
    ).toEqual(['dark:[&>*:disabled]:text-foreground-subtle'])
  })
})

const AA_TEXT = 4.5

/**
 * WCAG 2.x contrast, as `contrast.test.ts` and `button-dark-mode.test.ts`
 * compute it. Repeated for the same reason they repeat it: this suite checks
 * one component's pairings, not the palette.
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

const ratioOf = (fg: string, bg: string) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100
}

describe('primary ButtonGroup text against its surfaces', () => {
  it.each([
    ['resting', foreground.inverse.dark, button.primary.dark],
    ['hover', foreground.inverse.dark, button.primary.hover.dark],
    ['light-mode resting', '#FFF', button.primary.DEFAULT],
    ['light-mode hover', '#FFF', button.primary.hover.DEFAULT]
  ])('clears AA on %s', (_state, text, surface) => {
    expect(ratioOf(text, surface)).toBeGreaterThanOrEqual(AA_TEXT)
  })

  // Recorded rather than bounded, the way `button-dark-mode.test.tsx` records
  // the tertiary button's: the figures are quoted in the component's comment,
  // and a palette edit that moves them should fail here and say what to.
  it('has the ratios the component comment quotes', () => {
    expect({
      resting: ratioOf(foreground.inverse.dark, button.primary.dark),
      hover: ratioOf(foreground.inverse.dark, button.primary.hover.dark)
    }).toEqual({ resting: 16.47, hover: 6.79 })
  })
})
