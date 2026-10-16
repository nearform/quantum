/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Meter } from '../src/components/Meter'

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

describe('Meter', () => {
  it('renders with role="img"', () => {
    const el = render(
      <Meter max={100} segments={[{ value: 50, label: 'used' }]} />
    )
    expect(el.querySelector('[role="img"]')).not.toBeNull()
  })

  it('generates an aria-label from segments, max and remaining', () => {
    const el = render(
      <Meter
        max={1250}
        segments={[
          { value: 1100, label: 'approved' },
          { value: 100, label: 'pending' }
        ]}
      />
    )
    const label = el.querySelector('[role="img"]')!.getAttribute('aria-label')
    expect(label).toBe('1100 approved, 100 pending, of a 1250 limit. 50 left.')
  })

  it('uses a custom aria-label when provided', () => {
    const el = render(
      <Meter
        max={100}
        segments={[{ value: 50, label: 'used' }]}
        aria-label="Custom label"
      />
    )
    expect(el.querySelector('[role="img"]')!.getAttribute('aria-label')).toBe(
      'Custom label'
    )
  })

  it('renders segments with proportional widths', () => {
    const el = render(
      <Meter
        max={200}
        segments={[
          { value: 100, label: 'a' },
          { value: 50, label: 'b' }
        ]}
      />
    )
    const spans = el.querySelectorAll('[data-segment]')
    expect(spans).toHaveLength(2)
    expect((spans[0] as HTMLElement).style.width).toBe('50%')
    expect((spans[1] as HTMLElement).style.width).toBe('25%')
  })

  it('renders overflow in error colour when segments exceed max', () => {
    const el = render(
      <Meter
        max={100}
        segments={[
          { value: 80, label: 'a' },
          { value: 40, label: 'b' }
        ]}
      />
    )
    const overflows = el.querySelectorAll('[data-overflow="true"]')
    expect(overflows.length).toBeGreaterThan(0)
  })

  it('scales segments so bar never exceeds 100%', () => {
    const el = render(
      <Meter
        max={100}
        segments={[
          { value: 80, label: 'a' },
          { value: 60, label: 'b' }
        ]}
      />
    )
    const spans = el.querySelectorAll('[data-segment]')
    let total = 0
    spans.forEach(s => {
      total += parseFloat((s as HTMLElement).style.width)
    })
    expect(total).toBeCloseTo(100, 1)
  })

  it('renders a marker at the given fraction', () => {
    const el = render(
      <Meter
        max={100}
        segments={[{ value: 50, label: 'used' }]}
        marker={{ at: 0.4, label: 'Today' }}
      />
    )
    const marker = el.querySelector('button[aria-label="Today"]')
    expect(marker).not.toBeNull()
    expect((marker as HTMLElement).style.left).toBe('40%')
  })

  it('clamps marker at to 0-1 range', () => {
    const el = render(
      <Meter
        max={100}
        segments={[{ value: 50, label: 'used' }]}
        marker={{ at: 1.5, label: 'End' }}
      />
    )
    const marker = el.querySelector('button[aria-label="End"]') as HTMLElement
    expect(marker.style.left).toBe('100%')
  })

  it('skips zero-value segments', () => {
    const el = render(
      <Meter
        max={100}
        segments={[
          { value: 0, label: 'empty' },
          { value: 50, label: 'used' }
        ]}
      />
    )
    const spans = el.querySelectorAll('[data-segment]')
    expect(spans).toHaveLength(1)
    expect(spans[0].getAttribute('data-segment')).toBe('used')
  })

  it('handles max of 0 gracefully', () => {
    const el = render(
      <Meter max={0} segments={[{ value: 50, label: 'used' }]} />
    )
    const spans = el.querySelectorAll('[data-segment]')
    expect(spans).toHaveLength(0)
  })

  it('generates over-limit label when total exceeds max', () => {
    const el = render(
      <Meter max={100} segments={[{ value: 120, label: 'spent' }]} />
    )
    const label = el.querySelector('[role="img"]')!.getAttribute('aria-label')
    expect(label).toContain('over limit')
  })

  it('applies formatValue to generated aria-label', () => {
    const el = render(
      <Meter
        max={1000}
        segments={[{ value: 800, label: 'used' }]}
        formatValue={v => `€${v}`}
      />
    )
    const label = el.querySelector('[role="img"]')!.getAttribute('aria-label')
    expect(label).toContain('€800')
    expect(label).toContain('€1000')
  })

  it('forwards ref', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(
      <Meter ref={ref} max={100} segments={[{ value: 50, label: 'used' }]} />
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('applies striped pattern class', () => {
    const el = render(
      <Meter
        max={100}
        segments={[{ value: 50, pattern: 'striped', label: 'pending' }]}
      />
    )
    const seg = el.querySelector('[data-segment="pending"]') as HTMLElement
    expect(seg.className).toContain('bg-[repeating-linear-gradient')
  })
})
