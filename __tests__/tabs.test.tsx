/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '../src/components/Tabs'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined
let container: HTMLDivElement | undefined

afterEach(() => {
  jest.useRealTimers()
  act(() => {
    root?.unmount()
  })
  container?.remove()
  document.body.innerHTML = ''
})

type MountOptions = React.ComponentProps<typeof Tabs> & {
  count?: React.ReactNode
  disableSecond?: boolean
}

const mount = ({ count, disableSecond, ...props }: MountOptions = {}) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(
      <Tabs defaultValue="one" {...props}>
        <TabsList aria-label="Sections">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two" count={count} disabled={disableSecond}>
            Two
          </TabsTrigger>
          <TabsTrigger value="three">Three</TabsTrigger>
        </TabsList>
        <TabsContent value="one">Panel one</TabsContent>
        <TabsContent value="two">Panel two</TabsContent>
        <TabsContent value="three">Panel three</TabsContent>
      </Tabs>
    )
  })
}

const tabs = () =>
  Array.from(container!.querySelectorAll<HTMLElement>('[role="tab"]'))
const tab = (name: string) => tabs().find(t => t.textContent?.startsWith(name))!
const visiblePanel = () =>
  container!.querySelector<HTMLElement>('[role="tabpanel"]:not([hidden])')

const press = (element: HTMLElement, key: string) => {
  act(() => {
    element.dispatchEvent(
      new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    )
    jest.runOnlyPendingTimers()
  })
}

const click = (element: HTMLElement) => {
  act(() => {
    element.dispatchEvent(
      new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0
      })
    )
  })
}

describe('Tabs', () => {
  it('names the tab list with its aria-label', () => {
    mount()

    expect(
      container!.querySelector('[role="tablist"]')?.getAttribute('aria-label')
    ).toBe('Sections')
  })

  it('shows the panel of the default tab', () => {
    mount()

    expect(visiblePanel()?.textContent).toBe('Panel one')
  })

  it('marks the default tab as selected', () => {
    mount()

    expect(tab('One').getAttribute('aria-selected')).toBe('true')
  })

  it('labels each panel with its tab', () => {
    mount()

    expect(visiblePanel()?.getAttribute('aria-labelledby')).toBe(tab('One').id)
  })

  it('shows the panel of a clicked tab', () => {
    mount()

    click(tab('Three'))

    expect(visiblePanel()?.textContent).toBe('Panel three')
  })

  it('reports the new value when a tab is clicked', () => {
    const onValueChange = jest.fn()
    mount({ onValueChange })

    click(tab('Two'))

    expect(onValueChange).toHaveBeenCalledWith('two')
  })

  it('selects the next tab with ArrowRight when horizontal', () => {
    jest.useFakeTimers()
    mount()
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowRight')

    expect(tab('Two').getAttribute('aria-selected')).toBe('true')
  })

  it('selects the next tab with ArrowDown when vertical', () => {
    jest.useFakeTimers()
    mount({ orientation: 'vertical' })
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowDown')

    expect(tab('Two').getAttribute('aria-selected')).toBe('true')
  })

  it('ignores ArrowRight when vertical', () => {
    jest.useFakeTimers()
    mount({ orientation: 'vertical' })
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowRight')

    expect(tab('One').getAttribute('aria-selected')).toBe('true')
  })

  it('does not select a tab on focus in manual mode', () => {
    jest.useFakeTimers()
    mount({ activationMode: 'manual' })
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowRight')

    expect(tab('One').getAttribute('aria-selected')).toBe('true')
  })

  it('moves focus with the arrow keys in manual mode', () => {
    jest.useFakeTimers()
    mount({ activationMode: 'manual' })
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowRight')

    expect(document.activeElement).toBe(tab('Two'))
  })

  it.each([
    ['Enter', 'Enter'],
    ['Space', ' ']
  ])('selects the focused tab with %s in manual mode', (_name, key) => {
    jest.useFakeTimers()
    mount({ activationMode: 'manual' })
    act(() => tab('One').focus())
    press(tab('One'), 'ArrowRight')

    press(tab('Two'), key)

    expect(tab('Two').getAttribute('aria-selected')).toBe('true')
  })

  it('skips a disabled tab with the arrow keys', () => {
    jest.useFakeTimers()
    mount({ disableSecond: true })
    act(() => tab('One').focus())

    press(tab('One'), 'ArrowRight')

    expect(document.activeElement).toBe(tab('Three'))
  })

  it('puts the orientation on the list so vertical tabs stack', () => {
    mount({ orientation: 'vertical' })

    expect(
      container!
        .querySelector('[role="tablist"]')
        ?.getAttribute('aria-orientation')
    ).toBe('vertical')
  })

  it('marks the list with its orientation for the vertical layout styles', () => {
    mount({ orientation: 'vertical' })

    expect(
      container!
        .querySelector('[role="tablist"]')
        ?.getAttribute('data-orientation')
    ).toBe('vertical')
  })

  it('marks each trigger with its orientation for the vertical layout styles', () => {
    mount({ orientation: 'vertical' })

    expect(tabs().map(t => t.getAttribute('data-orientation'))).toEqual([
      'vertical',
      'vertical',
      'vertical'
    ])
  })

  it('adds the count to the name of the tab', () => {
    mount({ count: 4 })

    expect(tab('Two').textContent).toBe('Two4')
  })

  it.each([undefined, null, false, true])(
    'renders no count badge for %s',
    count => {
      mount({ count })

      expect(tab('Two').querySelector('span')).toBeNull()
    }
  )

  it('renders a count of 0', () => {
    mount({ count: 0 })

    expect(tab('Two').querySelector('span')?.textContent).toBe('0')
  })

  it.each([undefined, 4])(
    'renders the child element as the tab with asChild and count %s',
    count => {
      container = document.createElement('div')
      document.body.appendChild(container)
      act(() => {
        root = createRoot(container!)
        root.render(
          <Tabs defaultValue="settings">
            <TabsList>
              <TabsTrigger value="settings" count={count} asChild>
                <a href="#settings">Settings</a>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
      })

      expect(tab('Settings').tagName).toBe('A')
    }
  )

  it('puts the count inside the child element with asChild', () => {
    container = document.createElement('div')
    document.body.appendChild(container)
    act(() => {
      root = createRoot(container!)
      root.render(
        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="settings" count={4} asChild>
              <a href="#settings">Settings</a>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )
    })

    expect(tab('Settings').textContent).toBe('Settings4')
  })

  it('merges a className onto the trigger', () => {
    container = document.createElement('div')
    document.body.appendChild(container)
    act(() => {
      root = createRoot(container!)
      root.render(
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger value="one" className="custom-class">
              One
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )
    })

    expect(tab('One').classList).toContain('custom-class')
  })

  it('forwards the ref to the trigger button', () => {
    const ref = React.createRef<HTMLButtonElement>()
    container = document.createElement('div')
    document.body.appendChild(container)
    act(() => {
      root = createRoot(container!)
      root.render(
        <Tabs defaultValue="one">
          <TabsList>
            <TabsTrigger ref={ref} value="one">
              One
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )
    })

    expect(ref.current).toBe(tab('One'))
  })
})
