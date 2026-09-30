/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  type TableSortDirection
} from '../src/components/Table'

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
})

const render = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
  return container
}

const renderHead = (head: React.ReactElement) =>
  render(
    <Table>
      <TableHeader>
        <TableRow>{head}</TableRow>
      </TableHeader>
    </Table>
  )

const renderBody = (rows: React.ReactNode) =>
  render(
    <Table>
      <TableBody>{rows}</TableBody>
    </Table>
  )

describe('TableHead', () => {
  it('renders plain header text without a button when it cannot sort', () => {
    const container = renderHead(<TableHead>Name</TableHead>)
    const th = container.querySelector('th')!

    expect(th.textContent).toBe('Name')
    expect(th.querySelector('button')).toBeNull()
    expect(th.hasAttribute('aria-sort')).toBe(false)
  })

  it('wraps the header in a button that calls onSort when clicked', () => {
    const onSort = jest.fn()
    const container = renderHead(<TableHead onSort={onSort}>Name</TableHead>)
    const button = container.querySelector('th button') as HTMLButtonElement

    expect(button.getAttribute('type')).toBe('button')
    expect(button.textContent).toBe('Name')

    act(() => {
      button.click()
    })

    expect(onSort).toHaveBeenCalledTimes(1)
  })

  it.each<[TableSortDirection | undefined, string | null]>([
    ['asc', 'ascending'],
    ['desc', 'descending'],
    [false, null],
    [undefined, null]
  ])(
    'sets aria-sort for a %s sort direction to %s',
    (sortDirection, ariaSort) => {
      const container = renderHead(
        <TableHead sortDirection={sortDirection} onSort={() => {}}>
          Name
        </TableHead>
      )

      expect(container.querySelector('th')!.getAttribute('aria-sort')).toBe(
        ariaSort
      )
    }
  )

  it('hides the sort icon from assistive technology', () => {
    const container = renderHead(
      <TableHead sortDirection="asc" onSort={() => {}}>
        Name
      </TableHead>
    )

    expect(
      container.querySelector('th button svg')!.getAttribute('aria-hidden')
    ).toBe('true')
  })

  it('lets an aria-sort passed by the caller win', () => {
    const container = renderHead(
      <TableHead sortDirection="asc" onSort={() => {}} aria-sort="other">
        Name
      </TableHead>
    )

    expect(container.querySelector('th')!.getAttribute('aria-sort')).toBe(
      'other'
    )
  })

  it('puts the icon before the text in a right-aligned header', () => {
    const container = renderHead(
      <TableHead align="right" onSort={() => {}}>
        Amount
      </TableHead>
    )

    expect(container.querySelector('th')!.className).toContain('text-right')
    expect(container.querySelector('th button')!.className).toContain(
      'flex-row-reverse'
    )
  })
})

describe('TableCell', () => {
  it.each([
    ['left', 'text-left'],
    ['center', 'text-center'],
    ['right', 'text-right']
  ] as const)('aligns its content %s', (align, expected) => {
    const container = renderBody(
      <TableRow>
        <TableCell align={align}>1</TableCell>
      </TableRow>
    )
    const td = container.querySelector('td')!

    expect(td.className).toContain(expected)
    expect(td.hasAttribute('align')).toBe(false)
  })
})

describe('TableRow', () => {
  it('marks a selected row with data-state', () => {
    const container = renderBody(
      <>
        <TableRow selected>
          <TableCell>Selected</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Not selected</TableCell>
        </TableRow>
      </>
    )
    const [selected, unselected] = Array.from(container.querySelectorAll('tr'))

    expect(selected.getAttribute('data-state')).toBe('selected')
    expect(unselected.hasAttribute('data-state')).toBe(false)
  })
})

describe('TableEmpty', () => {
  it('renders one cell spanning the given columns with a default message', () => {
    const container = renderBody(<TableEmpty colSpan={4} />)
    const cells = container.querySelectorAll('td')

    expect(cells).toHaveLength(1)
    expect(cells[0].getAttribute('colspan')).toBe('4')
    expect(cells[0].textContent).toBe('No results.')
  })

  it('renders its own message when given one', () => {
    const container = renderBody(
      <TableEmpty colSpan={2}>No payments yet.</TableEmpty>
    )

    expect(container.querySelector('td')!.textContent).toBe('No payments yet.')
  })
})
