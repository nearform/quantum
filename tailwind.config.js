/** @type {import('tailwindcss').Config} */
import colors from './src/colors'
import defaultTheme from 'tailwindcss/defaultTheme'

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: colors,
    boxShadow: {
      sm: '0px 1px 2px 0px',
      DEFAULT: '0px 1px 2px -1px',
      md: '0px 2px 4px -2px',
      lg: '0px 4px 6px 0px',
      xl: '0 20px 25px -5px',
      '2xl': '0 25px 50px -12px',
      none: '0 0'
    },
    extend: {
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans]
      },
      strokeWidth: {
        3: '4px',
        4: '6px'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
    darkMode: 'class',
    plugins: []
  }
}
