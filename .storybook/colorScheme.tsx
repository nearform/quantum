import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode'

export type ThemeGlobal = 'auto' | 'dark' | 'side-by-side'

type Mode = 'light' | 'dark'

let toggleMode: Mode = 'light'
let bodyOverride: Mode | null = null

const applyBodyClass = () => {
  const mode = bodyOverride ?? toggleMode
  document.body.classList.toggle('dark', mode === 'dark')
}

addons.getChannel().on(DARK_MODE_EVENT_NAME, (isDark: boolean) => {
  toggleMode = isDark ? 'dark' : 'light'
  applyBodyClass()
})

const setBodyOverride = (mode: Mode | null) => {
  bodyOverride = mode
  applyBodyClass()
}

const Pane = ({
  mode,
  children
}: {
  mode: Mode
  children: React.ReactNode
}) => (
  <section
    aria-label={`${mode === 'dark' ? 'Dark' : 'Light'} mode`}
    className={
      mode === 'dark'
        ? 'dark bg-background-dark text-foreground-dark p-4 min-w-0'
        : 'bg-background text-foreground p-4 min-w-0'
    }
  >
    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-foreground-muted dark:text-foreground-muted-dark">
      {mode === 'dark' ? 'Dark' : 'Light'}
    </p>
    {children}
  </section>
)

export const withColorScheme: Decorator = (Story, context) => {
  const isDark = useDarkMode()
  toggleMode = isDark ? 'dark' : 'light'

  const theme = (context.globals.theme ?? 'auto') as ThemeGlobal
  const inDocs = context.viewMode === 'docs'

  let bodyMode: Mode | null = null
  if (theme === 'side-by-side') bodyMode = 'light'
  else if (theme === 'dark' && !inDocs) bodyMode = 'dark'

  React.useLayoutEffect(() => {
    setBodyOverride(bodyMode)
    return () => setBodyOverride(null)
  }, [bodyMode, isDark])

  if (theme === 'side-by-side') {
    return (
      <div className="grid w-full min-w-[min(calc(100vw-2rem),64rem)] gap-px grid-cols-[repeat(auto-fit,minmax(min(100%,24rem),1fr))]">
        <Pane mode="light">
          <Story />
        </Pane>
        <Pane mode="dark">
          <Story />
        </Pane>
      </div>
    )
  }

  if (theme === 'dark' && inDocs && !isDark) {
    return (
      <div className="dark bg-background-dark text-foreground-dark p-4">
        <Story />
      </div>
    )
  }

  return <Story />
}
