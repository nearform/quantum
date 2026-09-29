/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { ToggleList, ToggleListItem } from '../src/components/ToggleList'

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

const switchEl = () =>
  container!.querySelector<HTMLButtonElement>('[role="switch"]')!

const removeButton = () =>
  container!.querySelector<HTMLButtonElement>('button:not([role="switch"])')

describe('ToggleList', () => {
  it('renders its items as a list', () => {
    mount(
      <ToggleList>
        <ToggleListItem label="Email" />
        <ToggleListItem label="SMS" />
      </ToggleList>
    )

    const list = container!.querySelector('ul')!
    expect(list.getAttribute('role')).toBe('list')
    expect(
      Array.from(list.querySelectorAll('li')).map(item => item.textContent)
    ).toEqual(['Email', 'SMS'])
  })

  it('forwards its ref to the list', () => {
    const ref = React.createRef<HTMLUListElement>()
    mount(<ToggleList ref={ref} />)

    expect(ref.current?.tagName).toBe('UL')
  })
})

describe('ToggleListItem', () => {
  it('names the switch with its label', () => {
    mount(
      <ToggleList>
        <ToggleListItem label="Notifications" />
      </ToggleList>
    )

    const label = container!.querySelector('label')!
    expect(label.htmlFor).toBe(switchEl().id)
    expect(label.textContent).toBe('Notifications')
  })

  it('keeps a given id on the switch', () => {
    mount(
      <ToggleList>
        <ToggleListItem id="notifications" label="Notifications" />
      </ToggleList>
    )

    expect(switchEl().id).toBe('notifications')
    expect(container!.querySelector('label')!.htmlFor).toBe('notifications')
  })

  it('toggles the switch when the label is clicked', () => {
    const onCheckedChange = jest.fn()
    mount(
      <ToggleList>
        <ToggleListItem
          label="Notifications"
          onCheckedChange={onCheckedChange}
        />
      </ToggleList>
    )

    act(() => container!.querySelector('label')!.click())

    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(switchEl().getAttribute('aria-checked')).toBe('true')
  })

  it('shows no remove button without onRemove', () => {
    mount(
      <ToggleList>
        <ToggleListItem label="Notifications" />
      </ToggleList>
    )

    expect(removeButton()).toBeNull()
  })

  it('calls onRemove from a named remove button', () => {
    const onRemove = jest.fn()
    mount(
      <ToggleList>
        <ToggleListItem
          label="Notifications"
          onRemove={onRemove}
          removeLabel="Remove notifications"
        />
      </ToggleList>
    )

    const button = removeButton()!
    expect(button.getAttribute('aria-label')).toBe('Remove notifications')

    act(() => button.click())

    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it('disables the switch and the remove button together', () => {
    const onRemove = jest.fn()
    mount(
      <ToggleList>
        <ToggleListItem label="Notifications" onRemove={onRemove} disabled />
      </ToggleList>
    )

    expect(switchEl().disabled).toBe(true)
    expect(removeButton()!.disabled).toBe(true)
  })

  it('forwards its ref to the switch', () => {
    const ref = React.createRef<HTMLButtonElement>()
    mount(
      <ToggleList>
        <ToggleListItem ref={ref} label="Notifications" />
      </ToggleList>
    )

    expect(ref.current).toBe(switchEl())
  })
})
