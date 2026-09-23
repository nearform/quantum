import defaultTheme from 'tailwindcss/defaultTheme'
import animations from './animations'
import colors from './colors'

/**
 * The Quantum design tokens, in Tailwind's JS theme shape.
 *
 * This is the source of truth for the token *values*. Two consumers read it:
 *
 * - `scripts/theme-css.ts` renders it into the native v4 `@theme` block committed at
 *   `src/quantum.css`, which is what `src/global.css` and `.storybook/global.css`
 *   compile against. `__tests__/theme-css.test.ts` fails if the committed CSS
 *   drifts from this object; `npm run build:theme` regenerates it.
 * - `src/tailwind-plugin.ts` hands it to consumers whose Tailwind build loads a
 *   JS plugin, where there is no CSS entrypoint of ours to carry an `@theme`.
 *
 * It cannot be CSS-only: `src/colors` is re-exported from the package root, so
 * the token objects are public API regardless of what the stylesheet does.
 *
 * `colors`, `boxShadow`, `fontFamily` and `strokeWidth` sit outside `extend`, so
 * they *replace* Tailwind's defaults rather than merging with them. `@theme`
 * merges by default, which is why `scripts/theme-css.ts` emits a `--<namespace>-*:
 * initial` reset for each of these four before listing the tokens.
 */
export default {
  colors,
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
    brandGreen: '0px 0px 0px 4px #00E5A4',
    brandGreen10: '0px 0px 0px 4px #e5fcf5',
    none: '0px 0px'
  },
  fontFamily: {
    sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
    serif: ["'Bitter'", 'Georgia', 'serif']
  },
  strokeWidth: {
    0: '0px',
    1: '1px',
    2: '2px',
    3: '4px',
    4: '6px'
  },
  extend: {
    fontSize: {
      display: 'clamp(2.5rem, 5vw, 3.5rem)',
      title: '2rem',
      h24: '1.5rem',
      h20: '1.25rem',
      h16: '1.0625rem',
      lede: '1.125rem',
      label: '0.8125rem',
      caption: '0.75rem'
    },
    borderRadius: {
      brandXs: '6px',
      brandSm: '8px',
      brandMd: '10px',
      brandLg: '12px',
      brandPill: '999px',
      brandControl: '8px'
    },
    transitionTimingFunction: {
      brandOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
      brandSoft: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)'
    },
    transitionDuration: {
      brandFast: '150ms',
      brandBase: '200ms',
      brandSlow: '400ms'
    },
    keyframes: animations.keyframes,
    animation: animations.animation
  }
}
