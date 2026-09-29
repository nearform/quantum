/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '../src/components/Toast'
import type { ToastProps } from '../src/components/Toast'

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
  jest.useRealTimers()
})

const mount = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
}

const renderToast = (
  props: Partial<ToastProps> = {},
  children: React.ReactNode = <ToastTitle>Saved</ToastTitle>
) =>
  mount(
    <ToastProvider>
      <Toast open {...props}>
        {children}
      </Toast>
      <ToastViewport />
    </ToastProvider>
  )

const toast = () =>
  container!.querySelector<HTMLLIElement>('li[data-state="open"]')

const click = (element: Element) =>
  act(() => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  })

describe('Toast', () => {
  it('renders the message inside the viewport list', () => {
    renderToast()

    expect(toast()!.closest('ol')).not.toBeNull()
    expect(toast()!.textContent).toBe('Saved')
  })

  it('lets clicks pass through the viewport to the page, but not through a toast', () => {
    renderToast()

    expect(container!.querySelector('ol')!.className).toContain(
      'pointer-events-none'
    )
    expect(toast()!.className).toContain('pointer-events-auto')
  })

  it('renders a title and description', () => {
    renderToast(
      {},
      <>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live</ToastDescription>
      </>
    )

    expect(toast()!.textContent).toBe('SavedYour changes are live')
  })

  it('places the description below the title, beside the icon and actions', () => {
    renderToast(
      {},
      <>
        <ToastTitle>Saved</ToastTitle>
        <ToastDescription>Your changes are live</ToastDescription>
        <ToastAction altText="Undo saving">Undo</ToastAction>
        <ToastClose />
      </>
    )

    const [icon, title, description, action, close] = Array.from(
      toast()!.children
    )

    expect(toast()!.className).toContain('grid')
    expect(icon.className).toContain('col-start-1')
    expect(title.className).toContain('col-start-2 row-start-1')
    expect(description.className).toContain('col-start-2 row-start-2')
    expect(action.className).toContain('col-start-3 row-start-1')
    expect(close.className).toContain('col-start-4 row-start-1')
  })

  it.each([
    ['success', 'bg-green-50', 'text-feedback-success'],
    ['error', 'bg-red-50', 'text-feedback-error'],
    ['warning', 'bg-yellow-50', 'text-feedback-danger'],
    ['info', 'bg-blue-50', 'text-blue-600']
  ] as const)(
    'styles the %s variant and its icon',
    (variant, fill, iconColour) => {
      renderToast({ variant })

      const icon = toast()!.querySelector('[aria-hidden="true"]')!

      expect(toast()!.className).toContain(fill)
      expect(icon.className).toContain(iconColour)
      expect(icon.querySelector('svg')).not.toBeNull()
    }
  )

  it('defaults to the info variant', () => {
    renderToast()

    expect(toast()!.className).toContain('bg-blue-50')
  })

  it('replaces the icon with a custom one', () => {
    renderToast({ icon: <span data-testid="custom" /> })

    expect(toast()!.querySelector('[data-testid="custom"]')).not.toBeNull()
    expect(toast()!.querySelector('svg')).toBeNull()
  })

  it('shows no icon when icon is null', () => {
    renderToast({ icon: null })

    expect(toast()!.querySelector('[aria-hidden="true"]')).toBeNull()
  })

  it('merges a custom className', () => {
    renderToast({ className: 'custom-class' })

    expect(toast()!.className).toContain('custom-class')
  })

  it('closes when the action is pressed', () => {
    const onOpenChange = jest.fn()
    const onClick = jest.fn()
    renderToast(
      { onOpenChange },
      <>
        <ToastTitle>Saved</ToastTitle>
        <ToastAction altText="Undo saving" onClick={onClick}>
          Undo
        </ToastAction>
      </>
    )

    click(toast()!.querySelector('button')!)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('names the close button with a default label', () => {
    renderToast({}, <ToastClose />)

    const close = toast()!.querySelector('button')!

    expect(close.getAttribute('aria-label')).toBe('Close')
    expect(close.querySelector('svg')!.getAttribute('aria-hidden')).toBe('true')
  })

  it('accepts a translated close label', () => {
    renderToast({}, <ToastClose label="Fermer" />)

    expect(toast()!.querySelector('button')!.getAttribute('aria-label')).toBe(
      'Fermer'
    )
  })

  it('closes when the close button is pressed', () => {
    const onOpenChange = jest.fn()
    renderToast({ onOpenChange }, <ToastClose />)

    click(toast()!.querySelector('button')!)

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('closes itself after its duration', () => {
    jest.useFakeTimers()
    const onOpenChange = jest.fn()
    renderToast({ onOpenChange, duration: 1000 })

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it.each([
    ['error', 'foreground'],
    ['success', 'background'],
    ['warning', 'background'],
    ['info', 'background']
  ] as const)('announces the %s variant as %s', (variant, type) => {
    renderToast({ variant })

    expect(
      document.body.querySelector('[aria-live]')!.getAttribute('aria-live')
    ).toBe(type === 'foreground' ? 'assertive' : 'polite')
  })

  it('lets type override the variant default', () => {
    renderToast({ variant: 'error', type: 'background' })

    expect(
      document.body.querySelector('[aria-live]')!.getAttribute('aria-live')
    ).toBe('polite')
  })
})
