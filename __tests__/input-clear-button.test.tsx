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

const typeInto = (input: HTMLInputElement, value: string) => {
  const setValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )!.set!
  act(() => {
    setValue.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

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

  it('still shows a rightSideChild on a read-only field, outside any button', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        defaultValue="x"
        readOnly
        rightSideChild={<span data-testid="right-icon" />}
        onClear={jest.fn()}
      />
    )
    const icon = container.querySelector('[data-testid="right-icon"]')

    expect(icon).not.toBeNull()
    expect(icon!.closest('button')).toBeNull()
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

describe('Input without onClear', () => {
  it('renders no clear button', () => {
    const container = mount(<Input type="text" variant="primary" />)

    expect(container.querySelector('button')).toBeNull()
  })

  it('shows a rightSideChild outside any button', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        rightSideChild={<span data-testid="right-icon" />}
      />
    )
    const icon = container.querySelector('[data-testid="right-icon"]')

    expect(icon!.closest('button')).toBeNull()
  })
})

describe('Input clearable', () => {
  it('shows the clear button on an empty field by default', () => {
    const container = mount(
      <Input type="text" variant="primary" onClear={jest.fn()} />
    )

    expect(clearButtonOf(container)).not.toBeNull()
  })

  it('never shows the clear button when false', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        defaultValue="x"
        clearable={false}
        onClear={jest.fn()}
      />
    )

    expect(clearButtonOf(container)).toBeNull()
  })

  it.each([
    ['an empty uncontrolled field', { defaultValue: '' }, false],
    ['a filled uncontrolled field', { defaultValue: 'x' }, true],
    ['an empty controlled field', { value: '', onChange: () => {} }, false],
    ['a filled controlled field', { value: 'x', onChange: () => {} }, true],
    ['a controlled field holding 0', { value: 0, onChange: () => {} }, true]
  ])('when auto, on %s, shows the button: %s', (_, valueProps, shown) => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        clearable="auto"
        onClear={jest.fn()}
        {...valueProps}
      />
    )

    expect(clearButtonOf(container) !== null).toBe(shown)
  })

  it('when auto, shows the button once an uncontrolled field is typed into', () => {
    const container = mount(
      <Input
        type="text"
        variant="primary"
        clearable="auto"
        onClear={jest.fn()}
      />
    )

    typeInto(container.querySelector('input')!, 'x')

    expect(clearButtonOf(container)).not.toBeNull()
  })

  it('when auto, still calls the onChange it is given', () => {
    const onChange = jest.fn()
    const container = mount(
      <Input
        type="text"
        variant="primary"
        clearable="auto"
        onChange={onChange}
        onClear={jest.fn()}
      />
    )

    typeInto(container.querySelector('input')!, 'x')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('when auto, hides the button once onClear empties an uncontrolled field', () => {
    const ref = React.createRef<HTMLInputElement>()
    const container = mount(
      <Input
        ref={ref}
        type="text"
        variant="primary"
        clearable="auto"
        defaultValue="x"
        onClear={() => {
          ref.current!.value = ''
        }}
      />
    )

    act(() => clearButtonOf(container)!.click())

    expect(clearButtonOf(container)).toBeNull()
  })

  it('when auto, moves focus to the field after clearing so it is not lost with the button', () => {
    const ref = React.createRef<HTMLInputElement>()
    const container = mount(
      <Input
        ref={ref}
        type="text"
        variant="primary"
        clearable="auto"
        defaultValue="x"
        onClear={() => {
          ref.current!.value = ''
        }}
      />
    )

    act(() => clearButtonOf(container)!.click())

    expect(document.activeElement).toBe(container.querySelector('input'))
  })
})
