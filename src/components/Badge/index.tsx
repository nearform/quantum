import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge wears the same clothes as `Chip`: a pastel fill with a matching
 * border (same colour as the fill, so it keeps the `border-2` size without
 * reading as a stripe), and text in midnight or the status colour. Pastel
 * chips stay light in both themes — the fill is not swapped for the page
 * background in dark mode.
 *
 * Status variants (`success`, `warning`, `error`) colour the text to match
 * the feedback token. Brand variants (`info`, `green`, `purple`) keep midnight
 * text and put the brand colour on a decorative dot instead, so green never
 * ends up as text on a light fill.
 *
 * `active` and `disabled` stay flat: they keep `border-2` and paint it
 * transparent so they line up with bordered badges in a mixed row.
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
    ['text-foreground']
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-brandGrey-10',
          'text-brandMidnight-100',
          'border-brandGrey-10',
          'dark:text-brandMidnight-100'
        ],
        info: [
          'bg-brandBlue-10',
          'text-brandMidnight-100',
          'border-brandBlue-10',
          'dark:text-brandMidnight-100'
        ],
        success: [
          'bg-feedback-success10',
          'text-feedback-success',
          'border-feedback-success10'
        ],
        warning: [
          'bg-feedback-warning10',
          'text-feedback-warning',
          'border-feedback-warning10'
        ],
        error: [
          'bg-feedback-danger10',
          'text-feedback-danger',
          'border-feedback-danger10'
        ],
        green: [
          'bg-brandGreen-10',
          'text-brandMidnight-100',
          'border-brandGreen-10',
          'dark:text-brandMidnight-100'
        ],
        purple: [
          'bg-brandPurple-10',
          'text-brandMidnight-100',
          'border-brandPurple-10',
          'dark:text-brandMidnight-100'
        ],
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
    },
    // Midnight-text brand variants need an explicit fill; status variants
    // inherit via `bg-current` from their coloured text.
    variant: {
      default: '',
      info: 'bg-brandBlue-100',
      success: '',
      warning: '',
      error: '',
      green: 'bg-brandGreen-100',
      purple: 'bg-brandPurple-100',
      active: '',
      disabled: ''
    }
  },
  defaultVariants: {
    size: 'default',
    variant: 'default'
  }
})

interface BadgeProps
  extends React.ComponentPropsWithoutRef<'span'>,
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
          <span
            aria-hidden="true"
            className={cn(dotVariants({ size, variant }))}
          />
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
