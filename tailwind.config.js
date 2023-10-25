/** @type {import('tailwindcss').Config} */
import colors from './src/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    colors: colors,
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
      },
      darkMode: 'class',
      plugins: []
    }
  }
}
