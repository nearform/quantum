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

  describe('asChild', () => {
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(({ to, onClick, ...props }, ref) => (
      <a
        ref={ref}
        href={to}
        data-router-link=""
        onClick={e => {
          e.preventDefault()
          onClick?.(e)
        }}
        {...props}
      />
    ))
    RouterLink.displayName = 'RouterLink'

    it('renders the child link instead of its own', () => {
      const container = render(
        <BackLink asChild>
          <RouterLink to="/">Back to Main Page</RouterLink>
        </BackLink>
      )

      const links = container.querySelectorAll('a')
      expect(links).toHaveLength(1)
      expect(links[0].hasAttribute('data-router-link')).toBe(true)
      expect(links[0].getAttribute('href')).toBe('/')
    })

    it('puts the arrow and the label inside the child link', () => {
      const container = render(
        <BackLink asChild>
          <RouterLink to="/">Back to Main Page</RouterLink>
        </BackLink>
      )

      const link = container.querySelector('a')!
      expect(
        link.querySelector(':scope > svg')?.getAttribute('aria-hidden')
      ).toBe('true')
      expect(link.querySelector(':scope > span')?.textContent).toBe(
        'Back to Main Page'
      )
    })

    it('labels the child link Back when it has no children', () => {
      const container = render(
        <BackLink asChild>
          <RouterLink to="/" />
        </BackLink>
      )

      expect(container.querySelector('a')?.textContent).toBe('Back')
    })

    it('keeps the label for screen readers only when small', () => {
      const container = render(
        <BackLink asChild size="sm">
          <RouterLink to="/">Back to Main Page</RouterLink>
        </BackLink>
      )

      expect(container.querySelector('span')?.classList).toContain('sr-only')
    })

    it('renders the label from a child link whose children is a function', () => {
      const NavLink = ({
        to,
        children
      }: {
        to: string
        children: (state: { isActive: boolean }) => React.ReactNode
      }) => <a href={to}>{children({ isActive: true })}</a>

      const container = render(
        <BackLink asChild>
          <NavLink to="/">
            {({ isActive }) => (isActive ? 'Back home' : 'Back')}
          </NavLink>
        </BackLink>
      )

      const link = container.querySelector('a')!
      expect(link.querySelector(':scope > svg')).not.toBeNull()
      expect(link.querySelector(':scope > span')?.textContent).toBe('Back home')
    })

    it('merges its className, attributes, ref and onClick into the child link', () => {
      const ref = React.createRef<HTMLAnchorElement>()
      const onClick = jest.fn()
      const container = render(
        <BackLink
          asChild
          ref={ref}
          className="mb-4"
          data-testid="back"
          onClick={onClick}
        >
          <RouterLink to="/" className="text-red">
            Back
          </RouterLink>
        </BackLink>
      )

      const link = container.querySelector('a')!
      expect(link.classList).toContain('mb-4')
      expect(link.classList).toContain('text-red')
      expect(link.classList).toContain('inline-flex')
      expect(link.getAttribute('data-testid')).toBe('back')
      expect(ref.current).toBe(link)

      act(() => {
        link.click()
      })
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})
