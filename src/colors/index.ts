import { colors } from './base'
import { foreground } from './foreground'
import { background } from './background'
import { button } from './button'
import { accent } from './accent'
import { border } from './border'
import { feedback } from './feedback'

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
