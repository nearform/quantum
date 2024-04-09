import * as path from 'path';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: ['../public/'],
  docs: {
    autodocs: 'tag'
  },
  async viteFinal(config) {
    if (config && config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.join(__dirname, '../src')
      };
    }

    return config;
  }
};
export default config;
