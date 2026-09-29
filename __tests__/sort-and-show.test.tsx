/**
 * @jest-environment jsdom
 */
import { afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  SortAndShow,
  SortAndShowControl,
  type SortAndShowControlProps
} from '../src/components/SortAndShow'

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

const options = [
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first', disabled: true }
]

const mount = (
  props: Partial<SortAndShowControlProps> &
    React.RefAttributes<HTMLButtonElement> = {}
) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(
      <SortAndShow>
        <SortAndShowControl
          label="Sort by"
          options={options}
          defaultValue="alphabetical"
          {...props}
        />
      </SortAndShow>
    )
  })
}

const trigger = () => container!.querySelector('button')!
const items = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="option"]'))

const open = () => {
  act(() => {
    trigger().focus()
    trigger().dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
  })
}

describe('SortAndShow', () => {
  it('names the trigger with its label and shows the selected value', () => {
    mount()

    const labelId = trigger().getAttribute('aria-labelledby')!
    expect(document.getElementById(labelId)?.textContent).toBe('Sort by')
    expect(trigger().getAttribute('role')).toBe('combobox')
    expect(trigger().textContent).toBe('Alphabetical (A-Z)')
  })

  it('gives each control its own label id', () => {
    container = document.createElement('div')
    document.body.appendChild(container)
    act(() => {
      root = createRoot(container!)
      root.render(
        <SortAndShow>
          <SortAndShowControl label="Sort by" options={options} />
          <SortAndShowControl label="Show" options={options} />
        </SortAndShow>
      )
    })

    const ids = Array.from(container.querySelectorAll('button')).map(button =>
      button.getAttribute('aria-labelledby')
    )
    expect(new Set(ids).size).toBe(2)
  })

  it('opens the options from the keyboard', () => {
    mount()

    open()

    expect(trigger().getAttribute('aria-expanded')).toBe('true')
    expect(items().map(item => item.textContent)).toEqual([
      'Alphabetical (A-Z)',
      'Newest first',
      'Oldest first'
    ])
    expect(items()[2].getAttribute('aria-disabled')).toBe('true')
  })

  it('reports the chosen value', () => {
    const onValueChange = jest.fn()
    mount({ onValueChange })

    open()
    act(() => {
      items()[1].dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      )
    })

    expect(onValueChange).toHaveBeenCalledWith('newest')
    expect(trigger().textContent).toBe('Newest first')
  })

  it('does not open when disabled', () => {
    mount({ disabled: true })

    open()

    expect(trigger().disabled).toBe(true)
    expect(items()).toHaveLength(0)
  })

  it('forwards the ref to the trigger', () => {
    const ref = React.createRef<HTMLButtonElement>()
    mount({ ref })

    expect(ref.current).toBe(trigger())
  })
})
