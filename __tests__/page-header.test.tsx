/**
 * @jest-environment jsdom
 */
import { afterEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { BackLink } from '../src/components/BackLink'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderTitle
} from '../src/components/PageHeader'

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

describe('PageHeader', () => {
  it('renders the title as an h1 with the count beside it', () => {
    const container = render(
      <PageHeader>
        <PageHeaderTitle count="216 Results">Projects</PageHeaderTitle>
      </PageHeader>
    )

    const heading = container.querySelector('h1')!
    expect(heading.textContent).toBe('Projects')
    expect(heading.nextElementSibling?.textContent).toBe('216 Results')
  })

  it('renders a count of 0', () => {
    const container = render(
      <PageHeader>
        <PageHeaderTitle count={0}>Projects</PageHeaderTitle>
      </PageHeader>
    )

    expect(container.querySelector('h1')!.nextElementSibling?.textContent).toBe(
      '0'
    )
  })

  it('leaves out a missing count', () => {
    const container = render(
      <PageHeader>
        <PageHeaderTitle>Projects</PageHeaderTitle>
      </PageHeader>
    )

    expect(container.querySelector('h1')!.nextElementSibling).toBeNull()
  })

  it('renders another heading level with asChild', () => {
    const container = render(
      <PageHeader>
        <PageHeaderTitle asChild>
          <h2>Projects</h2>
        </PageHeaderTitle>
      </PageHeader>
    )

    expect(container.querySelector('h1')).toBeNull()
    expect(container.querySelector('h2')!.className).toContain('font-semibold')
  })

  it.each([
    ['md', 'px-4', 'text-xl'],
    ['sm', 'px-3', 'text-sm']
  ] as const)(
    'applies the %s padding and title size',
    (size, padding, titleSize) => {
      const container = render(
        <PageHeader size={size}>
          <PageHeaderTitle>Projects</PageHeaderTitle>
        </PageHeader>
      )

      expect(container.firstElementChild!.className).toContain(padding)
      expect(container.querySelector('h1')!.className).toContain(titleSize)
    }
  )

  it('uses the surface tokens for both modes', () => {
    const container = render(<PageHeader />)

    const classes = container.firstElementChild!.classList
    expect(classes).toContain('bg-background-surface')
    expect(classes).toContain('dark:bg-background-surface-dark')
  })

  it('renders a back link and actions, passing refs and attributes', () => {
    const headerRef = React.createRef<HTMLDivElement>()
    const actionsRef = React.createRef<HTMLDivElement>()
    const titleRef = React.createRef<HTMLHeadingElement>()
    const container = render(
      <>
        <PageHeader ref={headerRef} data-testid="header">
          <BackLink href="/projects" />
          <PageHeaderActions ref={actionsRef} className="custom">
            <button type="button">Filter</button>
          </PageHeaderActions>
        </PageHeader>
        <PageHeader>
          <PageHeaderTitle ref={titleRef} id="title">
            Projects
          </PageHeaderTitle>
        </PageHeader>
      </>
    )

    expect(headerRef.current?.dataset.testid).toBe('header')
    expect(container.querySelector('a')!.getAttribute('href')).toBe('/projects')
    expect(actionsRef.current?.className).toContain('custom')
    expect(actionsRef.current?.querySelector('button')?.textContent).toBe(
      'Filter'
    )
    expect(titleRef.current?.id).toBe('title')
  })
})
