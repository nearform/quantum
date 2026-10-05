import './global.css'
import { Preview } from '@storybook/react-vite'
import { withColorScheme } from './colorScheme'
import { DarkModeDocsContainer } from './DarkModeDocsContainer'
import theme, { darkTheme } from './theme'

const preview: Preview = {
  decorators: [withColorScheme],
  globalTypes: {
    theme: {
      description: 'Preview colour scheme',
      toolbar: {
        title: 'Preview',
        icon: 'contrast',
        items: [
          {
            value: 'side-by-side',
            title: 'Light and dark side by side',
            icon: 'sidebyside'
          },
          {
            value: 'single',
            title: 'Single, following the toolbar theme',
            icon: 'mirror'
          }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'side-by-side'
  },
  parameters: {
    backgrounds: { disable: true },
    darkMode: {
      current: 'light',
      light: theme,
      dark: darkTheme
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
