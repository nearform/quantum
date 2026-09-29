/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { CodeBlock } from '../src/components/CodeBlock'

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

describe('CodeBlock', () => {
  it('renders the code inside a pre and code element', () => {
    const container = render(
      <CodeBlock>{'const a = 1\n  const b = 2'}</CodeBlock>
    )

    const code = container.querySelector('figure > pre > code')
    expect(code?.textContent).toBe('const a = 1\n  const b = 2')
  })

  it('captions the figure with its label', () => {
    const container = render(<CodeBlock label="Settings">x</CodeBlock>)

    expect(container.querySelector('figure > figcaption')?.textContent).toBe(
      'Settings'
    )
  })

  it('renders no caption without a label', () => {
    const container = render(<CodeBlock>x</CodeBlock>)

    expect(container.querySelector('figcaption')).toBeNull()
  })

  it('lets keyboard users focus the code so they can scroll it', () => {
    const container = render(<CodeBlock>x</CodeBlock>)

    expect(container.querySelector('pre')?.getAttribute('tabindex')).toBe('0')
  })

  it('marks the code with its language for syntax highlighters', () => {
    const container = render(<CodeBlock language="json">{'{}'}</CodeBlock>)

    const code = container.querySelector('code')!
    expect(code.className).toBe('language-json')
    expect(code.getAttribute('data-language')).toBe('json')
  })

  it('adds no language hooks without a language', () => {
    const container = render(<CodeBlock>x</CodeBlock>)

    const code = container.querySelector('code')!
    expect(code.hasAttribute('class')).toBe(false)
    expect(code.hasAttribute('data-language')).toBe(false)
  })

  it('passes other attributes and its className to the figure', () => {
    const container = render(
      <CodeBlock className="w-96" data-testid="snippet">
        x
      </CodeBlock>
    )

    const figure = container.querySelector('figure')!
    expect(figure.getAttribute('data-testid')).toBe('snippet')
    expect(figure.classList).toContain('w-96')
  })

  it('forwards its ref to the figure', () => {
    const ref = React.createRef<HTMLElement>()
    render(<CodeBlock ref={ref}>x</CodeBlock>)

    expect(ref.current?.tagName).toBe('FIGURE')
  })
})
