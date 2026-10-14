import { describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { Notice } from '../src/components/Notice'

const classOf = (html: string, tag: string, index = 0) =>
  [...html.matchAll(new RegExp(`<${tag}[^>]*class="([^"]*)"`, 'g'))][
    index
  ]?.[1] ?? ''

describe('Notice', () => {
  it('keeps inline content with a link in one text container', () => {
    const html = renderToStaticMarkup(
      <Notice variant="warning">
        Add an API key in <a href="/settings">Settings</a>.
      </Notice>
    )

    expect(html).toContain(
      '<div class="min-w-0">Add an API key in <a href="/settings">Settings</a>.</div>'
    )
  })

  it('renders paragraphs and lists inside a div, not a span', () => {
    const html = renderToStaticMarkup(
      <Notice>
        <p>First</p>
        <ul>
          <li>Item</li>
        </ul>
      </Notice>
    )

    expect(html).toMatch(/<div class="min-w-0"><p>First<\/p><ul>/)
  })

  it('keeps the centred single-line layout without a title', () => {
    const html = renderToStaticMarkup(<Notice>Saved.</Notice>)
    const root = classOf(html, 'div')

    expect(root).toContain('items-center')
    expect(root).toContain('justify-center')
    expect(root).toContain('px-10')
    expect(html).not.toContain('font-semibold')
  })

  it('left-aligns the notice and shows the title above its content', () => {
    const html = renderToStaticMarkup(
      <Notice title="Setup needed" description="Runs can't start yet.">
        <ul>
          <li>Missing API key</li>
        </ul>
      </Notice>
    )
    const root = classOf(html, 'div')

    expect(root).toContain('items-start')
    expect(root).toContain('justify-start')
    expect(root).toContain('px-4')
    expect(root).not.toContain('items-center')
    expect(root).not.toContain('px-10')
    expect(html).toMatch(
      /<div class="font-semibold">Setup needed<\/div><div>Runs can&#x27;t start yet.<\/div><div><ul>/
    )
  })

  it('sizes the icon box to the title line so the icon is level with it', () => {
    const html = renderToStaticMarkup(<Notice title="Title">Body</Notice>)
    const icon = html.match(/<span aria-hidden="true" class="([^"]*)"/)![1]

    expect(icon).toContain('h-5')
    expect(icon).toContain('items-center')
  })

  it('pins the dismiss button to the title row and leaves room for it', () => {
    const html = renderToStaticMarkup(
      <Notice title="Title" onDismiss={() => {}}>
        Body
      </Notice>
    )
    const root = classOf(html, 'div')
    const button = classOf(html, 'button')

    expect(root).toContain('pr-10')
    expect(button).toContain('top-2')
    expect(button).not.toContain('top-1/2')
  })

  it('centres the dismiss button vertically without a title', () => {
    const html = renderToStaticMarkup(
      <Notice onDismiss={() => {}}>Body</Notice>
    )

    expect(classOf(html, 'button')).toContain('top-1/2')
  })

  it.each([undefined, null, ''])('treats title=%p as no title', title => {
    const html = renderToStaticMarkup(<Notice title={title}>Body</Notice>)

    expect(classOf(html, 'div')).toContain('justify-center')
    expect(html).not.toContain('font-semibold')
  })

  it('does not forward title as an HTML tooltip attribute', () => {
    const html = renderToStaticMarkup(<Notice title="Heading">Body</Notice>)

    expect(html).not.toContain('title=')
  })
})
