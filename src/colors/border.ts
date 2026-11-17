import { colors } from './base.ts'

export const border = {
  DEFAULT: colors.grey['500'],
  /**
   * The dark-mode edge of a control: Checkbox, Radio, and Input, Textarea and
   * Select's outline. WCAG 1.4.11 wants 3:1 for it, and `brandMidnight-50`
   * managed 2.90:1 on `background-surface-dark`. `grey-500` clears every
   * surface a control sits on (3.01:1 on `background-subtle-dark` is the
   * floor), and keeps the white tick that checked Checkbox and Radio draw on
   * this same token at 4.83:1.
   */
  dark: colors.grey['500'],
  hover: {
    DEFAULT: colors.grey['800'],
    /**
     * Hovering strengthens the edge in both modes. `brandMidnight-80` darkened
     * it instead, to 1.6:1 on the dark surface, so a hovered secondary Button
     * all but lost its outline.
     */
    dark: colors.brandMidnight['30']
  },
  focus: {
    DEFAULT: colors.brandMidnight['80'],
    dark: colors.grey['400']
  },
  /**
   * Dividers and decorative outlines, which 1.4.11 does not cover. Controls
   * take `border` rather than this.
   */
  subtle: {
    DEFAULT: colors.brandMidnight['10'],
    dark: colors.grey['700']
  }
}
