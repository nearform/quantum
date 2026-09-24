import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { BsPersonFill } from '../src/assets'
import { Input } from '../src/components/Input'
import { Password } from '../src/components/Password'

/**
 * The design file gives the field two heights and its icons two sizes, and
 * #264 was opened because the component had neither: one height, which came
 * out of the padding and the inherited font rather than out of the design (it
 * was 40px when the issue was filed and 52px by the time it was fixed), and
 * icons left at whatever `1em` resolved to. `lg` is a third height, added on
 * top of the two the design draws to match a large `Button`.
 *
 * Nothing here can measure a pixel — this suite has no DOM and no compiled
 * CSS, and the utility classes are the only place the numbers exist. So the
 * classes are what is asserted, which catches the regression worth guarding
 * against: a size dropped, renamed, or merged away by a later edit to a class
 * list that is otherwise only checked by eye in Storybook.
 */
const openingTags = (html: string, tag: string) =>
  html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? []

/**
 * Class lists reach the markup escaped — `[&>svg]:h-4` renders as
 * `[&amp;&gt;svg]:h-4` — so they are unescaped before being compared against
 * the classes as they are written in the source.
 */
const classes = (tag: string) =>
  (tag.match(/\sclass="([^"]*)"/)?.[1] ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .split(' ')

const classesOf = (element: React.ReactElement, tag: string, index: number) => {
  const html = renderToStaticMarkup(element)
  const match = openingTags(html, tag)[index]
  if (!match) {
    throw new Error(`no <${tag}> at index ${index} in ${html}`)
  }
  return classes(match)
}

/** The field itself: the outer element of an input with no label or help text. */
const field = (element: React.ReactElement) => classesOf(element, 'div', 0)

/** The wrapper the leading icon sits in, which is the field's first child. */
const leftSide = (element: React.ReactElement) => classesOf(element, 'div', 1)

const clearButton = (element: React.ReactElement) =>
  classesOf(element, 'button', 0)

describe('Input dimensions', () => {
  it('is 40px tall by default', () => {
    expect(
      field(<Input type="text" variant="primary" onClear={() => {}} />)
    ).toContain('h-10')
  })

  it('is 37px tall at the small size', () => {
    expect(
      field(
        <Input type="text" variant="primary" size="sm" onClear={() => {}} />
      )
    ).toContain('h-[37px]')
  })

  it('is 48px tall at the large size, which is a large Button', () => {
    expect(
      field(
        <Input type="text" variant="primary" size="lg" onClear={() => {}} />
      )
    ).toContain('h-[48px]')
  })

  it('keeps its height when the field is disabled', () => {
    // The height is set on the field, so the disabled fill does not change it.
    // Dropping the border used to leave a disabled field shorter than the rest.
    expect(
      field(<Input type="text" variant="primary" disabled onClear={() => {}} />)
    ).toContain('h-10')
  })

  it('lets a caller replace the height rather than adding to it', () => {
    const rendered = field(
      <Input
        type="text"
        variant="primary"
        formClassName="h-[50px]"
        onClear={() => {}}
      />
    )

    expect(rendered).toContain('h-[50px]')
    expect(rendered).not.toContain('h-10')
  })

  it('sizes the leading icon at 16px, whoever supplied it', () => {
    const supplied = leftSide(
      <Input
        type="text"
        variant="primary"
        leftSideChild={<BsPersonFill aria-hidden="true" />}
        onClear={() => {}}
      />
    )
    const builtIn = leftSide(
      <Input type="search" variant="primary" onClear={() => {}} />
    )

    for (const wrapper of [supplied, builtIn]) {
      expect(wrapper).toEqual(
        expect.arrayContaining(['[&>svg]:h-4', '[&>svg]:w-4'])
      )
    }
  })

  it('sizes the clear icon at 12px inside a 24px target', () => {
    // 24x24 is the smallest target WCAG 2.5.8 accepts, and `-mr-1.5` is half
    // the difference between the target and the icon: the target grows into
    // the field's padding instead of pushing the cross away from the edge.
    expect(
      clearButton(<Input type="text" variant="primary" onClear={() => {}} />)
    ).toEqual(
      expect.arrayContaining([
        'h-6',
        'w-6',
        '-mr-1.5',
        '[&>svg]:h-3',
        '[&>svg]:w-3'
      ])
    )
  })
})

describe('Password dimensions', () => {
  it('takes the same three heights as Input', () => {
    expect(field(<Password />)).toContain('h-10')
    expect(field(<Password size="sm" />)).toContain('h-[37px]')
    expect(field(<Password size="lg" />)).toContain('h-[48px]')
  })

  it('gives the mask toggle a 24px target too', () => {
    expect(clearButton(<Password />)).toEqual(
      expect.arrayContaining(['h-6', 'w-6'])
    )
  })
})
