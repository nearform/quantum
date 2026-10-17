/**
 * @jest-environment jsdom
 */

import { describe, expect, it, beforeEach } from '@jest/globals'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
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

beforeEach(() => {
  document.documentElement.classList.remove('dark')
  localStorage.clear()
})

const mount = (ui: React.ReactElement) => {
  const container = document.createElement('div')
  document.body.appendChild(container)
  act(() => {
    createRoot(container).render(ui)
  })
  return container
}

describe('ThemeToggle', () => {
  it('renders a button with an aria-label', () => {
    const container = mount(<ThemeToggle />)
    const button = container.querySelector('button')!
    expect(button).toBeTruthy()
    expect(button.getAttribute('aria-label')).toBe('Use dark theme')
  })

  it('toggles the dark class on <html> and updates the label', () => {
    const container = mount(<ThemeToggle />)
    const button = container.querySelector('button')!

    act(() => {
      button.click()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(button.getAttribute('aria-label')).toBe('Use light theme')
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      button.click()
    })

    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(button.getAttribute('aria-label')).toBe('Use dark theme')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('calls onThemeChange with the new theme', () => {
    const changes: string[] = []
    const container = mount(
      <ThemeToggle onThemeChange={t => changes.push(t)} />
    )

    act(() => {
      container.querySelector('button')!.click()
    })

    expect(changes).toEqual(['dark'])
  })

  it('reads stored theme from localStorage on mount', () => {
    localStorage.setItem('theme', 'dark')
    const container = mount(<ThemeToggle />)

    expect(container.querySelector('button')!.getAttribute('aria-label')).toBe(
      'Use light theme'
    )
  })
})

describe('themeInitScript', () => {
  it('is a non-empty string containing the storage key', () => {
    expect(typeof themeInitScript).toBe('string')
    expect(themeInitScript.length).toBeGreaterThan(0)
    expect(themeInitScript).toContain('theme')
  })
})
