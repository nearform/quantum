import { describe, expect, it } from '@jest/globals'
import * as React from 'react'

import {
  Table,
  TableBody,
  TableEmpty,
  TableFooter,
  TableHeader,
  TableRow
} from '../src/components/Table'
import { classesOf } from './helpers/markup'

const colourClasses = (classNames: string[], utility: 'bg' | 'text') =>
  classNames.filter(name =>
    new RegExp(`(^|:)${utility}-(background|foreground)`).test(name)
  )

const darkCounterpartOf = (name: string) => {
  const at = name.lastIndexOf(':') + 1
  return `dark:${name.slice(0, at)}${name.slice(at)}-dark`
}

const inTable = (section: React.ReactElement) => <Table>{section}</Table>

const parts: [string, React.ReactElement, string][] = [
  ['Table', <Table key="table" />, 'table'],
  ['TableHeader', inTable(<TableHeader />), 'thead'],
  ['TableBody', inTable(<TableBody />), 'tbody'],
  ['zebra TableBody', inTable(<TableBody variant="zebra" />), 'tbody'],
  [
    'TableRow',
    inTable(
      <TableBody>
        <TableRow selected />
      </TableBody>
    ),
    'tr'
  ],
  [
    'TableEmpty',
    inTable(
      <TableBody>
        <TableEmpty colSpan={1} />
      </TableBody>
    ),
    'td'
  ],
  ['TableFooter', inTable(<TableFooter />), 'tfoot']
]

describe('Table in dark mode', () => {
  describe.each(parts)('%s', (_name, element, selector) => {
    const classNames = classesOf(element, selector)
    const light = [
      ...colourClasses(classNames, 'bg'),
      ...colourClasses(classNames, 'text')
    ].filter(name => !name.startsWith('dark:'))

    it.each(light)('pairs %s with its dark token', name => {
      expect(classNames).toContain(darkCounterpartOf(name))
    })
  })

  it('takes every dark colour from a token rather than a raw palette step', () => {
    const raw = parts
      .flatMap(([, element, selector]) => classesOf(element, selector))
      .filter(name => /^dark:.*(bg|text)-(grey|white|black)/.test(name))

    expect(raw).toEqual([])
  })

  it('raises the body off the page and keeps the header a step above it', () => {
    const body = classesOf(inTable(<TableBody />), 'tbody')
    const header = classesOf(inTable(<TableHeader />), 'thead')

    // #981 painted the body `background-dark` so the header would stand off
    // it. That worked, but `background-dark` is the page, so the body stopped
    // reading as a surface at all (1.00:1 against the page, where light mode
    // has 1.10:1). `surface` restores the step without taking the header's:
    // the header is still one `subtle` step above the body, now 1.21:1 rather
    // than 1.44:1 - and light mode's equivalent step is 1.05:1.
    expect(body).toContain('dark:bg-background-surface-dark')
    expect(body).not.toContain('dark:bg-background-dark')
    expect(header).toContain('dark:bg-background-subtle-dark')
  })

  it('keeps the selected row clear of the zebra stripes', () => {
    const stripes = classesOf(inTable(<TableBody variant="zebra" />), 'tbody')
    const selected = classesOf(
      inTable(
        <TableBody>
          <TableRow selected />
        </TableBody>
      ),
      'tr'
    )

    // The reason the header step was not widened instead: `alt` is what a
    // selected row takes, so moving the stripes up to it would make a
    // selected row and an even row the same colour.
    expect(stripes.join(' ')).toContain('background-subtle-dark')
    expect(selected).toContain(
      'dark:data-[state=selected]:bg-background-alt-dark'
    )
  })

  it('gives the footer the same surface as the header', () => {
    const footer = classesOf(inTable(<TableFooter />), 'tfoot')

    expect(footer).toEqual(
      expect.arrayContaining([
        'bg-background-subtle',
        'dark:bg-background-subtle-dark'
      ])
    )
  })
})
