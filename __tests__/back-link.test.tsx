/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { BackLink } from '../src/components/BackLink'

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

describe('BackLink', () => {
  it('renders a link labelled Back by default', () => {
    const container = render(<BackLink href="/" />)

    const link = container.querySelector('a')!
    expect(link.getAttribute('href')).toBe('/')
    expect(link.textContent).toBe('Back')
  })

  it('renders its children as the label', () => {
    const container = render(<BackLink href="/">Back to results</BackLink>)

    expect(container.querySelector('a')?.textContent).toBe('Back to results')
  })

  it('hides the arrow from assistive technology', () => {
    const container = render(<BackLink href="/" />)

    const arrow = container.querySelector('a > svg')!
    expect(arrow.getAttribute('aria-hidden')).toBe('true')
  })

  it('shows the label by default', () => {
    const container = render(<BackLink href="/" />)

    expect(container.querySelector('span')?.classList).not.toContain('sr-only')
  })

  it('keeps the label for screen readers only when small', () => {
    const container = render(<BackLink href="/" size="sm" />)

    const label = container.querySelector('span')!
    expect(label.textContent).toBe('Back')
    expect(label.classList).toContain('sr-only')
  })

  it('calls onClick when clicked', () => {
    const onClick = jest.fn((e: React.MouseEvent) => e.preventDefault())
    const container = render(<BackLink href="/" onClick={onClick} />)

    act(() => {
      container.querySelector('a')!.click()
    })

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('passes other attributes and its className to the link', () => {
    const container = render(
      <BackLink href="/" className="mb-4" data-testid="back" />
    )

    const link = container.querySelector('a')!
    expect(link.getAttribute('data-testid')).toBe('back')
    expect(link.classList).toContain('mb-4')
  })

  it('forwards its ref to the link', () => {
    const ref = React.createRef<HTMLAnchorElement>()
    render(<BackLink ref={ref} href="/" />)

    expect(ref.current?.tagName).toBe('A')
  })
})
