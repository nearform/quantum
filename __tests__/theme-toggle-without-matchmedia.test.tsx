/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { ThemeToggle } from '../src/components/ThemeToggle'

/**
 * jsdom has no `matchMedia`, and nor does any other environment without a
 * rendering engine behind it. `theme-toggle.test.tsx` installs one, so this
 * suite is the one that runs without it: the toggle has to fall back to the
 * light theme there rather than throw, the way `themeInitScript` already does
 * inside its own `try`.
 */
const actEnvironment = globalThis as typeof globalThis & {
  IS_REACT_ACT_ENVIRONMENT: boolean
}
actEnvironment.IS_REACT_ACT_ENVIRONMENT = true

const html = document.documentElement
const roots: Root[] = []

beforeEach(() => {
  html.classList.remove('dark')
  localStorage.clear()
})

afterEach(() => {
  act(() => roots.splice(0).forEach(root => root.unmount()))
  document.body.innerHTML = ''
})

const mount = (ui: React.ReactElement) => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  const root = createRoot(container)
  roots.push(root)
  act(() => {
    root.render(ui)
  })
  return container
}

describe('ThemeToggle without matchMedia', () => {
  it('runs in an environment that has no matchMedia', () => {
    expect(window.matchMedia).toBeUndefined()
  })

  it('renders and falls back to the light theme', () => {
    const button = mount(<ThemeToggle />).querySelector('button')!

    expect(html.classList.contains('dark')).toBe(false)
    expect(button.getAttribute('aria-label')).toBe('Use dark theme')
  })

  it('still applies a stored choice', () => {
    localStorage.setItem('theme', 'dark')

    mount(<ThemeToggle />)

    expect(html.classList.contains('dark')).toBe(true)
  })

  it('still toggles and stores the theme', () => {
    const button = mount(<ThemeToggle />).querySelector('button')!

    act(() => button.click())

    expect(html.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })
})
