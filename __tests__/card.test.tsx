/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Card,
  CardDescription,
  CardTitle,
  SelectableCard,
  SwitchCard
} from '../src/components/Card'

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

const byRole = (role: string) =>
  container!.querySelector<HTMLElement>(`[role="${role}"]`)!

const nameOf = (element: HTMLElement) =>
  element
    .getAttribute('aria-labelledby')!
    .split(' ')
    .map(id => document.getElementById(id)!.textContent)
    .join(' ')

const descriptionOf = (element: HTMLElement) =>
  element
    .getAttribute('aria-describedby')!
    .split(' ')
    .map(id => document.getElementById(id)!.textContent)
    .join(' ')

describe('Card', () => {
  it('renders its content with a title and description', () => {
    mount(
      <Card data-testid="card">
        <CardTitle>Heading</CardTitle>
        <CardDescription>Description</CardDescription>
      </Card>
    )

    const card = container!.querySelector('[data-testid="card"]')!
    expect(card.querySelector('h3')?.textContent).toBe('Heading')
    expect(card.querySelector('p')?.textContent).toBe('Description')
  })

  it('forwards its ref to the container', () => {
    const ref = React.createRef<HTMLDivElement>()
    mount(<Card ref={ref}>Content</Card>)

    expect(ref.current?.tagName).toBe('DIV')
  })

  it('draws the selected border only when selected', () => {
    mount(
      <>
        <Card data-testid="plain" />
        <Card data-testid="selected" selected />
      </>
    )

    const plain = container!.querySelector('[data-testid="plain"]')!
    const selected = container!.querySelector('[data-testid="selected"]')!
    expect(plain.className).not.toContain('border-brandGreen-100')
    expect(selected.className).toContain('border-brandGreen-100')
  })
  describe('asChild', () => {
    const RouterLink = React.forwardRef<
      HTMLAnchorElement,
      React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
    >(({ to, ...props }, ref) => (
      <a ref={ref} href={to} data-router-link="" {...props} />
    ))
    RouterLink.displayName = 'RouterLink'

    it('renders the child link as the card instead of a div', () => {
      mount(
        <Card interactive asChild>
          <RouterLink to="/guides">
            <CardTitle>Guides</CardTitle>
          </RouterLink>
        </Card>
      )

      const link = container!.firstElementChild as HTMLElement
      expect(link.tagName).toBe('A')
      expect(link.hasAttribute('data-router-link')).toBe(true)
      expect(link.getAttribute('href')).toBe('/guides')
      expect(container!.querySelector('div')).toBeNull()
      expect(link.querySelector('h3')?.textContent).toBe('Guides')
    })

    it('puts the card styles, padding and focus ring on the child', () => {
      mount(
        <Card interactive asChild className="gap-2">
          <RouterLink to="/" className="flex flex-col">
            Content
          </RouterLink>
        </Card>
      )

      const link = container!.querySelector('a')!
      expect(link.classList).toContain('p-4')
      expect(link.classList).toContain('rounded-lg')
      expect(link.classList).toContain('focus-visible:shadow-brandGreen')
      expect(link.classList).toContain('gap-2')
      expect(link.classList).toContain('flex')
      expect(link.classList).not.toContain('block')
    })

    it('forwards its ref, attributes and onClick to the child', () => {
      const ref = React.createRef<HTMLDivElement>()
      const onClick = jest.fn()
      mount(
        <Card
          interactive
          asChild
          ref={ref}
          data-testid="card"
          onClick={onClick}
        >
          <button type="button">Open</button>
        </Card>
      )

      const button = container!.querySelector('button')!
      expect(ref.current).toBe(button)
      expect(button.getAttribute('data-testid')).toBe('card')

      act(() => button.click())

      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })
})

describe('SelectableCard', () => {
  it('names the checkbox with its title and describes it with its description', () => {
    mount(
      <SelectableCard
        title="Header"
        description="This card is selectable via the checkbox or the card itself."
      />
    )

    const checkbox = byRole('checkbox')
    expect(nameOf(checkbox)).toBe('Header')
    expect(descriptionOf(checkbox)).toBe(
      'This card is selectable via the checkbox or the card itself.'
    )
  })

  it('leaves out the description reference when there is no description', () => {
    mount(<SelectableCard title="Header" />)

    expect(byRole('checkbox').hasAttribute('aria-describedby')).toBe(false)
  })

  it('toggles when the card itself is clicked', () => {
    const onCheckedChange = jest.fn()
    mount(
      <SelectableCard
        title="Header"
        description="Description"
        onCheckedChange={onCheckedChange}
      />
    )

    act(() => container!.querySelector<HTMLElement>('label span')!.click())

    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(byRole('checkbox').getAttribute('aria-checked')).toBe('true')
  })

  it('toggles once when the checkbox is clicked', () => {
    const onCheckedChange = jest.fn()
    mount(<SelectableCard title="Header" onCheckedChange={onCheckedChange} />)

    act(() => byRole('checkbox').click())

    expect(onCheckedChange).toHaveBeenCalledTimes(1)
    expect(byRole('checkbox').getAttribute('aria-checked')).toBe('true')
  })

  it('does not toggle when disabled', () => {
    const onCheckedChange = jest.fn()
    mount(
      <SelectableCard
        title="Header"
        disabled
        onCheckedChange={onCheckedChange}
      />
    )

    act(() => container!.querySelector<HTMLElement>('label')!.click())

    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  it('keeps a supplied id on the checkbox', () => {
    mount(<SelectableCard id="terms" title="Header" />)

    expect(byRole('checkbox').id).toBe('terms')
    expect(container!.querySelector('label')!.htmlFor).toBe('terms')
  })
})

describe('SwitchCard', () => {
  it('names the switch with its label', () => {
    mount(<SwitchCard label="Notifications" />)

    const label = container!.querySelector('label')!
    expect(label.htmlFor).toBe(byRole('switch').id)
    expect(label.textContent).toBe('Notifications')
  })

  it('toggles the switch when the label is clicked', () => {
    const onCheckedChange = jest.fn()
    mount(
      <SwitchCard label="Notifications" onCheckedChange={onCheckedChange} />
    )

    act(() => container!.querySelector('label')!.click())

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('shows a named remove button only when onRemove is given', () => {
    mount(<SwitchCard label="Notifications" />)
    expect(container!.querySelector('button:not([role="switch"])')).toBeNull()

    act(() => root!.unmount())
    container!.remove()

    const onRemove = jest.fn()
    mount(
      <SwitchCard
        label="Notifications"
        onRemove={onRemove}
        removeLabel="Remove notifications"
      />
    )

    const remove = container!.querySelector<HTMLButtonElement>(
      'button:not([role="switch"])'
    )!
    expect(remove.getAttribute('aria-label')).toBe('Remove notifications')
    expect(remove.type).toBe('button')

    act(() => remove.click())

    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
