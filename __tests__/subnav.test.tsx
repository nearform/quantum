/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Subnav,
  SubnavHeading,
  SubnavItem,
  SubnavLink,
  SubnavList
} from '../src/components/Subnav'

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

const renderSubnav = (
  props: React.HTMLAttributes<HTMLElement> = {},
  heading: React.ReactNode = <SubnavHeading>Guides</SubnavHeading>
) =>
  render(
    <Subnav {...props}>
      {heading}
      <SubnavList>
        <SubnavItem>
          <SubnavLink href="/start" active>
            Getting started
          </SubnavLink>
        </SubnavItem>
        <SubnavItem>
          <SubnavLink href="/theming">Theming</SubnavLink>
        </SubnavItem>
      </SubnavList>
    </Subnav>
  )

describe('Subnav', () => {
  it('labels the nav with its heading', () => {
    const container = renderSubnav()

    const nav = container.querySelector('nav')!
    const heading = container.querySelector('h2')!
    expect(heading.id).not.toBe('')
    expect(nav.getAttribute('aria-labelledby')).toBe(heading.id)
  })

  it('uses the heading id when one is passed', () => {
    const container = renderSubnav(
      {},
      <SubnavHeading id="guides">Guides</SubnavHeading>
    )

    expect(
      container.querySelector('nav')?.getAttribute('aria-labelledby')
    ).toBe('guides')
  })

  it('uses aria-label instead of the heading when one is passed', () => {
    const container = renderSubnav({ 'aria-label': 'Docs' })

    const nav = container.querySelector('nav')!
    expect(nav.getAttribute('aria-label')).toBe('Docs')
    expect(nav.hasAttribute('aria-labelledby')).toBe(false)
  })

  it('keeps a passed aria-labelledby', () => {
    const container = renderSubnav({ 'aria-labelledby': 'other' })

    expect(
      container.querySelector('nav')?.getAttribute('aria-labelledby')
    ).toBe('other')
  })

  it('has no aria-labelledby without a heading', () => {
    const container = renderSubnav({}, null)

    expect(
      container.querySelector('nav')?.hasAttribute('aria-labelledby')
    ).toBe(false)
  })

  it('renders the links as a list', () => {
    const container = renderSubnav()

    const links = container.querySelectorAll('nav > ul > li > a')
    expect(links).toHaveLength(2)
    expect(links[1].getAttribute('href')).toBe('/theming')
  })

  it('marks only the active link as the current page', () => {
    const container = renderSubnav()

    const current = container.querySelectorAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0].textContent).toBe('Getting started')
  })

  it('keeps a passed aria-current', () => {
    const container = render(
      <SubnavLink href="/" aria-current="location">
        Home
      </SubnavLink>
    )

    expect(container.querySelector('a')?.getAttribute('aria-current')).toBe(
      'location'
    )
  })

  it('renders its child element when asChild is set', () => {
    const container = render(
      <Subnav>
        <SubnavHeading asChild>
          <h3>Guides</h3>
        </SubnavHeading>
        <SubnavLink asChild active className="custom">
          <button type="button">Home</button>
        </SubnavLink>
      </Subnav>
    )

    const heading = container.querySelector('h3')!
    expect(container.querySelector('h2')).toBeNull()
    expect(
      container.querySelector('nav')?.getAttribute('aria-labelledby')
    ).toBe(heading.id)
    const button = container.querySelector('button')!
    expect(container.querySelector('a')).toBeNull()
    expect(button.getAttribute('aria-current')).toBe('page')
    expect(button.classList).toContain('custom')
  })

  it('forwards refs to the rendered elements', () => {
    const navRef = React.createRef<HTMLElement>()
    const headingRef = React.createRef<HTMLHeadingElement>()
    const listRef = React.createRef<HTMLUListElement>()
    const itemRef = React.createRef<HTMLLIElement>()
    const linkRef = React.createRef<HTMLAnchorElement>()
    render(
      <Subnav ref={navRef}>
        <SubnavHeading ref={headingRef}>Guides</SubnavHeading>
        <SubnavList ref={listRef}>
          <SubnavItem ref={itemRef}>
            <SubnavLink ref={linkRef} href="/">
              Home
            </SubnavLink>
          </SubnavItem>
        </SubnavList>
      </Subnav>
    )

    expect(navRef.current?.tagName).toBe('NAV')
    expect(headingRef.current?.tagName).toBe('H2')
    expect(listRef.current?.tagName).toBe('UL')
    expect(itemRef.current?.tagName).toBe('LI')
    expect(linkRef.current?.tagName).toBe('A')
  })
})
