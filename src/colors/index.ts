import { colors } from './base.js'
import { foreground } from './foreground.js'
import { background } from './background.js'
import { button } from './button.js'
import { accent } from './accent.js'
import { border } from './border.js'
import { feedback } from './feedback.js'

export default {
  transparent: 'transparent',
  current: 'currentColor',
  primary: colors.brandMidnight,
  secondary: colors.brandGreen,
  foreground: foreground,
  background: background,
  accent: accent,
  border: border,
  feedback: feedback,
  button: button,
  white: {
    DEFAULT: '#fff'
  },
  black: {
    DEFAULT: '#000'
  },
  ...colors
}
