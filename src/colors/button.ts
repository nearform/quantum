import { colors } from './base'
export const button = {
  primary: {
    DEFAULT: colors.blue['700'], //replace active with this
    dark: '#FFF',
    active: colors.blue['700'],
    hover: {
      DEFAULT: colors.grey['900'],
      dark: colors.grey['300']
    },
    focus: {
      DEFAULT: '#000',
      dark: colors.grey['300']
    },
    disabled: {
      DEFAULT: colors.purple['50'],
      dark: colors.grey['800']
    }
  },
  secondary: {
    DEFAULT: '#FFF',
    dark: '#000',
    hover: {
      DEFAULT: '',
      dark: ''
    },

    focus: {
      DEFAULT: '',
      dark: ''
    },

    disabled: {
      DEFAULT: '',
      dark: ''
    },

    border: {
      DEFAULT: '',
      dark: '',
      hover: {
        DEFAULT: '',
        dark: ''
      },
      focus: {
        DEFAULT: '',
        dark: ''
      },
      disabled: {
        DEFAULT: '',
        dark: ''
      }
    }
  },
  tertiary: {
    hover: {
      DEFAULT: '',
      dark: ''
    },
    focus: {
      DEFAULT: '',
      dark: ''
    }
  },
  success: {
    DEFAULT: '',
    dark: '',
    hover: {
      DEFAULT: '',
      dark: ''
    },
    focus: {
      DEFAULT: '',
      dark: ''
    }
  },
  danger: {
    DEFAULT: '',
    dark: '',
    hover: {
      DEFAULT: '',
      dark: ''
    },
    focus: {
      DEFAULT: '',
      dark: ''
    }
  },
  DEFAULT: colors.blue['700'], //replace active with this
  'default-dark': '#FFF',
  active: colors.blue['700'],
  hover: colors.grey['900'],
  'hover-dark': colors.grey['300'],
  focus: '#000',
  'focus-dark': colors.grey['100'],
  disabled: colors.purple['50']
}
