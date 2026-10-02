/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { Slider } from '../src/components/Slider'

globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver

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
  document.body.innerHTML = ''
})

const mount = (element: React.ReactElement) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    root = createRoot(container!)
    root.render(element)
  })
}

describe('Slider', () => {
  it('renders with the slider role', () => {
    mount(<Slider defaultValue={[50]} aria-label="Volume" />)

    const slider = container!.querySelector('[role="slider"]')
    expect(slider).not.toBeNull()
  })

  it('sets the aria-valuenow from defaultValue', () => {
    mount(<Slider defaultValue={[30]} aria-label="Volume" />)

    const slider = container!.querySelector('[role="slider"]')!
    expect(slider.getAttribute('aria-valuenow')).toBe('30')
  })

  it('renders two thumbs for a range slider', () => {
    mount(<Slider defaultValue={[20, 80]} aria-label="Price range" />)

    const sliders = container!.querySelectorAll('[role="slider"]')
    expect(sliders.length).toBe(2)
    expect(sliders[0].getAttribute('aria-valuenow')).toBe('20')
    expect(sliders[1].getAttribute('aria-valuenow')).toBe('80')
  })

  it('respects min and max', () => {
    mount(<Slider defaultValue={[5]} min={0} max={10} aria-label="Rating" />)

    const slider = container!.querySelector('[role="slider"]')!
    expect(slider.getAttribute('aria-valuemin')).toBe('0')
    expect(slider.getAttribute('aria-valuemax')).toBe('10')
  })

  it('applies disabled state', () => {
    mount(<Slider defaultValue={[50]} disabled aria-label="Volume" />)

    const slider = container!.querySelector('[role="slider"]')!
    expect(slider.getAttribute('data-disabled')).not.toBeNull()
  })

  it('forwards its ref', () => {
    const ref = React.createRef<HTMLSpanElement>()
    mount(<Slider ref={ref} defaultValue={[50]} aria-label="Volume" />)

    expect(ref.current?.tagName).toBe('SPAN')
  })

  it('applies custom className', () => {
    mount(
      <Slider
        defaultValue={[50]}
        className="custom-class"
        aria-label="Volume"
      />
    )

    const root = container!.firstElementChild!
    expect(root.classList.contains('custom-class')).toBe(true)
  })

  it('renders end labels when minLabel and maxLabel are provided', () => {
    mount(
      <Slider
        defaultValue={[50]}
        minLabel="0"
        maxLabel="100"
        aria-label="Volume"
      />
    )

    const spans = container!.querySelectorAll('span')
    const texts = Array.from(spans).map(s => s.textContent)
    expect(texts).toContain('0')
    expect(texts).toContain('100')
  })

  it('renders only minLabel when maxLabel is omitted', () => {
    mount(<Slider defaultValue={[50]} minLabel="Low" aria-label="Volume" />)

    const texts = Array.from(container!.querySelectorAll('span')).map(
      s => s.textContent
    )
    expect(texts).toContain('Low')
    expect(texts).not.toContain('High')
  })

  it('applies className to the wrapper when end labels are present', () => {
    mount(
      <Slider
        defaultValue={[50]}
        minLabel="0"
        maxLabel="100"
        className="custom-class"
        aria-label="Volume"
      />
    )

    const wrapper = container!.firstElementChild!
    expect(wrapper.classList.contains('custom-class')).toBe(true)
  })

  it('connects the label to the thumbs via aria-labelledby', () => {
    mount(<Slider defaultValue={[50]} label="Volume" />)

    const label = container!.querySelector('span[id]')!
    const thumb = container!.querySelector('[role="slider"]')!
    expect(label.textContent).toBe('Volume')
    expect(thumb.getAttribute('aria-labelledby')).toBe(label.id)
  })

  it('renders label above and hint text beside it', () => {
    mount(<Slider defaultValue={[50]} label="Brightness" hintText="Screen" />)

    const texts = container!.textContent
    expect(texts).toContain('Brightness')
    expect(texts).toContain('Screen')
  })
})
