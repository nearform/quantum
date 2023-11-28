/** @type {import('tailwindcss').Config} */
import colors from '../src/colors'
import { Config } from 'tailwindcss'
export const first = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  plugin: [],
  theme: {
    colors: colors,
    boxShadow: {
      sm: '0px 1px 2px 0px',
      DEFAULT: '0px 1px 2px -1px',
      md: '0px 2px 4px -2px',
      lg: '0px 4px 6px 0px',
      xl: '0px 20px 25px -5px',
      '2xl': '0px 25px 50px -12px',
      blue: '0px 0px 0px 4px rgb(118,169,250)',
      red: '0px 0px 0px 4px rgb(249,128,128)',
      green: '0px 0px 0px 4px rgb(49,196,141,1)',
      none: '0px 0px'
    },
    strokeWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '4px',
      4: '6px'
    }
  }
} satisfies Config
