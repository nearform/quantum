import { create } from '@storybook/theming/create';
import colors from '../src/colors';

export default create({
  base: 'light',
  brandTitle: 'Quantum',
  brandImage: '/quantum-logo-light.png',

  fontBase: 'Inter',

  appBg: colors.white.DEFAULT,

  colorPrimary: '#000E38',
  colorSecondary: '#0C3D60',

  // UI
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#D1D5DB',
  appBorderRadius: 4,

  // Text colors
  textColor: '#111928',
  textInverseColor: '#111928',

  // Toolbar default and active colors
  barTextColor: '#fff',
  barHoverColor: '#7EDCE2',
  barSelectedColor: '#7EDCE2',
  barBg: '#000E38',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#97A1B8',
  inputTextColor: '#111928',
  inputBorderRadius: 2
});
