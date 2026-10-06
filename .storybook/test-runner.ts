import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner'
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright'
import type { Page } from 'playwright'
declare const expect: (actual: Buffer) => {
  toMatchImageSnapshot(options: Record<string, unknown>): void
}

const WCAG_22_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

type Mode = 'light' | 'dark'

type VisualParameters = {
  disable?: boolean
  open?: 'click' | 'hover'
}

const OPEN_TRIGGERS = {
  click: '#storybook-root [aria-expanded="false"]',
  hover: '#storybook-root [data-state="closed"]'
}

const OVERLAYS =
  '[data-radix-popper-content-wrapper], [role="dialog"], [role="listbox"]'

const modes: Mode[] = ['light', 'dark']

const setMode = (page: Page, mode: Mode) =>
  page.evaluate(
    isDark => document.body.classList.toggle('dark', isDark),
    mode === 'dark'
  )

const openOverlay = async (page: Page, action: 'click' | 'hover') => {
  const trigger = page.locator(OPEN_TRIGGERS[action]).first()
  await (action === 'click' ? trigger.click() : trigger.hover())
  await page.locator(OVERLAYS).first().waitFor({ state: 'visible' })
}

const captureArea = (page: Page) =>
  page.evaluate(selector => {
    const visible = (rect: DOMRect | undefined): rect is DOMRect =>
      !!rect && rect.width > 0 && rect.height > 0
    const root = document.querySelector('#storybook-root')
    const overlays = [...document.querySelectorAll(selector)]
      .map(element => element.getBoundingClientRect())
      .filter(visible)
      .map(r => new DOMRect(r.x - 8, r.y - 8, r.width + 16, r.height + 16))
    const rects = [root?.getBoundingClientRect(), ...overlays].filter(visible)
    const doc = document.documentElement
    const x = Math.floor(
      Math.max(0, Math.min(...rects.map(r => r.left + scrollX)))
    )
    const y = Math.floor(
      Math.max(0, Math.min(...rects.map(r => r.top + scrollY)))
    )
    const right = Math.ceil(
      Math.min(doc.scrollWidth, Math.max(...rects.map(r => r.right + scrollX)))
    )
    const bottom = Math.ceil(
      Math.min(
        doc.scrollHeight,
        Math.max(...rects.map(r => r.bottom + scrollY))
      )
    )
    return { x, y, width: right - x, height: bottom - y }
  }, OVERLAYS)

const settle = (page: Page) =>
  page.evaluate(async () => {
    await document.fonts.ready
    for (let frame = 0; frame < 2; frame++) {
      await new Promise(resolve => requestAnimationFrame(resolve))
    }
  })

const capture = async (page: Page) => {
  await settle(page)
  return page.screenshot({ clip: await captureArea(page), fullPage: true })
}

const stableScreenshot = async (page: Page, attempts = 10) => {
  let previous = await capture(page)
  for (let attempt = 0; attempt < attempts; attempt++) {
    await page.waitForTimeout(100)
    const next = await capture(page)
    if (next.equals(previous)) return next
    previous = next
  }
  throw new Error(
    `Story kept changing across ${attempts} screenshots; set parameters.visual.disable if it animates.`
  )
}

const runVisualTests = process.env.VISUAL_TEST === 'true'

const recordingBaseline = process.env.VISUAL_BASELINE === 'true'

const MAX_DIFF_PIXELS = 4

const FIXED_DATE = new Date('2024-06-12T12:00:00Z')

if (runVisualTests && process.env.QUANTUM_VISUAL_CONTAINER !== '1') {
  throw new Error(
    'Visual tests only run inside the Playwright Docker image, so screenshots match CI. ' +
      'Use `npm run test-storybook:visual` or `npm run test-storybook:visual:update`.'
  )
}

const config: TestRunnerConfig = {
  async preVisit(page) {
    if (runVisualTests) await page.clock.setFixedTime(FIXED_DATE)
    await injectAxe(page)
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context)
    const visual: VisualParameters = storyContext.parameters?.visual ?? {}

    await page.addStyleTag({
      content:
        '*, *::before, *::after { transition: none !important; animation: none !important; }'
    })

    if (!recordingBaseline && !storyContext.parameters?.a11y?.disable) {
      await configureAxe(page, {
        rules: storyContext.parameters?.a11y?.config?.rules
      })

      for (const mode of modes) {
        await setMode(page, mode)
        try {
          await checkA11y(page, '#storybook-root', {
            detailedReport: true,
            detailedReportOptions: { html: true },
            axeOptions: {
              runOnly: { type: 'tag', values: WCAG_22_AA_TAGS }
            }
          })
        } catch (error) {
          if (error instanceof Error) {
            error.message = `Accessibility violations in ${mode} mode:\n${error.message}`
          }
          throw error
        }
      }
    }

    if (!runVisualTests || visual.disable) return

    if (visual.open) await openOverlay(page, visual.open)

    for (const mode of modes) {
      await setMode(page, mode)
      const screenshot = await stableScreenshot(page)

      expect(screenshot).toMatchImageSnapshot({
        customSnapshotIdentifier: `${context.id}-${mode}`,
        customSnapshotsDir: 'visual-regression/baseline',
        customDiffDir: 'visual-regression/diff',
        failureThreshold: MAX_DIFF_PIXELS,
        failureThresholdType: 'pixel'
      })
    }
  }
}

export default config
