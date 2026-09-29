/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { BsHouse } from '../src/assets'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '../src/components/Breadcrumb'

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

const renderTrail = (props: React.HTMLAttributes<HTMLElement> = {}) =>
  render(
    <Breadcrumb {...props}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" icon={BsHouse}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

describe('Breadcrumb', () => {
  it('renders a nav labelled Breadcrumb by default', () => {
    const container = renderTrail()

    expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe(
      'Breadcrumb'
    )
  })

  it('uses a custom aria-label', () => {
    const container = renderTrail({ 'aria-label': 'Location' })

    expect(container.querySelector('nav')?.getAttribute('aria-label')).toBe(
      'Location'
    )
  })

  it('renders the steps as an ordered list', () => {
    const container = renderTrail()

    expect(container.querySelectorAll('nav > ol > li')).toHaveLength(3)
  })

  it('renders links with their href', () => {
    const container = renderTrail()

    const link = container.querySelector('a')!
    expect(link.getAttribute('href')).toBe('/')
    expect(link.textContent).toBe('Home')
  })

  it('marks the current page and does not link it', () => {
    const container = renderTrail()

    const page = container.querySelector('[aria-current="page"]')!
    expect(page.tagName).toBe('SPAN')
    expect(page.textContent).toBe('Components')
    expect(container.querySelectorAll('a')).toHaveLength(1)
  })

  it('hides separators and icons from assistive technology', () => {
    const container = renderTrail()

    const separator = container.querySelector('li[role="presentation"]')!
    expect(separator.getAttribute('aria-hidden')).toBe('true')
    expect(separator.querySelector('svg')).not.toBeNull()
    const icon = container.querySelector('a > svg')!
    expect(icon.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders custom separator content', () => {
    const container = render(
      <ol>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
      </ol>
    )

    const separator = container.querySelector('li')!
    expect(separator.textContent).toBe('/')
    expect(separator.querySelector('svg')).toBeNull()
  })

  it('renders its child element when asChild is set', () => {
    const container = render(
      <BreadcrumbLink asChild className="custom">
        <button type="button">Home</button>
      </BreadcrumbLink>
    )

    const button = container.querySelector('button')!
    expect(container.querySelector('a')).toBeNull()
    expect(button.classList).toContain('custom')
    expect(button.classList).toContain('underline')
  })

  it('renders the icon inside the link', () => {
    const container = renderTrail()

    const link = container.querySelector('a')!
    expect(link.querySelector('svg')).not.toBeNull()
    expect(link.textContent).toBe('Home')
  })

  it('renders the icon inside the child element when asChild is set', () => {
    const container = render(
      <BreadcrumbLink asChild icon={BsHouse}>
        <a href="/home">Home</a>
      </BreadcrumbLink>
    )

    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(1)
    expect(links[0].getAttribute('href')).toBe('/home')
    expect(links[0].querySelector('svg')).not.toBeNull()
    expect(links[0].textContent).toBe('Home')
  })

  it('forwards refs to the rendered elements', () => {
    const navRef = React.createRef<HTMLElement>()
    const linkRef = React.createRef<HTMLAnchorElement>()
    const pageRef = React.createRef<HTMLSpanElement>()
    render(
      <Breadcrumb ref={navRef}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink ref={linkRef} href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage ref={pageRef}>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )

    expect(navRef.current?.tagName).toBe('NAV')
    expect(linkRef.current?.tagName).toBe('A')
    expect(pageRef.current?.tagName).toBe('SPAN')
  })
})
