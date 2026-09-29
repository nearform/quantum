/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  SplitButton,
  SplitButtonItem,
  type SplitButtonProps
} from '../src/components/SplitButton'

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

const mount = (
  props: Partial<SplitButtonProps> & React.RefAttributes<HTMLButtonElement> = {}
) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(
      <SplitButton label="Save" {...props}>
        {props.children ?? (
          <>
            <SplitButtonItem>Save as draft</SplitButtonItem>
            <SplitButtonItem disabled>Save as template</SplitButtonItem>
          </>
        )}
      </SplitButton>
    )
  })
}

const buttons = () => Array.from(container!.querySelectorAll('button'))
const action = () => buttons()[0]
const trigger = () => buttons()[1]
const menu = () => document.querySelector('[role="menu"]')
const items = () =>
  Array.from(document.querySelectorAll<HTMLElement>('[role="menuitem"]'))

const openWithKeyboard = () => {
  act(() => {
    trigger().focus()
    trigger().dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    )
  })
}

describe('SplitButton', () => {
  it('renders the main action and the menu trigger as two buttons', () => {
    mount()

    expect(buttons().map(button => button.textContent)).toEqual(['Save', ''])
  })

  it('runs the main action without opening the menu', () => {
    const onClick = jest.fn()
    mount({ onClick })

    act(() => action().click())

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(menu()).toBeNull()
  })

  it('names the icon-only trigger "More options" by default', () => {
    mount()

    expect(trigger().getAttribute('aria-label')).toBe('More options')
  })

  it('lets the trigger be named for its menu', () => {
    mount({ menuLabel: 'More save options' })

    expect(trigger().getAttribute('aria-label')).toBe('More save options')
  })

  it('announces the trigger as opening a menu', () => {
    mount()

    expect(trigger().getAttribute('aria-haspopup')).toBe('menu')
    expect(trigger().getAttribute('aria-expanded')).toBe('false')
  })

  it('opens its menu from the keyboard', () => {
    mount()

    openWithKeyboard()

    expect(items().map(item => item.textContent)).toEqual([
      'Save as draft',
      'Save as template'
    ])
  })

  it('reports the menu as open on the trigger', () => {
    mount()

    openWithKeyboard()

    expect(trigger().getAttribute('aria-expanded')).toBe('true')
  })

  it('runs an item when it is chosen', () => {
    const onSelect = jest.fn()
    mount({
      children: (
        <SplitButtonItem onSelect={onSelect}>Save as draft</SplitButtonItem>
      )
    })
    openWithKeyboard()

    act(() => items()[0].click())

    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it('marks a disabled item as disabled', () => {
    mount()

    openWithKeyboard()

    expect(items()[1].getAttribute('aria-disabled')).toBe('true')
  })

  it('tells a controlled owner when the menu opens', () => {
    const onOpenChange = jest.fn()
    mount({ open: false, onOpenChange })

    openWithKeyboard()

    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('disables both halves when disabled', () => {
    mount({ disabled: true })

    expect(buttons().map(button => button.disabled)).toEqual([true, true])
  })

  it('forwards its ref to the main action', () => {
    const ref = React.createRef<HTMLButtonElement>()
    mount({ ref })

    expect(ref.current).toBe(action())
  })

  it('does not submit a form from the main action by default', () => {
    mount()

    expect(action().getAttribute('type')).toBe('button')
  })
})

describe('SplitButton styling', () => {
  const lightBackgroundStates = (classNames: string[]) =>
    classNames
      .filter(name => !name.startsWith('dark:') && /(^|:)bg-/.test(name))
      .map(name => name.slice(0, name.lastIndexOf('bg-')))

  const darkBackgroundStates = (classNames: string[]) =>
    classNames
      .filter(name => /^dark:(.*:)?bg-/.test(name))
      .map(name => name.slice('dark:'.length, name.lastIndexOf('bg-')))

  it.each(['primary', 'secondary'] as const)(
    'gives every %s background it paints a dark counterpart',
    variant => {
      mount({ variant })
      const classNames = action().className.split(' ')

      const unpaired = lightBackgroundStates(classNames).filter(
        state => !darkBackgroundStates(classNames).includes(state)
      )

      expect(unpaired).toEqual([])
    }
  )

  it.each(['primary', 'secondary'] as const)(
    'draws the %s focus ring around the whole control',
    variant => {
      mount({ variant })
      const wrapper = action().parentElement!

      expect(wrapper.className).toContain(
        'has-[:focus-visible]:shadow-brandGreen'
      )
    }
  )

  it('puts a divider between the two halves', () => {
    mount()

    expect(trigger().className).toContain('before:w-px')
  })
})
