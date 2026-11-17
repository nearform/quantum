/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Badge, type BadgeProps } from '../src/components/Badge'

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
  return container.firstElementChild as HTMLElement
}

const dotOf = (badge: HTMLElement) =>
  badge.querySelector<HTMLElement>('[aria-hidden="true"].rounded-full')

const classesWithPrefix = (el: HTMLElement, prefixes: string[]) =>
  Array.from(el.classList).filter(c => prefixes.some(p => c.startsWith(p)))

const borderToBg = (c: string) =>
  c.replace(/^border-/, 'bg-').replace(/^dark:border-/, 'dark:bg-')

type Variant = NonNullable<BadgeProps['variant']>

describe('Badge dot', () => {
  it.each<Variant>(['info', 'success', 'warning', 'error'])(
    'paints the %s dot with the same tokens as its border, light and dark',
    variant => {
      const badge = render(
        <Badge variant={variant} dot>
          Status
        </Badge>
      )
      const borderColours = classesWithPrefix(badge, [
        'border-',
        'dark:border-'
      ]).filter(c => c !== 'border-2')
      const dot = dotOf(badge)!

      expect(borderColours.length).toBeGreaterThan(0)
      expect(classesWithPrefix(dot, ['bg-', 'dark:bg-']).sort()).toEqual(
        borderColours.map(borderToBg).sort()
      )
      expect(dot.classList).not.toContain('bg-current')
    }
  )

  it('gives success, warning and error dots distinct colours', () => {
    const colours = (['success', 'warning', 'error'] as const).map(variant => {
      const dot = dotOf(
        render(
          <Badge variant={variant} dot>
            Status
          </Badge>
        )
      )!
      return classesWithPrefix(dot, ['bg-']).join(' ')
    })

    expect(new Set(colours).size).toBe(3)
  })

  it.each<Variant>(['default', 'active', 'disabled'])(
    'keeps the %s dot in the text colour, as it has no status colour',
    variant => {
      const dot = dotOf(
        render(
          <Badge variant={variant} dot>
            Status
          </Badge>
        )
      )!
      expect(dot.classList).toContain('bg-current')
      expect(classesWithPrefix(dot, ['bg-', 'dark:bg-'])).toEqual([
        'bg-current'
      ])
    }
  )

  it.each<Variant>(['default', 'success', 'warning', 'error'])(
    'leaves the %s badge text in the foreground colour',
    variant => {
      const badge = render(
        <Badge variant={variant} dot>
          Status
        </Badge>
      )
      expect(badge.classList).toContain('text-foreground')
      expect(badge.classList).toContain('dark:text-foreground-dark')
    }
  )

  it('renders no dot without the prop', () => {
    const badge = render(<Badge variant="success">Status</Badge>)
    expect(dotOf(badge)).toBeNull()
  })
})
