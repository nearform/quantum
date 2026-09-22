import plugin from 'tailwindcss/plugin'
import baseStyles from './tailwind-base'
import quantumTheme from './theme'

/**
 * Supplies the Quantum design tokens (colors, shadows, fonts, stroke widths and
 * animations) to a consuming Tailwind build.
 *
 * Quantum's own stylesheets get the same tokens from the native `@theme` block
 * in `src/quantum.css`, but a consumer on any of the README's Tailwind routes
 * has no entrypoint of ours to import — they load this plugin from their own
 * CSS or JS config — so the tokens have to be reachable as a JS object too.
 * Both are rendered from `src/theme.ts`, and `__tests__/theme-css.test.ts`
 * fails if they disagree.
 *
 * Tailwind v4 replaced the `content` array with source detection, so this plugin
 * does not register Quantum's own files for scanning. Consumers must point at
 * the package themselves — see the "Tailwind setup" section of the README.
 *
 * The base styles are registered here for the same reason: a consumer using
 * `@plugin` or `plugins: [quantumPlugin]` never imports `dist/global.css`, so
 * the `@layer base` block in `src/quantum.css` would not reach them. `addBase`
 * is what puts them in the `base` layer, below `utilities`.
 */
export default plugin(
  ({ addBase }) => {
    addBase(baseStyles)
  },
  {
    theme: {
      ...quantumTheme
    }
  }
)
