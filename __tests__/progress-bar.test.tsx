/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { ProgressBar } from '../src/components/ProgressBar'

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
  const bar = container.querySelector('[role="progressbar"]')
  if (!bar) throw new Error(`no progressbar in ${container.innerHTML}`)
  return bar
}

const fillOf = (bar: Element) => bar.firstElementChild as HTMLElement

const classesOf = (element: Element) =>
  (element.getAttribute('class') ?? '').split(/\s+/)

describe('ProgressBar with a value', () => {
  it('exposes the value and default range', () => {
    const bar = render(<ProgressBar aria-label="Upload" value={30} />)

    expect([
      bar.getAttribute('aria-valuenow'),
      bar.getAttribute('aria-valuemin'),
      bar.getAttribute('aria-valuemax')
    ]).toEqual(['30', '0', '100'])
  })

  it('exposes a custom range', () => {
    const bar = render(
      <ProgressBar aria-label="Files" value={3} min={0} max={10} />
    )

    expect([
      bar.getAttribute('aria-valuenow'),
      bar.getAttribute('aria-valuemax')
    ]).toEqual(['3', '10'])
  })

  it('fills the bar in proportion to the range', () => {
    const bar = render(
      <ProgressBar aria-label="Files" value={15} min={10} max={30} />
    )

    expect(fillOf(bar).style.width).toBe('25%')
  })

  it.each([
    ['below min', -20, '0', '0%'],
    ['above max', 140, '100', '100%']
  ])('clamps a value %s', (_case, value, now, width) => {
    const bar = render(<ProgressBar aria-label="Upload" value={value} />)

    expect([
      bar.getAttribute('aria-valuenow'),
      fillOf(bar).style.width
    ]).toEqual([now, width])
  })

  it('renders an empty fill when max equals min', () => {
    const bar = render(
      <ProgressBar aria-label="Upload" value={5} min={5} max={5} />
    )

    expect(fillOf(bar).style.width).toBe('0%')
  })

  it('does not animate the fill', () => {
    const bar = render(<ProgressBar aria-label="Upload" value={30} />)

    expect(classesOf(fillOf(bar))).not.toContain(
      'animate-progressIndeterminate'
    )
  })
})

describe('ProgressBar without a value', () => {
  it.each([
    ['omitted', undefined],
    ['null', null],
    ['NaN', Number.NaN]
  ])('omits aria-valuenow when the value is %s', (_case, value) => {
    const bar = render(<ProgressBar aria-label="Upload" value={value} />)

    expect(bar.hasAttribute('aria-valuenow')).toBe(false)
  })

  it('marks itself indeterminate', () => {
    const bar = render(<ProgressBar aria-label="Upload" />)

    expect(bar.getAttribute('data-state')).toBe('indeterminate')
  })

  it('animates the segment', () => {
    const bar = render(<ProgressBar aria-label="Upload" />)

    expect(classesOf(fillOf(bar))).toContain('animate-progressIndeterminate')
  })

  it('holds the segment still when reduced motion is preferred', () => {
    const bar = render(<ProgressBar aria-label="Upload" />)

    expect(classesOf(fillOf(bar))).toEqual(
      expect.arrayContaining(['motion-reduce:animate-none'])
    )
  })
})

describe('ProgressBar labelling', () => {
  it('takes its name from aria-label', () => {
    const bar = render(<ProgressBar aria-label="Uploading report.pdf" />)

    expect(bar.getAttribute('aria-label')).toBe('Uploading report.pdf')
  })

  it('takes its name from aria-labelledby', () => {
    const bar = render(<ProgressBar aria-labelledby="upload-heading" />)

    expect(bar.getAttribute('aria-labelledby')).toBe('upload-heading')
  })

  it('passes aria-valuetext through', () => {
    const bar = render(
      <ProgressBar
        aria-label="Files"
        value={3}
        max={10}
        aria-valuetext="3 of 10 files"
      />
    )

    expect(bar.getAttribute('aria-valuetext')).toBe('3 of 10 files')
  })

  it('requires an accessible label at the type level', () => {
    // @ts-expect-error a ProgressBar needs aria-label or aria-labelledby
    const element = <ProgressBar value={10} />

    expect(element.props.value).toBe(10)
  })
})

describe('ProgressBar colours', () => {
  it('paints the track grey-500 and the fill accent in both modes', () => {
    const bar = render(<ProgressBar aria-label="Upload" value={50} />)

    expect([classesOf(bar), classesOf(fillOf(bar))]).toEqual([
      expect.arrayContaining([
        'bg-grey-500',
        'dark:bg-grey-500',
        'dark:ring-grey-400'
      ]),
      expect.arrayContaining(['bg-accent', 'dark:bg-accent-dark'])
    ])
  })
})
