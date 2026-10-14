/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it, jest } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Stepper, StepperItem, StepperNav } from '../src/components/Stepper'

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

const buttonNamed = (container: HTMLElement, name: string) =>
  Array.from(container.querySelectorAll('button')).find(
    button =>
      button.textContent === name || button.getAttribute('aria-label') === name
  )!

describe('Stepper', () => {
  const renderSteps = (currentStep?: number) =>
    render(
      <Stepper currentStep={currentStep}>
        <StepperItem title="One" description="First" />
        <StepperItem title="Two" />
        <StepperItem title="Three" />
      </Stepper>
    )

  it('renders each step as an item in an ordered list', () => {
    const container = renderSteps()

    const items = Array.from(container.querySelectorAll('ol > li'))
    expect(items.map(item => item.textContent)).toEqual([
      '1OneFirst',
      '2Two',
      '3Three'
    ])
  })

  it('marks steps before the current one complete and after it upcoming', () => {
    const container = renderSteps(1)

    const items = Array.from(container.querySelectorAll('li'))
    expect(items.map(item => item.getAttribute('data-status'))).toEqual([
      'complete',
      'current',
      'upcoming'
    ])
    expect(items.map(item => item.getAttribute('aria-current'))).toEqual([
      null,
      'step',
      null
    ])
  })

  it('starts on the first step by default', () => {
    const container = renderSteps()

    expect(container.querySelector('li')!.getAttribute('aria-current')).toBe(
      'step'
    )
  })

  it.each([
    [5, 2],
    [3, 2],
    [-1, 0],
    [Number.NaN, 0],
    [1.5, 1]
  ])('keeps a currentStep of %p in range as step %p', (currentStep, index) => {
    const container = renderSteps(currentStep)

    const current = Array.from(container.querySelectorAll('li')).map(
      item => item.getAttribute('aria-current') === 'step'
    )
    expect(current).toEqual([0, 1, 2].map(i => i === index))
  })

  it('draws a connector after every step but the last', () => {
    const container = renderSteps()

    const connectors = Array.from(container.querySelectorAll('li')).map(
      item => item.querySelectorAll('[aria-hidden="true"]').length
    )
    expect(connectors).toEqual([2, 2, 1])
  })

  it('numbers steps grouped in fragments as separate steps', () => {
    const container = render(
      <Stepper currentStep={1}>
        <StepperItem title="One" />
        <>
          <StepperItem title="Two" />
          <StepperItem title="Three" />
        </>
      </Stepper>
    )

    const items = Array.from(container.querySelectorAll('li'))
    expect(items.map(item => item.textContent)).toEqual([
      '1One',
      '2Two',
      '3Three'
    ])
    expect(items.map(item => item.getAttribute('data-status'))).toEqual([
      'complete',
      'current',
      'upcoming'
    ])
  })

  it('renders a description of 0', () => {
    const container = render(
      <Stepper>
        <StepperItem title="Errors" description={0} />
      </Stepper>
    )

    expect(container.querySelector('li')!.textContent).toBe('1Errors0')
  })

  it('passes other attributes, its className and refs to the list and items', () => {
    const listRef = React.createRef<HTMLOListElement>()
    const itemRef = React.createRef<HTMLLIElement>()
    const container = render(
      <Stepper ref={listRef} className="list-class" data-testid="stepper">
        <StepperItem
          ref={itemRef}
          className="item-class"
          data-testid="item"
          title="One"
        />
      </Stepper>
    )

    const list = container.querySelector('ol')!
    const item = list.querySelector('li')!
    expect(list.getAttribute('data-testid')).toBe('stepper')
    expect(list.classList.contains('list-class')).toBe(true)
    expect(item.getAttribute('data-testid')).toBe('item')
    expect(item.classList.contains('item-class')).toBe(true)
    expect(listRef.current).toBe(list)
    expect(itemRef.current).toBe(item)
  })

  it('throws when a StepperItem is rendered outside a Stepper', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    expect(() => render(<StepperItem title="One" />)).toThrow(
      'StepperItem must be rendered inside a Stepper'
    )
    consoleError.mockRestore()
  })
})

describe('Stepper status', () => {
  const statuses = (container: HTMLElement) =>
    Array.from(container.querySelectorAll('li')).map(item =>
      item.getAttribute('data-status')
    )

  it('lets each item set its own status over the one from currentStep', () => {
    const container = render(
      <Stepper currentStep={0}>
        <StepperItem title="One" status="complete" />
        <StepperItem title="Two" />
        <StepperItem title="Three" status="current" />
      </Stepper>
    )

    expect(statuses(container)).toEqual(['complete', 'upcoming', 'current'])
    expect(
      Array.from(container.querySelectorAll('li')).map(item =>
        item.getAttribute('aria-current')
      )
    ).toEqual([null, null, 'step'])
  })

  it('marks no step current when currentStep is null', () => {
    const container = render(
      <Stepper currentStep={null}>
        <StepperItem title="One" />
        <StepperItem title="Two" />
      </Stepper>
    )

    expect(statuses(container)).toEqual(['upcoming', 'upcoming'])
    expect(container.querySelector('[aria-current]')).toBeNull()
  })

  it('keeps complete steps that are not in order', () => {
    const container = render(
      <Stepper currentStep={null} orientation="vertical">
        <StepperItem title="One" />
        <StepperItem title="Two" status="complete" />
        <StepperItem title="Three" />
        <StepperItem title="Four" status="complete" />
      </Stepper>
    )

    expect(statuses(container)).toEqual([
      'upcoming',
      'complete',
      'upcoming',
      'complete'
    ])
    expect(container.querySelector('[aria-current]')).toBeNull()
  })

  it('adds a status label in horizontal steps only when one is given', () => {
    const container = render(
      <Stepper currentStep={1}>
        <StepperItem title="One" statusLabel="Done" />
        <StepperItem title="Two" />
      </Stepper>
    )

    const labels = Array.from(container.querySelectorAll('li')).map(
      item => item.querySelector('.sr-only')?.textContent ?? null
    )
    expect(labels).toEqual([' Done', null])
  })
})

describe('Stepper vertical', () => {
  const renderVertical = (currentStep?: number | null) =>
    render(
      <Stepper currentStep={currentStep} orientation="vertical">
        <StepperItem title="One" description="First" />
        <StepperItem title="Two" />
        <StepperItem title="Three" />
      </Stepper>
    )

  it('marks the list as vertical', () => {
    const container = renderVertical()

    expect(
      container.querySelector('ol')!.getAttribute('data-orientation')
    ).toBe('vertical')
  })

  it('shows a check instead of the number for complete steps', () => {
    const container = renderVertical(1)

    const badges = Array.from(container.querySelectorAll('li')).map(item =>
      item.querySelector('[aria-hidden="true"]')!
    )
    expect(badges.map(badge => badge.querySelector('svg') !== null)).toEqual([
      true,
      false,
      false
    ])
    expect(badges.map(badge => badge.textContent)).toEqual(['', '2', '3'])
  })

  it('states the status of complete and upcoming steps for screen readers', () => {
    const container = renderVertical(1)

    const labels = Array.from(container.querySelectorAll('li')).map(
      item => item.querySelector('.sr-only')?.textContent ?? null
    )
    expect(labels).toEqual([' Completed', null, ' To do'])
  })

  it('uses the given status label', () => {
    const container = render(
      <Stepper currentStep={null} orientation="vertical">
        <StepperItem title="One" status="complete" statusLabel="Fait" />
        <StepperItem title="Two" statusLabel="À faire" />
        <StepperItem title="Three" statusLabel={false} />
      </Stepper>
    )

    const labels = Array.from(container.querySelectorAll('li')).map(
      item => item.querySelector('.sr-only')?.textContent ?? null
    )
    expect(labels).toEqual([' Fait', ' À faire', null])
  })

  it('draws a connector below every step but the last', () => {
    const container = renderVertical()

    const connectors = Array.from(container.querySelectorAll('li')).map(
      item => item.querySelectorAll('[aria-hidden="true"]').length
    )
    expect(connectors).toEqual([2, 2, 1])
  })

  it('puts the description below the title', () => {
    const container = renderVertical()

    const text = container.querySelector('li')!.lastElementChild!
    expect(Array.from(text.children).map(child => child.textContent)).toEqual([
      'One',
      'First'
    ])
  })
})

describe('StepperNav', () => {
  it('moves back and forward through the steps', () => {
    const onStepChange = jest.fn()
    const container = render(
      <StepperNav currentStep={2} totalSteps={5} onStepChange={onStepChange} />
    )

    act(() => buttonNamed(container, 'Back').click())
    act(() => buttonNamed(container, 'Next').click())
    expect(onStepChange.mock.calls).toEqual([[1], [3]])
  })

  it('disables Back on the first step and Next on the last', () => {
    const first = render(<StepperNav currentStep={0} totalSteps={3} />)
    expect(buttonNamed(first, 'Back').disabled).toBe(true)
    expect(buttonNamed(first, 'Next').disabled).toBe(false)

    act(() => root?.render(<StepperNav currentStep={2} totalSteps={3} />))
    expect(buttonNamed(first, 'Back').disabled).toBe(false)
    expect(buttonNamed(first, 'Next').disabled).toBe(true)
  })

  it('shows a dot for each step that jumps to it', () => {
    const onStepChange = jest.fn()
    const container = render(
      <StepperNav currentStep={0} totalSteps={3} onStepChange={onStepChange} />
    )

    const dot = buttonNamed(container, 'Step 3 of 3')
    act(() => dot.click())
    expect(onStepChange).toHaveBeenCalledWith(2)
    expect(
      buttonNamed(container, 'Step 1 of 3').getAttribute('aria-current')
    ).toBe('step')
  })

  it('shows the step count in a live region with the counter indicator', () => {
    const container = render(
      <StepperNav currentStep={0} totalSteps={2} indicator="counter" />
    )

    const counter = container.querySelector('[aria-live="polite"]')!
    expect(counter.querySelector('[aria-hidden="true"]')!.textContent).toBe(
      '1/2'
    )
    expect(counter.querySelector('.sr-only')!.textContent).toBe('Step 1 of 2')
    expect(container.querySelectorAll('button')).toHaveLength(2)
  })

  it.each([0, -1, Number.NaN])(
    'disables both buttons and shows no indicator with %p steps',
    totalSteps => {
      const container = render(
        <StepperNav
          currentStep={0}
          totalSteps={totalSteps}
          indicator="counter"
        />
      )

      expect(buttonNamed(container, 'Back').disabled).toBe(true)
      expect(buttonNamed(container, 'Next').disabled).toBe(true)
      expect(container.querySelector('[aria-live]')).toBeNull()
    }
  )

  it('rounds a fractional step count down', () => {
    const container = render(<StepperNav currentStep={0} totalSteps={2.5} />)

    expect(buttonNamed(container, 'Step 2 of 2')).toBeDefined()
    expect(container.querySelectorAll('button')).toHaveLength(4)
  })

  it('uses the given labels', () => {
    const container = render(
      <StepperNav
        currentStep={0}
        totalSteps={2}
        indicator="counter"
        label="Checkout"
        backLabel="Previous"
        nextLabel="Continue"
        stepLabel={(step, total) => `${step} von ${total}`}
      />
    )

    const group = container.querySelector('[role="group"]')!
    expect(group.getAttribute('aria-label')).toBe('Checkout')
    expect(buttonNamed(container, 'Previous')).toBeDefined()
    expect(buttonNamed(container, 'Continue')).toBeDefined()
    expect(container.querySelector('.sr-only')!.textContent).toBe('1 von 2')
  })

  it('passes other attributes, its className and ref to the group', () => {
    const ref = React.createRef<HTMLDivElement>()
    const container = render(
      <StepperNav
        ref={ref}
        className="nav-class"
        data-testid="nav"
        currentStep={0}
        totalSteps={2}
      />
    )

    const group = container.querySelector('[role="group"]')!
    expect(group.getAttribute('data-testid')).toBe('nav')
    expect(group.classList.contains('nav-class')).toBe(true)
    expect(ref.current).toBe(group)
  })
})
