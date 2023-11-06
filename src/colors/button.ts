import { colors } from './base'
import { accent } from './accent'
import { background } from './background'
import { border } from './border'
import { feedback } from './feedback'
import { inverted } from './base'
export const button = {
  primary: {
    DEFAULT: colors.blue['700'],
    dark: '#FFF',
    hover: {
      DEFAULT: accent.hover.DEFAULT,
      dark: accent.hover.dark
    },
    focus: {
      DEFAULT: accent.focus.DEFAULT,
      dark: accent.focus.dark
    },
    disabled: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    }
  },
  secondary: {
    DEFAULT: '#FFF',
    dark: '#000',
    hover: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },

    focus: {
      DEFAULT: colors.blue['50'],
      dark: inverted.blue['50']
    },

    disabled: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },

    border: {
      DEFAULT: border.DEFAULT,
      dark: border.dark,
      hover: {
        DEFAULT: background.subtle.DEFAULT,
        dark: background.subtle.dark
      },
      focus: {
        DEFAULT: border.focus.DEFAULT,
        dark: border.focus.dark
      },
      disabled: {
        DEFAULT: border.subtle.DEFAULT,
        dark: border.subtle.dark
      }
    }
  },
  tertiary: {
    hover: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },
    focus: {
      DEFAULT: colors.blue['50'],
      dark: inverted.blue['50']
    }
  },
  success: {
    DEFAULT: feedback.green,
    hover: {
      DEFAULT: colors.green['500']
    },
    focus: {
      DEFAULT: colors.green['600']
    }
  },
  danger: {
    DEFAULT: feedback.red,
    hover: {
      DEFAULT: colors.red['700']
    },
    focus: {
      DEFAULT: colors.red['800']
    }
  }
}
