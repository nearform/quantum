import './global.css';
import { Preview } from '@storybook/react';
import theme from './theme';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    docs: {
      theme
    },
    options: {
      storySort: {
        order: ['Get Started']
      }
    }
  }
};

export default preview;
