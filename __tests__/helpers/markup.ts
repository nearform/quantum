import type * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { parse, type HTMLElement } from 'node-html-parser'

const render = (element: React.ReactElement): HTMLElement =>
  parse(renderToStaticMarkup(element))

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

export const classesOf = (element: React.ReactElement, selector?: string) =>
  (elementOf(element, selector).getAttribute('class') ?? '').split(' ')
