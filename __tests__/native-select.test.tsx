/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import * as components from '../src/components'
import { NativeSelect } from '../src/components/NativeSelect'
import { Select, SelectTrigger } from '../src/components/Select'

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
})

const render = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
  return container
}

const options = (
  <>
    <option value="">Choose a fruit</option>
    <option value="apple">Apple</option>
    <option value="pear">Pear</option>
  </>
)

const selectIn = (el: HTMLElement) => el.querySelector('select')!
const chevronIn = (el: HTMLElement) =>
  el.querySelector('[data-native-select-chevron]')

// The classes that draw the field, without the ones each adds for its own
// element: the trigger lays out its value and icon, the select hides its arrow
const fieldClasses = (el: Element) =>
  [...el.classList].filter(
    cls =>
      ![
        'peer',
        'cursor-pointer',
        'appearance-none',
        'pr-8',
        'dark:[color-scheme:dark]'
      ].includes(cls)
  )

describe('NativeSelect', () => {
  it('is exported from the components index', () => {
    expect(components.NativeSelect).toBe(NativeSelect)
  })

  it('renders a real select with its options', () => {
    const el = render(<NativeSelect aria-label="Fruit">{options}</NativeSelect>)
    const select = selectIn(el)
    expect(select.tagName).toBe('SELECT')
    expect(select.options).toHaveLength(3)
    expect(select.getAttribute('aria-label')).toBe('Fruit')
  })

  it.each([
    [undefined, undefined],
    ['error', 'lg'],
    ['success', 'sm']
  ] as const)(
    'is drawn exactly like SelectTrigger (variant %p, size %p)',
    (variant, size) => {
      const native = selectIn(
        render(
          <NativeSelect aria-label="Fruit" variant={variant} size={size}>
            {options}
          </NativeSelect>
        )
      )
      const nativeClasses = fieldClasses(native)
      act(() => root!.unmount())
      container!.remove()

      const trigger = render(
        <Select>
          <SelectTrigger aria-label="Fruit" variant={variant} size={size} />
        </Select>
      ).querySelector('button')!

      expect(nativeClasses).toEqual([...trigger.classList])
    }
  )

  it("hides the browser's arrow and draws a decorative chevron instead", () => {
    const el = render(<NativeSelect aria-label="Fruit">{options}</NativeSelect>)
    expect(selectIn(el).classList).toContain('appearance-none')
    expect(chevronIn(el)?.getAttribute('aria-hidden')).toBe('true')
    expect(chevronIn(el)?.classList).toContain('pointer-events-none')
  })

  it.each([
    [undefined, 'text-foreground'],
    ['error', 'text-red-700'],
    ['success', 'text-green-700']
  ] as const)(
    'colours the chevron like the %p field text',
    (variant, colour) => {
      const el = render(
        <NativeSelect aria-label="Fruit" variant={variant}>
          {options}
        </NativeSelect>
      )
      expect(chevronIn(el)?.classList).toContain(colour)
    }
  )

  it('fades the chevron with the field when disabled', () => {
    const el = render(
      <NativeSelect aria-label="Fruit" disabled>
        {options}
      </NativeSelect>
    )
    expect(selectIn(el).disabled).toBe(true)
    expect(selectIn(el).classList).toContain('peer')
    expect(chevronIn(el)?.classList).toContain('peer-disabled:opacity-50')
  })

  it('shows a list box with no chevron and no fixed height when multiple', () => {
    const el = render(
      <NativeSelect aria-label="Fruit" multiple>
        {options}
      </NativeSelect>
    )
    expect(selectIn(el).multiple).toBe(true)
    expect(selectIn(el).classList).toContain('h-auto')
    expect(selectIn(el).classList).not.toContain('appearance-none')
    expect(chevronIn(el)).toBeNull()
  })

  it('opens the browser list in the dark scheme in dark mode', () => {
    const el = render(<NativeSelect aria-label="Fruit">{options}</NativeSelect>)
    expect(selectIn(el).classList).toContain('dark:[color-scheme:dark]')
  })

  it('reports changes and forwards the ref', () => {
    const ref = React.createRef<HTMLSelectElement>()
    const changes: string[] = []
    const el = render(
      <NativeSelect
        ref={ref}
        aria-label="Fruit"
        defaultValue=""
        onChange={event => changes.push(event.target.value)}
      >
        {options}
      </NativeSelect>
    )
    expect(ref.current).toBe(selectIn(el))
    act(() => {
      ref.current!.value = 'pear'
      ref.current!.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(changes).toEqual(['pear'])
  })

  it('puts className on the select and wrapperClassName on the wrapper', () => {
    const el = render(
      <NativeSelect
        aria-label="Fruit"
        className="font-bold"
        wrapperClassName="max-w-xs"
      >
        {options}
      </NativeSelect>
    )
    expect(selectIn(el).classList).toContain('font-bold')
    expect((el.firstElementChild as HTMLElement).classList).toContain(
      'max-w-xs'
    )
  })
})
