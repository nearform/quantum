import './global.css'
import { Preview } from '@storybook/react-vite'
import { DarkModeDocsContainer } from './DarkModeDocsContainer'
import theme, { darkTheme } from './theme'

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    darkMode: {
      current: 'light',
      light: theme,
      dark: darkTheme,
      stylePreview: true
    },
    docs: {
      container: DarkModeDocsContainer,
      toc: true
    },
    options: {
      storySort: {
        order: ['Get Started']
      }
    }
  }
}

export default preview
