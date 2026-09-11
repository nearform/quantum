import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierRecommended from 'eslint-plugin-prettier/recommended'
import storybook from 'eslint-plugin-storybook'
import globals from 'globals'

export default [
  {
    ignores: ['dist/**', 'postcss.config.js', '.storybook/tailwind.config.js']
  },
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021
      }
    }
  },
  prettierRecommended,
  ...storybook.configs['flat/recommended']
]
