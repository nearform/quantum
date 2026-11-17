/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Separator } from '../src/components/Separator'
import * as components from '../src/components'

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
  return container.firstElementChild as HTMLElement
}

const linesOf = (el: HTMLElement) =>
  Array.from(el.querySelectorAll<HTMLElement>('[data-separator-line]'))

describe('Separator', () => {
  it('is exported from the components index', () => {
    expect(components.Separator).toBe(Separator)
  })

  it('renders a full-width horizontal line by default', () => {
    const el = render(<Separator />)
    expect(el.dataset.orientation).toBe('horizontal')
    expect(el.classList).toContain('w-full')
    expect(el.classList).toContain('border-t')
    expect(el.classList).not.toContain('border-l')
  })

  it('renders a vertical line that stretches to its container', () => {
    const el = render(<Separator orientation="vertical" />)
    expect(el.dataset.orientation).toBe('vertical')
    expect(el.classList).toContain('self-stretch')
    expect(el.classList).toContain('border-l')
    expect(el.classList).not.toContain('border-t')
  })

  it('uses the subtle border token in light and dark mode', () => {
    const el = render(<Separator />)
    expect(el.classList).toContain('border-border-subtle')
    expect(el.classList).toContain('dark:border-border-subtle-dark')
  })

  it('is decorative by default', () => {
    const el = render(<Separator orientation="vertical" />)
    expect(el.getAttribute('role')).toBe('none')
    expect(el.getAttribute('aria-orientation')).toBeNull()
  })

  it.each(['horizontal', 'vertical'] as const)(
    'exposes role="separator" when not decorative (%s)',
    orientation => {
      const el = render(
        <Separator decorative={false} orientation={orientation} />
      )
      expect(el.getAttribute('role')).toBe('separator')
      if (orientation === 'vertical') {
        expect(el.getAttribute('aria-orientation')).toBe('vertical')
      } else {
        expect(el.getAttribute('aria-orientation')).toBeNull()
      }
    }
  )

  it('centres a label between two lines', () => {
    const el = render(<Separator label="or" />)
    const children = Array.from(el.children) as HTMLElement[]
    expect(children).toHaveLength(3)
    expect(children[0].dataset.separatorLine).toBe('')
    expect(children[1].textContent).toBe('or')
    expect(children[2].dataset.separatorLine).toBe('')
    expect(el.classList).toContain('items-center')
    linesOf(el).forEach(line => {
      expect(line.classList).toContain('flex-1')
      expect(line.classList).toContain('border-t')
      expect(line.getAttribute('aria-hidden')).toBe('true')
    })
  })

  it('stacks the lines around the label when vertical', () => {
    const el = render(<Separator orientation="vertical" label="or" />)
    expect(el.classList).toContain('flex-col')
    linesOf(el).forEach(line => {
      expect(line.classList).toContain('border-l')
      expect(line.classList).toContain('flex-1')
      expect(line.classList).toContain('min-h-4')
      expect(line.classList).not.toContain('min-h-0')
    })
  })

  it('leaves a decorative label as plain text with no labelling', () => {
    const el = render(<Separator label="or" />)
    expect(el.getAttribute('role')).toBe('none')
    expect(el.getAttribute('aria-labelledby')).toBeNull()
  })

  it('names a non-decorative separator with its label', () => {
    const el = render(<Separator decorative={false} label="Older messages" />)
    const label = el.querySelector('[data-separator-label]') as HTMLElement
    expect(el.getAttribute('role')).toBe('separator')
    expect(label.id).not.toBe('')
    expect(el.getAttribute('aria-labelledby')).toBe(label.id)
  })

  it.each([undefined, '', false, null])(
    'renders a plain line when label is %p',
    label => {
      const el = render(<Separator label={label} />)
      expect(el.children).toHaveLength(0)
      expect(el.classList).toContain('border-t')
    }
  )

  it('forwards the ref and merges className and other props', () => {
    const ref = React.createRef<HTMLDivElement>()
    const el = render(
      <Separator ref={ref} className="my-8" data-testid="separator" />
    )
    expect(ref.current).toBe(el)
    expect(el.classList).toContain('my-8')
    expect(el.dataset.testid).toBe('separator')
  })
})
