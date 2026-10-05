/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  DocsList,
  DocsListGroup,
  DocsListGroupContent,
  DocsListGroupTrigger,
  DocsListItem,
  DocsListItems,
  DocsListLink,
  type DocsListGroupProps
} from '../src/components/DocsList'

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

const renderDocsList = (groupProps: DocsListGroupProps = {}) =>
  render(
    <DocsList aria-label="Docs">
      <DocsListItems>
        <DocsListItem>
          <DocsListLink href="/welcome">Welcome</DocsListLink>
        </DocsListItem>
        <DocsListGroup {...groupProps}>
          <DocsListGroupTrigger>Checks</DocsListGroupTrigger>
          <DocsListGroupContent>
            <DocsListItem>
              <DocsListLink href="/overview">Overview</DocsListLink>
            </DocsListItem>
            <DocsListItem>
              <DocsListLink href="/exemptions" active>
                Exemptions
              </DocsListLink>
            </DocsListItem>
          </DocsListGroupContent>
        </DocsListGroup>
      </DocsListItems>
    </DocsList>
  )

const click = (element: Element) =>
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

describe('DocsList', () => {
  it('renders a labelled nav with nested lists', () => {
    const container = renderDocsList()

    const nav = container.querySelector('nav')!
    expect(nav.getAttribute('aria-label')).toBe('Docs')
    expect(container.querySelectorAll('nav > ul > li')).toHaveLength(2)
    expect(
      container.querySelectorAll('nav > ul > li > ul > li > a')
    ).toHaveLength(2)
  })

  it('marks only the active link as the current page', () => {
    const container = renderDocsList()

    const current = container.querySelectorAll('[aria-current="page"]')
    expect(current).toHaveLength(1)
    expect(current[0].textContent).toBe('Exemptions')
  })

  it('keeps a passed aria-current', () => {
    const container = render(
      <DocsListLink href="/" aria-current="location">
        Home
      </DocsListLink>
    )

    expect(container.querySelector('a')?.getAttribute('aria-current')).toBe(
      'location'
    )
  })

  it('opens groups by default and links the trigger to its content', () => {
    const container = renderDocsList()

    const trigger = container.querySelector('button')!
    const content = container.querySelector<HTMLUListElement>('li > ul')!
    expect(trigger.getAttribute('type')).toBe('button')
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(trigger.getAttribute('aria-controls')).toBe(content.id)
    expect(content.hidden).toBe(false)
  })

  it('toggles the group when the trigger is clicked', () => {
    const container = renderDocsList()

    const trigger = container.querySelector('button')!
    const content = container.querySelector('li > ul') as HTMLUListElement
    click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(content.hidden).toBe(true)
    expect(trigger.closest('li')?.getAttribute('data-state')).toBe('closed')

    click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(content.hidden).toBe(false)
  })

  it('starts closed when defaultOpen is false', () => {
    const container = renderDocsList({ defaultOpen: false })

    expect(
      container.querySelector('button')?.getAttribute('aria-expanded')
    ).toBe('false')
    expect(
      (container.querySelector('li > ul') as HTMLUListElement).hidden
    ).toBe(true)
  })

  it('follows the open prop and reports clicks when controlled', () => {
    const onOpenChange = jest.fn()
    const container = renderDocsList({ open: false, onOpenChange })

    const trigger = container.querySelector('button')!
    click(trigger)
    expect(onOpenChange).toHaveBeenCalledWith(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })

  it('does not toggle when the trigger onClick prevents default', () => {
    const container = render(
      <DocsListGroup>
        <DocsListGroupTrigger onClick={event => event.preventDefault()}>
          Checks
        </DocsListGroupTrigger>
        <DocsListGroupContent />
      </DocsListGroup>
    )

    const trigger = container.querySelector('button')!
    click(trigger)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
  })

  it('throws when a trigger is used outside a group', () => {
    const error = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(<DocsListGroupTrigger>Checks</DocsListGroupTrigger>)
    ).toThrow('DocsListGroupTrigger must be used inside DocsListGroup')
    error.mockRestore()
  })

  it('renders its child element when asChild is set', () => {
    const container = render(
      <DocsListLink asChild active className="custom">
        <button type="button">Home</button>
      </DocsListLink>
    )

    const button = container.querySelector('button')!
    expect(container.querySelector('a')).toBeNull()
    expect(button.getAttribute('aria-current')).toBe('page')
    expect(button.classList).toContain('custom')
  })

  it('forwards refs to the rendered elements', () => {
    const navRef = React.createRef<HTMLElement>()
    const listRef = React.createRef<HTMLUListElement>()
    const groupRef = React.createRef<HTMLLIElement>()
    const triggerRef = React.createRef<HTMLButtonElement>()
    const contentRef = React.createRef<HTMLUListElement>()
    const itemRef = React.createRef<HTMLLIElement>()
    const linkRef = React.createRef<HTMLAnchorElement>()
    render(
      <DocsList ref={navRef}>
        <DocsListItems ref={listRef}>
          <DocsListGroup ref={groupRef}>
            <DocsListGroupTrigger ref={triggerRef}>Checks</DocsListGroupTrigger>
            <DocsListGroupContent ref={contentRef}>
              <DocsListItem ref={itemRef}>
                <DocsListLink ref={linkRef} href="/">
                  Home
                </DocsListLink>
              </DocsListItem>
            </DocsListGroupContent>
          </DocsListGroup>
        </DocsListItems>
      </DocsList>
    )

    expect(navRef.current?.tagName).toBe('NAV')
    expect(listRef.current?.tagName).toBe('UL')
    expect(groupRef.current?.tagName).toBe('LI')
    expect(triggerRef.current?.tagName).toBe('BUTTON')
    expect(contentRef.current?.tagName).toBe('UL')
    expect(itemRef.current?.tagName).toBe('LI')
    expect(linkRef.current?.tagName).toBe('A')
  })
})
