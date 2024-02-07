import { colors } from './base'
import { accent } from './accent'
import { background } from './background'
import { border } from './border'
import { feedback } from './feedback'

export const button = {
  primary: {
    DEFAULT: accent.DEFAULT,
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
    },
    selected: {
      DEFAILT: colors.grey['100'],
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
      DEFAULT: background.alt.DEFAULT,
      dark: background.alt.dark
    },
    disabled: {
      DEFAULT: background.subtle.DEFAULT,
      dark: background.subtle.dark
    },
    border: {
      DEFAULT: border.DEFAULT,
      dark: border.dark,
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
        DEFAILT: colors.grey['100'],
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
      DEFAILT: colors.grey['100'],
      dark: background.subtle.dark
    }
  },
  success: {
    DEFAULT: feedback.green,
    hover: {
      DEFAULT: colors.green['600']
    },
    focus: {
      DEFAULT: colors.green['700']
    },
    disabled: {
      DEFAULT: colors.grey['50']
    },
    selected: {
      DEFAILT: colors.grey['100'],
      dark: background.subtle.dark
    }
  },
  danger: {
    DEFAULT: feedback.red,
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
      DEFAILT: colors.grey['100'],
      dark: background.subtle.dark
    }
  }
}
