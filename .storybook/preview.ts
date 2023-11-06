import { DocsContainer } from './DocsContainer'
import { themes } from '@storybook/theming'

import './global.css'

export const parameters = {
  backgrounds: { disable: true },
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal }
  },
  docs: {
    container: DocsContainer
  }
}
