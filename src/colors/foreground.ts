import { colors } from './base'

export const foreground = {
  DEFAULT: colors.grey['900'],
  dark: '#FFF',
  // One step darker than they were: grey-500 on `background-alt` reached only
  // 4.39:1 and grey-400 on white only 2.53:1, both short of the 4.5:1 that
  // WCAG 1.4.3 asks of body text. grey-600 and grey-500 clear it at 6.87:1
  // and 4.83:1 while keeping the same place in the ramp.
  muted: {
    DEFAULT: colors.grey['600'],
    dark: colors.grey['300']
  },
  subtle: {
    DEFAULT: colors.grey['500'],
    dark: colors.grey['500']
  },
  inverse: {
    DEFAULT: '#FFF',
    dark: colors.grey['900']
  }
}
