/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { BsPeople } from '../src/assets'
import { Stat, Stats } from '../src/components/Stats'

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

describe('Stats', () => {
  it('renders each stat as a term and description in a list', () => {
    const container = render(
      <Stats>
        <Stat label="Contributors" value={20} />
        <Stat label="Stars" value={7} />
      </Stats>
    )

    const list = container.querySelector('dl')!
    const terms = Array.from(list.querySelectorAll('div > dt')).map(
      dt => dt.textContent
    )
    const values = Array.from(list.querySelectorAll('div > dd')).map(
      dd => dd.textContent
    )
    expect(terms).toEqual(['Contributors', 'Stars'])
    expect(values).toEqual(['20', '7'])
  })

  it('renders the icon inside the term, hidden from assistive technology', () => {
    const container = render(
      <Stats>
        <Stat icon={BsPeople} label="Contributors" value={20} />
      </Stats>
    )

    const icon = container.querySelector('dt > svg')!
    expect(icon.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders no icon when none is given', () => {
    const container = render(
      <Stats>
        <Stat label="Contributors" value={20} />
      </Stats>
    )

    expect(container.querySelector('svg')).toBeNull()
  })

  it('passes other attributes and its className to the list and the stat', () => {
    const container = render(
      <Stats className="list-class" data-testid="stats">
        <Stat
          className="stat-class"
          data-testid="stat"
          label="Stars"
          value={7}
        />
      </Stats>
    )

    const list = container.querySelector('dl')!
    const stat = list.querySelector('div')!
    expect(list.getAttribute('data-testid')).toBe('stats')
    expect(list.classList.contains('list-class')).toBe(true)
    expect(stat.getAttribute('data-testid')).toBe('stat')
    expect(stat.classList.contains('stat-class')).toBe(true)
  })

  it('forwards refs to the list and the stat', () => {
    const listRef = React.createRef<HTMLDListElement>()
    const statRef = React.createRef<HTMLDivElement>()
    render(
      <Stats ref={listRef}>
        <Stat ref={statRef} label="Stars" value={7} />
      </Stats>
    )

    expect(listRef.current?.tagName).toBe('DL')
    expect(statRef.current?.tagName).toBe('DIV')
  })
})
