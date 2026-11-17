/**
 * @jest-environment jsdom
 */
import { afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Tooltip } from '../src/components/Tooltip'

const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

let root: Root | undefined
let container: HTMLDivElement | undefined

beforeAll(() => {
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
})

afterEach(() => {
  act(() => {
    root?.unmount()
  })
  container?.remove()
})

const openTooltip = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
  act(() => {
    container!.querySelector('button')!.focus()
  })
  const content = document.querySelector<HTMLElement>(
    '[data-radix-popper-content-wrapper] > *'
  )
  if (!content) throw new Error('tooltip content did not open')
  return content
}

describe('Tooltip', () => {
  it('caps the width of long content and wraps it left-aligned', () => {
    const content = openTooltip(
      <Tooltip content="A very long label that should wrap over several lines">
        <button>Trigger</button>
      </Tooltip>
    )
    expect(content.classList).toContain('max-w-xs')
    expect(content.classList).toContain('break-words')
    expect(content.classList).toContain('text-left')
    expect(content.classList).not.toContain('text-center')
  })

  it('merges a className into the content, overriding the default width', () => {
    const content = openTooltip(
      <Tooltip content="Wide" className="max-w-md">
        <button>Trigger</button>
      </Tooltip>
    )
    expect(content.classList).toContain('max-w-md')
    expect(content.classList).not.toContain('max-w-xs')
    expect(content.classList).toContain('bg-accent')
  })
})
