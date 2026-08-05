import quantumConfig from '../tailwind.config'
import plugin from 'tailwindcss/plugin'

/**
 * Supplies the Quantum design tokens (colors, shadows, fonts, stroke widths and
 * animations) to a consuming Tailwind build.
 *
 * Tailwind v4 replaced the `content` array with source detection, so this plugin
 * no longer registers Quantum's own files for scanning. Consumers must point at
 * the package themselves — see the "Tailwind setup" section of the README.
 */
export default plugin(() => {}, {
  theme: {
    ...quantumConfig.theme
  }
})
