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

const isPortal = (node: Node): node is HTMLElement =>
  node instanceof HTMLElement &&
  !['SCRIPT', 'STYLE', 'LINK'].includes(node.tagName) &&
  !node.id.startsWith('storybook-') &&
  ![...node.classList].some(name => name.startsWith('sb-'))

const darkPortals = new Map<Node, MutationObserver>()

const keepDark = (node: HTMLElement) => {
  node.classList.add('dark')
  const observer = new MutationObserver(() => {
    if (!node.classList.contains('dark')) node.classList.add('dark')
  })
  observer.observe(node, { attributes: true, attributeFilter: ['class'] })
  darkPortals.set(node, observer)
}

const release = (node: Node) => {
  darkPortals.get(node)?.disconnect()
  darkPortals.delete(node)
}

new MutationObserver(records => {
  for (const record of records) {
    record.removedNodes.forEach(release)
    if (lastPane !== 'dark') continue
    record.addedNodes.forEach(node => {
      if (isPortal(node)) keepDark(node)
    })
  }
}).observe(document.body, { childList: true })

type Layout = 'centered' | 'padded' | 'fullscreen'

const paneLayout: Record<Layout, string> = {
  centered: 'flex items-center justify-center-safe px-8 pt-12 pb-10',
  padded: 'px-8 pt-12 pb-10',
  fullscreen: 'pt-10'
}

const labelPosition: Record<Layout, string> = {
  centered: 'top-4 left-8',
  padded: 'top-4 left-8',
  fullscreen: 'top-3 left-4'
}

const Pane = ({
  mode,
  layout,
  children
}: {
  mode: Mode
  layout: Layout
  children: React.ReactNode
}) => (
  <section
    data-color-pane={mode}
    aria-label={`${mode === 'dark' ? 'Dark' : 'Light'} mode`}
    className={`relative min-w-0 overflow-x-auto ${paneLayout[layout]} ${
      mode === 'dark'
        ? 'dark bg-background-dark text-foreground-dark'
        : 'bg-background text-foreground'
    }`}
  >
    <p
      aria-hidden
      className={`absolute ${labelPosition[layout]} text-xs text-foreground-muted dark:text-foreground-muted-dark`}
    >
      {mode === 'dark' ? 'Dark' : 'Light'}
    </p>
    {children}
  </section>
)

const SideBySide = ({
  layout,
  children
}: {
  layout: Layout
  children: React.ReactNode
}) => {
  const grid = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(0)
  const [needed, setNeeded] = React.useState(0)

  React.useLayoutEffect(() => {
    const el = grid.current
    if (!el) return
    const measure = () => {
      setWidth(el.clientWidth)
      for (const pane of el.children) {
        if (pane.scrollWidth > pane.clientWidth + 1) {
          setNeeded(current => Math.max(current, pane.scrollWidth))
        }
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const stacked = needed > 0 && width < needed * 2

  return (
    <div
      ref={grid}
      data-color-grid
      className={`grid min-h-full w-full gap-px bg-border ${
        stacked
          ? 'grid-cols-1'
          : 'grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))]'
      }`}
    >
      <Pane mode="light" layout={layout}>
        {children}
      </Pane>
      <Pane mode="dark" layout={layout}>
        {children}
      </Pane>
    </div>
  )
}

export const withColorScheme: Decorator = (Story, context) => {
  const isDark = useDarkMode()
  toggleMode = isDark ? 'dark' : 'light'

  const sideBySide = context.globals.theme !== 'single' && !isTestRunner()

  React.useLayoutEffect(() => {
    setBodyOverride(sideBySide ? 'light' : null)
    return () => setBodyOverride(null)
  }, [sideBySide, isDark])

  if (!sideBySide) return <Story />

  const layout = (context.parameters.layout ?? 'padded') as Layout

  return (
    <SideBySide layout={layout}>
      <Story />
    </SideBySide>
  )
}
