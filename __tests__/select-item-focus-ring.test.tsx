/**
 * @jest-environment jsdom
 */
import { afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../src/components/Select'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {}
  Element.prototype.hasPointerCapture = () => false
  Element.prototype.releasePointerCapture = () => {}
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

let root: Root | undefined
let container: HTMLDivElement | undefined

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  document.body.innerHTML = ''
})

const mountOpen = () => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(
      <Select defaultOpen>
        <SelectTrigger aria-label="Difficulty">
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
    )
  })
  const items = Array.from(
    document.querySelectorAll<HTMLElement>('[role="option"]')
  )
  return { items }
}

const classesOf = (el: Element) => el.className.split(/\s+/)

describe('SelectItem highlighted indicator', () => {
  it('draws a single brand green ring from data-highlighted in both modes', () => {
    const { items } = mountOpen()
    expect(items).toHaveLength(2)
    const classes = classesOf(items[0])

    expect(classes).toContain('data-[highlighted]:shadow-brandGreen')
    expect(classes).toContain('dark:data-[highlighted]:shadow-brandGreen10')
  })

  it('does not also draw an outline or a separate focus-visible ring', () => {
    const { items } = mountOpen()
    const classes = classesOf(items[0])

    expect(classes.filter(c => /outline-(2|current)/.test(c))).toEqual([])
    expect(classes.filter(c => c.includes('focus-visible:'))).toEqual([])
  })

  it('leaves room for the 6px ring inside the scrolling viewport', () => {
    const { items } = mountOpen()
    const viewport = items[0].closest('[data-radix-select-viewport]')!

    expect(classesOf(viewport)).toContain('p-1.5')
    expect(classesOf(items[0])).toContain('scroll-my-1.5')
  })

  it('keeps the ring clear of the overlay scrollbar when the list scrolls', () => {
    const { items } = mountOpen()
    const viewport = items[0].closest('[data-radix-select-viewport]')!

    expect(classesOf(viewport.parentElement!)).toContain('group/scroll')
    expect(classesOf(viewport)).toContain(
      'group-has-[>[data-orientation=vertical]]/scroll:pr-4.5'
    )
  })
})
