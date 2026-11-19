import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { BsChevronDown } from '../../assets/index.ts'
import { cn } from '../../lib/utils.ts'
import { triggerVariants } from '../Select/triggerVariants.ts'

/**
 * The chevron sits beside the `<select>` rather than inside it, so it cannot
 * inherit the field's text colour and is given the same one per variant.
 */
const chevronVariants = cva(
  [
    'pointer-events-none',
    'absolute',
    'right-3',
    'top-1/2',
    '-translate-y-1/2',
    'h-2',
    'w-2',
    'peer-disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: ['text-foreground', 'dark:text-foreground-muted-dark'],
        error: ['text-red-700', 'dark:text-feedback-error-dark'],
        success: ['text-green-700', 'dark:text-feedback-success-dark']
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

/**
 * `size` is the field's height, as on `SelectTrigger`, rather than the HTML
 * attribute of that name, which asks for a list box of that many rows.
 */
interface NativeSelectProps
  extends
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof triggerVariants> {
  /** Classes for the wrapper that positions the chevron, e.g. a width. */
  wrapperClassName?: string
}

/**
 * The browser's own `<select>`, drawn like `SelectTrigger` so the two can sit
 * in one form. Use it where the platform's picker is the better choice -- on
 * touch devices, in long forms, or where a test or a screen reader needs a
 * real `<select>` -- and `Select` where the options need styling. The open
 * list is the browser's and cannot be styled; in dark mode it follows the
 * page through `color-scheme`.
 *
 * It has no placeholder: start with an empty, disabled option instead.
 */
const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ variant, size, className, wrapperClassName, multiple, ...props }, ref) => (
    <span className={cn('relative flex w-full', wrapperClassName)}>
      <select
        ref={ref}
        multiple={multiple}
        className={cn(
          triggerVariants({ variant, size }),
          'peer',
          'cursor-pointer',
          'dark:[color-scheme:dark]',
          // A list box shows its options, so it takes their height and has
          // no chevron to make room for
          multiple ? 'h-auto' : 'appearance-none pr-8',
          className
        )}
        {...props}
      />
      {!multiple && (
        <BsChevronDown
          aria-hidden="true"
          data-native-select-chevron=""
          className={chevronVariants({ variant })}
        />
      )}
    </span>
  )
)
NativeSelect.displayName = 'NativeSelect'

export { NativeSelect, type NativeSelectProps }
