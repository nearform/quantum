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

const groupClasses = (variant?: 'primary' | 'secondary') =>
  classesOf(<ButtonGroup variant={variant}>{null}</ButtonGroup>)

const buttonClasses = (variant: 'primary' | 'secondary') =>
  classesOf(<Button variant={variant}>One</Button>)

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

const memberColours = (classNames: string[], property: 'bg' | 'text') =>
  parse(
    classNames,
    new RegExp(`^(dark:)?\\[&>\\*(:([a-z-]+))?\\]:${property}-(.+)$`)
  )

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

  it('paints nothing on the group box itself', () => {
    expect(group.filter(name => /^(dark:)?bg-/.test(name))).toEqual([])
  })
})

describe('ButtonGroup focus', () => {
  it('fills with the primary default rather than a brandGreen wash', () => {
    expect(primary).toContain('[&>*:focus]:bg-button-primary-focus')
    expect(button.primary.focus.DEFAULT).toBe(accent.DEFAULT)
    expect(primary).not.toContain('[&>*:focus]:bg-secondary-100')
  })

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

  it('gives that ring room to paint', () => {
    expect(primary).not.toContain('overflow-hidden')
    expect(primary).toContain('[&>*:focus]:z-10')
  })
})

describe('ButtonGroup in dark mode', () => {
  it('rests on the brand light blue, not white', () => {
    expect(primary).toContain('dark:[&>*]:bg-button-primary-dark')
    expect(button.primary.dark).toBe(colors.brandMidnight['10'])
    expect(button.primary.dark).not.toBe('#FFF')
  })

  it('keeps one text colour across surfaces that are all light', () => {
    expect(primary).toContain('dark:[&>*]:text-foreground-inverse-dark')
    expect(
      primary.filter(name => /^dark:\[&>\*:[a-z-]+\]:text-/.test(name))
    ).toEqual(['dark:[&>*:disabled]:text-foreground-subtle'])
  })
})

const AA_TEXT = 4.5

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

  it('records the ratios its dark surfaces were chosen for', () => {
    expect({
      resting: ratioOf(foreground.inverse.dark, button.primary.dark),
      hover: ratioOf(foreground.inverse.dark, button.primary.hover.dark)
    }).toEqual({ resting: 16.47, hover: 6.79 })
  })
})
