import quantumConfig from '../tailwind.config'
import baseStyles from './tailwind-base'
import plugin from 'tailwindcss/plugin'

/**
 * Supplies the Quantum design tokens (colors, shadows, fonts, stroke widths and
 * animations) to a consuming Tailwind build.
 *
 * Tailwind v4 replaced the `content` array with source detection, so this plugin
 * no longer registers Quantum's own files for scanning. Consumers must point at
 * the package themselves — see the "Tailwind setup" section of the README.
 *
 * The base styles are registered here rather than in `src/global.css` because
 * this is the only entrypoint the Tailwind routes load: a consumer using
 * `@plugin` or `plugins: [quantumPlugin]` never imports `dist/global.css`.
 * `tailwind.config.ts` registers the same object for the routes that do.
 */
export default plugin(
  ({ addBase }) => {
    addBase(baseStyles)
  },
  {
    theme: {
      ...quantumConfig.theme
    }
  }
)
