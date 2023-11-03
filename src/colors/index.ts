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
  primary: {
    DEFAULT: colors.blue,
    dark: colors['inverted-blue']
  },
  secondary: {
    DEFAULT: colors.pink,
    dark: colors['inverted-pink']
  },

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
