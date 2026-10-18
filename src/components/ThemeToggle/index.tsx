import * as React from 'react'
import { BsMoon, BsSun } from 'react-icons/bs'

import { IconButton, type IconButtonProps } from '../IconButton'

const STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

type Theme = 'light' | 'dark'

function readStored(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    return null
  }
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* storage can be blocked */
  }
}

function resolveTheme(): Theme {
  return (
    readStored() ?? (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light')
  )
}

const listeners = new Set<() => void>()

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  listeners.forEach(listener => listener())
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)

  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })

  const media = window.matchMedia(DARK_QUERY)
  const onSystemChange = () => {
    if (!readStored()) applyTheme(media.matches ? 'dark' : 'light')
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      applyTheme(resolveTheme())
    }
  }
  media.addEventListener('change', onSystemChange)
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(onChange)
    observer.disconnect()
    media.removeEventListener('change', onSystemChange)
    window.removeEventListener('storage', onStorage)
  }
}

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

const getServerSnapshot = (): Theme => 'light'

interface ThemeToggleProps extends Omit<
  IconButtonProps,
  'icon' | 'label' | 'onClick' | 'aria-label' | 'children'
> {
  onThemeChange?: (theme: Theme) => void
}

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ onThemeChange, ...props }, ref) => {
    const theme = React.useSyncExternalStore(
      subscribe,
      getSnapshot,
      getServerSnapshot
    )

    React.useEffect(() => {
      applyTheme(resolveTheme())
    }, [])

    const toggle = () => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      persistTheme(next)
      applyTheme(next)
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

const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&matchMedia('${DARK_QUERY}').matches))}catch(e){}})()`

export { ThemeToggle, themeInitScript, type ThemeToggleProps, type Theme }
