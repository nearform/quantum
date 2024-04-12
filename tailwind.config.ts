/** @type {import('tailwindcss').Config} */
import colors from './src/colors';
import defaultTheme from 'tailwindcss/defaultTheme';
import animations from './src/animations';

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  plugins: [],
  theme: {
    colors: colors,
    boxShadow: {
      sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
      DEFAULT: '0px 1px 2px -1px rgba(0, 0, 0, 0.05)',
      md: '0px 2px 4px -2px rgba(0, 0, 0, 0.05)',
      lg: '0px 4px 6px 0px rgba(0, 0, 0, 0.05)',
      xl: '0px 20px 25px -5px rgba(0, 0, 0, 0.05)',
      '2xl': '0px 25px 50px -12px rgba(0, 0, 0, 0.05)',
      blue: '0px 0px 0px 4px rgb(118,169,250)',
      red: '0px 0px 0px 4px rgb(249,128,128)',
      green: '0px 0px 0px 4px rgb(49,196,141,1)',
      brandGreen: '0px 0px 0px 4px #03e5a4',
      brandGreen10: '0px 0px 0px 4px #e5fcf5',
      none: '0px 0px'
    },
    fontFamily: {
      sans: ["'Inter'", ...defaultTheme.fontFamily.sans]
    },
    strokeWidth: {
      0: '0px',
      1: '1px',
      2: '2px',
      3: '4px',
      4: '6px'
    },
    extend: {
      keyframes: animations.keyframes,
      animation: animations.animation
    }
  }
};
