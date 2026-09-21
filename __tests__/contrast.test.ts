import { describe, expect, it } from '@jest/globals'

import { colors } from '../src/colors/base'
import { background } from '../src/colors/background'
import { foreground } from '../src/colors/foreground'

/**
 * WCAG 2.x relative luminance and contrast ratio.
 *
 * The same arithmetic axe runs, reimplemented here because the axe gate only
 * sees the pairs a story happens to render. A token pair that no story puts on
 * screen — `foreground-muted` on `background-subtle`, say — can drop below AA
 * and leave the whole suite green, so the palette is checked at the source as
 * well as at the render.
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

const contrastRatio = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const AA_TEXT = 4.5
const AA_NON_TEXT = 3

/** Rounded the way a report states a ratio, so a failure message is readable. */
const ratioOf = (fg: string, bg: string) =>
  Math.round(contrastRatio(fg, bg) * 100) / 100

const SURFACES = {
  light: {
    background: background.DEFAULT,
    'background-alt': background.alt.DEFAULT,
    'background-subtle': background.subtle.DEFAULT
  },
  dark: {
    background: background.dark,
    'background-alt': background.alt.dark,
    'background-subtle': background.subtle.dark
  }
} as const

const surfaceCases = (mode: keyof typeof SURFACES) =>
  Object.entries(SURFACES[mode]).map(
    ([name, value]) => [`${name} in ${mode} mode`, value] as const
  )

describe('body-text tokens against every surface', () => {
  describe.each([
    ['foreground', foreground.DEFAULT, foreground.dark],
    ['foreground-muted', foreground.muted.DEFAULT, foreground.muted.dark]
  ])('%s', (_token, light, dark) => {
    it.each(surfaceCases('light'))('clears AA on %s', (_name, surface) => {
      expect(ratioOf(light, surface)).toBeGreaterThanOrEqual(AA_TEXT)
    })

    it.each(surfaceCases('dark'))('clears AA on %s', (_name, surface) => {
      expect(ratioOf(dark, surface)).toBeGreaterThanOrEqual(AA_TEXT)
    })
  })

  it.each([
    ['light', foreground.inverse.DEFAULT, background.inverse.DEFAULT],
    ['dark', foreground.inverse.dark, background.inverse.dark]
  ])(
    'clears AA for foreground-inverse on background-inverse in %s mode',
    (_mode, fg, bg) => {
      expect(ratioOf(fg, bg)).toBeGreaterThanOrEqual(AA_TEXT)
    }
  )
})

/**
 * `foreground-subtle` is deliberately not a body-text token: it is 4.39:1 on
 * `background-alt`, and darkening it again would land it on `grey-600` and
 * collapse it into `foreground-muted`. What it owes instead is the 3:1 of
 * 1.4.11, for Switch's track and StepsIndicator's dots — and, as a floor rather
 * than a requirement, for the disabled control text 1.4.3 exempts.
 *
 * Only the two surfaces it is rendered on are checked. It is 2.13:1 on
 * `background-alt-dark` and does not belong there at all — that gap is what
 * scopes the token, so holding the whole of `background` to 3:1 would be
 * asserting a rule the palette does not keep. The dark pairing it does keep has
 * almost no room (3.01:1), which is the point: a nudge to either end of it is a
 * decision, not a detail.
 */
describe('foreground-subtle as a non-text token', () => {
  it.each([
    ['light', foreground.subtle.DEFAULT, SURFACES.light],
    ['dark', foreground.subtle.dark, SURFACES.dark]
  ])(
    'stays distinguishable on the surfaces it is rendered on in %s mode',
    (_mode, fg, mode) => {
      // Switch's track and StepsIndicator's dots sit on the page itself;
      // disabled Button, ButtonGroup and Chip text sits on `background-subtle`.
      for (const surface of [mode.background, mode['background-subtle']]) {
        expect(ratioOf(fg, surface)).toBeGreaterThanOrEqual(AA_NON_TEXT)
      }
    }
  )

  // The obvious way to make it clear AA is to darken it to `grey-600`, at which
  // point there is one token wearing two names.
  it('stays lighter than foreground-muted', () => {
    expect(luminance(foreground.subtle.DEFAULT)).toBeGreaterThan(
      luminance(foreground.muted.DEFAULT)
    )
  })
})

/**
 * A hue's `-600` on its own `-100` is the usual chip or badge pairing, and it
 * clears AA on most ramps but not all. The failures are recorded rather than
 * fixed — the ramps are shared with every other use of the colour — so the
 * contract worth holding is that the set does not grow silently, and that the
 * weight the docs send people to instead still works.
 */
describe('a -600 foreground on a -100 background', () => {
  const ramps = Object.entries(colors).filter(
    ([, shades]) => '100' in shades && '600' in shades
  ) as [string, Record<string, string>][]

  it('fails AA on exactly the ramps the palette docs call out', () => {
    const failing = ramps
      .filter(([, shades]) => ratioOf(shades['600'], shades['100']) < AA_TEXT)
      .map(([name]) => name)

    expect(failing.sort()).toEqual(['blue', 'orange', 'pink', 'red'])
  })

  it('clears AA at -700 on every ramp but pink, which needs -800', () => {
    const short = ramps
      .map(([name, shades]) => {
        const weight = name === 'pink' ? '800' : '700'
        return { name, weight, ratio: ratioOf(shades[weight], shades['100']) }
      })
      .filter(({ ratio }) => ratio < AA_TEXT)

    expect(short).toEqual([])
  })
})
