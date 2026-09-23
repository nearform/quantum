import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge wears the same clothes as `Chip`: a 2px coloured border around a `-50`
 * fill, with the text in near-black `foreground` rather than a tint of the
 * hue. The two are siblings in the design file and share the fills exactly, so
 * they share the tokens here too.
 *
 * Putting the colour in the border rather than the text is what makes the
 * whole set comfortably accessible -- `foreground` on any of the `-50` fills
 * is 16:1 or better, so there is no per-hue weight to tune and no ramp that
 * has to be treated as a special case.
 *
 * Dark mode is not in the design file, so it is derived: the fill drops to the
 * page background and the border keeps its colour and goes on carrying the
 * meaning. Tinting the fill instead would have been prettier and would have
 * hidden the border in it -- `feedback-error` on `red-900` is 1.85:1, which
 * would leave error and success telling themselves apart by fill alone.
 */
const badgeVariants = cva(
  [
    [
      'inline-flex',
      'shrink-0',
      'items-center',
      'justify-center',
      'border-2',
      'font-semibold',
      'whitespace-nowrap'
    ],
    ['text-foreground', 'dark:text-foreground-dark', 'dark:bg-background-dark']
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background',
          'border-border-subtle',
          'dark:border-border-subtle-dark'
        ],
        info: ['bg-blue-50', 'border-blue-500'],
        success: ['bg-green-50', 'border-feedback-success'],
        warning: ['bg-yellow-50', 'border-feedback-warning'],
        error: ['bg-red-50', 'border-feedback-error'],
        // The two flat variants keep `border-2` and paint it out rather than
        // dropping it, so they stay exactly the same size as the bordered ones
        // and a row of mixed badges still lines up.
        active: [
          'bg-foreground',
          'border-transparent',
          'text-foreground-inverse',
          'dark:bg-foreground-dark',
          'dark:text-foreground-inverse-dark'
        ],
        disabled: [
          'bg-background-subtle',
          'border-transparent',
          'text-foreground-subtle',
          'dark:bg-background-subtle-dark',
          'dark:text-foreground-subtle-dark'
        ]
      },
      // `min-w` matches the height, so a badge holding a single digit is a
      // square or a circle rather than a letterbox, and longer text grows out
      // of it from there.
      size: {
        sm: ['text-[10px]', 'h-5', 'min-w-5', 'px-1.5', 'gap-1'],
        default: ['text-xs', 'h-6', 'min-w-6', 'px-2', 'gap-1.5'],
        lg: ['text-sm', 'h-7', 'min-w-7', 'px-2.5', 'gap-1.5']
      },
      shape: {
        rounded: 'rounded-md',
        circle: 'rounded-full'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'rounded'
    }
  }
)

const dotVariants = cva(['shrink-0', 'rounded-full', 'bg-current'], {
  variants: {
    size: {
      sm: ['h-1.5', 'w-1.5'],
      default: ['h-2', 'w-2'],
      lg: ['h-2.5', 'w-2.5']
    }
  },
  defaultVariants: {
    size: 'default'
  }
})

interface BadgeProps
  extends
    React.ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badgeVariants> {
  /** Decorative icon shown before the text. */
  icon?: React.ReactNode
  /** Shows a filled dot before the text, in the badge's own colour. */
  dot?: boolean
}

/**
 * A badge labels the thing beside it -- a count, a status, a category. It is
 * static: nothing about it responds to a click, and a badge that needs to be
 * pressed or removed is a `Chip`. `disabled` is an appearance only, for a
 * badge attached to a control that is itself disabled; it does not disable
 * anything, because there is nothing here to disable.
 *
 * The text inside is the label, so it is left in the accessibility tree as
 * ordinary content. A badge whose text does not say enough on its own -- a
 * bare `3` -- takes an `aria-label`, and with it `role="img"`, which is what
 * makes that label reach a screen reader at all: `aria-label` on a plain
 * `<span>` has no role to name and most screen readers drop it. The badge
 * never carries that role without a name to go in it, however the role
 * arrived.
 */
const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant, size, shape, icon, dot, children, role, ...props },
    ref
  ) => {
    // Empty rather than absent is checked deliberately: `role="img"` with no
    // accessible name is itself a violation, so an `aria-label=""` has to
    // leave the badge as the plain text it already was.
    const labelled = Boolean(props['aria-label'] || props['aria-labelledby'])

    // `role="img"` swaps the badge's text for its accessible name, so a badge
    // with no name to swap in must not carry the role: it fails 4.1.2 and puts
    // the text out of reach at the same time. That holds whoever asked for the
    // role. Ours is only generated when there is a label; a caller's is
    // dropped when there is not, rather than forwarding an element we would
    // never have produced ourselves and whose only possible reading is a
    // mistake. Every other role is passed through untouched -- `role="status"`
    // on a badge that changes while the page is open is the point of the
    // override.
    const requested = role ?? (labelled ? 'img' : undefined)
    const resolved = requested === 'img' && !labelled ? undefined : requested

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        role={resolved}
        {...props}
      >
        {dot && (
          <span aria-hidden="true" className={cn(dotVariants({ size }))} />
        )}
        {icon && (
          <span aria-hidden="true" className="flex shrink-0 items-center">
            {icon}
          </span>
        )}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, BadgeProps }
