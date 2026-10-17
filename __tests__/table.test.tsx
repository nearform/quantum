/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow
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

const mount = (ui: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => {
    root!.render(ui)
  })
  return container
}

describe('Table', () => {
  it('renders without bordered or divided by default', () => {
    const el = mount(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const wrapper = el.querySelector('div')!
    expect(wrapper.className).not.toContain('border-border-subtle')
    expect(wrapper.dataset.divided).toBeUndefined()
  })

  it('adds border classes when bordered is set', () => {
    const el = mount(
      <Table bordered>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const wrapper = el.querySelector('div')!
    expect(wrapper.className).toContain('border-border-subtle')
    expect(wrapper.className).toContain('rounded-sm')
  })

  it('sets data-divided attribute when divided is set', () => {
    const el = mount(
      <Table divided>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    const wrapper = el.querySelector('div')!
    expect(wrapper.dataset.divided).toBe('')
  })
})
