import { colors } from './base'

export const feedback = {
  green: colors.green['500'],
  yellow: colors.yellow['300'],
  orange: colors.orange['400'],
  // red-600 on the red-50 error field reached 4.31:1, just short of the 4.5:1
  // WCAG 1.4.3 asks of body text; red-700 clears it at 5.23:1.
  red: colors.red['700']
}
