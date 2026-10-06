import { colors } from './base.ts'
import { foreground } from './foreground.ts'
import { background } from './background.ts'
import { button } from './button.ts'
import { accent } from './accent.ts'
import { border } from './border.ts'
import { feedback } from './feedback.ts'

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
