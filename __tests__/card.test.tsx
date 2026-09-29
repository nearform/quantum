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
