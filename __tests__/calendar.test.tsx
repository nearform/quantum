import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { DayFlag, SelectionState, UI } from 'react-day-picker'
import { Calendar, CalendarProps } from '../src/components/Calendar'

/**
 * Every element key react-day-picker v9 reads out of `classNames`. Anything
 * else in the map is silently dropped by the library, which is how the whole
 * v8 map stayed inert across the v9 bump (#877).
 */
const V9_CLASS_NAME_KEYS = new Set<string>([
  ...Object.values(UI),
  ...Object.values(DayFlag),
  ...Object.values(SelectionState)
])

/** A month with no "today" to depend on, and a selection inside it. */
const MONTH = new Date(2024, 5, 1)
const SELECTED = new Date(2024, 5, 15)

/**
 * `mode` is part of the default because react-day-picker only renders the
 * `day_button` `<button>` for a calendar that has a selection mode; without one
 * the day cell holds bare text.
 *
 * `CalendarProps` is a union discriminated on `mode`, which a spread of a
 * partial cannot narrow -- hence the assertion on the merged object.
 */
const render = (props: Partial<CalendarProps> = {}) =>
  renderToStaticMarkup(
    React.createElement(Calendar, {
      month: MONTH,
      mode: 'single',
      ...props
    } as CalendarProps)
  )

/** The full `<td>` for a day, addressed by the `data-day` v9 stamps on it. */
const cellFor = (html: string, day: string) => {
  const match = html.match(
    new RegExp(`<td[^>]*data-day="${day}"[^>]*>.*?</td>`)
  )
  if (!match) {
    throw new Error(`no day cell for ${day}`)
  }
  return match[0]
}

/**
 * The opening tag of the first `<tag>` carrying `marker` among its attributes.
 * Enough to pin a class attribute to an element without pulling in a DOM.
 */
const openingTag = (html: string, tag: string, marker = '') => {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? []
  const match = tags.find(candidate => candidate.includes(marker))
  if (!match) {
    throw new Error(`no <${tag}> matching ${JSON.stringify(marker)}`)
  }
  return match
}

const classesOf = (tag: string) =>
  (tag.match(/class="([^"]*)"/)?.[1] ?? '').split(/\s+/).filter(Boolean)

/**
 * react-day-picker's animation hook calls `useLayoutEffect` unconditionally,
 * which React warns about once per server render. Nothing here depends on that
 * effect, so the warning is dropped rather than repeated eight times.
 */
const consoleError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect')) {
      return
    }
    consoleError(...args)
  }
})
afterAll(() => {
  console.error = consoleError
})

describe('Calendar classNames', () => {
  it('only passes keys react-day-picker v9 reads', () => {
    const element = Calendar({}) as React.ReactElement<CalendarProps>
    const keys = Object.keys(element.props.classNames ?? {})

    expect(keys).not.toHaveLength(0)
    expect(keys.filter(key => !V9_CLASS_NAME_KEYS.has(key))).toEqual([])
  })

  it('forwards caller classNames over its own', () => {
    const element = Calendar({
      classNames: { day_button: 'caller-supplied' }
    }) as React.ReactElement<CalendarProps>

    expect(element.props.classNames?.day_button).toBe('caller-supplied')
  })
})

describe('Calendar rendering', () => {
  it('styles the month grid, weekday header and week rows', () => {
    const html = render()

    expect(classesOf(openingTag(html, 'table'))).toContain('border-collapse')
    expect(classesOf(openingTag(html, 'th'))).toContain('text-foreground-muted')
    expect(classesOf(openingTag(html, 'tr'))).toContain('flex')
  })

  it('styles the day cell and the button inside it separately', () => {
    const cell = cellFor(render(), '2024-06-10')

    // v9 `day` is the <td> container, `day_button` the <button> within it.
    expect(classesOf(openingTag(cell, 'td'))).toContain('w-9')
    expect(classesOf(openingTag(cell, 'button'))).toContain('font-bold')
  })

  it('styles the navigation buttons', () => {
    const html = render()
    const previous = openingTag(html, 'button', 'Previous Month')
    const next = openingTag(html, 'button', 'Next Month')

    expect(classesOf(previous)).toContain('w-7')
    expect(classesOf(next)).toContain('w-7')
  })

  it('puts the selected surface on the day cell', () => {
    const html = render({ selected: SELECTED })
    const cell = openingTag(cellFor(html, '2024-06-15'), 'td')

    expect(classesOf(cell)).toContain('bg-accent')
    expect(classesOf(cell)).toContain('text-foreground-inverse')
  })

  it('styles the three range states', () => {
    const html = render({
      mode: 'range',
      selected: { from: new Date(2024, 5, 10), to: new Date(2024, 5, 12) },
      showOutsideDays: false
    })

    const classesForDay = (day: string) =>
      classesOf(openingTag(cellFor(html, day), 'td'))

    expect(classesForDay('2024-06-10')).toContain('rounded-l-full!')
    expect(classesForDay('2024-06-11')).toContain('bg-grey-400!')
    expect(classesForDay('2024-06-12')).toContain('rounded-r-full!')
  })

  it('styles outside and disabled days', () => {
    const html = render({ disabled: new Date(2024, 5, 20) })

    // 2024-06-01 is a Saturday, so the grid opens with five outside days.
    expect(classesOf(openingTag(cellFor(html, '2024-05-26'), 'td'))).toContain(
      'text-foreground-muted'
    )
    expect(classesOf(openingTag(cellFor(html, '2024-06-20'), 'td'))).toContain(
      'opacity-50'
    )
  })
})
