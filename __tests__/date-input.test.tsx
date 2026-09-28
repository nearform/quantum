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
      onValueChange={(next, details) => {
        setDate(next)
        props.onValueChange?.(next, details)
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

  it.each([
    ['value', { value: new Date('2024-13-45') }],
    ['defaultValue', { defaultValue: new Date('not a date') }]
  ])('renders an empty field for an invalid Date as %s', (_, props) => {
    const onValueChange = jest.fn()
    mount(<DateInput name="start" onValueChange={onValueChange} {...props} />)

    expect(textInput().value).toBe('')
    expect(hiddenInput()!.value).toBe('')
    expect(textInput().getAttribute('aria-invalid')).toBeNull()
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('takes a typed date after an invalid Date value', () => {
    const onValueChange = jest.fn()
    mount(<DateInput value={new Date(NaN)} onValueChange={onValueChange} />)

    type('15/06/2024')

    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 15), {
      text: '15/06/2024',
      invalid: false
    })
  })

  it('ignores an invalid Date as min or max', () => {
    const onValueChange = jest.fn()
    mount(
      <DateInput
        value={new Date(2024, 5, 15)}
        min={new Date(NaN)}
        max={new Date('nope')}
        onValueChange={onValueChange}
      />
    )

    act(() => {
      document
        .querySelector<HTMLButtonElement>('button[aria-label="Choose date"]')!
        .click()
    })

    expect(onValueChange).not.toHaveBeenCalled()
    expect(document.querySelector('[role="dialog"]')!.textContent).toContain(
      'June 2024'
    )
    expect(
      document.querySelector<HTMLButtonElement>(
        '[data-day="2024-06-01"] button'
      )!.disabled
    ).toBe(false)
  })

  it('reports a typed date once it is complete', () => {
    const onValueChange = jest.fn()
    mount(<DateInput onValueChange={onValueChange} />)

    type('15/06/20')
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '15/06/20',
      invalid: true
    })

    type('15/06/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 15), {
      text: '15/06/2024',
      invalid: false
    })
  })

  it('reports null when a complete date is edited into an incomplete one', () => {
    const onValueChange = jest.fn()
    mount(<Controlled onValueChange={onValueChange} />)

    type('15/06/2024')
    type('15/06/202')

    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '15/06/202',
      invalid: true
    })
    expect(textInput().value).toBe('15/06/202')
  })

  it('tells a cleared field apart from a rejected one', () => {
    const onValueChange = jest.fn()
    mount(<Controlled onValueChange={onValueChange} />)

    type('tomorrow')
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: 'tomorrow',
      invalid: true
    })

    type('')
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '',
      invalid: false
    })
  })

  it('does not report again while the text stays invalid', () => {
    const onValueChange = jest.fn()
    mount(<DateInput onValueChange={onValueChange} />)

    type('1')
    type('15')
    type('15/')

    expect(onValueChange).toHaveBeenCalledTimes(1)
  })

  it('judges the next edit against a value the parent reset', () => {
    const onValueChange = jest.fn()
    const Harness = () => {
      const [date, setDate] = React.useState<Date | null>(null)
      return (
        <>
          <DateInput
            value={date}
            onValueChange={(next, details) => {
              setDate(next)
              onValueChange(next, details)
            }}
          />
          <button type="button" onClick={() => setDate(new Date(2024, 5, 15))}>
            reset
          </button>
        </>
      )
    }
    mount(<Harness />)

    type('tomorrow')
    act(() => {
      document
        .querySelector<HTMLButtonElement>('button:not([aria-label])')!
        .click()
    })
    expect(textInput().value).toBe('15/06/2024')
    onValueChange.mockClear()

    act(() => {
      document
        .querySelector<HTMLButtonElement>('button[aria-label="Choose date"]')!
        .click()
    })
    act(() => {
      document
        .querySelector<HTMLButtonElement>('[data-day="2024-06-15"] button')!
        .click()
    })
    expect(onValueChange).not.toHaveBeenCalled()

    type('15/06/202')
    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '15/06/202',
      invalid: true
    })
  })

  it('leaves text that names the same day to onChange', () => {
    const onValueChange = jest.fn()
    const onChange = jest.fn()
    mount(
      <Controlled
        value={new Date(2024, 5, 15)}
        onValueChange={onValueChange}
        onChange={onChange}
      />
    )

    type('15/6/2024')
    blur()

    expect(onValueChange).not.toHaveBeenCalled()
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(textInput().value).toBe('15/06/2024')
  })

  it.each(['31/02/2024', '32/01/2024', 'tomorrow'])(
    'does not treat %s as a date',
    text => {
      const onValueChange = jest.fn()
      mount(<DateInput onValueChange={onValueChange} />)

      type(text)

      expect(onValueChange).toHaveBeenLastCalledWith(null, {
        text,
        invalid: true
      })
      expect(textInput().value).toBe(text)
    }
  )

  it('accepts single digits and writes the date out in full on blur', () => {
    const onValueChange = jest.fn()
    mount(<Controlled onValueChange={onValueChange} />)

    type('1/6/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 1), {
      text: '1/6/2024',
      invalid: false
    })

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
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '31/05/2024',
      invalid: true
    })
    expect(onValueChange).toHaveBeenCalledTimes(1)

    type('30/06/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 30), {
      text: '30/06/2024',
      invalid: false
    })
  })

  it('accepts today when min is a time later in the day', () => {
    const onValueChange = jest.fn()
    mount(
      <DateInput
        value={new Date(2024, 5, 20)}
        min={new Date(2024, 5, 15, 14, 30)}
        onValueChange={onValueChange}
      />
    )

    type('15/06/2024')
    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 15), {
      text: '15/06/2024',
      invalid: false
    })

    act(() => {
      document
        .querySelector<HTMLButtonElement>('button[aria-label="Choose date"]')!
        .click()
    })
    expect(
      document.querySelector<HTMLButtonElement>(
        '[data-day="2024-06-15"] button'
      )!.disabled
    ).toBe(false)
  })

  it('marks rejected text invalid on blur, and clears it once fixed', () => {
    mount(<Controlled />)

    type('31/02/2024')
    expect(textInput().getAttribute('aria-invalid')).toBeNull()

    blur()
    expect(textInput().getAttribute('aria-invalid')).toBe('true')
    expect(textInput().className).toContain('text-feedback-error')

    type('28/02/2024')
    expect(textInput().getAttribute('aria-invalid')).toBeNull()
  })

  it('stops a form submitting text it cannot send', () => {
    mount(<Controlled invalidMessage="Enter a real date" />)

    type('31/02/2024')
    expect(textInput().validity.customError).toBe(true)
    expect(textInput().validationMessage).toBe('Enter a real date')

    type('')
    expect(textInput().validity.valid).toBe(true)
  })

  it('drops a selected date that tightened bounds rule out', () => {
    const onValueChange = jest.fn()
    const element = (min: Date) => (
      <DateInput
        name="start"
        value={new Date(2024, 5, 15)}
        min={min}
        onValueChange={onValueChange}
      />
    )
    mount(element(new Date(2024, 5, 1)))
    expect(onValueChange).not.toHaveBeenCalled()

    rerender(element(new Date(2024, 6, 1)))

    expect(onValueChange).toHaveBeenCalledTimes(1)
    expect(onValueChange).toHaveBeenLastCalledWith(null, {
      text: '15/06/2024',
      invalid: true
    })
    expect(textInput().getAttribute('aria-invalid')).toBe('true')
  })

  it('judges the selection against the bounds whatever the format', () => {
    const onValueChange = jest.fn()
    const element = (format: string) => (
      <DateInput
        value={new Date(2024, 5, 15)}
        min={new Date(2024, 5, 1)}
        max={new Date(2024, 5, 30)}
        format={format}
        onValueChange={onValueChange}
      />
    )
    mount(element('dd/MM/yyyy'))

    rerender(element('MM/dd'))

    expect(onValueChange).not.toHaveBeenCalled()
    expect(textInput().value).toBe('06/15')
  })

  it('keeps a selection on the last allowed day whatever its time', () => {
    const onValueChange = jest.fn()
    mount(
      <DateInput
        value={new Date(2024, 5, 30, 18, 0)}
        max={new Date(2024, 5, 30)}
        onValueChange={onValueChange}
      />
    )

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('clears the posted value when tightened bounds rule it out', () => {
    const Harness = () => {
      const [min, setMin] = React.useState(new Date(2024, 5, 1))
      return (
        <>
          <Controlled name="start" value={new Date(2024, 5, 15)} min={min} />
          <button type="button" onClick={() => setMin(new Date(2024, 6, 1))}>
            tighten
          </button>
        </>
      )
    }
    mount(<Harness />)
    expect(hiddenInput()!.value).toBe('2024-06-15')

    act(() => {
      document.querySelectorAll<HTMLButtonElement>('button')[1].click()
    })

    expect(hiddenInput()!.value).toBe('')
    expect(textInput().value).toBe('15/06/2024')
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

  it('does not post a value while disabled', () => {
    mount(<DateInput name="start" value={new Date(2024, 5, 15)} disabled />)

    expect(hiddenInput()!.disabled).toBe(true)
  })

  it('posts to the form it is pointed at', () => {
    mount(<DateInput name="start" form="signup" />)

    expect(hiddenInput()!.getAttribute('form')).toBe('signup')
    expect(textInput().getAttribute('form')).toBe('signup')
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

    expect(onValueChange).toHaveBeenLastCalledWith(new Date(2024, 5, 20), {
      text: '20/06/2024',
      invalid: false
    })
    expect(textInput().value).toBe('20/06/2024')
    expect(document.querySelector('[role="dialog"]')).toBeNull()
  })

  it('keeps the date when the selected day is picked again', () => {
    const onValueChange = jest.fn()
    mount(
      <Controlled value={new Date(2024, 5, 15)} onValueChange={onValueChange} />
    )

    act(() => {
      document
        .querySelector<HTMLButtonElement>('button[aria-label="Choose date"]')!
        .click()
    })
    act(() => {
      document
        .querySelector<HTMLButtonElement>('[data-day="2024-06-15"] button')!
        .click()
    })

    expect(onValueChange).not.toHaveBeenCalled()
    expect(textInput().value).toBe('15/06/2024')
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
