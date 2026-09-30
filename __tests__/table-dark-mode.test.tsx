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

  it('paints the body on the page background so the header stands off it', () => {
    const body = classesOf(inTable(<TableBody />), 'tbody')
    const header = classesOf(inTable(<TableHeader />), 'thead')

    expect(body).toContain('dark:bg-background-dark')
    expect(header).toContain('dark:bg-background-subtle-dark')
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
