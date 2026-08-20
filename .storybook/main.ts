import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  staticDirs: ['../public/'],
  async viteFinal(config) {
    // Vite 8 leaves `resolve` undefined here, so the alias has to be created
    // rather than merged into an existing object.
    const existing = config.resolve?.alias
    const alias = { '@': join(__dirname, '../src') }
    config.resolve = {
      ...config.resolve,
      // `alias` accepts an object or an array of {find, replacement}; preserve
      // whichever form arrived instead of dropping it. Ours goes in last in the
      // array form and first in the object form, so an alias the caller already
      // registered for `@` keeps precedence under either shape.
      alias: Array.isArray(existing)
        ? [...existing, { find: '@', replacement: alias['@'] }]
        : { ...alias, ...existing }
    }

    return config
  }
}

export default config
