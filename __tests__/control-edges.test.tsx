/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Checkbox } from '../src/components/Checkbox'
import { Input } from '../src/components/Input'
import { Select, SelectTrigger, SelectValue } from '../src/components/Select'
import { Slider } from '../src/components/Slider'
import { Table, TableBody, TableCell, TableRow } from '../src/components/Table'
import { Textarea } from '../src/components/Textarea'

globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined
let container: HTMLDivElement | undefined

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  document.body.innerHTML = ''
})

const mount = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
}

const classesOf = (element: Element | null | undefined) => {
  if (!element) throw new Error(`not found in ${document.body.innerHTML}`)
  return (element.getAttribute('class') ?? '').split(/\s+/)
}

/**
 * `border-subtle-dark` is a divider token at 1.7:1 on the dark surface, so a
 * field outlined with it is hard to find. In dark mode the outline of these
 * fields takes `border-dark`, the token Checkbox and Radio already use for
 * their edge, which `contrast.test.ts` holds to 3:1.
 */
describe('field outlines in dark mode', () => {
  it.each([
    ['Input', () => <Input type="text" variant="primary" aria-label="Name" />],
    ['Textarea', () => <Textarea variant="primary" aria-label="Message" />],
    [
      'Select',
      () => (
        <Select>
          <SelectTrigger aria-label="Colour">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
        </Select>
      )
    ]
  ])('outlines %s with border-dark', (_name, render) => {
    mount(render())

    // The element that draws the light outline is the one that draws the dark
    const outlined = container!.querySelector('[class~="border-border-subtle"]')

    expect(classesOf(outlined)).toContain('dark:border-border-dark')
    expect(classesOf(outlined)).not.toContain('dark:border-border-subtle-dark')
  })

  it.each([
    ['Input', () => <Input type="text" variant="primary" aria-label="Name" />],
    ['Textarea', () => <Textarea variant="primary" aria-label="Message" />],
    [
      'Select',
      () => (
        <Select>
          <SelectTrigger aria-label="Colour">
            <SelectValue placeholder="Pick one" />
          </SelectTrigger>
        </Select>
      )
    ]
  ])('strengthens the %s outline on hover in dark mode', (_name, render) => {
    mount(render())

    const outlined = container!.querySelector(
      '[class~="hover:border-border-hover"]'
    )

    expect(classesOf(outlined)).toContain('dark:hover:border-border-hover-dark')
  })
})

describe('Checkbox in a selected table row', () => {
  it('lifts the dark edge to grey-400 inside a selected row', () => {
    mount(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>
              <Checkbox aria-label="Select row" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(classesOf(container!.querySelector('[role="checkbox"]'))).toContain(
      'dark:[tr[data-state=selected]_&]:border-grey-400'
    )
  })

  it('keeps the error edge on an invalid box', () => {
    mount(<Checkbox aria-label="Accept" aria-invalid />)

    expect(
      classesOf(container!.querySelector('[role="checkbox"]'))
    ).not.toContain('dark:[tr[data-state=selected]_&]:border-grey-400')
  })
})

describe('Slider track', () => {
  it('paints the track grey-500 in both modes', () => {
    mount(<Slider defaultValue={[50]} aria-label="Volume" />)

    // A thumb sits in a positioning wrapper beside the track, inside the root
    const thumb = container!.querySelector('[role="slider"]')
    const track = thumb?.parentElement?.parentElement?.firstElementChild

    expect(classesOf(track)).toEqual(
      expect.arrayContaining(['bg-grey-500', 'dark:bg-grey-500'])
    )
  })
})
