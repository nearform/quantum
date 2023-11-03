export const colors = {
  grey: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2A37',
    900: '#111928'
  },
  blue: {
    50: '#F5FAFF',
    100: '#E1EFFE',
    200: '#C3DDFD',
    300: '#A4CAFE',
    400: '#76A9FA',
    500: '#3F83F8',
    600: '#2165E3',
    700: '#1A56DB',
    800: '#1E429F',
    900: '#233876'
  },
  'inverted-blue': {
    900: '#F5FAFF',
    800: '#E1EFFE',
    700: '#C3DDFD',
    600: '#A4CAFE',
    500: '#76A9FA',
    400: '#3F83F8',
    300: '#2165E3',
    200: '#1A56DB',
    100: '#1E429F',
    50: '#233876'
  },
  red: {
    50: '#FDF2F2',
    100: '#FDE8E8',
    200: '#FBD5D5',
    300: '#F8B4B4',
    400: '#F98080',
    500: '#F05252',
    600: '#E02424',
    700: '#C81E1E',
    800: '#9B1C1C',
    900: '#771D1D'
  },
  orange: {
    50: '#FFF8F1',
    100: '#FEECDC',
    200: '#FCD9BD',
    300: '#FDBA8C',
    400: '#FF8A4C',
    500: '#FF5A1F',
    600: '#D03801',
    700: '#B43403',
    800: '#8A2C0D',
    900: '#771D1D'
  },
  yellow: {
    50: '#FDFDEA',
    100: '#FDF6B2',
    200: '#FCE96A',
    300: '#FACA15',
    400: '#E3A008',
    500: '#C27803',
    600: '#9F580A',
    700: '#8E4B10',
    800: '#723B13',
    900: '#633112'
  },
  green: {
    50: '#F3FAF7',
    100: '#DEF7EC',
    200: '#BCF0DA',
    300: '#84E1BC',
    400: '#31C48D',
    500: '#0E9F6E',
    600: '#057A55',
    700: '#046C4E',
    800: '#03543F',
    900: '#014737'
  },
  teal: {
    50: '#EDFAFA',
    100: '#D5F5F6',
    200: '#AFECEF',
    300: '#7EDCE2',
    400: '#16BDCA',
    500: '#0694A2',
    600: '#047481',
    700: '#036672',
    800: '#05505C',
    900: '#014451'
  },
  indigo: {
    50: '#F0F5FF',
    100: '#E5EDFF',
    200: '#CDDBFE',
    300: '#B4C6FC',
    400: '#8DA2FB',
    500: '#6875F5',
    600: '#5850EC',
    700: '#5145CD',
    800: '#42389D',
    900: '#362F78'
  },
  purple: {
    50: '#F6F5FF',
    100: '#EDEBFE',
    200: '#DCD7FE',
    300: '#CABFFD',
    400: '#AC94FA',
    500: '#9061F9',
    600: '#7E3AF2',
    700: '#6C2BD9',
    800: '#5521B5',
    900: '#4A1D96'
  },
  pink: {
    50: '#FFF6F9',
    100: '#FFF1F5',
    200: '#FFE8EE',
    300: '#FFD9E3',
    400: '#FFBFD0',
    500: '#FF9DB7',
    600: '#FB7A9C',
    700: '#D95477',
    800: '#A02042',
    900: '#731837'
  },
  'inverted-pink': {
    900: '#FFF6F9',
    800: '#FFF1F5',
    700: '#FFE8EE',
    600: '#FFD9E3',
    500: '#FFBFD0',
    400: '#FF9DB7',
    300: '#FB7A9C',
    200: '#D95477',
    100: '#A02042',
    50: '#731837'
  }
}

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

  foreground: {
    DEFAULT: colors.grey['900'],
    dark: '#FFF',
    muted: {
      DEFAULT: colors.grey['900'],
      dark: colors.grey['300']
    },
    subtle: {
      DEFAULT: colors.grey['400'],
      dark: colors.grey['500']
    },
    inverse: {
      DEFAULT: '#FFF',
      dark: colors.grey['900']
    }
  },

  background: {
    DEFAULT: '#FFF',
    dark: colors.grey['900'],
    alt: {
      DEFAULT: colors.grey['50'],
      dark: colors.grey['700']
    },
    subtle: {
      DEFAULT: colors.purple['50'],
      dark: colors.grey['800']
    },
    inverse: {
      DEFAULT: colors.grey['900'],
      dark: '#FFF'
    }
  },

  accent: {
    DEFAULT: colors.blue['700'],
    dark: '#FFF',
    alt: {
      DEFAULT: colors.grey['300'],
      dark: colors.grey['600']
    },
    hover: {
      DEFAULT: colors.grey['900'],
      dark: colors.grey['300']
    },
    focus: {
      DEFAULT: '#FFF',
      dark: colors.grey['100']
    }
  },

  border: {
    DEFAULT: colors.grey['300'],
    dark: colors.grey['500'],
    hover: {
      DEFAULT: colors.grey['400'],
      dark: colors.grey['300']
    },
    focus: {
      DEFAULT: colors.grey['500'],
      dark: colors.grey['400']
    },
    subtle: {
      DEFAULT: colors.grey['200'],
      dark: colors.grey['700']
    }
  },
  feedback: {
    green: colors.green['400'],
    yellow: colors.yellow['300'],
    orange: colors.orange['400'],
    red: colors.red['600']
  },
  button: {
    primary: {
      DEFAULT: colors.blue['700'], //replace active with this
      dark: '#FFF',
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
  },
  white: {
    DEFAULT: '#fff'
  },
  black: {
    DEFAULT: '#000'
  },
  ...colors
}
