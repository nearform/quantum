import * as React from 'react'
import type { Decorator } from '@storybook/react-vite'
import { addons } from 'storybook/preview-api'
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode'

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

const isTestRunner = () => navigator.userAgent.includes('StorybookTestRunner')

let lastPane: Mode | null = null

const trackPane = (event: Event) => {
  const target = event.target
  if (!(target instanceof Element)) return
  const pane = target.closest<HTMLElement>('[data-color-pane]')
  if (pane) lastPane = pane.dataset.colorPane as Mode
  else if (target.closest('#storybook-root, #storybook-docs')) lastPane = null
}

for (const type of ['pointerdown', 'focusin', 'keydown']) {
  document.addEventListener(type, trackPane, true)
}

const keepDark = new MutationObserver(records => {
  for (const { target } of records) {
    if (target instanceof Element && !target.classList.contains('dark')) {
      target.classList.add('dark')
    }
  }
})

const isPortal = (node: Node): node is HTMLElement =>
  node instanceof HTMLElement &&
  !['SCRIPT', 'STYLE', 'LINK'].includes(node.tagName) &&
  !node.id.startsWith('storybook-') &&
  ![...node.classList].some(name => name.startsWith('sb-'))

new MutationObserver(records => {
  if (lastPane !== 'dark') return
  for (const record of records) {
    record.addedNodes.forEach(node => {
      if (!isPortal(node)) return
      node.classList.add('dark')
      keepDark.observe(node, { attributes: true, attributeFilter: ['class'] })
    })
  }
}).observe(document.body, { childList: true })

const Pane = ({
  mode,
  children
}: {
  mode: Mode
  children: React.ReactNode
}) => (
  <section
    data-color-pane={mode}
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

  const sideBySide = context.globals.theme !== 'single' && !isTestRunner()

  React.useLayoutEffect(() => {
    setBodyOverride(sideBySide ? 'light' : null)
    return () => setBodyOverride(null)
  }, [sideBySide, isDark])

  if (!sideBySide) return <Story />

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
