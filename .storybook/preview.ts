import type { Preview } from '@storybook/react'
import '../stories/global.css'

const preview: Preview = {
  globalTypes: {
    darkMode: {
      defaultValue: false
    }
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
