/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { DateInput, DateInputProps } from '../src/components/DateInput'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined
let container: HTMLDivElement | undefined

const mount = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
  return container
}

const rerender = (element: React.ReactElement) => {
  act(() => {
    root!.render(element)
  })
}

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
  document.body.innerHTML = ''
})

const textInput = () =>
  document.querySelector<HTMLInputElement>('input[type="text"]')!

const hiddenInput = () =>
  document.querySelector<HTMLInputElement>('input[type="hidden"]')

const type = (value: string) => {
  const input = textInput()
  const setValue = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )!.set!
  act(() => {
    setValue.call(input, value)
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
}

const blur = () => {
  act(() => {
    textInput().focus()
    textInput().blur()
  })
}

const Controlled = (props: DateInputProps) => {
  const [date, setDate] = React.useState<Date | null>(props.value ?? null)
  return (
    <DateInput
      {...props}
      value={date}
      onValueChange={next => {
        setDate(next)
        props.onValueChange?.(next)
      }}
    />
  )
}

describe('DateInput', () => {
  it('shows its value in the default format', () => {
    mount(<DateInput value={new Date(2024, 5, 15)} />)

    expect(textInput().value).toBe('15/06/2024')
  })

  it('shows its value in the format it is given', () => {
    mount(<DateInput value={new Date(2024, 5, 15)} format="yyyy-MM-dd" />)

    expect(textInput().value).toBe('2024-06-15')
  })

  it('reports a typed date once it is complete', () => {
    const onValueChange = jest.fn()
    mount(<DateInput onValueChange={onValueChange} />)

    type('15/06/20')
    expect(onValueChange).not.toHaveBeenCalled()

    type('15/06/2024')
    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange.mock.calls[0][0]).toEqual(new Date(2024, 5, 15))
  })

  it('reports null when a complete date is edited into an incomplete one', () => {
    const onValueChange = jest.fn()
    mount(<Controlled onValueChange={onValueChange} />)

    type('15/06/2024')
    type('15/06/202')

    expect(onValueChange).toHaveBeenLastCalledWith(null)
    expect(textInput().value).toBe('15/06/202')
  })

  it.each(['31/02/2024', '32/01/2024', 'tomorrow'])(
    'does not treat %s as a date',
    text => {
      const onValueChange = jest.fn()
      mount(<DateInput onValueChange={onValueChange} />)

      type(text)

      expect(onValueChange).not.toHaveBeenCalled()
      expect(textInput().value).toBe(text)
    }
  )

  it('accepts single digits and writes the date out in full on blur', () => {
    const onValueChange = jest.fn()
    mount(<Controlled onValueChange={onValueChange} />)

    type('1/6/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 1))

    blur()
    expect(textInput().value).toBe('01/06/2024')
  })

  it('does not treat a date outside min and max as a value', () => {
    const onValueChange = jest.fn()
    mount(
      <DateInput
        min={new Date(2024, 5, 1)}
        max={new Date(2024, 5, 30)}
        onValueChange={onValueChange}
      />
    )

    type('31/05/2024')
    type('01/07/2024')
    expect(onValueChange).not.toHaveBeenCalled()

    type('30/06/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 30))
  })

  it('follows a controlled value that changes from outside', () => {
    mount(<DateInput value={new Date(2024, 5, 15)} />)

    rerender(<DateInput value={new Date(2025, 0, 2)} />)
    expect(textInput().value).toBe('02/01/2025')

    rerender(<DateInput value={null} />)
    expect(textInput().value).toBe('')
  })

  it('keeps an unfinished date when the value is already null', () => {
    mount(<Controlled />)

    type('15/0')

    expect(textInput().value).toBe('15/0')
  })

  it('still calls an onChange of its own', () => {
    const onChange = jest.fn()
    mount(<DateInput onChange={onChange} />)

    type('1')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('posts the date as yyyy-MM-dd under its name', () => {
    mount(
      <Controlled
        name="start"
        format="MM/dd/yyyy"
        value={new Date(2024, 5, 15)}
      />
    )

    expect(textInput().getAttribute('name')).toBeNull()
    expect(hiddenInput()!.name).toBe('start')
    expect(hiddenInput()!.value).toBe('2024-06-15')

    type('')
    expect(hiddenInput()!.value).toBe('')
  })

  it('adds no hidden input without a name', () => {
    mount(<DateInput />)

    expect(hiddenInput()).toBeNull()
  })

  it('opens a calendar on the selected month and takes a day from it', () => {
    const onValueChange = jest.fn()
    mount(
      <Controlled value={new Date(2024, 5, 15)} onValueChange={onValueChange} />
    )

    const trigger = document.querySelector<HTMLButtonElement>(
      'button[aria-label="Choose date"]'
    )!
    act(() => {
      trigger.click()
    })

    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.textContent).toContain('June 2024')

    const day = dialog.querySelector<HTMLButtonElement>(
      '[data-day="2024-06-20"] button'
    )!
    act(() => {
      day.click()
    })

    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 20))
    expect(textInput().value).toBe('20/06/2024')
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('disables the days outside min and max in the calendar', () => {
    mount(
      <DateInput
        value={new Date(2024, 5, 15)}
        min={new Date(2024, 5, 10)}
        max={new Date(2024, 5, 20)}
      />
    )

    act(() => {
      document
        .querySelector<HTMLButtonElement>('button[aria-label="Choose date"]')!
        .click()
    })

    const dayButton = (day: string) =>
      document.querySelector<HTMLButtonElement>(`[data-day="${day}"] button`)!
    expect(dayButton('2024-06-09').disabled).toBe(true)
    expect(dayButton('2024-06-10').disabled).toBe(false)
    expect(dayButton('2024-06-20').disabled).toBe(false)
    expect(dayButton('2024-06-21').disabled).toBe(true)
  })

  it('disables both the text and the calendar button', () => {
    mount(<DateInput disabled />)

    expect(textInput().disabled).toBe(true)
    expect(document.querySelector<HTMLButtonElement>('button')!.disabled).toBe(
      true
    )
  })
})
