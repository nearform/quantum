import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * A ButtonGroup is a row or column of buttons, and #162 asked for its hover,
 * focus and dark-mode colours to be the Button's -- "most of the color changes
 * should be inherited [from] the token changes made for the button component".
 * Three of its four items were carried by the palette in #344 and then painted
 * over here: `accent.hover` left `grey-900` for `brandMidnight-80`,
 * `accent.focus` left `#000` for `brandMidnight-100` (the primary default),
 * and `button.primary.dark` left `#FFF` for `brandMidnight-10`, the brand's
 * light blue. What this component did with them:
 *
 * - focus took a brandGreen *fill* from the `secondary-100` stop rather
 *   than the `button-primary-focus` token. The green belongs in the focus
 *   shadow -- the fourth item, and the indicator every other component
 *   here draws.
 * - a `shadow: none` over every focused member deleted that shadow, and
 *   the group's `overflow` clip would have hidden it even had it survived.
 * - dark mode reached for `button-primary-hover` and `button-primary-focus`,
 *   the *light* halves of those tokens, so a dark page got light-mode navy
 *   surfaces and compensating white text. That is #86's mistake one component
 *   over, and the secondary variant had the same hole in the other
 *   direction: a flat white on the members and another on the group box,
 *   neither with a dark counterpart.
 *
 * The colours are restated here rather than left to the children because
 * `variant` has to mean something for a member that is not a `Button` -- a
 * plain `<button>`, an anchor, an `IconButton`. They are the tokens the Button
 * reaches for, so where the two selectors collide at equal specificity
 * (`.group > *:hover` against `.hover\:bg-x:hover`, both (0,2,0)) the winner
 * paints the same colour either way. That equality is the point: the old
 * classes were not merely redundant, which of them applied came down to the
 * order Tailwind happened to emit them in. `__tests__/button-group.test.tsx`
 * pins the agreement, and the light/dark pairing, the way
 * `button-dark-mode.test.tsx` pins the Button's.
 */
const buttonGroupVariants = cva(
  [
    'inline-flex',
    'items-start',
    'p-0',
    'rounded-lg',
    '[&>*]:flex',
    '[&>*]:items-center',
    '[&>*]:justify-center',
    '[&>*]:gap-[10px]',
    '[&>*]:px-3',
    '[&>*]:outline-hidden',
    // The focus indicator, back after the `shadow: none` and the `overflow`
    // clip between them removed it. A ring drawn outside the member overlaps
    // its neighbours, so the focused one has to paint above them; a flex
    // item honours `z-index` while still `position: static`.
    '[&>*:focus]:shadow-brandGreen',
    '[&>*:focus]:z-10'
  ],
  {
    variants: {
      variant: {
        primary: [
          '[&>*]:bg-button-primary',
          '[&>*]:text-white',
          '[&>*:hover]:bg-button-primary-hover',
          '[&>*:focus]:bg-button-primary-focus',
          '[&>*:disabled]:bg-button-primary-disabled',
          '[&>*:disabled]:text-foreground-subtle',
          // Every dark surface below is light, so the text stays dark through
          // all of them and no state overrides it: `grey-900` is 16.47:1 on
          // the resting `brandMidnight-10` and 6.79:1 on `brandMidnight-30`.
          'dark:[&>*]:bg-button-primary-dark',
          'dark:[&>*]:text-foreground-inverse-dark',
          'dark:[&>*:hover]:bg-button-primary-hover-dark',
          'dark:[&>*:focus]:bg-button-primary-dark',
          'dark:[&>*:disabled]:bg-button-primary-disabled-dark',
          'dark:[&>*:disabled]:text-foreground-subtle'
        ],
        secondary: [
          '[&>*]:bg-white',
          '[&>*]:text-grey-900',
          '[&>*:hover]:bg-button-secondary-hover',
          '[&>*:disabled]:bg-button-secondary-disabled',
          '[&>*:disabled]:border-button-secondary-border-disabled',
          '[&>*:disabled]:text-foreground-subtle',
          'dark:[&>*]:bg-button-secondary-dark',
          'dark:[&>*]:text-foreground-dark',
          'dark:[&>*:hover]:bg-button-secondary-hover-dark',
          // brandGreen at full strength sits on a white surface at 1.65:1; the
          // Button swaps to the pale stop on its own dark secondary for the
          // same reason.
          'dark:[&>*:focus]:shadow-brandGreen10',
          'dark:[&>*:disabled]:bg-button-secondary-disabled-dark',
          'dark:[&>*:disabled]:border-button-secondary-disabled-dark',
          'dark:[&>*:disabled]:text-foreground-subtle-dark'
        ]
      },
      /**
       * Squared where the members meet, rounded where the group ends. This
       * replaces the `overflow` clip, which could not stay once the focus
       * shadow came back -- a ring outside a clipped child is invisible.
       *
       * Each corner is named by exactly one of these four rules, all at
       * (0,2,0), so none of them has to out-order the `rounded-lg` a `Button`
       * brings with it -- which is what the old blanket `rounded: none` on
       * `[&>*]` at (0,1,0) could not do. A lone member matches both
       * `:first-child` and `:last-child` and neither `:not()`, so it stays
       * fully rounded.
       */
      orientation: {
        horizontal: [
          'inline-flex',
          '[&>*:first-child]:rounded-l-lg',
          '[&>*:last-child]:rounded-r-lg',
          '[&>*:not(:first-child)]:rounded-l-none',
          '[&>*:not(:last-child)]:rounded-r-none'
        ],
        vertical: [
          'flex-col',
          '[&>*]:self-stretch',
          '[&>*:first-child]:rounded-t-lg',
          '[&>*:last-child]:rounded-b-lg',
          '[&>*:not(:first-child)]:rounded-t-none',
          '[&>*:not(:last-child)]:rounded-b-none'
        ]
      },
      size: {
        md: ['[&>*]:py-2.5'],
        sm: ['[&>*]:py-2']
      }
    },
    defaultVariants: {
      orientation: 'horizontal',
      variant: 'primary',
      size: 'md'
    }
  }
)

interface ButtonGroupProps
  extends React.ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof buttonGroupVariants> {}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    { className, orientation, variant, size, role = 'group', ...props },
    ref
  ) => {
    return (
      <div
        role={role}
        className={cn(
          buttonGroupVariants({ orientation, variant, size }),
          className
        )}
        {...props}
        ref={ref}
      ></div>
    )
  }
)
ButtonGroup.displayName = 'ButtonGroup'
export { ButtonGroup, type ButtonGroupProps }
