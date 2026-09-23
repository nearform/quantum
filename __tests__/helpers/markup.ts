import type * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { parse, type HTMLElement } from 'node-html-parser'

/**
 * The markup a component renders, parsed rather than pattern-matched.
 *
 * Every suite that asserts on a class list had grown its own copy of the same
 * three regexes -- `<button\b[^>]*>` for the opening tag, `\sclass="([^"]*)"`
 * for the attribute, and a hand-written `&amp;`/`&gt;`/`&lt;` pass to undo the
 * escaping, which this library needs on every single read because its
 * arbitrary variants are full of `&` and `>` (`[&>*:hover]:bg-x`). A parser
 * does all three, and does it once.
 *
 * Still no DOM. `renderToStaticMarkup` into a parser keeps these suites on the
 * `node` environment, which is the reason `avatar-image.test.tsx` gives for
 * scoping `jest-environment-jsdom` to itself: a static render pins markup
 * without pulling in a browser.
 */
const render = (element: React.ReactElement): HTMLElement =>
  parse(renderToStaticMarkup(element))

/**
 * The element a component renders, or the first descendant matching
 * `selector`. `'*'` is the first element in document order, which for a
 * component is its own root.
 */
export const elementOf = (
  element: React.ReactElement,
  selector = '*'
): HTMLElement => {
  const html = render(element)
  const match = html.querySelector(selector)
  if (!match) {
    throw new Error(`no ${selector} in ${html.toString()}`)
  }
  return match
}

/**
 * The class list of that element.
 *
 * `getAttribute('class')` rather than `classList`: only the former decodes
 * entities, so `classList` reports `[&amp;>*:hover]:bg-x` and every assertion
 * against an arbitrary variant silently stops matching.
 */
export const classesOf = (element: React.ReactElement, selector?: string) =>
  (elementOf(element, selector).getAttribute('class') ?? '').split(' ')
