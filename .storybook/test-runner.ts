import { getStoryContext, type TestRunnerConfig } from '@storybook/test-runner'
import { checkA11y, configureAxe, injectAxe } from 'axe-playwright'

const WCAG_22_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

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

    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: { html: true },
      axeOptions: {
        runOnly: { type: 'tag', values: WCAG_22_AA_TAGS }
      }
    })
  }
}

export default config
