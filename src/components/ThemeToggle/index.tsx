import * as React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

import { IconButton, type IconButtonProps } from '../IconButton'

const STORAGE_KEY = 'theme'

type Theme = 'light' | 'dark'

function resolveTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* storage can be blocked */
  }
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyClass(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage can be blocked */
  }
}

const listeners = new Set<() => void>()
let currentTheme: Theme = 'light'
let storeInitialised = false

function ensureResolved() {
  if (storeInitialised) return
  storeInitialised = true
  currentTheme = resolveTheme()
  applyClass(currentTheme)
}

let mqListenerAttached = false

function attachMqListener() {
  if (mqListenerAttached) return
  mqListenerAttached = true
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  mq.addEventListener('change', () => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
    } catch {
      /* storage can be blocked */
    }
    setStoreTheme(mq.matches ? 'dark' : 'light')
  })
}

function setStoreTheme(next: Theme) {
  if (next === currentTheme) return
  currentTheme = next
  applyClass(next)
  listeners.forEach(fn => fn())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}

function getSnapshot() {
  ensureResolved()
  return currentTheme
}

function getServerSnapshot() {
  return 'light' as Theme
}

interface ThemeToggleProps extends Omit<
  IconButtonProps,
  'icon' | 'label' | 'onClick' | 'aria-label' | 'children'
> {
  onThemeChange?: (theme: Theme) => void
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ onThemeChange, ...props }, ref) => {
    React.useEffect(() => {
      attachMqListener()
    }, [])

    const theme = React.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    )

    const toggle = () => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      persistTheme(next)
      setStoreTheme(next)
      onThemeChange?.(next)
    }

    const dark = theme === 'dark'

    return (
      <IconButton
        ref={ref}
        variant="tertiary"
        size="sm"
        icon={
          dark ? <BsSun aria-hidden="true" /> : <BsMoon aria-hidden="true" />
        }
        label={dark ? 'Use light theme' : 'Use dark theme'}
        onClick={toggle}
        {...props}
      />
    )
  }
)

ThemeToggle.displayName = 'ThemeToggle'

/**
 * Drop this script into `<head>` before the body renders to apply the stored
 * or system theme before paint, avoiding a flash of the wrong theme.
 *
 * Usage:
 * ```html
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
 * ```
 */
const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`

export { ThemeToggle, themeInitScript, type ThemeToggleProps, type Theme }
