import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner'
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright'

const WCAG_22_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

type Mode = 'light' | 'dark'

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page)
  },
  async postVisit(page, context) {
    const storyContext = await getStoryContext(page, context)

    if (storyContext.parameters?.a11y?.disable) {
      return
    }

    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules
    })

    await page.addStyleTag({
      content: '*, *::before, *::after { transition: none !important; }'
    })

    const modes: Mode[] = ['light', 'dark']

    for (const mode of modes) {
      await page.evaluate(
        isDark => document.body.classList.toggle('dark', isDark),
        mode === 'dark'
      )

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
}

export default config
