/**
 * @jest-environment jsdom
 */

import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import * as React from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

import { ThemeToggle, themeInitScript } from '../src/components/ThemeToggle'

Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
})

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

const labelOf = (button: Element) => button.getAttribute('aria-label')

describe('ThemeToggle', () => {
  it('offers the dark theme when the page is light', () => {
    const button = mount(<ThemeToggle />).querySelector('button')!

    expect(labelOf(button)).toBe('Use dark theme')
  })

  it('toggles the dark class on <html>, stores the choice and updates the label', () => {
    const button = mount(<ThemeToggle />).querySelector('button')!

    act(() => button.click())

    expect(html.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(labelOf(button)).toBe('Use light theme')

    act(() => button.click())

    expect(html.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
    expect(labelOf(button)).toBe('Use dark theme')
  })

  it('calls onThemeChange with the new theme', () => {
    const changes: string[] = []
    const container = mount(
      <ThemeToggle onThemeChange={theme => changes.push(theme)} />
    )

    act(() => container.querySelector('button')!.click())

    expect(changes).toEqual(['dark'])
  })

  it('applies a stored theme to <html> on mount', () => {
    localStorage.setItem('theme', 'dark')
    const button = mount(<ThemeToggle />).querySelector('button')!

    expect(html.classList.contains('dark')).toBe(true)
    expect(labelOf(button)).toBe('Use light theme')
  })

  it('follows the dark class when something else changes it', async () => {
    const button = mount(<ThemeToggle />).querySelector('button')!

    await act(async () => {
      html.classList.add('dark')
      await Promise.resolve()
    })

    expect(labelOf(button)).toBe('Use light theme')
  })

  it('keeps multiple instances in sync', () => {
    const [a, b] = mount(
      <>
        <ThemeToggle />
        <ThemeToggle />
      </>
    ).querySelectorAll('button')

    act(() => a.click())

    expect(labelOf(a)).toBe('Use light theme')
    expect(labelOf(b)).toBe('Use light theme')

    act(() => b.click())

    expect(labelOf(a)).toBe('Use dark theme')
    expect(labelOf(b)).toBe('Use dark theme')
  })
})

describe('themeInitScript', () => {
  it('reads the same storage key the toggle writes', () => {
    expect(themeInitScript).toContain("localStorage.getItem('theme')")
  })
})
