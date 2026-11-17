/**
 * @jest-environment jsdom
 */

import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Input } from '../src/components/Input'

/**
 * The clear button empties the field, so it has to follow the field's own
 * editability. A disabled or read-only field refuses input; a clear button
 * that still takes focus and still calls `onClear` is a way round that.
 */
const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

const roots: Root[] = []

afterEach(() => {
  act(() => roots.splice(0).forEach(root => root.unmount()))
  document.body.innerHTML = ''
})

const mount = (ui: React.ReactElement) => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  roots.push(root)
  act(() => {
    root.render(ui)
  })
  return container
}

const clearButtonOf = (container: HTMLElement) =>
  container.querySelector<HTMLButtonElement>('button[aria-label="Clear input"]')

describe('Input clear button', () => {
  it('clears an editable field', () => {
    const onClear = jest.fn()
    const container = mount(
      <Input type="text" variant="primary" defaultValue="x" onClear={onClear} />
    )

    act(() => clearButtonOf(container)!.click())

    expect(onClear).toHaveBeenCalledTimes(1)
  })

  it('is disabled with a disabled field, so it can neither be focused nor clear it', () => {
    const onClear = jest.fn()
    const container = mount(
      <Input
        type="text"
        variant="primary"
        defaultValue="x"
        disabled
        onClear={onClear}
      />
    )
    const button = clearButtonOf(container)!

    act(() => button.click())

    expect(button.disabled).toBe(true)
    expect(onClear).not.toHaveBeenCalled()
  })

  it('is not rendered on a read-only field', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        defaultValue="x"
        readOnly
        onClear={jest.fn()}
      />
    )

    expect(clearButtonOf(container)).toBeNull()
  })

  it('leaves a read-only field its border, which is only dropped for a disabled one', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        defaultValue="x"
        readOnly
        onClear={jest.fn()}
      />
    )

    // The field drops its border through `[&:has(:disabled)]`, so nothing
    // inside a read-only field may be disabled.
    expect(container.querySelector(':disabled')).toBeNull()
  })
})
