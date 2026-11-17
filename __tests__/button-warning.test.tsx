import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import { Button } from '../src/components/Button'
import { IconButton } from '../src/components/IconButton'
import { button } from '../src/colors/button'
import { colors } from '../src/colors/base'
import { feedback } from '../src/colors/feedback'
import { classesOf } from './helpers/markup'

const AA_TEXT = 4.5

const luminance = (hex: string) => {
  const value = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4]
    .map(i => parseInt(value.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const ratioOf = (fg: string, bg: string) => {
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x)
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100
}

const warning = classesOf(<Button variant="warning">Archive</Button>)
const text = colors.grey['900']

describe('warning Button', () => {
  it('fills with the same yellow Toast and Notice use for warnings', () => {
    expect(button.warning.DEFAULT).toBe(feedback.warning.DEFAULT)
    expect(warning).toContain('bg-button-warning')
  })

  it('writes dark text on the yellow rather than white', () => {
    expect(warning).toContain('text-grey-900')
    expect(warning).not.toContain('text-white')
  })

  it.each([
    ['rest', button.warning.DEFAULT],
    ['hover', button.warning.hover.DEFAULT],
    ['focus', button.warning.focus.DEFAULT]
  ])('clears AA at %s', (_state, surface) => {
    expect(ratioOf(text, surface)).toBeGreaterThanOrEqual(AA_TEXT)
  })

  it('has the ratios quoted in the pull request', () => {
    expect({
      rest: ratioOf(text, button.warning.DEFAULT),
      hover: ratioOf(text, button.warning.hover.DEFAULT),
      focus: ratioOf(text, button.warning.focus.DEFAULT)
    }).toEqual({ rest: 11.33, hover: 7.79, focus: 7.79 })
  })

  it('would fail AA with white text, which is why it does not use it', () => {
    expect(ratioOf('#FFFFFF', button.warning.DEFAULT)).toBeLessThan(AA_TEXT)
  })

  it('uses the system focus ring, which stays visible next to the yellow', () => {
    expect(warning).toContain('focus:shadow-brandGreen')
  })

  it('gives its disabled state a dark background', () => {
    expect(warning).toContain('dark:disabled:bg-button-warning-disabled-dark')
  })

  it('reaches IconButton, which borrows the same variant', () => {
    expect(
      classesOf(<IconButton variant="warning" icon={<svg />} label="Archive" />)
    ).toContain('bg-button-warning')
  })
})
