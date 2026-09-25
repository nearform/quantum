import { colors } from './base'

/**
 * Text colours.
 *
 * `DEFAULT` and `muted` are the body-text tokens: both clear WCAG AA's 4.5:1
 * on `background`, `background-alt` and `background-subtle`, in both modes
 * (`background-inverse` takes `inverse`). `muted` sits at
 * `grey-600` rather than `grey-500` because `grey-500` on `background-alt`
 * (`grey-100`) is 4.39:1 — the pair `SelectTrigger` renders for its
 * placeholder, and `Pagination` for its page numbers.
 *
 * `subtle` is not a body-text token. At `grey-500` it clears 4.5:1 on
 * `background` (4.83:1) and `background-subtle` (4.63:1) but not on
 * `background-alt` (4.39:1), and its dark half is 2.13:1 on
 * `background-alt-dark`. Darkening it again would land it on `grey-600` and
 * collapse it into `muted`, so it stays where it is and is scoped to the uses
 * 1.4.3 exempts or that only owe 3:1 under 1.4.11: disabled control text
 * (Button, ButtonGroup, Chip), Switch's track, and StepsIndicator's dots. Text
 * that a user reads takes `muted`.
 */
export const foreground = {
  DEFAULT: colors.grey['900'],
  dark: '#FFF',
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
