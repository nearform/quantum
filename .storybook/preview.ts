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
          { value: 'auto', title: 'Follow toolbar theme', icon: 'mirror' },
          { value: 'dark', title: 'Always dark', icon: 'moon' },
          {
            value: 'side-by-side',
            title: 'Light and dark side by side',
            icon: 'sidebyside'
          }
        ],
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'auto'
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
