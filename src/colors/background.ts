import { colors } from './base.ts'

export const background = {
  DEFAULT: '#FFF',
  dark: '#000',
  alt: {
    DEFAULT: colors.grey['100'],
    dark: colors.grey['700']
  },
  subtle: {
    DEFAULT: colors.grey['50'],
    dark: colors.grey['800']
  },
  /**
   * The resting fill of a container that sits on the page: a card, a popover,
   * a table body, a dialog panel.
   *
   * It exists because `background` cannot play that role in both modes. In
   * light the page is `background-alt` and `background` is a step off it, so a
   * surface painted `background` reads as raised (1.10:1). In dark the page is
   * `background` itself, so the same class paints the surface the colour of
   * the page it sits on - 1.00:1, a container that is only a container because
   * of its border.
   *
   * So the light value is `background`'s, unchanged, and the dark value is one
   * step up from the page. That keeps the step `subtle` adds for a header or a
   * zebra stripe (1.21:1 above this, against light's 1.05:1) and leaves `alt`
   * free for the selected row, which would otherwise collide with the stripes.
   */
  surface: {
    DEFAULT: '#FFF',
    dark: colors.grey['900']
  },
  inverse: {
    DEFAULT: colors.grey['900'],
    dark: '#FFF'
  }
}
