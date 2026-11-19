/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Spinner } from '../src/components/Spinner'
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
  return container
}

const ringOf = (el: HTMLElement) =>
  el.querySelector('[data-spinner-ring]') as HTMLElement

describe('Spinner', () => {
  it('is exported from the components index', () => {
    expect(components.Spinner).toBe(Spinner)
  })

  it.each([
    ['sm', 'h-4', 'w-4', 'border-2'],
    ['default', 'h-5', 'w-5', 'border-2'],
    ['lg', 'h-8', 'w-8', 'border-[3px]']
  ] as const)('renders the %s size', (size, height, width, border) => {
    const el = render(<Spinner size={size} />)
    const ring = ringOf(el)
    expect(ring.classList).toContain(height)
    expect(ring.classList).toContain(width)
    expect(ring.classList).toContain(border)
  })

  it('uses the default size when none is given', () => {
    const el = render(<Spinner />)
    expect(ringOf(el).classList).toContain('h-5')
  })

  it('draws the ring in the current text colour', () => {
    const ring = ringOf(render(<Spinner />))
    expect(ring.classList).toContain('border-current')
    expect(ring.classList).toContain('border-t-transparent')
  })

  it('renders role="status" with the label as hidden text when labelled', () => {
    const el = render(<Spinner label="Loading comments" />)
    const status = el.querySelector('[role="status"]') as HTMLElement
    expect(status).not.toBeNull()
    expect(status.getAttribute('aria-hidden')).toBeNull()
    expect(status.textContent).toBe('Loading comments')
    expect(status.querySelector('.sr-only')?.textContent).toBe(
      'Loading comments'
    )
    expect(ringOf(el).getAttribute('aria-hidden')).toBe('true')
  })

  // `status` is named from the author only (ARIA 1.2), so a test querying
  // getByRole('status', { name }) finds nothing unless aria-label is set
  it('names the status from its label', () => {
    const el = render(<Spinner label="Loading comments" />)
    const status = el.querySelector('[role="status"]') as HTMLElement
    expect(status.getAttribute('aria-label')).toBe('Loading comments')
  })

  it('lets an explicit aria-label win over the label', () => {
    const el = render(<Spinner label="Loading" aria-label="Loading comments" />)
    const status = el.querySelector('[role="status"]') as HTMLElement
    expect(status.getAttribute('aria-label')).toBe('Loading comments')
  })

  it.each([undefined, '', '   '])(
    'is aria-hidden with no role when label is %p',
    label => {
      const el = render(<Spinner label={label} />)
      const spinner = el.firstElementChild as HTMLElement
      expect(spinner.getAttribute('aria-hidden')).toBe('true')
      expect(spinner.getAttribute('role')).toBeNull()
      expect(spinner.getAttribute('aria-label')).toBeNull()
      expect(spinner.textContent).toBe('')
    }
  )

  it('spins by default and pulses under reduced motion', () => {
    const ring = ringOf(render(<Spinner />))
    expect(ring.classList).toContain('animate-spin')
    expect(ring.classList).toContain('motion-reduce:animate-pulse')
  })

  it('keeps its ring shape in forced-colour modes', () => {
    const ring = ringOf(render(<Spinner />))
    expect(ring.classList).toContain('forced-color-adjust-none')
  })

  it('forwards the ref and merges className and other props', () => {
    const ref = React.createRef<HTMLSpanElement>()
    const el = render(
      <Spinner ref={ref} className="ml-2" data-testid="spinner" />
    )
    const spinner = el.firstElementChild as HTMLElement
    expect(ref.current).toBe(spinner)
    expect(spinner.classList).toContain('ml-2')
    expect(spinner.dataset.testid).toBe('spinner')
  })
})
