import type { Preview } from '@storybook/react'
import { themes } from '@storybook/theming'
import '../stories/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    darkMode: {
      stylePreview: true,
      dark: { ...themes.dark },
      light: { ...themes.normal },
    },
  },
}



export default preview
