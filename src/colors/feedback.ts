import { colors } from './base'

/**
 * Feedback colours named for the role they play rather than the hue they wear,
 * so a control reaches for them by what it means, not what it looks like.
 *
 * `success`, `warning`, `danger` and `error` map to the green, yellow, orange
 * and red ramps respectively. Renaming them spells the utility the variant asks
 * for (`border-feedback-success`, `text-feedback-error`) instead of one that
 * only describes the swatch under it.
 */
export const feedback = {
  success: {
    DEFAULT: colors.green['500'],
    dark: colors.green['300']
  },
  warning: {
    DEFAULT: colors.yellow['300'],
    dark: colors.yellow['300']
  },
  danger: {
    DEFAULT: colors.orange['400'],
    dark: colors.orange['300']
  },
  error: {
    DEFAULT: colors.red['700'],
    dark: colors.red['300']
  }
}
