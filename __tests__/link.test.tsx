import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { Link } from '../src/components/Link'

const classesOf = (html: string) =>
  (html.match(/<a[^>]*class="([^"]*)"/)?.[1] ?? '').split(' ')

describe('Link', () => {
  it('keeps the nav presentation by default', () => {
    const classes = classesOf(renderToStaticMarkup(<Link href="/">Home</Link>))

    expect(classes).toEqual(
      expect.arrayContaining(['flex', 'py-1', 'px-1.5', 'hover:bg-grey-100'])
    )
  })

  it('renders the same classes for an explicit nav variant', () => {
    expect(
      renderToStaticMarkup(
        <Link href="/" variant="nav">
          Home
        </Link>
      )
    ).toBe(renderToStaticMarkup(<Link href="/">Home</Link>))
  })

  it('flows inline without padding, flex layout or a hover background', () => {
    const classes = classesOf(
      renderToStaticMarkup(
        <Link href="/settings" variant="inline">
          Settings
        </Link>
      )
    )

    expect(classes).toEqual(
      expect.arrayContaining(['inline', 'underline', 'underline-offset-2'])
    )
    expect(classes).not.toContain('flex')
    expect(classes.some(c => /^(p|px|py)-/.test(c))).toBe(false)
    expect(classes.some(c => c.includes('bg-'))).toBe(false)
    expect(classes.some(c => /(^|:)text-/.test(c))).toBe(false)
  })

  it('gives the inline link hover and focus-visible states with the brand ring', () => {
    const classes = classesOf(
      renderToStaticMarkup(
        <Link href="/settings" variant="inline">
          Settings
        </Link>
      )
    )

    expect(classes).toEqual(
      expect.arrayContaining([
        'hover:decoration-2',
        'focus-visible:decoration-2',
        'focus-visible:shadow-brandGreen',
        'dark:focus-visible:shadow-brandGreen10'
      ])
    )
  })

  it('marks a selected inline link as current without the nav fill', () => {
    const html = renderToStaticMarkup(
      <Link href="/here" variant="inline" selected>
        Here
      </Link>
    )
    const classes = classesOf(html)

    expect(html).toContain('aria-current="page"')
    expect(classes).not.toContain('bg-background-inverse')
  })
})
