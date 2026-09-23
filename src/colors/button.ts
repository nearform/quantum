import { colors } from './base'
import { accent } from './accent'
import { background } from './background'
import { border } from './border'
import { feedback } from './feedback'

export const button = {
  primary: {
    DEFAULT: colors.brandGreen['100'],
    dark: colors.brandGreen['100'],
    hover: {
      DEFAULT: colors.brandPurple['10'],
      dark: colors.brandPurple['10']
    },
    focus: {
      DEFAULT: accent.focus.DEFAULT,
      dark: accent.focus.dark
    },
    disabled: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },
    selected: {
      DEFAULT: colors.grey['100'],
      dark: background.subtle.dark
    }
  },
  secondary: {
    DEFAULT: '#FFF',
    dark: colors.grey['900'],
    hover: {
      DEFAULT: colors.brandMidnight['10'],
      dark: background.subtle.dark
    },
    focus: {
      DEFAULT: background.alt.DEFAULT,
      dark: background.alt.dark
    },
    disabled: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },
    border: {
      DEFAULT: colors.brandMidnight['100'],
      dark: '#FFFFFF',
      hover: {
        DEFAULT: border.hover.DEFAULT,
        dark: border.hover.dark
      },
      focus: {
        DEFAULT: border.DEFAULT,
        dark: border.focus.dark
      },
      disabled: {
        DEFAULT: border.subtle.DEFAULT,
        dark: border.subtle.dark
      },
      selected: {
        DEFAULT: colors.grey['100'],
        dark: background.subtle.dark
      }
    }
  },
  tertiary: {
    hover: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },
    focus: {
      DEFAULT: background.DEFAULT,
      dark: colors.blue['900']
    },
    selected: {
      DEFAULT: colors.grey['100'],
      dark: background.subtle.dark
    }
  },
  success: {
    DEFAULT: feedback.success,
    hover: {
      DEFAULT: colors.green['700']
    },
    focus: {
      DEFAULT: colors.green['800']
    },
    disabled: {
      DEFAULT: colors.grey['50']
    },
    selected: {
      DEFAULT: colors.grey['100'],
      dark: background.subtle.dark
    }
  },
  danger: {
    DEFAULT: feedback.danger,
    hover: {
      DEFAULT: colors.red['700']
    },
    focus: {
      DEFAULT: colors.red['800']
    },
    disabled: {
      DEFAULT: colors.grey['50']
    },
    selected: {
      DEFAULT: colors.grey['100'],
      dark: background.subtle.dark
    }
  }
}
