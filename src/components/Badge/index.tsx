import React from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * The tinted variants are a `-700` foreground on a `-100` surface in light
 * mode and a `-300` on a `-900` in dark. Those weights are not arbitrary:
 * `__tests__/contrast.test.ts` records that the `-600`/`-100` pairing every
 * design system reaches for first drops below AA on four of our ramps, and
 * that `-700` clears it on all of them. The dark pairings are 6.16:1 at their
 * worst (red), so the whole set holds 1.4.3 without a per-hue exception.
 *
 * `default` is the odd one out and takes the semantic surface tokens instead
 * of a grey ramp, because a neutral badge has to sit on the page at both ends
 * of the theme: `grey-900` on a black background is 1.19:1 and would read as
 * no badge at all.
 */
const badgeVariants = cva(
  [
    'inline-flex',
    'shrink-0',
    'items-center',
    'justify-center',
    'font-semibold',
    'leading-normal',
    'whitespace-nowrap'
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-background-alt',
          'text-foreground',
          'dark:bg-background-alt-dark',
          'dark:text-foreground-dark'
        ],
        info: [
          'bg-blue-100',
          'text-blue-700',
          'dark:bg-blue-900',
          'dark:text-blue-300'
        ],
        success: [
          'bg-green-100',
          'text-green-700',
          'dark:bg-green-900',
          'dark:text-green-300'
        ],
        warning: [
          'bg-yellow-100',
          'text-yellow-700',
          'dark:bg-yellow-900',
          'dark:text-yellow-300'
        ],
        error: [
          'bg-red-100',
          'text-red-700',
          'dark:bg-red-900',
          'dark:text-red-300'
        ]
      },
      size: {
        sm: ['text-[10px]', 'px-2', 'h-5', 'gap-1'],
        default: ['text-xs', 'px-2.5', 'h-6', 'gap-1.5'],
        lg: ['text-sm', 'px-3', 'h-7', 'gap-1.5']
      },
      shape: {
        rounded: 'rounded-md',
        pill: 'rounded-full'
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
  extends React.ComponentPropsWithoutRef<'span'>,
    VariantProps<typeof badgeVariants> {
  /** Decorative icon shown before the text. */
  icon?: React.ReactNode
  /** Shows a filled dot before the text, in the badge's own colour. */
  dot?: boolean
}

/**
 * A badge labels the thing beside it -- a status, a category, a count. It is
 * static: nothing about it responds to a click, and a badge that needs to be
 * pressed or removed is a `Chip`.
 *
 * The text inside is the label, so it is left in the accessibility tree as
 * ordinary content. A badge whose text does not say enough on its own -- a
 * bare `3` -- takes an `aria-label`, and with it `role="img"`, which is what
 * makes that label reach a screen reader at all: `aria-label` on a plain
 * `<span>` has no role to name and most screen readers drop it.
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

    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, shape }), className)}
        role={role ?? (labelled ? 'img' : undefined)}
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
